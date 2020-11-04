<template>
  <transition name="slide">
    <div class="detail-wrapper">
      <!-- 头部 -->
      <mt-header title="个人答题闯关报告" class="detail-wrapper-header">
        <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
      </mt-header>
      <!-- 主要内容 -->
      <div class="popup__content" v-if="isShow">
        <p class="personName-wrapper">
          可爱的<span class="personName">{{ RankInfo_studentName }}同学</span>
        </p>
        <p class="rightTotal-wrapper">
          累计答对题目总数为：<span class="rightTotal">{{
            RankInfo_rightCount
          }}</span>
        </p>
        <p class="rightTotal-wrapper">
          每次答题平均时长为：<span class="rightTotal">{{
            RankInfo_avgTime+"s"
          }}</span>
        </p>
        <p class="rightTotal-wrapper">
          个人闯关积分为：<span class="rightTotal">{{ RankInfo_rank }}</span>
        </p>
        <p class="rightTotal-wrapper">
          目前所处段位：
          <span class="level">{{ RankInfo_rank | judgeLevel}}</span>
        </p>
        <p class="rightTotal-wrapper" v-if="RankInfo_rank <= 600">
          距离下一段位还需<span class="rightTotal">{{ RankInfo_rank | short }}</span>积分
        </p>
        <p class="highestLevel-wrapper" v-else>恭喜您已经处于最高段位！</p>
        <!--答对题目类型占比分布-->
        <correct-accuracy :ResData="ResData"></correct-accuracy>
        <!--各类型题目正确率柱状图-->
        <person-histogram
          :ResData="ResData"
          :picTitle="title1"
        ></person-histogram>
        <!--各类型题目答对数量柱状图-->
        <person-histogram
          :ResData="ResData"
          :picTitle="title2"
        ></person-histogram>
        <!--答题时间段分布折线图-->
        <person-histogram
          :ResData="ResData"
          :picTitle="title3"
        ></person-histogram>
        <!-- <p>各年级题目占比</p> -->
        <person-histogram
          :ResData="ResData"
          :picTitle="title8"
        ></person-histogram>
      </div>
      <!-- 没加载数据时，显示loading -->
      <div class="loading-container" v-else>
        <van-loading type="spinner" color="#1989fa" />
      </div>
    </div>
  </transition>
</template>

<script>
import getDetailsRankInfo from "../../../mixins/getDetailsRankInfo.js"
import CorrectAccuracy from "./answermoduleEcharts/correctAccuracy.vue"
import PersonHistogram from "./answermoduleEcharts/personHistogram.vue"
import Vue from "vue"
import { Loading } from "vant"
Vue.use(Loading)
export default {
  name: "personalAnswerdetail",
  components: {
    CorrectAccuracy,
    PersonHistogram
  },
  mixins: [getDetailsRankInfo],
  filters: {
    // 过滤器，根据积分返回相应段位
    judgeLevel(integral) {
      if (integral >= 0 && integral < 100) {
        return "倔强青铜"
      } else if (integral >= 100 && integral < 200) {
        return "秩序白银"
      } else if (integral >= 200 && integral < 300) {
        return "荣耀黄金"
      } else if (integral >= 300 && integral < 400) {
        return "尊贵铂金"
      } else if (integral >= 400 && integral < 500) {
        return "永恒钻石"
      } else if (integral >= 500 && integral < 600) {
        return "至尊星耀"
      } else {
        return "最强王者"
      }
    },
    // 用于处理距离下一段位差多少分
    short(integral) {
      return (100 - integral % 100)
    }
  },
  data() {
    return {
      title1: "各类型题目正确率柱状图",
      title2: "各类型题目答对数量柱状图",
      title3: "答题时间段分布折线图",
      title8: "各年级所答题目数柱状图"
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
  .popup__content
    flex 1
    width 100%
    -webkit-overflow-scrolling touch
    overflow-y scroll

    .highestLevel-wrapper
      font-size 18px
      text-align center
      color blue
      font-weight bold
    .rightTotal-wrapper
      font-size 18px
      text-align center
      .rightTotal
        color yellow
        font-weight bold
      .level
        color red
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
