<template>
  <div class="answer-card" :class="{'best-answer': isBest}">
    <div class="answer-card__head">
      <span class="answer-card__name">{{responder}}</span>
      <span class="like-icon" @click="like" :class="{'like-icon--active': isLike, 'like-animation': isLike }">
      </span>
      <span class="like-number">{{counter}}</span>
      <button class="delete-btn" v-if="isUserResponder" @click="$emit('delete')">删除</button>
      <button class="accept-btn" v-if="isUserQuizzer" @click="$emit('accept')">{{ bestAnswerText }}</button>
      <span class="answer-date">{{answerDate}}</span>
    </div>
    <div class="answer-card__content" :class="{ 'collapse': isCollapse }">{{description}}</div>
    <div class="answer-card__collapse" @click=" isCollapse = !isCollapse ">
      <svg class="collapse-icon" :class="{ 'expand-icon': !isCollapse }" version="1.1" xmlns="https://www.w3.org/2000/svg" viewBox="0 0 129 129" xmlns:xlink="https://www.w3.org/1999/xlink" enable-background="new 0 0 12<s></s>9 129">
        <g>
          <path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z"/>
        </g>
      </svg>
    </div>
  </div>
</template>
<script>
import Axios from "axios"
import * as API from "../../../api/api.js"
import user from "../../../mixins/user.js"
import errorHandler from "../../../mixins/errorHandler.js"
import { Toast } from "mint-ui"
export default {
  mixins: [ user, errorHandler ],
  name: "answer",
  props: {
    id: {
      type: String,
      required: true
    },
    responder: {
      type: String,
      required: true
    },
    responderId: {
      type: String,
      required: true
    },
    likeNumber: {
      type: Number,
      required: true
    },
    answerDate: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    isAccepted: {
      type: Boolean,
      required: true
    },
    quizzerId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isCollapse: true,
      likeSrc: require("../../../../static/images/like.svg"),
      likeActiveSrc: require("../../../../static/images/like-active.svg"),
      isLike: false,
      counter: this.likeNumber
    }
  },
  computed: {
    isBest() {
      return this.isAccepted
    },
    /* 当前用户是否是当前答案的发布者 */
    isUserResponder() {
      return this.userId === this.responderId
    },
    bestAnswerText() {
      return this.isBest ? "取消最佳答案" : "采纳为最佳答案"
    },
    /* 当前用户是否是当前问题的发布者 */
    isUserQuizzer() {
      return this.userId === this.quizzerId
    }
  },
  methods: {
    like() {
      if (document.cookie.indexOf(this.id) === -1) {
        Axios({
          url: API.likeAnswer,
          method: "POST",
          params: {
            answerId: this.id,
            userId: this.userId
          },
          headers: {
            "Authorization": this.token
          }
        }).then(res => {
          this.isLike = true
          this.counter += 1
          document.cookie = this.id + "=" + "ok"
        }).catch(err => {
          this.errorHandler(err)
        })
      } else {
        Toast({
          message: "点赞不能太频繁喔",
          position: "middle",
          duration: 1000
        })
      }
    }
  },
  created() {
    this.isLike = document.cookie.indexOf(this.id) !== -1
  }
}
</script>
<style scoped>
.answer-card {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  background-color: #fff;
  margin: 10px 0;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.20);
  border-radius: 3px;
  border: 1px solid transparent;
  z-index: 0;
}

.answer-card::after {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: transparent;
  background-image: none;
  background-repeat: no-repeat;
  background-position: center center;
  opacity: 0.3;
  z-index: -1;
}

.best-answer::after {
  background-image: url("../../../../static/images/QA/best.svg");
}

.answer-card__head {
  padding: 8px;
  border-bottom: 1px dotted #dae2eb;
  font-size: 12px;
  height: 20px;
  line-height: 20px;
}

.answer-card__name {
  font-weight: bolder;
  float: left;
  margin-right: 10px;
}

.answer-date {
  float: right;
  font-size: 12px;
}

.answer-card__content {
  text-align: left;
  font-size: 1em;
  font-weight: 300;
  margin: 10px 8px;
  word-break: break-all;
}

.answer-card__collapse {
  width: 100%;
}

.collapse {
  display: block;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  padding: 0;
  height: 2.4em;
  line-height: 1.2em;
  overflow-y: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}

.collapse-icon {
  display: block;
  margin: 0 auto;
  height: 15px;
}

.expand-icon {
  transform: rotate(180deg);
}

.like-icon {
  display: block;
  width: 11px;
  height: 11px;
  float: left;
  margin: 4px 0;
  background: url("../../../../static/images/like.svg");
}

.like-icon--active {
  background: url("../../../../static/images/like-active.svg");
}

.like-number {
  margin-left: 3px;
}

.delete-btn {
  outline: 0;
  border: 0;
  padding: 0;
  background-color: #F46D78;
  margin-left: 10px;
  padding: 0 5px;
  color: #fff;
}

.accept-btn {
  outline: 0;
  border: 0;
  padding: 0;
  background-color: #42b983;
  margin-left: 10px;
  padding: 0 5px;
  color: #fff;
}

.like-animation {
  animation: heartbeat .5s;
}

@keyframes heartbeat {
  0% {
    transform: scale(1,1);
  }
  50% {
    transform: scale(1.2,1.2);
  }
  100% {
    transform: scale(1,1);
  }
}
</style>
