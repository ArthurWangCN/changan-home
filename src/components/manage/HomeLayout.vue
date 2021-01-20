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
      >
        <!-- {{ item.i }} -->
        <component style="width: 100%" :is="item.i"></component>
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

export default {
  name: "homeLayout",
  data() {
    return {
      layout: [
        { x: 0, y: 0, w: 9, h: 1.5, i: "Knowledge" },
        { x: 0, y: 1.5, w: 9, h: 4, i: "BannerComp" },
        { x: 0, y: 5.5, w: 7, h: 4, i: "Recommendknowledge" },
        { x: 7, y: 5.5, w: 2, h: 4, i: "HotKnowledge" },
        { x: 0, y: 9.5, w: 7, h: 4, i: "Information" },
        { x: 7, y: 9.5, w: 2, h: 4, i: "Notice" },
        { x: 0, y: 13.5, w: 7, h: 4, i: "HotTopic" },
        { x: 7, y: 13.5, w: 2, h: 4, i: "HotTag" },
        { x: 0, y: 17.5, w: 9, h: 4, i: "HotForum" },
        { x: 0, y: 21.5, w: 9, h: 4, i: "Column" },
        { x: 0, y: 25.5, w: 9, h: 4, i: "Map" },
        // { x: 0, y: 0, w: 2, h: 4, i: "FunctionModule" },
      ],
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
  methods: {
    layoutUpdatedEvent: function(newLayout) {
      console.log("Updated layout: ", newLayout);
    },
    // movedEvent: function(i, newX, newY) {
    //   console.log("MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
    // },
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
