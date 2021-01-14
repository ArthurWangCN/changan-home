<template>
  <div class="more-wrapper">
    <top type="common" />

    <div  v-loading="isLoading">
      <div class="more-breadcrumb ">
        <span @click="goHome">智谷首页</span>
        <i class="el-icon-arrow-right" style="margin:0 6px;"></i>
        <span class="breadcrumb-cur" @click="goNotice">通知公告</span>
      </div>

      <div class="more-content notice-detail">
        <!-- 头部 -->
        <div class="detail-header">
          <h2 class="detail-title">{{ notice.title }}</h2>
          <div class="detail-info flex-align-c">
            <span class="info-item flex-align-c">
              <svg class="iconfont" aria-hidden="true">
                <use xlink:href="#iconauthor" />
              </svg>
              发布者：{{ notice.createName }}
            </span>
            <span class="info-item flex-align-c">
              <svg class="iconfont iconfont-time" aria-hidden="true">
                <use xlink:href="#icontime" />
              </svg>
              发布时间：{{ notice.createDate }}
            </span>
          </div>
        </div>

        <!-- 文章 -->
        <div class="detail-content" v-html="notice.content"></div>

        <!-- 附件 -->
        <ul class="attachment-list">
          <li
            v-for="item in notice.attachmentList"
            :key="item.id"
            class="attachment-item"
          >
            <svg class="iconfont icon-file" aria-hidden="true">
              <use :xlink:href="item.iconType" />
            </svg>
            <span class="attachment-name" @click="downloadFile(item)">{{ item.attachmentName }}</span>
          </li>
        </ul>
      </div>
    </div>
    <common-footer />
  </div>
</template>

<script>
import '@/assets/css/more.css';
import {
  getNotice,
  getNoticeInfo
} from '@/api/interface/more';
import {
  getFileIcon,
  formatDate
} from '@/utils/index.js';
export default {
  name: 'moreNotice',
  data() {
    return {
      isLoading: false,
      notice: '',
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
      this.getNoticeInfo();
    },

    getNoticeInfo() {
      this.isLoading = true;
      getNoticeInfo({
        noticeSysId: this.$route.params.id
      }).then(res => {
        if (res.success) {
          this.notice = res.content;
          this.notice.createDate = formatDate(this.notice.createDate);
          this.notice.attachmentList.forEach(item => {
            let nameArr = item.attachmentName.split('.');
            let format = nameArr[nameArr.length -1];
            let iconType = `#icon${getFileIcon(format)}-s`;
            this.$set(item, 'iconType', iconType);
          });
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

    goNotice() {
      this.$router.push({path: '/notice'})
    },

    downloadFile(attachment) {
      let downloadUrl = encodeURI(attachment.attachmentUrl);
      window.open(downloadUrl, "_blank");
    }
  }
}
</script>

<style scoped>
.notice-detail {
  box-sizing: border-box;
  padding: 0 20px 40px;
}

</style>
