<template lang="html">
  <!--修改密码弹出框-->
  <div class="retrieve">
    <div class="retrieve__content">
      <!-- 忘记密码 logo -->
      <div class="retrieve__logo">
        <img src="../../../../static/images/retrieve.svg" alt="找回密码图标">
      </div>
      <!-- 修改密码表单 -->
      <input type="password" class="retrieve__input" placeholder="请输入旧密码" v-model="originalPwd">
      <input type="password" class="retrieve__input" placeholder="请输入新密码" v-model="newPwd">
      <input type="password" class="retrieve__input" placeholder="请确认新密码" v-model="confirmPwd">
      <mt-button type="primary" class="retrieve-btn"  @click="updatePwd">修改密码
      </mt-button>
      <!-- 返回按钮 -->
      <button class="retrieve__quit" @click="$router.go(-1)"><i class="quit-icon"></i><span class="quit-text">返回</span></button>
    </div>
  </div>
</template>

<script>
  import user from "../../../mixins/user.js"
  import Axios from "axios"
  import { Toast } from "mint-ui"
  import * as API from "../../../api/api"
  import errorHandler from "../../../mixins/errorHandler.js"
  export default {
    mixins: [ user, errorHandler ],
    data() {
      return {
        originalPwd: "",
        newPwd: "",
        confirmPwd: ""
      }
    },
    computed: {
    },
    methods: {
      // 修改密码表单提交
      updatePwd() {
        if (this.originalPwd.length > 0 && this.newPwd.length > 0 && this.confirmPwd.length > 0 && this.confirmPwd === this.newPwd) {
          Axios({
            url: API.updatePwd,
            method: "post",
            params: {
              userId: this.userId,
              originalPwd: this.originalPwd,
              newPwd: this.newPwd
            },
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": this.token
            }
          }).then((res) => {
            Toast({
              message: "密码修改成功，请重新登陆",
              position: "top",
              duration: 1500
            })
            this.newPwd = ""
            this.confirmPwd = ""
            this.originalPwd = ""
            // 清空 sessionStorage
            sessionStorage.clear()
            // 延时 跳转到登陆页
            setTimeout(() => {
              window.location.assign("/ReadingOcean/wechat")
            }, 1500)
          }).catch((err) => {
            this.errorHandler(err)
          })
        } else {
          Toast({
            message: "新密码不一致，请重新输入",
            position: "top",
            duration: 1500
          })
          this.newPwd = ""
          this.confirmPwd = ""
          this.originalPwd = ""
        }
      }
    }
  }
</script>

<style lang="css" scoped>
/* 忘记密码区域 */
  .retrieve {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 1000;
  }

  .retrieve__content {
    box-sizing: border-box;
    width: 100%;
    min-height: 100%;
    background-color: #fff;
    padding-top: 30px;
    padding-bottom: 60px;
  }

  .retrieve__input::-webkit-input-placeholder {
    color: #b2b2b2;
    font-size: 12px;
  }

  .retrieve__input {
    display: block;
    box-sizing: content-box;
    width: 70%;
    padding: 8px;
    margin: 20px auto;
    outline: none;
    appearance: none;
    border: 1px solid #d5d5d5;
    text-align: left;
    font-size: 16px;
    font-weight: lighter;
    color: #000;
    background-color: transparent;
  }

  .retrieve__logo {
    margin: 0 auto 30px auto;
    width: 100px;
  }

  .retrieve-btn {
    display: block;
    box-sizing: content-box;
    margin: 0 auto;
    width: 70%;
    background-color: #21D0C3;
    padding: 0 10px;
  }

  .retrieve__quit {
    position: absolute;
    display: flex;
    align-items: center;
    top: 15px;
    left: 5px;
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    background: none;
  }

  .quit-icon {
    display: block;
    width: 22px;
    height: 22px;
    background-image: url("../../../../static/images/left-arrow.svg");
  }

  .quit-text {
    font-size: 16px;
    color: #21D0C3;
  }
</style>
