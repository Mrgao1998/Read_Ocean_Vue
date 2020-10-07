<template>
  <div>
    <div style="width: 100%;height: 300%;"
         :id="picTypeFromDad"
         class="histogram"></div>
  </div>
</template>
<script>
import errorHandler from "../../../mixins/errorHandler.js"
import getHistogram from "../../../mixins/getHistogram.js"
import user from "../../../mixins/user.js"
// 引入基本模板
let echarts = require("echarts")
// 引入柱状图组件
require("echarts/lib/chart/bar")
// 引入提示框和title组件
require("echarts/lib/component/tooltip")
require("echarts/lib/component/title")

export default {
  name: "chart",
  mixins: [errorHandler, getHistogram, user],
  data() {
    return {
      picTypeFromDad: "",
      picTitleFromDad: "",
      picTermFromDad: ""
    }
  },
  props: ["picType", "picTitle", "picTerm"],
  watch: {
    "picTerm": function (newVal) {
      this.init()
    }
  },
  methods: {
    init() {
      this.picTitleFromDad = this.picTitle// 拿到不同的图的要求，调用不同的接口来显示不同的柱状图
      this.picTypeFromDad = this.picType// 拿到不同的图的要求，调用不同的接口来显示不同的柱状图
      this.picTermFromDad = this.picTerm
      // console.log(this.picTypeFromDad)
      if (this.picTypeFromDad === "1") {
        this.getBookRanking({// 书籍数量柱状图
          userType: this.userType,
          schoolId: this.schoolId,
          gradeName: this.userInfo.grade,
          classId: this.userInfo.classId,
          studentId: this.userId,
          termId: this.picTermFromDad,
          token: this.token
        }).then(res => {
          var myChart = echarts.init(document.getElementById(this.picTypeFromDad))
          var option = {
            // 标题
            title: {
              text: this.picTitleFromDad,
              left: "center",
              top: 0,
              textStyle: {
                color: "#ccc",
                fontStyle: "italic"
              } },
            tooltip: {},
            backgroundColor: "#45515a",
            legend: {
              type: "plain",
              data: ["平均书籍数量"]
            },
            xAxis: {
              data: ["个人", "班级", "年级"],
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
            series: [{
              name: "书籍数量",
              type: "bar",
              data: [0, 0, 0],
              itemStyle: {
                normal: {
                  // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: function (params) {
                    var colorList = ["rgb(223,107,89)", "rgb(210,173,165)", "rgb(225,159,131)", "rgb(159,205,238)"]
                    return colorList[params.dataIndex]
                  }
                }
              }
            }],
            grid: {
              left: 35,
              top: 35,
              right: 35,
              bottom: 35
            }
          }
          for (var i = 0; i <= 2; i++) {
            option.series[0].data[i] = res.data.result.data[i].num
          }
          myChart.setOption(option)
        }).catch(err => {
          console.log(err)
        })
      } else if (this.picTypeFromDad === "2") { // 任务完成率
        this.getTaskRate({// 书籍数量柱状图
          userType: this.userType,
          schoolId: this.schoolId,
          gradeName: this.userInfo.grade,
          classId: this.userInfo.classId,
          studentId: this.userId,
          termId: this.picTermFromDad,
          token: this.token
        }).then(res => {
          var myChart = echarts.init(document.getElementById(this.picTypeFromDad))
          var option = {
            title: {
              text: this.picTitleFromDad,
              left: "center",
              top: 0,
              textStyle: {
                color: "#ccc",
                fontStyle: "italic"// 标题字体
              } },
            tooltip: {},
            backgroundColor: "#45515a",
            legend: {
              data: ["平均书籍数量"]
            },
            xAxis: {
              data: ["个人", "班级", "年级"],
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
            series: [{
              name: "完成率",
              type: "bar",
              data: [0, 0, 0],
              itemStyle: {
                normal: {
                  // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: function (params) {
                    var colorList = ["rgb(186,218,219)", "rgb(124,192,210)", "rgb(29,126,143)", "rgb(159,205,238)"]
                    return colorList[params.dataIndex]
                  }
                }
              }
            }],
            grid: {
              left: 35,
              top: 35,
              right: 35,
              bottom: 35
            }
          }
          for (var i = 0; i <= 2; i++) {
            option.series[0].data[i] = res.data.result.data[i].num
          }
          myChart.setOption(option)
        }).catch(err => {
          console.log(err)
        })
      } else if (this.picTypeFromDad === "3") { // 积分榜
        this.getIntegrateRanking({// 积分榜柱状图
          userType: this.userType,
          schoolId: this.schoolId,
          gradeName: this.userInfo.grade,
          classId: this.userInfo.classId,
          studentId: this.userId,
          termId: this.picTermFromDad,
          token: this.token
        }).then(res => {
          // console.log(res.data.result.data)
          var myChart = echarts.init(document.getElementById(this.picTypeFromDad))
          var option = {
            title: {
              text: this.picTitleFromDad,
              left: "center",
              top: 0,
              textStyle: {
                color: "#ccc",
                fontStyle: "italic"// 标题字体
              } },
            tooltip: {},
            backgroundColor: "#45515a",
            legend: {
              data: ["平均书籍数量"]
            },
            xAxis: {
              data: ["个人", "班级", "年级"],
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
            series: [{
              name: "积分",
              type: "bar",
              data: [0, 0, 0],
              itemStyle: {
                normal: {
                  // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: function (params) {
                    var colorList = ["rgb(213,128,18)", "rgb(233,185,60)", "rgb(241,226,152)", "rgb(159,205,238)"]
                    return colorList[params.dataIndex]
                  }
                }
              }
            }],
            grid: {
              left: 35,
              top: 35,
              right: 35,
              bottom: 35
            }
          }
          for (var i = 0; i <= 2; i++) {
            option.series[0].data[i] = res.data.result.data[i].num
          }
          myChart.setOption(option)
        }).catch(err => {
          console.log(err)
        })
      } else if (this.picTypeFromDad === "4") { // 答题正确率（%）
        this.getAnswerAccuracy({// 答题正确率（%）柱状图
          userType: this.userType,
          schoolId: this.schoolId,
          gradeName: this.userInfo.grade,
          classId: this.userInfo.classId,
          studentId: this.userId,
          termId: this.picTermFromDad,
          token: this.token
        }).then(res => {
          // console.log(res.data.result.data)
          var myChart = echarts.init(document.getElementById(this.picTypeFromDad))
          var option = {
            title: {
              text: this.picTitleFromDad,
              left: "center",
              top: 0,
              textStyle: {
                color: "#ccc",
                fontStyle: "italic"// 标题字体
              } },
            tooltip: {},
            backgroundColor: "#45515a",
            legend: {
              data: ["平均书籍数量"]
            },
            xAxis: {
              data: ["个人", "班级", "年级"],
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
            series: [{
              name: "答题正确率",
              type: "bar",
              data: [0, 0, 0],
              itemStyle: {
                normal: {
                  // 每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                  color: function (params) {
                    var colorList = ["rgb(133,164,197)", "rgb(132,210,206)", "rgb(189,211,228)", "rgb(159,205,238)"]
                    return colorList[params.dataIndex]
                  }
                }
              }
            }],
            grid: {
              left: 35,
              top: 35,
              right: 35,
              bottom: 35
            }
          }
          for (var i = 0; i <= 2; i++) {
            option.series[0].data[i] = res.data.result.data[i].num
          }
          myChart.setOption(option)
        }).catch(err => {
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
<style scoped>
</style>
