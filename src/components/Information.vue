<template>
  <div class="industry-information">
    <div
      class="industry-information-title circle-title"
      style="padding-bottom: 0"
    >
      <div class="title-left">
        <!-- 原行业资讯 -->
        <p class="circle-title-name">技术资讯</p>
        <ul class="industry-information-catgs">
          <!-- <li :class="{'active':currentIndusInfo===0}">
            <span class="industry-information-catg" @click="changeIndusInfo(0)">全部</span>
          </li> -->
          <li
            v-for="(item, index) in titledata"
            :key="index"
            :class="currentIndusInfo === item.id ? 'active' : ''"
          >
            <span
              class="industry-information-catg"
              @click="changeIndusInfo(item.id)"
              >{{ item.name }}</span
            >
          </li>
        </ul>
      </div>
      <a class="more">更多</a>
    </div>
    <div class="industry-information-content" v-if="loading">
      <div class="industry-information-content-item">
        <div class="home-knowlege-items cp" v-for="(item, index) in leftdata" :key="index">
          <div class="first-column-item" v-show="item.isShowPicInfo">
            <div class="item-img">
              <img src="../assets/img/information.png" alt="" />
            </div>
            <div class="recommend-item-title">
              <div class="first-item-title" style="margin-top: 10px">
                {{ item.title }}
              </div>
              <div class="first-item-intro">{{ item.abstracttext }}</div>
              <span
                v-show="item.createDate"
                class="first-item-time"
                style="margin-top: 10px"
                ><svg class="iconfont" aria-hidden="true">
                  <use xlink:href="#icontime1" /></svg
                >{{ item.createDate }}</span
              >
            </div>
          </div>
          <div
            class="recommend-item-item"
            @mouseenter="showleftData(index)"
            v-show="!item.isShowPicInfo"
          >
            <p>
              <span class="dot"></span>
              <span class="recommend-item-item-title text-ellipsis">{{ item.title }}</span>
            </p>
            <span class="date">{{ item.createDate }}</span>
          </div>
        </div>
      </div>
      <div class="industry-information-content-item">
        <div class="home-knowlege-items cp" v-for="(item, index) in rightdata">
          <div class="first-column-item" v-show="item.isShowPicInfo">
            <div class="item-img">
              <img src="../assets/img/information.png" alt="" />
            </div>
            <div class="recommend-item-title">
              <div class="first-item-title" style="margin-top: 10px">
                {{ item.title }}
              </div>
              <div class="first-item-intro">{{ item.abstracttext }}</div>
              <span
                v-show="item.createDate"
                class="first-item-time"
                style="margin-top: 10px"
                ><svg class="iconfont" aria-hidden="true">
                  <use xlink:href="#icontime1" /></svg
                >{{ item.createDate }}</span
              >
            </div>
          </div>
          <div
            class="recommend-item-item"
            @mouseenter="showrightData(index)"
            v-show="!item.isShowPicInfo"
          >
            <p>
              <span class="dot"></span>
              <span class="recommend-item-item-title text-ellipsis">{{ item.title }}</span>
            </p>
            <span class="date">{{ item.createDate }}</span>
          </div>
        </div>
      </div>
    </div>
    <nothing v-else />
  </div>
</template>
<script>
import { getInformation, getInformationItem } from "../api/interface/home";
import { showDate } from "@/utils/index.js";

export default {
  data() {
    return {
      currentIndusInfo: "",
      titledata: [],
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
      getInformation({})
        .then((json) => {
          if (json.success) {
            if (json.content.length > 0) {
              this.titledata = json.content;
              this.currentIndusInfo = json.content[0].id;
              this.getItem(this.currentIndusInfo);
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

    //获取行业资讯详情列表
    getItem(id) {
      getInformationItem({
        type: id,
        size: 12,
        current: 1,
      })
        .then((json) => {
          if (json.success) {
            const data = json.content.records;
            if (data.length > 0) {
              this.loading = true;
              let leftdata = data.slice(0, 6);
              leftdata = leftdata.map((item, index) => {
                if (index == 0) {
                  item.isShowPicInfo = true;
                } else {
                  item.isShowPicInfo = false;
                }
                item.createDate = showDate(item.createDate);
                return item;
              });
              let rightdata = data.slice(6, 12);
              rightdata = rightdata.map((item, index) => {
                if (index == 0) {
                  item.isShowPicInfo = true;
                } else {
                  item.isShowPicInfo = false;
                }
                item.createDate = showDate(item.createDate);
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

    // 改变行业资讯分类
    changeIndusInfo(catg) {
      this.currentIndusInfo = catg;
      this.getItem(catg);
    },

    // 行业资讯鼠标上移显示待图片的信息
    showleftData(index) {
      const newHotKnowlege = this.leftdata.map((item, itemIndex) => {
        item.isShowPicInfo = itemIndex === index;
        return item;
      });
      this.leftdata = newHotKnowlege;
    },

    // 行业资讯鼠标上移显示待图片的信息
    showrightData(index) {
      const newHotKnowlege = this.rightdata.map((item, itemIndex) => {
        item.isShowPicInfo = itemIndex === index;
        return item;
      });
      this.rightdata = newHotKnowlege;
    },
  },
};
</script>