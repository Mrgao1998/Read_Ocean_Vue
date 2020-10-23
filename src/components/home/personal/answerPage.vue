<template>
  <div class="answerPage-container">
    <!-- 顶部 -->
    <van-nav-bar
      :title="str"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 问题题目以及答题选项 -->
    <van-swipe
      class="my-swipe"
      ref="vanSwipe"
      initial-swipe="0"
      :loop="isLoop"
      :show-indicators="isShowindicators"
      duration="300"
      :touchable="touchable"
    >
      <van-swipe-item v-for="(item, index) in questionList" :key="index">
        <!-- 题目显示 -->
        <div class="queNumber-container">
          第
          <span class="queNumber">{{ answerIndex + 1 }}</span
          >/<span class="queTotal">{{ questionList.length }}</span> 题
        </div>
        <!-- 题目内容与答案选项 -->
        <div class="questionAnswer-wrapper">
          <!-- 题目 -->
          <div class="question-wrapper" v-if="questionList.length > 0">
            <!-- 判断是否判断题 -->
            <p
              class="queType"
              v-if="
                questionList[answerIndex].answer === '0' ||
                questionList[answerIndex].answer === '1'
                  ? true
                  : false
              "
              >判断题--<span class="bookName">&laquo;{{questionList[answerIndex].bookName}}&raquo;</span></p>
            <!-- 判断是多选题 -->
            <p
              class="queType"
              v-else-if="questionList[answerIndex].answer.length > 1"
              >多选题--<span class="bookName">&laquo;{{questionList[answerIndex].bookName}}&raquo;</span></p>
            <!-- 判断是否单选题 -->
            <p class="queType" v-else>单选题--<span class="bookName">&laquo;{{questionList[answerIndex].bookName}}&raquo;</span></p>
            <!-- 题目的描述 -->
            <span class="question">
              {{ questionList[answerIndex].question }}
            </span>
          </div>
          <!-- 答案选项,到时候考虑封装组件，传入不同的值，判断是什么类型的题目 -->
          <!-- 判断题答案选项显示 -->
          <van-radio-group
            v-model="judgeOrSingleChoice"
            class="answerOptions"
            v-if="
              questionList[answerIndex].answer === '0' ||
              questionList[answerIndex].answer === '1'
                ? true
                : false
            "
          >
            <van-radio name="1" checked-color="#07c160" shape="square"
              >对</van-radio
            >
            <van-radio name="0" checked-color="#07c160" shape="square"
              >错</van-radio
            >
          </van-radio-group>
          <!-- 多选题答案选项显示 -->
          <van-checkbox-group
            v-model="MultipleChoice"
            direction="vertical"
            v-else-if="questionList[answerIndex].answer.length > 1"
            class="answerOptions"
          >
            <van-checkbox
              name="A"
              shape="square"
              checked-color="#07c160"
              v-if="questionList[answerIndex].choiceA"
              >A、{{ questionList[answerIndex].choiceA }}</van-checkbox
            >
            <van-checkbox
              name="B"
              shape="square"
              checked-color="#07c160"
              v-if="questionList[answerIndex].choiceB"
              >B、{{ questionList[answerIndex].choiceB }}</van-checkbox
            >
            <van-checkbox
              name="C"
              shape="square"
              checked-color="#07c160"
              v-if="questionList[answerIndex].choiceC"
              >C、{{ questionList[answerIndex].choiceC }}</van-checkbox
            >
            <van-checkbox
              name="D"
              shape="square"
              checked-color="#07c160"
              v-if="questionList[answerIndex].choiceD"
              >D、{{ questionList[answerIndex].choiceD }}</van-checkbox
            >
            <van-checkbox
              name="E"
              shape="square"
              checked-color="#07c160"
              v-if="questionList[answerIndex].choiceE"
              >E、{{ questionList[answerIndex].choiceE }}</van-checkbox
            >
            <van-checkbox
              name="F"
              shape="square"
              checked-color="#07c160"
              v-if="questionList[answerIndex].choiceF"
              >F、{{ questionList[answerIndex].choiceF }}</van-checkbox
            >
          </van-checkbox-group>
          <!-- 单选题答案选项显示 -->
          <van-radio-group
            v-model="judgeOrSingleChoice"
            class="answerOptions"
            v-else
          >
            <van-radio
              name="A"
              checked-color="#07c160"
              v-if="questionList[answerIndex].choiceA"
              shape="square"
              >A、{{ questionList[answerIndex].choiceA }}</van-radio
            >
            <van-radio
              name="B"
              checked-color="#07c160"
              v-if="questionList[answerIndex].choiceB"
              shape="square"
              >B、{{ questionList[answerIndex].choiceB }}</van-radio
            >
            <van-radio
              name="C"
              checked-color="#07c160"
              v-if="questionList[answerIndex].choiceC"
              shape="square"
              >C、{{ questionList[answerIndex].choiceC }}</van-radio
            >
            <van-radio
              name="D"
              checked-color="#07c160"
              v-if="questionList[answerIndex].choiceD"
              shape="square"
              >D、{{ questionList[answerIndex].choiceD }}</van-radio
            >
          </van-radio-group>
        </div>
      </van-swipe-item>
    </van-swipe>
    <!-- 底部上一题下一题按钮 -->
    <div class="bottom">
      <van-row type="flex" justify="space-between">
        <van-col span="12" class="last" @click="lastQue">上一题</van-col>
        <van-col
          span="12"
          class="next"
          @click="nextQue"
          ref="next"
          v-html="nextHtml"
        ></van-col>
      </van-row>
    </div>
    <!-- 答题结果dialog -->
    <van-dialog
      v-model="showDialog"
      :showCancelButton="isFalse"
      confirmButtonText="返回"
      :title="dialogTitle"
      show-cancel-button
      @close="close"
    >
      <p>
        正确率：<span>{{ accuracy }}</span>
      </p>
      <p>
        答错题目数目为：<span>{{ wrongCount }}</span>
      </p>
      <p>
        添加的积分：<span>{{ integral }}</span>
      </p>
      <p>
        答题所花时间为：<span>{{ times }}s</span>
      </p>
    </van-dialog>
  </div>
</template>

<script>
import Vue from "vue"
import Axios from "axios"
import * as API from "../../../api/api.js"
import user from "../../../mixins/user.js"
import errorHandler from "../../../mixins/errorHandler.js"
import {
  RadioGroup,
  Radio,
  Toast,
  Swipe,
  SwipeItem,
  Field,
  CheckboxGroup,
  Checkbox,
  NavBar,
  Dialog
} from "vant"
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Field)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Toast)
Vue.use(NavBar)
Vue.use(Dialog)
export default {
  name: "AnswerPage",
  mixins: [user, errorHandler],
  mounted() {
    // 开始计时
    this.time = setInterval(this.timer, 1000)
    // 获取开始答题的时间戳
    this.nowTime = new Date().getHours()
    console.log(this.userId)
  },
  data() {
    return {
      isFalse: false,
      // 添加的积分
      integral: 0,
      nowTime: 0, // 开始答题时间戳，用于分析答题时间段分布
      totalSingleNum: 0, // 总单选题数目
      totalMultipleNum: 0, // 总多选题数目
      totalTOFNum: 0, // 总判断题数目
      times: 0, // 统计共多少秒时间
      // 当前题目的索引
      answerIndex: 0,
      // 下一题文本
      nextHtml: "下一题",
      // 是否循环轮播图
      isLoop: false,
      // 是否显示轮播图的指示器
      isShowindicators: false,
      // 判断题或单选题答案
      judgeOrSingleChoice: "",
      // 多选题答案
      MultipleChoice: [],
      // 学生答案数组,开发完置空，现在测试
      AnswerList: [
        "0",
        "0",
        "0",
        "1",
        "0",
        "C",
        "A",
        "A",
        "A",
        "A",
        "CE",
        "AE",
        "AB",
        "ADE",
        "BCD"
      ],
      // 学生答对题目id的数组
      correctIdList: [],
      // 轮播图是否可以手动滑动
      touchable: false,
      h: 0, // 定义时，分，秒，毫秒并初始化为0；
      m: 0,
      s: 0,
      ms: 0,
      time: 0, // 定时器
      str: "00:00:00",
      // 错误题数
      wrongCount: 0,
      // 答题正确率
      accuracy: "",
      // 展示dialog组件
      showDialog: false,
      // dialog组件标题
      dialogTitle: ""
    }
  },
  props: {
    // 题目数组
    questionList: Array,
    // 题目正确答案数组
    TrueAnswerList: Array,
    // 所选答题的题目的年级
    questionGrade: Number
  },
  methods: {
    // 改变提交时题目的格式
    changeQuestionList(questionList) {
      let newList = []
      questionList.map((val, index, arr) => {
        newList[index] = {}
        newList[index].questionId = val.id
        newList[index].suit = this.questionGrade
        if (val.answer.length === 1) {
          if (val.answer === "0" || val.answer === "1") {
            newList[index].quetionType = 3
          } else {
            newList[index].quetionType = 1
          }
        } else {
          newList[index].quetionType = 2
        }
      })
      return newList
    },
    // 改变时间戳格式
    changeNowTime(nowTime) {
      if (nowTime >= 0 && nowTime < 4) {
        nowTime = "zero"
      } else if (nowTime >= 4 && nowTime < 8) {
        nowTime = "four"
      } else if (nowTime >= 8 && nowTime < 12) {
        nowTime = "eight"
      } else if (nowTime >= 12 && nowTime < 16) {
        nowTime = "twelve"
      } else if (nowTime >= 16 && nowTime < 20) {
        nowTime = "sixteen"
      } else if (nowTime >= 20 && nowTime < 24) {
        nowTime = "twenty"
      }
      return nowTime
    },
    // 向父组件传递关闭答题页面事件
    close() {
      // this.$emit("closeAnswerPage")
      console.log("接收到close事件了")
      this.$emit("closeAnswerPage")
    },
    // 点击dialog的返回按钮
    confirm() {
      this.$emit("close")
    },
    // 定义计时函数
    timer() {
      this.ms = this.ms + 1000 // 毫秒
      if (this.ms >= 1000) {
        this.ms = 0
        this.s = this.s + 1 // 秒
      }
      if (this.s >= 60) {
        this.s = 0
        this.m = this.m + 1 // 分钟
      }
      if (this.m >= 60) {
        this.m = 0
        this.h = this.h + 1 // 小时
      }
      this.str =
        this.toDub(this.h) +
        ":" +
        this.toDub(this.m) +
        ":" +
        this.toDub(this.s)
      // 统计共看了多少秒
      this.times = this.s + this.m * 60 + this.h * 3600
    },
    // 计时器补0操作
    toDub(n) {
      if (n < 10) {
        return "0" + n
      } else {
        return "" + n
      }
    },
    // 点击返回按钮
    onClickLeft() {
      Dialog.confirm({
        title: "确定离开当前闯关答题？",
        message: "确定离开将会作答报废并且消耗一次闯关机会"
      })
        .then(() => {
          // on confirm
          Toast("您已离开答题闯关")
          this.$emit("closeAnswerPage")
          clearInterval(this.time)
        })
        .catch(() => {
          // on cancel
          Toast("请继续闯关")
        })
    },
    // 检查是否有题目没有作答
    checkAnswerList(AnswerList) {
      for (var i = 0; i < AnswerList.length; i++) {
        if (AnswerList[i] === "") {
          return false
        }
      }
      return true
    },
    // 点击上一题
    lastQue() {
      if (this.answerIndex === 0) {
        Toast.fail("已经是第一题，无法再上一题")
      } else {
        // 如果当前题目已经有选择答案，那么就把选择的选项保存起来，分判断单选和多选题两大类。
        if (this.questionList[this.answerIndex].answer.length > 1) {
          this.AnswerList[this.answerIndex] = this.MultipleChoice.join("")
        } else {
          this.AnswerList[this.answerIndex] = this.judgeOrSingleChoice
        }
        // 轮播图返回上一张
        this.$refs.vanSwipe.prev()
        // 防止在最后一题向上返回时，本该是“下一题”的按钮，还是“提交”按钮
        this.nextHtml = "下一题"
        // 当前题目的标记更改
        this.answerIndex--
        // 返回到上一题时，把之前选择了的选项显示出来
        if (this.questionList[this.answerIndex].answer.length > 1) {
          // 如果返回到上一题是多选题
          this.MultipleChoice = [
            this.AnswerList[this.answerIndex][0],
            this.AnswerList[this.answerIndex][1],
            this.AnswerList[this.answerIndex][2],
            this.AnswerList[this.answerIndex][3],
            this.AnswerList[this.answerIndex][4],
            this.AnswerList[this.answerIndex][5]
          ]
        } else {
          // 如果返回到上一题是单选或者判断题
          this.judgeOrSingleChoice = this.AnswerList[this.answerIndex]
        }
      }
    },
    // 点击下一题
    nextQue() {
      // 如果当前题目已经有选择答案，那么就把选择的选项保存起来，分判断单选和多选题两大类。
      if (this.questionList[this.answerIndex].answer.length > 1) {
        this.AnswerList[this.answerIndex] = this.MultipleChoice.join("")
      } else {
        this.AnswerList[this.answerIndex] = this.judgeOrSingleChoice
      }
      // 如果是最后一题，进行提交操作；如果是倒数第二题在进入最后一题前，改变“下一题”按钮为“提交”
      if (this.answerIndex === this.questionList.length - 1) {
        // 处理提交功能,假如有未完成的题目，提示作答；如果全部完成，则进行提交
        if (this.checkAnswerList(this.AnswerList) === false) {
          Toast.fail("你仍有未作答的题目")
        } else {
          Dialog.confirm({
            message: "确定提交并查看答题结果吗？"
          })
            .then(() => {
              // on confirm
              for (let i = 0; i < this.TrueAnswerList.length; i++) {
                if (this.TrueAnswerList[i].length === 1) {
                  // 单选或者判断题
                  if (this.questionList[i].answer === "0" || this.questionList[i].answer === "1") {
                    // 判断题
                    console.log("this.totalTOFNum++了")
                    this.totalTOFNum++
                  } else {
                    // 单选题
                    console.log("this.totalSingleNum++了")
                    this.totalSingleNum++
                  }
                  if (this.AnswerList[i] === this.TrueAnswerList[i]) {
                    console.log(`第${i + 1}单选或判断题题答案正确！`)
                    // 单选或判断答对加3分
                    this.integral += 3
                    // 把答对的题目id加入数组中
                    if (this.questionList[i].answer === "0" || this.questionList[i].answer === "1") {
                      this.correctIdList.push({
                        questionId: this.questionList[i].id,
                        suit: this.questionGrade,
                        questionType: 3
                      })
                    } else {
                      this.correctIdList.push({
                        questionId: this.questionList[i].id,
                        suit: this.questionGrade,
                        questionType: 1
                      })
                    }
                  } else {
                    this.wrongCount++
                    console.log(`第${i + 1}题答案错误！！`)
                  }
                } else {
                  // 记录多选题的数目
                  console.log("this.totalMultipleNum++了")
                  this.totalMultipleNum++
                  // 处理多选题的答案
                  if (
                    this.TrueAnswerList[i].length === this.AnswerList[i].length
                  ) {
                    var Isequal = true
                    for (
                      let index = 0;
                      index < this.AnswerList[i].length;
                      index++
                    ) {
                      if (
                        this.TrueAnswerList[i].includes(
                          this.AnswerList[i][index]
                        ) === false
                      ) {
                        Isequal = false
                      }
                    }
                    if (Isequal === false) {
                      this.wrongCount++
                      console.log(`第${i + 1}多选题答案错误！！`)
                    } else {
                      // 多选题答对加5分
                      this.integral += 5
                      // 把答对的题目id加入数组中
                      // this.rightMultipleChoiceQuetionList.push(this.questionList[i].id)
                      this.correctIdList.push({
                        questionId: this.questionList[i].id,
                        suit: this.questionGrade,
                        questionType: 2
                      })
                      console.log(`第${i + 1}多选题答案正确！！`)
                    }
                  } else {
                    this.wrongCount++
                    console.log(`第${i + 1}多选题答案错误！！`)
                  }
                }
              }
              // 正确率
              this.accuracy = `${(
                ((this.questionList.length - this.wrongCount) /
                  this.questionList.length) *
                100
              ).toFixed(1)}%`
              // 处理dialog显示的title
              if ((
                ((this.questionList.length - this.wrongCount) /
                  this.questionList.length) *
                100
              ).toFixed(1) > 80) {
                this.dialogTitle = "你真棒！继续加油哦"
              } else if ((
                ((this.questionList.length - this.wrongCount) /
                  this.questionList.length) *
                100
              ).toFixed(1) < 60) {
                this.dialogTitle = "不要灰心，要加强阅读哦"
              } else {
                this.dialogTitle = "仍需要加油哦"
              }
              console.log(`添加的积分为：${this.integral}`)
              console.log(this.correctIdList)
              console.log(`错误的题目总数为：${this.wrongCount}`)
              console.log(`本次答题所花时间为为：${this.times}s`)
              console.log(`本次答题正确率为：${this.accuracy}%`)
              console.log(`总判断题数目为：${this.totalTOFNum}`)
              console.log(`总单选题数目为：${this.totalSingleNum}`)
              console.log(`总多断题数目为：：${this.totalMultipleNum}`)
              console.log(this.questionList)
              clearInterval(this.time)
              this.showDialog = true
              // 答题的时间戳
              console.log(this.correctIdList)
              this.nowTime = this.changeNowTime(this.nowTime)
              console.log(this.nowTime)
              Axios({
                url: API.addScoreAndInsertAnswerRecord,
                method: "POST",
                data: {
                  studentId: this.userId,
                  nowTime: this.nowTime,
                  rightQuestion: this.correctIdList,
                  score: this.integral,
                  totalSingleNum: this.totalSingleNum,
                  totalMultipleNum: this.totalMultipleNum,
                  totalTOFNum: this.totalTOFNum,
                  timeConsuming: this.times,
                  totalQuestionList: this.changeQuestionList(this.questionList)
                },
                headers: {
                  Authorization: this.token
                }
              }).then(res => {
                this.$emit("reduceAnswerCountByStudentId")
              }).catch(err => {
                console.log(errorHandler(err))
              })
            })
            .catch(() => {
              Toast("请继续作答")
            })
        }
      } else if (this.answerIndex === this.questionList.length - 2) {
        // 当前题目下标更改
        this.answerIndex++
        // 轮播图显示下一张
        this.$refs.vanSwipe.next()
        // 把“下一题”更改为“提交”
        this.nextHtml = "提交"
        // 进入下一题时，如果此题之前有记录，则显示之前的选项；如果没有记录，那就把选项置空
        if (this.questionList[this.answerIndex].answer.length > 1) {
          // if else为了区分之前有无对该题进行作答，如有，则恢复选项；若无，选项置空
          if (this.AnswerList[this.answerIndex] === undefined) {
            this.MultipleChoice = []
          } else {
            this.MultipleChoice = [
              this.AnswerList[this.answerIndex][0],
              this.AnswerList[this.answerIndex][1],
              this.AnswerList[this.answerIndex][2],
              this.AnswerList[this.answerIndex][3],
              this.AnswerList[this.answerIndex][4],
              this.AnswerList[this.answerIndex][5]
            ]
          }
        } else {
          // if else为了区分之前有无对该题进行作答，如有，则恢复选项；若无，选项置空
          if (this.AnswerList[this.answerIndex] === undefined) {
            this.judgeOrSingleChoice = ""
          } else {
            this.judgeOrSingleChoice = this.AnswerList[this.answerIndex]
          }
        }
      } else {
        this.$refs.vanSwipe.next()
        this.answerIndex++
        // 进入下一题时，如果此题之前有记录，则显示之前的选项；如果没有记录，那就把选项置空
        if (this.questionList[this.answerIndex].answer.length > 1) {
          // if else为了区分之前有无对该题进行作答，如有，则恢复选项；若无，选项置空
          if (this.AnswerList[this.answerIndex] === undefined) {
            this.MultipleChoice = []
          } else {
            this.MultipleChoice = [
              this.AnswerList[this.answerIndex][0],
              this.AnswerList[this.answerIndex][1],
              this.AnswerList[this.answerIndex][2],
              this.AnswerList[this.answerIndex][3],
              this.AnswerList[this.answerIndex][4],
              this.AnswerList[this.answerIndex][5]
            ]
          }
        } else {
          // if else为了区分之前有无对该题进行作答，如有，则恢复选项；若无，选项置空
          if (this.AnswerList[this.answerIndex] === undefined) {
            this.judgeOrSingleChoice = ""
          } else {
            this.judgeOrSingleChoice = this.AnswerList[this.answerIndex]
          }
        }
      }
    }
  }
}
</script>
<style scoped lang="stylus">
.answerPage-container
  display flex
  flex-direction column
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background-color  white
  .my-swipe
    flex 1
    .van-swipe-item
      font-size 20px
      .queNumber-container
        letter-spacing 3px
        text-align center
        line-height 40px
        font-size 18px
        padding 20px 0 20px 0
        height 40px
        color #000000
        background-color white
        background-size cover
        .queNumber
          letter-spacing 0px
          font-size 28px
          color #fbb561
        .queTotal
          letter-spacing 0px
          color #fbb561
      .questionAnswer-wrapper
        width 100%
        font-size 16px
        line-height 20px
        .question-wrapper
          width 94%
          margin 0 auto 20px auto
          .queType
            display block
            color green
            font-size 16px
            font-weight bold
            margin-bottom 10px
            .bookName
              color red
        .answerOptions
          .van-radio
            margin 30px
          .van-checkbox
            margin 30px
  .bottom
    height 50px
    line-height 50px
    color white
    background-color pink
    text-align center
    .last
      background-color pink
    .next
      background-color green
</style>
