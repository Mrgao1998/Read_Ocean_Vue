<template>
  <div>
    <div
      style="width: 100%; height: 300%"
      :id="picTypeFromDad"
      class="histogram"
    ></div>
  </div>
</template>
<script>
// import Axios from "axios"
// import * as API from "../../../../api/api.js"
import errorHandler from "../../../../mixins/errorHandler.js"
import getHistogram from "../../../../mixins/getHistogram.js"
import getPersonalHistogram from "../../../../mixins/getPersonalHistogram.js"
import user from "../../../../mixins/user.js"
// 引入基本模板
let echarts = require("echarts")
// 引入柱状图组件
require("echarts/lib/chart/bar")
// 引入提示框和title组件
require("echarts/lib/component/tooltip")
require("echarts/lib/component/title")

export default {
  name: "PersonHistogram",
  mixins: [errorHandler, getHistogram, user, getPersonalHistogram],
  data() {
    return {
      picTypeFromDad: "",
      picTitleFromDad: "",
      picTermFromDad: ""
    }
  },
  props: ["picType", "picTitle", "picTerm"],
  watch: {
    picTerm: function (newVal) {
      this.init()
    }
  },
  methods: {
    init() {
      this.picTitleFromDad = this.picTitle // 拿到不同的图的要求，调用不同的接口来显示不同的柱状图
      this.picTypeFromDad = this.picType // 拿到不同的图的要求，调用不同的接口来显示不同的柱状图
      this.picTermFromDad = this.picTerm
      // console.log(this.picTypeFromDad)
      if (this.picTypeFromDad === "1") {
        this.getBookRanking({
          // 各类型题目正确率柱状图
          userType: this.userType,
          schoolId: this.schoolId,
          gradeName: this.userInfo.grade,
          classId: this.userInfo.classId,
          studentId: this.userId,
          termId: this.picTermFromDad,
          token: this.token
        })
          .then((res) => {
            var myChart = echarts.init(
              document.getElementById(this.picTypeFromDad)
            )
            var option = {
              // 标题
              title: {
                text: this.picTitleFromDad + "(%)",
                left: "center",
                top: 0,
                textStyle: {
                  color: "#ccc",
                  fontStyle: "italic"
                }
              },
              tooltip: {
                // 自定义悬浮框内容
                formatter: function (params) {
                  console.log(params)
                  return `<span style="color:#00FFFF;text-align:center;">${params.name}</span><br/>
                        ${params.marker}正确率：<span style="color:yellow">${params.value}%</span> <br/>`
                }
              },
              backgroundColor: "#45515a",
              // x轴
              xAxis: {
                data: ["全部", "单选题", "判断题", "多选题"],
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#eee",
                    fontSize: 14
                  }
                }
              },
              // y轴
              yAxis: {
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#eee",
                    fontSize: 14
                  }
                }
              },
              // 系列
              series: [
                {
                  name: "正确率",
                  type: "bar",
                  data: [27.5, 22.4, 34.9, 21.4],
                  itemStyle: {
                    normal: {
                      // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                      color: function (params) {
                        var colorList = [
                          "rgb(223,107,89)",
                          "rgb(210,173,165)",
                          "rgb(225,159,131)",
                          "rgb(159,205,238)"
                        ]
                        return colorList[params.dataIndex]
                      }
                      // label: {
                      //   show: true, // 开启显示
                      //   position: "top", // 在上方显示
                      //   textStyle: { // 数值样式
                      //     color: "white",
                      //     fontSize: 14
                      //   }
                      // }
                    }
                  }
                }
              ],
              grid: {
                left: 35,
                top: 35,
                right: 35,
                bottom: 35
              }
            }
            // 更改数值
            // for (var i = 0; i <= 2; i++) {
            //   option.series[0].data[i] = res.data.result.data[i].num
            // }
            myChart.setOption(option)
          })
          .catch((err) => {
            console.log(err)
          })
      } else if (this.picTypeFromDad === "2") {
        // 各类型题目答对数量柱状图
        this.getTaskRate({
          userType: this.userType,
          schoolId: this.schoolId,
          gradeName: this.userInfo.grade,
          classId: this.userInfo.classId,
          studentId: this.userId,
          termId: this.picTermFromDad,
          token: this.token
        })
          .then((res) => {
            var myChart = echarts.init(
              document.getElementById(this.picTypeFromDad)
            )
            var option = {
              title: {
                text: this.picTitleFromDad,
                left: "center",
                top: 0,
                textStyle: {
                  color: "#ccc",
                  fontStyle: "italic" // 标题字体
                }
              },
              tooltip: {
                // 自定义悬浮框内容
                formatter: function (params) {
                  console.log(params)
                  return `<span style="color:#00FFFF;text-align:center;">${params.name}</span><br/>
                        ${params.marker}答对数为：<span style="color:yellow">${params.value}</span> <br/>`
                }
              },
              backgroundColor: "#45515a",
              xAxis: {
                data: ["全部", "单选题", "判断题", "多选题"],
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#fff",
                    fontSize: 14
                  }
                }
              },
              yAxis: {
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#fff",
                    fontSize: 14
                  }
                }
              },
              series: [
                {
                  name: "完成率",
                  type: "bar",
                  data: [60, 30, 20, 10],
                  itemStyle: {
                    normal: {
                      // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                      color: function (params) {
                        var colorList = [
                          "rgb(186,218,219)",
                          "rgb(124,192,210)",
                          "rgb(29,126,143)",
                          "rgb(159,205,238)"
                        ]
                        return colorList[params.dataIndex]
                      }
                      // label: {
                      //   show: true, // 开启显示
                      //   position: "top", // 在上方显示
                      //   textStyle: { // 数值样式
                      //     color: "white",
                      //     fontSize: 14
                      //   }
                      // }
                    }
                  }
                }
              ],
              grid: {
                left: 35,
                top: 45,
                right: 35,
                bottom: 35
              }
            }
            // 数据插入
            // for (var i = 0; i <= 2; i++) {
            //   option.series[0].data[i] = res.data.result.data[i].num
            // }
            myChart.setOption(option)
          })
          .catch((err) => {
            console.log(err)
          })
      } else if (this.picTypeFromDad === "3") {
        // 答题时间段分布柱状图
        this.getIntegrateRanking({
          userType: this.userType,
          schoolId: this.schoolId,
          gradeName: this.userInfo.grade,
          classId: this.userInfo.classId,
          studentId: this.userId,
          termId: this.picTermFromDad,
          token: this.token
        })
          .then((res) => {
            // console.log(res.data.result.data)
            var myChart = echarts.init(
              document.getElementById(this.picTypeFromDad)
            )
            var option = {
              title: {
                text: this.picTitleFromDad,
                left: "center",
                top: 0,
                textStyle: {
                  color: "#ccc",
                  fontStyle: "italic" // 标题字体
                }
              },
              tooltip: {
                // 自定义悬浮框内容
                formatter: function (params) {
                  console.log(params)
                  return `<span style="color:#00FFFF;text-align:center;">${params.seriesName}</span><br/>
                        ${params.marker}${params.name}答题次数：<span style="color:yellow">${params.value}次</span> <br/>`
                }
              },
              backgroundColor: "#45515a",
              xAxis: {
                data: [
                  "00-04时",
                  "04-08时",
                  "08-12时",
                  "12-16时",
                  "16-20时",
                  "20-24时"
                ],
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#fff",
                    fontSize: 10
                  }
                }
              },
              yAxis: {
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#fff",
                    fontSize: 12
                  }
                }
              },
              series: [
                {
                  name: "答题时间段",
                  type: "bar",
                  data: [1, 1, 3, 4, 2, 1],
                  itemStyle: {
                    normal: {
                      // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                      color: function (params) {
                        var colorList = [
                          "rgb(213,128,18)",
                          "rgb(233,185,60)",
                          "rgb(241,226,152)",
                          "rgb(159,205,238)",
                          "rgb(188,169,176)",
                          "rgb(177,111,222)"
                        ]
                        return colorList[params.dataIndex]
                      }
                    }
                  }
                }
              ],
              grid: {
                left: 35,
                top: 35,
                right: 35,
                bottom: 35
              }
            }
            // for (var i = 0; i <= 2; i++) {
            //   option.series[0].data[i] = res.data.result.data[i].num
            // }
            myChart.setOption(option)
          })
          .catch((err) => {
            console.log(err)
          })
      } else if (this.picTypeFromDad === "4") {
        // 各年级闯关信息统计
        this.getAnswerAccuracy({
          userType: this.userType,
          schoolId: this.schoolId,
          gradeName: this.userInfo.grade,
          classId: this.userInfo.classId,
          studentId: this.userId,
          termId: this.picTermFromDad,
          token: this.token
        })
          .then((res) => {
            // console.log(res.data.result.data)
            var myChart = echarts.init(
              document.getElementById(this.picTypeFromDad)
            )
            var option = {
              title: {
                text: this.picTitleFromDad,
                left: "center",
                top: 0,
                textStyle: {
                  color: "#ccc",
                  fontStyle: "italic" // 标题字体
                }
              },
              tooltip: {
                trigger: "axis"
              },
              backgroundColor: "#45515a",
              legend: {
                data: ["答题总数", "答题积分", "答题平均时长(s)"],
                // orient: "vertical",
                top: 30,
                left: "center",
                textStyle: {
                  color: "white"
                }
              },
              xAxis: {
                data: [
                  "一年级",
                  "二年级",
                  "三年级",
                  "四年级",
                  "五年级",
                  "六年级"
                ],
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#fff",
                    fontSize: 12
                  }
                }
              },
              yAxis: {
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#fff",
                    fontSize: 12
                  }
                }
              },
              series: [
                {
                  name: "答题总数",
                  type: "bar",
                  data: [50, 60, 70, 80, 90, 100],
                  color: "green"
                },
                {
                  name: "答题积分",
                  type: "bar",
                  data: [150, 200, 250, 300, 350, 400],
                  color: "#87CEFA"
                },
                {
                  name: "答题平均时长(s)",
                  type: "bar",
                  data: [120, 110, 100, 90, 80, 70],
                  color: "pink"
                }
              ],
              grid: {
                left: 35,
                top: 75,
                right: 35,
                bottom: 35
              }
            }
            // for (var i = 0; i <= 2; i++) {
            //   option.series[0].data[i] = res.data.result.data[i].num
            // }
            myChart.setOption(option)
          })
          .catch((err) => {
            console.log(err)
          })
      } else if (this.picTypeFromDad === "5") {
        // 各积分段中男女生比例
        this.getAnswerAccuracy({
          userType: this.userType,
          schoolId: this.schoolId,
          gradeName: this.userInfo.grade,
          classId: this.userInfo.classId,
          studentId: this.userId,
          termId: this.picTermFromDad,
          token: this.token
        })
          .then((res) => {
            // console.log(res.data.result.data)
            var myChart = echarts.init(
              document.getElementById(this.picTypeFromDad)
            )
            var option = {
              title: {
                text: this.picTitleFromDad,
                left: "center",
                top: 0,
                textStyle: {
                  color: "#ccc",
                  fontStyle: "italic" // 标题字体
                }
              },
              tooltip: {
                trigger: "item",
                // 自定义悬浮框内容
                formatter: function (params) {
                  console.log(params)
                  return `<span style="color:#00FFFF;text-align:center;">${params.seriesName}</span><br/>
                        ${params.marker}${params.name}占比：<span style="color:yellow">${params.value}%</span> <br/>`
                }
              },
              backgroundColor: "#45515a",
              legend: {
                data: ["男", "女"],
                // orient: "vertical",
                top: 30,
                left: "center",
                textStyle: {
                  color: "white"
                }
              },
              xAxis: {
                data: ["0-250分", "250-500分", "500-750分", "750分以上"],
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#fff",
                    fontSize: 10
                  }
                }
              },
              yAxis: {
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#fff",
                    fontSize: 12
                  }
                }
              },
              series: [
                {
                  name: "男",
                  type: "bar",
                  data: [56, 65, 70, 82],
                  color: "#00BFFF"
                },
                {
                  name: "女",
                  type: "bar",
                  data: [44, 35, 30, 19],
                  color: "#FF69B4"
                }
              ],
              grid: {
                left: 35,
                top: 75,
                right: 35,
                bottom: 35
              }
            }
            // for (var i = 0; i <= 2; i++) {
            //   option.series[0].data[i] = res.data.result.data[i].num
            // }
            myChart.setOption(option)
          })
          .catch((err) => {
            console.log(err)
          })
      } else if (this.picTypeFromDad === "6") {
        // 答题时间段分布柱状图（所有同学）
        this.getAnswerAccuracy({
          userType: this.userType,
          schoolId: this.schoolId,
          gradeName: this.userInfo.grade,
          classId: this.userInfo.classId,
          studentId: this.userId,
          termId: this.picTermFromDad,
          token: this.token
        })
          .then((res) => {
            // console.log(res.data.result.data)
            var myChart = echarts.init(
              document.getElementById(this.picTypeFromDad)
            )
            var option = {
              title: {
                text: this.picTitleFromDad,
                left: "center",
                top: 0,
                textStyle: {
                  color: "#ccc",
                  fontStyle: "italic" // 标题字体
                }
              },
              tooltip: {
                trigger: "axis"
              },
              backgroundColor: "#45515a",
              xAxis: {
                data: [
                  "00-04时",
                  "04-08时",
                  "08-12时",
                  "12-16时",
                  "16-20时",
                  "20-24时"
                ],
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#fff",
                    fontSize: 10
                  }
                }
              },
              yAxis: {
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#fff",
                    fontSize: 12
                  }
                }
              },
              series: [
                {
                  name: "该时间段答题总数",
                  type: "line",
                  data: [56, 65, 70, 82, 99, 3],
                  color: "#00BFFF"
                }
              ],
              grid: {
                left: 35,
                top: 35,
                right: 35,
                bottom: 35
              }
            }
            // for (var i = 0; i <= 2; i++) {
            //   option.series[0].data[i] = res.data.result.data[i].num
            // }
            myChart.setOption(option)
          })
          .catch((err) => {
            console.log(err)
          })
      } else if (this.picTypeFromDad === "7") {
        // 答题积分top5学校
        this.getTop5SchoolRank({
          token: this.token
        })
          .then((res) => {
            // console.log(res.data.result.data)
            var myChart = echarts.init(
              document.getElementById(this.picTypeFromDad)
            )
            // -----------------------------------------

            var labelSetting = {
              normal: {
                show: true,
                // offset: [-10, 0],
                textStyle: {
                  fontSize: 12,
                  color: "white"
                }
              }
            }
            // 设置最大值
            // var maxData = res.data.data[0].totalRank
            var option = {
              // 题目设置
              title: {
                text: this.picTitleFromDad,
                left: "center",
                top: 0,
                textStyle: {
                  color: "#ccc",
                  fontStyle: "italic" // 标题字体
                }
              },
              // 数据项
              dataset: {
                source: [
                  ["amount", "product"],
                  [101852, "珠海香洲第一小学11111111111111111"],
                  [91852, "大数据肯德基案大撒大撒1111111111111111"],
                  [79146, "大数据肯德基案大撒312111111111111111大撒"],
                  [41032, "大数据肯德基案大撒31大1111111111111111111撒"],
                  [20145, "大数据肯德基案大撒12111大撒"]
                ]
              },
              // X轴配置
              xAxis: {
                show: false
              },
              // Y轴配置
              yAxis: {
                type: "category",
                inverse: true,
                axisTick: { show: false },
                axisLine: { show: false },
                axisLabel: {
                  show: true,
                  interval: 0,
                  rotate: 30,
                  formatter: function (params) {
                    var newParamsName = ""
                    var paramsNameNumber = params.length
                    var provideNumber = 6 // 一行显示几个字
                    var rowNumber = Math.ceil(paramsNameNumber / provideNumber)
                    if (paramsNameNumber > provideNumber) {
                      for (var p = 0; p < rowNumber; p++) {
                        var tempStr = ""
                        var start = p * provideNumber
                        var end = start + provideNumber
                        if (p === rowNumber - 1) {
                          tempStr = params.substring(start, paramsNameNumber)
                        } else {
                          tempStr = params.substring(start, end) + "\n"
                        }
                        newParamsName += tempStr
                      }
                    } else {
                      newParamsName = params
                    }
                    return newParamsName
                  },
                  color: function (value, index) {
                    if (index === 0) {
                      return "red"
                    }
                    if (index === 1) {
                      return "#ff8447"
                    }
                    if (index === 2) {
                      return "#ffcc00"
                    }
                    return "rgb(18,205,12)"
                  },
                  fontSize: 11
                }
              },
              series: [
                {
                  type: "pictorialBar",
                  barWidth: 25,
                  label: labelSetting,
                  symbol: "rect",
                  itemStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [
                        {
                          offset: 0,
                          color: "#2A6BCD"
                        },
                        {
                          offset: 1,
                          color: "#34F6F8"
                        }
                      ])
                    }
                  },
                  encode: {
                    x: "amount",
                    y: "product"
                  },
                  z: 20
                }
              ],
              grid: {
                left: "20%",
                top: "10%",
                right: "0%",
                bottom: "10%"
              }
            }
            for (let i = 1; i < 6; i++) {
              option.dataset.source[i][0] = res.data.data[i - 1].totalRank
              option.dataset.source[i][1] = res.data.data[i - 1].schoolName
            }
            myChart.setOption(option)
          })
          .catch((err) => {
            console.log(err)
          })
      } else if (this.picTypeFromDad === "8") {
        // 答题时间段分布柱状图（所有同学）
        this.getAnswerAccuracy({
          userType: this.userType,
          schoolId: this.schoolId,
          gradeName: this.userInfo.grade,
          classId: this.userInfo.classId,
          studentId: this.userId,
          termId: this.picTermFromDad,
          token: this.token
        })
          .then((res) => {
            // console.log(res.data.result.data)
            var myChart = echarts.init(
              document.getElementById(this.picTypeFromDad)
            )
            var option = {
              title: {
                text: this.picTitleFromDad,
                left: "center",
                top: 0,
                textStyle: {
                  color: "#ccc",
                  fontStyle: "italic" // 标题字体
                }
              },
              tooltip: {
                trigger: "axis"
              },
              backgroundColor: "#45515a",
              xAxis: {
                data: [
                  "幼儿园",
                  "一年级",
                  "二年级",
                  "三年级",
                  "四年级",
                  "五年级",
                  "六年级"
                ],
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#fff",
                    fontSize: 10
                  }
                }
              },
              yAxis: {
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#fff",
                    fontSize: 12
                  }
                }
              },
              series: [
                {
                  name: "该年级所答题数为：",
                  type: "line",
                  data: [56, 65, 70, 82, 99, 30, 70],
                  color: "#00BFFF"
                }
              ],
              grid: {
                left: 35,
                top: 35,
                right: 35,
                bottom: 35
              }
            }
            // for (var i = 0; i <= 2; i++) {
            //   option.series[0].data[i] = res.data.result.data[i].num
            // }
            myChart.setOption(option)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  },
  created() {
    this.init()
  }
}
</script>
<style scoped></style>
