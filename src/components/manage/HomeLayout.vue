<template>
  <div class="layout-wrapper">
    <p class="layout-tip">拖动调整组件位置</p>

    <grid-layout
      :layout.sync="layout"
      :col-num="9"
      :row-height="100"
      :is-draggable="true"
      :is-resizable="false"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[20, 10]"
      :use-css-transforms="true"
      @layout-updated="layoutUpdatedEvent"
    >
      <grid-item
        v-for="item in layout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
        @moved="movedEvent"
      >
        <component v-if="item.componentStatus==1" style="width: 100%" :is="item.i"></component>
        <div class="mask"></div>
      </grid-item>
    </grid-layout>

    <function-module></function-module>
  </div>
</template>

<script>
import VueGridLayout from "vue-grid-layout";

const GridItem = VueGridLayout.GridItem;
const GridLayout = VueGridLayout.GridLayout;
import Knowledge from "@/components/Knowledge.vue";
import Channel from "@/components/Channel.vue";
import BannerComp from "@/components/ChannelBannerUser.vue";
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
import FunctionModule from "@/components/FunctionModule.vue";

import {compObj} from '@/utils/index';
import { getPortalCompList, savePortalComp } from "@/api/interface/manage";

export default {
  name: "homeLayout",
  data() {
    return {
      // layout: [
      //   { x: 0, y: 0, w: 9, h: 1.5, i: "Knowledge" },
      //   { x: 0, y: 1.5, w: 9, h: 4, i: "BannerComp" },
      //   { x: 0, y: 5.5, w: 7, h: 4, i: "Recommendknowledge" },
      //   { x: 7, y: 5.5, w: 2, h: 4, i: "HotKnowledge" },
      //   { x: 0, y: 9.5, w: 7, h: 4, i: "Information" },
      //   { x: 7, y: 9.5, w: 2, h: 4, i: "Notice" },
      //   { x: 0, y: 13.5, w: 7, h: 4, i: "HotTopic" },
      //   { x: 7, y: 13.5, w: 2, h: 4, i: "HotTag" },
      //   { x: 0, y: 17.5, w: 9, h: 4, i: "HotForum" },
      //   { x: 0, y: 21.5, w: 9, h: 4, i: "Column" },
      //   { x: 0, y: 25.5, w: 9, h: 4, i: "Map" },
      // ],
      layout: [],
    };
  },
  components: {
    GridLayout,
    GridItem,
    BannerComp,
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
    FunctionModule,
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getPortalCompList();
    },

    getPortalCompList() {
      getPortalCompList()
        .then((res) => {
          if (res.success) {
            let arr = res.content;
            arr.forEach((item) => {
              item.x = parseFloat(item.sizeX);
              item.y = parseFloat(item.sizeY);
              item.w = parseFloat(item.sizeW);
              item.h = parseFloat(item.sizeH);
              item.i = compObj[item.componentName];
              item.moved = false;
            });
            this.layout = arr;
            console.log(this.layout);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.$message.error(err.message);
        })
        .finally(_ => {
          // this.isLoading = false;
        });
    },

    savePortalComp(newLayout) {
      let params = [];
      newLayout.forEach(item => {
        params.push({
          sizeX: item.x,
          sizeY: item.y,
          sizeW: item.w,
          sizeH: item.h,
          id: item.id,
          componentName: item.componentName,
        })
      })
      savePortalComp(params).then
    },

    layoutUpdatedEvent: function (newLayout) {
      console.log("Updated layout: ", newLayout);
      this.savePortalComp(newLayout);
    },
    movedEvent: function (i, newX, newY) {
      console.log("MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
    },
  },
};
</script>

<style scoped>
.layout-wrapper {
  width: 1600px;
  box-sizing: border-box;
  padding-right: 100px;
  background-color: #f1f2f5;
  margin-top: 20px;
  padding-bottom: 20px;
}
.layout-tip {
  font-size: 14px;
  color: #367fff;
  padding: 13px 0 10px 20px;
}
.layout-wrapper >>> .vue-grid-item.vue-grid-placeholder {
  background: #f1f2f5;
}
.layout-wrapper >>> .vue-grid-item {
  touch-action: none;
}
/* 组件上方遮罩 阻止点击行为 */
.mask {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 2009;
}
</style>
