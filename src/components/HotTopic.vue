<template>
  <div class="hot-topic">
    <div class="hot-topic-title circle-title" style="padding-bottom: 0">
      <div class="title-left">
        <p
          :class="`circle-title-name ${
            currentHotTopic === 'hot' ? 'active' : ''
          }`"
          @click="changeHotTopic('hot')"
        >
          热门话题
        </p>
        <p
          :class="`circle-title-name ${
            currentHotTopic === 'new' ? 'active' : ''
          }`"
          @click="changeHotTopic('new')"
        >
          最新话题
        </p>
      </div>
    </div>
    <div class="hot-topic-content" v-if="loading">
      <div class="hot-topic-item">
        <div class="home-knowlege-items" v-for="(item, index) in leftdata">
          <div class="first-column-item" v-show="item.isShowPicInfo">
            <div class="item-img">
              <img src="../assets/img/hottopic.png" alt="" />
            </div>
            <div class="recommend-item-title">
              <div
                class="first-item-title"
                style="margin-top: 10px"
                @click="goTopic(item.id)"
              >
                {{ item.questionTitle }}
              </div>
              <div class="first-item-intro">{{ item.description }}</div>
              <span
                v-show="item.createTime"
                class="first-item-time"
                style="margin-top: 10px"
                ><svg class="iconfont" aria-hidden="true">
                  <use xlink:href="#icontime1" /></svg
                >{{ item.createTime }}</span
              >
            </div>
          </div>
          <div
            class="recommend-item-item"
            @mouseenter="showleftData(index)"
            v-show="!item.isShowPicInfo"
          >
            <p><span class="dot" />{{ item.questionTitle }}</p>
            <span class="date">{{ item.createTime }}</span>
          </div>
        </div>
      </div>
      <div class="hot-topic-item">
        <div class="home-knowlege-items" v-for="(item, index) in rightdata">
          <div class="first-column-item" v-show="item.isShowPicInfo">
            <div class="item-img">
              <img src="../assets/img/hottopic.png" alt="" />
            </div>
            <div class="recommend-item-title">
              <div
                class="first-item-title"
                style="margin-top: 10px"
                @click="goTopic(item.id)"
              >
                {{ item.questionTitle }}
              </div>
              <div class="first-item-intro">{{ item.description }}</div>
              <span
                v-show="item.createTime"
                class="first-item-time"
                style="margin-top: 10px"
                ><svg class="iconfont" aria-hidden="true">
                  <use xlink:href="#icontime1" /></svg
                >{{ item.createTime }}</span
              >
            </div>
          </div>
          <div
            class="recommend-item-item"
            @mouseenter="showrightData(index)"
            v-show="!item.isShowPicInfo"
          >
            <p><span class="dot" />{{ item.questionTitle }}</p>
            <span class="date">{{ item.createTime }}</span>
          </div>
        </div>
      </div>
    </div>
    <nothing v-else />
  </div>
</template>
<script>
import { getHotTopic, getTopicItem } from "../api/interface/home";
import { showDate, publiceUrl } from "@/utils/index.js";

export default {
  data() {
    return {
      currentHotTopic: "hot",
      leftdata: [],
      rightdata: [],
      loading: true,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      getHotTopic({
        size: 8,
        current: 1,
        type: this.currentHotTopic,
      })
        .then((json) => {
          if (json.success) {
            const data = json.content;
            if (data.rows.length > 0) {
              this.loading = true;
              let leftdata = data.rows.slice(0, 4);
              leftdata = leftdata.map((item, index) => {
                if (index == 0) {
                  item.isShowPicInfo = true;
                } else {
                  item.isShowPicInfo = false;
                }
                item.createTime = showDate(item.createTime);
                return item;
              });
              let rightdata = data.rows.slice(4);
              rightdata = rightdata.map((item, index) => {
                if (index == 0) {
                  item.isShowPicInfo = true;
                } else {
                  item.isShowPicInfo = false;
                }
                item.createTime = showDate(item.createTime);
                return item;
              });
              this.leftdata = leftdata;
              this.rightdata = rightdata;
            } else {
              this.loading = false;
            }
          } else {
            this.loading = false;
            this.$message.error(json.message);
          }
        })
        .catch((json) => {
          this.loading = false;
          this.$message.error(json.message);
        });
    },

    // 改变热门话题分类
    changeHotTopic(catg) {
      this.currentHotTopic = catg;
      this.init();
    },

    // 热门话题鼠标上移显示待图片的信息
    showleftData(index) {
      const newHotKnowlege = this.leftdata.map((item, itemIndex) => {
        item.isShowPicInfo = itemIndex === index;
        return item;
      });
      this.leftdata = newHotKnowlege;
    },

    // 热门话题鼠标上移显示待图片的信息
    showrightData(index) {
      const newHotKnowlege = this.rightdata.map((item, itemIndex) => {
        item.isShowPicInfo = itemIndex === index;
        return item;
      });
      this.rightdata = newHotKnowlege;
    },

    //跳转热门话题详情
    goTopic(id) {
      getTopicItem({
        questionId: id,
      })
        .then((json) => {
          if (json.success) {
            if (json.content) {
              window.open(
                publiceUrl + "/circle/#/circle-specialArea/detail?id=" + id
              );
            } else {
              this.$message.warning("您暂无权限查看该话题");
            }
          } else {
            this.$message.error(json.message);
          }
        })
        .catch((json) => {
          this.$message.error(json.message);
        });
    },
  },
};
</script>