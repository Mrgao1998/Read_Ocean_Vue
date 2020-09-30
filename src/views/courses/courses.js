import Vue from "vue"
import App from "./Courses.vue"
import { InfiniteScroll } from "mint-ui"

Vue.use(InfiniteScroll)
/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App)
})
