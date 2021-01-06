<template>
  <div class="user-demand manage-comp">
    <div class="user-demand-header">
      <span class="btn-export">导出数据</span>
      <el-input
        v-model="serachText"
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
          <el-button type="text" @click="reply(scope.row)">回复</el-button>
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
export default {
  name: 'userDemand',
  data() {
    return {
      demandList: [
        {
            "id": 4,
            "userId": "1",
            "userName": "小米",
            "userUnit": "null",
            "userTel": "null",
            "submitTime": "2020-11-18 15:53",
            "demandContent": "需求内容XXX",
            "supplier": "已有信息或已交流供应商",
            "requiredItems": "所需物品/单位",
            "reply": "",
            "replyId": "",
            "replyTime": "2020-11-18 16:05",
            "demandStatus": "0"
        },
        {
            "id": 3,
            "userId": "1",
            "userName": "小米",
            "userUnit": "null",
            "userTel": "null",
            "submitTime": "2020-11-18 15:52",
            "demandContent": "",
            "supplier": "已有信息或已交流供应商",
            "requiredItems": "所需物品/单位",
            "reply": "",
            "replyId": "",
            "replyTime": "2020-11-18 16:05",
            "demandStatus": "0"
        },
        {
            "id": 1,
            "userId": "1",
            "userName": "小米",
            "userUnit": "小米",
            "userTel": "123",
            "submitTime": "",
            "demandContent": "",
            "supplier": "",
            "requiredItems": "",
            "reply": "",
            "replyId": "",
            "replyTime": "2020-11-18 16:05",
            "demandStatus": ""
        },
        {
            "id": 2,
            "userId": "1",
            "userName": "小米",
            "userUnit": "",
            "userTel": "",
            "submitTime": "",
            "demandContent": "",
            "supplier": "",
            "requiredItems": "",
            "reply": "",
            "replyId": "",
            "replyTime": "2020-11-18 16:05",
            "demandStatus": ""
        }
    ],
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
      serachText: '',
      currentPage: 1,
      total: 13,
      replyVisible: false,
      replyContent: '',
    }
  },
  methods: {
    // 搜索
    search() {},

    // 回复
    reply(row) {
      this.replyVisible = true;
    },
    confirmReply() {

    },
    cancelReply() {
      this.replyVisible = false;
    },

    // 分页器
    handleCurrentChange() {}
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
