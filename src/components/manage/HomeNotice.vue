<template>
  <div class="manage-home-comp">
    <div class="flex-align-c flex-space-between home-comp-header">
      <span class="manage-home-btn" @click="noticeDialogVisible=true;">发布公告</span>
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
      :data="noticeList"
      :header-cell-style="headerStyle"
      :row-style="rowStyle"
      v-loading="isLoading"
      stripe
    >
      <template slot="empty">
        <p v-show="!isLoading">暂无数据</p>
      </template>
      <el-table-column label="序号" align="center" width="100">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="公告名称" align="left"></el-table-column>
      <el-table-column prop="createName" label="添加人" align="center" width="100"></el-table-column>
      <el-table-column prop="createDate" label="添加时间" align="center" width="200"></el-table-column>
      <el-table-column label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button type="text" @click="editNotice(scope.row)">编辑</el-button>
          <el-button type="text" @click="delNotice(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="total"
      background
      hide-on-single-page
      style="text-align: center; margin-top: 50px; margin-bottom: 30px"
    />

    <!-- 新建/编辑分类弹窗 -->
    <el-dialog
      custom-class="manage-dialog"
      :close-on-click-modal="false"
      :visible="noticeDialogVisible"
      :title="dialogTitle"
      width="700px"
      :before-close="cancelDialog"
    >
      <div class="edit-content">
        <el-input placeholder="请输入标题" v-model="noticeTitle"></el-input>
        <div class="notice-upload flex-align-c">
          <el-upload
            action="/index/file/upload"
          >
            <span class="manage-home-btn" style="width: 120px;">上传附件</span>
          </el-upload>
          <span class="ml10" style="color: #367fff">文件大小500M以内</span>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmDialog" round>确 定</el-button>
        <el-button @click="cancelDialog" round>取 消</el-button>
      </span>
    </el-dialog>

    <!-- 删除弹窗 -->
    <el-dialog
      custom-class="manage-dialog"
      :close-on-click-modal="false"
      :visible="delNoticeVisible"
      title="删除提示"
      width="500px"
      :before-close="cancelDel"
    >
      <p style="text-align:center;margin-top:10px;">确定删除该公告？</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmDel" round>确 定</el-button>
        <el-button @click="cancelDel" round>取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import '@/assets/css/manage.css';
import {
  getNoticeList,
  addNotice,
  delNotice,
} from '@/api/interface/manage';
export default {
  name: 'homeNotice',
  data() {
    return {
      isLoading: false,
      searchText: '',
      noticeList: [],
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
      noticeDialogVisible: true,
      delNoticeVisible: false,
      curNotice: '',
      noticeTitle: '',
      operation: 'add',
    }
  },
  computed: {
    dialogTitle() {
      return '发布公告'
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getNoticeList();
    },

    getNoticeList() {
      this.isLoading = true;
      getNoticeList({
        current: this.currentPage,
        size: 10,
      }).then(res => {
        if (res.success) {
          this.noticeList = res.content.records;
          this.total = res.content.total;
        } else {
          this.$message.error(res.message);
        }
      })
      .catch(err => {
        this.$message.error(err.message);
      }).finally(_ => {
        this.isLoading = false;
      })
    },

    search() {},


    editNotice() {},

    handleCurrentChange() {},

    confirmDialog() {
      if (this.operation === 'add') {
        addNotice({
          notice: {
            title: this.noticeTitle,
            abstracttext: '',
            content: ''
          },
          attachmentList:{}
        })
      }
      this.noticeDialogVisible = false;
    },

    cancelDialog() {
      this.noticeDialogVisible = false;
    },

    // 删除公告
    delNotice(row) {
      this.delNoticeVisible = true;
      this.curNotice = row;
      console.log(this.curNotice);
    },
    confirmDel() {
      delNotice({
        noticeSysId: this.curNotice.sysId
      }).then(res => {
        if (res.success) {
          this.getNoticeList();
        } else {
          this.$message.error(res.message);
        }
      })
      .catch(err => {
        this.$message.error(err.message);
      }).finally(_ => {
        this.delNoticeVisible = false;
      })
    },
    cancelDel() {
      this.delNoticeVisible = false;
    },
  }
}
</script>

<style scoped>
.home-comp-header {
  margin-bottom: 20px;
}
.notice-upload {
  margin-top: 10px;
}
</style>
