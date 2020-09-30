import {
  Toast
} from "mint-ui"
export default {
  methods: {
    errorHandler(err) {
      var msgDuration = 1500
      if (err.response) {
        switch (err.response.status) {
          case 401:
            Toast({
              message: err.response.data.errorMsg,
              position: "middle",
              duration: msgDuration
            })
            setTimeout(() => {
              window.location.assign("/ReadingOcean/wechat")
            }, msgDuration)
            break
          case 404:
          case 500:
            Toast({
              message: "服务器错误",
              position: "middle",
              duration: msgDuration
            })
            break
          default:
            Toast({
              message: err.response.data.errorMsg,
              position: "middle",
              duration: msgDuration
            })
            break
        }
      } else {
        Toast({
          message: "服务器错误",
          position: "middle",
          duration: msgDuration
        })
      }
    }
  }
}
