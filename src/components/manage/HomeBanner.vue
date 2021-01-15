<template>
  <div class="manage-home-comp">
    <div class="flex-align-c flex-space-between home-comp-header">
      <span class="manage-home-btn" @click="operation='add';bannerDialogVisible=true;">添加图片</span>
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
          <img :src="scope.row.imgUrl" alt="轮播图">
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

    <!-- 新建/编辑轮播图弹窗 -->
    <el-dialog
      custom-class="manage-dialog"
      :close-on-click-modal="false"
      :visible="bannerDialogVisible"
      :title="dialogTitle"
      width="700px"
      :before-close="cancelDialog"
    >
      <div class="edit-content manage-editor" v-loading="dialogLoading">
        <div class="flex-align-c">
          <el-upload
            :action="actionUrl"
            multiple
            list-type="picture-card"
            :file-list="fileList"
            :limit="1"
					  :before-upload="beforeUpload"
            :on-success="onUploadSucc"
            :before-remove="beforeRemove"
            :on-remove="onRemoveSucc"
            class="banner-upload"
          >
            <span class="manage-home-btn" style="width: 120px;">上传图片</span>
          </el-upload>
          <span></span>
          <img src="" width="140px" height="60px" alt="">
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmDialog" round>确 定</el-button>
        <el-button @click="cancelDialog" round>取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from '@/utils/index';
import {
  getBannerList
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
      operation: 'add',  //add添加轮播图   edit编辑轮播图
      fileList: [],
      actionUrl: '/file/upload'

    }
  },
  computed: {
    dialogTitle() {
      return this.operation === 'add' ? '添加图片' : '编辑图片';
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getBannerList();
    },

    getBannerList() {
      this.isLoading = true;
      getBannerList({
        pageIndex: this.currentPage,
        pageSize: 10,
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

    confirmDialog() {},

    cancelDialog() {
      this.bannerDialogVisible = false;
    },

    //添加轮播图
    addBanner() {},

    editBanner() {

    },

    delBanner() {

    },

    search() {},

    // 上传
    beforeUpload() {
      // this.fileList = [];
    },
    onUploadSucc() {},
    beforeRemove() {},
    onRemoveSucc() {},

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

</style>
