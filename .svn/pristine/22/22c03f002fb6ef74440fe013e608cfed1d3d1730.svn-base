<template>
<div class="container">
    <div class="tab" v-if="role === 'student'">
      <div @touchend="tabChange('pending')"
           class="tab__item"
           :class="{'tab__item--active': tabSelected === 'pending'}">教师任务</div>
      <div @touchend="tabChange('finished')"
           class="tab__item"
           :class="{'tab__item--active': tabSelected === 'finished'}">完成任务</div>
      <div @touchend="tabChange('overdue')"
           class="tab__item"
           :class="{'tab__item--active': tabSelected === 'overdue'}">逾期任务</div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
</div>
</template>

<script>
import user from "../../mixins/user.js"
export default {
  mixins: [ user ],
  data() {
    return {
      tabSelected: "pending"
    }
  },
  methods: {
    /* tab 切换触发 */
    tabChange(type) {
      this.tabSelected = type
      this.$router.push("/ReadingOcean/wechat/mytask/".concat(type))
    }
  },
  activated() {
    if (this.role === "student") {
      this.$router.push("/ReadingOcean/wechat/mytask/".concat(this.tabSelected))
    }
  }
}
</script>

<style>
.container {
  width: 100%;
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
  border-bottom: 2px #3C89FD solid;
  margin-bottom: -2px;
}
</style>
