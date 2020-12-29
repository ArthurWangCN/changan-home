<template>
  <div class="hot-forum">
    <div class="hot-knowlege-title circle-title">
      <p class="circle-title-name">热门圈子</p>
      <a :href="hotUrl" class="more" target="_blank">更多</a>
    </div>
    <div class="hot-forum-cards" v-if="loading">
      <el-card
        v-for="(item, index) in data"
        :body-style="{ padding: '0px' }"
        shadow="never"
        @click="goHotforum(item)"
      >
        <div
          class="column-card-img-box"
          @click="goHotforum(item)"
          style="cursor: pointer"
        >
          <img :src="item.imageUrl" class="image" />
        </div>
        <div class="home-column-card-info">
          <p class="home-column-card-info-title" @click="goHotforum(item)">
            {{ item.circleName }}
          </p>
          <div class="home-column-card-info-con">
            <div class="info-con-left">
              <span>{{ item.memberCount }}关注</span>
              <el-divider direction="vertical" />
              <span>{{ item.topicCount }}话题</span>
            </div>
            <button
              v-if="item.joinStatus == 0 && item.circleType == '1'"
              @click="getIn(item.circleId)"
              @click.stop
            >
              +加入
            </button>
            <button
              v-if="item.joinStatus == 0 && item.circleType == '2'"
              @click="getOpen(item.circleId)"
              @click.stop
              style="width: 75px"
            >
              +申请加入
            </button>
            <button v-if="item.joinStatus == 2" class="subscribed">
              已加入
            </button>
            <button v-if="item.joinStatus == 1" class="subscribed">
              审核中
            </button>
          </div>
        </div>
      </el-card>
    </div>
    <nothing v-else />
    <el-dialog
      class="detail-dialog"
      :close-on-click-modal="false"
      :visible="visible"
      width="700px"
      :before-close="cancel"
    >
      <span slot="title" class="el-dialog__title">申请加入圈子</span>
      <div class="dialog-con1">
        <div class="dialog-item">
          <span style="color: #333; margin-right: 25px">验证信息：</span>
          <el-input
            type="textarea"
            :rows="4"
            v-model.trim="content"
            placeholder="请输入内容"
            resize="none"
            maxlength="255"
            show-word-limit
          />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm" round :disabled="isDisable"
          >加 入</el-button
        >
        <el-button @click="cancel" round>取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getHotForum, getForum } from "../api/interface/home";
import { publiceUrl } from "@/utils/index.js";

export default {
  data() {
    return {
      data: [],
      hotUrl: publiceUrl + "/circle/#/circle-square",
      loading: true,
      isDisable: false,
      visible: false,
      content: "",
      id: "",
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      getHotForum({
        current: 1,
        size: 4,
      })
        .then((json) => {
          if (json.success) {
            const data = json.content.circleList;
            if (data.length > 0) {
              this.loading = true;
              this.data = data.map((item) => {
                item.imageUrl = publiceUrl + item.coverUrl;
                return item;
              });
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

    //跳转圈子详情
    goHotforum(data) {
      if (data.joinStatus == 0) {
        this.$message.warning("您暂无权限查看该圈子，请先加入圈子");
        return false;
      } else {
        window.open(
          publiceUrl +
            "/circle/#/circle-gateway?circleId=" +
            data.circleId +
            "&circleName=" +
            data.circleName
        );
      }
    },

    //打开申请加入弹框
    getOpen(id) {
      this.id = id;
      this.visible = true;
    },

    //关闭弹框
    cancel() {
      this.visible = false;
      this.content = "";
      this.id = "";
    },

    //加入圈子
    getIn(id) {
      this.id = id;
      this.confirm();
    },

    //申请加入圈子
    confirm() {
      if (this.isDisable) {
        return false;
      } else {
        this.isDisable = true;
        getForum({
          circleId: this.id,
          content: this.content,
        })
          .then((json) => {
            if (json.success) {
              this.visible = false;
              this.content = "";
              this.id = "";
              this.init();
            } else {
              this.isDisable = false;
              this.$message.error(json.message);
            }
          })
          .catch((json) => {
            this.isDisable = false;
            this.$message.error(json.message);
          });
      }
    },
  },
};
</script>
<style scoped>
.dialog-item {
  display: flex;
  align-items: flex-start;
}
.el-textarea {
  width: 520px;
}
</style>