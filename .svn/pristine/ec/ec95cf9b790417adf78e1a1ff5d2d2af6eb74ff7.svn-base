<template>
  <mt-tabbar class="tab-nav" :fixed="true">

    <mt-tab-item id="发现" @touchstart.native="toMain()">
      <img slot="icon" src="../../../../static/images/Navicon/discovery.svg">
      <span class="tab-nav-title">发现</span>
    </mt-tab-item>

    <mt-tab-item id="书香门第" @touchstart.native="toBookEdu()">
      <img slot="icon" src="../../../../static/images/Navicon/books.svg">
      <span class="tab-nav-title">书香门第</span>
    </mt-tab-item>

    <mt-tab-item id="我的任务" @touchstart.native="toMyTask()">
      <img slot="icon" src="../../../../static/images/Navicon/task.svg">
      <span class="tab-nav-title" v-if="role==='student'">我的任务</span>
      <span class="tab-nav-title" v-if="role==='teacher'">布置作业</span>
    </mt-tab-item>

    <mt-tab-item id="作品社区" @touchstart.native="toCommunity()">
      <img slot="icon" src="../../../../static/images/Navicon/fish.svg">
      <span class="tab-nav-title">作品社区</span>
    </mt-tab-item>

    <mt-tab-item id="个人中心" @touchstart.native="toPersonalCenter()">
      <img slot="icon" src="../../../../static/images/Navicon/personal.svg">
      <span class="tab-nav-title">个人中心</span>
    </mt-tab-item>

  </mt-tabbar>
</template>

<script>
import user from "../../../mixins/user.js"
export default {
  mixins: [ user ],
  methods: {
    toMain() {
      this.$router.push("/ReadingOcean/wechat/home")
    },
    toBookEdu() {
      this.$router.push("/ReadingOcean/wechat/bookedu")
    },
    toMyTask() {
      if (window.location.href.indexOf("mytask") === -1) {
        if (this.role === "teacher") {
          this.$router.push("/ReadingOcean/wechat/published")
        } else if (this.role === "student") {
          this.$router.push("/ReadingOcean/wechat/mytask/pending")
        }
      }
    },
    toPersonalCenter() {
      this.$router.push("/ReadingOcean/wechat/personal")
    },
    toCommunity() {
      this.$router.push("/ReadingOcean/wechat/community")
    }
  }
}
</script>

<style scoped>
  .tab-nav {
    background-color: #fff;
    height: 55px;
    text-align: center;
  }

  .tab-nav-title {
    font-size: 12px;
    font-weight: 400;
    color: #475669;
  }
</style>
