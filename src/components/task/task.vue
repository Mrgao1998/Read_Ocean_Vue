<template lang="html">
  <div class="contanier">
    <div class="task-start"><i class="clock-icon"></i>开始时间: {{ startDate | formatDate }}</div>
    <div class="task-content">
      <div class="task-content__text">
        <div class="task-content__title"><h3>{{ title }}</h3></div>
        <div class="task-content__publisher"><p>发布教师: {{ publisher }}</p></div>
      </div>
      <div class="task-content__actions">
        <a class="task-btn task-btn-detail" :href="'/ReadingOcean/wechat/taskDetail?taskId='+ id">查看详情</a>
        <span :class="{'task-commented': commented && isDone ,'task-comment': !commented && isDone}">{{ evaluateStatus }}
          <i class="check-icon" v-if="commented && isDone"></i>
        </span>
      </div>
    </div>
    <div class="task-end"><i class="clock-icon"></i>结束时间: {{ endDate | formatDate }}</div>
  </div>
</template>

<script>
import user from "../../mixins/user.js"
import errorHandler from "../../mixins/errorHandler.js"
export default {
  mixins: [ user, errorHandler ],
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    startDate: {
      type: Number,
      required: true
    },
    endDate: {
      type: Number,
      required: true
    },
    publisher: {
      type: String,
      required: true
    },
    isDone: {
      type: Boolean,
      require: true
    },
    commented: {
      type: Boolean,
      required: true
    }
  },
  filters: {
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
  computed: {
    evaluateStatus() {
      if (this.isDone) {
        return this.commented ? "已评价" : "未评价"
      }
    }
  }
}
</script>

<style lang="css" scoped>
.contanier {
  width: 100%;
  padding: 10px 0;
}

.clock-icon {
  display: block;
  width: 12px;
  height: 12px;
  margin-right: 10px;
  background-image: url("../../../static/images/clock.svg")
}

.task-start,
.task-end {
  display: flex;
  align-items: center;
  font-size: 12px;
}

.task-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 0 20px;
  margin: 10px 6px;
  border: 1px solid transparent;
  border-left: 1px dashed #324057;
}

.task-content__publisher {
  font-size: 13px;
}

.task-content__actions {
  flex: 0 0 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.task-btn {
  display: block;
  box-sizing: border-box;
  height: 28px;
  outline: 0;
  border: 0;
  border-radius: 3px;
  padding: 5px;
  text-align: center;
}

.task-btn-detail {
  line-height: 18px;
  background-color: #3C89FD;
  font-size: 12px;
  color: #fff;
  text-decoration: none;
}

.task-btn-done {
  background-color: #475669;
  font-size: 12px;
  color: #fff;
}

.task-comment {
  text-align: center;
  margin-top: 6px;
  background-color: #fff;
  font-size: 12px;
  color: #999;
}

.task-commented {
  text-align: center;
  margin-top: 6px;
  background-color: #fff;
  font-size: 12px;
  color: #62C8A5;
  display: flex;
  justify-content: center;
}

.check-icon {
  background-image: url("../../../static/images/Task/check.svg");
  width: 12px;
  height: 12px;
  display: inline-block;
  margin-left: 5px
}
</style>
