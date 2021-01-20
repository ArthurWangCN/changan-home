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
      <!-- 通用基础知识和项目知识 -->
      <knowledge />

      <!-- 专业频道、图、个人信息 -->
      <banner-comp></banner-comp>

      <div class="flex" style="margin-top: 20px">
        <!-- 推荐知识 -->
        <recommendknowledge />
        <!-- 热点知识 -->
        <hot-knowledge />
      </div>

      <div class="flex" style="margin-top: 20px">
        <!-- 行业资讯 -->
        <information />
        <!-- 通知公告 -->
        <notice />
      </div>

      <div class="flex" style="margin-top: 20px">
        <!-- 热门话题 -->
        <hot-topic />
        <!-- 热门标签 -->
        <hot-tag />
      </div>
      
      <!-- 热门圈子 -->
      <hot-forum />
      <!-- 专栏 -->
      <column />
      <!-- 知识地图 -->
      <Map />
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
    };
  },
  methods: {
    //热门标签检索
    goSearch(keyword) {
      window.open(
        publiceUrl + "/krd/home/index#/generalSearch?searchKey=" + keyword
      );
    },
  },
};
</script>
<style scoped>
@import "./home.css";
</style>
