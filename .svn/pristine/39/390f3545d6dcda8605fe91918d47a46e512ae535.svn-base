import Axios from "axios"
import * as API from "../api/api.js"
export default {
  methods: {
    searchBook(config) {
      return Axios({
        url: API.searchBook,
        methods: "GET",
        params: {
          keyWord: config.keyWord,
          pageNum: config.pageNum,
          limits: config.limits
        },
        headers: {
          "Authorization": config.token
        }
      })
    }
  }
}
