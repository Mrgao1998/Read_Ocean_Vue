<template lang="html">
  <!--修改姓名弹出框-->
  <div class="retrieve">

    <div class="retrieve__content">
      <input type="username" v-if="isSanke" class="retrieve__input" placeholder="请输入姓名(要求全汉字)" v-model="name">
      <input type="idNumber" class="retrieve__input" placeholder="请输入身份证后六位" v-model="idNumber">
      <div class="chooseGender">
        <mt-radio align="right" title="选择性别" v-model="gender" :options="['男', '女']"></mt-radio>
      </div>
      <mt-button type="primary" class="retrieve-btn"  @click="submit">保存
      </mt-button>
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
  mixins: [user, errorHandler],
  data() {
    return {
      name: "",
      idNumber: "",
      gender: "",
      isSanke: false
    }
  },
  computed: {
  },
  created() {
    Axios({
      url: API.judgeIsSanKe,
      method: "GET",
      params: {
        userId: this.userId
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then((res) => {
      if (res.status === 200) {
        if (res.data.code === 200) { // 说明是散客
          this.isSanke = true
        } else if (res.data.code === 401) {
          this.isSanke = false
        } else {
          alert("服务器错误")
        }
      } else {
        alert("服务器错误")
      }
    }).catch(err => {
      this.errorHandler(err)
    })
  },
  methods: {
    // 表单提交
    submit() {
      if (this.isSanke) {
        if (this.name.length > 0 && this.idNumber.length === 6 && this.gender.length > 0) {
          Axios({
            url: API.modify, //
            method: "post",
            params: {
              sex: this.gender,
              idcard: this.idNumber,
              userName: this.name
            },
            headers: {
              "Authorization": this.token
            }
          }).then((res) => {
            if (res.status === 200) {
              Toast({
                message: "保存成功",
                position: "top",
                duration: 1500
              })
            } else {
              alert("服务器错误")
            }
            // // 清空 sessionStorage
            // sessionStorage.clear()
            // // 延时 跳转到登陆页
            // setTimeout(() => {
            //   window.location.assign("/ReadingOcean/wechat/userInfo")
            // }, 1500)
          }).catch((err) => {
            this.errorHandler(err)
          })
        } else { // 需要改 增加判断 如果是不是散客就不用填写姓名
          alert("未完整填写")
          return false
        }
      } else {
        if (this.idNumber.length === 6 && this.gender.length > 0) {
          Axios({
            url: API.modify, //
            method: "post",
            params: {
              sex: this.gender,
              idcard: this.idNumber,
              userName: this.name
            },
            headers: {
              "Authorization": this.token
            }
          }).then((res) => {
            if (res.status === 200) {
              Toast({
                message: "保存成功",
                position: "top",
                duration: 1500
              })
            } else {
              alert("服务器错误")
            }
            // // 清空 sessionStorage
            // sessionStorage.clear()
            // // 延时 跳转到登陆页
            // setTimeout(() => {
            //   window.location.assign("/ReadingOcean/wechat/userInfo")
            // }, 1500)
          }).catch((err) => {
            this.errorHandler(err)
          })
        } else { // 需要改 增加判断 如果是不是散客就不用填写姓名
          alert("未完整填写")
          return false
        }
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
.chooseGender {
  display: block;
  box-sizing: content-box;
  width: 70%;
  padding: 8px;
  margin: 20px auto;
  outline: none;
  appearance: none;
  border: 1px solid #d5d5d5;
  text-align: left;
  font-size: 18px;
  font-weight: lighter;
  color: #000;
  background-color: transparent;
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
  font-size: 18px;
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
  font-size: 18px;
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
  background-color: #21d0c3;
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
  color: #21d0c3;
}
</style>
