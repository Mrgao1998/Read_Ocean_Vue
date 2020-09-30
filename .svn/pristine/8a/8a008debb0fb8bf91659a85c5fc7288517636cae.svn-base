<template>
  <div class="container">
    <div class="title">
      <div class = "showScroll">
        <div class="titleShow"  @click='changeType("BrainTraining",$event)'>聪明脑训练</div>
        <div  @click='changeType("CeramicPainting",$event)'>陶瓷绘画</div>
        <div  @click='changeType("CeramicHandicraft",$event)'>陶瓷手工</div>
        <div  @click='changeType("Pledge",$event)'>入党誓词解读</div>
      </div>
      <div class="titleReturn" @click="returnMain">返回主页</div>
    </div>
    <div class="show">
      <img ref="pptImg" v-for="item in pptImg" v-lazy='item'/>
    </div>
  </div>
</template>
<script>
import user from "../../mixins/user.js"
export default {
  mixins: [user],
  data() {
    return {
      pointShow: "BrainTraining",
      pptImg: []
    }
  },
  methods: {
    returnMain() {
      window.location.assign("/ReadingOcean/wechat/home")
    },
    changeType(type, e) {
      let node = document.getElementsByClassName("showScroll")[0].children
      for (let i = 0; i < node.length; i++) {
        node[i].className = "titleWait"
      }
      e.currentTarget.className = "titleShow"
      this.pointShow = type
      console.log(this.pointShow)
      this.pptImg = []
      if (this.pointShow === "BrainTraining") {
        let number = 5
        for (let i = 0; i <= number; i++) {
          this.pptImg.push("http://ro.bnuz.edu.cn/resources/" + this.pointShow + "/" + i + ".jpg")
        }
      } else if (this.pointShow === "CeramicPainting") {
        let number = 1
        for (let i = 0; i < number; i++) {
          this.pptImg.push("http://ro.bnuz.edu.cn/resources/" + this.pointShow + "/" + i + ".jpg")
        }
      } else if (this.pointShow === "CeramicHandicraft") {
        let number = 3
        for (let i = 0; i <= number; i++) {
          this.pptImg.push("http://ro.bnuz.edu.cn/resources/" + this.pointShow + "/" + i + ".jpg")
        }
      } else if (this.pointShow === "Pledge") {
        let number = 1
        for (let i = 0; i < number; i++) {
          this.pptImg.push("http://ro.bnuz.edu.cn/resources/" + this.pointShow + "/" + i + ".jpg")
        }
      }
      console.log(this.pptImg)
    }
  },
  created() {
    this.pptImg.splice(0, this.pptImg.length)
    if (this.pointShow === "BrainTraining") {
      let number = 5
      for (let i = 0; i <= number; i++) {
        this.pptImg.push("http://ro.bnuz.edu.cn/resources/" + this.pointShow + "/" + i + ".jpg")
      }
    } else if (this.pointShow === "CeramicPainting") {
      let number = 0
      for (let i = 0; i <= number; i++) {
        this.pptImg.push("http://ro.bnuz.edu.cn/resources/" + this.pointShow + "/" + i + ".jpg")
      }
    } else if (this.pointShow === "CeramicHandicraft") {
      let number = 3
      for (let i = 0; i <= number; i++) {
        this.pptImg.push("http://ro.bnuz.edu.cn/resources/" + this.pointShow + "/" + i + ".jpg")
      }
    } else if (this.pointShow === "Pledge") {
      let number = 0
      for (let i = 0; i <= number; i++) {
        this.pptImg.push("http://ro.bnuz.edu.cn/resources/" + this.pointShow + "/" + i + ".jpg")
      }
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

  .title{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 1px 5px #E5E9F2;
    z-index: 1;
  }

  .titleReturn{
  
    width: 25%;
    height: 50px;
    line-height: 50px;
    font-size: 1rem;
    text-align: center;
    z-index: 2;
    background-color: #fff;
  }
  .showScroll{
    width: 75%;
    height: 50px;
    line-height: 50px;
    font-size: 1rem;
    text-align: center;
    float: left;
    overflow-y: hidden;
    overflow-x: auto;
    white-space: nowrap;;
    background-color: #fff;
  }
  
  .showScroll>div{
    width:80px;
    position: relative;
    display: inline-block;
  }
  .titleShow{
    color: rgb(156, 205, 196);
  }

  .show{
    position: absolute;
    top: 50px;
  }

  .titleReturn{

    color:red;
  }
</style>