import Axios from "axios"
import * as API from "../api/api.js"
import errorHandler from "./errorHandler.js"
import user from "./user.js"
export default {
  mixins: [user],
  created() {
    this.getDetailsRankInfo(this.userId, this.token)
  },
  data() {
    return {
      // 当前学生的排名信息
    // 正确率
      RankInfo_accuracy: null,
      // 回答问题的时间段，0-4用4，4-8用8以此类推
      RankInfo_answerHabit: null,
      // 答题平均时长
      RankInfo_avgTime: null,
      // 班级排名
      RankInfo_classRank: null,
      // 班级
      RankInfo_classesName: null,
      // 年级
      RankInfo_gradeName: null,
      // 年级答题数目 0代表幼儿园，1代表一年级以此类推
      RankInfo_gradeProportion: null,
      // 年级排名
      RankInfo_gradeRank: null,
      // 积分
      RankInfo_rank: null,
      // 答对题目总数
      RankInfo_rightCount: null,
      // 答对多选数目
      RankInfo_rightMultipleNum: null,
      // 答对单选数目
      RankInfo_rightSingleNum: null,
      // 答对判断题数目
      RankInfo_rightTofNum: null,
      /// 学校排名
      RankInfo_schoolRank: null,
      // 学校名
      RankInfo_schoolName: null,
      // 学生名
      RankInfo_studentName: null,
      // 答题总数
      RankInfo_totalCount: null,
      // 多选题所答总数
      RankInfo_totalMultipleNum: null,
      // 社区排名
      RankInfo_totalRank: null,
      // 单选题所答总数
      RankInfo_totalSingleNum: null,
      // 判断题所答总数
      RankInfo_totalTorNum: null,
      // 请求的返回结果
      ResData: null,
      // 用于判断是否显示loading
      isShow: false
    }
  },
  methods: {
    getDetailsRankInfo(studentId, token) {
      Axios({
        url: API.getDetailsRankInfo,
        methods: "GET",
        params: {
          studentId: studentId
        },
        headers: {
          "Authorization": token
        }
      }).then(res => {
        const data = res.data.data
        this.ResData = data
        this.RankInfo_accuracy = data.accuracy
        this.RankInfo_answerHabit = data.answerHabit
        this.RankInfo_avgTime = data.avgTime
        this.RankInfo_classRank = data.classRank
        this.RankInfo_classesName = data.classesName
        this.RankInfo_gradeName = data.gradeName
        this.RankInfo_gradeProportion = data.gradeProportion
        this.RankInfo_gradeRank = data.gradeRank
        this.RankInfo_rank = data.rank
        this.RankInfo_rightCount = data.rightCount
        this.RankInfo_rightMultipleNu = data.rightMultipleNu
        this.RankInfo_rightSingleNum = data.rightSingleNum
        this.RankInfo_rightTofNum = data.rightTofNum
        this.RankInfo_schoolRank = data.schoolRank
        this.RankInfo_schoolName = data.schoolName
        this.RankInfo_studentName = data.studentName
        this.RankInfo_totalCount = data.totalCount
        this.RankInfo_totalMultipleNum = data.totalMultipleNum
        this.RankInfo_totalRank = data.totalRank
        this.RankInfo_totalSingleNum = data.totalSingleNum
        this.RankInfo_totalTorNum = data.totalTorNum
        this.isShow = true
      }).catch(err => {
        console.log(errorHandler(err))
      })
    }
  }
}
