<template lang="html">
  <!-- 教师任务任务列表 -->
  <div class="task-list"
    v-infinite-scroll="loadMoreTask"
    infinite-scroll-disabled="taskLoading"
    infinite-scroll-immediate-check="false"
    infinite-scroll-distance="50">
    <single-task
      v-for="task in taskList"
      :key="task.id"
      :title="task.title"
      :id="task.id"
      :startDate="task.startDate"
      :endDate="task.endDate"
      :publisher="task.publisher"
      :isDone="task.isDone"
      :commented="task.hasComment"></single-task>
      <!-- 底部滚动刷新数据动效 -->
      <mt-spinner
        class="loading loading--bottom"
        type="triple-bounce"
        color="#3C89FD"
        v-show="taskLoading"></mt-spinner>
  </div>
</template>

<script>
import Task from "../task.vue"
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
          type: "pending",
          pageNum: this.currentPage,
          token: this.token,
          limits: 10
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
      type: "pending",
      pageNum: this.currentPage,
      limits: 9,
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
</style>
