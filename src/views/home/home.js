import Vue from "vue"
import App from "./Home.vue"
import VueRouter from "vue-router"
import routerConfig from "../../routes/home/routerConfig"

import {
  Tabbar,
  TabItem,
  Button,
  Picker,
  Header,
  Badge,
  Cell,
  Popup,
  Spinner,
  InfiniteScroll,
  Actionsheet,
  Radio,
  Field,
  Navbar,
  TabContainer,
  TabContainerItem
} from "mint-ui"
import VueWechatTitle from "vue-wechat-title"
import LazyLoad from "vue-lazyload"
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Navbar.name, Navbar)
Vue.component(Radio.name, Radio)
Vue.component(Field.name, Field)
Vue.component(Tabbar.name, Tabbar)
Vue.component(TabItem.name, TabItem)
Vue.component(Picker.name, Picker)
Vue.component(Button.name, Button)
Vue.component(Header.name, Header)
Vue.component(Badge.name, Badge)
Vue.component(Cell.name, Cell)
Vue.component(Popup.name, Popup)
Vue.component(Spinner.name, Spinner)
Vue.component(Actionsheet.name, Actionsheet)
Vue.use(VueWechatTitle)
Vue.use(LazyLoad)
Vue.use(InfiniteScroll)
Vue.use(VueRouter)

// import {
//   Button
// } from 'vant'
// Vue.use(Button)
const router = new VueRouter(
  routerConfig
)

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  render: h => h(App)
})
