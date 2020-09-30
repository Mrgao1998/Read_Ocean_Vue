<template>
  <div>
    <div style="width: 100%;height: 300%"
         id="mySector"
         class="sector"></div>
  </div>
</template>
<script>
import errorHandler from "../../../mixins/errorHandler.js"
import getSector from "../../../mixins/getSector.js"
import user from "../../../mixins/user.js"
// 引入基本模板
let echarts = require("echarts")
// 引入提示框和title组件
require("echarts/lib/component/tooltip")
require("echarts/lib/component/title")

export default {
  name: "sector",
  mixins: [errorHandler, getSector, user],
  data() {
    return {
      picTermFromDad: ""
    }
  },
  props: ["picTerm"],
  watch: {
    "picTerm": function (newVal) {
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.picTermFromDad = this.picTerm
      this.getSector({
        schoolId: this.schoolId,
        userType: this.userType,
        studentId: this.userId,
        termId: this.picTermFromDad,
        token: this.token
      }).then(res => {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById("mySector"))
        var option = {
          backgroundColor: "#45515a",
          // 标题
          title: {
            text: "书籍类型",
            left: "center",
            top: 0,
            textStyle: {
              color: "#ccc",
              fontStyle: "italic"// 标题字体
            }
          },
          // 弹窗，响应鼠标指向，显示具体细节
          tooltip: {
            trigger: "item", // 以具体项目触发弹窗
            show: "true",
            /*
            内容格式器，一共有abcd四个代号，例如在饼图中，{a}指系列，即流量来源，{b}指数据项目，如搜索引擎，{c}指数值，如
            value，{d}百分比。{x}本身代表了相应字符，可以和其他字符拼凑，在弹窗中显示
            */
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          // 图例，选择要显示的项目
          legend: {
            orient: "vertical",
            left: "left",
            textStyle: {
              color: "#c8c8d0"
            },
            itemWidth: 20, // 设置图例图形的宽
            itemHeight: 15, // 设置图例图形的高
            data: "" // 注意要和数据的name相对应
          },
          // // 工具箱
          // toolbox: {
          //   show: true, // 显示工具箱
          //   feature: {
          //     dataView: { show: true }, // 以文字形式显示数据
          //     restore: { show: true }, // 还原
          //     // dataZoom:{show:true}, //区域缩放
          //     saveAsImage: { show: true } // 保存图片
          //     // magicType:{type:['line','bar']}//动态数据切换，数据显示可以在该规定内容中切换显示方式，
          //   }
          // },
          // 视觉映射组件，将数据映射到视觉元素上
          visualMap: {
            show: false,
            min: 10,
            max: 650,
            dimension: 0, // 选取数据的维度，如人数据：[身高，体重]，则1代表将体重进行映射，默认值为数组的最后一位
            // seriesIndex: 4, //选取数据集合中的哪个数组，如{一班}，{二班}，默认选取data中的所有数据集
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
              // radius: "55%",
              center: ["50%", "50%"],
              // minAngle: "30",
              data: [].sort(function (a, b) { return a.value - b.value }),
              // roseType: "false", // 角度和半径展现百分比，'area'只用半径展现
              label: { // 饼图图形的文本标签
                normal: { // 下同，normal指在普通情况下样式，而非高亮时样式
                  position: "inner",
                  textStyle: {
                    color: "rgba(255, 255, 255, 0.5)"
                  }
                }
              },
              labelLine: { // 引导线样式
                normal: {
                  lineStyle: {
                    color: "rgba(255, 255, 255, 0.3)"
                  },
                  smooth: 0.3, // 0-1，越大越平滑弯曲
                  length: 1, // 从块到文字的第一段长
                  length2: 20 // 拐弯到文字的段长
                }
              },
              itemStyle: { // 图例样式
                normal: {
                  shadowBlur: 50, // 阴影模糊程度
                  shadowColor: "rgba(0, 0, 0, 0.5)"// 阴影颜色，一般黑
                }
              },

              animationType: "scale", // 初始动画效果，scale是缩放，expansion是展开
              animationEasing: "elasticOut", // 初始动画缓动效果
              animationDelay: function (idx) { // 数据更新动画时长，idx限定了每个数据块从无到有的速度
                return Math.random() * 200
              }
            }
          ],
          color: ["rgb(183,199,214)", "rgb(117,128,145)", "rgb(77,98,109)", "rgb(67,179,150)", "rgb(149,214,205)", "rgb(181,219,225)", "rgb(159,205,238)", "rgb(161,211,208)"]
        }

        for (var i = 0; i < res.data.result.data.length; i++) {
          var obj = {}
          if (res.data.result.data[i].num !== 0) {
            obj.value = res.data.result.data[i].num
            obj.name = res.data.result.data[i].name
            option.series[0].data.push(obj)
          }
        }
        myChart.setOption(option)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style scoped>
</style>


