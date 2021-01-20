<template>
  <div class="home-page">
    <top type="transparent" :isActive="0" :isSelect="false" :isLogo="false" />
    <!-- 首页内容部分 -->
    <div class="home-wrapper">
      <div class="home-title">
        <p>智谷研发知识平台</p>
      </div>
      <!-- 搜索 -->
      <home-search />
      <template
        v-for="(item,index) in layout"
      >
          <div :key="index" :class="{'flex': item.length >1}" class="mt20">
          <template  v-for="item2 in item">
          <component :key="item2.i" :is="item2.i"></component>
          </template>
        </div>
      </template>
    </div>
    <common-footer />
  </div>
</template>
<script>
import { publiceUrl } from "@/utils/index.js";

import HomeSearch from "@/components/Homesearch.vue";
import Knowledge from "@/components/Knowledge.vue";
import Channel from "@/components/Channel.vue";
import Personal from "@/components/Personal.vue";
import Recommendknowledge from "@/components/Recommendknowledge.vue";
import HotKnowledge from "@/components/HotKnowledge.vue";
import HotForum from "@/components/HotForum.vue";
import Column from "@/components/Column.vue";
import Information from "@/components/Information.vue";
import HotTopic from "@/components/HotTopic.vue";
import Map from "@/components/Map.vue";
import Banner from "@/components/Banner.vue";
import HotTag from "@/components/HotTag.vue";
import Notice from "@/components/Notice.vue";

import BannerComp from "@/components/ChannelBannerUser.vue";

export default {
  name: "home",
  components: {
    Top: window.TopCommonFooter.Top,
    CommonFooter: window.TopCommonFooter.CommonFooter,
    HomeSearch,
    Knowledge,
    Channel,
    Personal,
    Recommendknowledge,
    HotKnowledge,
    HotForum,
    Column,
    Information,
    HotTopic,
    Map,
    Banner,
    HotTag,
    Notice,
    BannerComp,
  },
  data() {
    return {
      // 热门标签
      hotTags: [
        "检查清单",
        "开发技术要求",
        "高压线束",
        "拓扑优化",
        "项目管理",
        "热冲压",
        "套筒",
        "活塞",
        "KC分析",
        "PVC",
        "喷涂",
        "涂装",
        "摆臂",
        "OBU",
        "ETC",
        "悬置",
        "规范",
        "缺陷",
        "SRM",
        "盐雾",
      ],
      layoutData: "",
      layout: [],
      oldY: "",
    };
  },
  created() {
    let arr = [];
    this.layoutData = [
  {
    "x": 0,
    "y": 0,
    "w": 9,
    "h": 1.5,
    "i": "Knowledge",
    "moved": false
  },
  {
    "x": 0,
    "y": 1.5,
    "w": 9,
    "h": 4,
    "i": "BannerComp",
    "moved": false
  },
  {
    "x": 0,
    "y": 5.5,
    "w": 7,
    "h": 4,
    "i": "Recommendknowledge",
    "moved": false
  },
  {
    "x": 7,
    "y": 9.5,
    "w": 2,
    "h": 4,
    "i": "HotKnowledge",
    "moved": false
  },
  {
    "x": 0,
    "y": 9.5,
    "w": 7,
    "h": 4,
    "i": "Information",
    "moved": false
  },
  {
    "x": 7,
    "y": 5.5,
    "w": 2,
    "h": 4,
    "i": "Notice",
    "moved": false
  },
  {
    "x": 0,
    "y": 13.5,
    "w": 7,
    "h": 4,
    "i": "HotTopic",
    "moved": false
  },
  {
    "x": 7,
    "y": 13.5,
    "w": 2,
    "h": 4,
    "i": "HotTag",
    "moved": false
  },
  {
    "x": 0,
    "y": 17.5,
    "w": 9,
    "h": 4,
    "i": "HotForum",
    "moved": false
  },
  {
    "x": 0,
    "y": 21.5,
    "w": 9,
    "h": 4,
    "i": "Column",
    "moved": false
  },
  {
    "x": 0,
    "y": 25.5,
    "w": 9,
    "h": 4,
    "i": "Map",
    "moved": false
  }
];
    arr = this.layoutData.sort(this.compare("y"));
    arr.map((item, index) => {
      if (this.oldY !== item.y) {
        this.layout.push([item]);
      } else {
        let existArr = this.layout[this.layout.length - 1];
        // existArr.push(item);
        if (existArr[0].x < item.x) {
          existArr.push(item);
        } else {
          existArr.unshift(item);
        }
      }
      this.oldY = item.y;
    });
    // this.layout = this.layout.map(item => {
    //   item.sort(this.compare("x"));
    // })
    console.log(this.layout);
  },
  methods: {
    //热门标签检索
    goSearch(keyword) {
      window.open(
        publiceUrl + "/krd/home/index#/generalSearch?searchKey=" + keyword
      );
    },
    compare(property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      };
    },
  },
};
</script>
<style scoped>
@import "./home.css";
.mt20 {
  margin-top: 20px;
}
</style>
