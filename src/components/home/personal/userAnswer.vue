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
          <h2 class="popup__content__title">今日剩余2次答题闯关次数</h2>
          <van-row type="flex" justify="space-around">
            <!-- 排行榜 -->
            <van-col span="6" @click="goGameRanking">
              <div class="left">
                <img src="../../../../static/images/main/trophy.svg" />
                <p>排行榜</p>
              </div>
            </van-col>
            <!-- 个人详情 -->
            <van-col span="6" @click="goPersonalDetails">
              <div class="left">
                <img src="../../../../static/images/main/trophy.svg" />
                <p>
                  个人答题闯关报告
                </p>
              </div>
            </van-col>
            <!-- 闯关统计 -->
            <van-col span="6" @click="goAnswerStatistical">
              <div class="left">
                <img src="../../../../static/images/main/trophy.svg" />
                <p>答题闯关统计</p>
              </div>
            </van-col>
          </van-row>
          <!-- 开始闯关按钮 -->
          <van-button
            type="primary"
            class="popup__content__start"
            @click="showActionSheet = true"
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
          @closeAnswerPage="closeAnswerPage"
        ></answer-page>
      </transition>
    </div>
  </transition>
</template>

<script>
import Axios from "axios"
import * as API from "../../../api/api.js"
import user from "../../../mixins/user.js"
import errorHandler from "../../../mixins/errorHandler.js"
import { Toast } from "mint-ui"
import Vue from "vue"
import { ActionSheet, Col, Row, Overlay, Button } from "vant"
import AnswerPage from "./answerPage.vue"
Vue.use(ActionSheet)
Vue.use(Col)
Vue.use(Row)
Vue.use(Overlay)
Vue.use(Button)
export default {
  mixins: [user],
  components: {
    AnswerPage
  },
  data() {
    return {
      // 年级
      grade: 3,
      // 是否显示答题页面
      showAnswerPage: false,
      // 是否显示闯关选取年级
      showActionSheet: false,
      questionList: [],
      // 标准答案数组
      TrueAnswerList: [],
      // 闯关的关卡选择数据
      actions: [
        { name: "全部", subname: "到时候填写题目完成的比例" },
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
  mounted() {
    Toast({
      message: "欢迎来到答题闯关",
      position: "bottom",
      duration: 1500
    })
    console.log("userId             " + this.userId)
    console.log("schoolId           " + this.schoolId)
    console.log("userInfo          " + this.userInfo)
    console.log("schoolType           " + this.schoolType)
    console.log("role             " + this.role)
    console.log("userType            " + this.userType)
    console.log("token               " + this.token)
    this.getJudgeQs().then((res) => {
      console.log(res.data)
    })
  },
  methods: {
    // 关闭闯关页面
    closeAnswerPage() {
      this.showAnswerPage = false
    },
    // 个人详情页面
    goPersonalDetails() {
      this.$router.push(
        `/ReadingOcean/wechat/userAnswer/personalAnswerdetail/${this.userId}`
      )
    },
    // 选择闯关的年级
    onSelect(item) {
      this.show = false
      console.log(item)
      // 判断选中的是哪个年级
      switch (item) {
        case "全部":
          this.grade = null
          break
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
          console.log(this.TrueAnswerList)
          console.log(this.questionList)
          this.showAnswerPage = true
        })
      )
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
      this.$router.push(
        "/ReadingOcean/wechat/userAnswer/answerStatistical"
      )
    },
    // 获取年级判断题目
    getJudgeQs() {
      return Axios({
        url: API.queryTrueFalseQListBySuit,
        method: "GET",
        params: {
          suit: this.grade,
          pageNo: 120
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
          pageNo: 1
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
          pageNo: 1
        },
        headers: {
          Authorization: this.token
        }
      })
    },
    // 分页获取所有学生闯关积分
    getAllStudentRank() {
      Axios({
        url: API.getAllStudentRank,
        method: "GET",
        params: {
          pageNo: 1
        },
        headers: {
          Authorization: this.token
        }
      })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 获取某一学生rank分数,没有记录则初始化该学生答题记录
    getStudentRankByStudentId() {
      return Axios({
        url: API.getStudentRankByStudentId,
        method: "GET",
        params: {
          studentId: this.userId + ""
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
  bottom 0
  right 0;
  width 100%
  height 100%
  z-index 2
  .popup__header
    height 50px
    background-color  #9cb8ca
    align-items center
    font-size 1.2rem
  .popup__content
    width 100%
    position absolute
    top 50px
    bottom 55px
    background linear-gradient(to bottom, #9cb8ca 0%, #fff 100%)
    .content_wrapper
      position absolute
      top 50%
      transform translateY(-70%)
      .popup__content__title
        color: yellow
        text-align center
        margin-bottom 30px
      .left
        border-radius 15px
        background-color pink
        text-align center
        img
          margin-top 10px
          width 60%
          height 60%
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
