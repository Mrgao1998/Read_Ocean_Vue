<template lang="html">
  <!-- 个人信息弹出框 -->
  <div class="popup">
    <mt-header title="我的信息" fixed class="popup__header">
      <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <div class="popup__content">
      <mt-cell title="姓名" disabled>{{userInfo.userName}}</mt-cell>
      <mt-cell title="性别" is-link >{{userInfo.gender}}</mt-cell>
      <mt-cell title="密码" is-link @click.prevent.native="$router.push('/ReadingOcean/wechat/updatePwd')"></mt-cell>
      <mt-cell title="证件" is-link >{{userInfo.idCard}} </mt-cell>
      <mt-cell title="学校" disabled>{{userInfo.schoolName}}</mt-cell>
      <mt-cell title="班级" disabled v-if="role === 'student'">{{userInfo.grade}}{{userInfo.className}}</mt-cell>
      <mt-button type="primary" class="update-btn "   @click.prevent.native="$router.push('/ReadingOcean/wechat/updateMessage')">完善信息 </mt-button>
    </div>
  </div>
</template>

<script>
import user from "../../../mixins/user.js"
export default {
  mixins: [user],
  data() {
    return {
      name: ""
    }
  }
}
</script>

<style lang="css">
@import "../../../../static/css/personal/popup.css";
.update-btn {
  display: block;
  box-sizing: content-box;
  float: right;
  width: 20%;
  background-color: #9cb8ca;
  padding: 0 10px;
}
</style>
