import Axios from "axios"
import * as API from "../api/api.js"
export default {
  methods: {
    getRank(config) {
      return Axios({
        url: API.getRank,
        method: "GET",
        params: {
          classId: config.classId,
          schoolId: config.schoolId,
          type: config.type,
          range: config.range,
          pageNum: config.pageNum,
          limits: config.limits,
          userId: config.userId
        },
        headers: {
          "Authorization": config.token
        }
      })
    }
  }
}
