<template lang="html">
  <!-- 我的问答弹出框 -->
  <div class="popup">
    <mt-header title="购买记录" fixed class="popup__header">
      <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <div class="popup__content">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">购买答题权限记录</mt-tab-item>
        <mt-tab-item id="2">购买阅读报告记录</mt-tab-item>
      </mt-navbar>

      <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div class="table__header">
          <div class="table__title2">书籍名称</div>
          <div class="table__title2">购买时间</div>
          <div class="table__title2">操作类型</div>
        </div>
        <table class="table__body">
            <tr class="table__item" v-for="record in paidBookList">
              <td class="table__cell">《{{ record.bookName }}》</td>         
              <td class="table__cell">{{ record.payTime }}</td>
              <td class="table__cell">{{ record.type }}</td>
            </tr>
        </table>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="table__header">
          <div class="table__title2">购买时间</div>
          <div class="table__title2">到期时间</div>
        </div>
        <table class="table__body">
            <tr class="table__item" v-for="record in paidReportList">
              <td class="table__cell">{{ record.payTime }}</td>         
              <td class="table__cell">{{ record.closingTime }}</td>
            </tr>
        </table>
      </mt-tab-container-item>
      
    </mt-tab-container>
    </div> 
  </div>
</template>

<script>
import Axios from "axios"
import user from "../../../mixins/user.js"
import errorHandler from "../../../mixins/errorHandler.js"
import * as API from "../../../api/api.js"
export default {
  mixins: [user, errorHandler],
  data() {
    return {
      paidBookList: [],
      paidReportList: [],
      selected: "1"
    }
  },
  methods: {

  },
  created() {
    Axios({// 获取购买答题权限列表
      url: API.getBookAnswerPayDetailList,
      method: "GET",
      headers: {
        "Authorization": this.token
      }
    }).then(res => {
      console.log(res)
      this.paidBookList = res.data.data
    }).catch(err => {
      errorHandler(err)
    })

    Axios({// 获取购买阅读报告列表
      url: API.getReadingReportPayDetailList,
      method: "GET",
      headers: {
        "Authorization": this.token
      }
    }).then(res => {
      console.log(res)
      this.paidReportList = res.data.data
    }).catch(err => {
      errorHandler(err)
    })
  }
}
</script>

<style lang="css" scoped>
@import "../../../../static/css/personal/popup.css";
@import "../../../../static/css/personal/table.css";
.update-btn {
  display: block;
  box-sizing: content-box;
  width: 50%;
  float: left;
  background-color: #9cb8ca;
  padding: 0 10px;
}
.is-selected {
  z-index: 1;
}
.table__cell {
  overflow-x: hidden;
  overflow-y: scroll;
}
.table__item::-webkit-scrollbar {
  display: none;
}
.table__item {
  overflow: hidden;
}
</style>
