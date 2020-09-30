<template lang="html">
  <!-- 我已阅读弹出框 -->
  <div class="popup">
    <mt-header title="我已阅读" fixed class="popup__header">
      <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <div class="popup__content">
      <div class="book-list"
        v-infinite-scroll="loadMoreBook"
        infinite-scroll-disabled="bookLoading"
        infinite-scroll-immediate-check="false"
        infinite-scroll-distance="50">
        <single-book
          v-for="book in bookList"
          customWidth="33.33333%"
          :bookname="book.title"
          :imgSrc="book.coverImg"
          :bookId="book.id"
          :key="book.id">
        </single-book>
      </div>
    </div>
  </div>
</template>

<script>
import Book from "../../common/book/Book.vue"
import user from "../../../mixins/user.js"
import errorHandler from "../../../mixins/errorHandler.js"
import getBooks from "../../../mixins/getBooks.js"
import { Toast, Indicator } from "mint-ui"
export default {
  mixins: [ user, errorHandler, getBooks ],
  data() {
    return {
      bookList: [],
      currentPage: 1,
      maxPage: 100,
      bookLoading: false
    }
  },
  components: {
    singleBook: Book
  },
  methods: {
    loadMoreBook() {
      if (this.currentPage < this.maxPage) {
        Indicator.open({
          text: "加载更多...",
          spinnerType: "snake"
        })
        this.currentPage += 1
        this.getBooks({
          type: "finished",
          userId: this.userId,
          pageNum: this.currentPage,
          limits: 12,
          token: this.token
        }).then(res => {
          Indicator.close()
          this.bookList = this.bookList.concat(res.data.dataList)
        }).catch(err => {
          Indicator.close()
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
    this.getBooks({
      type: "finished",
      userId: this.userId,
      pageNum: this.currentPage,
      limits: 12,
      token: this.token
    }).then(res => {
      Indicator.close()
      this.bookList = res.data.dataList
      this.maxPage = res.data.totalPage
    }).catch(err => {
      Indicator.close()
      this.errorHandler(err)
    })
  }
}
</script>

<style lang="css" scoped>
@import "../../../../static/css/personal/popup.css";

.book-list {
  box-sizing: border-box;
  padding: 0 10px;
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  width: 100%;
}
</style>
