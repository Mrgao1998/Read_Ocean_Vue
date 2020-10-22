<template>
  <!--个人答题报告中答对题目类型占比分布-->
  <div>
    <div style="width: 100%; height: 300%" id="mySector" class="sector"></div>
  </div>
</template>
<script>
import booksDetailVue from "../../../../views/book/booksDetail.vue"
// 引入基本模板
let echarts = require("echarts")
// 引入提示框和title组件
require("echarts/lib/component/tooltip")
require("echarts/lib/component/title")

export default {
  props: {
    ResData: Object
  },
  mounted() {
    console.log(this.ResData)
    this.init()
  },
  methods: {
    init() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("mySector"))
      var option = {
        title: {
          text: "答对题目类型占比分布",
          left: "center",
          top: "5%",
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
                        ${params.marker}答对题数：<span style="color:yellow">${params.data.value}</span> <br/>
                        ${params.marker}占比：<span style="color:yellow">${params.data.number}%</span>`
          }
        },
        series: [
          {
            type: "pie", // 设置图表类型为饼图
            center: ["50%", "50%"],
            radius: [60, 90], // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
            data: [ // 数据数组，name 为数据项名称，value 为数据项值
              {value: this.ResData.rightSingleNum, name: "单选题", number: ((this.ResData.rightSingleNum / this.ResData.rightCount) * 100).toFixed(4)},
              {value: this.ResData.rightTofNum, name: "判断题", number: ((this.ResData.rightTofNum / this.ResData.rightCount) * 100).toFixed(4)},
              {value: this.ResData.rightMultipleNum, name: "多选题", number: ((this.ResData.rightMultipleNum / this.ResData.rightCount) * 100).toFixed(4)}
            ],
            itemStyle: {
              // 图例样式
              normal: {
                shadowBlur: 5, // 阴影模糊程度
                shadowColor: "rgba(255, 255, 255, 0.5)", // 阴影颜色
                color: function (params) {
                  var colorList = [
                    "rgb(222,247,114)",
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
      myChart.setOption(option)
    }
  }
}
</script>
<style scoped></style>
