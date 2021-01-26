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
      <template v-for="(item, index) in layout">
        <div :key="index" :class="{ flex: item.length > 1 }" class="mt20">
          <template v-for="comp in item">
            <banner-comp
              :key="comp.i"
              v-if="comp.i == 'BannerComp'"
            ></banner-comp>
            <component
              v-if="comp.componentStatus == 1 && comp.i != 'BannerComp'"
              :key="comp.i"
              :is="comp.i"
            ></component>
          </template>
        </div>
      </template>
    </div>
    <common-footer />
  </div>
</template>
<script>
import { publiceUrl } from "@/utils/index.js";

import { compObj } from "@/utils/index";
import { getPortalCompList } from "@/api/interface/manage";

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
    this.getPortalCompList();
  },
  methods: {
    getPortalCompList() {
      getPortalCompList()
        .then((res) => {
          if (res.success) {
            let arr = res.content;
            arr.forEach((item) => {
              item.x = item.sizeX;
              item.y = item.sizeY;
              item.w = item.sizeW;
              item.h = item.sizeH;
              item.i = compObj[item.componentName];
              item.moved = false;
            });
            this.layoutData = arr;
            this.sortComp();
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.$message.error(err.message);
        })
        .finally((_) => {
          // this.isLoading = false;
        });
    },

    sortComp() {
      let arr = [];
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
    },

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
