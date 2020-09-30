import * as API from "../api/api.js"
import AES from "crypto-js/aes"
import UTF8 from "crypto-js/enc-utf8"
import Cookie from "js-cookie"
export default {
  computed: {
    userId() {
      return sessionStorage.getItem(API.userIdKey) !== null ? sessionStorage.getItem(API.userIdKey)
        : JSON.parse(AES.decrypt(Cookie.get(API.cookieKey), API.cookieKey).toString(UTF8)).userId
    },
    schoolId() {
      return sessionStorage.getItem(API.schoolIdKey) !== null ? sessionStorage.getItem(API.schoolIdKey)
        : JSON.parse(AES.decrypt(Cookie.get(API.cookieKey), API.cookieKey).toString(UTF8)).schoolId
    },
    userInfo() {
      return JSON.parse(sessionStorage.getItem(API.userInfoKey))
    },
    schoolType() {
      return JSON.parse(sessionStorage.getItem(API.schoolTypeKey))
    },
    role() {
      return sessionStorage.getItem(API.userTypeKey) === "user_type_student" ? "student" : "teacher"
    },
    userType() {
      return sessionStorage.getItem(API.userTypeKey) !== null ? sessionStorage.getItem(API.userTypeKey)
        : JSON.parse(AES.decrypt(Cookie.get(API.cookieKey), API.cookieKey).toString(UTF8)).userType
    },
    token() {
      return sessionStorage.getItem(API.tokenKey) !== null ? sessionStorage.getItem(API.tokenKey)
        : JSON.parse(AES.decrypt(Cookie.get(API.cookieKey), API.cookieKey).toString(UTF8)).token
    }
  }
}
