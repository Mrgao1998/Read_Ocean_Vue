const Express = require("express")
const App = Express()
const path = require("path")

App.use("/ReadingOcean/wechat/scripts", Express.static("scripts"))
App.use("/ReadingOcean/wechat/static", Express.static("static"))

App.get("/", (req, res) => {
  res.redirect("/ReadingOcean/wechat")
})

App.get("/ReadingOcean/wechat", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./login.html"))
})

App.get("/ReadingOcean/wechat/home", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./home.html"))
})

App.get("/ReadingOcean/wechat/qa", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./qa.html"))
})

App.get("/ReadingOcean/wechat/courses", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./courses.html"))
})

App.get("/ReadingOcean/wechat/qaDetail", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./qaDetail.html"))
})

App.get("/ReadingOcean/wechat/bookDetail", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./bookDetail.html"))
})

App.get("/ReadingOcean/wechat/taskDetail", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./taskDetail.html"))
})

App.get("/ReadingOcean/wechat/taskDist", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./taskDist.html"))
})

App.get("/ReadingOcean/wechat/communityDetail", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./communityDetail.html"))
})

App.get("/ReadingOcean/wechat/ranking", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./ranking.html"))
})

App.get("/ReadingOcean/wechat/wechatPay", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./wechatPay.html"))
})

App.get("/ReadingOcean/wechat/wechatLogin", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./wechatLogin.html"))
})

App.use((req, res) => {
  res.sendFile(path.resolve(__dirname, "./home.html"))
})

App.listen(8081)
