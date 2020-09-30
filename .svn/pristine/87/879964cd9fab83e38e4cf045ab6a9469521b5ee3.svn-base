<template lang="html">
  <!-- 意见反馈弹出框 -->
  <div class="popup">
    <mt-header title="意见反馈" fixed class="popup__header">
      <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <div class="popup__content">
      <div class="feedback">
        <textarea v-model="feedBackText" class="feedback__input" rows="8" placeholder="请输入您对我们的意见及建议"></textarea>
        <mt-button class="feedback__send-btn" @click="sendFeedBack()">发送</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios"
import * as API from "../../../api/api.js"
import user from "../../../mixins/user.js"
import errorHandler from "../../../mixins/errorHandler.js"
import { Toast } from "mint-ui"
import { Dialog } from "vant"
export default {
  mixins: [user, errorHandler],
  data() {
    return {
      feedBackText: ""
    }
  },
  methods: {
    sendFeedBack() {
      if (this.feedBackText.trim().length <= 0) {
        Toast({
          message: "您的反馈为空，请输入内容重新提交",
          position: "middle",
          duration: 1500
        })
      } else {
        Dialog.confirm({
          title: "确认提示",
          message: "确定提交?"
        }).then(action => {
          if (action === "confirm") {
            Axios({
              url: API.sendFeedback,
              method: "POST",
              headers: {
                "Authorization": this.token
              },
              params: {
                userId: this.userId,
                feedback: this.feedBackText
              }
            }).then(res => {
              this.feedBackText = ""
              Toast({
                message: res.data.message,
                position: "middle",
                duration: 1500
              })
            }).catch(err => {
              this.errorHandler(err)
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="css" scoped>
@import "../../../../static/css/personal/popup.css";

.feedback {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
}

.feedback__input {
  appearance: none;
  box-sizing: border-box;
  width: 100%;
  padding: 5px;
  margin: 0;
  outline: 0;
  resize: none;
  font-weight: 200;
  font-size: 16px;
  border: 1px solid #c8c8cd;
  border-radius: 0;
}

.feedback__send-btn {
  width: 100%;
  margin-top: 10px;
}
</style>
