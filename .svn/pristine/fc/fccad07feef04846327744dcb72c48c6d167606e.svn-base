import Axios from "axios"
import * as API from "../api/api.js"
export default {
  methods: {
    getBlocks(config) {
      return Axios({
        url: API.getBlocks,
        methods: "GET",
        params: {
          category: config.category,
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
