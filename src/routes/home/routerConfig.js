// import PersonalCenter from "../../components/home/PersonalCenter.vue"
// import MyTask from "../../components/task/MyTask.vue"
// import Bookedu from "../../components/books/Bookedu.vue"
// import Main from "../../components/home/Main.vue"
// import Community from "../../components/community/Community.vue"
// import teacherForum from "../../components/forum/teacherForum.vue"
// import parentForum from "../../components/forum/parentForum.vue"
// import userInfo from "../../components/home/personal/userInfo.vue"
// import report from "../../components/home/personal/report.vue"
// import readingBooks from "../../components/home/personal/readingBooks.vue"
// import finishedBooks from "../../components/home/personal/finishedBooks.vue"
// import qaRecords from "../../components/home/personal/qaRecords.vue"
// import students from "../../components/home/personal/students.vue"
// import feedback from "../../components/home/personal/feedback.vue"
// import forum from "../../components/home/personal/forum.vue"
// import pendingTask from "../../components/task/type/pending.vue"
// import finishedTask from "../../components/task/type/finished.vue"
// import overdueTask from "../../components/task/type/overdue.vue"
// import updatePwd from "../../components/home/personal/updatePwd.vue"
// import recommend from "../../components/home/Recommend.vue"
// import practicalCourse from "../../components/home/PracticalCourse.vue"
// 不用上面的方式了，下面的方式能够让页面使用的时候才被加载，节省初次加载的资源
import publishedTask from "../../components/task/type/published.vue"
export default {
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: "*",
      component: () => import("../../components/home/Main.vue")
    },
    {
      path: "/ReadingOcean/wechat/personal",
      component: () => import("../../components/home/PersonalCenter.vue")
    },
    {
      path: "/ReadingOcean/wechat/userInfo",
      component: () => import("../../components/home/personal/userInfo.vue")
    },
    {
      path: "/ReadingOcean/wechat/report",
      component: () => import("../../components/home/personal/report.vue")
    },
    {
      path: "/ReadingOcean/wechat/readingBooks",
      component: () =>
        import("../../components/home/personal/readingBooks.vue")
    },
    {
      path: "/ReadingOcean/wechat/finishedBooks",
      component: () =>
        import("../../components/home/personal/finishedBooks.vue")
    },
    {
      path: "/ReadingOcean/wechat/userAnswer",
      component: () => import("../../components/home/personal/userAnswer.vue"),
      children: [
        {
          path: "gameRanking/:id",
          component: () => import("../../components/home/personal/gameRanking.vue")
        },
        {
          path: "personalAnswerdetail/:id",
          component: () => import("../../components/home/personal/personalAnswerdetail.vue")
        }
      ]
    },
    {
      path: "/ReadingOcean/wechat/posts",
      component: () => import("../../components/home/personal/posts.vue")
    },
    {
      path: "/ReadingOcean/wechat/qaRecords",
      component: () => import("../../components/home/personal/qaRecords.vue")
    },
    {
      path: "/ReadingOcean/wechat/students",
      component: () => import("../../components/home/personal/students.vue")
    },
    {
      path: "/ReadingOcean/wechat/feedback",
      component: () => import("../../components/home/personal/feedback.vue")
    },
    {
      path: "/ReadingOcean/wechat/forum",
      component: () => import("../../components/home/personal/forum.vue")
    },
    {
      path: "/ReadingOcean/wechat/updatePwd",
      component: () => import("../../components/home/personal/updatePwd.vue")
    },
    {
      path: "/ReadingOcean/wechat/mytask",
      component: () => import("../../components/task/MyTask.vue"),
      children: [
        {
          path: "pending",
          component: () => import("../../components/task/type/pending.vue")
        },
        {
          path: "finished",
          component: () => import("../../components/task/type/finished.vue")
        },
        {
          path: "overdue",
          component: () => import("../../components/task/type/overdue.vue")
        }
      ]
    },
    {
      path: "/ReadingOcean/wechat/published",
      component: publishedTask
    },
    {
      path: "/ReadingOcean/wechat/bookedu",
      component: () => import("../../components/books/Bookedu.vue")
    },
    {
      path: "/ReadingOcean/wechat/home",
      component: () => import("../../components/home/Main.vue")
    },
    {
      path: "/ReadingOcean/wechat/community",
      component: () => import("../../components/community/Community.vue")
    },
    {
      path: "/ReadingOcean/wechat/teacherForum",
      component: () => import("../../components/forum/teacherForum.vue")
    },
    {
      path: "/ReadingOcean/wechat/parentForum",
      component: () => import("../../components/forum/parentForum.vue")
    },
    {
      path: "/ReadingOcean/wechat/recommend",
      component: () => import("../../components/home/Recommend.vue")
    },
    {
      path: "/ReadingOcean/wechat/practicalCourse",
      component: () => import("../../components/home/PracticalCourse.vue")
    }
  ]
}
