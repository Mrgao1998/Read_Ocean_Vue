<template>
  <div>
    <div style="width: 100%; height: 300%" :id="picTitle"></div>
  </div>
</template>
<script>
import errorHandler from "../../../../mixins/errorHandler.js"
import getStatistics from "../../../../mixins/getStatistics.js"
// 引入基本模板
let echarts = require("echarts")
// 引入柱状图组件
require("echarts/lib/chart/bar")
// 引入提示框和title组件
require("echarts/lib/component/tooltip")
require("echarts/lib/component/title")

export default {
  name: "PersonHistogram",
  mixins: [getStatistics],
  data() {
    return {}
  },
  props: {
    ResData: Object,
    picTitle: String
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let myChart = echarts.init(document.getElementById(this.picTitle))
      if (this.picTitle === "各类型题目正确率柱状图") {
        console.log(this.ResData)
        let option = {
          // 标题配置
          title: {
            text: this.picTitle,
            left: "center",
            top: 0,
            textStyle: {
              color: "yellow"
            }
          },
          // 点击时提示框设置
          tooltip: {
            // 自定义悬浮框内容
            formatter: function (params) {
              return `<span style="color:#00FFFF;text-align:center;">${params.name}</span><br/>
                        ${params.marker}正确率：<span style="color:yellow">${params.value}%</span> <br/>`
            }
          },
          backgroundColor: "#45515a",
          // x轴
          xAxis: {
            // X坐标轴配置
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#fff",
                width: "1"
              }
            },
            // 去除网格线
            splitLine: { show: false },
            data: ["单选题", "判断题", "多选题"],
            axisLabel: {
              show: true,
              textStyle: {
                color: "yellow",
                fontSize: 12
              }
            }
          },
          // y轴
          yAxis: {
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#fff",
                width: "1"
              }
            },
            splitLine: { show: false },
            axisLabel: {
              show: true,
              textStyle: {
                color: "yellow",
                fontSize: 12
              }
            }
          },
          // 系列
          series: [
            {
              name: "正确率",
              type: "bar",
              barWidth: 40,
              data: [
                (
                  (
                    this.ResData.rightSingleNum / this.ResData.totalCount
                  ).toFixed(3) * 100
                ).toFixed(1),
                (
                  (this.ResData.rightTofNum / this.ResData.totalCount).toFixed(
                    3
                  ) * 100
                ).toFixed(1),
                (
                  (
                    this.ResData.rightMultipleNum / this.ResData.totalCount
                  ).toFixed(3) * 100
                ).toFixed(1)
              ],
              itemStyle: {
                normal: {
                  // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: function (params) {
                    var colorList = [
                      "rgb(223,107,89)",
                      "rgb(225,159,131)",
                      "rgb(159,205,238)"
                    ]
                    return colorList[params.dataIndex]
                  }
                }
              }
            }
          ],
          grid: {
            left: 35,
            top: 50,
            right: 35,
            bottom: 35
          }
        }
        myChart.setOption(option)
      } else if (this.picTitle === "各类型题目答对数量柱状图") {
        // 各类型题目答对数量柱状图
        let option = {
          title: {
            text: this.picTitle,
            left: "center",
            top: 0,
            textStyle: {
              color: "#1E90FF"
            }
          },
          tooltip: {
            // 自定义悬浮框内容
            formatter: function (params) {
              return `<span style="color:#00FFFF;text-align:center;">${params.name}</span><br/>
                        ${params.marker}答对数为：<span style="color:yellow">${params.value}</span> <br/>`
            }
          },
          backgroundColor: "#45515a",
          xAxis: {
            splitLine: { show: false },
            data: ["全部", "单选题", "判断题", "多选题"],
            axisLabel: {
              show: true,
              textStyle: {
                color: "#1E90FF",
                fontSize: 12
              }
            },
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#fff",
                width: "1"
              }
            }
          },
          yAxis: {
            splitLine: { show: false },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#1E90FF",
                fontSize: 12
              }
            },
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#fff",
                width: "1"
              }
            }
          },
          series: [
            {
              type: "bar",
              data: [
                this.ResData.rightCount,
                this.ResData.rightSingleNum,
                this.ResData.rightTofNum,
                this.ResData.rightMultipleNum
              ],
              barWidth: 40,
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
                  },
                  label: {
                    show: true, // 开启显示
                    position: "top", // 在上方显示
                    textStyle: {
                      // 数值样式
                      color: "white",
                      fontSize: 12
                    }
                  }
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
        myChart.setOption(option)
      } else if (this.picTitle === "答题时间段分布折线图") {
        // 答题时间段分布柱状图
        let option = {
          title: {
            text: this.picTitle,
            left: "center",
            top: 0,
            textStyle: {
              color: "#EE6A50"
            }
          },
          tooltip: {
            trigger: "axis",
            // 自定义悬浮框内容
            formatter: function (params) {
              return `<span style="color:#00FFFF;text-align:center;">${params[0].axisValue}</span><br/>
                        ${params[0].marker}答题次数：<span style="color:yellow">${params[0].data}次</span> <br/>`
            },
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效，
              type: "line", // 默认为line，line直线，cross十字准星，shadow阴影
              crossStyle: {
                color: "#fff"
              }
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
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#fff",
                width: "1"
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#EE6A50",
                fontSize: 10
              }
            }
          },
          yAxis: {
            axisLabel: {
              show: true,
              textStyle: {
                color: "#EE6A50",
                fontSize: 12
              }
            },
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#fff",
                width: "1"
              }
            }
          },
          series: [
            {
              name: "答题时间段",
              type: "line",
              symbolSize: 8, // 拐点圆的大小
              color: ["#EE6A50"], // 折线条的颜色
              data: [
                this.ResData.answerHabit.zero,
                this.ResData.answerHabit.four,
                this.ResData.answerHabit.eight,
                this.ResData.answerHabit.twelve,
                this.ResData.answerHabit.sixteen,
                this.ResData.answerHabit.twenty
              ],
              itemStyle: {
                normal: {
                  lineStyle: {
                    width: 2,
                    type: "solid" // 'dotted'虚线 'solid'实线
                  }
                }
              }
            }
          ],
          grid: {
            left: 35,
            top: 50,
            right: 35,
            bottom: 35
          }
        }
        myChart.setOption(option)
      } else if (this.picTitle === "各年级闯关信息统计") {
        // 获取各年级闯关信息统计
        this.getRankInfoGroupByGrade()
          .then((res) => {
            const data = res.data.data
            let option = {
              title: {
                text: this.picTitle,
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
                type: "log",
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#fff",
                    fontSize: 10
                  },
                  interval: 0,
                  rotate: 30
                }
              },
              series: [
                {
                  name: "答题总数",
                  type: "bar",
                  data: [
                    data.oneTotalQuestionNum,
                    data.twoTotalQuestionNum,
                    data.threeTotalQuestionNum,
                    data.fourTotalQuestionNum,
                    data.fiveTotalQuestionNum,
                    data.sixTotalQuestionNum
                  ],
                  color: "green"
                },
                {
                  name: "答题积分",
                  type: "bar",
                  data: [
                    data.oneTotalRank,
                    data.twoTotalRank,
                    data.threeTotalRank,
                    data.fourTotalRank,
                    data.fiveTotalRank,
                    data.sixTotalRank
                  ],
                  color: "#87CEFA"
                },
                {
                  name: "答题平均时长(s)",
                  type: "bar",
                  data: [
                    data.oneAvgTime,
                    data.twoAvgTime,
                    data.threeAvgTime,
                    data.fiveAvgTime,
                    data.fiveAvgTime,
                    data.fiveAvgTime
                  ],
                  color: "pink"
                }
              ],
              grid: {
                left: 45,
                top: 75,
                right: 35,
                bottom: 35
              }
            }
            myChart.setOption(option)
            this.$emit("addTimes")
          }).catch(err => {
            errorHandler(err)
          })
      } else if (this.picTitle === "各积分段中男女生比例") {
        // 各积分段中男女生比例
        this.getGenderDistribution()
          .then((res) => {
            const data = res.data.data
            let option = {
              title: {
                text: this.picTitle,
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
                  data:
                  [
                    ((data.firstMan / (data.firstMan + data.firstFemale)) * 100).toFixed(1),
                    ((data.secondMan / (data.secondMan + data.secondFemale)) * 100).toFixed(1),
                    ((data.thirdMan / (data.thirdFemale + data.thirdMan)) * 100).toFixed(1),
                    ((data.fourthMan / (data.fourthMan + data.fourthFemale)) * 100).toFixed(1)
                  ],
                  color: "#00BFFF"
                },
                {
                  name: "女",
                  type: "bar",
                  data:
                  [
                    ((data.firstFemale / (data.firstMan + data.firstFemale)) * 100).toFixed(1),
                    ((data.secondFemale / (data.secondMan + data.secondFemale)) * 100).toFixed(1),
                    ((data.thirdFemale / (data.thirdFemale + data.thirdMan)) * 100).toFixed(1),
                    ((data.fourthFemale / (data.fourthMan + data.fourthFemale)) * 100).toFixed(1)
                  ],
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
            myChart.setOption(option)
            this.$emit("addTimes")
          })
          .catch((err) => {
            console.log(err)
          })
      } else if (this.picTitle === "答题时间段分布(所有同学)") {
        // 答题时间段分布柱状图（所有同学）
        this.getTotalAnswerHabit()
          .then((res) => {
            const data = res.data.data
            let option = {
              title: {
                text: this.picTitle,
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
                    fontSize: 10
                  },
                  interval: 0,
                  rotate: 30
                }
              },
              series: [
                {
                  name: "该时间段答题总数",
                  type: "line",
                  data:
                  [
                    data.zero,
                    data.four,
                    data.eight,
                    data.twelve,
                    data.sixteen,
                    data.twenty
                  ],
                  color: "#00BFFF"
                }
              ],
              grid: {
                left: 45,
                top: 35,
                right: 35,
                bottom: 35
              }
            }
            myChart.setOption(option)
            this.$emit("addTimes")
          })
          .catch((err) => {
            console.log(err)
          })
      } else if (this.picTitle === "答题积分top5学校") {
        // 答题积分top5学校
        this.getTop5SchoolRank()
          .then((res) => {
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
            let option = {
              // 题目设置
              title: {
                text: this.picTitle,
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
            this.$emit("addTimes")
          })
          .catch((err) => {
            errorHandler(err)
          })
      } else if (this.picTitle === "各年级所答题目数柱状图") {
        // 各年级所答题目数柱状图
        let option = {
          title: {
            text: this.picTitle,
            left: "center",
            top: 0,
            textStyle: {
              color: "#98FB98"
            }
          },
          tooltip: {
            // 自定义悬浮框内容
            formatter: function (params) {
              return `<span style="color:#00FFFF;text-align:center;">${params.name}</span><br/>
                        ${params.marker}所答题目数：<span style="color:yellow">${params.value}</span> <br/>`
            }
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
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#fff",
                width: "1"
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#98FB98",
                fontSize: 10
              }
            }
          },
          yAxis: {
            axisLabel: {
              show: true,
              textStyle: {
                color: "#98FB98",
                fontSize: 12
              }
            },
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#fff",
                width: "1"
              }
            }
          },
          series: [
            {
              name: "该年级所答题数为：",
              type: "bar",
              data: [
                this.ResData.gradeProportion.zero,
                this.ResData.gradeProportion.one,
                this.ResData.gradeProportion.two,
                this.ResData.gradeProportion.three,
                this.ResData.gradeProportion.four,
                this.ResData.gradeProportion.five,
                this.ResData.gradeProportion.six
              ],
              itemStyle: {
                normal: {
                  // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: function (params) {
                    var colorList = [
                      "#FFF68F",
                      "#FFC1C1",
                      "#FFDEAD",
                      "#F0FFFF",
                      "#DDA0DD",
                      "#B0E2FF",
                      "#4EEE94"
                    ]
                    return colorList[params.dataIndex]
                  }
                }
              }
            }
          ],
          grid: {
            left: 35,
            top: 50,
            right: 35,
            bottom: 35
          }
        }
        myChart.setOption(option)
      }
    }
  }
}
</script>
<style scoped></style>
