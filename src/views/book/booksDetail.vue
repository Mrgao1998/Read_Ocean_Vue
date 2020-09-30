<template>
  <div class="container">
    <!--书籍基本信息-->
    <div class="book-detail__head">
      <div class="book-img">
        <img :src="bookDetail.coverImg" />
      </div>
      <div class="book-info">
        <h1 class="book-info__title">{{ bookDetail.title }}</h1>
        <p class="book-info__browse">
          <span>{{ bookDetail.readingNum }}人正在阅读</span>
          <span>{{ bookDetail.readNum }}人读过</span>
        </p>
        <br />
        <button class="answer-btn" @click="answerStart" v-if="judgeIfAnswer()">
          回答问题
        </button>
        <mt-button
          type="primary"
          class="evaluate-btn"
          v-if="!bookDetail.hasComment && bookDetail.isDone"
          @touchend.native="evaPopupVisible = !evaPopupVisible"
          >评价</mt-button
        >
        <mt-button
          type="primary"
          class="evaluate-btn"
          v-else-if="bookDetail.hasComment && bookDetail.isDone"
          :disabled="true"
          >已评价</mt-button
        >
        <mt-button
          type="primary"
          class="buy-btn2"
          v-if="buyQuestion"
          @touchend.native="payReadIndividual()"
          >购买书籍服务
        </mt-button>
        <mt-button
          type="primary"
          class="buy-btn"
          v-if="judgeIfHasBuy()"
          @touchend.native="buyBooks(bookDetail.buySrc.src)"
          >购买书籍</mt-button
        >
        <mt-button
          type="primary"
          class="buy-btn_disable"
          v-else-if="bookDetail.buySrc === null"
          disabled="disabled"
        >
          暂无库存</mt-button
        >
        <!--评价框组件-->
        <evaluatePopup
          @close="evaPopupVisible = !evaPopupVisible"
          @submitEva="handleSubmit"
          :evaPopupShow="evaPopupVisible"
          :allEvaOptions="bookDetail.comments"
        ></evaluatePopup>
      </div>
      <div
        class="creature"
        v-if="bookDetail.hasTask && schoolId !== '4419001'"
        :prop="(animalExist = true)"
      >
        <img
          class="creature__img"
          :src="bookDetail.creature.img"
          alt="海洋生物图片"
          width="70px;"
        />
        <p class="creature__name" style="text-align: center; margin: 0">
          {{ bookDetail.creature.name }}
        </p>
      </div>
      <div
        class="choose-creature"
        v-if="
          !bookDetail.hasTask && role === 'student' && schoolId !== '4419001'
        "
        :prop="(animalExist = false)"
      >
        <div class="choose-btn" @click="loadCreature()">
          <span class="choose-creature-img">
            <img src="../../../static/images/Book/add-circular-button.png" />
            <small>选择海洋生物</small>
          </span>
        </div>
        <div class="choose-creature-remind">
          选择海洋生物之后
          <br />方可进行答题
        </div>
      </div>
    </div>
    <div class="community-warm">
      <a
        :href="
          '/ReadingOcean/wechat/communityDetail?blockId=' + bookDetail.blockId
        "
        class="community-link"
        v-if="judgeIfBuy()"
        >前往作品社区</a
      >
      <span>读后感，思维导图，朗诵等任务提交</span>
    </div>
    <div class="parental-evaluate" v-if="bookDetail.hasComment">
      <h1 class="eva-title">评价</h1>
      <div class="eva-content">
        <span class="selected-eva" v-for="val in evaluations">{{ val }}</span>
      </div>
    </div>
    <!-- tab组件-书籍详情 -->
    <div class="tab">
      <div
        @touchend="tabSelected = 'book-intro'"
        class="tab__item"
        :class="{ 'tab__item--active': tabSelected === 'book-intro' }"
      >
        书籍简介
      </div>
      <div
        v-if="role === 'student'"
        @touchend="tabSelected = 'answer-record'"
        class="tab__item"
        :class="{ 'tab__item--active': tabSelected === 'answer-record' }"
      >
        答题记录
      </div>
      <div
        @touchend="tabSelected = 'micro-video'"
        class="tab__item"
        :class="{ 'tab__item--active': tabSelected === 'micro-video' }"
      >
        微课视频
      </div>
    </div>
    <!--书籍简介-->
    <div class="book-intro-wrap" v-if="tabSelected === 'book-intro'">
      <div class="book-intro__head">
        <p>
          作者：
          <span>{{ bookDetail.author }}</span>
        </p>
        <p>
          出版社：
          <span>{{ bookDetail.press }}</span>
        </p>
        <p>
          出版时间：
          <span>{{ bookDetail.publishDate | formatDate }}</span>
        </p>
      </div>
      <!-- 后台传入的书籍介绍为 html 文本 -->
      <div class="small-title">简介</div>
      <div class="book-intro__content" v-html="bookDetail.introduction"></div>
      <div class="small-title">编辑推荐</div>
      <div class="book-intro__content" v-html="bookDetail.review"></div>
    </div>
    <!--答题记录-->
    <div class="answer-record-wrap" v-else-if="tabSelected === 'answer-record'">
      <div class="answer-detail" v-for="record in bookDetail.records">
        <p>答题时间：{{ record.date | formatDate }}</p>
        <p>正确率：{{ record.accuracy | formatAccuracy }}</p>
        <p>用时：{{ record.consume }}秒</p>
      </div>
    </div>
    <!--微课视频-->
    <div v-else-if="tabSelected === 'micro-video'">
      <div class="course" v-for="course in bookDetail.courses">
        <a class="course__link" :href="course.video"
          >《{{ course.title }}》 -- {{ course.author }}</a
        >
      </div>
    </div>

    <!--选择海洋生物-->
    <transition name="slide">
      <div class="creature-selection" v-if="selectVisibile">
        <div class="creature-content">
          <!-- tab组件-选择海洋生物 -->
          <div class="tab">
            <div
              @touchend="creatureTabSelected = 'slide'"
              class="tab__item"
              :class="{ 'tab__item--active': creatureTabSelected === 'slide' }"
            >
              轮播选择
            </div>
            <div
              @touchend="creatureTabSelected = 'img'"
              class="tab__item"
              :class="{ 'tab__item--active': creatureTabSelected === 'img' }"
            >
              图片选择
            </div>
          </div>
          <div class="creature-category">
            <button
              class="category-btn"
              v-for="cate in creatureCate"
              v-bind:class="{
                'category-btn-active': selectedCate === cate.value,
              }"
              @click="categoryBtnActive(cate.value)"
            >
              {{ cate.label }}
            </button>
          </div>
          <div class="creature-slider" v-if="creatureTabSelected === 'slide'">
            <mt-swipe
              :auto="0"
              @change="handleChange"
              :defaultIndex="activeCreatureIndex"
            >
              <mt-swipe-item
                class="creature-slider__item"
                v-for="creature in creatureList"
                :key="creature.id"
              >
                <img :src="creature.img" class="creature-slider__img" />
              </mt-swipe-item>
            </mt-swipe>
          </div>
          <div class="creature-grid" v-else-if="creatureTabSelected === 'img'">
            <div
              class="creature-grid__item"
              v-for="(val, index) in creatureList"
              :key="val.id"
              :class="{
                'creature-grid__item--active': activeCreatureIndex === index,
              }"
              @click="imgWrapActive(index)"
            >
              <img :src="val.img" class="creature-grid__img" />
            </div>
          </div>
          <button class="change-btn" @click="changeCreatureList()">
            换一批试试
          </button>
          <div class="creature-info" v-if="currentCreatureInfo">
            <h1 class="creature-name">{{ currentCreatureInfo.name }}</h1>
            <p class="required-level">
              <i class="medal-icon"></i>
              获取等级：{{ currentCreatureInfo.level }}
            </p>
            <p class="possess-num">
              <i class="owner-icon"></i>
              已经拥有：{{ currentCreatureInfo.hasNum }}
            </p>
            <p class="intro-title">简介</p>
            <p class="creature-info__intro">
              {{ currentCreatureInfo.introduction }}
            </p>
          </div>
        </div>
        <div class="creature-actions">
          <button
            class="creature-img-close"
            @click="selectVisibile = !selectVisibile"
          >
            返回
          </button>
          <button class="creature-choose" @click="confirmCreature()">
            确定
          </button>
        </div>
      </div>
    </transition>
    <!-- 答题板块 -->
    <transition name="slide">
      <div class="creature-answer" v-if="answerVisibile">
        <div class="answer-body">
          <p class="answer-time">
            时间：
            <span>{{ minute }}分{{ second }}秒</span>
          </p>
          <p>题数:{{ questionlen }}</p>

          <div v-for="(que, index) in question" :index="index">
            <!-- 判断 -->
            <div
              class="area-tf"
              v-if="
                que.answer.length == 1 &&
                (que.answer == '1' || que.answer == '0')
              "
            >
              <p class="question">
                <span>第{{ index + 1 }}题</span>
                <span class="label-question">判断题</span>
                <span class="content-question">{{ que.question }}</span>
              </p>
              <ul>
                <li value="1" @click="choiceTFAnswer($event, index)">对</li>
                <li value="0" @click="choiceTFAnswer($event, index)">错</li>
              </ul>
              <span class="feedback-btn" @click="feedbackMethod($event)"
                >这道题有错，点我反馈 >></span
              >
            </div>
            <!-- 多选 -->
            <div class="area-multiple" v-else-if="que.answer.length > 1">
              <p class="question">
                <span>第{{ index + 1 }}题</span>
                <span class="label-question">多选题</span>
                <span class="content-question">{{ que.question }}</span>
              </p>
              <ul class="duo">
                <li
                  value="A"
                  v-if="que.choiceA"
                  @click="choiceMAnswer($event, index)"
                >
                  A、{{ que.choiceA }}
                </li>
                <li
                  value="B"
                  v-if="que.choiceB"
                  @click="choiceMAnswer($event, index)"
                >
                  B、{{ que.choiceB }}
                </li>
                <li
                  value="C"
                  v-if="que.choiceC"
                  @click="choiceMAnswer($event, index)"
                >
                  C、{{ que.choiceC }}
                </li>
                <li
                  value="D"
                  v-if="que.choiceD"
                  @click="choiceMAnswer($event, index)"
                >
                  D、{{ que.choiceD }}
                </li>
                <li
                  value="E"
                  v-if="que.choiceE"
                  @click="choiceMAnswer($event, index)"
                >
                  E、{{ que.choiceE }}
                </li>
                <li
                  value="F"
                  v-if="que.choiceF"
                  @click="choiceMAnswer($event, index)"
                >
                  F、{{ que.choiceF }}
                </li>
              </ul>
              <span class="feedback-btn" @click="feedbackMethod($event)"
                >这道题有错，点我反馈 >></span
              >
            </div>
            <!-- 单选 -->
            <div
              class="area-single"
              v-else="
                que.answer.length == 1 &&
                (que.answer == '1' || que.answer == '0')
              "
            >
              <p class="question">
                <span>第{{ index + 1 }}题</span>
                <span class="label-question">单选题</span>
                <span class="content-question">{{ que.question }}</span>
              </p>
              <ul>
                <li
                  value="A"
                  v-if="que.choiceA"
                  @click="choiceSAnswer($event, index)"
                >
                  A、{{ que.choiceA }}
                </li>
                <li
                  value="B"
                  v-if="que.choiceB"
                  @click="choiceSAnswer($event, index)"
                >
                  B、{{ que.choiceB }}
                </li>
                <li
                  value="C"
                  v-if="que.choiceC"
                  @click="choiceSAnswer($event, index)"
                >
                  C、{{ que.choiceC }}
                </li>
                <li
                  value="D"
                  v-if="que.choiceD"
                  @click="choiceSAnswer($event, index)"
                >
                  D、{{ que.choiceD }}
                </li>
              </ul>
              <span class="feedback-btn" @click="feedbackMethod($event)"
                >这道题有错，点我反馈 >></span
              >
            </div>
          </div>
        </div>
        <div class="answer-foot">
          <button class="answer-footLeft" @click="answerStop()">返回</button>
          <button class="answer-footRight" @click="answerFinish()">提交</button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Book from "../../components/common/book/Book.vue";
import Evaluate from "../../components/common/evaluate/evaluate.vue";
import Axios from "axios";
import * as API from "../../api/api.js";
import creatureCate from "../../utils/creatrueCate.js";
import user from "../../mixins/user.js";
import errorHandler from "../../mixins/errorHandler.js";
import { Toast, MessageBox } from "mint-ui";
import { Dialog } from "vant";
// import wx from "weixin-js-sdk"
export default {
  mixins: [user, errorHandler],
  data() {
    return {
      creatureCate: creatureCate,
      tabSelected: "book-intro",
      creatureTabSelected: "slide",
      selectVisibile: false,
      selectedCate: null,
      evaPopupVisible: false,
      evaluations: [],
      bookDetail: {},
      creatureList: [],
      currentPage: 1,
      activeCreatureIndex: 0,
      maxPage: 100,
      animalExist: false,
      answerVisibile: false,
      totalSecond: 0,
      minute: 0,
      second: 0,
      clock: null,
      singlequestion: [],
      multiplequestion: [],
      tfquestion: [],
      question: [],
      questionlen: 0,
      answerList: [],
      // 存储错误题目的编号
      wronganswerList: [],
      rightAnswer: [],
      userAnswer: [],
      mulen: 0,
      tflen: 0,
      anslen: [],
      isCorrect: [],
      title: null,
      warmMessage: null,
      buyQuestion: false,
    };
  },
  computed: {
    bookId() {
      var usp = new URLSearchParams(window.location.href.split("?")[1]);
      // usp.get("bookId")
      // console.log("this boodId is " + usp.get("bookId"))
      return usp.get("bookId");
    },
    code() {
      var usp = new URLSearchParams(window.location.href.split("?")[1]);
      return usp.get("code");
    },
    currentCreatureInfo() {
      return this.creatureList[this.activeCreatureIndex];
    },
  },
  filters: {
    formatDate(mm) {
      if (mm) {
        var date = new Date(mm);
        var year = date.getFullYear();
        var month =
          date.getMonth() + 1 >= 10
            ? date.getMonth() + 1
            : "0" + (date.getMonth() + 1);
        var day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
        return year + "-" + month + "-" + day;
      } else {
        return "";
      }
    },
    formatAccuracy(val) {
      return Math.ceil(Number(val * 100)) + "%";
    },
  },
  components: {
    bookImg: Book,
    evaluatePopup: Evaluate,
  },
  methods: {
    handleChange(index) {
      this.activeCreatureIndex = index;
    },
    payReadIndividual() {
      Axios({
        url: API.payReadIndividual,
        method: "GET",
        params: {
          bookId: this.bookId,
        },
        headers: {
          Authorization: this.token,
        },
      })
        .then((res) => {
          // var id1 = this.bookId
          window.WeixinJSBridge.invoke(
            "getBrandWCPayRequest",
            {
              appId: res.data.data.appId, // 公众号名称，由商户传入
              timeStamp: res.data.data.timeStamp, // 时间戳，自1970年以来的秒数
              nonceStr: res.data.data.nonceStr, // 随机串
              package: res.data.data.package,
              signType: res.data.data.signType, // 微信签名方式：
              paySign: res.data.data.paySign, // 微信签名
            },
            function (res) {
              if (res.err_msg === "get_brand_wcpay_request:ok") {
                // 使用以上方式判断前端返回,微信团队郑重提示：
                // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                this.buyQuestion = false;
                document.location.assign("/ReadingOcean/wechat/home");
              }
            }
          );
        })
        .catch((err) => {
          console.log(err);
          this.errorHandler(err);
        });
    },
    judgeIfAnswer() {
      if (
        this.schoolId === "4419001" ||
        (this.animalExist &&
          !this.bookDetail.hasComment &&
          this.bookDetail.isDone === false)
      ) {
        if (this.code === "200") {
          return true;
        } else {
          this.buyQuestion = true; // 显示购买回答问题权限按钮
          // alert("还未购买此书 无法答题")
          return false;
        }
      } else {
        return false;
      }
      // schoolId === '4419001' || (animalExist && !bookDetail.hasComment && bookDetail.isDone===false)
    },
    judgeIfBuy() {
      if (this.code === "200") {
        return true;
      } else {
        return false;
      }
    },
    judgeIfHasBuy() {
      if (this.code === 200) {
        // 200说明可以免费答题不用买
        return false;
      } else {
        return true;
      }
    },
    categoryBtnActive: function (cate) {
      this.activeCreatureIndex = 0;
      if (this.selectedCate !== cate) {
        this.selectedCate = cate;
        Axios({
          url: API.getCreatures,
          method: "GET",
          params: {
            userId: this.userId,
            category: this.selectedCate,
            pageNum: this.currentPage,
            limits: 9,
          },
          headers: {
            Authorization: this.token,
          },
        })
          .then((res) => {
            this.creatureList = res.data.dataList;
            this.currentPage = res.data.currentPage;
            this.maxPage = res.data.totalPage;
          })
          .catch((err) => {
            this.errorHandler(err);
          });
      }
    },
    imgWrapActive: function (index) {
      this.activeCreatureIndex = index;
    },
    handleSubmit(items) {
      /* 构造新的已评价内容 */
      Axios({
        url: API.makebookComment,
        method: "POST",
        params: {
          bookId: this.bookId,
          userId: this.userId,
          comments: JSON.stringify(items),
        },
        headers: {
          Authorization: this.token,
        },
      })
        .then((res) => {
          Toast({
            message: res.data.msg,
            position: "middle",
            duration: 1500,
          });
          this.evaPopupVisible = false;
          this.evaluations = items;
          this.bookDetail.hasComment = true;
        })
        .catch((err) => {
          this.errorHandler(err);
        });
    },
    /* 加载海洋生物列表方法 */
    getCreatures(config) {
      return Axios({
        url: API.getCreatures,
        method: "GET",
        params: {
          userId: config.userId,
          category: config.category,
          pageNum: config.pageNum,
          limits: config.limits,
        },
        headers: {
          Authorization: config.token,
        },
      });
    },
    /* 初始化海洋生物方法 */
    loadCreature() {
      this.selectVisibile = !this.selectVisibile;
      if (this.creatureList.length === 0) {
        this.getCreatures({
          userId: this.userId,
          category: this.selectedCate,
          pageNum: this.currentPage,
          limits: 9,
          token: this.token,
        })
          .then((res) => {
            this.creatureList = res.data.dataList;
            this.currentPage = res.data.currentPage;
            this.maxPage = res.data.totalPage;
          })
          .catch((err) => {
            this.errorHandler(err);
          });
      }
    },
    /* 更换海洋生物请求页数 */
    changeCreatureList() {
      if (this.currentPage < this.maxPage) {
        this.activeCreatureIndex = 0;
        this.currentPage += 1;
        this.getCreatures({
          userId: this.userId,
          category: this.selectedCate,
          pageNum: this.currentPage,
          limits: 9,
          token: this.token,
        })
          .then((res) => {
            this.creatureList = res.data.dataList;
          })
          .catch((err) => {
            this.errorHandler(err);
          });
      } else {
        this.activeCreatureIndex = 0;
        this.currentPage = 1;
        this.getCreatures({
          userId: this.userId,
          category: this.selectedCate,
          pageNum: this.currentPage,
          limits: 9,
          token: this.token,
        })
          .then((res) => {
            this.currentPage = res.data.currentPage;
            this.creatureList = res.data.dataList;
          })
          .catch((err) => {
            this.errorHandler(err);
          });
      }
    },
    /* 订阅书籍，确认选择海洋生物 */
    confirmCreature() {
      Dialog.confirm({
        title: "提示",
        message: "确定订阅本书籍?",
      }).then((action) => {
        if (action === "confirm") {
          Axios({
            url: API.subscribeBook,
            method: "POST",
            params: {
              bookId: this.bookId,
              userId: this.userId,
              creatureId: this.currentCreatureInfo.id,
            },
            headers: {
              Authorization: this.token,
            },
          })
            .then((res) => {
              Toast({
                message: res.data.msg,
                position: "middle",
                duration: 1500,
              });
              this.bookDetail.hasTask = true;
              this.bookDetail.creature = {
                name: this.currentCreatureInfo.name,
                img: this.currentCreatureInfo.img,
              };
              this.selectVisibile = false;
            })
            .catch((err) => {
              this.errorHandler(err);
            });
        }
      });
    },
    init() {
      // 初始化
      for (var i = 0; i < 100; i++) {
        this.anslen[i] = 0;
        this.isCorrect[i] = 0;
      }
      this.answerList = [];
      this.wronganswerList = [];
      // console.log(this.isCorrect)
    },
    timeStart() {
      // 开始计时
      ++this.totalSecond;
      this.minute = Math.floor(this.totalSecond / 60);
      this.second = this.totalSecond - this.minute * 60;
    },
    answerStop() {
      // 返回书籍详情，本次答题无效
      this.answerVisibile = !this.answerVisibile;
      clearInterval(this.clock);
      this.second = 0;
      this.minute = 0;
      this.totalSecond = 0;
      this.questionlen = 0;
      this.question = [];
    },
    answerFinish() {
      // 完成答题，调用函数提交
      // 判断是否答完所有题目
      var num = 0;
      for (var i = 0; i < this.question.length; i++) {
        if (this.anslen[i] !== 0) {
          num++;
        }
      }
      if (num === this.questionlen) {
        clearInterval(this.clock);
        this.checkAnswer();
        this.addJson();
        this.postJson();
      } else {
        Dialog.alert({
          title: "警告",
          message: "您还没有完成全部题目的回答",
        });
      }
    },
    answerStart() {
      // 可能出错原因：获取单选题，判断题，多选题是一层一层嵌套的，如果获取不到上一层，那么下一层也不能被获取到
      /* 步步高小学答题前需要订阅书籍 */
      if (this.schoolId === "4419001") {
        Axios({
          url: API.infoIsSub,
          method: "GET",
          params: {
            bookId: this.bookId,
            userId: this.userId,
          },
          headers: {
            Authorization: this.token,
          },
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
            this.errorHandler(err);
          });
      }
      var i = 0;
      Axios({
        url: API.getSingleq,
        method: "GET",
        params: {
          bookId: this.bookId,
        },
        headers: {
          Authorization: this.token,
        },
      }).then((res) => {
        // console.log(res)
        this.singlequestion = res.data.dataList;
        this.questionlen += this.singlequestion.length;
        for (var j = 0; j < this.singlequestion.length; j++) {
          this.question.push(this.singlequestion[j]);
          this.rightAnswer[i] = this.singlequestion[j].answer;
          i++;
          this.tflen = i;
        }
        Axios({
          url: API.getTruefalseq,
          method: "GET",
          params: {
            bookId: this.bookId,
          },
          headers: {
            Authorization: this.token,
          },
        }).then((res) => {
          // console.log(res.data)
          this.tfquestion = res.data.dataList;
          this.questionlen += this.tfquestion.length;
          for (var j = 0; j < this.tfquestion.length; j++) {
            this.question.push(this.tfquestion[j]);
            this.rightAnswer[i] = this.tfquestion[j].answer;
            i++;
            this.mulen = i;
          }
          Axios({
            url: API.getMultipleq,
            method: "GET",
            params: {
              bookId: this.bookId,
            },
            headers: {
              Authorization: this.token,
            },
          }).then((res) => {
            // console.log(res.data)
            this.multiplequestion = res.data.dataList;
            this.questionlen += this.multiplequestion.length;
            for (var j = 0; j < this.multiplequestion.length; j++) {
              this.question.push(this.multiplequestion[j]);
              this.rightAnswer[i] = this.multiplequestion[j].answer;
              i++;
            }
          });
        });
      });
      this.init();
      // console.log(this.question)
      // console.log(this.rightAnswer)
      this.answerVisibile = !this.answerVisibile;
      this.clock = setInterval(this.timeStart, 1000);
    },
    choiceSAnswer($e, index) {
      if ($e.currentTarget.className === "choice") {
        $e.currentTarget.className = "";
        this.anslen[index] = 0;
      } else {
        var child = $e.currentTarget.parentNode.children;
        for (var i = 0; i < child.length; i++) {
          child[i].className = "";
        }
        $e.currentTarget.className = "choice";
        this.anslen[index] = 1;
        // console.log($e.path[0].attributes)
      }
    },
    choiceMAnswer($e, index) {
      if ($e.currentTarget.className === "choice") {
        $e.currentTarget.className = "";
        this.anslen[index]--;
      } else {
        $e.currentTarget.className = "choice";
        this.anslen[index]++;
        // console.log($e.path[0])
      }
    },
    choiceTFAnswer($e, index) {
      if ($e.currentTarget.className === "choice") {
        $e.currentTarget.className = "";
        this.anslen[index] = 0;
      } else {
        var child = $e.currentTarget.parentNode.children;
        for (var i = 0; i < child.length; i++) {
          child[i].className = "";
        }
        $e.currentTarget.className = "choice";
        this.anslen[index] = 1;
        // console.log($e.path[0])
      }
    },
    checkAnswer() {
      // 把所有题的答案对错存进isCorrect数组里面
      var choices = document.getElementsByClassName("choice");
      // console.log(choices)
      for (var i = 0; i < this.mulen; i++) {
        this.userAnswer[i] = choices[i].attributes[0].nodeValue;
      }
      var dislocation = 0;
      for (var k = this.mulen; k < this.rightAnswer.length; k++) {
        var temp = "";
        if (k === this.mulen) {
          dislocation = 0;
        } else {
          dislocation += this.anslen[k - 1] - 1;
        }
        // console.log("dislocation", dislocation)
        for (
          var j = k + dislocation;
          j < k + dislocation + this.anslen[k];
          j++
        ) {
          // console.log("j", j)
          // console.log("k", k)
          temp += choices[j].attributes[0].nodeValue;
        }
        this.userAnswer[k] = temp;
      }
      // console.log(this.userAnswer)
      var count = 0;
      for (var g = 0; g < this.rightAnswer.length; g++) {
        // this.isCorrect[]数组里面 的值等于1的就代表第g+1题正确,否则0为错误
        if (this.userAnswer[g] === this.rightAnswer[g]) {
          this.isCorrect[g] = 1;
          count++;
          // eslint-disable-next-line brace-style
        }
        // 高燕生加
        else {
          this.wronganswerList[this.wronganswerList.length] = g + 1;
        }
      }
      // 高燕生加
      var wronganswerstr = "";
      for (var z = 0; z < this.wronganswerList.length; z++) {
        wronganswerstr += this.wronganswerList[z] + " ";
      }

      var grade = Math.ceil((count * 100) / this.questionlen);
      // this.questionlen为 问题总数  count 为正确的数目
      this.makeDetail(grade, count, this.questionlen - count, wronganswerstr);
    },
    makeDetail(grade, trueNum, falseNum, wrongnumber) {
      // 对成绩进行等级划分，给与一个弹出框
      if (grade >= 90) {
        this.title = "太厉害了，你真棒！";
      } else if (grade >= 60 && grade < 90) {
        this.title = "恭喜你，通过测试！";
      } else if (grade >= 40 && grade <= 60) {
        this.title = "差一点点，再读多一会儿书吧！";
      } else {
        this.title = "静下心来，仔细阅读吧！";
      }
      this.warmMessage = "正确题数：" + trueNum + "<br>";
      this.warmMessage += "错误题数：" + falseNum + "<br>";
      this.warmMessage += "正确率：" + grade + "%<br>";
      this.warmMessage += "错误题号：" + wrongnumber + "<br>";
      this.warmMessage +=
        "用时：" + this.minute + "分" + this.second + "秒<br>";
      // console.log(this.title)
    },
    addJson() {
      // 把数据打包成一个json数据
      this.answerList += "[";
      var nowdate = new Date().valueOf();
      for (var i = 0; i < this.tflen; i++) {
        var temp = JSON.stringify({
          bookId: this.bookId,
          questionId: this.question[i].id,
          questionType: "single",
          datetime: nowdate,
          duration:
            i === this.question.length - 1 ? this.minute * 60 + this.second : 0,
          answer: this.userAnswer[i],
          isCorrect: this.isCorrect[i],
        });
        if (i !== this.question.length - 1) {
          this.answerList += temp + ",";
        } else {
          this.answerList += temp;
        }
      }
      for (var j = this.tflen; j < this.mulen; j++) {
        var temp1 = JSON.stringify({
          bookId: this.bookId,
          questionId: this.question[j].id,
          questionType: "trueOrFalse",
          datetime: nowdate,
          duration:
            j === this.question.length - 1 ? this.minute * 60 + this.second : 0,
          answer: this.userAnswer[j],
          isCorrect: this.isCorrect[j],
        });
        if (j !== this.question.length - 1) {
          this.answerList += temp1 + ",";
        } else {
          this.answerList += temp1;
        }
      }
      if (this.mulen === 0 && this.tflen === 0) {
        for (var l = 0; l <= this.question.length - 1; l++) {
          var temp3 = JSON.stringify({
            bookId: this.bookId,
            questionId: this.question[l].id,
            questionType: "multiple",
            datetime: nowdate,
            duration:
              l === this.question.length - 1
                ? this.minute * 60 + this.second
                : 0,
            answer: this.userAnswer[l],
            isCorrect: this.isCorrect[l],
          });
          if (l !== this.question.length - 1) {
            this.answerList += temp3 + ",";
          } else {
            this.answerList += temp3;
          }
        }
      } else if (
        this.mulen !== 0 ||
        (this.mulen === 0 &&
          this.tflen !== 0 &&
          this.tflen !== this.question.length)
      ) {
        for (var k = this.mulen; k <= this.question.length - 1; k++) {
          var temp2 = JSON.stringify({
            bookId: this.bookId,
            questionId: this.question[k].id,
            questionType: "multiple",
            datetime: nowdate,
            duration:
              k === this.question.length - 1
                ? this.minute * 60 + this.second
                : 0,
            answer: this.userAnswer[k],
            isCorrect: this.isCorrect[k],
          });
          if (k !== this.question.length - 1) {
            this.answerList += temp2 + ",";
          } else {
            this.answerList += temp2;
          }
        }
      }
      // console.log(this.tflen + "," + this.mulen)
      this.answerList += "]";
      // console.log(this.question.length)
      // console.log(this.answerList)
    },
    postJson() {
      // 数据上传
      Axios({
        url: API.addAnswerDetail,
        method: "POST",
        params: {
          detailJson: this.answerList,
          bookId: this.bookId,
          sessionUserId: sessionStorage.getItem(API.userIdKey),
        },
        headers: {
          Authorization: this.token,
        },
      })
        .then((res) => {
          // console.log(res)
          Dialog.alert({
            title: this.title,
            message: this.warmMessage,
          }).then((action) => {
            location.reload();
          });
          this.title = null;
          this.warmMessage = null;
        })
        .catch((res) => {
          console.log(res);
          // alert("服务器异常,上传失败")
          Dialog.alert({
            title: "警告",
            message: "服务器异常,上传失败",
          });
          this.title = null;
          this.warmMessage = null;
          this.second = 0;
          this.minute = 0;
          this.totalSecond = 0;
          this.questionlen = 0;
          this.question = [];
          this.anslen = [];
        });
    },
    feedbackMethod(event) {
      var feedBackText =
        "bookId:" +
        this.bookId +
        ",题目名:" +
        event.currentTarget.parentNode.firstChild.lastChild.textContent;
      MessageBox.prompt("请输入您的反馈内容").then(({ value, action }) => {
        feedBackText += ",反馈的内容为:" + value;
        console.log(feedBackText);
        Axios({
          url: API.sendFeedback,
          method: "POST",
          params: {
            userId: this.userId,
            feedback: feedBackText,
          },
        })
          .then((res) => {
            Toast({
              message: res.data.message,
              position: "middle",
              duration: 1500,
            });
          })
          .catch((err) => {
            this.errorHandler(err);
          });
      });
    },
    // 购买书籍
    buyBooks(src) {
      window.location.href =
        "http://mp.weixin.qq.com/bizmall/malldetail?id=&pid=" +
        src +
        "&biz=MzUxOTU3MDg5Ng==&scene=&action=show_detail&showwxpaytitle=1#wechat_redirect";
      // wx.openProductSpecificView({
      //   productId: src, // 商品id
      //   viewType: 0 // 0.默认值，普通商品详情页1.扫一扫商品详情页2.小店商品详情页
      // })
    },
  },
  created() {
    Axios({
      url: API.getBookDetail,
      method: "GET",
      params: {
        bookId: this.bookId,
        userId: this.userId,
        schoolId: this.schoolId,
        userType: this.userType,
      },
      headers: {
        Authorization: this.token,
      },
    })
      .then((res) => {
        console.log(this.code);
        // console.log(res)
        this.bookDetail = res.data;
        // console.log(this.bookDetail)
        this.evaluations = this.bookDetail.comments;
      })
      .catch((err) => {
        this.errorHandler(err);
      });
  },
};
</script>
<style>
::-webkit-scrollbar {
  display: none;
}

body {
  padding: 0;
  margin: 0;
  width: 100%;
  color: #324057;
  -webkit-text-size-adjust: 100% !important;
}

.container {
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  padding-bottom: 10px;
}

.book-detail__head {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  padding: 10px 10px 5px 10px;
  background-color: #fff;
  /* box-shadow: 0 1px 5px #E5E9F2; */
}

.book-img {
  flex: 1;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 0px 10px 0px #c0c0c0;
}

.book-img img {
  height: 100%;
  width: 100%;
}

.book-info {
  box-sizing: border-box;
  flex: 1;
  padding: 0 10px 0 11px;
}

.book-info__title {
  font-size: 1.2em;
  font-weight: 500;
  margin: 5px 0 0 0;
}

.book-info__browse {
  margin: 5px 0 0 0;
  height: auto;
}

.book-info__browse span {
  font-size: 0.6em;
  color: #707274;
  margin-right: 5px;
}

.creature {
  width: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.creature__img {
  width: 100%;
}

.creature__name {
  margin: 0;
  font-size: 14px;
  color: #707274;
  text-align: center;
}

.ocean-community-btn {
  display: block;
  font-size: 0.6em;
  height: auto;
  margin-top: 5px;
  width: 80%;
  padding: 5% 0;
  border-radius: 20px;
  box-shadow: 0 3px 5px #e5e9f2;
}

.choose-creature {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  box-sizing: border-box;
}

.choose-btn {
  position: relative;
  bottom: 10px;
  width: 80%;
  line-height: 1;
  border-radius: 10px;
  border: solid 2px #eee;
  text-align: center;
  box-shadow: 0 1px 5px #e5e9f2;
  padding: 8% 0;
}

.choose-creature-img {
  display: block;
  margin: auto;
  width: 50%;
  opacity: 0.5;
}

.choose-creature-img small {
  font-size: 0.7em;
  color: #333;
}

.choose-creature-img img {
  width: 100%;
}

.choose-creature-remind {
  font-size: 0.7rem;
  text-align: center;
  color: rgb(163, 170, 180);
}

.small-title {
  margin-left: -10px;
  border-left: 4px solid #26a2ff;
  padding-left: 5px;
  font-size: 0.9em;
}

.book-intro-wrap {
  padding: 10px;
}

.book-intro__head {
  font-size: 0.8em;
  font-weight: 300;
}

.book-intro__head p {
  margin: 5px 0 12px;
}

.book-intro__content {
  margin: 10px 0;
  text-indent: 2em;
  text-align: left;
  font-size: 0.8em;
  font-weight: 300;
  width: 100%;
}

/* 书籍详情介绍后台文本插入图片大小限制 */

.book-intro__content img {
  display: block;
  width: 100%;
  margin: 0 auto;
}

.answer-btn {
  border: none;
  color: rgb(255, 255, 255);
  background-color: rgb(98, 200, 165);
  border-radius: 50px;
  width: 100px;
  height: 30px;
  outline: none;
}

.answer-record-wrap {
  padding: 10px;
}

.answer-detail {
  border-bottom: dotted 2px #eee;
  margin-bottom: 10px;
  padding-bottom: 5px;
}

.answer-detail p {
  text-align: center;
  margin: 5px 0;
  font-size: 0.8em;
  font-weight: 300;
}

.parental-evaluate {
  margin-top: 10px;
  box-shadow: 0 1px 5px #e5e9f2;
}

.eva-title {
  margin: 0;
  padding: 10px;
  font-size: 0.9em;
  font-weight: 400;
  color: #656b79;
  border-bottom: solid 1px #eee;
}

.eva-content {
  margin: 0;
  font-size: 0.9em;
  padding: 10px;
  overflow: hidden;
}

.eva-content > span {
  display: flex;
  float: left;
  margin: 0 5px 4px 0;
  padding: 4px 5px;
  font-weight: 300;
  height: 18px;
  line-height: 18px;
  font-size: 0.9em;
  color: #42b983;
  opacity: 0.9;
  border: solid 1px #42b983;
  border-radius: 5px;
}

.selected-eva {
  border: solid 1px #21d0c3;
}

/* 选择海洋生物弹出层 */

.creature-selection {
  width: 100%;
  height: auto;
  background-color: #ffffff;
  position: fixed;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
  box-sizing: border-box;
  z-index: 1;
}

.creature-content {
  width: 100%;
  min-height: 100%;
  margin-bottom: -45px;
}

.creature-content::after {
  content: "";
  display: block;
  height: 50px;
}

.creature-category {
  display: flex;
  flex-flow: row nowrap;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  padding: 10px 10px;
  margin-top: 3px;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  background-color: #ffffff;
}

.category-btn {
  box-sizing: border-box;
  flex: 0 0 auto;
  height: 25px;
  outline: none;
  padding: 0 8px;
  margin-right: 5px;
  border: 1px #e8e8e8 solid;
  background-color: #ffffff;
  border-radius: 3px;
  color: #7e7e7e;
  font-size: 14px;
  font-weight: 300;
}

.category-btn-active {
  color: #26a2ff;
  border: 1px #26a2ff solid;
}

.tab {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  background-color: #fff;
  box-shadow: 0 1px 5px #e5e9f2;
}

.tab__item {
  flex: 1;
  height: 40px;
  line-height: 40px;
  font-size: 0.9rem;
  text-align: center;
  background-color: #fff;
}

.tab__item--active {
  color: #26a2ff;
  border-bottom: 3px #26a2ff solid;
  margin-bottom: -3px;
}

.creature-slider {
  height: 200px;
  padding: 10px;
  text-align: center;
}

.creature-slider__img {
  width: 60%;
}

.creature-info {
  text-align: center;
  display: flex;
  font-size: 14px;
  flex-flow: row wrap;
  background-color: #fff;
  width: 95%;
  margin: 0 auto;
}

.creature-info:nth-child(n) {
  font-size: 13px;
  box-sizing: border-box;
  color: #fff;
}

.required-level,
.possess-num {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 1%;
  width: 48%;
  color: #1f2d3d;
  font-weight: 300;
  /*background-color: #26a2ff;*/
  border-radius: 5px;
}

.creature-name,
.intro-title {
  width: 100%;
}

.creature-name {
  margin: 0 1%;
  padding: 10px 0 3px;
  color: #62c8a5;
  font-size: 17px;
  font-weight: 300;
  border-radius: 5px;
}

.intro-title {
  padding: 6px;
  width: 100%;
  margin: 0;
  color: #ffffff;
  font-size: 14px;
  font-weight: 300;
  background-color: #62c8a5;
  border-radius: 1px;
}

.creature-info__intro {
  margin: 0;
  padding: 6px 0;
  font-size: 14px;
  font-weight: 300;
  text-align: left;
  color: #000;
}

.creature-grid {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
}

.creature-grid__item {
  width: calc(100% / 3);
  padding: 5px;
  display: inline-block;
  box-sizing: border-box;
  opacity: 0.5;
}

.creature-grid__img {
  width: 100%;
}

.creature-grid__item--active {
  opacity: 1;
}

/* mint 默认样式覆盖 */

.mint-swipe-indicator.is-active {
  background: #26a2ff;
  opacity: 1;
}

.slide-enter,
.slide-leave-active {
  transform: translateX(100%);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease;
}

.evaluate-btn {
  display: block;
  font-size: 0.6em;
  height: auto;
  margin-top: 15px;
  width: 100%;
  padding: 5% 0;
  border-radius: 20px;
  box-shadow: 0 3px 5px #e5e9f2;
  background-color: #62c8a5;
}

.buy-btn {
  display: block;
  font-size: 0.6em;
  height: auto;
  margin-top: 15px;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  color: rgb(255, 255, 255);
  width: 100%;
  padding: 5% 0;
  border-radius: 20px;
  box-shadow: 0 3px 5px #e5e9f2;
  background-color: #26a2ff;
}

.buy-btn2 {
  display: block;
  font-size: 0.6em;
  height: auto;
  margin-top: 15px;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  color: rgb(255, 255, 255);
  width: 100%;
  padding: 5% 0;
  border-radius: 20px;
  box-shadow: 0 3px 5px #e5e9f2;
  background-color: #ff2626b9;
}

.buy-btn_disable {
  display: block;
  font-size: 0.6em;
  height: auto;
  margin-top: 15px;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  color: rgb(255, 255, 255);
  width: 100%;
  padding: 5% 0;
  border-radius: 20px;
  box-shadow: 0 3px 5px #e5e9f2;
  background-color: #707274;
}

.ocean-community-btn {
  background-color: #26a2ff;
}

.medal-icon {
  display: block;
  width: 20px;
  height: 20px;
  margin-right: 2px;
  background-image: url("../../../static/images/Book/medal.svg");
  background-repeat: no-repeat;
}

.owner-icon {
  display: block;
  width: 23px;
  height: 23px;
  margin-right: 2px;
  background-image: url("../../../static/images/Book/whale.svg");
  background-repeat: no-repeat;
}

.creature-actions {
  display: flex;
  width: 100%;
  height: 45px;
}

.creature-img-close {
  flex: 1;
  height: 45px;
  border: none;
  outline: none;
  color: #fff;
  background-color: #8a949b;
  font-size: 0.9rem;
  text-align: center;
  white-space: nowrap;
}

.creature-choose {
  flex: 1;
  height: 45px;
  border: 0;
  outline: none;
  font-size: 0.9rem;
  color: #fff;
  background-color: #62c8a5;
}

.course {
  padding: 10px 20px;
  margin: 10px;
  box-shadow: 0 3px 5px #e5e9f2;
  border-radius: 5px;
}

.course__link {
  display: block;
  width: 100%;
  font-size: 14px;
  text-decoration: none;
}

.course__link:active,
.course__link:link,
.course__link:visited {
  color: #000;
}

.community-link {
  display: block;
  width: 100%;
  margin: 0 0 5px 0;
  text-align: center;
  text-decoration: none;
  color: #26a2ff;
  /* border:solid; */
}

.community-link:link,
.community-link:active,
.community-link:visited {
  color: #26a2ff;
}

.change-btn {
  display: block;
  border: 0;
  outline: 0;
  font-size: 14px;
  color: #26a2ff;
  background: none;
  margin: 5px auto;
}

/*答题模块css*/

.creature-answer {
  position: fixed;
  top: 0;
  bottom: 0;
  background-color: rgb(255, 255, 255);
  z-index: 1000;
  height: auto;
  width: 100%;
  min-height: 100%;
  padding-right: 10px;
}

.answer-body {
  /*height: 90%;*/
  width: 90%;
  padding: 15px;
  overflow: scroll;
  position: absolute;
  top: 0;
  bottom: 45px;
}

.answer-time {
  color: rgb(38, 162, 255);
  font-size: 16px;
  margin-bottom: 15px;
}

.answer-foot {
  display: flex;
  width: 100%;
  height: 45px;
  position: fixed;
  bottom: 0;
}

.answer-footLeft {
  flex: 1;
  height: 45px;
  border: none;
  outline: none;
  color: #fff;
  background-color: #8a949b;
  font-size: 0.9rem;
  text-align: center;
  white-space: nowrap;
}

.answer-footRight {
  flex: 1;
  height: 45px;
  border: none;
  outline: none;
  font-size: 0.9rem;
  color: #fff;
  background-color: #62c8a5;
}

.label-question {
  padding: 3px 5px;
  font-size: 0.9em;
  font-weight: 700;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  background-color: #00d8ff;
}

.content-question {
  white-space: normal;
}

.answer-body {
  line-height: 30px;
}

.answer-body ul {
  padding: 0;
  margin: 0;
}

.answer-body li {
  list-style: none;
  width: 90%;
  /*color: black;*/
  margin-bottom: 5px;
}

.choice {
  background-color: red;
  color: rgb(255, 255, 255);
}

.community-warm {
  width: 100%;
  text-align: center;
  font-size: 14px;
  padding: 10px 0;
  margin-bottom: 2px;
  /* border: solid; */
  box-shadow: 0 1px 1px 0 #e5e9f2;
}

.community-warm span {
  font-size: 12px;
  width: 100%;
  margin: 0 0 10px 0;
  /* box-shadow: 0 1px 5px #E5E9F2;   */
  /* border: solid; */
}

.feedback-btn {
  color: rgb(222, 153, 137);
  font-size: 12px;
}
</style>
