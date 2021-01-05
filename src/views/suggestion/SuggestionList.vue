<template>
  <div>
    <el-table
      ref="singleTable"
      :data="suggestionList"
      :header-cell-style="headerStyle"
      :row-style="rowStyle"
      stripe
    >
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
export default {
  name: 'suggestionList',
  data() {
    return {
      suggestionList: [{
              "id": 3,
              "userId": "1",
              "userName": "1",
              "userUnit": "",
              "userTel": "",
              "submitInfo": "提交的意见1",
              "submitTime": "2020-11-18 15:16",
              "opType": "",
              "replyStatus": "",
              "reply": "",
              "replyId": "",
              "replyTime": "2020-11-18 15:18"
          },
          {
              "id": 18,
              "userId": "1",
              "userName": "null",
              "userUnit": "null",
              "userTel": "null",
              "submitInfo": "提交的意见",
              "submitTime": "2020-11-18 15:12",
              "opType": 1,
              "replyStatus": "0",
              "reply": "",
              "replyId": "",
              "replyTime": "2020-11-18 15:14"
          },
          {
              "id": 17,
              "userId": "1",
              "userName": "null",
              "userUnit": "null",
              "userTel": "null",
              "submitInfo": "",
              "submitTime": "2020-11-18 14:59",
              "opType": 1,
              "replyStatus": "0",
              "reply": "回复的意见",
              "replyId": "",
              "replyTime": "2020-11-18 15:14"
          },
          {
              "id": 2,
              "userId": "1",
              "userName": "",
              "userUnit": "",
              "userTel": "",
              "submitInfo": "",
              "submitTime": "",
              "opType": "",
              "replyStatus": "",
              "reply": "",
              "replyId": "",
              "replyTime": ""
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
