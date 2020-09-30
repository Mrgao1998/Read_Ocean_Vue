<template>
  <div class="community-detail">
    <div class="background"
         v-if="screen"
         @click="screen=false"></div>
    <div class="block">
      <!-- 板块图片 -->
      <a class="block__book-img"
         :href="'/ReadingOcean/wechat/bookDetail?bookId='+blockDetail.bookId">
        <img :src="blockDetail.img"
             alt=""
             width="100%">
      </a>
      <!-- 板块基本信息 -->
      <div class="block__intro">
        <p class="block__name">{{ blockDetail.title }}</p>
        <p class="block__author">作者：<span>{{ blockDetail.author }}</span></p>
        <p class="block__press">出版社：<span>{{ blockDetail.press }}</span></p>
        <p class="block__publish-date">适读阶段：<span>{{ blockDetail.stage }}</span></p>
      </div>

    </div>
    <!-- 评论区 -->
    <div class="comment"
         v-if="screen">
      <div class="comment__title"><span class="comment__title">点评</span></div>
      <div class="comment__content"><textarea cols="20"
                  rows="4"
                  style="font-size:18px"
                  v-model="currentComment"></textarea></div>
      <div class="comment__confirm"><button @click="confirm">确认</button></div>
    </div>

    <!-- 分类 tab 栏 -->
    <div class="tab">
      <div v-for="cate in blockPostType"
           class="tab__item"
           @click="getAllPosts(cate.value)"
           :class="{'tab__item--active': tabSelected === cate.value }">{{ cate.label }}</div>
    </div>
    <!-- 改变排序方式 -->
    <div class="order">
      <span class="type-title">排序方式：</span>
      <button class="order-but"
              @click="sheetVisible=true">
        <label class="mint-button-text">{{orderType}}</label>
        <img src="../../../static/images/community/order.png">
      </button>

      <mt-actionsheet :actions="actions"
                      v-model="sheetVisible">
      </mt-actionsheet>

    </div>
    <!-- 帖子列表 -->
    <div class="post-list"
         v-infinite-scroll="loadMorePost"
         infinite-scroll-disabled="postLoading"
         infinite-scroll-immediate-check="false"
         infinite-scroll-distance="20">
      <post @reply="reply"
            v-for="post in postList"
            :id="post.id"
            :key="post.id"
            :resource="post.media || ''"
            :post-title="post.title"
            :poster="post.publisher"
            :post-date="post.publishDate"
            :post-desc="post.description"
            :favor-num="post.likeNum"
            :post-cate="post.category"
            :blockCateList="blockPostType"
            :posterId="post.publisherId"
            :isMine="post.isMine"></post>
      <p class="no-post"
         v-show="postList.length === 0">暂时还没有内容喔</p>
    </div>

    <!-- 打开发表界面按钮 -->
    <button class="btn-add"
            @click="publishVisible = true"><i class="icon-add"></i></button>

    <div class="publish"
         v-show="publishVisible">
      <!-- 发布输入区域 -->
      <div class="publish__input">
        <input type="text"
               class="input input-title"
               placeholder="请输入发布标题"
               v-model="postTitle">
        <textarea v-show="!voiceRequired"
                  rows="5"
                  placeholder="请输入发布详情"
                  class="input input-description"
                  v-model="postDescription"></textarea>
      </div>
      <!-- 录音录制控制按钮 -->
      <div class="voice-recording"
           v-show="voiceRequired&&!isOpenVideo">
        <button class="btn-voice"
                @click="startRecord()"><i class="icon-start-record"></i>{{voiceText}}</button>
        <button class="btn-voice"
                ref='stopRef'
                @click="stopRecord()"><i class="icon-stop-record"></i>结束录音</button>
      </div>
      <div class="countdown-timer"
           v-show="voiceRequired&&!isOpenVideo">录音倒计时:{{timer}}秒</div>
      <!-- 录音播放控制按钮 -->
      <div class="voice-control"
           v-show="voiceRequired && localVoiceReady">
        <button class="btn-voice"
                @click="voicePlay()"><i class="icon-play"></i>播放</button>
        <button class="btn-voice"
                @click="voicePause()"><i class="icon-pause"></i>暂停</button>
        <button class="btn-voice"
                @click="voiceStop()"><i class="icon-stop"></i>结束</button>
      </div>
      <!-- 发布类型 -->
      <div class="publish__type">
        <label class="publish__radio"
               v-for="cate in blockPostType"
               v-if="cate.value">
          <input type="radio"
                 :value="cate.value"
                 class="btn btn-radio"
                 v-model="selectedPublishType">
          {{ cate.label }}
          <span :class="{'publish__radio--check': cate.value ===  selectedPublishType, 'publish__radio--uncheck': cate.value !==  selectedPublishType  }"></span>
        </label>
      </div>
      <!-- 发布上传图片区域 -->
      <div class="publish__upload"
           v-if="imgUploadVisible">
        <input type="file"
               accept="image/*"
               class="input input-upload"
               @change="selectUploadImage($event)">
        <span class="upload-text">请选择上传图片</span>
      </div>
      <!-- 上传预览图 -->
      <img :src="uploadThumbnail"
           alt="上传图片"
           class="publish__thumbnail"
           v-if="uploadThumbnail">
      <!-- 发布上传视频区域 -->
      <!-- <button class="makeSure"
              @click="makeSure()"
              v-if="voiceRequired">上传视频</button>
      <div class="publish__upload"
           v-if="isOpenVideo&&voiceRequired"> -->
      <!-- <input type="file"
               accept="video/*"
               class="input input-upload"
               id="videoFile"
               @change="selectUploadVideo($event)">
        <span class="upload-text"
              id="flag">请选择上传视频</span> -->
      <!-- <uploader :options="options"
                  class="uploader-example">
          <uploader-unsupport></uploader-unsupport>
          <uploader-drop>
            <p>所选视频大小不宜过大</p>
            <uploader-btn :attrs="attrs">选择视频上传</uploader-btn>
          </uploader-drop>
          <uploader-list></uploader-list>
          </uploader-list>
        </uploader>
      </div> -->
      <!-- 发表和返回按钮组 -->
      <div class="publish__control">
        <button class="btn btn-remove"
                @click="removeUploadImage()"
                v-if="uploadImage">移除图片</button>
        <button class="btn btn-submit"
                id="btn-submit"
                @click="publish()">发表</button>
      </div>
      <button class="btn btn-quit"
              @click="publishVisible = false"><i class="quit-icon"></i><span class="quit-text">返回作品社区</span></button>
    </div>
  </div>
</template>

<script>
import Axios from "axios"
import * as API from "../../api/api.js"
import user from "../../mixins/user.js"
import { Toast, Indicator } from "mint-ui"
import { Dialog } from "vant"
import getPosts from "../../mixins/getPosts.js"
import post from "../../components/community/post.vue"
import errorHandler from "../../mixins/errorHandler.js"
import blockPostType from "../../utils/blockPostCate.js"

import wx from "weixin-js-sdk"
export default {
  mixins: [user, errorHandler, getPosts],
  data() {
    return {
      currentId: "",
      currentComment: "还未给出评价",
      screen: false,
      sheetVisible: false,
      tabSelected: null,
      type: 0,
      isOpenVideo: false,
      publishVisible: false,
      selectedPublishType: null,
      uploadThumbnail: null,
      uploadImage: null,
      uploadVideo: null,
      blockPostType: blockPostType,
      blockDetail: {},
      postTitle: "",
      postDescription: "",
      localVoiceId: null,
      serverVoiceId: null,
      currentPage: 1,
      maxPage: 100,
      postList: [],
      postLoading: false,
      postType: {
        comment: "forum_post_pinglun",
        drawing: "forum_post_huihua",
        readResponse: "forum_post_duhougan",
        readNote: "forum_post_biji",
        mindMap: "forum_post_siwei",
        readAloud: "forum_post_langsong",
        recite: "forum_post_beisong"
      },
      isRecording: false,
      isPlaying: false,
      orderType: "按时间",
      actions: [{
        name: "看自己",
        type: 3,
        method: this.getType
      }, {
        name: "按热度",
        type: 1,
        method: this.getType
      }, {
        name: "按时间",
        type: 0,
        method: this.getType
      }, {
        name: "按最早",
        type: 2,
        method: this.getType
      }],
      timer: 60,
      timerMachine: null,
      posterId: "",
      // options: {
      //   // 可通过 https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js 示例启动服务
      //   target: "//localhost:3000/upload", // 目标上传 URL
      //   single: true,
      //   // testChunks: false,
      //   testChunks: true, // 是否开启服务器分片校验
      //   // 服务器分片校验函数，秒传及断点续传基础
      //   checkChunkUploadedByResponse: function (chunk, message) {
      //     let objMessage = JSON.parse(message)
      //     if (objMessage.skipUpload) {
      //       return true
      //     }

      //     return (objMessage.uploaded || []).indexOf(chunk.offset + 1) >= 0
      //   },
      //   chunkSize: "2048000"
      // },
      attrs: {
        accept: "video/*"
      }
    }
  },
  components: {
    post: post
  },
  computed: {
    blockId() {
      return window.location.href.split("blockId=")[1]
    },
    imgUploadVisible() {
      return this.selectedPublishType && this.selectedPublishType !== this.postType.readAloud && this.selectedPublishType !== this.postType.recite && this.selectedPublishType !== this.postType.comment && this.uploadImage === null
    },
    voiceRequired() {
      return this.selectedPublishType === this.postType.recite || this.selectedPublishType === this.postType.readAloud
    },
    voiceText() {
      if (!this.isRecording && !this.localVoiceId) {
        return "开始录音"
      } else if (!this.isRecording && this.localVoiceId) {
        return "重新录音"
      } else if (this.isRecording) {
        return "正在录音"
      }
    },
    localVoiceReady() {
      return this.localVoiceId
    },
    formValidate() {
      if (!this.voiceRequired && this.selectedPublishType === this.postType.comment) {
        /* 如果发布类型是评论，则必须填写标题和描述 */
        return this.postTitle.length > 0 && this.postDescription.length > 0
      } else if (!this.voiceRequired && this.selectedPublishType !== this.postType.comment) {
        /* 如果发布类型不是评论也不是语音相关，则必须填写标题以及上传图片和描述的其中之一 */
        return this.postTitle.length > 0 && (this.postDescription.length > 0 || this.uploadImage !== null)
      } else if (this.voiceRequired) {
        /* 如果发布类型是语音相关，则必须填写标题 */
        return this.postTitle.length > 0
      } else {
        return false
      }
    }
  },
  methods: {
    confirm: function () {
      if (this.comment !== "") {
        Axios({
          url: API.addReply,
          method: "POST",
          params: {
            postId: this.currentId,
            discussContent: this.currentComment
          },
          headers: {
            "Authorization": this.token
          }
        }).then(res => {
          this.screen = false
        }).catch(err => {
          console.log(err)
        })
      }
    },
    reply: function (id) {
      this.screen = true
      this.currentId = id
      Axios({
        url: API.getReply,
        method: "GET",
        params: {
          postId: id
        },
        headers: {
          "Authorization": this.token
        }
      }).then(res => {
        this.currentComment = res.data.dataList[0].discussContent
      }).catch(err => {
        this.errorHandler(err)
      })
    },
    getType: function (type) {
      this.type = type.type
      if (this.type === 1) {
        this.orderType = "按热度"
      } else if (this.type === 0) {
        this.orderType = "按时间"
      } else if (this.type === 2) {
        this.orderType = "按最早"
      } else {
        this.orderType = "看自己"
      }
      Axios({
        url: API.getPosts,
        method: "GET",
        params: {
          blockId: this.blockId,
          category: this.tabSelected,
          pageNum: 1,
          limits: 5,
          type: type.type
        },
        headers: {
          "Authorization": this.token
        }
      }).then(res => {
        this.postList = res.data.dataList
      }).catch(err => {
        console.log(err)
      })
    },
    // 开始计时
    startTimer() {
      this.timer = 59
      this.timerMachine = window.setInterval(() => {
        // console.log(this.timer)
        this.timer--
        if (this.timer < 1) { // 当倒计时小于1时清除定时器
          this.$refs.stopRef.click()
          // window.clearInterval(this.timerMachine)
          // this.timer = 60
        }
      }, 1000)
    },
    // 计时停止
    stopTimer() {
      window.clearInterval(this.timerMachine)
      this.timer = 60
    },
    // 开始录音
    startRecord() {
      // this.startTimer()
      if (!this.isRecording) {
        this.startTimer()
        wx.startRecord()
        this.isRecording = true
        // /* 录音超过一分钟自动暂停 */
        // wx.onVoiceRecordEnd({
        //   complete: function (res) {
        //     // this.localVoiceId = res.localId
        //     this.stopRecord()
        //   }
        // })
      }
    },
    // 结束录音
    stopRecord() {
      if (this.isRecording) {
        wx.stopRecord({
          success: function (res) {
            this.localVoiceId = res.localId
            this.isRecording = false
            this.uploadRecord()
          }.bind(this)
        })
        this.stopTimer()
      }
    },
    /* 上传录音至微信服务器 */
    uploadRecord() {
      wx.uploadVoice({
        localId: this.localVoiceId,
        isShowProgressTips: 1,
        success: function (res) {
          this.serverVoiceId = res.serverId
        }.bind(this)
      })
    },
    /* 播放录制好的语音 */
    voicePlay() {
      if (!this.isRecording) {
        wx.playVoice({
          localId: this.localVoiceId
        })
      }
    },
    /* 暂停播放录制好的语音 */
    voicePause() {
      if (!this.isRecording) {
        wx.pauseVoice({
          localId: this.localVoiceId
        })
      }
    },
    /* 停止播放录制好的语音 */
    voiceStop() {
      if (!this.isRecording) {
        wx.stopVoice({
          localId: this.localVoiceId
        })
      }
    },
    loadMorePost() {
      if (this.currentPage < this.maxPage) {
        Indicator.open({
          text: "加载更多...",
          spinnerType: "snake"
        })
        this.currentPage += 1
        this.postLoading = true
        this.getPosts({
          blockId: this.blockId,
          category: this.tabSelected,
          pageNum: this.currentPage,
          limits: 5,
          type: this.type,
          token: this.token
        }).then(res => {
          Indicator.close()
          this.postLoading = false
          this.postList = this.postList.concat(res.data.dataList)
        }).catch(err => {
          Indicator.close()
          this.postLoading = false
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
    getAllPosts(value) {
      this.tabSelected = value
      this.currentPage = 1
      Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      })
      this.getPosts({
        blockId: this.blockId,
        category: this.tabSelected,
        pageNum: this.currentPage,
        type: this.type,
        limits: 5,
        token: this.token
      }).then(res => {
        Indicator.close()
        this.currentPage = res.data.currentPage
        this.maxPage = res.data.totalPage
        this.postList = res.data.dataList
      }).catch(err => {
        Indicator.close()
        this.errorHandler(err)
      })
    },
    selectUploadImage(event) {
      let imageReader = new FileReader()
      let imageFile = event.target.files[0]
      this.uploadImage = event.target.files[0]
      imageReader.addEventListener("loadend", event => {
        this.uploadThumbnail = event.target.result
      })
      if (imageFile) {
        imageReader.readAsDataURL(imageFile)
      }
    },
    removeUploadImage() {
      this.uploadImage = null
      this.uploadThumbnail = null
    },
    makeSure() {
      Dialog.confirm({
        title: "确认提示",
        message: "只能选择一种方式，确定吗?"
      }).then(action => {
        if (action === "confirm") {
          this.isOpenVideo = true
        }
      })
    },
    selectUploadVideo(event) {
      var newVideo = document.getElementById("videoFile").files[0]
      var flag = document.getElementById("flag")
      var videoSize = newVideo.size
      if (videoSize > 15 * 1024 * 1024) {
        alert("视频文件过大")
        return
      }
      this.uploadVideo = newVideo
      flag.innerText = newVideo.name
      flag.setAttribute("class", "successUpload")
      console.log(videoSize)
    },
    removeUploadVideo() {
      this.uploadVideo = null
    },
    publish() {
      /* 如果发布类型是朗读或背诵,且语音还未上传到微信服务器时 */
      var x = document.getElementsByClassName("publish__radio--check")
      var str = x[0].parentNode.childNodes[1].data.replace(/\s*/g, "")
      if ((str === "绘画" || str === "读后感" || str === "读书笔记" || str === "思维导图") && this.uploadImage === false) {
        Toast({
          message: "请上传图片再发布",
          position: "middle",
          duration: 1500
        })
      } else {
        /* 其他发布类型，验证表单填写 */
        if (this.formValidate) {
          document.getElementById("btn-submit").setAttribute("disabled", true)
          /* 构造发布信息的 FormData 对象 */
          var data = new FormData()
          data.append("title", this.postTitle)
          data.append("description", this.postDescription)
          data.append("category", this.selectedPublishType)
          data.append("userId", this.userId)
          data.append("blockId", this.blockId)
          data.append("voiceId", this.serverVoiceId)
          if (!this.uploadVideo) {
            data.append("file", this.uploadImage)
          } else {
            data.append("file", this.uploadVideo)
          }
          data.append("isVoice", true)
          Axios({
            url: API.blockPublish,
            method: "POST",
            data: data,
            headers: {
              "Authorization": this.token,
              "Content-Type": "multipart/form-data"
            }
          }).then(res => {
            this.postTitle = ""
            this.postDescription = ""
            this.uploadImage = null
            this.uploadVideo = null
            this.uploadThumbnail = null
            this.localVoiceId = null
            this.serverVoiceId = null
            Toast({
              message: res.data.msg,
              position: "middle",
              duration: 1500
            })
            this.publishVisible = false
            location.reload()
          }).catch(err => {
            this.errorHandler(err)
          })
        } else {
          Toast({
            message: "请认真填写发布内容",
            position: "middle",
            duration: 1500
          })
        }
      }
    }
  },
  created() {
    /* 初始化板块信息 */
    Axios({
      url: API.getBlockDetail,
      method: "GET",
      params: {
        blockId: this.blockId
      },
      headers: {
        "Authorization": this.token
      }
    }).then(res => {
      this.blockDetail = res.data
    }).catch(err => {
      this.errorHandler(err)
    })

    /* 获取微信 SDK 配置信息 */
    Axios({
      url: API.getWxConfig,
      params: {
        url: window.location.href,
        jsApiList: "startRecord,stopRecord,playVoice,pauseVoice,stopVoice,onVoiceRecordEnd,uploadVoice"
      },
      headers: {
        "Authorization": this.token
      }
    }).then(res => {
      wx.config({
        debug: false,
        appId: res.data.appid,
        nonceStr: res.data.noncestr,
        timestamp: res.data.timestamp,
        signature: res.data.signature,
        jsApiList: res.data.jsApiList
      })
    })
    /* 初始化分类为全部的帖子 */
    Indicator.open({
      text: "加载中...",
      spinnerType: "snake"
    })
    this.getPosts({
      blockId: this.blockId,
      category: this.tabSelected,
      pageNum: this.currentPage,
      limits: 5,
      type: this.type,
      token: this.token
    }).then(res => {
      Indicator.close()
      this.currentPage = res.data.currentPage
      this.maxPage = res.data.totalPage
      this.postList = res.data.dataList
    }).catch(err => {
      Indicator.close()
      this.errorHandler(err)
    })
  }
}
</script>

<style>
body {
  width: 100%;
  height: 100%;
  margin: 0;
}

.input {
  outline: 0;
  border: 0;
  margin: 0;
  appearance: none;
  resize: none;
}

.btn {
  outline: 0;
  border: 0;
  margin: 0;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.community-detail {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px;
  -webkit-text-size-adjust: 100% !important;
}

.block {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  box-sizing: border-box;
  width: 100%;
  height: 180px;
}

.block__book-img {
  display: block;
  flex: 0 0 150px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 0px 10px 0px #c0c0c0;
}

.block__intro {
  flex: 1;
  padding: 0 10px;
}

.book-detail-btn {
  width: 100%;
  height: 25px;
  font-size: 0.9rem;
}

.block__name {
  margin: 10px 0;
  font-size: 1.2rem;
}

.block__intro .block__author,
.block__press,
.block__publish-date {
  margin: 10px 0;
  font-size: 0.9rem;
}

.tab {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 100%;
  height: 40px;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
}

.tab__item {
  flex: none;
  padding: 5px 10px;
  font-size: 0.8rem;
}

.tab__item--active {
  color: #3c89fd;
}

.tab__content {
  width: 100%;
  height: calc(100vh - 210px);
  box-sizing: border-box;
  overflow-y: scroll;
}
.order {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-flow: row nowrap;
  flex-flow: row nowrap;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  /* width: 100%; */
  /* height: 28px; */
  /* overflow-x: scroll; */
  padding: 0px 10px;
  /*background-color: #00d8ff;*/
  -webkit-overflow-scrolling: touch;
}
.type-title {
  font-size: 14px;
  color: #7e7e7e;
}
.order-but {
  position: absolute;
  right: 3%;
  background: transparent; /*完全透明*/
  border: 0;
  color: #7e7e7e;
  outline: none;
}
.order-but img {
  width: 12px;
  position: relative;
  top: 2px;
  left: -2px;
}
.mint-button-text {
  width: 30px;
  font-size: 15px;
}
.btn-add {
  position: fixed;
  bottom: 20px;
  right: 20px;
  outline: 0;
  border: 0;
  background-color: transparent;
  margin: 0;
  padding: 0;
  border-radius: 50%;
}

.icon-add {
  display: block;
  width: 50px;
  height: 50px;
  background: url("../../../static/images/community/add.svg");
}

.publish {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  padding: 0 10px 20px 10px;
  overflow-y: scroll;
  background: #fff;
  z-index: 2;
}

.publish__input {
  box-sizing: border-box;
  width: 100%;
  margin-top: 50px;
  box-shadow: 0 2px 5px #e5e9f2;
}

.input-title {
  box-sizing: border-box;
  width: 100%;
  padding: 10px 5px;
  border-bottom: 1px solid rgba(90, 90, 90, 0.1);
  border-radius: 0;
  font-size: 16px;
  font-weight: 200;
}

.input-description {
  box-sizing: border-box;
  width: 100%;
  word-break: keep-all;
  padding: 10px 5px;
  font-size: 16px;
  font-weight: 200;
}

.publish__type {
  display: flex;
  flex-flow: row wrap;
  font-weight: 200;
  box-sizing: border-box;
  width: 100%;
  margin-top: 10px;
  padding: 10px 20px;
  box-shadow: 0 2px 5px #e5e9f2;
  background-color: #ffffff;
}

.publish-options {
  position: relative;
  margin: 10px 0;
  width: 50%;
}

.publish__radio {
  margin: 5px 0;
  width: 50%;
  display: inline-block;
  line-height: 20px;
}

.publish__radio--check {
  display: block;
  float: left;
  width: 16px;
  height: 16px;
  margin: 2px 0;
  background: url("../../../static/images/Task/choose-act.svg") no-repeat;
  background-size: contain;
}

.publish__radio--uncheck {
  display: block;
  float: left;
  width: 14px;
  height: 14px;
  margin: 2px 0;
  border: 1px solid #ddd;
  border-radius: 50%;
}

.btn-radio {
  width: 1px;
  height: 1px;
  opacity: 0;
}

.publish__upload {
  position: relative;
  box-sizing: border-box;
  border: 3px dashed #e5e9f2;
  width: 100%;
  margin-top: 10px;
}

.input-upload {
  position: absolute;
  width: 100%;
  height: 100%;
  outline: none;
  opacity: 0;
}

.upload-text {
  display: block;
  padding: 60px 0;
  font-size: 20px;
  font-weight: 300;
  text-align: center;
  color: #e5e9f2;
}

.publish__thumbnail {
  margin-top: 10px;
  width: 100%;
}

.publish__control {
  display: flex;
  flex-flow: row nowrap;
  margin-top: 10px;
}

.btn-remove,
.btn-submit {
  font-weight: 200;
  display: block;
  width: 100%;
  height: 45px;
  background-color: #3c89fd;
  box-shadow: 0 2px 5px #e5e9f2;
  font-size: 18px;
  color: #fff;
}

.btn-remove {
  margin-right: 10px;
  background-color: #ff4949;
}

.btn-quit {
  position: absolute;
  display: flex;
  align-items: center;
  top: 15px;
  left: 5px;
  padding: 0;
  background: none;
}

.quit-icon {
  display: block;
  width: 22px;
  height: 22px;
  background-image: url("../../../static/images/community/left-arrow.svg");
}

.quit-text {
  font-size: 16px;
  color: #3c89fd;
}

@media all and (max-width: 320px) {
  .block__book-img {
    flex: 0 0 120px;
  }

  .block__intro {
    padding: 0 5px;
  }

  .block__name {
    margin: 5px 0;
  }

  .block__intro .block__author,
  .block__press,
  .block__publish-date {
    font-size: 0.8rem;
  }
}

.post-list {
  position: absolute;
  top: 255px;
  bottom: 10px;
  left: 10px;
  right: 10px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

.no-post {
  color: #969696;
  font-weight: 300;
  text-align: center;
}

.voice-recording,
.voice-control,
.countdown-timer {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;
}

.btn-voice {
  display: block;
  border: 0;
  outline: 0;
  background: none;
}

.countdown-timer {
  font-size: 12px;
}

.icon-start-record {
  display: block;
  width: 50px;
  height: 50px;
  background-image: url("../../../static/images/community/record.svg");
}

.icon-stop-record {
  display: block;
  width: 50px;
  height: 50px;
  background-image: url("../../../static/images/community/stop-record.svg");
}

.icon-play {
  display: block;
  width: 25px;
  height: 25px;
  background-image: url("../../../static/images/community/start.svg");
}

.icon-pause {
  display: block;
  width: 25px;
  height: 25px;
  background-image: url("../../../static/images/community/pause.svg");
}

.icon-stop {
  display: block;
  width: 25px;
  height: 25px;
  background-image: url("../../../static/images/community/stop.svg");
}

.comment {
  width: 80%;
  height: 30%;
  background-color: green;
  z-index: 1000;
  left: 10%;
  position: absolute;
  border-radius: 16px;
  text-align: center;
}

.comment__title {
  position: relative;
  top: 5%;
  left: 35%;
  height: 15%;
  letter-spacing: 20px;
  font-size: 20px;
  font-weight: bold;
  width: 30%;
  text-align: center;
  background-color: #ff4949;
}
.comment__title span {
  position: relative;
  width: 80%;
  left: 0;
  padding-left: 11%;
}
.comment__content {
  position: relative;
  top: 10%;
  width: 80%;
  height: 50%;
  left: 10%;
  background-color: orange;
}

.comment__confirm {
  position: relative;
  top: 15%;
  left: 70%;
  width: 20%;
  height: 10%;
  border: 1px solid;
  color: blue;
  padding: 2px;
  font-size: 20px;
  vertical-align: center;
}
.comment__confirm button {
  font-size: 16px;
  padding: 3px;
  color: blue;
  vertical-align: center;
}

.background {
  width: 100%;
  height: 100%;
  position: fixed;
  opacity: 0.7;
  background-color: #000;
  z-index: 500;
}
.makeSure {
  width: 100%;
  height: 48px;
  border: 1px solid #afafaf;
  text-align: center;
  font-size: 18px;
  color: #ffffff;
  background-color: #afafaf;
  outline: none;
  margin-bottom: 20px;
}
.successUpload {
  color: #1f96e6;
  display: block;
  padding: 60px 0;
  font-size: 20px;
  font-weight: 300;
  text-align: center;
}
.uploader-example {
  text-align: center;
  font-size: 14px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
.uploader-example .uploader-btn {
  margin-right: 4px;
}
.uploader-example .uploader-list {
  max-height: 440px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
