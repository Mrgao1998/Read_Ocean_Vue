import Axios from "axios"
import * as API from "../api/api.js"
export default {
  methods: {
    getBookRanking(config) { // 书籍数量
      return Axios({
        url: API.getBookRanking.concat("/" + config.userType + "/" + config.schoolId + "/" + config.gradeName + "/" + config.classId + "/" + config.studentId + "/" + config.termId + "/1"),
        method: "GET",
        headers: {
          "Authorization": config.token
        }
      })
    },
    getTaskRate(config) { // 任务完成率
      return Axios({
        url: API.getTaskRate.concat("/" + config.userType + "/" + config.schoolId + "/" + config.gradeName + "/" + config.classId + "/" + config.studentId + "/" + config.termId),
        method: "GET",
        headers: {
          "Authorization": config.token
        }
      })
    },
    getIntegrateRanking(config) { // 积分榜
      return Axios({
        url: API.getIntegrateRanking.concat("/" + config.userType + "/" + config.schoolId + "/" + config.gradeName + "/" + config.classId + "/" + config.studentId + "/" + config.termId),
        method: "GET",
        headers: {
          "Authorization": config.token
        }
      })
    },
    getAnswerAccuracy(config) { // 答题正确率（%）
      return Axios({
        url: API.getAnswerAccuracy.concat("/" + config.userType + "/" + config.schoolId + "/" + config.gradeName + "/" + config.classId + "/" + config.studentId + "/" + config.termId),
        method: "GET",
        headers: {
          "Authorization": config.token
        }
      })
    }
  }
}
