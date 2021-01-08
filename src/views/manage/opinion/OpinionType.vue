<template>
  <div>
    <el-button
      class="type-add-btn"
      type="primary"
      @click="typeDialogVisible=true;operation='add'"
      style="margin-bottom:20px;"
    >新建分类</el-button>

    <el-table
      :data="typeList"
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
      <el-table-column prop="typeName" label="分类" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button type="text" @click="editType(scope.row)">编辑</el-button>
          <el-button type="text" @click="delType(scope.row)">删除</el-button>
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
      :visible="typeDialogVisible"
      :title="dialogTitle"
      width="700px"
      :before-close="cancelDialog"
    >
      <div class="edit-content">
        <span style="flex-shrink:0;">分类名称：</span>
        <el-input v-model.trim="typeName" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmDialog" round>确 定</el-button>
        <el-button @click="cancelDialog" round>取 消</el-button>
      </span>
    </el-dialog>

    <!-- 删除弹窗 -->
    <!-- <el-dialog
      :close-on-click-modal="false"
      :visible="delTypeVisible"
      title="删除提示"
      width="500px"
      :before-close="cancelDel"
    >
      <p style="text-align:center;margin-top:10px;">删除后将无法回复，确认继续删除？</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmDel" round>确 定</el-button>
        <el-button @click="cancelDel" round>取 消</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import {
  getOpinionTypeList,
  addOpinionType,
  editOpinionType,
  delOpinionType,
  getOpinionTypeExcel
} from '@/api/interface/manage';
import { downloadExcel } from '@/utils/index';
export default {
  name: 'opinionType',
  data() {
    return {
      isLoading: false,
      typeList: [],
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
      typeDialogVisible: false,
      // delTypeVisible: false,
      typeName: '',
      operation: 'add',  // add:新建分类 ; edit:编辑分类
      curTypeId: '',
    }
  },
  computed:{
    dialogTitle() {
      return this.operation === 'add' ? '新建分类' : '编辑分类'
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
      this.getOpinionTypeList();
    },

    getOpinionTypeList() {
      this.isLoading = true;
      let params = {
        current: this.currentPage,
        size: 10,
      }
      if (this.searchText !== '') {
        params = {
          ...params,
          search: this.searchText
        }
      }
      getOpinionTypeList(params)
      .then(res => {
        if (res.success) {
          this.typeList = res.content.records;
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


    // 搜索
    search() {},

    // 编辑
    editType(row) {
      console.log(row)
      this.typeName = row.typeName;
      this.curTypeId = row.id;
      this.operation = 'edit';
      this.typeDialogVisible = true;
    },
    // 新建/编辑分类
    confirmDialog() {
      console.log(this.operation);
      // 新建
      if (this.operation === 'add') {
        addOpinionType({
          typeName: this.typeName
        }).then(res => {
          if (res.success) {
            this.getOpinionTypeList();
          }
        }).catch(err => {
          this.$message.error(err.message);
        })
      } else if (this.operation === 'edit') { // 编辑
        editOpinionType({
          id: this.curTypeId,
          typeName: this.typeName
        }).then(res => {
          if (res.success) {
            this.getOpinionTypeList();
          }
        }).catch(err => {
          this.$message.error(err.message);
        })
      }
      this.typeDialogVisible = false;
      this.typeName = '';
    },
    cancelDialog() {
      this.typeDialogVisible = false;
      this.typeName = '';
    },

    // 删除
    delType(row, index) {
      this.$confirm("删除后将无法恢复，确认继续删除？", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(() => {
        delOpinionType(row.id)
        .then(res => {
          if (res.success) {
            this.getOpinionTypeList();
          }
        }).catch(err => {
          this.$message.error(err.message);
        })
      })
      .catch(() => {});
    },

    // 分页器
    handleCurrentChange(current) {
      this.currentPage = current;
      this.getOpinionTypeList();
    },

    // 导出excel
    exportExcel() {
      getOpinionTypeExcel()
      .then(res => {
        downloadExcel(res, '意见分类管理.xlsx');
      })
    }
  }
}
</script>

<style scoped>
.edit-content {
  display: flex;
  align-items: center;
}
</style>
