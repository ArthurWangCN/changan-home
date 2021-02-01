<template>
  <div class="hot-tags">
    <div class="hot-tags-title circle-title">
      <div class="title-left">
        <p class="circle-title-name">热门标签</p>
      </div>
    </div>
    <div class="hot-tag-content">
      <div
        :class="`hot-tag loop-colors${index % 7}`"
        v-for="(item, index) in hotTags"
        :key="index"
        @click="goSearch(item)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import { getHotTags } from '@/api/interface/home';
import { publiceUrl } from "@/utils/index.js";
export default {
  name: "hotTag",
  data() {
    return {
      // 热门标签
      hotTags: [
        // "检查清单",
        // "开发技术要求",
        // "高压线束",
        // "拓扑优化",
        // "项目管理",
        // "热冲压",
        // "套筒",
        // "活塞",
        // "KC分析",
        // "PVC",
        // "喷涂",
        // "涂装",
        // "摆臂",
        // "OBU",
        // "ETC",
        // "悬置",
        // "规范",
        // "缺陷",
        // "SRM",
        // "盐雾",
      ],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getHotTags();
    },
    getHotTags() {
      getHotTags()
      .then(res => {
        if (res.success) {
          this.hotTags = res.content;
        }
      }).catch(err => {
        this.$message.error(err.message);
      })
    },
    //热门标签检索
    goSearch(keyword) {
      window.open(
        publiceUrl + "/krd/home/index#/generalSearch?searchKey=" + keyword
      );
    },
  }
};
</script>
