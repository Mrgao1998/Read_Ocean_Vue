<template>
  <transition name="slide">
      <div class="detail-wrapper">11111111111111</div>
  </transition>
</template>

<script>
export default {
  name: "personalAnswerdetail",
  data() {
    return {}
  }
}
</script>
<style scoped lang="stylus">
.slide-enter-active, .slide-leave-active
  transition: all 0.3s
.slide-enter,.slide-leave-to
  transform: translate3d(100%, 0, 0)
.detail-wrapper
  position fixed
  top 0
  left 0
  bottom 0
  right 0
  width 100%
  height 100%
  background pink
</style>
