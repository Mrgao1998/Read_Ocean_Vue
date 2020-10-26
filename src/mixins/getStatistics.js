import Axios from "axios"
import * as API from "../api/api.js"
import user from "./user.js"
export default {
  mixins: [user],
  methods: {
    getTop5SchoolRank() { // 获取答题积分top5学校
      return Axios({
        url: API.getAllSchoolTotalRank,
        method: "GET",
        headers: {
          "Authorization": this.token
        }
      })
    },
    getRankInfoGroupByGrade() { // 获取各年级闯关信息统计
      return Axios({
        url: API.getRankInfoGroupByGrade,
        method: "GET",
        headers: {
          "Authorization": this.token
        }
      })
    },
    getGenderDistribution() { // 获取不同积分段男女生比例
      return Axios({
        url: API.getGenderDistribution,
        method: "GET",
        headers: {
          "Authorization": this.token
        }
      })
    },
    getTotalAnswerHabit() { // 获取答题时间段分布
      return Axios({
        url: API.getTotalAnswerHabit,
        method: "GET",
        headers: {
          "Authorization": this.token
        }
      })
    }
  }
}
