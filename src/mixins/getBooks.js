import Axios from "axios"
import * as API from "../api/api.js"
export default {
  methods: {
    getBooks(config) {
      return Axios({
        url: API.getBooks,
        methods: "GET",
        params: {
          type: config.type || "all",
          userId: config.userId || null,
          grade: config.grade || null,
          schoolId: config.schoolId || null,
          category: config.category || null,
          pageNum: config.pageNum,
          limits: config.limits
        },
        headers: {
          "Authorization": config.token
        }
      })
    }
  }
}
