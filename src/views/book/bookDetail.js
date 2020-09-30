import Vue from "vue"
import App from "./booksDetail.vue"
import {
  Button,
  Swipe,
  SwipeItem
} from "mint-ui"

Vue.component(Button.name, Button)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App)
})
