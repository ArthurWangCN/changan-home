<template>
  <div class="manage-home-comp">
    <div class="flex-align-c flex-space-between home-comp-header">
      <span class="manage-home-btn" @click="addBanner">添加图片</span>
      <el-input
        v-model="searchText"
        placeholder="搜索轮播图"
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
      :data="bannerList"
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
      <el-table-column label="图片" align="center" width="300">
        <template slot-scope="scope">
          <img :src="scope.row.imgUrl" height="100px" alt="轮播图">
        </template>
      </el-table-column>
      <el-table-column prop="title" label="图片标题" align="left"></el-table-column>
      <el-table-column prop="createName" label="添加人" align="center" width="100"></el-table-column>
      <el-table-column prop="createDate" label="添加时间" align="center" width="200"></el-table-column>
      <el-table-column label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button type="text" @click="editBanner(scope.row)">编辑</el-button>
          <el-button type="text" @click="delBanner(scope.row)">删除</el-button>
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

    <!-- 新建/编辑轮播图弹窗 -->
    <el-dialog
      custom-class="manage-dialog"
      :close-on-click-modal="false"
      :visible="bannerDialogVisible"
      :title="dialogTitle"
      width="700px"
      :before-close="cancelDialog"
    >
      <div class="edit-content dialog-banner manage-editor" v-loading="dialogLoading">
        <el-input placeholder="请输入标题，必填" class="banner-title-input" v-model="bannerTitle"></el-input>
        <quill-editor ref="noticeContentEditor" v-model="bannerContent" :options="editorOption" @focus="onEditorFocus($event)"></quill-editor>
        <div class="flex-align-c" style="margin-top: 20px;">
          <el-upload
            :action="actionUrl"
            ref="bannerUpload"
            :file-list="fileList"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-success="onUploadSucc"
            :on-change="handleChangePic"
            class="banner-upload"
          >
            <span class="manage-home-btn" style="width: 120px;">上传图片</span>
          </el-upload>
          <img v-if="bannerUrl!==''" :src="bannerUrl" style="margin-left:10px;" width="140px" height="85px" alt="">
        </div>
        <div class="dialog-banner-isTop">
          <el-checkbox v-model="isTop">将该图片置顶</el-checkbox>
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
      :visible="delBannerVisible"
      title="删除提示"
      width="500px"
      :before-close="cancelDel"
    >
      <p style="text-align:center;margin-top:10px;">确定删除该图片？</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmDel" round>确 定</el-button>
        <el-button @click="cancelDel" round>取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from '@/utils/index';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { handlers } from '@/utils/quillEditor.js';
import { quillEditor } from 'vue-quill-editor'
import {
  getBannerList,
  addBanner,
  getBannerInfo,
  editBanner,
  delBanner
} from '@/api/interface/manage';
export default {
  name: 'homeBanner',
  data() {
    return {
      isLoading: false,
      dialogLoading: false,
      searchText: '',
      currentPage: 1,
      total: 0,
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
      bannerList: [],
      bannerDialogVisible: false,
      delBannerVisible: false,
      operation: 'add',  //add添加轮播图   edit编辑轮播图
      fileList: [],
      actionUrl: '/home/file/upload',
      bannerTitle: '',
      bannerContent: '',
      bannerUrl: '',
      // bannerUrl: require('../../assets/img/banner.jpg'),
      isTop: false,
      curBanner: '',
      editorOption: {
        placeholder: "请输入内容，必填",
        modules:{
          toolbar: {
            handlers: handlers,
            container: [
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
        }
      },
    }
  },
  components: {
    quillEditor
  },
  computed: {
    dialogTitle() {
      return this.operation === 'add' ? '添加图片' : '编辑图片';
    }
  },
  created() {
    this.init();
    if (process.env.NODE_ENV === 'development') {
      this.actionUrl = '/file/upload';
    }
  },
  methods: {
    init() {
      this.getBannerList();
    },

    // 获取轮播图列表
    getBannerList() {
      this.isLoading = true;
      getBannerList({
        current: this.currentPage,
        size: 10,
        search: this.searchText
      }).then(res => {
        if (res.success) {
          this.bannerList = res.content.records;
          this.bannerList.forEach(item => {
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

    // 点击添加图片
    addBanner() {
      this.operation = 'add';
      this.bannerDialogVisible = true;
    },

    // 点击编辑
    editBanner(row) {
      getBannerInfo({ bannerId: row.id })
      .then(res => {
        if (res.success) {
          this.curBanner = res.content;
          this.bannerUrl = this.curBanner.imgUrl;
          this.bannerTitle = this.curBanner.title;
          this.bannerContent = this.curBanner.content;
          this.isTop = this.curBanner.isTop == 1 ? true : false;
        } else {
          this.$message.error(res.message);
        }
      })
      .catch(err => {
        this.$message.error(err.message);
      }).finally(_ => {
        this.isLoading = false;
      })
      // this.curBanner = row;
      this.operation = 'edit';
      this.bannerDialogVisible = true;
    },

    // 确定新建/编辑图片
    confirmDialog() {
      if(this.bannerTitle.trim()==='') return this.$message.warning('图片标题不能为空');
      if(this.bannerContent==='') return this.$message.warning('图片内容不能为空');
      if(this.bannerUrl==='') return this.$message.warning('请上传图片');

      let promise;
      let params = {
        imgUrl: this.bannerUrl,
        title: this.bannerTitle,
        content: this.bannerContent,
        isShow: 1,
        isTop: this.isTop ? 1 : 0
      };
      if (this.operation === 'add') {
        promise = addBanner(params);
      } else if (this.operation === 'edit') {
        promise = editBanner({
          id: this.curBanner.id,
          ...params
        });
      }
      promise.then(res => {
        if (res.success) {
          this.getBannerList();
          this.operation === 'add' ? this.$message.success('添加成功') : this.$message.success('编辑成功');
        } else {
          this.$message.error(res.message);
        }
      })
      .catch(err => {
        this.$message.error(err.message);
      }).finally(_ => {
        this.cancelDialog();
      })
    },

    cancelDialog() {
      this.bannerDialogVisible = false;
      this.fileList = [];
      this.bannerUrl = '';
      this.bannerTitle = '';
      this.bannerContent = '';
      this.isTop = false;
    },

    // 点击删除
    delBanner(row) {
      this.curBanner = row;
      this.delBannerVisible = true;
    },

    confirmDel() {
      delBanner({
        bannerId: this.curBanner.id
      }).then(res => {
        if (res.success) {
          this.getBannerList();
          this.$message.success('已删除');
        } else {
          this.$message.error(res.message);
        }
      })
      .catch(err => {
        this.$message.error(err.message);
      }).finally(_ => {
        this.delBannerVisible = false;
      })
    },
    cancelDel() {
      this.delBannerVisible = false;
    },

    search() {
      this.getBannerList();
    },

    handleCurrentChange(current) {
      this.currentPage = current;
      this.getBannerList();
    },

    // 上传
    beforeUpload(file) {
      const isLt500M = file.size / 1024 / 1024 <= 4;
      if (!isLt500M) {
        this.$message.warning('图片大小4M以内');
        return false;
      }
    },
    handleChangePic(file,fileList){
      if (fileList.length > 1) {
        fileList.splice(0, 1);
      }
    },
    onUploadSucc(res, file, fileList) {
      this.fileList = fileList;
      this.bannerUrl = res.message;
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
.dialog-banner {
  font-size: 14px;
  color: #333333;
}
.dialog-banner-title {
  margin-top: 30px;
}
.dialog-banner-isTop {
  margin-top: 20px;
}
.banner-title-input {
  margin-bottom: 10px;
}
</style>
