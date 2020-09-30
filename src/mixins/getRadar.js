import Axios from "axios"
import * as API from "../api/api.js"
export default {
  methods: {
    getRadar(config) {
      // console.log(config.studentId)
      return Axios({
        url: API.getRadar.concat("/" + config.userType + "/" + config.studentId + "/" + config.termId),
        method: "GET",
        headers: {
          "Authorization": config.token
        }
      })
    }
  }
}
