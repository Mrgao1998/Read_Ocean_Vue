<template lang="html">
  <!-- 我的学生弹出框 -->
  <div class="popup">
    <mt-header title="我的学生" fixed class="popup__header">
      <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <div class="table_title--class"
          @click="dropDownVisible ? dropDownVisible = false : dropDownVisible = true">{{ currentClass.name }}</div>
    <div class="popup__content">
      <div class="table__header">
        <div class="table__title">学生</div>
        <div class="table__title">身份证后六位</div>
        <div class="table__title">修改密码</div>
          <transition name="expand">
          <div class="dropdown" v-show="dropDownVisible">
            <ul class="dropdown__list">
              <li class="dropdown__list-item" v-for="item in userInfo.classes" @click="changeClass(item.id)">
                {{ item.name }}
              </li>
            </ul>
          </div>
        </transition>
      </div>
      <table class="table__body">
          <tr class="table__item" v-for="stu in students" :key="stu.id">
            <td class="table__cell">{{ stu.name }}</td>
            <td class="table__cell">{{stu.idcard}}</td>
            <td class="table__cell"><button @click="editPassword(stu.idcard,stu.name)">编辑</button></td>
          </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Axios from "axios"
import * as API from "../../../../src/api/api.js"
import user from "../../../mixins/user.js"
import errorHandler from "../../../mixins/errorHandler.js"
import { Toast, MessageBox } from "mint-ui"
export default {
  mixins: [user, errorHandler],
  data() {
    return {
      dropDownVisible: false,
      students: [],
      selectedClassId: ""
    }
  },
  computed: {
    currentClass() {
      return this.userInfo.classes.find(val => {
        return val.id === this.selectedClassId
      })
    }
  },
  methods: {
    changeClass(id) {
      this.selectedClassId = id
      this.dropDownVisible = !this.dropDownVisible
      Axios({
        url: API.getStudents,
        methods: "GET",
        params: {
          classId: id
        },
        headers: {
          "Authorization": this.token
        }
      }).then(res => {
        this.students = res.data
      }).catch(err => {
        this.errorHandler(err)
      })
    },
    editPassword(idCard, userName) {
      MessageBox.prompt("请输入新密码", "修改密码").then(({ value, action }) => {
        Axios({
          url: API.retrievePwd,
          method: "post",
          params: {
            idCard: idCard,
            userName: userName,
            newPwd: value
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": this.token
          }
        }).then((res) => {
          Toast({
            message: "新密码设置成功",
            position: "top",
            duration: 1500
          })
        }).catch((err) => {
          this.errorHandler(err)
        })
      })
    }
  },
  created() {
    this.selectedClassId = this.userInfo.classes[0].id
    /* 获取学生 */
    Axios({
      url: API.getStudents,
      methods: "GET",
      params: {
        classId: this.selectedClassId
      },
      headers: {
        "Authorization": this.token
      }
    }).then(res => {
      this.students = res.data
    }).catch(err => {
      this.errorHandler(err)
    })
  }
}
</script>

<style lang="css">
@import "../../../../static/css/personal/popup.css";
@import "../../../../static/css/personal/table.css";

.dropdown {
  position: absolute;
  top: 40px;
  left: 50%;
  width: 50%;
  background-color: #9cb8ca;
  z-index: 0;
}

.dropdown__list {
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 10px 5px;
  list-style: none;
}

.dropdown__list-item {
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 5px;
  color: #fff;
  text-align: center;
  font-size: 0.8rem;
}

.table__cell button {
  border: none;
  border-radius: 50px;
  color: rgb(255, 255, 255);
  background-color: red;
}

.table_title--class {
  color: rgb(255, 255, 255);
  position: fixed;
  right: 1.5rem;
  top: 1.2rem;
  font-size: 0.8rem;
  z-index: 1;
}

.table_title--class::after {
  position: absolute;
  top: 0.1rem;
  right: -0.8rem;
  content: "";
  display: block;
  width: 10px;
  height: 10px;
  background: url("../../../../static/images/personal-center/sort-down.svg");
  background-size: cover;
}

.expand-enter,
.expand-leave-active {
  transform: translateY(-100%);
  opacity: 0;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.5s;
}

.checkbox-invisible {
  width: 1px;
  height: 1px;
  opacity: 0;
}
</style>
