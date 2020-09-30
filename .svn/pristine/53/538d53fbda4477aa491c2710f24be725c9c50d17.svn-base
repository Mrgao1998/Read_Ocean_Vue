<template>
  <div class="container">
    <div class="question-bar">
      <div class="question-title">
        <img src="../../../static/images/QA/question.svg" style="width:33px; vertical-align: text-bottom; margin:0 5px 0 0">
        <span class="question-title__content">{{ question.description }}</span>
      </div>
      <div class="question-detail">
        <span class="question-detail__name">{{ question.publisher }}</span><span>{{ question.relateBook | formateBookName }}</span>
        <span class="question-detail__time">{{ question.publishDate | formatDate }}</span>
      </div>
    </div>
    <p class="ignore-text" v-if="question.isIgnored">当前问题已被老师忽略</p>
    <div class="btn-group">
      <button class="btn btn-delete" v-if=" role === 'student' && isUserQuesion" @click="deleteQuestion()">删除问题</button>
      <button class="btn btn-ignore" v-if=" role === 'teacher' && !question.isIgnored && answerList.length === 0" @click="ignoreQuestion()">忽略问题</button>
      <button class="btn btn-answer" v-if=" role === 'teacher' && !question.isIgnored" @click="answerFormVisible = true">回答问题</button>
    </div>
    <div class="answer-list"
      v-infinite-scroll="loadMoreAnswer"
      infinite-scroll-disabled="answerLoading"
      infinite-scroll-distance="50"
      infinite-scroll-immediate-check="false">
      <answer
        v-for="answer in answerList"
        :id="answer.id"
        :key="answer.id"
        :responder="answer.responder"
        :responder-id="answer.userId"
        :like-number="answer.likeNum"
        :answer-date="answer.responseDate | formatDate"
        :description="answer.description"
        :is-accepted="answer.isAccepted"
        :quizzerId="question.publisherId"
        @delete="deleteAnswer(answer.userId, answer.id)"
        @accept="setAnswerState(answer.id)">
      </answer>
    </div>
    <div class="answer-form" v-show="answerFormVisible">
      <!-- 回答表单顶部按钮 -->
      <div class="answer-form__control">
        <button class="btn btn-cancel" @click="answerFormVisible = false">取消</button>
        <button class="btn btn-submit" @click="postAnswer()">提交</button>
      </div>
      <!-- 回答表单输入框 -->
      <textarea placeholder="请输入您的回答" class="input input-answer" rows="4" v-model="answerText"></textarea>
      <p class="score-title">学生提问加分: </p>
      <!-- 评分勾选框 -->
      <div class="score">
        <label class="score__option" v-for="option in scoreOptions">
          <input class="checkbox-invisible" type="radio" :value="option" v-model="score">
          {{option}}
          <span :class="{'radio-check': score === option, 'radio-uncheck': score !== option}"></span>
        </label>
      </div>
    </div>
  </div>
</template>
<script>
  import Answer from "../../components/common/answer/Answer.vue"
  import Axios from "axios"
  import * as API from "../../api/api.js"
  import user from "../../mixins/user.js"
  import errorHandler from "../../mixins/errorHandler.js"
  import { Toast, Indicator } from "mint-ui"
  export default {
    mixins: [ user, errorHandler ],
    data() {
      return {
        question: {
          description: "",
          publishDate: 0,
          publisher: "",
          publisherId: "",
          relateBook: "",
          isIgnored: false
        },
        answerList: [],
        answerLoading: false,
        currentPage: 1,
        maxPage: 100,
        detailReady: false,
        answerListReady: false,
        answerFormVisible: false,
        answerText: "",
        score: "",
        scoreOptions: ["优", "良", "中"]
      }
    },
    computed: {
      questionId() {
        return window.location.href.split("?questionId=")[1]
      },
      isUserQuesion() {
        return this.userId === this.question.publisherId
      },
      /* 页面所有数据初始化完成标志 */
      dataInitReady() {
        return this.detailReady && this.answerListReady
      },
      bestAnswerId() {
        var bestId = null
        this.answerList.forEach(ans => {
          if (ans.isAccepted) {
            bestId = ans.id
          }
        })
        return bestId
      }
    },
    filters: {
      formatDate(mm) {
        if (mm) {
          var date = new Date(mm)
          var year = date.getFullYear()
          var month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)
          var day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate()
          var hour = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours()
          var minute = date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes()
          return year + "-" + month + "-" + day + " " + hour + ":" + minute
        } else {
          return ""
        }
      },
      formateBookName(val) {
        return val ? "《" + val + "》" : ""
      }
    },
    components: {
      answer: Answer
    },
    methods: {
      getQuestionDetail(config) {
        return Axios({
          url: API.getQuestionDetail,
          method: "GET",
          params: {
            questionId: config.questionId
          },
          headers: {
            "Authorization": config.token
          }
        })
      },
      getAnswers(config) {
        return Axios({
          url: API.getAnswers,
          method: "GET",
          params: {
            questionId: config.questionId,
            pageNum: config.pageNum,
            limits: config.limits
          },
          headers: {
            "Authorization": config.token
          }
        })
      },
      ignoreQuestion() {
        Axios({
          url: API.ignoreQuestion,
          method: "POST",
          params: {
            questionId: this.questionId
          },
          headers: {
            "Authorization": this.token
          }
        }).then(res => {
          this.question.isIgnored = true
          Toast({
            message: res.data.msg,
            position: "bottom",
            duration: 1500
          })
        }).catch(err => {
          this.errorHandler(err)
        })
      },
      deleteQuestion() {
        Axios({
          url: API.deleteQuestion,
          method: "POST",
          params: {
            userId: this.userId,
            questionId: this.questionId
          },
          headers: {
            "Authorization": this.token
          }
        }).then(res => {
          Toast({
            message: res.data.msg,
            position: "middle",
            duration: 1500
          })
          setTimeout(() => {
            window.history.go(-1)
          }, 1500)
        }).catch(err => {
          this.errorHandler(err)
        })
      },
      postAnswer() {
        if (this.answerText.length > 0) {
          Axios({
            url: API.postAnswer,
            method: "POST",
            params: {
              questionId: this.questionId,
              userId: this.userId,
              description: this.answerText,
              score: this.score
            },
            headers: {
              "Authorization": this.token
            }
          }).then(res => {
            this.answerText = ""
            Toast({
              message: res.data.msg,
              position: "middle",
              duration: 1500
            })
            setTimeout(() => {
              window.location.reload()
            }, 1500)
          }).catch(err => {
            this.errorHandler(err)
          })
        } else {
          Toast({
            message: "请填写您的回答",
            position: "middle",
            duration: 1500
          })
        }
      },
      deleteAnswer(userId, answerId) {
        Axios({
          url: API.deleteAnswer,
          method: "POST",
          params: {
            userId: userId,
            answerId: answerId
          },
          headers: {
            "Authorization": this.token
          }
        }).then(res => {
          Toast({
            message: res.data.msg,
            position: "middle",
            duration: 1500
          })
          this.answerList = this.answerList.filter(ans => {
            return ans.id !== answerId
          })
        }).catch(err => {
          this.errorHandler(err)
        })
      },
      loadMoreAnswer() {
        if (this.currentPage < this.maxPage) {
          Indicator.open({
            text: "加载更多...",
            spinnerType: "snake"
          })
          this.currentPage += 1
          this.answerLoading = true
          this.getAnswers({
            questionId: this.questionId,
            pageNum: this.currentPage,
            limits: 10,
            token: this.token
          }).then(res => {
            Indicator.close()
            this.answerLoading = false
            this.answerList = this.answerList.concat(res.data.dataList)
          }).catch(err => {
            Indicator.close()
            this.answerLoading = false
            this.errorHandler(err)
          })
        } else {
          Toast({
            message: "已无更多数据",
            position: "bottom",
            duration: 1500
          })
        }
      },
      setAnswerState(answerId) {
        Axios({
          url: API.setAnswerState,
          method: "POST",
          params: {
            questionId: this.questionId,
            answerId: answerId
          },
          headers: {
            "Authorization": this.token
          }
        }).then(res => {
          if (this.bestAnswerId && this.bestAnswerId === answerId) {
            this.answerList.forEach(ans => {
              if (ans.id === answerId) ans.isAccepted = false
            })
          } else if (this.bestAnswerId && this.bestAnswerId !== answerId) {
            this.answerList.forEach(ans => {
              if (ans.id === answerId) ans.isAccepted = true
              else ans.isAccepted = false
            })
          } else if (!this.bestAnswerId) {
            this.answerList.forEach(ans => {
              if (ans.id === answerId) ans.isAccepted = true
            })
          }
        }).catch(err => {
          this.errorHandler(err)
        })
      }
    },
    watch: {
      dataInitReady(val) {
        /* 当详情和回答列表数据初始化完成之后关闭提示 */
        if (val) Indicator.close()
      }
    },
    created() {
      Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      })
      this.getQuestionDetail({
        questionId: this.questionId,
        token: this.token
      }).then(res => {
        /* 设置详情加载完成标志 */
        this.detailReady = true
        this.question = res.data
      }).catch(err => {
        Indicator.close()
        this.errorHandler(err)
      })

      this.getAnswers({
        questionId: this.questionId,
        pageNum: this.currentPage,
        limits: 10,
        token: this.token
      }).then(res => {
        /* 设置问题列表初始化加载完成标志 */
        this.answerListReady = true
        this.currentPage = res.data.currentPage
        this.maxPage = res.data.totalPage
        this.answerList = res.data.dataList
      }).catch(err => {
        Indicator.close()
        this.errorHandler(err)
      })
    }
  }
</script>
<style>
  body {
    width: 100%;
    padding: 0;
    margin: 0;
    width: 100%;
    color: #324057;
    -webkit-text-size-adjust: 100% !important;
  }

  .container {
    box-sizing: border-box;
    width: 100%;
    min-height: 100vh;
    padding-bottom: 40px;
  }

  .question-bar {
    /*position: fixed;*/
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    border-bottom: solid 1px #eee;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(0,0,0,.22);
    z-index: 1000;
  }

  /*问题详情页*/
  .question-title {
    display: table;
    height: 30px;
    line-height: 30px;
    font-weight: 400;
    margin-bottom: 10px;
    vertical-align: middle;
  }

  .question-title__content {
    line-height: 1em;
    height: 30px;
    font-size: 1.2em;
    word-break: break-all;
  }

  .question-detail {
    color: #999;
    font-size: 12px;
    font-weight: 400;
  }

  .question-detail__name {
    font-weight: bold;
    margin-right: 8px;
  }

  .question-detail__time {
    float: right;
  }

  .answer-list {
    width: 100%;
  }

  .btn {
    display: block;
    outline: 0;
    border: 0;
    background: none;
  }

  .btn-cancel,
  .btn-submit {
    color: #3C89FD;
    font-size: 16px;
  }

  .btn-group {
    display: flex;
    flex-flow: row nowrap;
  }

  .btn-ignore,
  .btn-delete,
  .btn-answer {
    background: #3C89FD;
    box-shadow: 0 2px 6px 0 rgba(0,0,0,.22);
    color: #fff;
    font-size: 14px;
    padding: 5px 10px;
    margin: 10px auto;
  }

  .btn-delete {
    background: #F46D78;
  }

  .ignore-text {
    text-align: center;
    color: #999;
  }

  .answer-form {
    box-sizing: border-box;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background-color: #fff;
    overflow: hidden;
    z-index: 2;
  }

  .answer-form__control {
    display: flex;
    justify-content: space-between;
  }

  .input {
    appearance: none;
    resize: none;
    outline: 0;
  }

  .input-answer {
    box-sizing: border-box;
    width: 100%;
    padding: 5px;
    margin-bottom: 10px;
    font-size: 14px;
    border: 1px solid transparent;
  }

  .score-title {
    padding: 5px;
    margin: 0;
    font-size: 14px;
    color: #757575;
  }

  .score {
    font-weight: 200;
    box-sizing: border-box;
    width: 100%;
    margin-top: 10px;
    padding: 10px 20px;
  }

  .score__option {
    margin: 10px 0;
    display: inline-block;
    width: calc(100% / 3);
  }

  .check-box {
    width: 17px;
    height:17px;
    margin-right: 3px;
    display: flex;
  }

  .checkbox-invisible {
    width: 1px;
    height: 1px;
    opacity: 0;
  }

  .radio-check {
    display: block;
    float: left;
    width: 16px;
    height: 16px;
    margin: 2px 0;
    background: url("../../../static/images/Task/choose-act.svg") no-repeat;
    background-size: contain;
  }

  .radio-uncheck {
    display: block;
    float: left;
    width: 14px;
    height: 14px;
    margin: 2px 0;
    border: 1px solid #ddd;
    border-radius: 50%;
  }
</style>
