<template lang="html">
  <transition name="pop">
    <div class="evaluate" v-show="evaPopupShow">
      <!--评价弹出框-->
      <div class="shade">
        <div class="evaluate-popup">
          <div class="evaluate-logo">
            <img style="width: 100%" src="../../../../static/images/Book/eva-logo.png" alt="评价图标">
          </div>
          <div class="evaluate-list">
            <label class="evaluate-list__item" v-for="evaluation in allEvaOptions"
              :class="{'evaluate-list--selected': isSelected(selectedEvaluations, evaluation), 'evaluate-list--unselected':!isSelected(selectedEvaluations, evaluation)}">
              <input class="checkbox-invisible" type="checkbox" :value="evaluation" v-model="selectedEvaluations">
              {{ evaluation }}
            </label>
            <label class="evaluate-list__item" v-for="evaluation in allScoreOptions"
              :class="{'evaluate-list--selected': isSelected(selectedScore, evaluation), 'evaluate-list--unselected':!isSelected(selectedScore, evaluation)}">
              <input class="checkbox-invisible" type="radio" :value="evaluation" v-model="selectedScore">
              {{ evaluation }}
            </label>
          </div>
          <div class="evaluate-actions">
            <mt-button class="evaluate-pop-btn cancel" type="primary" @click="$emit('close')">取消</mt-button>
            <mt-button class="evaluate-pop-btn submit" type="primary" :disabled="!submitDisabled()"
              @click="submitEvent">提交</mt-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import errorHandler from "../../../mixins/errorHandler.js"
  import user from "../../../mixins/user.js"
  export default {
    mixins: [user, errorHandler],
    props: {
      evaPopupShow: Boolean,
      allEvaOptions: Array,
      allScoreOptions: Array
    },
    data() {
      return {
        selectedEvaluations: [],
        selectedScore: ""
      }
    },
    methods: {
      isSelected(arr, value) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === value) {
            return true
          }
        }
        return false
      },
      submitDisabled() {
        return this.selectedEvaluations.length > 0 || this.selectedScore !== ""
      },
      submitEvent() {
        this.$emit("submitEva", this.selectedEvaluations)
        this.$emit("submit", this.selectedScore)
      }
    }
  }
</script>

<style lang="css" scoped>
  .evaluate {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 2;
    background-color: rgba(0, 0, 0, .7);
  }

  /*评价弹出框*/
  .shade {
    display: flex;
    width: 100%
  }

  .evaluate-popup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    width: 70%;
    margin: auto;
    border-radius: 10px;
    padding-bottom: 11px;
  }

  .checkbox-invisible {
    width: 1px;
    height: 1px;
    opacity: 0;
  }

  .evaluate-list {
    position: relative;
    width: 69%;
    margin: auto;
    padding: 50px 0 13px 0;
  }

  .evaluate-list__item {
    display: block;
    border: solid 1px #e0e0e0;
    font-weight: 300;
    width: 100%;
    padding: 5px 0;
    margin-top: 7px;
    font-size: 13px;
    text-align: center;
    border-radius: 5px;
  }

  .evaluate-logo {
    position: absolute;
    width: 110px;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .evaluate-actions {
    display: flex;
    width: 76%;
    margin: auto;
    justify-content: space-between;
  }

  .evaluate-pop-btn {
    height: auto;
    border: 0;
    outline: none;
    color: #fff;
    width: 50%;
    text-align: center;
    font-size: 14px;
    border-radius: 5px;
    font-weight: 300;
    padding: 5px 0;
    background-color: #21D0C3;
  }

  .cancel {
    background-color: #F06966;
  }

  @keyframes fadeIn {
    0% {
      transform: translateY(-20px);
      opacity: 0;
    }

    100% {
      transform: translateY(0px);
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    0% {
      transform: translateY(0px);
      opacity: 1;
    }

    100% {
      transform: translateY(-20px);
      opacity: 0;
    }
  }

  .pop-enter-active {
    transition: all .5s ease-in-out;
    -webkit-animation: fadeIn .3s ease-in-out 0.1s backwards;
    -moz-animation: fadeIn .3s ease-in-out 0.1s backwards;
    -o-animation: fadeIn .3s ease-in-out 0.1s backwards;
  }

  .pop-enter,
  .pop-leave-active {
    opacity: 0;
  }

  .pop-leave-active {
    transition: all .5s ease-in-out;
    -webkit-animation: fadeOut .3s ease-in-out 0.1s backwards;
    -moz-animation: fadeOut .3s ease-in-out 0.1s backwards;
    -o-animation: fadeOut .3s ease-in-out 0.1s backwards;
  }

  .evaluate-list--selected {
    border: solid 1px #21D0C3;
    color: #21D0C3;
  }

  .evaluate-list--unselected {
    border: solid 1px #e0e0e0;
  }

  .evaluate-pop-btn+.evaluate-pop-btn {
    margin-left: 7px;
  }
</style>