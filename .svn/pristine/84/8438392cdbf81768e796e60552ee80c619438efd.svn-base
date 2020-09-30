import Axios from "axios"
import * as API from "../api/api.js"
export default {
  methods: {
    getSector(config) {
      // console.log(config.studentId)
      return Axios({
        url: API.getSector.concat("/" + config.userType + "/" + config.schoolId + "/" + config.studentId + "/" + config.termId + "/1"),
        method: "GET",
        headers: {
          "Authorization": config.token
        }
      })
    }
  }
}
