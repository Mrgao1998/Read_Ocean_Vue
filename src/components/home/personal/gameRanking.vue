<template>
  <transition name="slide">
    <div class="ranking-list">
      <!-- 头部 -->
      <mt-header title="闯关积分排行榜" class="back">
        <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
      </mt-header>
      <!-- 背景图片 -->
      <div class="bg-image" ref="bgImage">
        <div class="play-wrapper">
          <div class="play" ref="playBtn" @click="changeShow">
            <!-- <van-icon name="play" class="icon-play" /> -->
            <span class="text">开始闯关</span>
          </div>
        </div>
        <div class="filter" ref="filter"></div>
      </div>
      <div class="bg-layer" ref="layer"></div>
      <scroll
        :data="rankList"
        @scroll="scroll"
        @scrollToEnd="scrollToEnd"
        :listen-scroll="listenScroll"
        :probe-type="probeType"
        :pullup="pullup"
        class="list"
        ref="list"
      >
        <div class="rank-list-wrapper">
          <!-- 标签页,选择班级排名或者学校排名 总排名 -->
          <van-tabs @click="onClick">
            <!-- 班级排名 -->
            <van-tab title="班级排名" name="0">
              <div class="rank-list">
                <ul class="rank-ul">
                  <van-row
                    type="flex"
                    justify="space-between"
                    class="rank-title"
                  >
                    <van-col span="4">排名</van-col>
                    <van-col span="6">姓名</van-col>
                    <van-col span="11">班级</van-col>
                    <van-col span="5">闯关积分</van-col>
                  </van-row>
                  <li
                    class="item"
                    v-for="(item, index) in rankList"
                    :key="index"
                  >
                    <van-row
                      type="flex"
                      justify="space-between"
                      class="item-detail"
                    >
                      <van-col span="4" class="ranking">{{
                        index + 1
                      }}</van-col>
                      <van-col span="6">高燕生</van-col>
                      <van-col span="12">{{ userInfo.className }}</van-col>
                      <van-col span="4">16</van-col>
                    </van-row>
                  </li>
                  <!-- loading底部加载 -->
                  <li v-show="isLoading" class="loadMore">
                    <van-loading size="24px" color="#1989fa"
                      >加载中...</van-loading
                    >
                  </li>
                </ul>
              </div>
            </van-tab>
            <!-- 年级排名 -->
            <van-tab title="年级排名" name="1">
              <div class="rank-list">
                <ul class="rank-ul">
                  <van-row
                    type="flex"
                    justify="space-between"
                    class="rank-title"
                  >
                    <van-col span="4">排名</van-col>
                    <van-col span="6">姓名</van-col>
                    <van-col span="11">班级</van-col>
                    <van-col span="5">闯关积分</van-col>
                  </van-row>
                  <li
                    class="item"
                    v-for="(item, index) in rankList"
                    :key="index"
                  >
                    <van-row
                      type="flex"
                      justify="space-between"
                      class="item-detail"
                    >
                      <van-col span="4" class="ranking">{{
                        index + 1
                      }}</van-col>
                      <van-col span="6">高燕生</van-col>
                      <van-col span="12">{{ userInfo.className }}</van-col>
                      <van-col span="4">166</van-col>
                    </van-row>
                  </li>
                  <!-- loading底部加载 -->
                  <li v-show="isLoading" class="loadMore">
                    <van-loading size="24px" color="#1989fa"
                      >加载中...</van-loading
                    >
                  </li>
                </ul>
              </div>
            </van-tab>
            <!-- 学校排名 -->
            <van-tab title="学校排名" name="2">
              <div class="rank-list">
                <ul class="rank-ul">
                  <van-row
                    type="flex"
                    justify="space-between"
                    class="rank-title"
                  >
                    <van-col span="4">排名</van-col>
                    <van-col span="6">姓名</van-col>
                    <van-col span="11">年级</van-col>
                    <van-col span="5">闯关积分</van-col>
                  </van-row>
                  <li
                    class="item"
                    v-for="(item, index) in rankList"
                    :key="index"
                  >
                    <van-row
                      type="flex"
                      justify="space-between"
                      class="item-detail"
                    >
                      <van-col span="4" class="ranking">{{
                        index + 1
                      }}</van-col>
                      <van-col span="6">高燕生</van-col>
                      <van-col span="12">{{ userInfo.grade }}</van-col>
                      <van-col span="4">1666</van-col>
                    </van-row>
                  </li>
                  <!-- loading底部加载 -->
                  <li v-show="isLoading" class="loadMore">
                    <van-loading size="24px" color="#1989fa"
                      >加载中...</van-loading
                    >
                  </li>
                </ul>
              </div>
            </van-tab>
            <!-- 总排名 -->
            <van-tab title="总排名" name="3">
              <div class="rank-list">
                <ul class="rank-ul">
                  <van-row
                    type="flex"
                    justify="space-between"
                    class="rank-title"
                  >
                    <van-col span="4">排名</van-col>
                    <van-col span="6">姓名</van-col>
                    <van-col span="11">学校</van-col>
                    <van-col span="5">闯关积分</van-col>
                  </van-row>
                  <li
                    class="item"
                    v-for="(item, index) in rankList"
                    :key="index"
                  >
                    <van-row
                      type="flex"
                      justify="space-between"
                      class="item-detail"
                    >
                      <van-col span="4" class="ranking">{{
                        index + 1
                      }}</van-col>
                      <van-col span="6">高燕生</van-col>
                      <van-col span="12">{{ userInfo.schoolName }}</van-col>
                      <van-col span="4">16666</van-col>
                    </van-row>
                  </li>
                  <!-- loading底部加载 -->
                  <li v-show="isLoading" class="loadMore">
                    <van-loading size="24px" color="#1989fa"
                      >加载中...</van-loading
                    >
                  </li>
                </ul>
              </div>
            </van-tab>
          </van-tabs>
        </div>
        <!-- 没加载到排行榜数据时，显示loading -->
        <div class="loading-container" v-show="!rankList.length">
          <van-loading type="spinner" color="#1989fa" />
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script>
import user from "../../../mixins/user.js"
import Scroll from "./scroll.vue"
import Vue from "vue"
import { ActionSheet, Icon, Loading, Tab, Tabs, Sticky } from "vant"
Vue.use(Sticky)
const RESERVED_HEIGHT = 50
Vue.use(ActionSheet)
Vue.use(Icon)
Vue.use(Loading)
Vue.use(Tab)
Vue.use(Tabs)
export default {
  mixins: [user],
  name: "GameRanking",
  components: {
    Scroll
  },
  data() {
    return {
      // scroll组件滑动的Y距离
      scrollY: 0,
      // 排行榜下拉刷新的loading显示与否
      isLoading: false,
      // showActionSheet: false,
      // 排名列表
      rankList: [
        "11111111111",
        "222222222",
        "33333333",
        "4444444",
        "555555555",
        "66666666",
        "777777777",
        "8888888",
        "999999999",
        "11111111111",
        "222222222",
        "33333333",
        "4444444",
        "555555555",
        "66666666",
        "777777777",
        "8888888",
        "999999999"
      ]
    }
  },
  created() {
    this.probeType = 3
    // 告知scroll组件派发滑动事件
    this.listenScroll = true
    // 告知scroll组件派发下拉加载事件
    this.pullup = true
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
    this.$refs.list.$el.style.top = `${this.imageHeight}px`
  },
  methods: {
    // 显示loading
    scroll(pos, maxScrollY) {
      this.scrollY = pos.y
      if (this.scrollY - 64 <= maxScrollY) {
        this.isLoading = true
      }
    },
    // 滑动到排名的底部，加载更多数据
    scrollToEnd() {
      // 发起求
      var list11 = [
        "11111111111",
        "222222222",
        "33333333",
        "4444444",
        "555555555",
        "66666666",
        "777777777",
        "8888888",
        "999999999",
        "11111111111",
        "222222222",
        "33333333",
        "4444444",
        "555555555",
        "66666666",
        "777777777",
        "8888888",
        "999999999"
      ]
      this.rankList = [...this.rankList, ...list11]
      this.isLoading = false
    },
    // 点击相关排名，到时候发送数据请求
    onClick(name) {
      console.log(name)
      console.log("点击了tabs")
    },
    // 点击开始闯关，向外传递事件，改变showActionSheet的值，显示ActionSheet
    changeShow() {
      this.$emit("changeShowActionSheet")
    }
  },
  watch: {
    // 排行榜列表上拉下拉页面效果的操作
    scrollY(newVal) {
      let translateY = Math.max(this.minTransalteY, newVal)
      let scale = 1
      let zIndex = 0
      let blur = 0
      const percent = Math.abs(newVal / this.imageHeight)
      if (newVal > 0) {
        scale = 1 + percent
        zIndex = 10
      } else {
        blur = Math.min(20, percent * 20)
      }

      this.$refs.layer.style["transform"] = `translate3d(0,${translateY}px,0)`
      this.$refs.filter.style["backdrop-filter"] = `blur(${blur}px)`
      if (newVal < this.minTransalteY) {
        zIndex = 10
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
        this.$refs.playBtn.style.display = "none"
      } else {
        this.$refs.bgImage.style.paddingTop = "70%"
        this.$refs.bgImage.style.height = 0
        this.$refs.playBtn.style.display = ""
      }
      this.$refs.bgImage.style["transform"] = `scale(${scale})`
      this.$refs.bgImage.style.zIndex = zIndex
    }
  }
}
</script>
<style scoped lang="stylus">
$color-background = #eee
$font-size-medium = 16px
.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter,.slide-leave-to
  transform: translate3d(100%, 0, 0)

.ranking-list
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  width 100%
  height 100%
  background-color $color-background
  .back
    position absolute
    width 100%
    height 50px
    align-items center
    font-size 1.2rem
    background-color transparent
    z-index 99
  .bg-image
    position: relative
    width: 100%
    height: 0
    padding-top: 70%
    transform-origin top
    background-size cover
    background-image url("../../../../static/images/userAnswer/gameRankingBg.png")
    .play-wrapper
      position: absolute
      bottom: 20px
      z-index: 50
      width: 100%
      .play
        box-sizing: border-box
        width: 135px
        padding: 7px 0
        margin: 0 auto
        text-align: center
        border: 1px solid yellow
        color: yellow
        border-radius: 100px
        font-size: 0
        .icon-play
          display: inline-block
          vertical-align: middle
          margin-right: 6px
          font-size: 16px
        .text
          display: inline-block
          vertical-align: middle
          font-size: 16px
    .filter
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      background: rgba(7, 17, 27, 0.4)
  .bg-layer
    position: relative
    height: 100%
    background: $color-background
  .list
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    background: $color-background
    .rank-list-wrapper
      // padding: 20px 30px
      .rank-list
        .rank-title
          height 30px
          line-height 30px
          background-color $color-background
          text-align center
          font-size 16px
          font-weight bold
        .item
          display: flex
          align-items: center
          text-align center
          box-sizing: border-box
          height: 52px
          font-size 14px
          background-color $color-background
          .item-detail
            width 100%
            text-align center
            .ranking
              font-weight bold
        .loadMore
          text-align center
          background-color black
          color white
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
      .van-loading
        text-align center
</style>
