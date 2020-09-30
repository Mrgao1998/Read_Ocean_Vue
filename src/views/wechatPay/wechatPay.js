import Vue from "vue"
import App from "./wechatPay.vue"
import { Actionsheet } from "mint-ui"

Vue.component(Actionsheet.name, Actionsheet)
/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App)
})
