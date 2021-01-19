<template>
  <div class="recommend-knowlege">
    <div class="recommend-knowlege-title">
      <div class="title-name">
        推荐知识
        <img src="../assets/img/fire.png" alt="" />
      </div>
      <a class="more" @click.prevent="goRecommendKno">更多</a>
    </div>
    <div class="recommend-knowlege-parts" v-if="loading">
      <div class="recommend-knowlege-left recommend-knowlege-part">
        <div class="home-knowlege-items" v-for="(item, index) in leftdata">
          <div class="first-column-item" v-show="item.isShowPicInfo">
            <div class="item-img">
              <img src="../assets/img/document.png" alt="" />
              <svg class="iconfont iconword-s" aria-hidden="true">
                <use xlink:href="#iconword-s" />
              </svg>
            </div>
            <div class="recommend-item-title">
              <div class="first-item-title" @click="goKnow(item.detailUrl)">
                {{ item.title }}
              </div>
              <span v-show="item.uploadTime" class="first-item-time">
                <svg class="iconfont" aria-hidden="true">
                  <use xlink:href="#icontime1" />
                </svg>
                {{ item.uploadTime }}</span
              >
            </div>
          </div>
          <div
            class="recommend-item-item"
            @mouseenter="showleftData(index)"
            v-show="!item.isShowPicInfo"
          >
            <p><span class="dot" />{{ item.title }}</p>
            <span class="date">{{ item.uploadTime }}</span>
          </div>
        </div>
      </div>
      <div class="recommend-knowlege-right recommend-knowlege-part">
        <div class="home-knowlege-items" v-for="(item, index) in rightdata">
          <div class="first-column-item" v-show="item.isShowPicInfo">
            <div class="item-img">
              <img src="../assets/img/hotknowledge.png" alt="" />
            </div>
            <div class="recommend-item-title">
              <div class="first-item-title" @click="goKnow(item.detailUrl)">
                {{ item.title }}
              </div>
              <span v-show="item.uploadTime" class="first-item-time">
                <svg class="iconfont" aria-hidden="true">
                  <use xlink:href="#icontime1" /></svg
                >{{ item.uploadTime }}</span
              >
            </div>
          </div>
          <div
            class="recommend-item-item"
            @mouseenter="showrightData(index)"
            v-show="!item.isShowPicInfo"
          >
            <p><span class="dot" />{{ item.title }}</p>
            <span class="date">{{ item.uploadTime }}</span>
          </div>
        </div>
      </div>
    </div>
    <nothing v-else />
  </div>
</template>
<script>
import { getKnowledge } from "../api/interface/home";
import { showDate } from "@/utils/index.js";

export default {
  data() {
    return {
      leftdata: [],
      rightdata: [],
      loading: true,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      getKnowledge({
        size: 12,
        current: 1,
      })
        .then((json) => {
          if (json.success) {
            const data = json.content.list;
            if (data.length > 0) {
              this.loading = true;
              let leftdata = data.slice(0, 6);
              leftdata = leftdata.map((item, index) => {
                if (index == 0) {
                  item.isShowPicInfo = true;
                } else {
                  item.isShowPicInfo = false;
                }
                item.uploadTime = showDate(item.uploadTime);
                return item;
              });
              let rightdata = data.slice(6);
              rightdata = rightdata.map((item, index) => {
                if (index == 0) {
                  item.isShowPicInfo = true;
                } else {
                  item.isShowPicInfo = false;
                }
                item.uploadTime = showDate(item.uploadTime);
                return item;
              });
              this.leftdata = leftdata;
              this.rightdata = rightdata;
            } else {
              this.loading = false;
            }
          } else {
            this.loading = false;
            this.$message.error(json.message);
          }
        })
        .catch((json) => {
          this.loading = false;
          this.$message.error(json.message);
        });
    },

    // 推荐知识鼠标上移显示待图片的信息
    showleftData(index) {
      const newHotKnowlege = this.leftdata.map((item, itemIndex) => {
        item.isShowPicInfo = itemIndex === index;
        return item;
      });
      this.leftdata = newHotKnowlege;
    },

    // 推荐知识鼠标上移显示待图片的信息
    showrightData(index) {
      const newHotKnowlege = this.rightdata.map((item, itemIndex) => {
        item.isShowPicInfo = itemIndex === index;
        return item;
      });
      this.rightdata = newHotKnowlege;
    },

    //跳转知识页面
    goKnow(url) {
      window.open(url);
    },

    // 跳转推荐知识列表页
    goRecommendKno() {
      let routeUrl = this.$router.resolve({
        path: "/recommendKno"
      });
      window.open(routeUrl.href, '_blank');
    },
  },
};
</script>