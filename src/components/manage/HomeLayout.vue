<template>
  <div class="layout-wrapper">
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
        <component :is="item.i"></component>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
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

import VueGridLayout from "vue-grid-layout";
export default {
  name: "homeLayout",
  data() {
    return {
      layout: [
        { x: 0, y: 0, w: 9, h: 1.5, i: "Knowledge" },
        // { x: 0, y: 0, w: 9, h: 4, i: "1" },
        { x: 0, y: 0, w: 7, h: 4, i: "Recommendknowledge" },
        { x: 7, y: 0, w: 2, h: 4, i: "HotKnowledge" },
        { x: 0, y: 0, w: 7, h: 4, i: "Information" },
        { x: 7, y: 0, w: 2, h: 4, i: "Notice" },
        { x: 0, y: 0, w: 7, h: 4, i: "HotTopic" },
        { x: 7, y: 0, w: 2, h: 4, i: "HotTag" },
        { x: 0, y: 0, w: 9, h: 4, i: "HotForum" },
        { x: 0, y: 0, w: 9, h: 4, i: "Column" },
        { x: 0, y: 0, w: 9, h: 4, i: "Map" },
      ],
    };
  },
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
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
  },
  methods: {
    layoutUpdatedEvent: function(newLayout){
      console.log("Updated layout: ", newLayout)
    }
  }
};
</script>

<style scoped>
.layout-wrapper {
  width: 1500px;
  background-color: #f1f2f5;
}
.layout-wrapper >>> .vue-grid-item.vue-grid-placeholder {
  background: #f1f2f5;
}
</style>
