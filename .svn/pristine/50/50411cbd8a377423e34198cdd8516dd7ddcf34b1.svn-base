<template lang="html">
  <div class="container">
    <div class="top-section">
      <div class="banner">
        <!-- <marquee class='top-marquee' @click="pay"  v-if="schoolType > 0">请点击此处充值 阅读报告功能需支付100元/1学期 回答书籍问题3元/每本</marquee> -->
        <marquee class='top-marquee'  v-if="schoolType > 0">阅读报告功能需支付19.9元/1学期 每个年级有一本免费的书答题 后续答题：2元/1本</marquee>

        <img src="../../../static/images/banner.jpg" alt="" class="banner-image">
      </div>
      <div class="section-nav">
        <a class="btn btn-nav" href="/ReadingOcean/wechat/ranking"><i class="btn btn-icon icon-rank"></i>排行榜</a>
        <a class="btn btn-nav" href="/ReadingOcean/wechat/courses"><i class="btn btn-icon icon-video"></i>名师微课</a>
        <a class="btn btn-nav" href="/ReadingOcean/wechat/qa" v-if="schoolId !== '4419001'"><i class="btn btn-icon icon-qa"></i>故事新编</a>
        <a class="btn btn-nav" v-if="role === 'student' && schoolId !== '4419001'"  href="/ReadingOcean/wechat/parentForum"><i class="btn btn-icon icon-parent"></i>家长阅读</a>
        <a class="btn btn-nav" v-if="role !== 'student' && schoolId !== '4419001'"  href="/ReadingOcean/wechat/teacherForum"><i class="btn btn-icon icon-teacher"></i>教师阅读</a>
        <a class="btn btn-nav" v-if="role === 'student' && schoolId !== '4419001'" :href="'http://ro.bnuz.edu.cn/ReadingOcean/ocean/newMobileOceanAnimal?userId=' + userId " ><i class="btn btn-icon icon-seaworld"></i>海洋世界</a >
      </div>
    </div>
    <div class="tip">
      <button v-if="community.indexOf(schoolId) !== -1" class="tip__class" @click="toCourse">实践课程</button>
      <p class="tip__text">推荐书籍</p>
      <button v-if="community.indexOf(schoolId) !== -1" class="tip__detail" @click="toRecommend">阅读介绍</button>
    </div>
    <div class="recommend-book">
      <book
        v-for="book in bookList"
        :bookname="book.title"
        :imgSrc="book.coverImg"
        :bookId="book.id"
        customWidth="33.3333%"
        :key="book.id"></book>
    </div>
  </div>
</template>

<script>
import Book from "../common/book/Book.vue"
import user from "../../mixins/user.js"
import getBooks from "../../mixins/getBooks.js"
import errorHandler from "../../mixins/errorHandler.js"
import community from "../../utils/community.js"
import { Indicator } from "mint-ui"
export default {
  mixins: [user, errorHandler, getBooks],
  data() {
    return {
      bookList: [],
      payMarquee: false,
      community: community
    }
  },
  components: {
    book: Book
  },
  methods: {
    pay() {
      window.location.assign("/ReadingOcean/wechat/wechatPay")
    },
    toRecommend() {
      window.location.assign("/ReadingOcean/wechat/recommend")
    },
    toCourse() {
      window.location.assign("/ReadingOcean/wechat/practicalCourse")
    }
  },
  created() {
    Indicator.open({
      text: "加载中...",
      spinnerType: "snake"
    })
    this.getBooks({
      type: "recommend",
      schoolId: this.schoolId,
      pageNum: 1,
      limits: 9,
      token: this.token
    }).then(res => {
      Indicator.close()
      this.bookList = res.data.dataList
    }).catch(err => {
      Indicator.close()
      this.errorHandler(err)
    })
    // 判断是否出现滚动窗
    console.log(this.schoolType)
    if (this.schoolType > 0) { // 阅读海洋小学和其实社区的schoolType是 1 2
      this.payMarquee = true
    }
  }
}
</script>

<style lang="css" scoped>
.container {
  box-sizing: border-box;
  width: 100%;
  background: #fff;
  padding-bottom: 55px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.btn {
  display: block;
  outline: 0;
  border: 0;
}

.top-section {
  width: 100%;
  background-color: #fff;
}

.top-marquee {
  height: 20px;
  line-height: 25px;
}

.banner {
  width: 100%;
}

.banner-image {
  width: 100%;
}

.section-nav {
  display: flex;
  justify-content: space-around;
  padding: 0 0 10px 0;
  background-color: #fff;
}

.btn-nav {
  background-color: #fff;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 400;
  color: #475669;
}

.btn-icon {
  width: 30px;
  height: 30px;
  margin: 5px auto;
}

.icon-rank {
  background: url("../../../static/images/main/trophy.svg");
}

.icon-qa {
  background: url("../../../static/images/main/qa.svg");
}

.icon-video {
  background: url("../../../static/images/main/blackboard.svg");
}

.icon-seaworld {
  background: url("../../../static/images/main/whale.svg");
}
.icon-teacher {
  background: url("../../../static/images/main/teacher.svg");
}
.icon-parent {
  background: url("../../../static/images/main/family.svg");
}
.tip {
  position: relative;
  width: 100%;
  height: 40px;
  background-color: rgb(245, 245, 245);
}

.tip__text {
  text-align: center;
  line-height: 40px;
  margin: 0;
  color: #1f2d3d;
}

.tip__detail {
  padding: 0 10px;
  position: absolute;
  display: inline;
  right: 10px;
  top: 0;
  border: none;
  border-radius: 100px;
  background-color: rgb(255, 255, 255);
  color: rgb(51, 204, 0);
  height: 40px;
  width: 50px;
  outline: none;
}

.tip__class {
  padding: 0 10px;
  position: absolute;
  display: inline;
  left: 10px;
  top: 0;
  border: none;
  border-radius: 100px;
  background-color: rgb(255, 255, 255);
  color: rgb(216, 0, 0);
  height: 40px;
  width: 50px;
  outline: none;
}

.tip__text::after,
.tip__text::before {
  content: "-";
  padding: 0 5px;
}

.recommend-book {
  box-sizing: border-box;
  width: 100%;
  padding: 10px 10px;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>
