<template lang="html">
  <div class="ranking">
    <!-- 排行榜过滤选项按钮 -->
    <div class="ranking__filter">
      <button
        class="btn btn-filter"
        @touchend="rankSelectedType('point')"
        :class="{ 'btn-filter--active': rankingType === 'point' }">积分榜</button>
      <button
        class="btn btn-filter"
        @touchend="rankSelectedType('book')"
        :class="{ 'btn-filter--active': rankingType === 'book' }">书香榜</button>
      <button
        class="btn btn-filter"
        v-if="role === 'student' && this.schoolId !== '1101001'"
        @touchend="rankSelectedCategory('class')"
        :class="{ 'btn-filter--active': rankCategory === 'class' }">班排名</button>
      <button
        class="btn btn-filter"
        v-if="role === 'student' && this.schoolId !== '1101001'"
        @touchend="rankSelectedCategory('school')"
        :class="{ 'btn-filter--active': rankCategory === 'school' }">校排名</button>
      <button
        class="btn btn-filter"
        v-if="role === 'student' && this.schoolId !== '1101001'"
        @touchend="rankSelectedCategory('community')"
        :class="{ 'btn-filter--active': rankCategory === 'community' }">社区</button>  
      <!-- 当是北京东城区社区读书角的时候，校内排行变成社区排行 -->
      <button
        class="btn btn-filter"
        v-if="role === 'student' && this.schoolId ==='1101001'"
        @touchend="rankSelectedCategory('school')"
        :class="{ 'btn-filter--active': rankCategory === 'school' }">社区</button>
      <button
        class="btn btn-filter"
        @click="classPickerVisible = true"
        v-if="role === 'teacher'">我的班级</button>
    </div>
    <div class="task-time" v-if="role === 'teacher'">
      <button class="task-time__start" @click="openDatePicker('dateStart')">
        {{ selectedTimeStartText | formatDate}}
      </button>
      <button class="task-time__end" @click="openDatePicker('dateEnd')">
        {{ selectedTimeEndText | formatDate}}
      </button>
    </div>
    <!-- 排行榜列表 -->
    <div class="ranking__list"
         v-infinite-scroll="loadMoreRanks"
         infinite-scroll-disabled="rankLoading"
         infinite-scroll-immediate-check="false"
         infinite-scroll-distance="50">
      <div class="rank" v-for="(item, index) in rankList" @touchstart="gtouchstart(index,$event)" @touchend="gtouchend(index,$event)">
        <div class="rank__place">{{ index+1 }}</div>
        <div class="rank__name">
          {{ item.name }}
          <span class="rank__class" v-if="rankCategory === 'school'">{{ item.className }}</span>
          <span class="rank__class" v-if="rankCategory === 'community'">{{ item.schoolName }}</span>
        </div>
        <div class="rank__point" v-if="rankingType === 'point'"><span v-if="item.points != null">{{ item.points }}分</span></div>
        <div class="rank__point" v-else><span class="rank__bookNum" v-if="item.points != null">{{ item.points }}本</span><span class="rank__wordCount">{{item.wordCount}}万字</span></div>
      </div>
    </div>
    <!-- 选择班级 picker -->
    <mt-popup v-model="classPickerVisible" position="bottom" class="ranking__picker">
      <mt-picker :slots="myClasses" :showToolbar="true" @change="selectCurrentClass">
        <button class="btn btn-cancel" @click="classPickerVisible = false">取消</button>
        <button class="btn btn-confirm" @click="selectClass">确定</button>
      </mt-picker>
    </mt-popup>
    <!-- 选择日期弹出框 -->
    <mt-datetime-picker
      ref="picker"
      type="date"
      :startDate="datePickerStart"
      :endDate="datePickerEnd"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="datePickerConfirm">
    </mt-datetime-picker>
  </div>
</template>

<script>
import Axios from "axios"
import * as API from "../../api/api"
import user from "../../mixins/user.js"
import { Toast, Indicator } from "mint-ui"
import getRank from "../../mixins/getRank.js"
import errorHandler from "../../mixins/errorHandler.js"
export default {
  mixins: [ user, errorHandler, getRank ],
  data() {
    return {
      rankingType: "book",
      rankCategory: "class",
      classPickerVisible: false,
      currentSelectedClass: "",
      SelectedClass: "",
      currentPage: 1,
      maxPage: 100,
      limits: 100,
      rankList: [],
      rankLoading: false,
      myClasses: [
        {
          flex: 1,
          values: [],
          textAlign: "center"
        }
      ],
      /* 日期 picker 绑定的开始日期： 当前日期 */
      datePickerStart: new Date("2016-01-01"),
      /* 日期 picker 绑定的结束日期：一年后 */
      datePickerEnd: new Date(),
      /* 日期 picker 的选择类型，开始日期和结束日期共享一个 picker */
      datePickerType: "dateStart",
      /* 选择的开始时间 */
      selectedTimeStartText: "开始时间",
      /* 选择的结束时间 */
      selectedTimeEndText: "结束时间"
    }
  },
  filters: {
    formatDate(mm) {
      if (Number.isInteger(mm)) {
        let date = new Date(mm)
        return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日"
      } else {
        return mm
      }
    }
  },
  methods: {
    gtouchstart(index, event) {
      if (this.rankCategory !== "class") {
        var current = event.currentTarget
        current.getElementsByClassName("rank__class")[0].style.display = "inline"
      }
    },
    gtouchend(index, event) {
      if (this.rankCategory !== "class") {
        var current = event.currentTarget
        current.getElementsByClassName("rank__class")[0].style.display = "none"
      }
    },
    formatDate(mm) {
      /* 将时间戳转成yyyy-mm-dd字符串类型 */
      if (Number.isInteger(mm)) {
        let date = new Date(mm)
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      } else {
        return mm
      }
    },
    openDatePicker(type) {
      this.datePickerType = type
      this.$refs.picker.open()
    },
    datePickerConfirm(value) {
      /* 根据不同类型，确定为开始时间还是结束时间 */
      if (this.datePickerType === "dateStart") {
        this.taskStartDate = value.getTime()
        this.selectedTimeStartText = value.getTime()
      } else if (this.datePickerType === "dateEnd") {
        this.taskEndDate = value.getTime()
        this.selectedTimeEndText = value.getTime()
      }
      if (this.selectedTimeStartText !== "开始时间" && this.selectedTimeEndText !== "结束时间") {
        if (this.selectedTimeEndText >= this.selectedTimeStartText) {
          Axios({
            url: API.getRankByTime,
            method: "GET",
            params: {
              classId: this.role === "student" ? (this.rankCategory === "class" ? this.userInfo.classId : null) : this.SelectedClass,
              schoolId: this.userInfo.schoolId,
              type: this.rankingType,
              page: this.currentPage,
              size: 15,
              btime: this.formatDate(this.selectedTimeStartText),
              etime: this.formatDate(this.selectedTimeEndText)
            },
            headers: {
              "Authorization": this.token
            }
          }).then(res => {
            Indicator.close()
            this.rankList = res.data.data.dataList
          }).catch(err => {
            console.log(err)
          })
        } else {
          Toast({
            message: "开始时间不能比结束时间晚",
            position: "center",
            duration: 1500
          })
          this.selectedTimeStartText = "开始时间"
          this.selectedTimeEndText = "结束时间"
        }
      }
    },
    loadMoreRanks() {
      if (this.currentPage < this.maxPage) {
        Indicator.open({
          text: "加载更多...",
          spinnerType: "snake"
        })
        this.currentPage += 1
        this.rankLoading = true
        this.getRank({
          classId: this.role === "student" ? (this.rankCategory === "class" ? this.userInfo.classId : null) : this.SelectedClass,
          schoolId: this.userInfo.schoolId,
          type: this.rankingType,
          range: this.rankCategory,
          pageNum: this.currentPage,
          limits: 100,
          token: this.token,
          userId: this.userId
        }).then(res => {
          Indicator.close()
          this.rankList = this.rankList.concat(res.data.dataList)
          this.rankLoading = false
        }).catch(err => {
          Indicator.close()
          this.rankLoading = false
          this.errorHandler(err)
        })
      } else {
        Toast({
          message: "已无更多数据",
          position: "bottom",
          duration: 1500
        })
      }
    },
    /* 获取当前选择的班级名称 */
    selectCurrentClass(picker, values) {
      this.currentSelectedClass = values[0]
    },
    /* 获取当前选择的班级id */
    selectClass() {
      this.classPickerVisible = false
      this.userInfo.classes.forEach(obj => {
        if (this.currentSelectedClass === obj.name) {
          this.SelectedClass = obj.id
        }
      })
      /* 选择班级点击确定，请求排行列表 */
      this.getRank({
        classId: this.SelectedClass,
        schoolId: this.userInfo.schoolId,
        type: this.rankingType,
        range: this.rankCategory,
        pageNum: this.currentPage,
        limits: 100,
        token: this.token,
        userId: this.userId
      }).then(res => {
        Indicator.close()
        this.rankList = res.data.dataList
        this.currentPage = res.data.currentPage
        this.maxPage = res.data.totalPage
      }).catch(err => {
        Indicator.close()
        this.errorHandler(err)
      })
      this.selectedTimeStartText = "开始时间"
      this.selectedTimeEndText = "结束时间"
    },
    /* 选择排行分类class or school */
    rankSelectedCategory(category) {
      /* 如果点击班级排行 */
      this.rankCategory = category
      this.currentPage = 1
      this.getRank({
        classId: category === "class" ? this.userInfo.classId : null,
        schoolId: this.userInfo.schoolId,
        type: this.rankingType,
        range: this.rankCategory,
        pageNum: this.currentPage,
        limits: 100,
        token: this.token,
        userId: this.userId
      }).then(res => {
        console.log(res)
        this.rankList = res.data.dataList
        this.currentPage = res.data.currentPage
        this.maxPage = res.data.totalPage
      }).catch(err => {
        this.errorHandler(err)
      })
    },
    /* 选择排行类型book or point */
    rankSelectedType(type) {
      this.rankingType = type
      this.currentPage = 1
      if (this.role === "student") {
        /* 学生角色 */
        this.getRank({
          classId: this.rankCategory === "class" ? this.userInfo.classId : null,
          schoolId: this.userInfo.schoolId,
          type: this.rankingType,
          range: this.rankCategory,
          pageNum: this.currentPage,
          limits: 100,
          token: this.token,
          userId: this.userId
        }).then(res => {
          this.rankList = res.data.dataList
          this.currentPage = res.data.currentPage
          this.maxPage = res.data.totalPage
        }).catch(err => {
          this.errorHandler(err)
        })
      } else {
        /* 教师角色 */
        this.getRank({
          classId: this.SelectedClass,
          schoolId: this.userInfo.schoolId,
          type: this.rankingType,
          range: this.rankCategory,
          pageNum: this.currentPage,
          limits: 100,
          token: this.token,
          userId: this.userId
        }).then(res => {
          this.rankList = res.data.dataList
          this.currentPage = res.data.currentPage
          this.maxPage = res.data.totalPage
        }).catch(err => {
          this.errorHandler(err)
        })
        this.selectedTimeStartText = "开始时间"
        this.selectedTimeEndText = "结束时间"
      }
    }
  },
  computed: {
    /* 获取当前所有班级的名称数组 */
    myAllClasses() {
      return this.userInfo.classes.map(obj => {
        return obj.name
      })
    }
  },
  created() {
    if (this.role === "student") {
      /* 学生角色 */
      Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      })
      this.getRank({
        classId: this.userInfo.classId,
        schoolId: this.userInfo.schoolId,
        type: this.rankingType,
        range: this.rankCategory,
        pageNum: this.currentPage,
        limits: 100,
        token: this.token,
        userId: this.userId
      }).then(res => {
        Indicator.close()
        this.rankList = res.data.dataList
        this.currentPage = res.data.currentPage
        this.maxPage = res.data.totalPage
      }).catch(err => {
        Indicator.close()
        this.errorHandler(err)
      })
    } else {
      /* 教师角色 */
      /* 初始化所有班级 */
      this.myClasses[0].values = this.myAllClasses
      /* 初始化当前选中班级 */
      this.SelectedClass = this.userInfo.classes[0].id
      Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      })
      this.getRank({
        classId: this.SelectedClass,
        schoolId: this.userInfo.schoolId,
        type: this.rankingType,
        range: this.rankCategory,
        pageNum: this.currentPage,
        limits: 100,
        token: this.token
      }).then(res => {
        Indicator.close()
        this.rankList = res.data.dataList
        this.currentPage = res.data.currentPage
        this.maxPage = res.data.totalPage
      }).catch(err => {
        Indicator.close()
        this.errorHandler(err)
      })
    }
  }
}
</script>

<style lang="css">
  body {
    margin: 0;
    padding: 0;
    -webkit-text-size-adjust: none !important;
  }

  .btn {
    padding: 0;
    outline: 0;
    border: 0;
    text-align: center;
    box-shadow: none;
  }

  .ranking {
    padding: 10px 20px;
  }

  .ranking__filter {
    width: 100%;
    height: 40px;
    display: flex;
    flex-flow: row nowrap;
  }

  .btn-filter {
    flex: 1;
    height: 100%;
    margin: 0 5px 0 0;
    font-size: 14px;
    color: #000;
    font-weight: 300;
    line-height: 40px;
    background-color: #fff;
    border-radius: 3px;
  }

  .btn-filter:last-child {
    margin-right: 0;
  }

  .btn-filter--active {
    color: #fff;
    background-color: #3C89FD;
  }

  .ranking__title {
    position: fixed;
    width: 100%;
    top: 0;
    margin: 0;
    text-align: center;
    font-size: 18px;
    color: #fff;
    font-weight: 300;
    line-height: 50px;
    background-color: #3C89FD;
  }

  .rank {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    margin-top: 10px;
    border: 1px solid #f7f5f5;
    border-radius: 3px;
    box-shadow: 0 3px 3px #f7f5f5;
  }

  .rank__place,
  .rank__name,
  .rank__point {
    font-size: 18px;
    font-weight: 400;
    height: 60px;
    padding: 0 5px;
    line-height: 60px;
  }

  .rank__place {
    flex: 0 0 30px;
    text-align: center;
  }

  .rank__name {
    position: relative;
    flex: 1;
    text-align: left;
  }

  .rank__point {
    /* flex: 0 0 90px; */
    font-weight: 500;
    text-align: center;
    color: #3C89FD;
    float: right;
  }

  .rank__class {
    position: absolute;
    left: 5px;
    top: 25px;
    display: none;
    font-size: 12px;
    font-weight: 200;
  }

  .ranking__picker {
    width: 100%;
  }

  .rank__wordCount{
    float: right;
    width: 80px;
    text-align: right;
    padding: 0;
    font-size: 10px;
    color: rgb(136, 136, 136);
  }

  /* 覆盖 mint pciker-toolbar 样式 */
  .picker-toolbar {
    display: flex;
    justify-content: space-around;
    padding: 5px 0;
  }

  .btn-cancel,
  .btn-confirm {
    background: #fff;
    box-shadow: none;
    font-size: 1rem;
    color: #3C89FD;
  }

  .ranking__list {
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    padding: 10px 2px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .task-time__start,
  .task-time__end {
    border: 0;
    width: 49%;
    padding: 7px 0;
    font-size: 16px;
    background-color: #ffffff;
    box-shadow: 0 2px 5px #E5E9F2;
    outline: 0;
    position: relative;
    top: 10px;
  }
</style>
