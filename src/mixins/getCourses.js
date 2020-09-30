import Axios from "axios"
import * as API from "../api/api.js"
export default {
  methods: {
    getCourses(config) {
      return Axios({
        url: API.getCourses,
        method: "GET",
        params: {
          type: config.type || null,
          pageNum: config.pageNum || 1,
          limits: config.limits || 10
        },
        headers: {
          "Authorization": config.token
        }
      })
    }
  }
}
