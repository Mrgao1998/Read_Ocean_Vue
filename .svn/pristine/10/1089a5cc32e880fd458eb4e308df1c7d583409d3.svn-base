<template lang="html">
  <!-- 我的论坛弹出框 -->
  <div class="popup">
    <mt-header title="我的作品" fixed class="popup__header">
      <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <!-- 分类 tab 栏 -->
    <div class="tab" style="margin-top:60px">
      <div
        v-for="cate in blockPostType"
        class="tab__item"
        @click="getType1(cate.value,3)"
        :class="{'tab__item--active': tabSelected === cate.value }" >{{ cate.label }}</div>
    </div>
    <!-- 改变排序方式 -->
    <div class = "order" >
        <span class="type-title">排序方式：</span>
        <button class="order-but" @click="sheetVisible=true">
          <label class="mint-button-text">{{orderType}}</label>
          <img src = "../../../../static/images/community/order.png">
        </button>

      <mt-actionsheet
          :actions="actions"
          v-model="sheetVisible">
      </mt-actionsheet>

    </div>
    <!-- 帖子列表 -->
    <div class="post-list"
      v-infinite-scroll="loadMorePost"
      infinite-scroll-disabled="postLoading"
      infinite-scroll-immediate-check="false"
      infinite-scroll-distance="20"
      style="margin-top:10px">
      <post
        @show="show"
        @reply="reply"
        v-for="post in postList"
        :id="post.id"
        :key="post.id"
        :resource="post.media || ''"
        :post-title="post.title"
        :poster="post.publisher"
        :post-date="post.publishDate"
        :post-desc="post.description"
        :favor-num="post.likeNum"
        :post-cate="post.category"
        :blockCateList="blockPostType"
        :posterId="post.publisherId"
        :bookName="post.bookName"
        :isMine="post.isMine"
      ></post>
      <p class="no-post" v-show="postList.length === 0">暂时还没有内容喔</p>
    </div>
  </div>
</template>

<script>
import blockPostType from "../../../utils/blockPostCate.js"
import post from "../../../components/community/mypost.vue"
import Axios from "axios"
import user from "../../../mixins/user.js"
import errorHandler from "../../../mixins/errorHandler.js"
import * as API from "../../../api/api.js"
import { Toast, Indicator } from "mint-ui"

export default {
  mixins: [ user, errorHandler ],
  components: {
    post
  },
  data() {
    return {
      tabSelected: null,
      sheetVisible: false,
      postList: [],
      type: 0,
      postLoading: false,
      currentPage: 1,
      maxPage: 100,
      blockPostType: blockPostType,
      orderType: "按时间",
      actions: [{
        name: "按热度",
        type: 1,
        method: this.getType
      }, {
        name: "按时间",
        type: 0,
        method: this.getType
      }, {
        name: "按最早",
        type: 2,
        method: this.getType
      }]
    }
  },
  methods: {
    show: function (bid) {
      this.getType(2)
    },
    reply: function () {

    },
    getType1: function (v, type) {
      this.tabSelected = v
      this.type = type
      if (this.type === 1) {
        this.orderType = "按热度"
      } else if (this.type === 0) {
        this.orderType = "按时间"
      } else if (this.type === 2) {
        this.orderType = "按最早"
      }
      Axios({
        url: API.getPosts,
        method: "GET",
        params: {
          type: 3,
          category: v
        },
        headers: {
          "Authorization": this.token
        }
      }).then(res => {
        this.postList = res.data.dataList
      }).catch(err => {
        console.log(err)
      })
    },
    getType: function (type) {
      this.type = type.type
      if (this.type === 1) {
        this.orderType = "按热度"
      } else if (this.type === 0) {
        this.orderType = "按时间"
      } else if (this.type === 2) {
        this.orderType = "按最早"
      }
      Axios({
        url: API.getPosts,
        method: "GET",
        params: {
          type: 3
        },
        headers: {
          "Authorization": this.token
        }
      }).then(res => {
        this.postList = res.data.dataList
      }).catch(err => {
        console.log(err)
      })
    },
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
          url: API.getPosts,
          method: "GET",
          params: {
            type: 3
          },
          headers: {
            "Authorization": this.token
          }
        }).then(res => {
          this.postList = res.data.dataList
        }).catch(err => {
          console.log(err)
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
      url: API.getPosts,
      method: "GET",
      params: {
        type: 3
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
  .tab {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    width: 100%;
    height: 40px;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
  }
  
  .tab__item {
    flex: none;
    padding: 5px 10px;
    font-size: .8rem;
  }

  .tab__item--active {
    color: #3C89FD;
  }

  .tab__content {
    width: 100%;
    height: calc(100vh - 210px);
    box-sizing: border-box;
    overflow-y: scroll;
  }
  .order {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-flow: row nowrap;
    flex-flow: row nowrap;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    /* width: 100%; */
    /* height: 28px; */
    /* overflow-x: scroll; */
    padding: 0px 10px;
    /*background-color: #00d8ff;*/
    -webkit-overflow-scrolling: touch;
  }
  .type-title{
    font-size: 14px;
    color: #7e7e7e;
  }
  .order-but{
    position: absolute;
    right: 3%;
    background: transparent; /*完全透明*/
    border: 0;
    color: #7e7e7e;
    outline: none;
  }
  .order-but img{
    width:12px;
    position: relative;
    top: 2px;
    left:-2px;
  }
  
</style>
