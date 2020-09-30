import Vue from "vue"
import App from "./ranking.vue"
import { Picker, Popup, InfiniteScroll, DatetimePicker } from "mint-ui"

Vue.use(InfiniteScroll)
Vue.component(Picker.name, Picker)
Vue.component(Popup.name, Popup)
Vue.component(DatetimePicker.name, DatetimePicker)
/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App)
})
