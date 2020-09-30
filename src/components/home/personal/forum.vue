<template lang="html">
  <!-- 我的论坛弹出框 -->
  <div class="popup">
    <mt-header title="我的论坛" fixed class="popup__header">
      <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <div class="popup__content">
      <div class="table__header">
        <div class="table__title">帖子标题</div>
        <div class="table__title">点赞数</div>
        <div class="table__title">类型</div>
      </div>
      <table class="table__body"
        v-infinite-scroll="loadMorePost"
        infinite-scroll-disabled="postLoading"
        infinite-scroll-immediate-check="false"
        infinite-scroll-distance="50">
          <tr class="table__item" v-for="post in postList" :key="post.id" @click="linkToDetail(post.id)">
            <td class="table__cell">{{ post.title }}</td>
            <td class="table__cell">{{ post.likeNum }}</td>
            <td class="table__cell">{{ post.category }}</td>
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
      postList: [],
      postLoading: false,
      currentPage: 1,
      maxPage: 100
    }
  },
  methods: {
    linkToDetail(id) {
      window.location.assign("/ReadingOcean/wechat/communityDetail?blockId=".concat(id))
    },
    loadMorePost() {
      if (this.currentPage < this.maxPage) {
        Indicator.open({
          text: "加载更多...",
          spinnerType: "snake"
        })
        this.currentPage += 1
        this.postLoading = true
        Axios({
          url: API.getForumPosts,
          method: "GET",
          params: {
            userId: this.userId,
            pageNum: this.currentPage,
            limits: 20
          },
          headers: {
            "Authorization": this.token
          }
        }).then(res => {
          Indicator.close()
          this.postList = this.postList.concat(res.data.dataList)
          this.postLoading = false
        }).catch(err => {
          Indicator.close()
          this.postLoading = false
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
      url: API.getForumPosts,
      method: "GET",
      params: {
        userId: this.userId,
        pageNum: this.currentPage,
        limits: 20
      },
      headers: {
        "Authorization": this.token
      }
    }).then(res => {
      this.postList = res.data.dataList
      this.maxPage = res.data.totalPage
      Indicator.close()
    }).catch(err => {
      Indicator.close()
      this.errorHandler(err)
    })
  }
}
</script>

<style lang="css">
@import "../../../../static/css/personal/popup.css";
@import "../../../../static/css/personal/table.css";
</style>
