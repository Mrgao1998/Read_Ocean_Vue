<template>
  <transition name="slide">
    <div class="detail-wrapper">
      <!-- 头部 -->
      <mt-header title="答题结果" class="detail-wrapper-header">
        <mt-button slot="left" icon="back" @click="close"></mt-button>
      </mt-header>
      <!-- 答题结果正确率饼图 -->
      <div>
        <div style="width: 100%; height: 200px" ref="mySector"></div>
      </div>
      <!-- 答题结果相关信息 -->
      <ul class="result__wrapper">
        <li class="content__wrapper">
          <span class="time__value">{{this.timeStr}}</span>
          <span class="content__text">答题时长</span>
        </li>
        <li class="content__wrapper">
          <span class="time__value">{{(this.questionListLength-this.wrongCount) }}</span>
          <span class="content__text">正确题目</span>
        </li>
        <li class="content__wrapper">
          <span class="time__value">{{this.integral}}</span>
          <span class="content__text">添加的积分</span>
        </li>
        <li class="content__wrapper">
          <span class="time__value">{{this.questionListLength}}</span>
          <span class="content__text">本次答题题数</span>
        </li>
      </ul>
      <div class="card__wrapper">
        <span class="card">答题卡</span>
        <div class="answer__wrapper">
          <span class="correct">回答正确</span>
          <span class="wrong">回答错误</span>
        </div>
      </div>
      <ul class="question__wrapper">
        <li v-for="(item,index) in List" :key="index" :class="[item ? 'green' : 'red']" ><span>{{index + 1 }}</span></li>
      </ul>
    </div>
  </transition>
</template>

<script>
let echarts = require("echarts")
// 引入提示框和title组件
require("echarts/lib/component/tooltip")
require("echarts/lib/component/title")
export default {
  props: ["accuracy", "timeStr", "wrongCount", "integral", "questionListLength", "List"],
  mounted() {
    this.init()
  },
  methods: {
    // 判断当前题目正确还是错误
    close() {
      this.$emit("close")
    },
    // 初始化答题报告
    init() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(this.$refs.mySector)
      var option = {
        // 弹窗，响应鼠标指向，显示具体细节
        tooltip: {
          trigger: "item", // 以具体项目触发弹窗
          triggerOn: "click",
          padding: 10,
          formatter(params) {
            console.log(params)
            return `<span style="color:#00FFFF">${params.seriesName}</span><br/>
                    ${params.marker}${params.data.name}：<span style="color:yellow">${params.data.value}%</span> <br/>`
          }
        },
        color: ["#5BB89D", "#D8D8D8"],
        title: {
          text: "正确率",
          left: "center",
          top: "53%",
          textStyle: {
            color: "#AEAEAE",
            fontSize: 14,
            align: "center",
            fontWeight: 500
          }
        },
        graphic: {
          type: "text",
          left: "center",
          top: "40%",
          style: {
            text: Number(this.accuracy) + "%",
            textAlign: "center",
            fill: "#5BB89D",
            fontSize: 26,
            fontWeight: 600
          }
        },
        series: [
          {
            name: "本次答题情况",
            type: "pie",
            radius: ["55%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              }
            },
            data: [
              { value: Number(this.accuracy), name: "正确率" },
              { value: Number(100 - this.accuracy), name: "错误率" }
            ]
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>
<style scoped lang="stylus">
.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter,.slide-leave-to
  transform: translate3d(100%, 0, 0)
.detail-wrapper
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  width 100%
  height 100%
  background white
  z-index 2
  .detail-wrapper-header
    height 50px
    background-color #9CB8CA
    align-items center
    font-size 1.2rem
  .result__wrapper
    display flex
    flex-direction row
    flex-wrap wrap
    background-color white
    margin 0 10px 10px 10px
    box-shadow 1px 3px 12px #9C9C9C
    li
      width 50%
      height 60px
      text-align center
      line-height 100%
    .content__wrapper
      .time__value
        display block
        margin 10px 0 7px 0
      .content__text
        font-size 14px
        color #C1C1C1
  .card__wrapper
    height 30px
    font-size 14px
    font-weight 500
    border-bottom 1px solid #eee
    margin 15px 10px 10px 10px
    .card
      line-height 100%
    .answer__wrapper
      float right
      margin-top 2px
      font-size 12px
      color #938a8a
      .correct::before
        display inline-block
        content ''
        width 12px
        height 12px
        vertical-align middle
        border-radius 50%
        margin 0 3px 0 3px
        background-color #62CA9C
      .wrong::before
        display inline-block
        content ''
        width 12px
        height 12px
        vertical-align middle
        margin 0 3px 0 5px
        border-radius 50%
        background-color red
  .question__wrapper
    display flex
    flex-direction row
    flex-wrap wrap
    justify-content space-around
    background-color white
    li
      width 40px
      height 40px
      margin 0 15px 10px 15px
      border-radius 50%
      text-align center
      color white
      line-height 40px
    .green
      background-color #62CA9C
    .red
      background-color red
      span
        font-size 20px
</style>
