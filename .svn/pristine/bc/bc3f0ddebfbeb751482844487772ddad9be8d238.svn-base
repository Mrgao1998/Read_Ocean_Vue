<template lang="html">
    <div class="read" >
        <!--弹窗-->
        <div class="parentReco" v-if="msgshow" @click="closeMsg()" >
            <div class="recoBody2">
            <p><b>推荐词：</b>陪伴孩子，没有人能代替父母。我们在这里为家长们推荐四本书：《新父母学校》《黄帝内经》《孩子你慢慢来》《心理学与生活》。这四本书有一个共同的关键词：道法自然。它们传递给您的也许只是一个方法、一种思路、一点理念。我们真正希望的是家长们能选择顺应孩子天性的方式，让孩子自然、健康而又生机勃勃地生长。</p>
            </div>
        </div>
        <div class="read_title">-<b>家长阅读</b>-</div>
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
        category: "category_parents",
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
    .parentReco{
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
    .recoBody2{
        width: 84%;
        /*height: 80%;*/
        margin-top:55%;
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
        /*font-style: italic;*/
        font-family:"Microsoft YaHei";
    }

</style>
