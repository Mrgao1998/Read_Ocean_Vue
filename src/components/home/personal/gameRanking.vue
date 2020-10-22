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
          <van-tabs @click="onClick" animated>
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
                  <!-- 当前学生班级排名 -->
                  <li class="item">
                    <van-row
                      type="flex"
                      justify="space-between"
                      class="item-detail"
                    >
                      <rank-number :num="RankInfo_classRank"></rank-number>
                      <van-col span="6" class="info">{{
                        RankInfo_studentName
                      }}</van-col>
                      <van-col span="12" class="info">{{
                        RankInfo_classesName
                      }}</van-col>
                      <van-col span="4" class="info">{{
                        RankInfo_rank
                      }}</van-col>
                    </van-row>
                  </li>
                  <li
                    class="item"
                    v-for="(item, index) in classRankList"
                    :key="index"
                  >
                    <van-row
                      type="flex"
                      justify="space-between"
                      class="item-detail"
                    >
                      <rank-number :num="item.number"></rank-number>
                      <van-col span="6">{{ item.name }}</van-col>
                      <van-col span="12">{{ item.classesName }}</van-col>
                      <van-col span="4">{{ item.rank }}</van-col>
                    </van-row>
                  </li>
                  <!-- loading底部加载 -->
                  <li v-show="isLoading" class="loadMore">
                    <van-loading size="24px" color="#1989fa"
                      >加载中...</van-loading
                    >
                  </li>
                  <li v-show="classRankListNoMore" class="noMore">
                    已无更多数据可加载
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
                  <!-- 当前学生年级排名 -->
                  <li class="item">
                    <van-row
                      type="flex"
                      justify="space-between"
                      class="item-detail"
                    >
                      <rank-number :num="RankInfo_gradeRank"></rank-number>
                      <van-col span="6" class="info">{{
                        RankInfo_studentName
                      }}</van-col>
                      <van-col span="12" class="info">{{
                        RankInfo_classesName
                      }}</van-col>
                      <van-col span="4" class="info">{{
                        RankInfo_rank
                      }}</van-col>
                    </van-row>
                  </li>
                  <li
                    class="item"
                    v-for="(item, index) in gradeRankList"
                    :key="index"
                  >
                    <van-row
                      type="flex"
                      justify="space-between"
                      class="item-detail"
                    >
                      <rank-number :num="item.number"></rank-number>
                      <van-col span="6">{{ item.name }}</van-col>
                      <van-col span="12">{{ item.classesName }}</van-col>
                      <van-col span="4">{{ item.rank }}</van-col>
                    </van-row>
                  </li>
                  <!-- loading底部加载 -->
                  <li v-show="isLoading" class="loadMore">
                    <van-loading size="24px" color="#1989fa"
                      >加载中...</van-loading
                    >
                  </li>
                  <li v-show="gradeRankListNoMore" class="noMore">
                    已无更多数据可加载
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
                    <van-col span="11">年级班级</van-col>
                    <van-col span="5">闯关积分</van-col>
                  </van-row>
                  <!-- 当前学生学校排名 -->
                  <li class="item">
                    <van-row
                      type="flex"
                      justify="space-between"
                      class="item-detail"
                    >
                      <rank-number :num="RankInfo_schoolRank"></rank-number>
                      <van-col span="6" class="info">{{
                        RankInfo_studentName
                      }}</van-col>
                      <van-col span="12" class="info">{{
                        RankInfo_gradeName + RankInfo_classesName
                      }}</van-col>
                      <van-col span="4" class="info">{{
                        RankInfo_rank
                      }}</van-col>
                    </van-row>
                  </li>
                  <li
                    class="item"
                    v-for="(item, index) in schoolRankList"
                    :key="index"
                  >
                    <van-row
                      type="flex"
                      justify="space-between"
                      class="item-detail"
                    >
                      <rank-number :num="item.number"></rank-number>
                      <van-col span="6">{{ item.name }}</van-col>
                      <van-col span="12">{{
                        item.gradeName + item.classesName
                      }}</van-col>
                      <van-col span="4">{{ item.rank }}</van-col>
                    </van-row>
                  </li>
                  <!-- loading底部加载 -->
                  <li v-show="isLoading" class="loadMore">
                    <van-loading size="24px" color="#1989fa"
                      >加载中...</van-loading
                    >
                  </li>
                  <li v-show="schoolRankListNoMore" class="noMore">
                    已无更多数据可加载
                  </li>
                </ul>
              </div>
            </van-tab>
            <!-- 社区排名 -->
            <van-tab title="社区排名" name="3">
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
                  <!-- 当前学生社区排名 -->
                  <li class="item">
                    <van-row
                      type="flex"
                      justify="space-between"
                      class="item-detail"
                    >
                      <rank-number :num="RankInfo_totalRank"></rank-number>
                      <van-col span="6" class="info">{{
                        RankInfo_studentName
                      }}</van-col>
                      <van-col span="12" class="info">{{
                        RankInfo_schoolName
                      }}</van-col>
                      <van-col span="4" class="info">{{
                        RankInfo_rank
                      }}</van-col>
                    </van-row>
                  </li>
                  <li
                    class="item"
                    v-for="(item, index) in communityRankList"
                    :key="index"
                  >
                    <van-row
                      type="flex"
                      justify="space-between"
                      class="item-detail"
                    >
                      <rank-number :num="item.number"></rank-number>
                      <van-col span="6">{{ item.name }}</van-col>
                      <van-col span="12">{{ item.schoolName }}</van-col>
                      <van-col span="4">{{ item.rank }}</van-col>
                    </van-row>
                  </li>
                  <!-- loading底部加载 -->
                  <li v-show="isLoading" class="loadMore">
                    <van-loading size="24px" color="#1989fa"
                      >加载中...</van-loading
                    >
                  </li>
                  <li v-show="communityRankListNoMore" class="noMore">
                    已无更多数据可加载
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
import Axios from "axios"
import RankNumber from "./answerComponents/rankNumber.vue"
import * as API from "../../../api/api.js"
import user from "../../../mixins/user.js"
import getDetailsRankInfo from "../../../mixins/getDetailsRankInfo.js"
import Scroll from "./scroll.vue"
import Vue from "vue"
import { ActionSheet, Icon, Loading, Tab, Tabs, Sticky, Col, Row } from "vant"
Vue.use(Sticky)
const RESERVED_HEIGHT = 50
Vue.use(ActionSheet)
Vue.use(Icon)
Vue.use(Loading)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Col)
Vue.use(Row)
export default {
  mixins: [user, getDetailsRankInfo],
  name: "GameRanking",
  components: {
    Scroll,
    RankNumber
  },
  data() {
    return {
      num: "number",
      // scroll组件滑动的Y距离
      scrollY: 0,
      // 排行榜下拉刷新的loading显示与否
      isLoading: false,
      // 班级排名是否还能加载更多
      classRankListNoMore: false,
      // 年级排名是否还能加载更多
      gradeRankListNoMore: false,
      // 学校排名是否还能加载更多
      schoolRankListNoMore: false,
      // 社区排名是否还能加载更多
      communityRankListNoMore: false,
      // 发一次请求获取的排名的数量
      pageSize: 20,
      // 当前tab的下标
      index: "0",
      // 班级排名
      classRankList: [],
      // 班级排名页数
      classpageNo: 1,
      // 年级排名
      gradeRankList: [],
      gradepageNo: 1,
      // 学校排名
      schoolRankList: [],
      schoolpageNo: 1,
      // 总排名
      communityRankList: [],
      communitypageNo: 1,
      // 排名列表
      rankList: []
    }
  },
  created() {
    this.probeType = 3
    // 告知scroll组件派发滑动事件
    this.listenScroll = true
    // 告知scroll组件派发下拉加载事件
    this.pullup = true
    // 初始化排名
    this.getAllRank()
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
    this.$refs.list.$el.style.top = `${this.imageHeight}px`
  },
  methods: {
    // 封装为排名对象数组中的每一个对象添加排名属性的函数
    addNumber(arr) {
      let arrRes = []
      let num = null
      arr.map((item, index, arr) => {
        if (index === 0) {
          num = index + 1
        } else {
          if (arr[index].rank !== arr[index - 1].rank) {
            num++
          }
        }
        arrRes.push(
          Object.assign(
            {},
            {
              answerCount: item.answerCount,
              classesName: item.classesName,
              gradeName: item.gradeName,
              id: item.id,
              name: item.name,
              rank: item.rank,
              schoolName: item.schoolName,
              studentId: item.studentId,
              number: num
            }
          )
        )
      })
      return arrRes
    },
    // 获取班级排名
    getClassRank() {
      return Axios({
        url: API.getAllStudentRank,
        method: "GET",
        params: {
          userId: this.userId,
          schoolId: this.userInfo.schoolId,
          classId: this.userInfo.classId,
          pageNo: this.classpageNo++,
          pageSize: this.pageSize
        },
        headers: {
          Authorization: this.token
        }
      })
    },
    // 获取年级排名
    getGradeRank() {
      return Axios({
        url: API.getAllStudentRank,
        method: "GET",
        params: {
          userId: this.userId,
          schoolId: this.userInfo.schoolId,
          grade: this.userInfo.classId,
          pageNo: this.gradepageNo++,
          pageSize: this.pageSize
        },
        headers: {
          Authorization: this.token
        }
      })
    },
    // 获取学校排名
    getSchoolRank() {
      return Axios({
        url: API.getAllStudentRank,
        method: "GET",
        params: {
          userId: this.userId,
          schoolId: this.userInfo.schoolId,
          pageNo: this.schoolpageNo++,
          pageSize: this.pageSize
        },
        headers: {
          Authorization: this.token
        }
      })
    },
    // 获取社区排名
    getCommunityRank() {
      return Axios({
        url: API.getAllStudentRank,
        method: "GET",
        params: {
          userId: this.userId,
          range: "community",
          pageNo: this.communitypageNo++,
          pageSize: this.pageSize
        },
        headers: {
          Authorization: this.token
        }
      })
    },
    // 初始化排名
    getAllRank() {
      // 同时发起请求，获取所有排名，
      Axios.all([
        this.getClassRank(),
        this.getGradeRank(),
        this.getSchoolRank(),
        this.getCommunityRank()
      ]).then(
        Axios.spread(
          (getClassRank, getGradeRank, getSchoolRank, getCommunityRank) => {
            this.classRankList = this.addNumber([...getClassRank.data])
            this.gradeRankList = this.addNumber([...getGradeRank.data])
            this.schoolRankList = this.addNumber([...getSchoolRank.data])
            this.communityRankList = this.addNumber([...getCommunityRank.data])
            // 进来默认是班级排名
            this.rankList = this.classRankList
          }
        )
      )
    },
    // 显示loading
    scroll(pos, maxScrollY) {
      this.scrollY = pos.y
      if (this.scrollY - 64 <= maxScrollY) {
        if (
          (this.index === "0" && this.classRankListNoMore === true) ||
          (this.index === "1" && this.gradeRankListNoMore === true) ||
          (this.index === "2" && this.schoolRankListNoMore === true) ||
          (this.index === "3" && this.communityRankListNoMore === true)
        ) {
          this.isLoading = false
        } else {
          this.isLoading = true
        }
      }
    },
    // 滑动到排名的底部，加载更多数据
    scrollToEnd() {
      if (this.index === "0" && this.classRankListNoMore === false) {
        // 获取更多班级排名
        this.getClassRank().then((res) => {
          if (res.data.length === 0) {
            // 已无更多数据可加载
            this.isLoading = false
            this.classRankListNoMore = true
          } else {
            this.classRankList = this.addNumber([
              ...this.classRankList,
              ...res.data
            ])
          }
          this.rankList = this.classRankList
        })
      } else if (this.index === "1" && this.gradeRankListNoMore === false) {
        // 获取更多年级排名
        this.getGradeRank().then((res) => {
          if (res.data.length === 0) {
            // 已无更多数据可加载
            this.isLoading = false
            this.gradeRankListNoMore = true
          } else {
            this.gradeRankList = this.addNumber([
              ...this.gradeRankList,
              ...res.data
            ])
          }
          this.rankList = this.gradeRankList
        })
      } else if (this.index === "2" && this.schoolRankListNoMore === false) {
        // 获取更多学校排名
        this.getSchoolRank().then((res) => {
          if (res.data.length === 0) {
            // 已无更多数据可加载
            this.isLoading = false
            this.schoolRankListNoMore = true
          } else {
            this.schoolRankList = this.addNumber([
              ...this.schoolRankList,
              ...res.data
            ])
          }
          this.rankList = this.schoolRankList
        })
      } else if (this.index === "3" && this.communityRankListNoMore === false) {
        // 获取更多社区排名
        this.getCommunityRank().then((res) => {
          if (res.data.length === 0) {
            // 已无更多数据可加载
            this.isLoading = false
            this.communityRankListNoMore = true
          } else {
            this.communityRankList = this.addNumber([
              ...this.communityRankList,
              ...res.data
            ])
          }
          this.rankList = this.communityRankList
        })
      }
      this.isLoading = false
    },
    // 点击相关排名，到时候发送数据请求
    onClick(name, title) {
      this.index = name
      // 切换tab时,把对应数据给rankList
      switch (name) {
        case "0":
          this.rankList = this.classRankList
          break
        case "1":
          this.rankList = this.gradeRankList
          break
        case "2":
          this.rankList = this.schoolRankList
          break
        case "3":
          this.rankList = this.communityRankList
          break
      }
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
            height 100%
            line-height 52px
            text-align center
            .info
              color blue
        .loadMore
          height 30px
          line-height 30px
          font-size 24px
          text-align center
          color white
        .noMore
          height 30px
          line-height 30px
          font-size 14px
          text-align center
          color #969799
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
      .van-loading
        text-align center
</style>
