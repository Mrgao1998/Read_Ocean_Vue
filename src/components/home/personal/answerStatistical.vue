<template>
  <transition name="slide">
    <div class="detail-wrapper">
      <!-- 头部 -->
      <mt-header title="答题闯关统计" class="detail-wrapper-header">
        <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
      </mt-header>
      <!-- 主要内容 -->
      <div :class='[times === 4 ?"showpopup__content":"popup__content"]'>
        <!--各年级闯关信息统计-->
        <person-histogram
          :picTitle="title4"
          @addTimes="addTimes"
        ></person-histogram>
        <!-- 各积分段中男女生比例柱状图 -->
        <person-histogram
          :picTitle="title5"
          @addTimes="addTimes"
        ></person-histogram>
        <!-- 答题时间段分布柱状图（所有同学）-->
        <person-histogram
          :picTitle="title6"
          @addTimes="addTimes"
        ></person-histogram>
        <!-- 答题积分前五的学校 -->
        <person-histogram
          :picTitle="title7"
          @addTimes="addTimes"
        ></person-histogram>
      </div>
      <!-- 没加载数据时，显示loading -->
      <div class="loading-container" v-if="times != 4">
        <van-loading type="spinner" color="#1989fa" />
      </div>
    </div>
  </transition>
</template>

<script>
import PersonHistogram from "./answermoduleEcharts/personHistogram.vue"
import Vue from "vue"
import { Loading } from "vant"
Vue.use(Loading)
export default {
  name: "AnswerStatistical",
  components: {
    PersonHistogram
  },
  data() {
    return {
      title4: "各年级闯关信息统计",
      title5: "各积分段中男女生比例",
      title6: "答题时间段分布(所有同学)",
      title7: "答题积分top5学校",
      times: 0
    }
  },
  methods: {
    // 请求一次加1，用于确保数据全部加载完，未加载完就显示loading
    addTimes() {
      this.times++
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
  display flex
  flex-direction column
  top 0
  left 0
  bottom 0
  right 0
  width 100%
  height 100%
  background #45515a
  color #ccc
  .detail-wrapper-header
    height 50px
    background-color #9CB8CA
    align-items center
    font-size 1.2rem
  .showpopup__content
    visibility visible
    flex 1
    width 100%
    -webkit-overflow-scrolling touch
    overflow-y scroll
  .popup__content
    visibility hidden
    flex 1
    width 100%
    -webkit-overflow-scrolling touch
    overflow-y scroll
    .rightTotal-wrapper
      font-size 18px
      text-align center
      .rightTotal
        color yellow
        font-weight bold
    .personName-wrapper
      text-align center
      color #eee
      font-size 18px
      letter-spacing 2px
      .personName
        color pink
        font-size 20px
        font-weight bold
  .loading-container
    flex 1
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
    .van-loading
      text-align center
</style>
