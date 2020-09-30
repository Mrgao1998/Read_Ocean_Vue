<template>
    <div class="courses-list"
         v-infinite-scroll="loadMoreCourses"
         infinite-scroll-disabled="courseLoading"
         infinite-scroll-immediate-check="false"
         infinite-scroll-distance="50">
        <single-course class="video" v-for="(value,key,index) in videos" :title="value.title" :key="value.index" :videoUrl="value.video"></single-course>
    </div>
</template>

<script type="text/javascript">
  import user from "../../../mixins/user.js"
  import { Toast, Indicator } from "mint-ui"
  import SingleCourse from "../../../components/common/video/Video.vue"
  import errorHandler from "../../../mixins/errorHandler.js"
  import getCourses from "../../../mixins/getCourses.js"
  export default {
    mixins: [ user, errorHandler, getCourses ],
    data() {
      return {
        videos: [],
        currentPage: 1,
        maxPage: 100,
        courseLoading: false
      }
    },
    components: {
      "single-course": SingleCourse
    },
    methods: {
      loadMoreCourses() {
        if (this.currentPage < this.maxPage) {
          Indicator.open({
            text: "加载更多...",
            spinnerType: "snake"
          })
          this.currentPage += 1
          this.courseLoading = true
          this.getCourses({
            type: "tinyread_type_func",
            pageNum: this.currentPage,
            limits: 10,
            token: this.token
          }).then(res => {
            Indicator.close()
            this.videos = this.videos.concat(res.data.dataList)
            this.courseLoading = false
          }).catch(err => {
            Indicator.close()
            this.courseLoading = false
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
      /* 获取阅读方法 */
      Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      })
      this.getCourses({
        type: "tinyread_type_func",
        pageNum: this.currentPage,
        limits: 10,
        token: this.token
      }).then(res => {
        Indicator.close()
        this.videos = res.data.dataList
        this.currentPage = res.data.currentPage
        this.maxPage = res.data.totalPage
      }).catch(err => {
        Indicator.close()
        this.errorHandler(err)
      })
    }
  }
</script>

<style lang="css">
    .video {
        margin-top: 15px;
    }

    .courses-list {
        position: absolute;
        top: 50px;
        bottom: 0;
        box-sizing: border-box;
        width: 100%;
        padding: 10px;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
    }
</style>
