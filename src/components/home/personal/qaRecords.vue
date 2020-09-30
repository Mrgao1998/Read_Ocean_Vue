<template lang="html">
  <!-- 我的问答弹出框 -->
  <div class="popup">
    <mt-header title="我的问答" fixed class="popup__header">
      <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <div class="popup__content">
      <div class="table__header">
        <div class="table__title">问题描述</div>
        <div class="table__title" v-if="role === 'student'">回答数</div>
        <div class="table__title" v-if="role === 'teacher'">点赞数</div>
        <div class="table__title">状态</div>
      </div>
      <table class="table__body"
        v-infinite-scroll="loadMoreRecord"
        infinite-scroll-disabled="recordLoading"
        infinite-scroll-immediate-check="false"
        infinite-scroll-distance="50">
          <tr class="table__item" v-for="record in recordList" :key="record.id" @click="linkToDetail(record.id)">
            <td class="table__cell">{{ record.description }}</td>
            <td class="table__cell" v-if="role === 'student'">{{ record.answerNum }}</td>
            <td class="table__cell" v-if="role === 'teacher'">{{ record.likeNum }}</td>
            <td class="table__cell">{{ record.status | statusFilter }}</td>
          </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Axios from "axios"
import user from "../../../mixins/user.js"
import errorHandler from "../../../mixins/errorHandler.js"
import * as API from "../../../api/api.js"
import { Toast, Indicator } from "mint-ui"
export default {
  mixins: [ user, errorHandler ],
  data() {
    return {
      recordList: [],
      recordLoading: false,
      currentPage: 1,
      maxPage: 100
    }
  },
  filters: {
    statusFilter(val) {
      switch (val) {
        case "pending":
          return "待回答"
        case "answered":
          return "已回答"
        case "ignored":
          return "已忽略"
        case "normal":
          return "普通答案"
        case "best":
          return "最佳答案"
        default:
          return ""
      }
    }
  },
  methods: {
    linkToDetail(id) {
      window.location.assign("/ReadingOcean/wechat/qaDetail?questionId=".concat(id))
    },
    loadMoreRecord() {
      if (this.currentPage < this.maxPage) {
        Indicator.open({
          text: "加载更多...",
          spinnerType: "snake"
        })
        this.currentPage += 1
        this.recordLoading = true
        Axios({
          url: API.getQARecords,
          method: "GET",
          params: {
            userId: this.userId,
            userType: this.userType,
            pageNum: this.currentPage,
            limits: 20
          },
          headers: {
            "Authorization": this.token
          }
        }).then(res => {
          Indicator.close()
          this.recordList = this.recordList.concat(res.data.dataList)
          this.recordLoading = false
        }).catch(err => {
          Indicator.close()
          this.recordLoading = false
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
    Axios({
      url: API.getQARecords,
      method: "GET",
      params: {
        userId: this.userId,
        userType: this.userType,
        pageNum: this.currentPage,
        limits: 20
      },
      headers: {
        "Authorization": this.token
      }
    }).then(res => {
      this.recordList = res.data.dataList
      this.maxPage = res.data.totalPage
      Indicator.close()
    }).catch(err => {
      errorHandler(err)
    })
  }
}
</script>

<style lang="css" scoped>
@import "../../../../static/css/personal/popup.css";
@import "../../../../static/css/personal/table.css";
</style>
