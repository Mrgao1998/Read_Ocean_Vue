/**
 * Created by maczhanchao on 2017/4/16.
 */
import {
  baseUrl
} from "./baseUrl"

const userInfoKey = "userInfoKey"
const userIdKey = "userIdKey"
const userTypeKey = "userTypeKey"
const schoolIdKey = "schoolIdKey"
const schoolTypeKey = "schoolTypeKey"
const lngKey = "lngKey"
const latKey = "latKey"
const tokenKey = "tokenKey"
const cookieKey = "ro_rem"
const deletePost = baseUrl.concat("/mobileForum/post/delete")
const userLogin = baseUrl.concat("/ReadingOcean/mobileUser/login")
const getUserInfo = baseUrl.concat("/ReadingOcean/mobileUser/userInfo")
const getTaskList = baseUrl.concat("/ReadingOcean/mobileTask/myTask")
const getTaskDetail = baseUrl.concat("/ReadingOcean/mobileTask/taskDetail")
const deleteTask = baseUrl.concat("/ReadingOcean/mobileTask/deleteTask")
const finishTask = baseUrl.concat("/ReadingOcean/mobileTask/finishTask")
const retrievePwd = baseUrl.concat("/ReadingOcean/mobileUser/retrievePwd")
const getAllSchoolData = baseUrl.concat("/ReadingOcean/region/querySchool")
const getBooks = baseUrl.concat("/ReadingOcean/mobileBook/getBooks")
const getQARecords = baseUrl.concat("/ReadingOcean/mobileqa/myQuestion")
const getForumPosts = baseUrl.concat("/ReadingOcean/mobileForum/myForum")
const getQuestions = baseUrl.concat("/ReadingOcean/mobileqa/getQuestions")
const searchBook = baseUrl.concat("/ReadingOcean/mobileBook/search")
const getBookDetail = baseUrl.concat("/ReadingOcean/mobileBook/bookDetail")
const sendFeedback = baseUrl.concat("/ReadingOcean/mobileUser/sendFeedback")
const updatePwd = baseUrl.concat("/ReadingOcean/mobileUser/updatePwd")
const makeComment = baseUrl.concat("/ReadingOcean/mobileTask/makeComment")
const giveScore = baseUrl.concat("/ReadingOcean/mobileTask/giveScore")
const getQuestionDetail = baseUrl.concat("/ReadingOcean/mobileqa/questionDetail")
const getAnswers = baseUrl.concat("/ReadingOcean/mobileqa/getAnswers")
const goRegister = baseUrl.concat("/ReadingOcean/mobileUser/WxReg?schoolId=1000000")
const deleteAnswer = baseUrl.concat("/ReadingOcean/mobileqa/deleteAnswer")
const postAnswer = baseUrl.concat("/ReadingOcean/mobileqa/postAnswer")
const postQuestion = baseUrl.concat("/ReadingOcean/mobileqa/postQuestion")
const ignoreQuestion = baseUrl.concat("/ReadingOcean/mobileqa/ignoreQuestion")
const deleteQuestion = baseUrl.concat("/ReadingOcean/mobileqa/deleteQuestion")
const setAnswerState = baseUrl.concat("/ReadingOcean/mobileqa/bestAnswer")
const likeAnswer = baseUrl.concat("/ReadingOcean/mobileqa/likeAnswer")
const getBlocks = baseUrl.concat("/ReadingOcean/mobileForum/getBlocks")
const getStudents = baseUrl.concat("/ReadingOcean/mobileUser/getStudents")
const postTask = baseUrl.concat("/ReadingOcean/mobileTask/postTask")
const getCourses = baseUrl.concat("/ReadingOcean/mobileCourse/getCourses")
const getSector = baseUrl.concat("/ReadingOcean/mobileReports/categorycharts")
const getBookRanking = baseUrl.concat("/ReadingOcean/mobileReports/readbookcharts")
const getTaskRate = baseUrl.concat("/ReadingOcean/mobileReports/taskratecharts")
const getIntegrateRanking = baseUrl.concat("/ReadingOcean/mobileReports/integralcharts")
const getAnswerAccuracy = baseUrl.concat("/ReadingOcean/mobileReports/answerAccuracycharts")
const getRadar = baseUrl.concat("/ReadingOcean/mobileReports/radarcharts")
const getTerm = baseUrl.concat("/ReadingOcean/mobileReports/getTerm")
const getReadInfo = baseUrl.concat("/ReadingOcean/mobileReports/readinfo")
const getTaskInfo = baseUrl.concat("/ReadingOcean/mobileReports/taskinfo")
const getIntegralInfo = baseUrl.concat("/ReadingOcean/mobileReports/integralinfo")
const getForumPostStatistics = baseUrl.concat("/ReadingOcean/mobileReports/forumPostStatistics")
const getReadingBookAndAnswerStatistics = baseUrl.concat("/ReadingOcean/mobileReports/readingBookAndAnswerStatistics")
const getReadingAbility = baseUrl.concat("/ReadingOcean/mobileReports/readingAbility")
const getReadingPreference = baseUrl.concat("/ReadingOcean/mobileReports/readingPreference")
const getParentAssess = baseUrl.concat("/ReadingOcean/mobileReports/parentAssess")
const getTeacherAssess = baseUrl.concat("/ReadingOcean/mobileReports/teacherAssess")
const getMyharvest = baseUrl.concat("/ReadingOcean/mobileReports/myharvest")
const searchBlock = baseUrl.concat("/ReadingOcean/mobileForum/search")
const getCreatures = baseUrl.concat("/ReadingOcean/mobileCreature/getCreatures")
const subscribeBook = baseUrl.concat("/ReadingOcean/mobileBook/subscribe")
const getBlockDetail = baseUrl.concat("/ReadingOcean/mobileForum/blockDetail")
const makebookComment = baseUrl.concat("/ReadingOcean/mobileBook/makeComment")
const getRank = baseUrl.concat("/ReadingOcean/mobileRank/getRank")
const blockPublish = baseUrl.concat("/ReadingOcean/mobileForum/publish")
const getWxConfig = baseUrl.concat("/ReadingOcean/mobileForum/jssdk/config")
const getPosts = baseUrl.concat("/ReadingOcean/mobileForum/getPosts")
const addReply = baseUrl.concat("/ReadingOcean/forum/post/addReply")
const getReply = baseUrl.concat("/ReadingOcean/forum/post/detail")
const myPosts = baseUrl.concat("/ReadingOcean/mobileForum/myForum")
const likePost = baseUrl.concat("/ReadingOcean/mobileForum/likePost")
const getSingleq = baseUrl.concat("/ReadingOcean/mbookq/singleq/query")
const forgetPassword = baseUrl.concat("/ReadingOcean/user/forgetPassword")
const getCheckNum = baseUrl.concat("/ReadingOcean/user/sendVerificationCode")
const verifySankeInfoIsFinish = baseUrl.concat("/ReadingOcean/user/verifySankeInfoIsFinish")
const getMultipleq = baseUrl.concat("/ReadingOcean/mbookq/multipleq/query")
const getTruefalseq = baseUrl.concat("/ReadingOcean/mbookq/truefalseq/query")
const addAnswerDetail = baseUrl.concat("/ReadingOcean/mbookq/detail/add")
const checkfinshDetail = baseUrl.concat("/ReadingOcean/task/query/finshDetail")
const userRegister = baseUrl.concat("/ReadingOcean/user/register/submit")
const modify = baseUrl.concat("/ReadingOcean/user/info/mobileModify")
const WxPay = baseUrl.concat("/ReadingOcean/wx/payIndividual")
const countUnfinished = baseUrl.concat("/ReadingOcean/mobileTask/countUnfinishedTask")
const infoIsSub = baseUrl.concat("/ReadingOcean/mobileBook/infoIsSub")
const WxBind = baseUrl.concat("/ReadingOcean/mobileUser/wxBind")
const WxBindUser = baseUrl.concat("/ReadingOcean/mobileUser/getWxBindUser")
const WxQuickLogin = baseUrl.concat("/ReadingOcean/mobileUser/wxQuickLogin")
const querySource = baseUrl.concat("/ReadingOcean/mobileUser/querySource")
const AddshopCart = baseUrl.concat("/ReadingOcean/mobileShop/cart")
const shopCartInfo = baseUrl.concat("/ReadingOcean/mobileShop/cartInfo")
const getPublicKey = baseUrl.concat("/ReadingOcean/mobileShop/getKey")
const order = baseUrl.concat("/ReadingOcean/mobileShop/order") // 下订单
const confirmOrder = baseUrl.concat("/ReadingOcean/mobileShop/confirmOrder") // 确认订单，后台生成订单
const judgeDuplicateName = baseUrl.concat("/ReadingOcean/mobileUser/judgeDuplicateName")
const phoneLogin = baseUrl.concat("/ReadingOcean/mobileUser/phoneLogin")
const judgeUserAnswerAuthority = baseUrl.concat("/ReadingOcean/user/judgeUserAnswerAuthority")
const payReadIndividual = baseUrl.concat("/ReadingOcean/wx/payReadIndividual")
const getBookAnswerPayDetailList = baseUrl.concat("/ReadingOcean/wx/getBookAnswerPayDetailList")
const getReadingReportPayDetailList = baseUrl.concat("/ReadingOcean/wx/getReadingReportPayDetailList")
const judgeSankeIsPayReadingReport = baseUrl.concat("/ReadingOcean/user/judgeSankeIsPayReadingReport")
const judgeSankeBlockAuthority = baseUrl.concat("/ReadingOcean/user/judgeSankeBlockAuthority")
const judgeSankeIsPayAlreadyRead = baseUrl.concat("/ReadingOcean/user/judgeSankeIsPayAlreadyRead")
const judgeSankeIsPayUserWork = baseUrl.concat("/ReadingOcean/user//judgeSankeIsPayUserWork")
const payReadingReportIndividual = baseUrl.concat("/ReadingOcean/wx/payReadingReportIndividual")
const judgeIsSanKe = baseUrl.concat("/ReadingOcean/user/judgeIsSanKe")

// 高燕生毕设
// 获取学生某年级判断题
const queryTrueFalseQListBySuit = baseUrl.concat("/ReadingOcean/bookq/queryTrueFalseQListBySuit")
// 获取学生某年级单选题
const querySingleChoiceQListBySuit = baseUrl.concat("/ReadingOcean/bookq/querySingleChoiceQListBySuit")
// 获取学生某年级多选题
const queryMultipleChoiceQListBySuit = baseUrl.concat("/ReadingOcean/bookq/queryMultipleChoiceQListBySuit")

// 添加分数同时记录答对的题目扣减答题次数
const addScoreAndInsertAnswerRecord = baseUrl.concat("/ReadingOcean/mobileRank/addScoreAndInsertAnswerRecord")
// 获取各学校rank总分, 倒序排序
const getAllSchoolTotalRank = baseUrl.concat("/ReadingOcean/mobileRank/getAllSchoolTotalRank")
// 获取所有学生rank积分接口
const getAllStudentRank = baseUrl.concat("/ReadingOcean/mobileRank/getAllStudentRank")
// 获取某学生当天剩余答题次数
const getAnswerCountByStudentId = baseUrl.concat("/ReadingOcean/mobileRank/getAnswerCountByStudentId")
// 查询学生答题闯关详细信息
const getDetailsRankInfo = baseUrl.concat("/ReadingOcean/mobileRank/getDetailsRankInfo")
// 获取各分段男女人数
const getGenderDistribution = baseUrl.concat("/ReadingOcean/mobileRank/getGenderDistribution")
// 各年级闯关信息统计 (答题总数, 答题积分, 答题平均时长)
const getRankInfoGroupByGrade = baseUrl.concat("/ReadingOcean/mobileRank/getRankInfoGroupByGrade")
// 根据学生id获取rank积分信息
const getStudentRankById = baseUrl.concat("/ReadingOcean/mobileRank/getStudentRankById")
// 获取所有学生的答题时间分布总和
const getTotalAnswerHabit = baseUrl.concat("/ReadingOcean/mobileRank/getTotalAnswerHabit")
export {
  // 毕设
  queryTrueFalseQListBySuit,
  querySingleChoiceQListBySuit,
  queryMultipleChoiceQListBySuit,

  addScoreAndInsertAnswerRecord,
  getAnswerCountByStudentId,
  getAllStudentRank,
  getDetailsRankInfo,
  getStudentRankById,
  getAllSchoolTotalRank,
  getGenderDistribution,
  getRankInfoGroupByGrade,
  getTotalAnswerHabit,

  // 以下是项目的
  judgeIsSanKe,
  judgeSankeBlockAuthority,
  judgeSankeIsPayAlreadyRead,
  judgeSankeIsPayUserWork,
  payReadingReportIndividual,
  judgeSankeIsPayReadingReport,
  getReadingReportPayDetailList,
  getBookAnswerPayDetailList,
  payReadIndividual,
  deletePost,
  userInfoKey,
  schoolTypeKey,
  userIdKey,
  schoolIdKey,
  userTypeKey,
  getCheckNum,
  latKey,
  forgetPassword,
  lngKey,
  tokenKey,
  cookieKey,
  goRegister,
  baseUrl,
  userLogin,
  getUserInfo,
  getTaskList,
  getTaskDetail,
  deleteTask,
  finishTask,
  retrievePwd,
  updatePwd,
  getAllSchoolData,
  getBooks,
  getQARecords,
  getForumPosts,
  getQuestions,
  searchBook,
  sendFeedback,
  makeComment,
  giveScore,
  getQuestionDetail,
  getAnswers,
  postQuestion,
  ignoreQuestion,
  deleteQuestion,
  postAnswer,
  deleteAnswer,
  setAnswerState,
  likeAnswer,
  getBookDetail,
  getBlocks,
  getStudents,
  postTask,
  getCourses,
  getSector,
  getRadar,
  getBookRanking,
  getTaskRate,
  getIntegrateRanking,
  getAnswerAccuracy,
  getTerm,
  getReadInfo,
  getTaskInfo,
  getIntegralInfo,
  getForumPostStatistics,
  getReadingBookAndAnswerStatistics,
  getReadingAbility,
  getReadingPreference,
  getParentAssess,
  getTeacherAssess,
  getMyharvest,
  searchBlock,
  getCreatures,
  subscribeBook,
  getBlockDetail,
  makebookComment,
  getRank,
  blockPublish,
  getWxConfig,
  getPosts,
  getReply,
  addReply,
  myPosts,
  likePost,
  getSingleq,
  getMultipleq,
  getTruefalseq,
  addAnswerDetail,
  checkfinshDetail,
  userRegister,
  WxPay,
  countUnfinished,
  infoIsSub,
  WxBind,
  WxBindUser,
  WxQuickLogin,
  querySource,
  AddshopCart,
  shopCartInfo,
  getPublicKey,
  order,
  confirmOrder,
  verifySankeInfoIsFinish,
  modify,
  judgeDuplicateName,
  phoneLogin,
  judgeUserAnswerAuthority
}
