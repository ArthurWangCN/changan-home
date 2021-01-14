<template>
  <div class="home-search">
    <div class="search-topic">
      <ul>
        <li
          v-for="(item, index) in searchdata"
          @click="changeHomeSearchTopic(item)"
          :class="currentTopic === item ? 'active' : ''"
          :key="index"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="search-group">
      <el-input
        placeholder="知识/圈子/同事"
        @keyup.enter="toSearch"
        v-model.trim="keyword"
      />
      <button class="search-btn" @click="toSearch">
        <svg class="iconsearch" aria-hidden="true">
          <use xlink:href="#iconsearch" />
        </svg>
      </button>
      <a href="#" class="advance-search">高级检索</a>
    </div>
    <div class="hot-search">
      <h4 class="hot-search-title">热搜</h4>
      <div class="hot-search-words">
        <span v-for="(item, index) in hotdata" :key="index" @click="goHot(item)">{{
          item
        }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { publiceUrl } from "@/utils/index.js";

export default {
  data() {
    return {
      currentTopic: "知识",
      keyword: "",
      searchdata: ["知识", "圈子", "同事"],
      hotdata: ["防腐", "试验样车", "悬架参数", "CTS", "DVPVIPT"],
    };
  },
  methods: {
    // 选择主题
    changeHomeSearchTopic(topic) {
      this.currentTopic = topic;
    },

    // 跳转到搜索页
    toSearch() {
      if (this.keyword == "" && this.currentTopic == "知识") {
        this.$message.warning("请输入检索内容");
        return false;
      }
      if (this.currentTopic == "知识") {
        window.open(
          publiceUrl +
            "/krd/home/index#/generalSearch?searchKey=" +
            this.keyword
        );
      } else if (this.currentTopic == "圈子") {
        window.open(
          publiceUrl + "/circle/#/circle-square?searchKey=" + this.keyword
        );
      } else if (this.currentTopic == "同事") {
        console.log("搜同事");
        let routeUrl = this.$router.resolve({
          path: "/colleague",
          query: {
            searchKey: this.keyword
          }
        });
        window.open(routeUrl.href, '_blank');
      }
    },

    //热搜
    goHot(item) {
      this.keyword = item;
    },
  },
};
</script>