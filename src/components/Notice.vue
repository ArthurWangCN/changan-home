<template>
  <div class="hot-knowlege notice">
    <div class="hot-knowlege-title circle-title">
      <p class="circle-title-name">通知公告</p>
      <a class="more" @click="goMore">更多</a>
    </div>
    <div class="hot-knowlege-items">
      <div
        class="hot-knowlege-item-wrapper"
        v-for="(item, index) in hotKnowlege"
        :key="item.sysId"
      >
        <div class="first-column-item" v-show="item.isShowPicInfo">
          <div class="item-img">
            <img src="../assets/img/document0.png" alt="" />
            <!-- <svg :class="`iconfont iconHot iconHot${index}`" aria-hidden="true">
              <use xlink:href="#iconHot" />
              <text x="5" y="13" font-size="12" fill="white">
                {{ index + 1 }}
              </text>
            </svg> -->
          </div>
          <div class="recommend-item-info">
            <div class="first-item-title" @click="goNoticeDetail(item)">{{ item.title }}</div>
            <div class="first-item-intro">{{ item.detail }}</div>
          </div>
        </div>
        <div
          class="normal-column-item notice-item"
          @mouseenter="showHotKnowlegeItemWithImg(index)"
          v-show="!item.isShowPicInfo"
        >
          <!-- <svg
            v-if="index === 0 || index === 1 || index === 2"
            :class="`iconfont iconHot iconHot${index}`"
            aria-hidden="true"
          >
            <use xlink:href="#iconHot" />
            <text x="5" y="13" font-size="12" fill="white">
              {{ index + 1 }}
            </text>
          </svg>
          <span v-else>{{ index + 1 }}</span> -->
          <span class="notice-item-dot"></span>
          <p class="notice-item-name text-ellipsis">{{ item.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getNotice,
  getNoticeInfo
} from '@/api/interface/more.js';
export default {
  data() {
    return {
      hotKnowlege: [],  // 热点知识
    };
  },
  created() {
    this.init();
  },
  methods: {

    init() {
      this.getNotice();
    },

    getNotice() {
      getNotice({
        current: 1,
        size: 8,
        search: ''
      }).then(res => {
        if (res.success) {
          let arr = res.content.records;
          arr.forEach(item => {
            this.hotKnowlege.push({
              title: item.title,
              detail: item.abstractText,
              imgUrl: item.imgUrl,
              isShowPicInfo: false,
              sysId: item.sysId,
            })
          });
          this.hotKnowlege[0].isShowPicInfo = true;
        } else {
          this.$message.error(res.message);
        }
      })
      .catch(err => {
        this.$message.error(err.message);
      }).finally(_ => {
      })
    },

    // 热点知识鼠标上移显示待图片的信息
    showHotKnowlegeItemWithImg(index) {
      const newHotKnowlege = this.hotKnowlege.map((item, itemIndex) => {
        item.isShowPicInfo = itemIndex === index;
        return item;
      });
      this.hotKnowlege = newHotKnowlege;
    },

    goMore() {
      let routeUrl = this.$router.resolve({
        path: "/notice"
      });
      window.open(routeUrl.href, '_blank');
      // this.$router.push({
      //   path: '/notice'
      // })
    },

    goNoticeDetail(item) {
      // this.$router.push({path: `/notice/detail/${item.sysId}`});
      let routeUrl = this.$router.resolve({
        path: `/notice/detail/${item.sysId}`
      });
      window.open(routeUrl.href, '_blank');
    }
  },
};
</script>