<template>
  <div class="app">
    <div class="container">
      <div v-model="tabSelected" class="tab">
        <div
          @touchend="meiwen"
          class="tab__item"
          :class="{'tab__item--active': tabSelected === 'tinyread_type_video'}">美文欣赏</div>
        <div
          @touchend="yuedu"
          class="tab__item"
          :class="{'tab__item--active': tabSelected === 'tinyread_type_func'}">阅读方法</div>
        <div
          @touchend="gushi"
          class="tab__item"
          :class="{'tab__item--active': tabSelected === 'tinyread_type_book'}">故事视频</div>
      </div>
      <keep-alive>
      <component :is="tabSelected"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script type="text/javascript">
  import user from "../../mixins/user.js"
  import errorHandler from "../../mixins/errorHandler.js"
  import getCourses from "../../mixins/getCourses.js"
  import video from "../../components/common/courses/article.vue"
  import read from "../../components/common/courses/read.vue"
  import story from "../../components/common/courses/story.vue"

  export default {
    mixins: [user, errorHandler, getCourses],
    data() {
      return {
        tabSelected: "tinyread_type_func"
      }
    },
    components: {
      "tinyread_type_video": video,
      "tinyread_type_func": read,
      "tinyread_type_book": story
    },
    methods: {
      goBack() {
        window.history.go(-1)
      },
      meiwen() {
        this.tabSelected = "tinyread_type_video"
        sessionStorage.setItem("smg", "video")
      },
      yuedu() {
        this.tabSelected = "tinyread_type_func"
        sessionStorage.setItem("smg", "func")
      },
      gushi() {
        this.tabSelected = "tinyread_type_book"
        sessionStorage.setItem("smg", "book")
      }
    },
    created() {
      var type = sessionStorage.getItem("smg")
      if (type !== null) { this.tabSelected = "tinyread_type_" + type }
    }
  }
</script>

<style lang="css">
  body {
    padding: 0;
    margin: 0;
    width: 100%;
    -webkit-text-size-adjust: 100% !important;
  }

  .container {
    box-sizing: border-box;
    width: 100%;
    min-height: 100vh;
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
    width: calc(100% / 3);
    height: 50px;
    line-height: 50px;
    font-size: 1rem;
    text-align: center;
    background-color: #fff;
  }

  .tab__item--active {
    color: #3C89FD;
    border-bottom: 3px #3C89FD solid;
    margin-bottom: -3px;
  }

  /* mint-ui 默认样式重写 */
  .mint-navbar .mint-tab-item {
    padding: 0;
  }

  .mint-tab-item-label {
    height: 50px;
    line-height: 50px;
    font-size: 1rem;
  }

  ::-webkit-scrollbar {
    display: none;
  }
</style>
