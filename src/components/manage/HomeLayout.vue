<template>
  <div class="layout-wrapper">
    <div class="layout-inner">
      <p class="layout-tip">拖动调整组件位置</p>

      <div class="layout-btns">
        <span class="btn-save" @click="saveComp">保<br />存</span>
        <span class="btn-cancel" @click="getPortalCompList">取<br />消</span>
      </div>

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

      <function-module @updateComp="getPortalCompList"></function-module>
    </div>
  </div>
</template>

<script>
import VueGridLayout from "vue-grid-layout";
const GridItem = VueGridLayout.GridItem;
const GridLayout = VueGridLayout.GridLayout;

import Knowledge from "@/components/Knowledge.vue";
import BannerComp from "@/components/ChannelBannerUser.vue";
import Recommendknowledge from "@/components/Recommendknowledge.vue";
import HotKnowledge from "@/components/HotKnowledge.vue";
import HotForum from "@/components/HotForum.vue";
import Column from "@/components/Column.vue";
import Information from "@/components/Information.vue";
import HotTopic from "@/components/HotTopic.vue";
import Map from "@/components/Map.vue";
import HotTag from "@/components/HotTag.vue";
import Notice from "@/components/Notice.vue";
import FunctionModule from "@/components/manage/FunctionModule.vue";

import { compObj } from '@/utils/index';  // 接口返回组件名和前端组件名做映射
import { getPortalCompList, savePortalComp } from "@/api/interface/manage";

export default {
  name: "homeLayout",
  data() {
    return {
      layout: [],
    };
  },
  components: {
    GridLayout,
    GridItem,
    BannerComp,
    Knowledge,
    Recommendknowledge,
    HotKnowledge,
    HotForum,
    Column,
    Information,
    HotTopic,
    Map,
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

    // 首页组件列表
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
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.$message.error(err.message);
        })
    },

    // 移动组件保存
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
      savePortalComp(params)
      .then(res => {
        if (res.success) {
          this.$message.success('更新组件位置成功');
        } else {
          this.$message.error(res.message);
        }
      })
      .catch((err) => {
        this.$message.error(err.message);
      })
    },

    // 组件更新事件
    layoutUpdatedEvent: function (newLayout) {
      // console.log("Updated layout: ", newLayout);
      // this.savePortalComp(newLayout);
    },
    movedEvent: function (i, newX, newY) {
      // console.log("MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
    },

    // 保存组件更新
    saveComp () {
      this.savePortalComp(this.layout);
    }
  },
};
</script>

<style scoped>
.layout-wrapper {
  width: 100%;
  /* width: 1600px; */
  box-sizing: border-box;
  /* padding-right: 100px; */
  background-color: #f1f2f5;
  margin-top: 20px;
  padding-bottom: 20px;
}
.layout-wrapper .layout-inner {
  /* width: 1500px; */
  max-width: 1500px;
  margin: 0 auto;
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

.layout-btns {
  position: fixed;
  right: 80px;
  top: 178px;
  z-index: 999;
}
.layout-btns .btn-save,
.layout-btns .btn-cancel {
  display: block;
  width: 30px;
  background-color: #999999;
  color: #ffffff;
  text-align: center;
  font-size: 14px;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 10px 0;
  cursor: pointer;
}
.layout-btns .btn-save {
  background-color: #367fff;
  margin-bottom: 10px;
}

@media screen and (max-width: 1600px) {
  .layout-btns {
    right: 50px;
  }
}
</style>
