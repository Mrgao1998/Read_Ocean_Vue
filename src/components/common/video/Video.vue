<template>
  <div class="video-card" :style="{ width: customWidth }">
    <a :href="videoUrl" >
      <div class="video-card__content">
        <i class="play-icon"></i>
      </div>
      <div class="video-card__bottom">
        <h5 class="video-card__name">{{title}}</h5>
      </div>
    </a>
  </div>
</template>

<script>
  export default {
    name: "Course",
    props: {
      title: {
        type: String,
        required: true
      },
      customWidth: {
        type: String,
        default() {
          return "45%"
        }
      },
      videoUrl: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped>
  a {
    text-decoration: none;
  }

  .video-card {
    box-sizing: border-box;
    display: inline-block;
    width: 45%;
    background: url("../../../../static/images/courses/video.png");
    background-size: cover;
    height: 150px;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .22);
    border-radius: 6px;
    margin: 10px 2.5% 0;
  }

  .video-card__bottom {
    height: 20%;
    width: 100%;
    border-top: 1px dashed #dae2eb;
    font-size: 12px;
    color: white;
    background-color: rgba(0,0,0,.67);
    text-align: center;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    padding: 0 5px;
    box-sizing: border-box;
  }

  .video-card__name {
    margin: 0px;
    margin-top: 5%;
    width: 100%;
    font-weight: bold;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .video-card__content {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    /*background-color: rgba(60,137,253,.77);*/
    text-align: center;
    font-size: 1.2em;
    height: 80%;
  }

  .video-card__content-icon{
    padding-top: 25%;
  }

  .video-title {
    display: block;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .video-card__detail-btn {
    text-align: center;
    padding: 10px 5px;
    background-color: #2F80ED;
    color: #fff;
    border-radius: 3px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .play-icon {
    display: block;
    height: 55%;
    width: 50%;
    background-image: url("../../../../static/images/courses/play-circle.svg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    opacity: .7;
  }
</style>
