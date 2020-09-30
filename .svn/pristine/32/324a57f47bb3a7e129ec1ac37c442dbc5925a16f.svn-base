<template>
  <div class="question-card" :style="{ width: customWidth }">
    <div class="question-card__head">
      <span class="user-name">{{user}}</span><span>提问:</span>
      <span class="created-time">{{time | formatDate}}</span>
    </div>
    <div class="question-card__content">
      <p class="question-title">{{questionContent}}</p>
    </div>
    <div class="question-card__detail" @click="linkToDetail()">问题详情
      <svg xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 52 52" style="enable-background:new 0 0 52 52;vertical-align:bottom;" xml:space="preserve" width="20px" height="20px">
    <g>
    	<path d="M26,0C11.663,0,0,11.663,0,26s11.663,26,26,26s26-11.663,26-26S40.337,0,26,0z M26,50C12.767,50,2,39.233,2,26   S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z" fill="#FFFFFF"/>
    	<path d="M26,37c-0.553,0-1,0.447-1,1v2c0,0.553,0.447,1,1,1s1-0.447,1-1v-2C27,37.447,26.553,37,26,37z" fill="#FFFFFF"/>
    	<path d="M26.113,9.001C26.075,9.001,26.037,9,25.998,9c-2.116,0-4.106,0.815-5.615,2.304C18.847,12.819,18,14.842,18,17   c0,0.553,0.447,1,1,1s1-0.447,1-1c0-1.618,0.635-3.136,1.787-4.272c1.153-1.137,2.688-1.765,4.299-1.727   c3.161,0.044,5.869,2.752,5.913,5.913c0.029,2.084-0.999,4.002-2.751,5.132C26.588,23.762,25,26.794,25,30.158V33   c0,0.553,0.447,1,1,1s1-0.447,1-1v-2.842c0-2.642,1.276-5.105,3.332-6.432c2.335-1.506,3.706-4.063,3.667-6.84   C33.939,12.599,30.401,9.061,26.113,9.001z" fill="#FFFFFF"/>
    </g>
    </svg>
</div>
  </div>
</template>

<script>
export default {
  name: "Question",
  props: {
    user: {
      type: String,
      required: true
    },
    time: {
      type: Number,
      required: true
    },
    questionContent: {
      type: String,
      required: true
    },
    questionId: {
      type: String,
      required: true
    },
    customWidth: {
      type: String,
      default() {
        return "100%"
      }
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
  methods: {
    linkToDetail() {
      document.location.assign("/ReadingOcean/wechat/qaDetail?questionId=" + this.questionId)
    }
  }
}
</script>

<style scoped>
.question-card {
  background-color: #fff;
  margin-bottom: 20px;
  box-shadow: 0 2px 6px 0 rgba(0,0,0,.22);
  border-radius: 3px;
}

.question-card__head {
  padding: 8px;
  border-bottom: 1px dashed #dae2eb;
  font-size: 12px;
}

.user-name {
  padding-right: 10px;
  font-weight: bolder;
  text-align: left;
}

.created-time {
  float: right;
  font-size: 12px;
}

.question-card__content {
  text-align: center;
  font-size: 1.2em;
  padding: 20px 10px;
  height: 100%;
}

.question-title {
  display: block;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.question-card__detail {
  text-align: center;
  padding: 10px 5px;
  background-color: #3C89FD;
  color: #fff;
  border-radius: 3px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
