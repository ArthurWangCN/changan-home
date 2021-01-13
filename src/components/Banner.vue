<template>
  <el-carousel
    class="home-carousel"
    trigger="click"
    height="420px"
    arrow="never"
  >
    <el-carousel-item v-if="bannerList.length<=0">
      <img src="../assets/img/default-banner.png" alt="" />
    </el-carousel-item>
    <el-carousel-item v-for="banner in bannerList" :key="banner.id" v-show="banner.isShow">
      <!-- <img src="../assets/img/banner.jpg" alt="" />
      <div class="notice-link">
        <p>通知公告:长安汽车与宁德时代更新盖世汽车讯距外媒</p>
        <a href="#">查看更多</a>
      </div> -->
      <img :src="banner.imgUrl" alt=" " />
      <!-- <img src="../assets/img/banner.jpg" alt="" /> -->
      <!-- <div class="notice-link">
        <p>{{ banner.title }}</p>
        <a href="#">查看更多</a>
      </div> -->
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import { getBanner } from "../api/interface/home";
export default {
  name: "banner",
  data() {
    return {
      bannerList: [{}],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getBanner();
    },

    getBanner() {
      getBanner({})
        .then((json) => {
          if (json.success) {
            this.bannerList = json.content;
            // if(this.bannerList.length === 1) {
            //   document.querySelector('.el-carousel__indicators').style.display = 'none';
            // }
          } else {
            this.$message.error(json.message);
          }
        })
        .catch((json) => {
          this.$message.error(json.message);
        });
    }
  }
};
</script>

<style scoped>
.home-carousel >>> .el-carousel__button {
  opacity: 1;
  background-color: #a8a8a8;
  width: 20px;
  height: 4px;
  border-radius: 2px;
}
.home-carousel >>> .el-carousel__indicator.is-active button {
  background-color: #ffffff;
  width: 30px;
  height: 6px;
  border-radius: 3px;
}
.home-carousel >>> .el-carousel__item{
  background-image: url('../assets/img/default-banner.png');
  background-size: cover;
}
</style>
