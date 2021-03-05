<template>
  <div>
    <el-dialog
      custom-class="circle-dialog"
      :close-on-click-modal="false"
      :visible="dialogVisible"
      :title="dialogTitle"
      width="700px"
      :before-close="cancelDialog"
    >
      <p v-show="showJoinTips">
        您尚未加入该圈子，无法查看该圈子中的话题，是否加入该圈子？
      </p>
      <div class="verify" v-show="needVerify">
        <span>验证消息：</span>
        <el-input
          v-if="curTopic.circleType && curTopic.circleType == '2'"
          class="verify-input"
          type="textarea"
          v-model="verifyMsg"
          placeholder="请输入内容..."
        ></el-input>
      </div>
      <p class="join-success" v-show="hasSubmit">
        <i class="el-icon-success"></i>{{ successTip }}
      </p>
      <span v-if="!hasSubmit" slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmDialog" round>加入</el-button>
        <el-button @click="cancelDialog" round>取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { joinCircle } from "../api/interface/home";
export default {
  name: "circleDialog",
  data() {
    return {
      dialogTitle: "申请加入圈子",
      dialogVisible: false,
      verifyMsg: "",
      circleId: "",
      needVerify: false,
      hasSubmit: false,
      showJoinTips: true,
      successTip: "提交成功，请等待圈子管理员审核",
    };
  },
  props: {
    curTopic: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    confirmDialog() {
      if (this.showJoinTips) {
        if (this.curTopic.circleType == "1") {
          // 公开圈子
          this.joinCircle();
        } else if (this.curTopic.circleType == "2") {
          // 私密圈子
          this.showJoinTips = false;
          this.needVerify = true;
        }
      } else {
        this.joinCircle();
      }
    },

    // 加入圈子
    joinCircle() {
      joinCircle({
        circleId: this.curTopic.circleId,
        content: this.verifyMsg,
      }).then((res) => {
        if (res.success) {
          this.hasSubmit = true;
          this.showJoinTips = false;
          this.needVerify = false;
          this.dialogTitle = "加入圈子";
          this.successTip =
            this.curTopic.circleType == "1"
              ? "您已成功加入圈子"
              : "提交成功，请等待圈子管理员审核";
          this.$emit('joinCircle');
        }
      }).catch(err => {
        console.log(err)
      });
    },

    cancelDialog() {
      this.dialogVisible = false;
      this.resetDialog();
    },

    resetDialog() {
      this.dialogTitle = "申请加入圈子";
      this.needVerify = false;
      this.hasSubmit = false;
      this.showJoinTips = true;
      this.verifyMsg = "";
    },
  },
};
</script>

<style>
.circle-dialog.el-dialog {
  border-radius: 8px;
}
.circle-dialog.el-dialog .el-dialog__header {
  border-bottom: 1px solid #eee;
}
.circle-dialog.el-dialog .el-dialog__footer {
  text-align: center;
  padding-bottom: 30px;
}
.circle-dialog.el-dialog .el-dialog__footer .el-button + .el-button {
  margin-left: 20px;
}
.circle-dialog.el-dialog .el-dialog__body {
  padding: 30px;
}
.circle-dialog.el-dialog .el-dialog__title {
  font-size: 16px;
  color: #333;
}
.circle-dialog .el-icon-success {
  color: #19cd38;
  margin-right: 10px;
}

.circle-dialog .verify {
  display: flex;
}
.circle-dialog .verify > span {
  flex-shrink: 0;
  width: 80px;
  margin-top: 6px;
}
.circle-dialog .verify-input {
  width: 505px;
  height: 95px;
}
.circle-dialog .verify-input .el-textarea__inner {
  height: 100%;
  resize: none;
}
.join-success {
  min-height: 115px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-10px);
}
</style>