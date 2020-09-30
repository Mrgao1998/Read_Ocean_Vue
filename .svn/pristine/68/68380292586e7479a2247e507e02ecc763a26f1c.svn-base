<template lang="html">
    <div class="app">
      <div class = "pay_frame">
        <div class="pay_name_frame">
          <p>尊敬的{{userName}},您好</p>
          <span class="pay_warm">您的账号已到期，请续费</span>
        </div>
        <div class="pay_box">
          <span>请选择您要充值的金额</span>
          <div class="pay_touch_box" id="1" @touchstart="changeBoxStyle($event)">
            <div>年费充值</div>
            <span>售价：200元</span>
          </div>
        </div>
      </div>
      <button class="pay_btn" @touchstart="pay">确认缴费</button>
    </div>
</template>

<script>
  import Axios from "axios"
  import * as API from "../../api/api.js"
  import user from "../../mixins/user.js"
  import errorHandler from "../../mixins/errorHandler.js"

  export default {
    mixins: [ user, errorHandler ],
    data() {
      return {
        userName: "",
        goodId: 0
      }
    },
    methods: {
      changeBoxStyle(event) {
        if (event.target.className === "") {
          event.target.parentNode.className = "pay_touched_box"
          this.goodId = event.target.parentNode.id
        } else {
          event.target.className = "pay_touched_box"
          this.goodId = event.target.id
        }
      },
      pay() {
        Axios({
          url: API.WxPay,
          method: "GET",
          params: {
            userId: sessionStorage.getItem(API.userIdKey),
            goodId: this.goodId
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then((res) => {
          window.WeixinJSBridge.invoke(
            "getBrandWCPayRequest", {
              "appId": res.data.data.appId, // 公众号名称，由商户传入
              "timeStamp": res.data.data.timeStamp, // 时间戳，自1970年以来的秒数
              "nonceStr": res.data.data.nonceStr, // 随机串
              "package": res.data.data.package,
              "signType": res.data.data.signType, // 微信签名方式：
              "paySign": res.data.data.paySign // 微信签名
            },
            function (res) {
              if (res.err_msg === "get_brand_wcpay_request:ok") {
                // 使用以上方式判断前端返回,微信团队郑重提示：
                // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                document.location.assign("/ReadingOcean/wechat")
              }
            }
          )
        }).catch(err => {
          this.errorHandler(err)
        })
      }
    },
    created() {
      Axios({
        url: API.getUserInfo,
        method: "GET",
        params: {
          userId: sessionStorage.getItem(API.userIdKey),
          schoolId: sessionStorage.getItem(API.schoolIdKey),
          userType: "user_type_student"
        },
        headers: {
          "Authorization": this.token
        }
      }).then(res => {
        this.userName = res.data.userName
      }).catch(err => {
        this.errorHandler(err)
      })
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
  text-align: center;
  /* border: solid; */
}
.pay_frame{
  position: relative;
  padding: 10px;
  margin-top: 30px;
  height: auto;
  background-color: rgb(255,255,255);
}
.pay_name_frame{
  text-align: left;
  padding: 5px;
  border-bottom:1px solid rgb(221,221,221);
  color:rgb(110, 110, 110);
}
.pay_name_frame span{
  font-size: 12px;
  color: red;
}
.pay_title {
  font-size: 2.5rem;
  font-weight: lighter;
  margin: 0 0 20px 0;
}
.pay_box{
  text-align: left;
  position: relative;
  padding: 2.5%;
  margin-top: 10px;
}
.pay_box span{
  color: rgb(110, 110, 110);
  font-size: 12px;
}
/*未选中的框*/
.pay_touch_box{
  color:green;
  text-align: center;
  margin: 2.5% 0 2.5% 0;
  width: 30%;
  height: 4rem;
  line-height: 2rem;
  border:1px solid green;
}
.pay_touch_box div{
  width: 100%;
  height: auto;
  border: none;
}
.pay_touch_box span{
  color: green;
}
/*选中的框*/
.pay_touched_box{
  color:rgb(255,255,255);
  text-align: center;
  margin: 2.5% 0 2.5% 0;
  width: 30%;
  height: 4rem;
  line-height: 2rem;
  border:1px solid rgb(221,221,221);
  background-color: green;
}
.pay_touched_box div{
  width: 100%;
  height: auto;
  border: none;
}
.pay_touched_box span{
  color: rgb(255,255,255);
}
.pay_btn{
  width: 80%;
  height: 50px;
  line-height: 50px;
  margin-top: 50px;
  font-size: 16px;
  color: rgb(255,255,255);
  background-color: rgb(56, 159, 55);
  border: 1px solid rgb(221, 221, 221);
}
</style>
