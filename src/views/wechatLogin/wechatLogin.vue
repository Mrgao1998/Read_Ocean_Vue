<template lang="html">
    <div class="app">
      <h3>微信快捷登录</h3>
      <div class='panel'>
        <div class='user__box' v-for="user in userList">
          <img :src="user.picUrl"/>
          <span class='user_content'>{{user.schoolName}}-<b>{{user.name}}</b></span>
          <div class='user_login' @click='wechatLogin($event)' 
          :userId='user.userId' 
          :userType='user.type'
          :schoolId='user.schoolId'>登录</div>
        </div>
      </div>
    </div>
</template>

<script>
  import Axios from "axios"
  import * as API from "../../api/api.js"
  import { Toast } from "mint-ui"
  export default {
    data() {
      return {
        userList: [],
        secret: "",
        lat: 0,
        lng: 0
      }
    },
    methods: {
      getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
        var r = window.location.search.substr(1).match(reg)
        if (r != null) return decodeURI(r[2]); return null
      },
      wechatLogin(event) {
        Axios({
          url: API.WxQuickLogin,
          method: "POST",
          params: {
            userId: event.target.getAttribute("userId"),
            userType: event.target.getAttribute("userType"),
            secret: this.secret,
            lat: this.lat,
            lng: this.lng
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(res => {
          // 存储 userId 到 sessionStorage
          sessionStorage.setItem(API.userIdKey, res.data.userId)
          // 存储 token 到 sessionStorage
          sessionStorage.setItem(API.tokenKey, res.data.token)
          // 存储 schoolId 到 sessionStorage
          sessionStorage.setItem(API.schoolIdKey, event.target.getAttribute("schoolId"))
          // 存储 userType 到 sessionStorage
          sessionStorage.setItem(API.userTypeKey, event.target.getAttribute("userType"))
          // 存储 lat 到 sessionStorage
          sessionStorage.setItem(API.latKey, this.lat)
          // 存储 lng 到 sessionStorage
          sessionStorage.setItem(API.lngKey, this.lng)
          // 登录成功之后跳转到
          document.location.assign("/ReadingOcean/wechat/home")
        }).catch(err => {
          this.errorHandler(err)
        })
      }
    },
    created() {
      Axios({
        url: API.WxBindUser,
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.userList = res.data.data.data
          this.secret = res.data.data.secret
        }
        if (this.userList.length <= 0) {
          Toast({
            message: "您没有绑定的用户",
            position: "center",
            duration: 1500
          })
          setTimeout(function () {
            document.location.href = "/ReadingOcean/wechat"
          }, 2000)
        }
      }).catch(err => {
        this.errorHandler(err)
      })
      this.lng = this.getQueryString("lng")
      this.lat = this.getQueryString("lat")
    }
  }
</script>

<style lang="css">
html {
  width: 100%;
  height: 100%;
}

body {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: rgb(239, 238, 243);
}
.app{
  width: 100%;
  height: 100%;
  /* border: solid; */
  text-align: center;
}
.app>h3{
  color:rgb(26, 173, 25)
}
.panel{
  width: 100%;
  height: 100px;
  line-height: 100px;
  display: flex;
  flex-direction: column;
  text-align: left;
}
.user__box{
  position: relative;
  flex: 1;
  margin-top: 1px;
  border: 1px solid #ccc;
}
.user__box>img{
  width: 40px;
  height: 40px;
}
.user_content{
  margin: 0 30px;
  /* background-color: red; */
}
.user_login{
  float: right;
  padding:0 15px;
  background-color: rgb(26, 173, 25);
  color: rgb(255,255,255)
}
</style>
