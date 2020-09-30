<template lang="html">
    <div class="read" >
        <!--弹窗-->
        <div class="teacherReco" v-if="msgshow" @click="closeMsg()" >
            <div class="recoBody">
              <p><b>推荐词：</b>“四书五经”是中华优秀传统文化的经典文本，而《论语》、《孟子》、《大学》、《中庸》“四书”是教师提升文化修养，涵养人文精神的必读经典。五经之中，《诗经》居首；《周易》貌似驳杂，其实“易简”。《论语》教人智、仁、勇，以“仁”为核心。《论语》重点讲“仁”，《孟子》重点讲“义”，两者合成“仁义”与“养气”的教育。《大学》教人明明德，亲民，止于至善。《中庸》教人“中庸之道”。《道德经》、《庄子》构成中国道法自然的自然教育。《教育哲学》回归古典，融汇中西，贯通古今，从教育哲学视角引领教师形成专业阅读的宏观视野。</p>
            </div>
        </div>
        <div class="read_title">-<b>教师阅读</b>-</div>
          <span class="read_btn"><a href="/ReadingOcean/wechat/parentForum">家长阅读</a>&nbsp;<img class="enter-icon" src="../../../static/images/right-arrow.png"></span>
        <div
                v-if="!isSearching"
                class="read__block"
                v-infinite-scroll="loadMoreBlock"
                infinite-scroll-disabled="blockLoading"
                infinite-scroll-immediate-check="false"
                infinite-scroll-distance="50">
            <single-block
                    v-for="block in blockList"
                    :id="block.id"
                    :key="block.id"
                    :book-name="block.title"
                    :book-image="block.img"
                    :like-num="block.likeNum"
                    :comment-num="block.postNum"
                    customWidth="50%"
            ></single-block>
        </div>
        <div class="read__block" v-else>
            <single-block
                    v-for="block in searchBlockList"
                    :id="block.id"
                    :key="block.id"
                    :book-name="block.title"
                    :book-image="block.img"
                    :like-num="block.likeNum"
                    :comment-num="block.postNum"
                    customWidth="50%"
            ></single-block>
        </div>
    </div>
</template>

<script>
  import Axios from "axios"
  import * as API from "../../api/api.js"
  import Block from "../community/CommunityBlock.vue"
  import category from "../../utils/category.js"
  import user from "../../mixins/user.js"
  import errorHandler from "../../mixins/errorHandler.js"
  import getBlocks from "../../mixins/getBlocks.js"
  import { Toast, Indicator } from "mint-ui"
  export default {
    mixins: [ user, errorHandler, getBlocks ],
    data() {
      return {
        msgshow: true,
        blockCategory: category,
        searchShow: false,
        cancelBtnShow: true,
        searchKeyword: "",
        activeBlockCate: null,
        blockList: [],
        searchBlockList: [],
        currentPage: 1,
        maxPage: 100,
        blockLoading: false,
        isSearching: false
      }
    },
    methods: {
      closeMsg() {
        this.msgshow = false
      },
      categoryBtnActive(cate) {
        if (this.activeBlockCate !== cate) {
          this.activeBlockCate = cate
          Indicator.open({
            text: "加载中...",
            spinnerType: "snake"
          })
          this.currentPage = 1
          this.getBlocks({
            category: this.activeBlockCate,
            pageNum: this.currentPage,
            limits: 12,
            token: this.token
          }).then(res => {
            Indicator.close()
            this.blockList = res.data.dataList
            this.maxPage = res.data.totalPage
          }).catch(err => {
            Indicator.close()
            this.errorHandler(err)
          })
        }
      },
      loadMoreBlock() {
        if (this.currentPage < this.maxPage) {
          Indicator.open({
            text: "加载更多...",
            spinnerType: "snake"
          })
          this.currentPage += 1
          this.blockLoading = true
          this.getBlocks({
            category: this.activeBlockCate,
            pageNum: this.currentPage,
            limits: 12,
            token: this.token
          }).then(res => {
            Indicator.close()
            this.blockLoading = false
            this.blockList = this.blockList.concat(res.data.dataList)
          }).catch(err => {
            Indicator.close()
            this.blockLoading = false
            this.errorHandler(err)
          })
        } else {
          Toast({
            message: "已无更多数据",
            position: "middle",
            duration: 1500
          })
        }
      },
      searchBlock() {
        this.isSearching = true
        Axios({
          url: API.searchBlock,
          method: "GET",
          params: {
            keyWord: this.searchKeyword,
            pageNum: 1,
            limits: 12
          },
          headers: {
            "Authorization": this.token
          }
        }).then(res => {
          this.searchKeyword = ""
          this.searchBlockList = res.data.dataList
        }).catch(err => {
          this.searchKeyword = ""
          this.errorHandler(err)
        })
      },
      cancelSearch() {
        this.isSearching = false
        this.searchBlockList = []
        this.searchShow = !this.searchShow
      }
    },
    components: {
      singleBlock: Block
    },
    created() {
      Indicator.open({
        text: "加载中...",
        spinnerType: "snake"
      })
      this.getBlocks({
        category: "category_teachers",
        pageNum: this.currentPage,
        limits: 12,
        token: this.token
      }).then(res => {
        Indicator.close()
        this.blockList = res.data.dataList
        this.maxPage = res.data.totalPage
      }).catch(err => {
        Indicator.close()
        this.errorHandler(err)
      })
    }
  }
</script>

<style lang="css">
    ::-webkit-scrollbar {
        display: none;
    }
    .read__block {
        position: absolute;
        left: 0;
        right: 0;
        top: 50px;
        bottom: 55px;
        overflow-y: scroll;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        -webkit-overflow-scrolling: touch;
        z-index: 0;
    }
    .teacherReco{
        width: 100%;
        height: 100%;
        position: absolute;/*这里一定要设置*/
        z-index: 10;
        /*background-color:rgba(248,248,255,0.9);*/
        background: url("../../../static/images/main/sea.jpg");
        background-size:100% 100%;
        background-repeat:no-repeat;
        -webkit-transition: .5s ease-in-out;/* css的transition允许css的属性值在一定的时间内从一个状态平滑的过渡到另一个状态 */
        -moz-transition: .5s ease-in-out;/*这里为了兼容其他浏览器*/
        -o-transition: .5s ease-in-out;
    }
    .recoBody{
        width: 84%;
        /*height: 80%;*/
        margin-top:30%;
        margin-left: auto;
        margin-right: auto;
        line-height:3.6vh;
        font-size:2.7vh;
        overflow:hidden;
        color:  #191970;
        text-align: center;
        border-radius: 5px;
        background-color:rgba(248,248,255,0.6);
    }

    .read_title{
        width: 100%;
        height: 50px;
        position: absolute;
        top: 0;
        /*background: #1f68e1;*/
        color: #1f68e1;
        text-align: center;
        font-size: 29px;
        padding:  8px 0px;
        letter-spacing:4px;
        font-style: italic;
        font-family:"Microsoft YaHei";
    }

    .read_btn{
      position: absolute;
      top: 10px;
      right:10px;
      border: 1px solid #fff;
      font-size: 0.9rem;
      color: rgb(31, 104, 225)
    }

    .read_btn a{
      text-decoration:none;
      color: rgb(31, 104, 225);
    }

    .enter-icon{
      display: block;
      width: 12px;
      float: right;
      position: relative;
      top: 1px;
    }
</style>
