<template lang="html">
  <!-- 个人信息弹出框 -->
  <div class="popup" >
    <mt-header title="阅读报告" fixed class="popup__header">
      <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
       <mt-button icon="more" slot="right"  @click="sheetVisible=true"></mt-button>
    </mt-header>
    <div class="popup__content" style= "backgroundColor: #45515a">
      <mt-actionsheet
          :actions="actions"
          v-model="sheetVisible">
      </mt-actionsheet>
       <!-- 书籍情况-->
      <div class="part1">
        <div class = "partTitle"><p class="titleStyle">-书籍情况-</p></div>
        <div class = "partText"><p class="descripeStyle">&nbsp;&nbsp;&nbsp;&nbsp;本学期我一共读了<span class="highLight">{{textArr.total}}</span>本书，阅读量<span class="highLight">{{textArr.maxappear}}</span>万字，平均每<span class="highLight">{{textArr.ave}}</span>天读完一本。我的阅读量已经超过<span class="highLight">{{textArr.percent}}</span>的班级学生。<br>
&nbsp;&nbsp;&nbsp;&nbsp;其中，我最喜欢的书籍是<span class="highLight">{{textArr.category}}</span>类的图书。</p></div>
        <div class = "charts"><center><Histogram :picType="type1" :picTitle="title1" :picTerm="term"></Histogram>
         <Sector :picTerm="term"></Sector>
         </center>
        </div>
      </div>
 <!-- 积分任务情况-->
      <div class="part1">
        <div class = "partTitle"><p class="titleStyle">-积分任务情况-</p></div>
        <div class = "partText"><p class="descripeStyle">&nbsp;&nbsp;&nbsp;&nbsp;本学期我一共完成了<span class="highLight">{{textArr2.taskFinish}}</span>个任务，获得了<span class="highLight">{{textArr2.excellence}}</span>个优，任务完成率达<span class="highLight">{{textArr2.percent}}</span>%,已经超过<span class="highLight">{{textArr2.rate}}</span>%班级同学。
<br>&nbsp;&nbsp;&nbsp;&nbsp;本学期一共获得<span class="highLight">{{score.integral}}</span>积分，超过了<span class="highLight">{{score.classPercent}}</span>%的班级同学。</p></div>
        <div class = "charts">
          <center>
            <Histogram :picType="type2" :picTitle="title2" :picTerm="term"></Histogram>
            <Histogram :picType="type3" :picTitle="title3" :picTerm="term"></Histogram>
          </center>
        </div>
      </div>
 <!-- 阅读足迹-->
      <div class="part1">
        <div class = "partTitle"><p class="titleStyle">-阅读足迹-</p></div>
        <div class = "partText"><p class="descripeStyle">&nbsp;&nbsp;&nbsp;&nbsp;我在故事新编发表了<span class="highLight">{{readStep.questionCount}}</span>个评论，在作品社区发表了<span class="highLight">{{readStep.postCount}}</span>个自己的阅读成果,共获得了<span class="highLight">{{readStep.tumbUpCount}}</span>个点赞。
<br>&nbsp;&nbsp;&nbsp;&nbsp;我共对<span class="highLight">{{readStep2.readingBooksCount}}</span>本书进行了<span class="highLight">{{readStep2.answerCount}}</span>次答题，其中答题最多的书为<span class="highLight">《{{readStep2.answerMostBook}}》</span>,正确率最高的书为 <span class="highLight">《{{readStep2.highestAccuracyBook}}》</span>。</p></div>
        <div class = "charts">
          <center>
            <Histogram :picType="type4" :picTitle="title4" :picTerm="term"></Histogram>
            <Radar :picTerm="term"></Radar>
          </center>
        </div>
      </div>
<!-- 阅读能力 -->
      <div class="part1">
        <div class = "partTitle"><p class="titleStyle">-阅读能力-</p></div>
        <div class = "partText">        
          <p class="descripeStyle2" v-for="(item,i) in readAbility">{{item}}</p>
          </div>    
      </div>
	<!-- 阅读偏好 -->
      <div class="part1" v-if="readFavorite">
        <div class = "partTitle"><p class="titleStyle">-阅读偏好-</p></div>
          <div class = "partText">        
            <p class="descripeStyle2" v-for="(item,i) in readFavorite.bookNum">{{item}}</p>
            <p class="descripeStyle2" v-for="(item,i) in readFavorite.bookType">{{item}}</p>
            <p class="descripeStyle2" v-for="(item,i) in readFavorite.comment">{{item}}</p>
            <p class="descripeStyle2" v-for="(item,i) in readFavorite.newStory">{{item}}</p>
          </div>    
      </div>
<!-- 家长对我说 -->
       <div class="part1" v-if="parentEvaluation !== undefined && parentEvaluation.length >0">
        <div class = "partTitle"><p class="titleStyle">-家长评价-</p></div>
          <div class = "partText">        
          <p class="descripeStyle2" v-for="(item,i) in parentEvaluation">{{item.assess}}</p>
          </div>    
      </div>
<!-- 老师对我说 -->
      <div class="part1" v-if="teacherEvaluation !== undefined && teacherEvaluation.length >0">
        <div class = "partTitle"><p class="titleStyle">-教师评价-</p></div>
          <div class = "partText">          
          <p class="descripeStyle2" v-for="(item,i) in teacherEvaluation">
            <span v-if= "i === 0">本学期完成任务的综合评价为: </span>   {{item}}
            </p>
          </div>    
      </div>
<!-- 我的收获 -->
      <div class="part1">
        <div class = "partTitle"><p class="titleStyle">-我的收获-</p></div>
          <div class = "partText">          
            <table border="0" frame="void" v-for="(item,i) in Harvest">
                <tr id='aniamlType'>
                  <th v-if= "item.animalType ===  'ocean_animal_type_buru'"> 哺乳动物</th>
                  <th v-if= "item.animalType ===  'ocean_animal_type_haiyangyulei'"> 海洋鱼类</th>
                  <th v-if= "item.animalType ===  'ocean_animal_type_jiezhi'"> 节肢动物</th>
                  <th v-if= "item.animalType ===  'ocean_animal_type_jipi'"> 棘皮动物</th>
                  <th v-if= "item.animalType ===  'ocean_animal_type_paxing'"> 爬行动物</th>
                  <th v-if= "item.animalType ===  'ocean_animal_type_qiangchang'"> 腔肠动物</th>
                  <th v-if= "item.animalType ===  'ocean_animal_type_ruanti'"> 软体动物</th>
                </tr>
              <tr id='aniamlPic'><th><div class="limiWidth">
                <img id="animal_image" :src="item.url"/></div></th></tr>
              <tr id='aniamlNumber'><th>拥有：<span class="highLight">{{item.own}}</span></th></tr>
              <tr id='aniamlAve'><th>平均：<span class="highLight">{{item.ave}}</span></th></tr>
            </table>
         
          </div>    
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios"
import * as API from "../../../api/api.js"
import user from "../../../mixins/user.js"
import Radar from "../../../components/common/chart/Radar.vue"
import Sector from "../../../components/common/chart/Sector.vue"
import Histogram from "../../../components/common/chart/Histogram.vue"
import getTerm from "../../../mixins/getTerm.js"
export default {
  name: "popup",
  data() {
    return {
      sheetVisible: false,
      type1: "1",
      title1: "书籍数量",
      type2: "2",
      title2: "任务完成率(%)",
      type3: "3",
      title3: "积分榜",
      type4: "4",
      title4: "答题正确率",
      orderTerm: "",
      term: 1,
      actions: [],
      textArr: {},
      textArr2: {},
      score: {},
      readStep: {},
      readStep2: {},
      readAbility: [],
      readFavorite: {},
      parentEvaluation: [],
      teacherEvaluation: {},
      Harvest: {}
    }
  },
  mixins: [user, getTerm],
  watch: {
    "term": function (newVal) {
      this.getAllMessage()
    }
  },
  components: {
    Histogram,
    Radar,
    Sector
  },
  created() {
    this.getAllMessage()
    Axios({
      url: API.getTerm, // 获得学期
      methods: "GET",
      headers: {
        "Authorization": this.token
      }
    }).then(res => {
      var obj = []
      for (var i = 0; i < res.data.data.length; i++) {
        obj[i] = {
          "name": res.data.data[i].termName,
          "term": res.data.data[i].termId,
          "method": this.getTerm
        }
      }
      this.actions = obj
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    getTerm: function (term) {
      this.term = term.term
    },
    getAllMessage: function () {
      Axios({// 获取书籍详情
        url: API.getReadInfo.concat("/" + this.userType + "/" + this.schoolId + "/" + this.userInfo.classId + "/" + this.userId + "/" + this.term + "/1"),
        // 获得书籍信息
        methods: "GET",
        headers: {
          "Authorization": this.token
        }
      }).then(res => {
        this.textArr = res.data.result.data[0]
      }).catch(err => {
        console.log(err)
      })

      Axios({// 任务情况
        url: API.getTaskInfo.concat("/" + this.userType + "/" + this.schoolId + "/" + this.userInfo.classId + "/" + this.userId + "/" + this.term),
        // 任务情况
        methods: "GET",
        headers: {
          "Authorization": this.token
        }
      }).then(res => {
        this.textArr2 = res.data.result.data[0]
      }).catch(err => {
        console.log(err)
      })

      Axios({// 积分情况
        url: API.getIntegralInfo.concat("/" + this.userType + "/" + this.schoolId + "/" + this.userInfo.grade + "/" + this.userInfo.classId + "/" + this.userId + "/" + this.term),
        // 积分任务情况
        methods: "GET",
        headers: {
          "Authorization": this.token
        }
      }).then(res => {
        this.score = res.data.result.data[0]
      }).catch(err => {
        console.log(err)
      })

      Axios({// 阅读足迹
        url: API.getForumPostStatistics.concat("/" + this.userType + "/" + this.userId + "/" + this.term),
        // 阅读足迹
        methods: "GET",
        headers: {
          "Authorization": this.token
        }
      }).then(res => {
        this.readStep = res.data.result.data[0]
        // console.log(this.readStep)
      }).catch(err => {
        console.log(err)
        // this.errorHandler(err)
      })

      Axios({// 阅读足迹2
        url: API.getReadingBookAndAnswerStatistics.concat("/" + this.userType + "/" + this.userId + "/" + this.term),
        // 阅读足迹2
        methods: "GET",
        headers: {
          "Authorization": this.token
        }
      }).then(res => {
        this.readStep2 = res.data.result.data[0]
      }).catch(err => {
        console.log(err)
      })

      Axios({// 阅读能力
        url: API.getReadingAbility.concat("/" + this.userType + "/" + this.userId + "/" + this.term),
        // 阅读能力
        methods: "GET",
        headers: {
          "Authorization": this.token
        }
      }).then(res => {
        this.readAbility = res.data.result.data
      }).catch(err => {
        console.log(err)
      })

      Axios({// 阅读偏好
        url: API.getReadingPreference.concat("/" + this.userType + "/" + this.userId + "/" + this.term),
        methods: "GET",
        headers: {
          "Authorization": this.token
        }
      }).then(res => {
        this.readFavorite = res.data.result.data[0]
      }).catch(err => {
        console.log(err)
      })

      Axios({// 家长评价
        url: API.getParentAssess.concat("/" + this.userType + "/" + this.userId + "/" + this.term),
        methods: "GET",
        headers: {
          "Authorization": this.token
        }
      }).then(res => {
        this.parentEvaluation = res.data.result.data
      }).catch(err => {
        console.log(err)
      })

      Axios({// 教师评价
        url: API.getTeacherAssess.concat("/" + this.userType + "/" + this.userId + "/" + this.term),
        methods: "GET",
        headers: {
          "Authorization": this.token
        }
      }).then(res => {
        this.teacherEvaluation = res.data.result.data
      }).catch(err => {
        console.log(err)
      })

      Axios({// 我的收获
        url: API.getMyharvest.concat("/" + this.userType + "/" + this.schoolId + "/" + this.userInfo.classId + "/" + this.userId),
        methods: "GET",
        headers: {
          "Authorization": this.token
        }
      }).then(res => {
        this.Harvest = res.data.result.data
        console.log(this.Harvest)
      }).catch(err => {
        console.log(err)
      })
    }

  }
}
</script>
<style lang="css" scoped>
@import "../../../../static/css/personal/popup.css";
.part1 {
  width: 100%;
  background-color: #45515a;
}
.partTitle {
  width: 100%;
  height: 8%;
  /* border: 1px solid rgb(25, 32, 16); */
}
.titleStyle {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #51b6f7;
  font-style: italic;
  letter-spacing: 0.4em;
}
.descripeStyle {
  text-align: left;
  font-size: 16px;
  line-height: 18pt;
  color: #ccc;
}
.descripeStyle2 {
  text-align: center;
  font-size: 15px;
  line-height: 15pt;
  color: #ccc;
}
.partText {
  width: 100%;
  height: 20%;
  margin-top: -5%;
  /* border: 1px solid red; */
}
.charts {
  width: 100%;
  height: 72%;
  /* border: 1px solid rgb(0, 110, 255); */
}
.highLight {
  color: #fadb2e;
  font-weight: 600;
}
table {
  width: 100%;
  float: left;
  margin-top: 30px;
  color: #ccc;
  table-layout: fixed;
  word-break: keep-all;
  white-space: nowrap;
}
.limiWidth {
  width: 100%;
}
img {
  width: 70%;
}
table td {
  overflow: hidden;
}
</style>