<template>
  <div class="container">
    <img ref="pptImg" v-for="item in pptImg" v-lazy='item'/>
    <button @click="returnMain">返回主页</button>
  </div>
</template>
<script>
import {recommendNum} from "../../utils/recommendNum"
import user from "../../mixins/user.js"
export default {
  mixins: [user],
  data() {
    return {
      number: recommendNum,
      pptImg: []
    }
  },
  methods: {
    returnMain() {
      window.location.assign("/ReadingOcean/wechat/home")
    }
  },
  created() {
    const num = this.number[this.schoolId].num
    for (let i = 1; i <= num; i++) {
      this.pptImg.push("http://ro.bnuz.edu.cn/resources/" + this.schoolId + "/" + i + ".jpg")
    }
  }
}
</script>
<style lang="css" scoped>
  .container{
    text-align: center;
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgb(255,255,255);
    z-index: 10;
    overflow: auto;
    padding: 0;
    margin: 0;
  }
  img{

    width: 100%;
  }
  .container button{
    margin: 20px 0;
    padding: 5px;
    width: 70px;
    height: 30px;
    border: none;
    border-radius: 100px;
    background-color: rgb(114, 220, 78);
    color:rgb(255,255,255);
    outline: none;
  }
</style>