<template lang="html">
  <!-- 教师已发布任务任务列表 -->
  <div class="task-list--teacher"
    v-infinite-scroll="loadMoreTask"
    infinite-scroll-disabled="taskLoading"
    infinite-scroll-immediate-check="false"
    infinite-scroll-distance="50">
    
      <single-task
        v-if="taskList.length !== 0"
        v-for="task in taskList"
        :id="task.id"
        :key="task.id"
        :distDate="task.publishDate"
        :distTitle="task.title"
        :distDisc="task.description"
        @deleteTask="taskDeleteHandler">
        <!-- 监听子组件发出的删除任务事件 -->
      </single-task>
      <div class="taskDist-empty" v-if="taskList.length === 0">
        <span>任务列表空空如也，点击左下角添加任务吧</span>
      </div>
      <button class="btn__add" @click="goPost()"><i class="icon__add"></i></button>
    </div>
</template>

<script>
import Task from "../teacherTask.vue"
import user from "../../../mixins/user.js"
import errorHandler from "../../../mixins/errorHandler.js"
import getTasks from "../../../mixins/getTask.js"
import { Toast, Indicator } from "mint-ui"
export default {
  mixins: [ user, errorHandler, getTasks ],
  data() {
    return {
      taskList: [],
      currentPage: 1,
      maxPage: 100,
      taskLoading: false
    }
  },
  methods: {
    loadMoreTask() {
      if (this.currentPage < this.maxPage) {
        Indicator.open({
          text: "加载更多...",
          spinnerType: "snake"
        })
        this.currentPage += 1
        this.taskLoading = true
        this.getTasks({
          userId: this.userId,
          userType: this.userType,
          pageNum: this.currentPage,
          limits: 10,
          token: this.token
        }).then(res => {
          Indicator.close()
          this.taskList = this.taskList.concat(res.data.dataList)
          this.taskLoading = false
        }).catch(err => {
          Indicator.close()
          this.taskLoading = false
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
    /* 处理删除任务事件的方法 */
    taskDeleteHandler(deleteId, msg) {
      this.taskList = this.taskList.filter(val => {
        /* 把已经删除的任务从界面中去除 */
        return val.id !== deleteId
      })
      Toast({
        message: msg,
        position: "middle",
        duration: 1500
      })
    },
    goPost() {
      window.location.assign("/ReadingOcean/wechat/taskDist")
    }
  },
  created() {
    Indicator.open({
      text: "加载中...",
      spinnerType: "snake"
    })
    this.getTasks({
      userId: this.userId,
      userType: this.userType,
      pageNum: this.currentPage,
      limits: 10,
      token: this.token
    }).then(res => {
      Indicator.close()
      this.taskList = res.data.dataList
      this.currentPage = res.data.currentPage
      this.maxPage = res.data.totalPage
    }).catch(err => {
      Indicator.close()
      this.errorHandler(err)
    })
  },
  components: {
    singleTask: Task
  }
}
</script>

<style lang="css">
@import "../../../../static/css/task/tasklist.css";

.btn__add {
    position: fixed;
    bottom: 80px;
    left:25px;
    outline: 0;
    border: 0;
    background-color: transparent;
    margin: 0;
    padding: 0;
    border-radius: 50%;
}

.icon__add {
    display: block;
    width: 50px;
    height: 50px;
    background: url("../../../../static/images/community/add-task.svg");
}

.taskDist-empty{
   width: 100%;
}
.taskDist-empty>span{
  display: block;
  text-align: center;
  color: rgb(117, 117, 117);
  box-shadow: 0 2px 5px #E5E9F2;
}
</style>
