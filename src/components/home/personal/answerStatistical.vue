<template>
  <transition name="slide">
    <div class="detail-wrapper">
      <!-- 头部 -->
      <mt-header title="答题闯关统计" class="detail-wrapper-header">
        <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
      </mt-header>
      <!-- 主要内容 -->
      <div class="popup__content">
        <!-- 各年级答题总数柱状图（直接所有学生） -->
        <!-- 各年级的答题积分柱状图 -->
        <!-- 各年级答题平均时长柱状图（直接所有学生） -->

        <!--各年级闯关信息统计-->
        <person-histogram
          :picType="type4"
          :picTitle="title4"
          :picTerm="term"
        ></person-histogram>
        <!-- 各积分段中男女生比例柱状图 -->
        <person-histogram
          :picType="type5"
          :picTitle="title5"
          :picTerm="term"
        ></person-histogram>
        <!-- 答题时间段分布柱状图（所有同学）-->
        <person-histogram
          :picType="type6"
          :picTitle="title6"
          :picTerm="term"
        ></person-histogram>
        <!-- 答题积分前三的班级 -->
        <person-histogram
          :picType="type7"
          :picTitle="title7"
          :picTerm="term"
        ></person-histogram>
        <!-- 答题积分前三的学校 -->
      </div>
    </div>
  </transition>
</template>

<script>
import PersonHistogram from "./answermoduleEcharts/personHistogram.vue"
export default {
  name: "AnswerStatistical",
  components: {
    PersonHistogram
  },
  data() {
    return {
      term: 1,
      type4: "4",
      title4: "各年级闯关信息统计",
      type5: "5",
      title5: "各积分段中男女生比例",
      type6: "6",
      title6: "答题时间段分布(所有同学)",
      type7: "7",
      title7: "答题积分top5学校"
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
</style>
