<template>
  <div class="card">
    <div class="card__header">
      <div class="card__label"
           :style="{ background:colors }">{{ ShowType }}</div>
      <div class="card__title">{{ postTitle }}</div>
      <div class="card__delete"
           v-if="posterId === userId"
           @click="deletePost()">删除</div>
    </div>
    <div class="card__middle">
      <div class="card__poster">{{ poster }}</div>
      <div class="card__publish-date">{{ postDate | formatDate }}</div>
    </div>
    <div class="card__content">
      <img v-show="imgSrc"
           class="card-content__image"
           :src="imgSrc"
           alt="论坛图片">
      <audio v-if="audioSrc && (postCate === postType.recite || postCate === postType.readAloud) "
             class="card-content__audio"
             :src="audioSrc"
             controls="controls"></audio>
      <!-- <video-player v-if="videoSrc && (postCate === postType.recite || postCate === postType.readAloud) "
                    class="video-player vjs-custom-skin"
                    ref="videoPlayer"
                    :playsinline="true"
                    :options="playerOptions"></video-player> -->
      <p class="card-content__text">{{ postDesc }}</p>
    </div>

    <div class="favor">
      <span class="favor-icon"
            @click="likePost()"
            :class="{'favor-icon-active': isFavor, 'favor-icon-animation': isFavor}"></span>
      <span class="favor-count">{{ counter }}</span>
    </div>
    <div class="reply"
         v-if="isMine">
      <span class="reply-icon"
            @click="reply()"
            :class="{'reply-icon-active': isReply, 'reply-icon-animation': isReply}"></span>
      <span class="reply-count">{{ state }}</span>
    </div>
  </div>
</template>

<script>
import Axios from "axios"
import * as API from "../../api/api.js"
import user from "../../mixins/user.js"
import errorHandler from "../../mixins/errorHandler.js"
import { Toast } from "mint-ui"
import { Dialog } from "vant"
export default {
  mixins: [user, errorHandler],
  data() {
    return {
      counter: this.favorNum,
      isFavor: false,
      postType: {
        comment: "forum_post_pinglun",
        drawing: "forum_post_huihua",
        readResponse: "forum_post_duhougan",
        readNote: "forum_post_biji",
        mindMap: "forum_post_siwei",
        readAloud: "forum_post_langsong",
        recite: "forum_post_beisong"
      },
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "video/mp4",
          src: "" // 你的m3u8地址（必填）
        }],
        poster: "poster.jpg", // 你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      },
      isReply: false,
      state: "评价"
    }
  },
  props: {
    id: {
      type: String,
      required: true
    },
    resource: {
      type: String,
      required: false
    },
    postTitle: {
      type: String,
      required: true
    },
    poster: {
      type: String,
      required: true
    },
    postDate: {
      type: Number,
      required: true
    },
    postDesc: {
      type: null,
      required: true
    },
    favorNum: {
      type: Number,
      required: true
    },
    postCate: {
      type: String,
      required: true
    },
    blockCateList: {
      type: Array,
      required: true
    },
    posterId: {
      type: String,
      required: true
    },
    isMine: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    favor() {
      this.isFavor = true
    },
    reply() {
      this.$emit("reply", this.id)
    },
    likePost() {
      if (document.cookie.indexOf(this.id) === -1) {
        Axios({
          url: API.likePost,
          method: "POST",
          params: {
            postId: this.id
          },
          headers: {
            "Authorization": this.token
          }
        }).then(res => {
          this.isFavor = true
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
    },
    deletePost() {
      Dialog.confirm({
        title: "确认提示",
        message: "确认删除？"
      }).then(action => {
        if (action === "confirm") {
          Axios({
            url: API.deletePost,
            method: "POST",
            params: {
              postId: this.id
            },
            headers: {
              "Authorization": this.token
            }
          }).then(res => {
            Toast({
              message: res.data.data,
              position: "middle",
              duration: 1500
            })
            this.$destroy()
            setTimeout(() => {
              window.history.go(0)
            }, 1500)
          }).catch(err => {
            this.errorHandler(err)
          })
        }
      })
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
    player() {
      return this.$refs.videoPlayer
    },
    imgSrc() {
      return this.resource.substr(-4, 4) !== ".mp3" && this.resource.substr(-4, 4) !== ".mp4" && this.resource ? this.resource : null
    },
    audioSrc() {
      return this.resource.substr(-4, 4) === ".mp3" ? this.resource : null
    },
    videoSrc() {
      return this.resource.substr(-4, 4) === ".mp4" ? this.resource : null
    },
    colors() {
      switch (this.postCate) {
        case this.postType.comment:
          return "#62C8A5"
        case this.postType.drawing:
          return "#E7475E"
        case this.postType.readResponse:
          return "#FFB85F"
        case this.postType.readNote:
          return "#1F8AFF"
        case this.postType.mindMap:
          return "#7EBC59"
        case this.postType.readAloud:
          return "#B86C99"
        case this.postType.recite:
          return "#FFD972"
        default:
          return "gray"
      }
    },
    ShowType() {
      switch (this.postCate) {
        case this.postType.comment:
          return "短评"
        case this.postType.drawing:
          return "绘画"
        case this.postType.readResponse:
          return "读后感"
        case this.postType.readNote:
          return "读书笔记"
        case this.postType.mindMap:
          return "思维导图"
        case this.postType.readAloud:
          return "朗读"
        case this.postType.recite:
          return "背诵"
      }
    }
  },
  created() {
    this.isFavor = document.cookie.indexOf(this.id) !== -1
    // this.playerOptions.sources[0].src = "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
    // this.playerOptions.sources[0].src = this.resource
    // console.log(this.playerOptions.sources[0].src)
    console.log(this.resource)
  }
}
</script>

<style>
.card__label {
  display: inline-block;
  color: #fff;
  vertical-align: top;
  background-color: #f06966;
  font-size: 9px;
  font-weight: lighter;
  border-radius: 5px;
  padding: 3px 6px;
  white-space: nowrap;
}

.card__title {
  display: inline;
  font-size: 16px;
  font-weight: 300;
}

.card__delete {
  position: relative;
  float: right;
  color: #fff;
  vertical-align: top;
  background-color: #f06966;
  font-size: 9px;
  font-weight: lighter;
  border-radius: 5px;
  padding: 3px 6px;
  white-space: nowrap;
}

.card__poster {
  display: inline-block;
  font-size: 12px;
  font-weight: 300;
  color: #8a949b;
}

.card__publish-date {
  display: inline;
  font-size: 12px;
  font-weight: 300;
  color: #8a949b;
  margin-left: 3px;
}

.card__content {
  font-size: 14px;
  font-weight: 300;
  color: #5a5a5a;
  line-height: 20px;
  margin: 5px 0;
}

.card-content__text {
  text-indent: 28px;
}

.card__middle {
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}

.favor-icon {
  display: block;
  width: 14px;
  height: 14px;
  float: left;
  margin: 4px 0;
  background: url("../../../static/images/like.svg");
}

.favor-icon-active {
  background: url("../../../static/images/like-active.svg");
}

.favor-icon-animation {
  animation: heartbeat 0.5s;
}

@keyframes heartbeat {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.2, 1.2);
  }
  100% {
    transform: scale(1, 1);
  }
}

.favor-count {
  font-size: 12px;
  margin-left: 2px;
}

.favor {
  float: right;
  width: 25px;
}

.reply-icon {
  display: block;
  width: 14px;
  height: 14px;
  float: left;
  margin: 4px 0;
  background: url("../../../static/images/like.svg");
}

.reply-icon-active {
  background: url("../../../static/images/like-active.svg");
}

.reply-icon-animation {
  animation: heartbeat 0.5s;
}

@keyframes heartbeat {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.2, 1.2);
  }
  100% {
    transform: scale(1, 1);
  }
}

.reply-count {
  font-size: 12px;
  margin-left: 2px;
}

.reply {
  width: 40px;
  float: right;
  margin-right: 5px;
}

.card {
  overflow: hidden;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  box-shadow: 0 2px 5px #e0e0e0;
}

.card-content__image {
  display: block;
  width: 90%;
  margin: 0 auto;
}

.card-content__audio {
  width: 100%;
}
</style>
