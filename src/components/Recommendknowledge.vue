<template>
  <div class="recommend-knowlege">
    <div class="recommend-knowlege-title">
      <div class="title-name">
        <span
          class="tab-recommend"
          :class="{ 'tab-active': tabActive === 'recommend' }"
          @click="onTabChange('recommend')"
        >
          推荐知识
          <img
            src="../assets/img/fire.png"
            :style="{ opacity: tabActive === 'recommend' ? 1 : 0.6 }"
            alt=""
          />
        </span>
        <span
          class="tab-new"
          :class="{ 'tab-active': tabActive === 'new' }"
          @click="onTabChange('new')"
          >最新知识</span
        >
      </div>
      <a class="more" @click.prevent="goKnoMore">更多</a>
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
            <p>
              <span class="dot" /><span class="kno-title-ellipsis">{{
                item.title
              }}</span>
            </p>
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
            <p>
              <span class="dot" /><span class="kno-title-ellipsis">{{
                item.title
              }}</span>
            </p>
            <span class="date">{{ item.uploadTime }}</span>
          </div>
        </div>
      </div>
    </div>
    <nothing v-else />
  </div>
</template>
<script>
import { getRecommendKno, getNewKno } from "../api/interface/home";
import { showDate, publiceUrl } from "@/utils/index.js";

export default {
  data() {
    return {
      leftdata: [],
      rightdata: [],
      loading: true,
      tabActive: "recommend", // recommend推荐知识 new最新知识
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getRecommendKno();
    },

    onTabChange(type) {
      this.tabActive = type;
      if (type === "recommend") {
        this.getRecommendKno();
      } else if (type === "new") {
        this.getNewKno();
      }
    },

    // 推荐知识列表
    getRecommendKno() {
      getRecommendKno({
        size: 12,
        current: 1,
      })
        .then((json) => {
          if (json.success) {
            this.handleKnoData(json.content.list);
          } else {
            this.loading = false;
            console.log(json.message);
          }
        })
        .catch((json) => {
          this.loading = false;
          console.log(json.message);
        });
    },

    // 推荐知识列表
    getNewKno() {
      getNewKno({
        size: 12,
        current: 1,
      })
        .then((json) => {
          if (json.list) {
            this.handleKnoData(json.list);
          } else {
            this.loading = false;
            console.log(json.message);
          }
        })
        .catch((json) => {
          this.loading = false;
          console.log(json.message);
        });
    },

    // 处理知识接口数据
    handleKnoData(d) {
      const data = d;
      if (data.length > 0) {
        this.loading = true;
        let leftdata = data.slice(0, 6);
        leftdata = leftdata.map((item, index) => {
          item.title = item.title.replace(/###|\$\$\$/g, "");
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
          item.title = item.title.replace(/###|\$\$\$/g, "");
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

    // 跳转更多
    goKnoMore() {
      if (this.tabActive === "recommend") {
        this.goRecommendKno();
      } else if (this.tabActive === "new") {
        window.open(publiceUrl + "/krd/home/index#/generalSearch?searchKey=&curSort=publicTime");
      }
    },

    // 跳转推荐知识列表页
    goRecommendKno() {
      let routeUrl = this.$router.resolve({
        path: "/recommendKno",
      });
      window.open(routeUrl.href, "_blank");
    },
  },
};
</script>