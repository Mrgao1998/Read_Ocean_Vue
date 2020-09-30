<template>
  <div class="app">
    <div class="task-info">
      <!-- 任务标题输入框 -->
      <input maxlength="30" v-model="taskInputTitle" placeholder="添加标题(必填)" class="title-input">
      <!-- 任务详情输入框 -->
      <textarea v-model="taskInputContent" placeholder="描述你的任务(必填)..." rows="5" class="content-input"></textarea>
    </div>
    <!-- 任务对象选择 -->
    <div class="task-object" @click="selectTaskObject" :class="{'non-border-bottom': selectedObjectVisible}">
      <div class="task-object__select" v-if="allSelectedTaskObejct.length <= 0">点击选择任务对象(必选)</div>
      <div class="task-object__select" v-else>已选择 {{ allSelectedTaskObejct.length }} 人</div>
      <button class="task-object__delete" v-show="allSelectedTaskObejct.length > 0" @click.stop="deleteTaskObject">移除</button>
      <button
              class="task-object__collapse"
              v-show="allSelectedTaskObejct.length > 0"
              @click.stop="selectedObjectVisible ? selectedObjectVisible = false : selectedObjectVisible = true">
        <i class="collapse-icon"></i></button>
    </div>
    <!-- 构造已经选择的任务对象列表 -->
    <transition name="fade">
      <div class="selected-object" v-show="selectedObjectVisible">
        <label class="selected-object__options" v-for="object in allSelectedTaskObejct">
          <input class="checkbox-invisible" type="checkbox" :value="object.id" v-model="taskObjectWaitDeletion" >
          {{object.name}}
          <span :class="{'radio-check': isSelected(taskObjectWaitDeletion, object.id), 'radio-uncheck':!isSelected(taskObjectWaitDeletion, object.id)}"></span>
        </label>
      </div>
    </transition>
    <!-- 任务类型选择框 -->
    <div class="task-type">
      <label class="task-type__options" v-for="option in taskTypeOptions">
        <input class="checkbox-invisible" type="checkbox" :value="option.value" v-model="selectedTaskType">
        {{option.label}}
        <span :class="{'radio-check': isSelected(selectedTaskType, option.value), 'radio-uncheck':!isSelected(selectedTaskType, option.value)}"></span>
      </label>
    </div>
    <!-- 已经选择的书籍 -->
    <div class="task-book-seleted" v-show="selectedBooks.length > 0">
      <div class="selected-book" v-for="book in selectedBooks" :key="book.id" v-if="book.isNecessary === 0">
        <span class="tag-name">{{ book.title }}</span>
        <button class="delete-selected-book" @click="removeSelectedBook(book)">
          <i class="delete-icon"></i>
        </button>
      </div>
      <div  class="selected-bookN" v-for="book in selectedBooks" :key="book.id" v-if="book.isNecessary === 1" >
        <span class="tag-name">{{ book.title }}</span>
        <button class="delete-selected-book" @click="removeSelectedBook(book)">
          <i class="delete-icon"></i>
        </button>
      </div>
    </div>
    <!-- 搜索并添加任务书籍 -->
    <div class="task-book">
      <div class="task-book-search">
        <input type="text" class="search-input" v-model="searchText" @blur="fixRemove" placeholder="请搜索要添加的书籍(必选)">
        <button class="search-btn" v-show="searchText.length > 0" @click="searchTaskBooks">搜索</button>
        <button class="cancel-search-btn" v-show="searchResultList.length > 0" @click="cancelSearchTaskBooks"  >取消</button>
      </div>
      <!-- 搜索结果 -->
      <transition name="fade">
        <div class="search-result" v-if="searchResultList.length > 0">
          <div class="tips">
            <div class="tips-left">必读</div>
            <div class="tips-right">选读</div>
          </div>
          <div
                  class="search-result__item"
                  v-for="item in searchResultList"
          >
            <div class="left" @click="addTaskBooksL(item)"></div>
            <div class="right" @click="addTaskBooksR(item)"></div>
            {{ item.title }}</div>
        </div>
      </transition>
    </div>
    <!-- 选择开始时间和结束时间 -->
    <div class="task-time">
      <button class="task-time__start" @click="openDatePicker('dateStart')">
        {{ selectedTimeStartText | formatDate}}
      </button>
      <button class="task-time__end" @click="openDatePicker('dateEnd')">
        {{ selectedTimeEndText | formatDate}}
      </button>
    </div>
    <!-- 发布任务按钮 -->
    <button class="task-submit-btn" @click="postTask($event)" :disabled="state.onPost">发布任务</button>
    <!-- 选择任务对象弹出框：包含 picker -->
    <mt-popup
            v-model="taskObjectPicker"
            position="bottom"
            :modal="true"
            :closeOnClickModal="true"
            style="width: 100%;">
      <mt-picker :slots="slots" @change="objectSelectChange" :showToolbar="true" valueKey="name">
        <div style="display:flex;justify-content: space-around;height: 40px">
          <button class="cancel-btn" @click="taskObjectPicker = false">取消</button>
          <button class="add-all-btn" @click="addAllTaskObject">全选</button>
          <button class="add-btn" @click="addTaskObject">添加</button>
        </div>
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
  import * as API from "../../api/api.js"
  import searchBook from "../../mixins/searchBook.js"
  import user from "../../mixins/user.js"
  import errorHandler from "../../mixins/errorHandler.js"
  import taskType from "../../utils/taskType.js"
  import { Toast } from "mint-ui"
  export default {
    mixins: [ user, errorHandler, searchBook ],
    data() {
      return {
        /* 当前选择的班级id */
        selectedClassId: "",
        /* 输入的任务标题 */
        taskInputTitle: "",
        /* 输入的任务内容 */
        taskInputContent: "",
        /* 选择的任务类型 */
        selectedTaskType: [],
        /* 控制选择任务对象 picker 的显示与隐藏 */
        taskObjectPicker: false,
        /* 控制任务对象列表的显示语隐藏 */
        selectedObjectVisible: false,
        /* 当前 picker 选择的任务对象 */
        currentSelectedObject: {},
        /* 当前 picker 选择的对应班级的全部任务对象 */
        currentSelectedAllObject: [],
        /* 所有添加的任务对象 */
        allSelectedTaskObejct: [],
        /* 勾选的准备删除的任务对象 */
        taskObjectWaitDeletion: [],
        /* 日期 picker 绑定的开始日期： 当前日期 */
        datePickerStart: new Date(),
        /* 日期 picker 绑定的结束日期：一年后 */
        datePickerEnd: new Date((Date.now() + 365 * 24 * 3600 * 1000)),
        /* 日期 picker 的选择类型，开始日期和结束日期共享一个 picker */
        datePickerType: "dateStart",
        /* 选择的开始时间：毫秒 */
        taskStartDate: "",
        /* 选择的结束时间：毫秒 */
        taskEndDate: "",
        /* 输入的搜索书籍的关键词 */
        searchText: "",
        /* 搜索书籍结果 */
        searchResultList: [],
        /* 选择的书籍 */
        selectedBooks: [],
        /* 选择的开始时间 */
        selectedTimeStartText: "开始时间",
        /* 选择的结束时间 */
        selectedTimeEndText: "结束时间",
        /* 任务类型数据 */
        taskTypeOptions: taskType,
        /* 所有学生：对应所有班级的索引 */
        allStudents: [],
        /* 所有班级 */
        classes: [],
        /* 选择任务对象 picker 的数据源 */
        slots: [
          {
            flex: 1,
            values: [],
            textAlign: "right",
            defaultIndex: 0,
            showToolbar: true
          },
          {
            divider: true,
            content: "-",
            className: "slot2",
            showToolbar: true
          },
          {
            flex: 1,
            values: [],
            textAlign: "left",
            showToolbar: true
          }
        ],
        state: {
          onPost: false
        }
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
      // 解决错位问题
      fixRemove() {
        document.activeElement.scrollIntoViewIfNeeded()
      },
      /* 根据传入类型打开 日期 picker */
      openDatePicker(type) {
        this.datePickerType = type
        this.$refs.picker.open()
      },
      /* 当任务类型 picker 变动时的触发函数 */
      objectSelectChange(picker, values) {
        /* picker 初始化会触发 change 事件 */
        if (picker.slots[0].values.length === 0) {
          this.slots[0].values = this.myAllClasses
        }
        /* 获取当前选择的班级的对应id */
        this.userInfo.classes.forEach(obj => {
          if (values[0] === obj.name) {
            this.selectedClassId = obj.id
          }
        })
        /* 请求对应班级的学生 */
        if (this.selectedClassId) {
          Axios({
            url: API.getStudents,
            methods: "GET",
            params: {
              classId: this.selectedClassId
            },
            headers: {
              "Authorization": this.token
            }
          }).then(res => {
            this.allStudents = res.data
            picker.setSlotValues(1, this.allStudentsName)
          }).catch(err => {
            this.errorHandler(err)
          })
          /* 获得当前班级的全部任务对象 */
          this.currentSelectedAllObject = this.allStudents
          /* 获取当前任务对象名称 */
          this.currentSelectedObject = values[1]
        }
      },
      selectTaskObject() {
        this.taskObjectPicker = true
      },
      /* 点击增加按钮，增加任务对象 */
      addTaskObject() {
        this.currentSelectedAllObject.forEach(object => {
          /* 过滤重复的任务对象 */
          if (this.allSelectedTaskObjectId.indexOf(object.id) === -1) {
            if (object.name === this.currentSelectedObject) {
              this.allSelectedTaskObejct.push(object)
            }
          }
        })
      },
      /* 点击全选，添加当前班级全部的任务对象 */
      addAllTaskObject() {
        this.currentSelectedAllObject.forEach(object => {
          if (this.allSelectedTaskObjectId.indexOf(object.id) === -1) {
            this.allSelectedTaskObejct.push(object)
          }
        })
        this.taskObjectPicker = false
      },
      /* 点击移除，删除任务对象 */
      deleteTaskObject() {
        /* 根据待删除数组，过滤已选择的任务对象的数组 */
        for (let i = 0; i < this.taskObjectWaitDeletion.length; i++) {
          this.allSelectedTaskObejct = this.allSelectedTaskObejct.filter(object => {
            return object.id !== this.taskObjectWaitDeletion[i]
          })
        }
        if (this.allSelectedTaskObejct.length === 0) {
          this.selectedObjectVisible = false
        }
        /* 清空待删除数组 */
        this.taskObjectWaitDeletion = []
      },
      /* 点击时间 picker 的确认按钮 */
      datePickerConfirm(value) {
        /* 根据不同类型，确定为开始时间还是结束时间 */
        if (this.datePickerType === "dateStart") {
          this.taskStartDate = value.getTime()
          this.selectedTimeStartText = value.getTime()
        } else if (this.datePickerType === "dateEnd") {
          this.taskEndDate = value.getTime()
          this.selectedTimeEndText = value.getTime()
        }
      },
      /* 点击搜索时触发 */
      searchTaskBooks() {
        this.searchBook({
          keyWord: this.searchText,
          pageNum: 1,
          limits: 10,
          token: this.token
        }).then(res => {
          if (res.data.dataList.length === 0) {
            Toast({
              message: "没找到对应的书籍",
              position: "middle",
              duration: 1500
            })
          }
          this.searchText = ""
          this.searchResultList = res.data.dataList
        }).catch(err => {
          this.errorHandler(err)
        })
      },
      /* 点击取消搜索时触发 */
      cancelSearchTaskBooks() {
        /* 清空搜索结果 */
        this.searchResultList = []
      },
      /* 点击搜索结果添加选择书籍 */
      addTaskBooksL(book) {
        /* 过滤重复选择的书籍 */
        book.isNecessary = 1
        this.selectedBooks.push(book)
        this.selectedBooks = [...new Set(this.selectedBooks)]
      },
      addTaskBooksR(book) {
        /* 过滤重复选择的书籍 */
        book.isNecessary = 0
        this.selectedBooks.push(book)
        this.selectedBooks = [...new Set(this.selectedBooks)]
      },
      /* 移除已经选择的按钮 */
      removeSelectedBook(book) {
        this.selectedBooks = this.selectedBooks.filter(item => {
          return item !== book
        })
      },
      isSelected(arr, value) {
        if (arr.indexOf(value) === -1) {
          return false
        } else {
          return true
        }
      },
      /* 发布任务 */
      postTask(event) {
        if (!this.taskInputTitle) {
          Toast({
            message: "未填写标题",
            position: "middle",
            duration: 1500
          })
        } else if (!this.taskInputContent) {
          Toast({
            message: "未填写任务内容",
            position: "middle",
            duration: 1500
          })
        } else if (!this.allSelectedTaskObejct.length > 0) {
          Toast({
            message: "未选择学生",
            position: "middle",
            duration: 1500
          })
        } else if (this.taskStartDate === "" || this.taskEndDate === "" || this.taskStartDate > this.taskEndDate) {
          Toast({
            message: "未选择正确起止时间",
            position: "middle",
            duration: 1500
          })
        } else if (!this.selectedBooksMessage.length > 0) {
          Toast({
            message: "请选择任务书籍",
            position: "middle",
            duration: 1500
          })
        } else {
          this.state.onPost = true
          event.currentTarget.disabled = true
          Axios({
            url: API.postTask,
            method: "POST",
            params: {
              userId: this.userId,
              title: this.taskInputTitle,
              description: this.taskInputContent,
              targets: JSON.stringify(this.allSelectedTaskObjectId),
              types: JSON.stringify(this.selectedTaskType),
              books: JSON.stringify(this.selectedBooksMessage),
              startDate: this.taskStartDate,
              endDate: this.taskEndDate
            },
            headers: {
              "Authorization": this.token
            }
          }).then(res => {
            // console.log(this.taskInputTitle)
            // console.log(this.taskInputContent)
            this.state.onPost = false
            this.taskInputTitle = ""
            this.taskInputContent = ""
            this.allSelectedTaskObejct = []
            this.selectedTaskType = []
            this.selectedBooks = []
            this.taskStartDate = ""
            this.taskEndDate = ""
            this.selectedTimeStartText = "开始时间"
            this.selectedTimeEndText = "结束时间"
            if (res.status === 200) {
              Toast({
                message: res.data.msg,
                position: "middle",
                duration: 1500
              })
              window.location.assign("/ReadingOcean/wechat/published")
            }
          }).catch(err => {
            this.errorHandler(err)
          })
        }
      }
    },
    computed: {
      /* 获取当前所有班级的名称数组 */
      myAllClasses() {
        return this.userInfo.classes.map(obj => {
          return obj.name
        })
      },
      allStudentsName() {
        return this.allStudents.map(obj => {
          return obj.name
        })
      },
      /* 提取目前选中的所有学生id */
      allSelectedTaskObjectId() {
        return this.allSelectedTaskObejct.map(object => {
          return object.id
        })
      },
      /* 提取目前选中的所有书籍信息 */
      selectedBooksMessage() {
        return this.selectedBooks.map(object => {
          var book = {
            id: object.id,
            necessary: object.isNecessary
          }
          return book
        })
      }
    },
    created() {
      /* 初始化所有班级 */
      // this.slots[0].values = this.myAllClasses
      if (this.userInfo.classes.length === 1) {
        var temp = this.userInfo.classes[0]
        this.userInfo.classes = []
        this.userInfo.classes.push({name: "请先选择班级", id: -1})
        this.userInfo.classes.push(temp)
      } else {
        var list = []
        list.push({name: "请先选择班级", id: -1})
        this.userInfo.classes.forEach(e => {
          list.push(e)
        })
        this.userInfo.classes = list
      }
    }
  }
</script>

<style>
  /* 移除 ios 按钮默样式 */
  button{
    -webkit-appearance:none;
    outline:none;
  }

  html {
    width: 100%;
  }

  body {
    padding: 0;
    margin: 0;
    width: 100%;
  }

  .app {
    box-sizing: border-box;
    width: 100%;
    padding: 20px 10px 0 10px;
  }

  .task-info {
    width: 100%;
    box-shadow: 0 2px 5px #E5E9F2;
    background-color: #ffffff;
  }

  .title-input {
    box-sizing: border-box;
    padding: 10px 20px;
    font-weight: 200;
    border-radius: 0;
    width: 100%;
    border: 0;
    outline: 0;
    font-size: 16px;
    border-bottom: 1px solid rgba(90, 90, 90, 0.1);
  }

  .content-input {
    font-weight: 200;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 20px;
    border: 0;
    outline: 0;
    resize: none;
    font-size: 16px;
  }

  .task-type {
    font-weight: 200;
    box-sizing: border-box;
    width: 100%;
    margin-top: 10px;
    padding: 10px 20px;
    box-shadow: 0 2px 5px #E5E9F2;
    background-color: #ffffff;
  }

  .task-type__options {
    margin: 10px 0;
    display: inline-block;
    width: 50%;
  }

  .task-book-seleted {
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
    padding: 10px 20px;
    margin-top: 10px;
    background-color: #fff;
    box-shadow: 0 2px 5px #E5E9F2;
  }

  .selected-book {
    box-sizing: border-box;
    display: flex;
    position: relative;
    width: calc(50% - 20px);
    padding: 1px 8px;
    margin: 10px 10px;
    height: 30px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    background-color: #3C89FD;
    box-shadow: 0 2px 2px #E5E9F2;
  }

  .selected-bookN {
    box-sizing: border-box;
    display: flex;
    position: relative;
    width: calc(50% - 20px);
    padding: 1px 8px;
    margin: 10px 10px;
    height: 30px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    background-color: #fd000c;
    box-shadow: 0 2px 2px #E5E9F2;
  }

  .tag-name {
    display: block;
    width: 70%;
    line-height: 28px;
    font-size: 16px;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #fff;
  }

  .delete-selected-book {
    width: 30%;
    background-color: transparent;
    border: 0;
    outline: 0;
    padding: 0;
    margin: 0;
  }

  .delete-icon {
    display: block;
    width: 17px;
    height: 17px;
    margin: 0 auto;
    background: url("../../../static/images/TaskDist/delete-button.svg")
  }

  .task-book {
    box-sizing: border-box;
    width: 100%;
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #fff;
    box-shadow: 0 2px 5px #E5E9F2;
  }

  .task-book-search {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .search-input {
    width: 70%;
    border: 0;
    outline: 0;
    font-size: 16px;
    line-height: 1;
    font-weight: 300;
  }

  .search-btn,
  .cancel-search-btn  {
    width: 20%;
    white-space: nowrap;
    border: 0;
    outline: 0;
    background-color: transparent;
    font-size: 16px;
    line-height: 1;
    color: #3C89FD;
  }

  .search-result {
    position: relative;
    padding: 10px 0;
  }
  .tips{
    width: 100%;
    height: 16px;
    padding: 5px;
  }
  .tips-left{
    float: left;
    width: 48%;
    height: 16px;
    text-align: center;
    color: #fd0004;
    background-image: -webkit-linear-gradient(top left, #ff9492, #ffffff);
  }
  .tips-right{
    float: left;
    width: 48%;
    margin-left: 1%;
    height: 16px;
    text-align: center;
    color: #3C89FD;
    background-image: -webkit-linear-gradient(top left, #ffffff, #84b5ff);
  }
  .search-result__item {
    text-align: center;
    /*border-bottom: 1px solid rgba(90, 90, 90, 0.2);*/
    padding-bottom: 5px;
    margin: 0;
    position: relative;
  }

  .search-result__item + .search-result__item {
    padding-top: 10px;
  }
  .left{
    width: 50%;
    height: 20px;
    box-shadow: 0px 5px 5px -5px #ff0000;
    padding-bottom: 5px;
    /*background-image: -webkit-linear-gradient(top left, #ff0100, #ffffff);*/
    position: absolute;
  }
  .right{
    position: absolute;
    right: 0;
    width: 50%;
    height: 20px;
    box-shadow: 0px 5px 5px -5px #3C89FD;
    padding-bottom: 5px;
    /*background-image: -webkit-linear-gradient(top left, #fefced, #0072ff);*/
  }
  .task-object {
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 40px;
    margin-top: 10px;
    box-shadow: 0 2px 5px #E5E9F2;
    background-color: #ffffff;
  }

  .non-border-bottom {
    border-bottom: 0;
  }

  .task-object__select {
    box-sizing: border-box;
    padding-left: 20px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    flex: 3;
    color:rgb(117, 117, 117)
  }

  .task-object__delete {
    flex: 1;
    height: 40px;
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-size: 16px;
    color: #3C89FD;
    background-color: transparent;
  }

  .task-object__collapse {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    background-color: transparent;
    height: 40px;
    flex: 1;
  }

  .collapse-icon {
    display: block;
    margin: 0 auto;
    width: 18px;
    background: url("../../../static/images/TaskDist/down-arrow.svg") no-repeat;
    background-size: contain;
    height: 18px;
  }

  .selected-object {
    box-sizing: border-box;
    width: 100%;
    padding: 0 20px 20px;
    border-top: 0;
    background-color: #fff;
    box-shadow: 0 2px 5px #E5E9F2;
  }

  .selected-object__options {
    display: block;
    border-bottom: 1px solid rgba(90, 90, 90, 0.2);
    padding: 8px 0;
    font-weight: 300;
    font-size: 16px;
    line-height: 18px;
  }

  .selected-object__options label {
    display: flex;
  }

  .task-time {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    line-height: 1.2;
  }

  .task-time__start,
  .task-time__end {
    border: 0;
    width: 48%;
    padding: 10px 5px;
    font-size: 16px;
    background-color: #ffffff;
    box-shadow: 0 2px 5px #E5E9F2;
    outline: 0;
  }

  .add-btn,
  .cancel-btn,
  .add-all-btn {
    width: 100%;
    padding: 5px 0;
    background: 0;
    color: #3C89FD;
    font-size: 16px;
    border: 0;
  }

  .task-submit-btn {
    font-weight: 200;
    display: block;
    margin: 10px auto;
    width: 100%;
    height: 45px;
    background-color: #3C89FD;
    box-shadow: 0 2px 5px #E5E9F2;
    font-size: 20px;
    color: #fff;
    outline: 0;
    border: 0;
  }

  .check-box {
    width: 17px;
    height:17px;
    margin-right: 3px;
    display: flex;
  }

  .checkbox-invisible {
    width: 1px;
    height: 1px;
    opacity: 0;
  }

  .radio-check {
    display: block;
    float: left;
    width: 16px;
    height: 16px;
    margin: 2px 0;
    background: url("../../../static/images/Task/choose-act.svg") no-repeat;
    background-size: contain;
  }

  .radio-uncheck {
    display: block;
    float: left;
    width: 14px;
    height: 14px;
    margin: 2px 0;
    border: 1px solid #ddd;
    border-radius: 50%;
  }

  @keyframes fadeIn
  {
    0% {
      transform: translateY(-10px);
      opacity: 0;
    }
    100% {
      transform: translateY(0px);
      opacity: 1;
    }
  }

  @keyframes fadeOut
  {
    0% {
      transform: translateY(0px);
      opacity: 0;
    }
    100% {
      transform: translateY(-10px);
      opacity: 1;
    }
  }

  .fade-enter-active {
    transition: all .2s ease-in-out;
    -webkit-animation: fadeIn .5s ease-in-out 0.1s backwards;
    -moz-animation: fadeIn .5s ease-in-out 0.1s backwards;
    -o-animation: fadeIn .5s ease-in-out 0.1s backwards;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  .picker-toolbar {
    border-bottom: 1px solid #eaeaea;
  }

</style>
