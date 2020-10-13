<template>
  <!--个人答题报告中答对题目类型占比分布-->
  <div>
    <div style="width: 100%; height: 300%" id="mySector" class="sector"></div>
  </div>
</template>
<script>
import errorHandler from "../../../../mixins/errorHandler.js"
import getSector from "../../../../mixins/getSector.js"
import user from "../../../../mixins/user.js"
// 引入基本模板
let echarts = require("echarts")
// 引入提示框和title组件
require("echarts/lib/component/tooltip")
require("echarts/lib/component/title")

export default {
  mixins: [errorHandler, getSector, user],
  data() {
    return {
      picTermFromDad: ""
    }
  },
  props: ["picTerm"],
  watch: {
    picTerm: function (newVal) {
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.picTermFromDad = this.picTerm
      // 发请求
      this.getSector({
        schoolId: this.schoolId,
        userType: this.userType,
        studentId: this.userId,
        termId: this.picTermFromDad,
        token: this.token
      })
        .then((res) => {
          // 基于准备好的dom，初始化echarts实例
          let myChart = echarts.init(document.getElementById("mySector"))
          // ecahrts配置项
          var option = {
            // 背景颜色
            backgroundColor: "#45515a",
            // 标题
            title: {
              text: "答对题目类型占比分布",
              left: "center",
              top: 0,
              textStyle: {
                color: "#ccc",
                fontStyle: "italic" // 标题字体
              }
            },
            // 弹窗，响应鼠标指向，显示具体细节
            tooltip: {
              trigger: "item", // 以具体项目触发弹窗
              triggerOn: "click",
              padding: 10,
              formatter(params) {
                return `<span style="color:#00FFFF">${params.data.name}</span><br/>
                        ${params.marker}答对题数：<span style="color:yellow">${params.data.number}</span> <br/>
                        ${params.marker}占比：<span style="color:yellow">${params.data.value}%</span>`
              }
            },
            // 视觉映射组件，将数据映射到视觉元素上
            visualMap: {
              show: false,
              min: 10,
              max: 650,
              dimension: 0, // 选取数据的维度，如人数据：[身高，体重]，则1代表将体重进行映射，默认值为数组的最后一位
              inRange: {
                // 选定了要映射的对象，用inRange详细写要渲染的具体细节，[x，y]中x指最小值对应的量（亮度，饱和度等），y指最大值对应的量，其余的按各自value线性渲染
                // color: ["red"],
                colorLightness: [0.5, 1],
                colorSaturation: [0.5, 1]
              }
            },
            // 数据
            series: [
              {
                name: "扇形图",
                type: "pie",
                center: ["50%", "50%"],
                data: [].sort(function (a, b) {
                  return a.value - b.value
                }),
                label: {
                  // 饼图图形的文本标签
                  normal: {
                    // 下同，normal指在普通情况下样式，而非高亮时样式
                    position: "inner",
                    textStyle: {
                      color: "rgba(255, 255, 255, 0.7)"
                    }
                  }
                },
                labelLine: {
                  // 引导线样式
                  normal: {
                    show: true,
                    lineStyle: {
                      color: "rgba(255, 255, 255, 0.3)"
                    },
                    smooth: 0.3, // 0-1，越大越平滑弯曲
                    length: 10, // 从块到文字的第一段长
                    length2: 20 // 拐弯到文字的段长
                  }
                },
                itemStyle: {
                  // 图例样式
                  normal: {
                    shadowBlur: 10, // 阴影模糊程度
                    shadowColor: "rgba(0, 0, 0, 0.1)", // 阴影颜色，一般黑
                    color: function (params) {
                      var colorList = [
                        "rgb(159,205,238)",
                        "rgb(188,169,176)",
                        "rgb(177,111,222)"
                      ]
                      return colorList[params.dataIndex]
                    }
                  }
                },
                animationType: "scale", // 初始动画效果，scale是缩放，expansion是展开
                animationEasing: "elasticOut", // 初始动画缓动效果
                animationDelay: function (idx) {
                  // 数据更新动画时长，idx限定了每个数据块从无到有的速度
                  return Math.random() * 200
                }
              }
            ]
          }
          // 模拟数据
          option.series[0].data = [
            {
              name: "单选题",
              value: 50.6,
              number: 500
            },
            {
              name: "多选题",
              value: 19.3,
              number: 200
            },
            {
              name: "判断题",
              value: 30,
              number: 300
            }
          ]
          // for (var i = 0; i < res.data.result.data.length; i++) {
          //   var obj = {}
          //   if (res.data.result.data[i].num !== 0) {
          //     console.log(res.data.result.data[i].num)
          //     console.log(res.data.result.data[i].name)
          //     obj.value = res.data.result.data[i].num
          //     obj.name = res.data.result.data[i].name
          //     option.series[0].data.push(obj)
          //   }
          // }
          // console.log(option.series[0].data)
          myChart.setOption(option)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
<style scoped></style>
