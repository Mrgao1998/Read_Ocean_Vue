<template>
  <div class="personal">
    <!-- 显示商城二维码 -->
    <div class="store__show"
         @click="storeShow = false"
         v-if="storeShow">
      <span>长按图标识别</span>
      <img src="../../../static/images/personal-center/store.png">
    </div>
    <!-- 头部区域 -->
    <div class="header">
      <img class="header__user-avatar"
           src="../../../static/images/login&regist/1-12.png">
      <h3 class="header__user-name">{{userInfo.userName}}</h3>
      <p class="user-school">
        <span>{{userInfo.schoolName}}</span>
        <span v-if="role === 'student'">{{userInfo.grade}}{{userInfo.className}}</span>
      </p>
      <!-- <button class="wechatPay"
              v-if="userInfo.schoolId==='1000000' || userInfo.schoolId==='1101001'"
              @click="pay"><i class="wechatPay_icon"></i>用户续费</button> -->
      <!--退出登录按钮-->
      <button class="log-out"
              @click="logOut">退出<i class="log-out_icon"></i></button>
    </div>
    <!-- 成就徽章 -->
    <ul class="achieve" v-if="role === 'student'">
      <!-- 总积分 -->
      <li class="achieve__item">
        <img src="../../../static/images/personal-center/medal.svg"
             class="achieve__icon">
        <p class="achieve__text">
          <span>总积分:</span>
          <span>{{userInfo.userPoints}}</span>
        </p>
      </li>
      <!-- 等级 -->
      <li class="achieve__item">
        <img src="../../../static/images/personal-center/medal.svg"
             class="achieve__icon">
        <p class="achieve__text">
          <span>等级:</span>
          <span>{{userInfo.rank}}级</span>
        </p>
      </li>
      <!-- 称号 -->
      <li class="achieve__item">
        <img src="../../../static/images/personal-center/medal.svg"
             class="achieve__icon">
        <p class="achieve__text">
          <span>称号:</span>
          <span>{{userInfo.rankTitle}}</span>
        </p>
      </li>
    </ul>
    <!-- 个人信息栏 -->
    <div class="personal-info">
      <!-- 个人信息 -->
      <mt-cell title="个人信息"
               @click.prevent.native="$router.push('/ReadingOcean/wechat/userInfo')"
               class="personal-info__item"
               is-link>
        <img slot="icon"
             src="../../../static/images/personal-center/info.svg"
             width="32"
             height="32">
      </mt-cell>
      <!-- 答题闯关 -->
      <mt-cell title="答题闯关"
               v-if="role === 'student'"
               @click.prevent.native="$router.push('/ReadingOcean/wechat/userAnswer')"
               class="personal-info__item"
               is-link>
        <img slot="icon"
             src="../../../static/images/personal-center/answer.svg"
             width="32"
             height="32">
      </mt-cell>
      <!-- 阅读报告 -->
      <mt-cell title="阅读报告"
               v-if="role === 'student'"
               @click.prevent.native="judgeSankeIsPayReadingReport()"
               class="personal-info__item"
               is-link>
        <img slot="icon"
             src="../../../static/images/personal-center/report.png"
             width="32"
             height="32">
      </mt-cell>
      <!-- 海洋书店 -->
      <mt-cell title="海洋书店"
               @click.prevent.native="storeShow = true"
               class="personal-info__item"
               is-link>
        <img slot="icon"
             src="../../../static/images/personal-center/shopcart.svg"
             width="32"
             height="32">
      </mt-cell>
      <!-- 正在阅读 -->
      <mt-cell title="正在阅读"
               v-if="role === 'student'"
               @click.prevent.native="$router.push('/ReadingOcean/wechat/readingBooks')"
               class="personal-info__item"
               is-link>
        <img slot="icon"
             src="../../../static/images/personal-center/reading.svg"
             width="32"
             height="32">
      </mt-cell>
      <!-- 我已阅读 -->
      <mt-cell title="我已阅读"
        v-if="role === 'student'"
        @click.prevent.native="payAlreadyReadIndividual()"
        class="personal-info__item"
        is-link>
        <img slot="icon"
             src="../../../static/images/personal-center/read.svg"
             width="32"
             height="32">
      </mt-cell>
      <!-- 我的问答 -->
      <mt-cell title="我的问答"
               @click.prevent.native="$router.push('/ReadingOcean/wechat/qaRecords')"
               class="personal-info__item"
               is-link>
        <img slot="icon"
             src="../../../static/images/personal-center/qa.svg"
             width="32"
             height="32">
      </mt-cell>
      <!-- 我的论坛 -->
      <mt-cell title="我的论坛"
               @click.prevent.native="$router.push('/ReadingOcean/wechat/forum')"
               class="personal-info__item"
               is-link>
        <img slot="icon"
             src="../../../static/images/personal-center/bbs.svg"
             width="32"
             height="32">
      </mt-cell>
      <!-- 我的学生 -->
      <mt-cell title="我的学生"
               v-if="role === 'teacher'"
               @click.prevent.native="$router.push('/ReadingOcean/wechat/students')"
               class="personal-info__item"
               is-link>
        <img slot="icon"
             src="../../../static/images/personal-center/student.svg"
             width="32"
             height="32">
      </mt-cell>
      <!-- 意见反馈 -->
      <mt-cell title="意见反馈"
               @click.prevent.native="$router.push('/ReadingOcean/wechat/feedback')"
               class="personal-info__item"
               is-link>
        <img slot="icon"
             src="../../../static/images/personal-center/feedback.svg"
             width="32"
             height="32">
      </mt-cell>
      <!-- 我的作品 -->
      <mt-cell title="我的作品"
               @click.prevent.native="payUserWorkIndividual()"
               class="personal-info__item"
               is-link>
        <img slot="icon"
             src="../../../static/images/我的作品.png"
             width="32"
             height="32">
      </mt-cell>
      <!-- 购买记录 -->
      <mt-cell title="购买记录"
               @click.prevent.native="$router.push('/ReadingOcean/wechat/paidLst')"
               class="personal-info__item"
               is-link>
        <img slot="icon"
             src="../../../static/images/personal-center/feedback.svg"
             width="32"
             height="32">
      </mt-cell>
    </div>
  </div>
</template>

<script>
import user from "../../mixins/user.js"
import Cookie from "js-cookie"
import * as API from "../../api/api"
import Axios from "axios"
import { MessageBox } from "mint-ui"
export default {
  mixins: [user],
  data() {
    return {
      storeShow: false
    }
  },
  methods: {
    // /* 退出登录方法 */
    // logOut() {
    //   MessageBox({
    //     title: "退出登录",
    //     message: "确认要退出吗?",
    //     showCancelButton: true
    //   }).then(action => {
    //     if (action === "confirm") {
    //       // 清空 sessionStorage
    //       sessionStorage.clear()
    //       Cookie.remove(API.cookieKey)
    //       // 延时 跳转到登陆页
    //       setTimeout(() => {
    //         window.location.assign("/ReadingOcean/wechat")
    //       }, 1000)
    //     }
    //   })
    // },
    /* 退出登录方法 */
    logOut() {
      sessionStorage.clear()
      Cookie.remove(API.cookieKey)
      // 延时 跳转到登陆页
      setTimeout(() => {
        window.location.assign("/ReadingOcean/wechat")
      }, 1000)
    },
    pay() {
      window.location.assign("/ReadingOcean/wechat/wechatPay")
    },
    judgeSankeIsPayReadingReport() { // 判断散客是否有购买本学期的阅读报告权限（200 可以查看 401 需要购买 500 服务器错误） 普通用户全部默认200
      Axios({
        url: API.judgeSankeIsPayReadingReport,
        method: "GET",
        params: {
          userId: this.userId
        },
        headers: {
          "Authorization": this.token
        }
      }).then(res => {
        if (res.status === 200) {
          // console.log(res)
          if (res.data.code === 200) {
            this.$router.push("/ReadingOcean/wechat/report")
            // window.location.assign("/ReadingOcean/wechat/report")
          } else if (res.data.code === 401) {
            MessageBox.confirm("您还未购买本学期的查看阅读报告权限 现在购买？"
            ).then(action => {
              if (action === "confirm") {
                Axios({
                  url: API.payReadingReportIndividual,
                  method: "GET",
                  headers: {
                    "Authorization": this.token
                  }
                }).then(res => {
                  if (res.status === 200) {
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
                          document.location.assign("/ReadingOcean/wechat/personal")
                        }
                      }
                    )
                  } else {
                    console.log(res)
                    alert("服务器错误")
                  }
                }).catch(err => {
                  console.log(err)
                  this.errorHandler(err)
                })
              }
            })
          } else {
            alert("服务器错误")
          }
        }
      }).catch(err => {
        console.log(err)
        this.errorHandler(err)
      })
    },
    // 阅读报告
    payAlreadyReadIndividual() { 
      // 判断散客是否有购买本学期的我已阅读权限（200 可以查看 401 需要购买 500 服务器错误） 普通用户全部默认200
      Axios({
        url: API.judgeSankeIsPayAlreadyRead,
        method: "GET",
        params: {
          userId: this.userId
        },
        headers: {
          "Authorization": this.token
        }
      }).then(res => {
        if (res.status === 200) {
          // console.log(res)
          if (res.data.code === 200) {
            this.$router.push("/ReadingOcean/wechat/finishedBooks")
            // window.location.assign("/ReadingOcean/wechat/finishedBooks")
          } else if (res.data.code === 401) {
            MessageBox.confirm("您还未购买本学期的查看我已阅读权限 现在购买？"
            ).then(action => {
              if (action === "confirm") {
                Axios({
                  url: API.payReadingReportIndividual,
                  method: "GET",
                  headers: {
                    "Authorization": this.token
                  }
                }).then(res => {
                  if (res.status === 200) {
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
                          document.location.assign("/ReadingOcean/wechat/personal")
                        }
                      }
                    )
                  } else {
                    console.log(res)
                    alert("服务器错误")
                  }
                }).catch(err => {
                  console.log(err)
                  this.errorHandler(err)
                })
              }
            })
          } else {
            alert("服务器错误")
          }
        }
      }).catch(err => {
        console.log(err)
        this.errorHandler(err)
      })
    },
    payUserWorkIndividual() {
      Axios({
        url: API.judgeSankeIsPayUserWork,
        method: "GET",
        params: {
          userId: this.userId
        },
        headers: {
          "Authorization": this.token
        }
      }).then(res => {
        if (res.status === 200) {
          // console.log(res)
          if (res.data.code === 200) {
            this.$router.push("/ReadingOcean/wechat/posts")
            // window.location.assign("/ReadingOcean/wechat/posts")
          } else if (res.data.code === 401) {
            MessageBox.confirm("您还未购买本学期的查看我的作品权限 现在购买？"
            ).then(action => {
              if (action === "confirm") {
                Axios({
                  url: API.payUserWorkIndividual,
                  method: "GET",
                  headers: {
                    "Authorization": this.token
                  }
                }).then(res => {
                  if (res.status === 200) {
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
                          document.location.assign("/ReadingOcean/wechat/personal")
                        }
                      }
                    )
                  } else {
                    console.log(res)
                    alert("服务器错误")
                  }
                }).catch(err => {
                  console.log(err)
                  this.errorHandler(err)
                })
              }
            })
          } else {
            alert("服务器错误")
          }
        }
      }).catch(err => {
        console.log(err)
        this.errorHandler(err)
      })
    },
    // 答题闯关
    goAnswer () {

    }
  }
}
</script>

<style >
.personal {
  width: 100%;
  padding-bottom: 55px;
  background-color: #fff;
}

.header {
  position: relative;
  width: 100%;
  background: url("../../../static/images/personal-center/bgice.png");
  background-position: top center;
  background-size: cover;
  background-repeat: no-repeat;
}

.header__user-avatar {
  z-index: 1;
  position: relative;
  top: 15px;
  display: block;
  margin: auto;
  width: 32%;
}

.header__user-name {
  z-index: 1;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0;
  padding: 15px 0;
  position: relative;
  color: #475669;
}

.store__show {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  text-align: center;
  background-color: rgb(255, 255, 255, 0.5);
}

.store__show > span {
  font-size: 2rem;
  color: rgb(22, 119, 210);
  margin: 25% 0;
}

.store__show > img {
  margin: 35% 0;
}

.user-school {
  z-index: 1;
  position: relative;
  top: -10px;
  margin: 0;
  text-align: center;
  font-size: 0.9rem;
  color: #475669;
}

.personal-info {
  width: 100%;
  background-color: rgb(255, 255, 255);
}

.personal-info__item {
  width: 100%;
}
.personal-info__item img {
  width: 10%;
}
.achieve {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px 0;
  margin: 0;
  list-style-type: none;
  background-color: rgb(255, 255, 255);
}

.achieve__item {
  width: calc(100% / 3);
}

.achieve__item:nth-child(2) {
  border-left: 1px solid #d3dce6;
  border-right: 1px solid #d3dce6;
}

.achieve__icon {
  margin: auto;
  display: block;
  width: 32px;
}

.achieve__text {
  margin: 5px 0;
  text-align: center;
  font-size: 0.9rem;
}

.log-out {
  position: absolute;
  right: 5px;
  top: 2px;
  display: flex;
  margin: 10px 0 0;
  font-size: 14px;
  color: #fff;
  outline: none;
  border: 0;
  height: 20px;
  background-color: transparent;
}

.log-out_icon {
  display: inline-block;
  width: 20px;
  height: 17px;
  margin-left: 3px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url("../../../static/images/personal-center/logout.svg");
}
.wechatPay {
  position: absolute;
  left: 5px;
  top: 2px;
  display: flex;
  margin: 10px 0 0;
  font-size: 14px;
  color: #fff;
  outline: none;
  border: 0;
  height: 20px;
  background-color: transparent;
}
.wechatPay_icon {
  display: inline-block;
  width: 20px;
  height: 17px;
  margin-left: 3px;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url("../../../static/images/personal-center/money.svg");
}
</style>
