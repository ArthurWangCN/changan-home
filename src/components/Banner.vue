<template>
  <el-carousel
    class="home-carousel"
    trigger="click"
    height="420px"
    arrow="never"
  >
    <el-carousel-item>
      <img src="../assets/img/banner-temp.png" alt="" />
    </el-carousel-item>
    <!-- <el-carousel-item v-if="bannerList.length<=0">
      <img src="../assets/img/default-banner.png" alt="" />
    </el-carousel-item> -->
    <el-carousel-item v-for="banner in bannerList" class="banner-more" :key="banner.id" v-show="banner.isShow">
      <img :src="banner.imgUrl" alt=" " @error="defaultImg($event)" @click="goBannerDetail(banner)" />
      <!-- <div class="notice-link">
        <p>{{ banner.title }}</p>
        <span class="bannner-more" @click="goBannerDetail(banner)">查看更多</span>
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
      defaultBanner: require('../assets/img/default-banner.png'),
    };
  },
  created() {
    this.init();
  },
  computed: {
    defaultImg1() {
      return `this.scr="${require('../assets/img/default-banner.png')}"`
    }
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
            if(this.bannerList.length <= 0) {
              document.querySelector('.el-carousel__indicators').style.display = 'none';
            }
            this.bannerList = this.bannerList.splice(0, 10);
          } else {
            this.$message.error(json.message);
          }
        })
        .catch((json) => {
          this.$message.error(json.message);
        });
    },

    // 默认图片
    defaultImg(event) {
      let img = event.srcElement;
      img.src = this.defaultBanner;
      img.onerror = null;
    },

    // 跳转轮播图详情
    goBannerDetail(banner) {
      this.$router.push({
        path: `/banner/detail/${banner.id}`
      })
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
  /* background-image: url('../assets/img/default-banner.png'); */
  background-size: cover;
}
.banner-more {
  cursor: pointer;
}
.notice-link > p {
  max-width: 550px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
