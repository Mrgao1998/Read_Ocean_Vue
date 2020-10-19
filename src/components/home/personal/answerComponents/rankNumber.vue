<template>
  <van-col span="4" class="ranking" v-if="num === 1"><img src="./first.png" ></van-col>
  <van-col span="4" class="ranking" v-else-if="num === 2"><img src="./second.png"></van-col>
  <van-col span="4" class="ranking" v-else-if="num === 3"><img src="./third.png"></van-col>
  <van-col span="4" class="ranking" v-else>{{ num }}</van-col>
</template>

<script>
import Vue from "vue"
import {Col} from "vant"
Vue.use(Col)
export default {
  name: "rankNumber",
  props: {
    num: Number
  },
  data() {
    return {}
  }
}
</script>
<style scoped lang="stylus">
  .ranking
    color #ffcd32
    font-size 18px
    font-weight bold
    img
      width 30px
      height 30px
      margin 10px
</style>
