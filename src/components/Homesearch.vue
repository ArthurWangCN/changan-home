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
        placeholder="知识/话题/圈子/同事"
        @keyup.enter.native="toSearch"
        v-model.trim="keyword"
      />
      <button class="search-btn" @click="toSearch">
        <svg class="iconsearch" aria-hidden="true">
          <use xlink:href="#iconsearch" />
        </svg>
      </button>
      <a href="#" class="advance-search" @click.prevent="toAdvanceSearch">高级检索</a>
    </div>
    <div class="hot-search">
      <h4 class="hot-search-title">热搜</h4>
      <div class="hot-search-words">
        <span v-for="(item, index) in hotdata" :key="index" :title="item.keyword" @click="goHot(item.keyword)">{{
          item.hotword
        }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { publiceUrl } from "@/utils/index.js";
import {
  getHotWordList
} from '@/api/interface/home';

export default {
  data() {
    return {
      currentTopic: "知识",
      keyword: "",
      searchdata: ["知识", "话题", "圈子", "同事"],
      hotdata: ["防腐", "试验样车", "悬架参数", "CTS", "DVPVIPT"],
    };
  },
  created() {
    this.getHotWordList();
  },
  methods: {
    // 选择主题
    changeHomeSearchTopic(topic) {
      this.currentTopic = topic;
    },

    // 热搜词
    getHotWordList() {
      getHotWordList()
      .then((json) => {
          if (json.success) {
            let arr = json.content;
            arr.forEach(item => {
              if (item.keyword.length > 5) {
                item.hotword = item.keyword.slice(0,5) + '...';
              } else {
                item.hotword = item.keyword;
              }
            });
            this.hotdata = arr;
          } else {
            this.$message.error(json.message);
          }
        })
        .catch((json) => {
          this.$message.error(json.message);
        });
    },

    // 跳转到搜索页
    toSearch() {
      // if (this.keyword == "" && this.currentTopic == "知识") {
      //   this.$message.warning("请输入检索内容");
      //   return false;
      // }
      if (this.currentTopic == "知识") {
        window.open(
          publiceUrl +
            "/krd/home/index#/generalSearch?searchKey=" +
            this.keyword
        );
      } else if (this.currentTopic == "话题") {
        window.open(
          publiceUrl + "/circle/#/circle-squareMore-topic?searchFuzzyShow=" + this.keyword
        );
      } else if (this.currentTopic == "圈子") {
        window.open(
          publiceUrl + "/circle/#/circle-square?searchKey=" + this.keyword
        );
      } else if (this.currentTopic == "同事") {
        let routeUrl = this.$router.resolve({
          path: "/colleague",
          query: {
            searchKey: this.keyword
          }
        });
        window.open(routeUrl.href, '_blank');
      }
    },

    // 高级检索
    toAdvanceSearch() {
      window.open(
        publiceUrl + "/krd/home/index#/advanceSearch"
      );
    },

    //热搜
    goHot(item) {
      // this.keyword = item;
      window.open(
          publiceUrl +
            "/krd/home/index#/generalSearch?searchKey=" +
            item
        );
    },
  },
};
</script>