<template lang="html">
  <!-- 最新问答 -->
  <div class="question-list"
    :class="{ 'question-list--teacher': role === 'teacher' }"
    v-infinite-scroll="loadMoreQuestion"
    infinite-scroll-disabled="questionLoading"
    infinite-scroll-immediate-check="false"
    infinite-scroll-distance="50">
    <single-question
      v-for="question in questionList"
      :user="question.publisher"
      :time="question.publishDate"
      :question-id="question.id"
      :question-content="question.description"
      :key="question.id">
    </single-question>
  </div>
</template>

<script>
import Question from "../../components/common/question/Question.vue"
import user from "../../mixins/user.js"
import errorHandler from "../../mixins/errorHandler.js"
import getQuestions from "../../mixins/getQuestions.js"
import { Toast, Indicator } from "mint-ui"
export default {
  mixins: [ user, errorHandler, getQuestions ],
  data() {
    return {
      questionList: [],
      currentPage: 1,
      maxPage: 100,
      questionLoading: false
    }
  },
  components: {
    singleQuestion: Question
  },
  methods: {
    // 最新问题底部下拉加载更多数据
    loadMoreQuestion() {
      if (this.currentPage < this.maxPage) {
        Indicator.open({
          text: "加载更多...",
          spinnerType: "snake"
        })
        this.questionLoading = true
        this.currentPage += 1
        this.getQuestions({
          type: "latest",
          pageNum: this.currentPage,
          limits: 9,
          token: this.token
        }).then(res => {
          this.questionLoading = false
          Indicator.close()
          this.questionList = this.questionList.concat(res.data.dataList)
        }).catch(err => {
          this.questionLoading = false
          Indicator.close()
          this.errorHandler(err)
        })
      } else {
        Toast({
          message: "无更多数据",
          position: "bottom",
          duration: 1500
        })
      }
    }
  },
  created() {
    // 初始化数据
    Indicator.open({
      text: "加载中...",
      spinnerType: "snake"
    })
    this.getQuestions({
      type: "latest",
      pageNum: this.currentPage,
      limits: 9,
      token: this.token
    }).then(res => {
      Indicator.close()
      this.maxPage = res.data.totalPage
      this.questionList = res.data.dataList
    }).catch(err => {
      Indicator.close()
      this.errorHandler(err)
    })
  }
}
</script>

<style lang="css">
@import "../../../static/css/qa/questionlist.css";
</style>
