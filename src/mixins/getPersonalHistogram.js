import Axios from "axios"
import * as API from "../api/api.js"
export default {
  methods: {
    getAnswerAccuracy(config) { // 各类型题目正确率
      return Axios({
        url: API.getBookRanking.concat("/" + config.userType + "/" + config.schoolId + "/" + config.gradeName + "/" + config.classId + "/" + config.studentId + "/" + config.termId + "/1"),
        method: "GET",
        headers: {
          "Authorization": config.token
        }
      })
    },
    getAnswerNumber(config) { // 各类型题目答对数目
      return Axios({
        url: API.getTaskRate.concat("/" + config.userType + "/" + config.schoolId + "/" + config.gradeName + "/" + config.classId + "/" + config.studentId + "/" + config.termId),
        method: "GET",
        headers: {
          "Authorization": config.token
        }
      })
    },
    getTimeDistribution(config) { // 答题时间段分布图
      return Axios({
        url: API.getAllSchoolTotalRank.concat("/" + config.userType + "/" + config.schoolId + "/" + config.gradeName + "/" + config.classId + "/" + config.studentId + "/" + config.termId),
        method: "GET",
        headers: {
          "Authorization": config.token
        }
      })
    },
    getTop5SchoolRank(config) { // 获取答题积分top5学校
      return Axios({
        url: API.getAllSchoolTotalRank,
        method: "GET",
        headers: {
          "Authorization": config.token
        }
      })
    }
  }
}
