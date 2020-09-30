import Vue from "vue"
import App from "./communityDetail.vue"
import {
  Navbar,
  TabContainer,
  TabContainerItem,
  TabItem,
  Button,
  Badge,
  InfiniteScroll,
  Actionsheet
} from "mint-ui"
import VideoPlayer from "vue-video-player"
require("video.js/dist/video-js.css")
require("vue-video-player/src/custom-theme.css")
Vue.use(VideoPlayer)
Vue.use(InfiniteScroll)
Vue.component(Button.name, Button)
Vue.component(Navbar.name, Navbar)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(TabItem.name, TabItem)
Vue.component(Badge.name, Badge)
Vue.component(Actionsheet.name, Actionsheet)
/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App)
})
