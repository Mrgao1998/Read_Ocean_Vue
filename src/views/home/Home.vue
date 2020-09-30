<template>
  <div class="app">
    <keep-alive>
      <router-view>
      </router-view>
    </keep-alive>
    <tab-nav></tab-nav>
  </div>
</template>

<script>
  import TabNav from "../../components/common/tab-nav/TabNav.vue"
  import Book from "../../components/common/book/Book.vue"
  import * as API from "../../api/api.js"
  import Axios from "axios"
  import user from "../../mixins/user.js"
  import errorHandler from "../../mixins/errorHandler.js"
  import AES from "crypto-js/aes"
  import UTF8 from "crypto-js/enc-utf8"
  import Cookie from "js-cookie"
  export default {
    mixins: [ user, errorHandler ],
    created() {
      // 判断cookie是否存在，如果存在，把cookie里的数据放入sessionStorage
      var remCookie = Cookie.get(API.cookieKey)
      if (remCookie) {
        remCookie = JSON.parse(AES.decrypt(remCookie, API.cookieKey).toString(UTF8))
        sessionStorage.setItem(API.userIdKey, remCookie.userId)
        sessionStorage.setItem(API.tokenKey, remCookie.token)
        sessionStorage.setItem(API.schoolIdKey, remCookie.schoolId)
        sessionStorage.setItem(API.userTypeKey, remCookie.userType)
        sessionStorage.setItem(API.latKey, remCookie.latKey)
        sessionStorage.setItem(API.lngKey, remCookie.lngKey)
      }
      if (sessionStorage.getItem(API.tokenKey) === null) {
        document.location.assign("/ReadingOcean/wechat")
      } else {
        Axios({
          url: API.getUserInfo,
          method: "GET",
          params: {
            userId: this.userId,
            schoolId: this.schoolId,
            userType: this.userType
          },
          headers: {
            "Authorization": this.token
          }
        }).then(response => {
          sessionStorage.setItem(API.userInfoKey, JSON.stringify(response.data))
          // console.log(this.userInfo)
        }).catch(err => {
          this.errorHandler(err)
        })
      }
    },
    components: {
      "tabNav": TabNav,
      "singleBook": Book
    }
  }
</script>

<style>
::-webkit-scrollbar {
  display: none;
}

html {
  width: 100%;
  height: 100%;
}

body {
  width: 100%;
  height: 100%;
  margin: 0;
  -webkit-text-size-adjust: 100% !important;
}

.app {
  width: 100%;
  height: 100%;
}
</style>
