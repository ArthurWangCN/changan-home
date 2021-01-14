<template>
  <div class="manage-home-comp">
    <div class="flex-align-c flex-space-between home-comp-header">
      <span class="manage-home-btn" @click="addNotice">发布公告</span>
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
        <p v-show="!isLoading" style="display:none;">暂无数据</p>
      </template>
      <el-table-column label="序号" align="center" width="100">
        <template slot-scope="scope">
          {{ getIndex(scope.$index) }}
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
      <div class="edit-content manage-editor" v-loading="dialogLoading">
        <el-input placeholder="请输入标题" class="notice-title-input" v-model="noticeTitle"></el-input>
        <quill-editor ref="myTextEditor" v-model="noticeContent" :options="editorOption" @focus="onEditorFocus($event)"></quill-editor>
        <div class="notice-upload flex-align-c">
          <el-upload
            :action="actionUrl"
            multiple
            :file-list="fileList"
					  :before-upload="beforeUpload"
            :on-success="onUploadSucc"
            :before-remove="beforeRemove"
            :on-remove="onRemoveSucc"
          >
            <span class="manage-home-btn" style="width: 120px;">上传附件</span>
          </el-upload>
          <span class="notice-upload-tip">文件大小500M以内</span>
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
import {
  formatDate
} from '@/utils/index';
// import '@/assets/css/manage.css';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import {
  getNoticeList,
  getNoticeInfo,
  addNotice,
  editNotice,
  delNotice,
} from '@/api/interface/manage';
import {
  html2text
} from '@/utils/index.js';
export default {
  name: 'homeNotice',
  components: {
    quillEditor
  },
  data() {
    return {
      isLoading: false,
      dialogLoading: false,
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
      noticeDialogVisible: false,
      delNoticeVisible: false,
      curNotice: '',
      noticeTitle: '',
      noticeContent: '',
      editorOption: {
        placeholder: "请输入公告内容",
        modules:{
          toolbar:[
            [{ 'font': [] }],     //字体
            [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
            // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],     //几级标题
            ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],     //列表
            [{ 'color': [] }, { 'background': [] }],     // 字体颜色，字体背景颜色
            [{ 'align': [] }],    //对齐方式
            ['link', 'image']    //上传图片、上传视频
          ]
        }
      },
      operation: 'add',   // add:发布公告  edit:编辑公告
      fileList: [],   // 上传文件的列表
      addFileList: [],  // 新增文件列表
      delFileList: [],  // 删除文件列表
      selectTip: true,
      actionUrl: '/home/file/upload',
    }
  },
  computed: {
    dialogTitle() {
      return '发布公告'
    }
  },
  created() {
    this.init();
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'development') {
      this.actionUrl = '/file/upload';
    }
  },
  watch: {
    noticeDialogVisible(val) {
      if (val) {
        this.$nextTick(_ => {
          let qlLink = document.querySelector('.ql-link');
          qlLink.title = "请选中文字添加链接";
        })
      }
    }
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
        search: this.searchText
      }).then(res => {
        if (res.success) {
          this.noticeList = res.content.records;
          this.noticeList.forEach(item => {
            item.createDate = formatDate(item.createDate);
          })
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

    search() {
      this.getNoticeList();
    },

    addNotice() {
      this.fileList = [];
      this.operation = 'add';
      this.noticeTitle = '';
      this.noticeContent = '';
      this.noticeDialogVisible=true;
    },

    editNotice(row) {
      this.operation = 'edit';
      this.dialogLoading = true;
      this.fileList = [];
      this.curNotice = row;
      this.noticeDialogVisible = true;
      getNoticeInfo({
        noticeSysId: row.sysId
      }).then(res => {
        if (res.success) {
          const notice = res.content;
          this.noticeTitle = notice.title;
          this.noticeContent = notice.content;
          this.fileList = []
          notice.attachmentList.map(item => {
            this.fileList.push({
              name: item.attachmentName,
              url: item.attachmentUrl,
              delId: item.id
            })
          });
        } else {
          this.$message.error(res.message);
        }
      })
      .catch(err => {
        this.$message.error(err.message);
      }).finally(_ => {
        this.dialogLoading = false;
      })
    },

    handleCurrentChange(current) {
      this.currentPage = current;
      this.getNoticeList();
    },

    // 新建/编辑公告确定
    confirmDialog() {
      if (this.noticeTitle === '') {
        this.$message.warning('公告标题不能为空');
        return;
      }
      if (this.noticeContent === '') {
        this.$message.warning('公告内容不能为空');
        return;
      }
      let abstract = html2text(this.noticeContent).substring(0, 200);

      if (this.operation === 'add') {
        let attachmentList = [];
        this.fileList.map(item => {
          attachmentList.push({
            "status": 1,
            "attachmentName": item.name,
            "attachmentUrl": item.response.message
          })
        })
        addNotice({
          notice: {
            title: this.noticeTitle,
            abstracttext: abstract,
            content: this.noticeContent
          },
          attachmentList
        }).then(res => {
          if (res.success) {
            this.getNoticeList();
            this.$message.success('发布成功');
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(err => {
          this.$message.error(err.message);
        }).finally(_ => {
        })
      } else if (this.operation === 'edit') {
        console.log(this.delFileList)
        editNotice({
          notice: {
            id: this.curNotice.id,
            sysId: this.curNotice.sysId,
            title: this.noticeTitle,
            abstracttext: abstract,
            content: this.noticeContent
          },
          attachmentList: [
            ...this.addFileList,
            ...this.delFileList
          ]
        }).then(res => {
          if (res.success) {
            this.getNoticeList();
            this.$message.success('编辑成功');
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(err => {
          this.$message.error(err.message);
        }).finally(_ => {
          this.fileList = [];
          this.addFileList = [];
          this.delFileList = [];
        })
      }
      this.noticeDialogVisible = false;
    },

    cancelDialog() {
      this.noticeDialogVisible = false;
      this.fileList = [];
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
          this.$message.success('已删除');
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

    // 富文本编辑器
    onEditorChange({ editor, html, text }) {
      this.noticeContent = html;
    },
    onEditorFocus() {
    },

    // 上传
    beforeUpload(file) {
      console.log(file);
      const isLt500M = file.size / 1024 / 1024 <= 500;
      if (!isLt500M) {
        this.$message.warning('文件大小500M以内');
        return false;
      }
    },
    onUploadSucc(res, file, fileList) {
      this.fileList = fileList;
      console.log(file)
      if (this.operation === 'edit') {
        this.addFileList.push({
          attachmentName: file.name,
          attachmentUrl: file.response.message,
          status: 1
        });
      }
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
      // console.log(fileList)
    },
    onRemoveSucc(file, fileList) {
      console.log(file)
      console.log(fileList)
      this.fileList = fileList;
      if (this.operation === 'edit') {
        this.delFileList.push({
          id: file.delId,
          attachmentName: file.name,
          attachmentUrl: file.url,
          status: -1
        })
      }
    },

    // 表格索引
    getIndex(i) {
      let index;
      if (i == 9) {
        index =  this.currentPage + '0'
      } else {
        index = (this.currentPage>1?(this.currentPage - 1)+'':'') + (i + 1);
      }
      return index;
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
  position: relative;
}
.notice-upload-tip {
  position: absolute;
  left: 130px;
  top: 10px;
  color: #367fff;
}
.notice-title-input {
  margin-bottom: 10px;
}
.manage-editor >>> .el-input__inner {
  border-radius: 0;
  border-color: #cccccc;
}
.manage-editor >>> .el-input__inner:focus {
  border-color: #409eff;
}
</style>
