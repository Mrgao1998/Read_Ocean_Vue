import Axios from "axios"
import * as API from "../api/api.js"
export default {
  methods: {
    getTerm(config) { // 书籍数量
      return Axios({
        url: API.getTerm,
        method: "GET",
        headers: {
          "Authorization": config.token
        }
      })
    }
  }
}
