import Axios from "axios"
import * as API from "../api/api.js"
export default {
  methods: {
    getQuestions(config) {
      return Axios({
        url: API.getQuestions,
        method: "GET",
        params: {
          type: config.type,
          pageNum: config.pageNum || 1,
          limits: config.limits || 9
        },
        headers: {
          "Authorization": config.token
        }
      })
    }
  }
}
