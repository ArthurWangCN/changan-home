<template>
  <div class="user-demand manage-comp">
    <div class="user-demand-header">
      <span class="btn-export" @click="exportExcel">导出数据</span>
      <el-input
        v-model="searchText"
        placeholder="搜索"
        @keyup.13.native="search"
        size="small"
        class="manage-search-input"
      >
        <svg
          slot="suffix"
          aria-hidden="true"
          class="icon icon-search"
          @click="search"
        >
          <use xlink:href="#iconsearch" />
        </svg>
      </el-input>
    </div>
    <el-table
      ref="singleTable"
      :data="demandList"
      :header-cell-style="headerStyle"
      :row-style="rowStyle"
      v-loading="isLoading"
      stripe
    >
      <el-table-column label="序号" align="center" width="80">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="demandContent" label="需求内容" align="center"></el-table-column>
      <el-table-column
        prop="supplier"
        label="已有信息或已交流供应商"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="requiredItems"
        label="所需项目/所需单位"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="userName"
        label="提出人"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column prop="userUnit" label="提出人单位" align="center"></el-table-column>
      <el-table-column prop="userTel" label="提出人联系方式" align="center"></el-table-column>
      <el-table-column prop="submitTime" label="提交时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" :disabled="scope.row.demandStatus==1" @click="reply(scope.row)">回复</el-button>
          <el-button v-if="scope.row.demandStatus==1" type="text" @click="showReply(scope.row)">需求回复</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="10"
      hide-on-single-page
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
        v-model.trim="replyContent"
        placeholder="请输入回复"
        resize="none"
      />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmReply" round>确 定</el-button>
        <el-button @click="cancelReply" round>取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import '@/assets/css/manage.css';
import {
  getDemandList,
  replyDemand,
  getDemandExcel
} from '@/api/interface/manage';
import { downloadExcel } from '@/utils/index';
export default {
  name: 'userDemand',
  data() {
    return {
      isLoading: false,
      demandList: [],
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
      searchText: '',
      currentPage: 1,
      total: 0,
      replyVisible: false,
      replyContent: '',
      curDemandId: '',
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getDemandList();
    },

    getDemandList() {
      this.isLoading = true;
      getDemandList({
        current: this.currentPage,
        size: 10,
        search: this.searchText
      })
      .then(res => {
        if (res.records) {
          this.demandList = res.records;
          this.total = res.total
        }
      }).catch(err => {
        this.$message.error(err.message);
      }).finally(_ => {
        this.isLoading = false;
      })
    },

    // 搜索
    search() {
      this.currentPage = 1;
      this.getDemandList();
    },

    // 回复
    reply(row) {
      this.replyVisible = true;
      this.curDemandId = row.id;
    },
    confirmReply() {
      replyDemand({
        id: this.curDemandId,
        reply: this.replyContent
      }).then(res => {
        if (res.success) {
          this.$message.success('已回复');
          this.getDemandList();
        }
      }).catch(err => {
        this.$message.error(err.message);
      }).finally(_ => {
        this.cancelReply();
      })
    },
    cancelReply() {
      this.replyVisible = false;
      this.curDemandId = '';
      this.replyContent = '';
    },

    showReply(row) {
      this.$alert(row.reply, '需求回复内容', {
        confirmButtonText: '确定',
        customClass: 'reply-alert',
        callback: action => {}
      });
    },

    // 分页器
    handleCurrentChange(current) {
      this.currentPage = current;
      this.getDemandList();
    },

    // 导出excel
    exportExcel() {
      getDemandExcel()
      .then(res => {
        downloadExcel(res, '用户需求管理.xlsx');
      })
    },
  }
}
</script>

<style scoped>
.user-demand-header {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}
</style>
