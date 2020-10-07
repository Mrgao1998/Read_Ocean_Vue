<template>
  <transition name="slide">
    <div class="detail-wrapper">
      <!-- 头部 -->
      <mt-header title="答题闯关统计" class="detail-wrapper-header">
        <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
      </mt-header>
      <!-- 主要内容 -->
      <div class="popup__content">

        <!-- 答题年级段分布占比 --> 
        <!-- 学生答题男女占比 -->


        
        <!-- 答题数目前三名的班级、年级、学校 -->
        <!-- <p class="personName-wrapper">可爱的<span class="personName">高燕生同学</span></p>
        <p class="rightTotal-wrapper">
          累计答对题目总数为：<span class="rightTotal">330</span>
        </p>
        <p class="rightTotal-wrapper">
          每次答题平均时长为：<span class="rightTotal">121s</span>
        </p> -->
        <!--答对题目类型占比分布-->
        <!-- <correct-accuracy :picTerm="term"></correct-accuracy> -->
        <!--各类型题目正确率柱状图-->
        <!-- <person-histogram :picType="type1" :picTitle="title1" :picTerm="term"></person-histogram> -->
        <!--各类型题目答对数量柱状图-->
        <!-- <person-histogram :picType="type2" :picTitle="title2" :picTerm="term"></person-histogram> -->
        <!--答题时间段分布柱状图-->
        <!-- <person-histogram :picType="type3" :picTitle="title3" :picTerm="term"></person-histogram> -->
        <!-- <p>各年级题目占比</p> -->
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "AnswerStatistical",
  data() {
    return {}
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
