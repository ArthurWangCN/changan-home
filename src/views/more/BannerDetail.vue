<template>
  <div class="more-wrapper">
    <top type="common" />

    <div  v-loading="isLoading">
      <div class="more-breadcrumb ">
        <span @click="goHome">智谷首页</span>
        <i class="el-icon-arrow-right" style="margin:0 6px;"></i>
        <span class="breadcrumb-cur">轮播图详情</span>
      </div>

      <div class="more-content notice-detail">
        <!-- 头部 -->
        <div class="detail-header">
          <h2 class="detail-title">{{ banner.title }}</h2>
          <div class="detail-info flex-align-c">
            <span class="info-item flex-align-c">
              <svg class="iconfont" aria-hidden="true">
                <use xlink:href="#iconauthor" />
              </svg>
              发布者：{{ banner.createName }}
            </span>
            <span class="info-item flex-align-c">
              <svg class="iconfont iconfont-time" aria-hidden="true">
                <use xlink:href="#icontime" />
              </svg>
              发布时间：{{ banner.createDate }}
            </span>
          </div>
        </div>

        <!-- 文章 -->
        <div class="detail-content ql-editor" v-html="banner.content"></div>

      </div>
    </div>
    <common-footer />
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import '@/assets/css/more.css';
import { getBannerInfo } from '@/api/interface/manage';
import { formatDate } from '@/utils/index.js';
export default {
  name: 'bannerDetail',
  data() {
    return {
      isLoading: false,
      banner: '',
    }
  },
  components: {
    Top: window.TopCommonFooter.Top,
    CommonFooter: window.TopCommonFooter.CommonFooter,
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getBannerInfo();
    },

    // 获取轮播图详情
    getBannerInfo() {
      this.isLoading = true;
      getBannerInfo({
        bannerId: this.$route.params.id
      }).then(res => {
        if (res.success) {
          this.banner = res.content;
          this.banner.createDate = formatDate(this.banner.createDate);
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => {
        this.$message.error(err.message);
      }).finally(_ => {
        this.isLoading = false;
      })
    },

    goHome() {
      this.$router.push({path: '/'})
    },

  }
}
</script>

<style scoped>
.banner-detail {
  box-sizing: border-box;
  padding: 0 20px 40px;
}
</style>
