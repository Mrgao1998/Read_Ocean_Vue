<template>
  <div class="container">
    <div class="task-detail">
      <!--任务详情-->
      <h1 class="task-headline">{{ taskInfo.taskTitle }}</h1>
      <div class="task-content-box">
        <div class="task-content-box__content">
          <p class="task-author"
             v-if="role === 'student'">
            <img class="author-icon"
                 src="../../../static/images/Task/author.png">
            {{ taskInfo.publisher }} 发布
          </p>
          <div class="task-time-box">
            <img class="time-icon"
                 src="../../../static/images/Task/time02.png">
            <div class="time-box">
              <p class="task-time">开始时间：{{ taskInfo.startDate | formatDate }}</p>
              <p class="task-time">结束时间：{{ taskInfo.endDate | formatDate }}</p>
            </div>
          </div>
        </div>
        <div class="task-content-box__btn">
          <button class="evaluate-btn evaluate-btn-finish"
                  v-if="role === 'student'"
                  :disabled="taskInfo.isDone"
                  @click="finishTask()">{{ finishText }}</button>
          <button class="evaluate-btn"
                  v-if="role === 'student'"
                  @click="EvaPopupVisible = !EvaPopupVisible"
                  :disabled="!taskInfo.isDone || taskInfo.hasComment">{{ evaluateText }}</button>
          <button class="evaluate-btn"
                  v-if="role === 'teacher'"
                  @click="deleteTask()">删除任务</button>
        </div>
      </div>
      <p class="task-desc">
        <img style="width: 4%"
             src="../../../static/images/Task/desc.png">
        任务描述：{{ taskInfo.description }}
      </p>
    </div>
    <!--评价弹出框组件-->
    <div v-if="role === 'student'">
      <evaluatePopup @close="EvaPopupVisible = !EvaPopupVisible"
                     @submitEva="handleSubmit"
                     :evaPopupShow="EvaPopupVisible"
                     :allEvaOptions="taskInfo.comments">
      </evaluatePopup>
    </div>
    <!--评价栏-->
    <div class="parental-evaluate"
         v-if="role === 'student' && taskInfo.assess !== null">
      <h1 class="eva-title">教师评价</h1>
      <p class="eva-content">
        <span>{{ taskInfo.assess }}</span>
      </p>
    </div>
    <div class="parental-evaluate"
         v-if="role === 'student' && taskInfo.hasComment && taskInfo.comments.length > 0">
      <h1 class="eva-title">家长评价</h1>
      <p class="eva-content">
        <span v-for="(item, index) in taskInfo.comments"
              :key="index">{{ item }}</span>
      </p>
    </div>
    <!--任务书籍-->
    <div class="task-book-box"
         :class="{ 'no-shadow': role === 'student' }"
         v-if="taskInfo.taskBooks.length > 0">
      <h1 class="book-box-title">任务书籍(<span style="color:red">红色为必读</span>，<span style="color:green">绿色为选读</span>)</h1>
      <div class="book-box-content">
        <single-book v-for="book in taskInfo.taskBooks"
                     :bookname="book.title"
                     :imgSrc="book.coverImg"
                     :bookId="book.id"
                     :key="book.id"
                     :isNecessary="book.necessary"
                     customWidth="33.33333%"></single-book>
      </div>
    </div>
    <!--查看学生任务详情-->
    <transition name="slide">
      <div class="detail"
           v-if="detailVisible">
        <div class="mainType">
          <span class="type now"
                @click="changeType($event)">全部</span>
          <span class="type"
                @click="changeType($event)">短评</span>
          <span class="type"
                @click="changeType($event)">读后感</span>
          <span class="type"
                @click="changeType($event)">绘画</span>
          <span class="type"
                @click="changeType($event)">思维导图</span>
          <span class="type"
                @click="changeType($event)">读书笔记</span>
          <span class="type"
                @click="changeType($event)">朗读</span>
          <span class="type"
                @click="changeType($event)">背诵</span>
        </div>
        <div class="main-posts">
          <div class="backTo"
               @click="detailVisible = !detailVisible">返回</div>
          <div class="inComment"
               @click="showCommentPopup2() ">评价</div>
          <ul class="content">
            <li v-for="el in detailList">
              <div><span class="postType">{{el.postType}}</span><span>《{{el.bookName}}》</span><span>{{el.postTitle}}</span></div>
              <div>{{el.postContent}}</div>
              <img v-if="el.fileType === '.jpg' && el.fileUrl"
                   v-lazy=el.fileUrl
                   style="width:100%">
              <video v-if="el.fileType === '.mp3' && el.fileUrl"
                     controls=""
                     name="media"
                     style="width:100%;height:60px">
                <source :src="el.fileUrl"
                        type="audio/mpeg">
              </video>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <!--任务对象-->
    <div class="task-student"
         v-if="role==='teacher' && !detailVisible">
      <h1 class="task-student-title">
        <div class="task-student-title__text">任务对象</div>
        <button class="select-all-btn"
                @click="selectAll()">全选</button>
        <button class="score-btn"
                @click="showCommentPopup()">评价</button>
      </h1>
      <label class="task-student-object"
             v-for="target in taskInfo.taskTargets"
             :key="target.userId">
        <input class="checkbox-invisible"
               type="checkbox"
               :value="target.userId"
               v-model="selectedTargets"
               v-if="target.isDone && target.score == null">
        <span v-if="target.score == null && target.isDone"
              :class="{'radio-check': isSelected(selectedTargets, target.userId), 'radio-uncheck':!isSelected(selectedTargets, target.userId) }"></span>
        <span :class="{'blank': !target.isDone || target.score !== null }"></span>
        <span>{{ target.name }}</span><span :class="{ 'task-nodo': !target.isDone }"></span>
        <span :class="{ 'task-done': target.isDone }"></span>
        <span v-if="target.score !== null"
              class="display-score">{{ target.score }}</span>
        <button class="score-btn"
                v-if=target.isDone
                @click="checkEvaluate(target.userId)">查看任务</button>
      </label>
    </div>
    <!--打分弹出框-->
    <div v-if="role === 'teacher'">
      <evaluatePopup @close="scorePopupVisible = !scorePopupVisible"
                     @submit="giveScore"
                     :evaPopupShow="scorePopupVisible"
                     :allScoreOptions="taskInfo.scoreOptions"></evaluatePopup>
    </div>
    <div v-if="role === 'teacher'">
      <evaluatePopup @close="scorePopupVisible2 = !scorePopupVisible2"
                     @submit="giveScore2"
                     :evaPopupShow="scorePopupVisible2"
                     :allScoreOptions="taskInfo.scoreOptions"></evaluatePopup>
    </div>

  </div>
</template>
<script>
import * as API from "../../api/api.js"
import user from "../../mixins/user.js"
import errorHandler from "../../mixins/errorHandler.js"
import Book from "../../components/common/book/Book.vue"
import Axios from "axios"
import { Toast } from "mint-ui"
import { Dialog } from "vant"
import evaluate from "../../components/common/evaluate/evaluate.vue"

export default {
  mixins: [user, errorHandler],
  data() {
    return {
      taskInfo: {
        taskTitle: "",
        description: "",
        endDate: null,
        startDate: null,
        hasComment: false,
        publisher: "",
        taskTargets: [],
        taskBooks: [],
        comments: [],
        isDone: false
      },
      EvaPopupVisible: false,
      scorePopupVisible: false,
      scorePopupVisible2: false,
      selectedTargets: [],
      allTargetSelected: false,
      detailVisible: false,
      detailListAll: [],
      detailList: [],
      nowUser: ""
    }
  },
  computed: {
    /* 从 url 中过滤出 taskId */
    taskId() {
      return window.location.href.split("?taskId=")[1]
    },
    finishText() {
      return this.taskInfo.isDone ? "已完成" : "未完成"
    },
    evaluateText() {
      if (this.taskInfo.isDone) {
        return this.taskInfo.hasComment ? "已评价" : "评价"
      } else {
        return "未评价"
      }
    }
  },
  components: {
    singleBook: Book,
    evaluatePopup: evaluate
  },
  filters: {
    /* 格式化日期显示 */
    formatDate(mm) {
      if (mm) {
        var date = new Date(mm)
        var year = date.getFullYear()
        var month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)
        var day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate()
        return year + "-" + month + "-" + day
      } else {
        return ""
      }
    }
  },
  methods: {
    showCommentPopup() {
      if (this.selectedTargets.length > 0) {
        this.scorePopupVisible = !this.scorePopupVisible
      } else {
        Toast({
          message: "请选择要评价的对象",
          position: "middle",
          duration: 1500
        })
      }
    },
    showCommentPopup2() {
      this.scorePopupVisible2 = !this.scorePopupVisible2
    },
    handleSubmit(items) {
      /*  家长提交评价 */
      Axios({
        url: API.makeComment,
        method: "POST",
        params: {
          taskId: this.taskId,
          userId: this.userId,
          comments: JSON.stringify(items)
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": this.token
        }
      }).then(res => {
        this.EvaPopupVisible = !this.EvaPopupVisible
        setTimeout(() => {
          /* 构造新的已评价内容 */
          this.taskInfo.comments = items
          this.taskInfo.hasComment = true
        }, 500)
        Toast({
          message: res.data.msg,
          position: "middle",
          duration: 1500
        })
      }).catch(err => {
        this.errorHandler(err)
      })
    },
    /* 完成任务方法 */
    finishTask() {
      Dialog.confirm({
        title: "确认提示",
        message: "确定已完成任务?"
      }).then(action => {
        if (action === "confirm") {
          Axios({
            url: API.finishTask,
            method: "POST",
            params: {
              taskId: this.taskId,
              userId: this.userId
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
            this.taskInfo.isDone = !this.taskInfo.isDone
          }).catch(err => {
            var data = err.response.data.error
            var message = ""
            for (var i = 0; i < data.length; i++) {
              message += "《" + data[i].bookName + "》的" + data[i].typeName + "未完成"
              break
            }
            Toast({
              message: message,
              position: "middle",
              duration: 3000
            })
          })
        }
      })
    },
    /* 删除任务方法 */
    deleteTask() {
      Dialog.confirm({
        title: "确认提示",
        message: "确定删除任务?"
      }).then(action => {
        if (action === "confirm") {
          Axios({
            url: API.deleteTask,
            method: "POST",
            params: {
              taskId: this.taskId
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
            this.$destroy()
            setTimeout(() => {
              window.history.go(-1)
            }, 1500)
          }).catch(err => {
            this.errorHandler(err)
          })
        }
      })
    },
    isSelected(arr, value) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
          return true
        }
      }
      return false
    },
    /* 教师提交评价 */
    giveScore(score) {
      Axios({
        url: API.giveScore,
        method: "POST",
        params: {
          taskId: this.taskId,
          userId: JSON.stringify(this.selectedTargets),
          score: score
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": this.token
        }
      }).then(res => {
        /* 构造新的已评价内容 */
        this.taskInfo.taskTargets.forEach(target => {
          if (this.selectedTargets.indexOf(target.userId) !== -1) {
            target.score = score
          }
        })
        this.selectedTargets = []
        this.scorePopupVisible = !this.scorePopupVisible
        Toast({
          message: res.data.msg,
          position: "middle",
          duration: 1500
        })
      }).catch(err => {
        this.errorHandler(err)
      })
    },
    giveScore2(score) {
      var list = []
      list.push(this.nowUser)
      console.log(this.taskInfo.taskTargets)
      Axios({
        url: API.giveScore,
        method: "POST",
        params: {
          taskId: this.taskId,
          userId: JSON.stringify(list),
          score: score
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": this.token
        }
      }).then(res => {
        /* 构造新的已评价内容 */
        this.taskInfo.taskTargets.forEach(target => {
          if (target.userId === this.nowUser) { target.score = score }
        })
        this.scorePopupVisible2 = !this.scorePopupVisible2
        Toast({
          message: res.data.msg,
          position: "middle",
          duration: 1500
        })
      }).catch(err => {
        this.errorHandler(err)
      })
    },
    selectAll() {
      if (!this.allTargetSelected) {
        this.taskInfo.taskTargets.forEach(object => {
          if (object.score == null && object.isDone) {
            this.selectedTargets.push(object.userId)
          }
        })
        this.allTargetSelected = !this.allTargetSelected
      } else {
        this.selectedTargets = []
        this.allTargetSelected = !this.allTargetSelected
      }
    },
    changeType($e) {
      // console.log($e)
      var oldNow = document.getElementsByClassName("now")
      oldNow[0].className = "type"
      $e.target.className = "type now"
      if ($e.target.innerText === "全部") {
        this.detailList = this.detailListAll
      } else if ($e.target.innerText === "短评") {
        this.judgeType("评论")
        // console.log(this.detailList)
      } else if ($e.target.innerText === "读后感") {
        this.judgeType("读后感")
      } else if ($e.target.innerText === "绘画") {
        this.judgeType("绘画")
      } else if ($e.target.innerText === "思维导图") {
        this.judgeType("思维导图")
      } else if ($e.target.innerText === "读书笔记") {
        this.judgeType("读书笔记")
      } else if ($e.target.innerText === "朗读") {
        this.judgeType("朗读")
      } else if ($e.target.innerText === "背诵") {
        this.judgeType("背诵")
      }
    },
    judgeType(name) {
      this.detailList = []
      for (var i = 0; i < this.detailListAll.length; i++) {
        if (this.detailListAll[i].postType === name) {
          this.detailList.push(this.detailListAll[i])
        }
      }
    },
    checkEvaluate(thisStudentId) {
      this.nowUser = thisStudentId
      Axios({
        url: API.checkfinshDetail,
        method: "GET",
        params: {
          taskId: this.taskId,
          studentId: thisStudentId,
          pageSize: 100
        },
        headers: {
          "Authorization": this.token
        }
      }).then(res => {
        console.log(res)
        this.detailListAll = res.data.forumPosts.dataList
        this.detailList = this.detailListAll
      }).catch(err => {
        console.log(err)
      })
      this.detailVisible = !this.detailVisible
    }
  },
  created() {
    Axios({
      url: API.getTaskDetail,
      method: "GET",
      params: {
        userId: this.role === "student" ? this.userId : null,
        taskId: this.taskId,
        userType: this.userType
      },
      headers: {
        "Authorization": this.token
      }
    }).then(res => {
      this.taskInfo = Object.assign({}, res.data)
    }).catch(err => {
      this.errorHandler(err)
    })
    if (this.taskInfo.isDone === false && this.role === "student") {
      Axios({
        url: API.finishTask,
        method: "POST",
        params: {
          taskId: this.taskId,
          userId: this.userId
        },
        headers: {
          "Authorization": this.token
        }
      }).then(res => {
        this.taskInfo.isDone = true
      }).catch(err => {
        console.log(err.response)
        var data = err.response.data.error
        var message = ""
        for (var i = 0; i < data.length; i++) {
          message = "《" + data[i].bookName + "》的" + data[i].typeName + "未完成"
          break
        }
        Toast({
          message: message,
          position: "middle",
          duration: 3000
        })
      })
    }
  }
}
</script>
<style>
body {
  padding: 0;
  margin: 0;
  width: 100%;
  color: #324057;
}

li {
  list-style-type: none;
}
.container {
  box-sizing: border-box;
  width: 100%;
}

.task-detail {
  padding: 10px 10px 16px;
  box-shadow: 0 1px 5px #e5e9f2;
  background-color: #fff;
}

.task-headline {
  font-size: 24px;
  font-weight: 400;
  min-height: 24px;
  line-height: 1;
  padding-left: 5px;
  margin: 5px 0 10px;
  border-left: 4px solid #2f80ed;
}

.task-content-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.task-author {
  font-size: 13px;
  margin: 5px 10px;
}

.task-time-box {
  display: inline-table;
  margin: 0 0 0 10px;
  overflow: hidden;
}

.task-time {
  flex: 1;
  font-size: 14px;
  color: #999;
  margin: 2px 0;
}

.task-desc {
  margin: 10px 0 0 10px;
  font-size: 14px;
  line-height: 1.5em;
}

.task-content-box__btn {
  width: 77px;
  margin-right: 10px;
}

.evaluate-btn {
  outline: 0;
  margin-top: 0;
  color: #fff;
  border: 0;
  width: 100%;
  font-size: 14px;
  border-radius: 5px;
  padding: 10% 15%;
  white-space: nowrap;
  background-color: #62c8a5;
  box-shadow: 2px 2px 5px #e5e9f2;
}

.evaluate-btn + .evaluate-btn {
  margin-top: 5px;
}

.task-book-box {
  box-sizing: border-box;
  padding: 0;
  margin-top: 10px;
  overflow: hidden;
  box-shadow: 1px 1px 5px #e5e9f2;
  background-color: #fff;
}

.book-box-title {
  margin: 0;
  padding: 10px;
  font-size: 0.9em;
  font-weight: 400;
  color: #656b79;
  border-bottom: solid 1px #eee;
}

.book-box-content {
  display: flex;
  padding: 5px;
  flex-flow: row wrap;
}

.author-icon {
  width: 4.2%;
  vertical-align: middle;
}

.time-icon {
  display: inline-table;
  width: 4%;
  margin-right: 5px;
}

.time-box {
  display: inline-table;
}

.parental-evaluate {
  margin-top: 10px;
  box-shadow: 0 1px 5px #e5e9f2;
}

.eva-title {
  margin: 0;
  padding: 10px;
  font-size: 0.9em;
  font-weight: 400;
  color: #656b79;
  border-bottom: solid 1px #eee;
}

.eva-content {
  margin: 0;
  font-size: 0.9em;
  padding: 10px;
  overflow: hidden;
}

.eva-content > span {
  float: left;
  margin: 0 5px 4px 0;
  padding: 4px 5px;
  font-weight: 300;
  height: 18px;
  line-height: 18px;
  font-size: 0.9em;
  color: #42b983;
  opacity: 0.9;
  border: solid 1px #42b983;
  border-radius: 5px;
}

.eva-icon {
  width: 18px;
  vertical-align: text-top;
}

.task-student {
  box-sizing: border-box;
  padding: 0 10px;
  margin-top: 10px;
  overflow: hidden;
  background-color: #fff;
}

.task-student-title {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 400;
  padding: 5px 0;
  color: #656b79;
  border-bottom: solid 1px #eee;
}

.task-student-title__text {
  display: inline-block;
}

.score-btn {
  position: absolute;
  right: 0;
  margin-right: 20px;
  border: 0;
  padding: 3px 10px;
  outline: none;
  background-color: #f06966;
  color: #fff;
  border-radius: 5px;
  box-shadow: 2px 2px 5px #e5e9f2;
}

.task-student-object {
  font-size: 16px;
  margin: 15px 0;
  display: flex;
  align-items: center;
}

.task-doneImg:after {
  content: "";
  width: 20px;
  height: 20px;
  display: inline-block;
  background-image: url("../../../static/images/Task/success.png");
  background-size: 20px 20px;
  vertical-align: bottom;
  overflow: hidden;
}

.task-done:after {
  content: "(已完成)";
  display: inline-block;
  color: #9e9e9e;
}

.task-nodo:after {
  content: "(未完成)";
  display: inline-block;
  color: #9e9e9e;
}

.no-shadow {
  box-shadow: none;
}

.evaluate-btn-finish {
  background-color: #475f77;
  font-weight: 400;
}

.evaluate-btn[disabled] {
  opacity: 0.8;
}

.radio-check {
  display: block;
  float: left;
  width: 16px;
  height: 16px;
  margin: 2px 5px 0 0;
  background: url("../../../static/images/Task/choose-act.svg") no-repeat;
  background-size: contain;
}

.radio-uncheck {
  display: block;
  float: left;
  width: 14px;
  height: 14px;
  margin: 2px 5px 0 0;
  border: 1px solid #ddd;
  border-radius: 50%;
}

.blank {
  width: 22px;
}

.checkbox-invisible {
  width: 1px;
  height: 1px;
  opacity: 0;
}

.display-score {
  color: #f06966;
  margin-left: 2px;
  position: absolute;
  right: 35px;
}

.select-all-btn {
  outline: 0;
  border: 0;
  background: none;
  color: #8f95a3;
}
/* mint 默认样式覆盖 */
.slide-enter,
.slide-leave-active {
  transform: translateX(100%);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease;
}

.detail {
  margin-top: 10px;
  width: 100%;
  /* height: 200px; */
  /* background-color: rgb(236, 238, 241); */
}
.mainType {
  padding: 10px;
  /* margin-right: 10px; */
  height: auto;
  display: -webkit-box;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  box-shadow: 0 1px 5px #e5e9f2;
}
.type {
  margin-right: 10px;
  height: 100px;
  width: 200px;
  text-decoration-line: none;
  font-size: 18px;
  color: #2f80ed;
  cursor: pointer;
}

.now {
  color: red;
}

.main-posts {
  margin-top: 10px;
}
.content {
  padding: 0;
  margin: 0;
}
.content li {
  border: #2f80ed 1px solid;
  margin-bottom: 5px;
  font-size: 14px;
  box-shadow: 0 1px 5px #e5e9f2;
  border-radius: 5px;
}
.postType {
  background-color: #2f80ed;
  width: 25px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 12px;
  color: rgb(255, 255, 255);
  border-radius: 1px;
}
.backTo {
  width: 50%;
  background-color: #62c8a5;
  color: rgb(255, 255, 255);
  text-align: center;
  margin-bottom: 10px;
  float: left;
  border-radius: 5px;
}
.inComment {
  width: 50%;
  background-color: #f06966;
  color: rgb(255, 255, 255);
  text-align: center;
  margin-bottom: 10px;
  float: left;
  border-radius: 5px;
}
</style>
