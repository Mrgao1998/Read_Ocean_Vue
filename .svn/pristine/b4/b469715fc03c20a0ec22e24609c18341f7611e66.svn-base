<template>
  <div>
    <div style="width: 100%;height: 400%"
         id="myRadar"
         class="radar"></div>
  </div>
</template>
<script>
import errorHandler from "../../../mixins/errorHandler.js"
import getRadar from "../../../mixins/getRadar.js"
import user from "../../../mixins/user.js"
// 引入基本模板
let echarts = require("echarts")
// 引入柱状图组件
require("echarts/lib/chart/radar")
// 引入提示框和title组件
require("echarts/lib/component/tooltip")
require("echarts/lib/component/title")

export default {
  name: "radar",
  data() {
    return {
      picTermFromDad: ""
    }
  },
  mixins: [errorHandler, getRadar, user],
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
      this.getRadar({
        userType: this.userType,
        studentId: this.userId,
        termId: this.picTermFromDad,
        token: this.token
      }).then(res => {
        var myChart = echarts.init(document.getElementById("myRadar"))
        var option = {
          tooltip: {
            trigger: "item"
          },
          backgroundColor: "#45515a",
          // 标题
          title: {
            text: "阅读雷达图",
            left: "center",
            top: 0,
            textStyle: {
              color: "#ccc",
              fontStyle: "italic"// 标题字体
            }
          },
          radar: {
            center: ["50%", "55%"],
            name: {
              textStyle: {
                color: "#ccc",
                fontSize: 17,
                borderRadius: 3,
                padding: [0, 0]
              }
            },
            indicator: [
              { name: "能力", max: 5 },
              { name: "偏好", max: 5 },
              { name: "习惯", max: 5 },
              { name: "表现", max: 5 },
              { name: "效率", max: 5 }
            ]
          },

          series: [{
            name: " ",
            type: "radar",
            itemStyle: {
              normal: {
                areaStyle: {
                  type: "default"
                }
              }
            },
            data: [
              {
                value: [0, 0, 0, 0, 0],
                name: "综合素质"
              }
            ]
          }]
        }

        if (res.data.result.data != null) {
          for (var i = 0; i <= 4; i++) {
            option.series[0].data[0].value[i] = res.data.result.data[i].num
          }
          myChart.setOption(option)
        } else {
          myChart.setOption(option)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style scoped>
</style>
