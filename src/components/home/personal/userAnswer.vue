<template>
  <transition name="slide">
    <!-- 答题闯关弹出框 -->
    <div class="popup">
      <!-- 头部 -->
      <mt-header title="答题闯关" class="popup__header">
        <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
      </mt-header>
      <!-- 主题内容部分 -->
      <div class="popup__content">
        <div class="content_wrapper">
          <span class="popup__content__title">
            今日剩余
            <span class="times">{{ times }}</span>
            次答题闯关次数
          </span>
          <van-row type="flex" justify="space-around" class="vanRow">
            <!-- 排行榜 -->
            <van-col span="6" @click="goGameRanking" class="vanCol">
              <div class="left">
                <img src="../../../../static/images/main/trophy.svg" />
                <span>排行榜</span>
              </div>
            </van-col>
            <!-- 个人详情 -->
            <van-col span="6" @click="goPersonalDetails" class="vanCol">
              <div class="left">
                <img
                  src="../../../../static/images/userAnswer/letter/report.svg"
                />
                <span>个人答题闯关报告</span>
              </div>
            </van-col>
            <!-- 闯关统计 -->
            <van-col span="6" @click="goAnswerStatistical" class="vanCol">
              <div class="left">
                <img
                  src="../../../../static/images/userAnswer/letter/statistical.svg"
                />
                <span>答题闯关统计</span>
              </div>
            </van-col>
          </van-row>
          <!-- 开始闯关按钮 -->
          <van-button
            type="primary"
            class="popup__content__start"
            @click="showAction"
          >
            开始闯关
          </van-button>
        </div>
      </div>
      <!-- ActionSheet动作面板,选择闯关题目的年级 -->
      <van-action-sheet
        v-model="showActionSheet"
        cancel-text="取消"
        close-on-click-action
        description="请选择要闯关的年级题目"
        @cancel="onCancel"
        :actions="actions"
        @select="onSelect"
        class="actionSheetClass"
      />
      <!-- 排行榜页面和个人详情页面 -->
      <router-view
        @changeShowActionSheet="showActionSheet = true"
      ></router-view>
      <!-- 答题页面 -->
      <transition name="van-slide-down">
        <answer-page
          v-if="showAnswerPage"
          :questionList="questionList"
          :TrueAnswerList="TrueAnswerList"
          :questionGrade="grade"
          @closeAnswerPage="closeAnswerPage"
        ></answer-page>
      </transition>
    </div>
  </transition>
</template>

<script>
import Vue from "vue"
import { ActionSheet, Col, Row, Overlay, Button } from "vant"
import AnswerPage from "./answerPage.vue"
import Axios from "axios"
import * as API from "../../../api/api.js"
import user from "../../../mixins/user.js"
import errorHandler from "../../../mixins/errorHandler.js"
import { Toast } from "mint-ui"
Vue.use(Button)
Vue.use(ActionSheet)
Vue.use(Col)
Vue.use(Row)
Vue.use(Overlay)
export default {
  mixins: [user, errorHandler],
  components: {
    AnswerPage
  },
  data() {
    return {
      // 获取题目数
      pageSize: 5,
      // 剩余闯关次数
      times: null,
      // 年级
      grade: null,
      // 是否显示答题页面
      showAnswerPage: false,
      // 是否显示闯关选取年级
      showActionSheet: false,
      // 存储题目的数组
      questionList: [],
      // 标准答案数组
      TrueAnswerList: [],
      // 闯关的关卡选择数据
      actions: [
        { name: "幼儿园" },
        { name: "一年级" },
        { name: "二年级" },
        { name: "三年级" },
        { name: "四年级" },
        { name: "五年级" },
        { name: "六年级" }
      ]
    }
  },
  created() {
    this.getAnswerCount()
  },
  mounted() {
    console.log("userId             " + this.userId)
    console.log("schoolId           " + this.schoolId)
    console.log("userInfo          " + this.userInfo)
    console.log("schoolType           " + this.schoolType)
    console.log("role             " + this.role)
    console.log("userType            " + this.userType)
    console.log("token               " + this.token)
  },
  methods: {
    // 点击按钮展示ActionSheet动作面板
    showAction() {
      this.showActionSheet = true
    },
    // 关闭闯关页面
    closeAnswerPage() {
      // 扣减答题次数
      Axios({
        url: API.reduceAnswerCountByStudentId,
        method: "POST",
        params: {
          studentId: this.userId
        },
        headers: {
          Authorization: this.token
        }
      })
        .then((res) => {
          if (res.data.code === 200) {
            // 重新获取闯关次数
            Axios({
              url: API.getAnswerCountByStudentId,
              method: "GET",
              params: {
                suit: this.grade,
                pageNo: 1,
                pageSize: 20,
                studentId: this.userId
              },
              headers: {
                Authorization: this.token
              }
            })
              .then((res) => {
                this.times = res.data
                this.showAnswerPage = false
              })
              .catch((err) => {
                this.errorHandler(err)
              })
          }
        })
        .catch((err) => {
          this.errorHandler(err)
        })
    },
    // 个人详情页面
    goPersonalDetails() {
      this.$router.push(
        `/ReadingOcean/wechat/userAnswer/personalAnswerdetail/${this.userId}`
      )
    },
    // 选择闯关的年级
    onSelect(item, name) {
      this.show = false
      if (this.times) {
        // 判断选中的是哪个年级
        switch (item.name) {
          case "幼儿园":
            this.grade = 0
            break
          case "一年级":
            this.grade = 1
            break
          case "二年级":
            this.grade = 2
            break
          case "三年级":
            this.grade = 3
            break
          case "四年级":
            this.grade = 4
            break
          case "五年级":
            this.grade = 5
            break
          case "六年级":
            this.grade = 6
            break
        }
        // 同时发起请求，获取判断、单选、多选题目，
        Axios.all([
          this.getJudgeQs(),
          this.getSingleQs(),
          this.getMultipleQs()
        ]).then(
          Axios.spread((JuageRes, SingleRes, MultipleRes) => {
            this.questionList = [
              ...JuageRes.data.dataList,
              ...SingleRes.data.dataList,
              ...MultipleRes.data.dataList
            ]
            // 根据题目数组，获取对应的题目正确答案数组
            for (let i = 0; i < this.questionList.length; i++) {
              this.TrueAnswerList[i] = this.questionList[i].answer
            }
            // 显示答题页面
            this.showAnswerPage = true
          })
        )
      } else {
        Toast("您今日已无闯关机会")
      }
    },
    // 取消选择闯关
    onCancel() {
      Toast("您已取消选择")
    },
    // 前往排行榜
    goGameRanking() {
      this.$router.push(
        `/ReadingOcean/wechat/userAnswer/gameRanking/${this.userId}`
      )
      console.log(this.userInfo)
    },
    // 前往闯关统计
    goAnswerStatistical() {
      this.$router.push("/ReadingOcean/wechat/userAnswer/answerStatistical")
    },
    // 获取闯关次数
    getAnswerCount() {
      Axios({
        url: API.getAnswerCountByStudentId,
        method: "GET",
        params: {
          suit: this.grade,
          pageNo: 1,
          pageSize: 20,
          studentId: this.userId
        },
        headers: {
          Authorization: this.token
        }
      })
        .then((res) => {
          this.times = res.data
        })
        .catch((err) => {
          this.errorHandler(err)
        })
    },
    // 获取年级判断题目
    getJudgeQs() {
      return Axios({
        url: API.queryTrueFalseQListBySuit,
        method: "GET",
        params: {
          suit: this.grade,
          pageNo: 1,
          pageSize: this.pageSize,
          studentId: this.userId
        },
        headers: {
          Authorization: this.token
        }
      })
    },
    // 获取单选题目
    getSingleQs() {
      return Axios({
        url: API.querySingleChoiceQListBySuit,
        method: "GET",
        params: {
          suit: this.grade,
          pageNo: 1,
          pageSize: this.pageSize,
          studentId: this.userId
        },
        headers: {
          Authorization: this.token
        }
      })
    },
    // 获取多选题目
    getMultipleQs() {
      return Axios({
        url: API.queryMultipleChoiceQListBySuit,
        method: "GET",
        params: {
          suit: this.grade,
          pageNo: 1,
          pageSize: this.pageSize,
          studentId: this.userId
        },
        headers: {
          Authorization: this.token
        }
      })
    }
  }
}
</script>
<style scoped lang="stylus">
.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter,.slide-leave-to
  transform: translate3d(100%, 0, 0)
.wrapper
  display flex
  align-items center
  justify-content center
  height 100%
.block
  width 120px
  height 120px
  background-color #fff

.actionSheetClass
  max-height 60%
  font-size 10px
  .van-action-sheet__description
    color red

.popup
  position fixed
  top 0
  left 0
  bottom 55px
  right 0
  width 100%
  z-index 2
  .popup__header
    height 50px
    background-color  #9cb8ca
    align-items center
    font-size 1.2rem
  .popup__content
    position absolute
    top 50px
    left  0
    right 0
    bottom 0
    background linear-gradient(to bottom, #9cb8ca 0%, #fff 100%)
    .content_wrapper
      .popup__content__title
        display block
        font-size 24px
        font-weight bold
        color yellow
        text-align center
        padding-top 30px
        padding-bottom 30px
        .times
          color red
          font-weight bold
      .vanRow
        margin: 20px 0 20px 0;
        .vanCol
          background-color pink
          .left
            text-align center
            img
              margin-top 10px
              width 60%
              height 60%
            span
              display block
              font-weight bold
      .popup__content__start
        margin 5%
        width 90%
        height 100px
        border-radius 15px
        background-color seagreen
        span
          display block
          line-height 100px
          height 100px
          font-size 20px
          text-align center
</style>
