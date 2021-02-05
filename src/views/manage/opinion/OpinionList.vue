<template>
  <div>
    <el-table
      ref="singleTable"
      :data="opinionList"
      :header-cell-style="headerStyle"
      :row-style="rowStyle"
      v-loading="isLoading"
      stripe
    >
      <template slot="empty">
        <p v-show="!isLoading">暂无数据</p>
      </template>
      <el-table-column label="序号" align="center" width="80">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="userName"
        label="提出人"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column prop="userUnit" label="提出人单位" align="center"></el-table-column>
      <el-table-column prop="userTel" label="提出人联系方式" align="center"></el-table-column>
      <el-table-column prop="submitTime" label="提交时间" align="center"></el-table-column>
      <el-table-column prop="submitInfo" label="意见建议" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button :disabled="scope.row.replyStatus==1" type="text" @click="reply(scope.row)">回复</el-button>
          <el-button v-if="scope.row.replyStatus==1" type="text" @click="showReply(scope.row)">回复意见</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      hide-on-single-page
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="total"
      background
      style="text-align: center; margin-top: 50px; margin-bottom: 30px"
    />

    <el-dialog
      custom-class="manage-dialog"
      :close-on-click-modal="false"
      :visible="replyVisible"
      title="回复"
      width="700px"
      :before-close="cancelReply"
    >
      <p style="color:#333;margin-bottom:20px;">请填写回复：</p>
      <el-input
        type="textarea"
        :rows="6"
        v-model="replyContent"
        placeholder="请输入回复"
        resize="none"
      />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmReply" round>确 定</el-button>
        <el-button @click="cancelReply" round>取 消</el-button>
      </span>
    </el-dialog>

    <!-- 查看回复弹窗 -->
    <el-dialog
      custom-class="manage-dialog"
      :close-on-click-modal="false"
      :visible="replyTextVisible"
      title="回复内容"
      width="500px"
      :before-close="hideReply"
    >
      <p class="reply-text" v-html="curReplyText"></p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="hideReply" round>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getOpinionList,
  replyOpinion,
  getOpinionExcel,
} from '@/api/interface/manage';
import { downloadExcel } from '@/utils/index';
export default {
  name: 'opinionList',
  data() {
    return {
      isLoading: false,
      opinionList: [],
      headerStyle: {
        height: "50px",
        background: "#498be3",
        fontSize: "16px",
        color: "#ffffff",
        fontWeight: "700",
      },
      rowStyle: {
        fontSize: "14px",
        color: "#323232",
        backgroundColor: "",
      },
      currentPage: 1,
      total: 0,
      replyVisible: false,
      replyContent: '',
      curReplyId: '',
      replyTextVisible: false,
      curReplyText: '',
    }
  },
  props: {
    searchText: {
      type: String,
      default: ''
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getOpinionList();
    },

    // 获取意见列表
    getOpinionList() {
      this.isLoading = true;
      getOpinionList({
        current: this.currentPage,
        size: 10,
        search: this.searchText
      })
      .then(res => {
        if (res.records) {
          this.opinionList = res.records;
          this.total = res.total
        }
      }).catch(err => {
        this.$message.error(err.message);
      }).finally(_ => {
        this.isLoading = false;
      })
    },

    // 回复
    reply(row) {
      this.replyVisible = true;
      this.curReplyId = row.id;
    },
    confirmReply() {
      if (this.replyContent.trim() === '') {
        this.$message.warning('回复内容不能为空');
        return;
      }
      replyOpinion({
        id: this.curReplyId,
        reply: this.replyContent.trim()
      }).then(res => {
        if (res.success) {
          this.$message.success('已回复');
          this.getOpinionList();
        }
      }).catch(err => {
        this.$message.error(err.message);
      }).finally(_ => {
        this.cancelReply();
      })
    },
    cancelReply() {
      this.replyVisible = false;
      this.curReplyId = '';
      this.replyContent = '';
    },

    showReply(row) {
      this.replyTextVisible = true;
      this.curReplyText = row.reply.replace(/\n/g, '<br>');
    },
    hideReply() {
      this.replyTextVisible = false;
      this.curReplyText = '';
    },

    // 分页器
    handleCurrentChange(current) {
      this.currentPage = current;
      this.getOpinionList();
    },

    exportExcel() {
      getOpinionExcel()
      .then(res => {
        downloadExcel(res, '意见建议.xlsx');
      })
    },
  }
}
</script>
