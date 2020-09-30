import Vue from "vue"
import App from "./Login.vue"
import {
  Button,
  Picker,
  Switch,
  Popup,
  Field
} from "mint-ui"
Vue.component(Field.name, Field)
Vue.component(Button.name, Button)
Vue.component(Picker.name, Picker)
Vue.component(Switch.name, Switch)
Vue.component(Popup.name, Popup)

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App)
})
