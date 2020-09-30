<template lang="html">
 <div class="container">
   <div class="taskDist__startDate"><i class="clock-icon"></i>发布日期：{{ distDate | formatDate }}</div>
     <div class="taskDist-content">
       <div class="taskDist-content__text">
         <div class="taskDist__title"><h3 class="taskDist-title__text">{{ distTitle }}</h3></div>
         <div class="taskDist__disc"><p class="taskDist-disc__text">{{ distDisc }}</p></div>
       </div>
       <div class="taskDist-content__actions">
         <a class="taskDist-btn taskDist-btn-detail" :href="'/ReadingOcean/wechat/taskDetail?taskId='+ id">查看详情</a>
         <button class="taskDist-btn taskDist-btn-delete" @click="deleteTask()">删除</button>
       </div>
     </div>
    </div>
</template>

<script>
import {MessageBox} from "mint-ui"
import * as API from "../../api/api.js"
import user from "../../mixins/user.js"
import errorHandler from "../../mixins/errorHandler.js"
import Axios from "axios"
export default {
  mixins: [ user, errorHandler ],
  props: {
    id: {
      type: String,
      required: true
    },
    distDate: {
      type: Number,
      required: true
    },
    distTitle: {
      type: String,
      required: true
    },
    distDisc: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      value: true
    }
  },
  filters: {
    /* 格式化日期 */
    formatDate(mm) {
      var date = new Date(mm)
      var year = date.getFullYear()
      var month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)
      var day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate()
      var hour = date.getHours() >= 10 ? date.getHours() : "0" + date.getHours()
      var minute = date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes()
      return year + "-" + month + "-" + day + " " + hour + ":" + minute
    }
  },
  methods: {
    /* 删除任务方法 */
    deleteTask() {
      MessageBox({
        title: "确认提示",
        message: "确定删除任务?",
        showCancelButton: true,
        value: this.value
      }).then(action => {
        if (action === "confirm") {
          Axios({
            url: API.deleteTask,
            method: "POST",
            params: {
              taskId: this.id
            },
            headers: {
              "Authorization": this.token
            }
          }).then(res => {
            /* 服务器确认删除成功后，向父组件发出事件，并且传递已经删除的任务 id 和成功信息 */
            this.$emit("deleteTask", this.id, res.data.msg)
            this.value = false
          }).catch(err => {
            this.errorHandler(err)
            this.value = false
          })
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
.container {
  width: 100%;
  padding: 10px 0;
}

.clock-icon {
  display: block;
  width: 12px;
  height: 12px;
  margin-right: 5px;
  background-image: url("../../../static/images/clock.svg")
}

.taskDist__startDate {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #5a5a5a;
}

.taskDist-content {
  display: flex;
  margin: 10px 5px;
  justify-content: space-between;
  align-items: center;
  border-left: dashed 1px #324057;
}

.taskDist__title {
  font-size: 16px;
  margin: 0 0 10px;
}

.taskDist-title__text {
  margin: 0;
  font-weight: bold
}

.taskDist-content__text {
  padding: 0 5px 0 10px;
}

.taskDist-content__actions {
  display: flex;
  flex: 0 0 80px;
  flex-direction: column;
}

.taskDist-btn {
  display: block;
  width: 100%;
  outline: 0;
  border: 0;
  border-radius: 3px;
  padding: 5px;
  text-align: center;
  box-sizing: border-box;
  text-decoration: none;
}

.taskDist-btn + .taskDist-btn {
  margin-top: 12px
}

.taskDist-btn-detail {
  line-height: 18px;
  background-color: #3C89FD;
  font-size: 12px;
  color: #fff;
  text-decoration: none;
}

.taskDist-btn-delete {
  background-color: #F46D78;
  width: 100%;
  color: #fff;
}

.taskDist__disc {
  font-size: 12px;
  height: 27px;
  overflow: hidden;
}

.taskDist-disc__text {
  margin: 0;
  font-weight: 300;
  color: #8f95a3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
