<template>
  <div>
    <el-button type="primary" @click="typeDialogVisible=true;operation='add'" style="margin-bottom:20px;">新建分类</el-button>

    <el-table
      :data="typeList"
      :header-cell-style="headerStyle"
      :row-style="rowStyle"
      stripe
    >
      <el-table-column label="序号" align="center" width="100">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="type" label="分类" align="center"></el-table-column>
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
export default {
  name: 'suggestionType',
  data() {
    return {
      typeList: [{
        id: '111',
        type: '平台模块设置',
      }, {
        id: '222',
        type: '平台bug',
      }, {
        id: '333',
        type: '新需求',
      }, {
        id: '444',
        type: '改版建议',
      }],
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
      total: 13,
      typeDialogVisible: false,
      // delTypeVisible: false,
      typeName: '',
      operation: 'add',  // add:新建分类 ; edit:编辑分类
    }
  },
  computed:{
    dialogTitle() {
      return this.operation === 'add' ? '新建分类' : '编辑分类'
    }
  },
  methods: {
    // 搜索
    search() {},

    // 编辑
    editType(row) {
      this.operation = 'edit';
      this.typeDialogVisible = true;
    },
    confirmDialog() {
      console.log(this.operation);
    },
    cancelDialog() {
      this.typeDialogVisible = false;
      this.typeName = '';
    },

    // 删除
    delType(data, index) {
      this.$confirm("删除后将无法恢复，确认继续删除？", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(() => {
        console.log('del...')
      })
      .catch(() => {});
    },

    // 分页器
    handleCurrentChange() {}
  }
}
</script>

<style scoped>
.edit-content {
  display: flex;
  align-items: center;
}
</style>
