<template>
  <div class="container">
    <!-- tab 导航 -->
    <div class="tab">
      <div
        @touchend="tabChange('popular')"
        class="tab__item"
        :class="{'tab__item--active': tabSelected === 'popular'}">热门创作</div>
      <div
        @touchend="tabChange('latest')"
        class="tab__item"
        :class="{'tab__item--active': tabSelected === 'latest'}">最新创作</div>
    </div>

    <keep-alive>
      <component :is="currentView"></component>
    </keep-alive>

    <!-- 底部提问按钮 -->
    <button class="btn btn-ask" @click="askFormVisible = true" v-if="role === 'student' ">我要发布新故事</button>
    <!-- 提问表单弹窗 -->
    <mt-popup v-model="askFormVisible" position="bottom" v-if="role === 'student' ">
      <div class="ask-form">
        <!-- 提问表单顶部按钮 -->
        <div class="ask-form__control">
          <button class="btn btn-cancel" @click="askFormVisible = false">取消</button>
          <button class="btn btn-submit" @click="postQuestion">提交</button>
        </div>
        <!-- 提问表单输入框 -->
        <textarea placeholder="请输入您的问题" class="input input-question" rows="4" v-model="questionText" maxlength="250"></textarea>
        <!-- 选择的书籍标签 -->
        <transition name="fade" @after-leave="afterLeave">
          <div class="selected-book-btn" v-show="selectedBook.id" >{{ selectedBook.title }}<mt-button class="delete-book-btn" icon="field-error" @click.stop="deleteSelectedBook"></mt-button> </div>
        </transition>
        <!-- 书籍搜索区域 -->
        <transition name="fade">
          <div class="search-area">
            <input class="input input-search" v-model="searchText" placeholder="请搜索与问题相关的书籍" v-show="!isSelected">
            <button class="btn btn-search-cancel" v-show="searchText.length> 0" @touchend="deleteSelectedBook">取消</button>
          </div>
        </transition>
        <!-- 搜索结果区域 -->
        <transition-group class="search-result" name="fade" tag="div" appear @after-appear="choseSearchBookReminder">
          <div class="search-list" v-for="book in searchResultList" @click="choseSearchBook(book)" :key="book.id">{{ book.title }}</div>
        </transition-group>
        <!-- 搜索按钮 -->
        <button class="btn btn-search" :disabled="searchText.length <= 0" v-show="searchResultList.length <= 0 && !isSelected " @click="confirmSearch">搜索</button>
      </div>
    </mt-popup>
  </div>
</template>

<script type="text/javascript">
import Axios from "axios"
import * as API from "../../api/api.js"
import { Toast } from "mint-ui"
import user from "../../mixins/user.js"
import errorHandler from "../../mixins/errorHandler.js"
import searchBook from "../../mixins/searchBook.js"
import getQuestions from "../../mixins/getQuestions.js"
import LatestQuestions from "../../components/qa/latest.vue"
import PopularQuestions from "../../components/qa/popular.vue"
export default {
  mixins: [ user, errorHandler, getQuestions, searchBook ],
  data() {
    return {
      tabSelected: "popular",
      askFormVisible: false,
      questionText: "",
      searchText: "",
      selectedBook: {},
      isSelected: false,
      searchListVisible: false,
      searchResultList: [],
      currentView: "popular"
    }
  },
  components: {
    latest: LatestQuestions,
    popular: PopularQuestions
  },
  methods: {
    tabChange(type) {
      this.tabSelected = type
      this.currentView = type
    },
    afterLeave() {
      this.isSelected = false
    },
    postQuestion() {
      if (this.questionText.trim().length === 0) {
        Toast({
          message: "请填写问题描述",
          position: "middle",
          duration: 1500
        })
      } else {
        Axios({
          url: API.postQuestion,
          method: "POST",
          params: {
            userId: this.userId,
            bookId: this.selectedBook.id,
            description: this.questionText
          },
          headers: {
            "Authorization": this.token
          }
        }).then(res => {
          this.questionText = ""
          this.selectedBook = {}
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
      }
    },
    confirmSearch() {
      this.searchBook({
        keyWord: this.searchText,
        pageNum: 1,
        limits: 20,
        token: this.token
      }).then(res => {
        this.searchResultList = res.data.dataList
      }).catch(err => {
        this.errorHandler(err)
      })
    },
    // 点击搜索结果，添加 label
    choseSearchBook(book) {
      this.selectedBook = book
      this.searchText = ""
      this.searchResultList = []
      this.isSelected = true
    },
    // 删除 label，重置搜索框
    deleteSelectedBook() {
      this.searchText = ""
      this.selectedBook = ""
      this.searchResultList = []
    },
    // 添加提醒
    choseSearchBookReminder() {
      Toast({
        message: "点击搜索结果添加书籍",
        position: "bottom",
        duration: 1500
      })
    }
  }
}
</script>
<style>
html {
  width: 100%;
  height: 100%;
}

body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  color: #324057;
  -webkit-text-size-adjust: 100% !important;
}

.container {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.tab {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  background-color: #fff;
  box-shadow: 0 1px 5px #E5E9F2;
  z-index: 1;
}

.tab__item {
  width: 50%;
  height: 50px;
  line-height: 50px;
  font-size: 1rem;
  text-align: center;
  background-color: #fff;
}


.tab__item--active {
  color: #3C89FD;
  border-bottom: 2px #3C89FD solid;
  margin-bottom: -2px;
}

.mint-toast {
  z-index: 3000 !important;
}

::-webkit-scrollbar {
  display: none;
}

.btn {
  display: block;
  outline: 0;
  border: 0;
  background: none;
}

.input {
  appearance: none;
  resize: none;
  outline: 0;
}

.btn-ask {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 40px;
  margin-top: -40px;
  border-radius: 0;
  background-color: #3C89FD;
  font-size: 16px;
  color: #fff;
}

.ask-form {
  box-sizing: border-box;
  background-color: #fff;
  padding: 20px;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
}

.input-question {
  box-sizing: border-box;
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
  font-size: 14px;
  border: 1px solid transparent;
}

.ask-form__control {
  display: flex;
  justify-content: space-between;
}

.btn-cancel,
.btn-submit {
  color: #3C89FD;
  font-size: 16px;
}

.btn-search {
  margin: 10px auto;
  font-size: 16px;
  color: #3C89FD;
}

.btn-search-cancel {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 10px;
  color: #3C89FD;
  font-size: 16px;
}

.btn-search:disabled {
  color: #8f95a3;
}

.search-area {
  position: relative;
}

.input-search {
  box-sizing: border-box;
  width: 100%;
  padding: 15px 10px;
  border: 1px solid #eee;
  font-size: 14px;
}

.search-list {
  padding: 10px 5px;
  border-bottom: 1px solid #EFF2F7;
  font-size: 16px;
  text-align: center;
}

.selected-book-btn {
  display: inline-block;
  margin: 0 10px;
  color: #656b79;
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  background-color: #f6f8fa;
  box-shadow: 0 0 1px #b8bbbf;
}

.delete-book-btn {
  box-sizing: border-box;
  height: 100%;
  padding: 0;
  box-shadow: none;
  font-size: 0;
  vertical-align: bottom;
}

.fade-enter-active,
.fade-leave-active {
  transition: all .5s ease-in-out;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateY(30px);
}
</style>
