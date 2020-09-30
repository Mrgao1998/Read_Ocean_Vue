import Axios from "axios"
import * as API from "../api/api.js"
export default {
  methods: {
    getPosts(config) {
      return Axios({
        url: API.getPosts,
        method: "GET",
        params: {
          type: config.type,
          blockId: config.blockId,
          category: config.category || null,
          pageNum: config.pageNum || 1,
          limits: config.limits || 5
        },
        headers: {
          "Authorization": config.token
        }
      })
    }
  }
}
