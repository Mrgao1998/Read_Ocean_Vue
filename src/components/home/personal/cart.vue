<template lang="html">
  <div class="popup">
    <mt-header title="购物车" fixed class="popup__header">
      <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
    </mt-header> 
    <!-- <single-commodity v-for="commodity in CartList">
      hello
    </single-commodity> -->
  <button @click="pay">点击</button><br>
  <button @click="pay">点击</button><br>
  <button @click="pay">点击</button><br>
  <button @click="pay">点击</button><br>
  <button @click="pay">点击</button><br>
  <button @click="pay">点击</button><br>
  </div>
</template>

<script>
import Commodity from "../../common/commodity/commodity.vue"
import Axios from "axios"
import * as API from "../../../api/api.js"
import user from "../../../mixins/user.js"
import errorHandler from "../../../mixins/errorHandler.js"
import { Indicator } from "mint-ui"
let Base64 = require("js-base64").Base64

export default {
  mixins: [user, errorHandler, Base64],
  data() {
    return {
      CartList: [
        {
          bookId: "026a0c79-7ef0-4ee9-8957-eadc50b1300a",
          userId: null,
          sellerId: "c3bc472cd6a14555a377d5e5449961ac",
          number: 1,
          isBuy: 0,
          bookName: "草房子",
          price: 0.01,
          picUrl:
            "http://ro.bnuz.edu.cn/book/category_xiaoshuo/026a0c79-7ef0-4ee9-8957-eadc50b1300a.png",
          store: "大大大"
        },
        {
          bookId: "74142d97-f8be-45b5-811d-fccaa3eab798",
          userId: null,
          sellerId: "c3bc472cd6a14555a377d5e5449961ac",
          number: 3,
          isBuy: 0,
          bookName: "汤姆·索亚历险记",
          price: 0.01,
          picUrl:
            "http://ro.bnuz.edu.cn/book/category_xiaoshuo/74142d97-f8be-45b5-811d-fccaa3eab798.png",
          store: "大大大"
        },
        {
          bookId: "7f20b155-cf83-4d42-93e8-95310975afe7",
          userId: null,
          sellerId: "c3bc472cd6a14555a377d5e5449961ac",
          number: 1,
          isBuy: 0,
          bookName: "安徒生童话",
          price: 0.01,
          picUrl:
            "http://ro.bnuz.edu.cn/book/category_tonghua/7f20b155-cf83-4d42-93e8-95310975afe7.png",
          store: "大大大"
        },
        {
          bookId: "a583cf27-e166-4cb9-a557-8a4774fe2700",
          userId: null,
          sellerId: "c3bc472cd6a14555a377d5e5449961ac",
          number: 2,
          isBuy: 0,
          bookName: "西游记",
          price: 0.01,
          picUrl:
            "http://ro.bnuz.edu.cn/book/category_mingzhu/a583cf27-e166-4cb9-a557-8a4774fe2700.png",
          store: "大大大"
        },
        {
          bookId: "d41b1551-bade-4978-944f-fa0badab583c",
          userId: null,
          sellerId: "b9f458b3477e4072a335ee1ea834f93b",
          number: 2,
          isBuy: 0,
          bookName: "阅读海洋系统新手向导",
          price: 0.01,
          picUrl:
            "http://ro.bnuz.edu.cn/book/category_kexue/d41b1551-bade-4978-944f-fa0badab583c.png",
          store: "狗达专卖店"
        }
      ],
      key: ""
    }
  },
  components: {
    singleCommodity: Commodity
  },
  methods: {
    pay() {
      var book = []
      for (var i = 0; i < this.CartList.length; i++) {
        var b = {
          bookId: this.CartList[i].bookId,
          number: this.CartList[i].number,
          sellerId: this.CartList[i].sellerId,
          discount: 1
        }
        book.push(b)
      }

      var json = {
        books: JSON.stringify(book)
      }
      Axios({
        url: API.order,
        method: "POST",
        params: {
          str: Base64.encode(JSON.stringify(json))
        },
        headers: {
          Authorization: this.token
        }
      })
        .then(res => {
          var adr = {
            province: "广东省",
            city: "珠海市",
            area: "香洲区",
            detailed: "北京师范大学珠海分校京华苑五栋不要这样猪猪猪的",
            consignee: "郑树达",
            phone: "18675405693"
          }
          console.log(res)
          Axios({
            url: API.confirmOrder,
            method: "POST",
            params: {
              order: res.data.order,
              address: Base64.encode(JSON.stringify(adr))
            },
            headers: {
              "Authorization": this.token
            }
          }).then(res => {
            console.log(res)
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
                  // document.location.assign("/ReadingOcean/wechat")
                }
              }
            )
          }).catch(err => {
            this.errorHandler(err)
          })
        })
        .catch(err => {
          Indicator.close()
          this.errorHandler(err)
        })
    }
  },
  created() {
    Indicator.open({
      text: "加载中...",
      spinnerType: "snake"
    })
    /* 获取购物车列表 */
    Axios({
      url: API.shopCartInfo,
      method: "POST",
      headers: {
        Authorization: this.token
      }
    })
      .then(res => {
        Indicator.close()
        // console.log(res)
        this.CartList = res.data.data
        console.log(JSON.stringify(this.CartList))
      })
      .catch(err => {
        Indicator.close()
        this.errorHandler(err)
      })
  }
}
</script>

<style lang="css">
@import "../../../../static/css/personal/popup.css";

.shop_list {
  height: 100px;
  width: 100%;
  position: relative;
  top: 50px;
  background-color: antiquewhite;
}
</style>
