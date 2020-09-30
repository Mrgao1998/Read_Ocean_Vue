<template lang="html">
  <div class="community">
    <div class="community__nav">
      <div class="community__category">
        <button
          class="category-btn"
          v-for="block in blockCategory"
          v-bind:class="{ 'category-btn--active': activeBlockCate === block.value }"
          @click=" categoryBtnActive(block.value) ">{{ block.label }}</button>
      </div>
      <div class="community__search">
        <button class="community__search-btn" @click="searchShow = !searchShow">搜索</button>
      </div>
      <transition name="slide">
        <div class="search" v-if="searchShow">
          <input type="search" class="search__input" placeholder="搜索板块" v-model="searchKeyword">
          <button class="search__confirm" v-if="(searchKeyword.length)" @click="searchBlock()">搜索</button>
          <button class="search__cancel" @click="cancelSearch()" v-if="!(searchKeyword.length)">取消</button>
        </div>
      </transition>
    </div>
    <div
      v-if="!isSearching"
      class="community__block"
      v-infinite-scroll="loadMoreBlock"
      infinite-scroll-disabled="blockLoading"
      infinite-scroll-immediate-check="false"
      infinite-scroll-distance="50">
      <single-block
        v-for="block in blockList"
        :id="block.id"
        :key="block.id"
        :book-name="block.title"
        :book-image="block.img"
        :like-num="block.likeNum"
        :comment-num="block.postNum"
        customWidth="50%"
        ></single-block>
    </div>
    <div class="community__block" v-else>
      <single-block
        v-for="block in searchBlockList"
        :id="block.id"
        :key="block.id"
        :book-name="block.title"
        :book-image="block.img"
        :like-num="block.likeNum"
        :comment-num="block.postNum"
        customWidth="50%"
        ></single-block>
    </div>
  </div>
</template>

<script>
import Axios from "axios"
import * as API from "../../api/api.js"
import Block from "./CommunityBlock.vue"
import category from "../../utils/category.js"
import user from "../../mixins/user.js"
import errorHandler from "../../mixins/errorHandler.js"
import getBlocks from "../../mixins/getBlocks.js"
import { Toast, Indicator } from "mint-ui"
export default {
  mixins: [ user, errorHandler, getBlocks ],
  data() {
    return {
      blockCategory: category,
      searchShow: false,
      cancelBtnShow: true,
      searchKeyword: "",
      activeBlockCate: null,
      blockList: [],
      searchBlockList: [],
      currentPage: 1,
      maxPage: 100,
      blockLoading: false,
      isSearching: false
    }
  },
  methods: {
    categoryBtnActive(cate) {
      if (this.activeBlockCate !== cate) {
        this.activeBlockCate = cate
        Indicator.open({
          text: "加载中...",
          spinnerType: "snake"
        })
        this.currentPage = 1
        this.getBlocks({
          category: this.activeBlockCate,
          pageNum: this.currentPage,
          limits: 12,
          token: this.token
        }).then(res => {
          Indicator.close()
          this.blockList = res.data.dataList
          this.maxPage = res.data.totalPage
        }).catch(err => {
          Indicator.close()
          this.errorHandler(err)
        })
      }
    },
    loadMoreBlock() {
      if (this.currentPage < this.maxPage) {
        Indicator.open({
          text: "加载更多...",
          spinnerType: "snake"
        })
        this.currentPage += 1
        this.blockLoading = true
        this.getBlocks({
          category: this.activeBlockCate,
          pageNum: this.currentPage,
          limits: 12,
          token: this.token
        }).then(res => {
          Indicator.close()
          this.blockLoading = false
          this.blockList = this.blockList.concat(res.data.dataList)
        }).catch(err => {
          Indicator.close()
          this.blockLoading = false
          this.errorHandler(err)
        })
      } else {
        Toast({
          message: "已无更多数据",
          position: "middle",
          duration: 1500
        })
      }
    },
    searchBlock() {
      this.isSearching = true
      Axios({
        url: API.searchBlock,
        method: "GET",
        params: {
          keyWord: this.searchKeyword,
          pageNum: 1,
          limits: 12
        },
        headers: {
          "Authorization": this.token
        }
      }).then(res => {
        this.searchKeyword = ""
        this.searchBlockList = res.data.dataList
      }).catch(err => {
        this.searchKeyword = ""
        this.errorHandler(err)
      })
    },
    cancelSearch() {
      this.isSearching = false
      this.searchBlockList = []
      this.searchShow = !this.searchShow
    }
  },
  components: {
    singleBlock: Block
  },
  created() {
    Indicator.open({
      text: "加载中...",
      spinnerType: "snake"
    })
    this.getBlocks({
      category: this.activeBlockCate,
      pageNum: this.currentPage,
      limits: 12,
      token: this.token
    }).then(res => {
      Indicator.close()
      this.blockList = res.data.dataList
      this.maxPage = res.data.totalPage
    }).catch(err => {
      Indicator.close()
      this.errorHandler(err)
    })
  }
}
</script>

<style lang="css">
  ::-webkit-scrollbar {
    display: none;
  }

  .community__block {
    position: absolute;
    left: 0;
    right: 0;
    top: 50px;
    bottom: 55px;
    overflow-y: scroll;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    -webkit-overflow-scrolling: touch;
    z-index: 0;
  }

  .community__nav {
    display: flex;
    box-shadow: 0 1px 2px #acacac;
    width: 100%;
    position: fixed;
    height: 50px;
    top: 0;
    left: 0;
    z-index: 1;
  }

  .community__category {
    display: flex;
    flex-flow: row nowrap;
    height: 30px;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    padding: 10px 10px;
    background-color: #ffffff;
  }

  .category-btn {
    box-sizing: border-box;
    flex: none;
    height: 30px;
    outline: none;
    padding: 0 10px;
    margin-right: 5px;
    border: 1px #e8e8e8 solid;
    background-color: #ffffff;
    border-radius: 3px;
    color: #7e7e7e;
    font-size: 16px;
    font-weight: 300;
  }

  .category-btn--active {
    color: #26a2ff;
    border: 1px #26a2ff solid;
  }

  .community__search {
    flex: 0 0 60px;
    height: 50px;
    background-color: #ffffff;
  }

  .search {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    flex: 1;
    display: flex;
    padding: 5px 10px;
    background-color: #ffffff;
  }

  .community__search-btn {
    width: 100%;
    height: 50px;
    border: none;
    outline: none;
    background-color: #ffffff;
    font-size: 16px;
    text-align: center;
    white-space: nowrap;
  }

  .search__input {
    flex: 1;
    box-sizing: border-box;
    height: 40px;
    padding: 5px;
    margin-right: 10px;
    border: 1px #eaeaea solid;
    border-radius: 3px;
    outline: none;
    -webkit-appearance: none;
    font-size: 16px;
  }

  .search__confirm {
    flex: 0 0 50px;
    padding: 0 10px;
    height: 40px;
    border: 1px #eaeaea solid;
    border-radius: 3px;
    outline: none;
    background-color: white;
    font-size: 14px;
  }

  .search__cancel {
    flex: 0 0 50px;
    padding: 0 10px;
    height: 40px;
    border: 1px #eaeaea solid;
    border-radius: 3px;
    outline: none;
    background-color: white;
    font-size: 14px;
  }

  .slide-enter,
  .slide-leave-active {
    transform: translateX(100%);
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: transform .3s;
  }
</style>
