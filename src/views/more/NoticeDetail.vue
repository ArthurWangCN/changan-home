<template>
  <div class="more-wrapper">
    <top type="common" />

    <div  v-loading="isLoading">
      <div class="more-breadcrumb ">
        <span @click="goHome">智谷首页</span>
        <i class="el-icon-arrow-right" style="margin:0 6px;"></i>
        <span class="breadcrumb-cur">通知公告</span>
      </div>

      <div class="more-content notice-detail">
        <div class="detail-header">
          <h2 class="detail-title">通知公告公告</h2>
          <div class="detail-info">
            <span>
              
            </span>
          </div>
        </div>
      </div>
    </div>
    <common-footer />
  </div>
</template>

<script>
import '@/assets/css/more.css';
import {
  getNotice
} from '@/api/interface/more';
export default {
  name: 'moreNotice',
  data() {
    return {
      isLoading: false,
      noticeInput: '',
      noticeList:  [],
      currentPage: 1,
      total: 0,
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
    },

    goHome() {
      this.$router.push({path: '/'})
    },
  }
}
</script>

<style scoped>
.notice-detail {
  box-sizing: border-box;
  padding: 0 20px 40px;
}

</style>
