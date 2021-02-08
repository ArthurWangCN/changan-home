<template>
  <div class="home-column">
    <div class="hot-knowlege-title circle-title">
      <p class="circle-title-name">专栏</p>
      <a :href="hotUrl" class="more" target="_blank">更多</a>
    </div>
    <div class="column-cards" v-if="loading">
      <el-card
        v-for="(item, index) in data"
        :key="item.sys_id"
        :body-style="{ padding: '0px' }"
        shadow="never"
        @click="goColumn(item.sys_id)"
      >
        <div
          class="column-card-img-box"
          @click="goColumn(item.sys_id)"
          style="cursor: pointer"
        >
          <img :src="item.img_url" class="image" />
        </div>
        <div class="home-column-card-info">
          <p class="home-column-card-info-title text-ellipsis" @click="goColumn(item.sys_id)">
            {{ item.title }}
          </p>
          <div class="home-column-card-info-con">
            <div class="info-con-left">
              <span>知识{{ item.knowledge_num }}个</span>
              <el-divider direction="vertical" />
              <span>订阅{{ item.subscribe_num }}人</span>
            </div>
            <button
              style="width:75px;"
              v-if="!item.is_Subscribe"
              @click="getSubscribe(true, item.sys_id)"
            >
              +订阅
            </button>
            <button
              v-if="item.is_Subscribe"
              @mouseenter="enter(index)"
              @mouseleave="leave()"
              @click="getSubscribe(false, item.sys_id)"
              class="subscribed"
            >
              {{ seen && index == current ? "取消订阅" : "已订阅" }}
            </button>
          </div>
        </div>
      </el-card>
    </div>
    <nothing v-else />
  </div>
</template>
<script>
import {
  getHotColumn,
  getSpecialDetail,
  getSubscribe,
  DeleteSubscribe,
} from "../api/interface/home";
import { publiceUrl } from "@/utils/index.js";

export default {
  data() {
    return {
      data: [],
      hotUrl: publiceUrl + "/column",
      loading: true,
      seen: false,
      current: 0,
      isDisable: false,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      getHotColumn({
        size: 5,
        current: 1,
      })
        .then((json) => {
          if (json.success) {
            const data = json.content.t;
            if (data.length > 0) {
              this.loading = true;
              this.data = data;
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

    //已订阅的专栏鼠标移入移出时的操作
    enter(index) {
      this.seen = true;
      this.current = index;
    },
    leave() {
      this.seen = false;
      this.current = null;
    },

    //订阅或者取消订阅专栏
    getSubscribe(flag, id) {
      if (this.isDisable) {
        return false;
      } else {
        this.isDisable = true;
        if (flag) {
          getSubscribe({
            columnId: id,
          })
            .then((json) => {
              this.isDisable = false;
              if (json.success) {
                this.$message.success("订阅成功");
                this.init();
              } else {
                this.$message.error(json.message);
              }
            })
            .catch((json) => {
              this.isDisable = false;
              this.$message.error(json.message);
            });
        } else {
          DeleteSubscribe({
            columnId: id,
          })
            .then((json) => {
              this.isDisable = false;
              if (json.success) {
                this.$message.success("取消订阅成功");
                this.init();
              } else {
                this.$message.error(json.message);
              }
            })
            .catch((json) => {
              this.isDisable = false;
              this.$message.error(json.message);
            });
        }
      }
    },

    //跳转专栏详情
    goColumn(id) {
      getSpecialDetail({
        columnId: id,
      })
        .then((json) => {
          if (json.success) {
            window.open(publiceUrl + "/column/#/specialDetail?id=" + id);
          } else {
            this.$message.warning("您不在该专栏的权限范围内");
          }
        })
        .catch((json) => {
          this.$message.error(json.message);
        });
    },
  },
};
</script>