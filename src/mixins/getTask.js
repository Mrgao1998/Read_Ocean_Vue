import Axios from "axios"
import * as API from "../api/api.js"
export default {
  methods: {
    getTasks(config) {
      return Axios({
        url: API.getTaskList,
        method: "GET",
        params: {
          userId: config.userId,
          userType: config.userType,
          type: config.type || null,
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
