<template>
  <div class="hot-wrapper">
    <div class="hot-header">
      <div class="header-left">
        <!-- <el-checkbox v-if="tabActive!=='topic'" v-model="checked">{{ tips }}</el-checkbox> -->
        <p class="tip-text" v-if="tabActive==='circle'">{{ tips }}</p>
      </div>
      <div class="header-right">
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
    </div>

    <el-table
      :data="dataList"
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
          {{ getIndex(scope.$index) }}
        </template>
      </el-table-column>

      <!-- 热门圈子 -->
      <template v-if="tabActive==='circle'">
        <el-table-column prop="circleName" label="圈子名称" align="center"></el-table-column>
        <el-table-column prop="userName" label="创建人" align="center" width="100"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center" width="200"></el-table-column>
        <el-table-column prop="memberCount" label="成员数" align="center" width="100"></el-table-column>
      </template>

      <!-- 热门专栏 -->
      <template v-if="tabActive==='column'">
        <el-table-column prop="title" label="专栏名称" align="center"></el-table-column>
        <el-table-column prop="createUserName" label="创建人" align="center" width="100"></el-table-column>
        <el-table-column prop="createDate" label="创建时间" align="center" width="200"></el-table-column>
        <el-table-column prop="subscribeNum" label="成员数" align="center" width="100"></el-table-column>
      </template>

      <!-- 热门话题 -->
      <template v-if="tabActive==='topic'">
        <el-table-column prop="questionTitle" label="题名" align="left"></el-table-column>
        <el-table-column prop="circleName" label="圈子" align="center" width="400"></el-table-column>
        <el-table-column prop="creatorName" label="提问人" align="center" width="200"></el-table-column>
        <el-table-column prop="createTime" label="提交时间" align="center" width="200"></el-table-column>
      </template>

      <el-table-column label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button type="text" @click="top(scope.row)">
            <span v-if="(scope.row.portalTop || scope.row.homeIsTopping)===1">取消</span><span v-if="tabActive!=='topic'">门户</span>置顶
          </el-button>
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
  </div>
</template>

<script>
import {
  getHotCircleList,
  topHotCircle,
  getHotColumnList,
  topHotColumn,
  getHotTopicList,
  topHotTopic
} from '@/api/interface/manage';
import {
  formatDate
} from '@/utils/index';
export default {
  name: 'hotSetting',
  data() {
    return {
      isLoading: false,
      checked: false,
      searchText: '',
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
      dataList: [],
      tips: '',
    }
  },
  props: {
    tabActive: {
      type: String,
      default: 'circle'
    }
  },
  computed: {
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.tabActive === 'circle') {
        this.tips = '门户热门圈子排序默认同圈子广场热门排序，如需修改，可点击“门户置顶”';
      } else if (this.tabActive === 'column') {
        this.tips = '门户专栏显示默认同专栏广场排序，如需修改，可点击“门户置顶”';
      } else if (this.tabActive === 'topic') {
        this.tips = '';
      }
      this.getList();
    },

    getList() {
      if (this.tabActive === 'circle') {
        this.getHotCircleList();
      } else if (this.tabActive === 'column') {
        this.getHotColumnList();
      } else if (this.tabActive === 'topic') {
        this.getHotTopicList();
      }
    },

    // 获取热门圈子列表
    getHotCircleList() {
      this.isLoading = true;
      getHotCircleList({
        pageIndex: this.currentPage,
        pageSize: 10,
        circleName: this.searchText
      }).then(res => {
        if (res.success) {
          this.dataList = res.content.circleList;
          this.dataList.forEach(item => {
            item.createTime = formatDate(item.createTime);
          });
          this.total = res.content.count;
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

    // 获取热门专栏列表
    getHotColumnList() {
      this.isLoading = true;
      getHotColumnList({
        pageIndex: this.currentPage,
        pageSize: 10,
        search: this.searchText
      }).then(res => {
        if (res.success) {
          this.dataList = res.content.records;
          this.dataList.forEach(item => {
            item.createDate = formatDate(item.createDate);
          });
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

    // 获取热门话题列表
    getHotTopicList() {
      this.isLoading = true;
      getHotTopicList({
        pageIndex: this.currentPage,
        pageSize: 10,
        titleFuzzy: this.searchText
      }).then(res => {
        if (res.success) {
          this.dataList = res.content.rows;
          this.dataList.forEach(item => {
            item.createTime = formatDate(item.createTime);
            if (item.portalTop === '') item.portalTop = 0;
          });
          this.total = res.content.totalRows;
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

    // 点击置顶
    top(row) {
      if (this.tabActive === 'circle') {
      this.topHotCircle(row);
      } else if (this.tabActive === 'column') {
      this.topHotColumn(row);
      } else if (this.tabActive === 'topic') {
      this.topHotTopic(row);
      }
    },

    // 圈子置顶
    topHotCircle(row) {
      topHotCircle({
        circleId: row.circleId,
        isTop: row.portalTop===0?1:0
      }).then(res => {
        if (res.success) {
          let succMsg = row.portalTop === 0 ? '置顶成功' : '取消置顶成功';
          this.$message.success(succMsg);
          this.getHotCircleList();
        } else {
          this.$message.error(res.message);
        }
      })
      .catch(err => {
        this.$message.error(err.message);
      }).finally(_ => {
      })
    },

    // 专栏置顶
    topHotColumn(row) {
      topHotColumn({
        sysId: row.sysId,
        isTop: row.homeIsTopping===0?1:0
      }).then(res => {
        if (res.success) {
          let succMsg = row.homeIsTopping === 0 ? '置顶成功' : '取消置顶成功';
          this.$message.success(succMsg);
          this.getHotColumnList();
        } else {
          this.$message.error(res.message);
        }
      })
      .catch(err => {
        this.$message.error(err.message);
      }).finally(_ => {
      })
    },

    // 话题置顶
    topHotTopic(row) {
      topHotTopic({
        questionId: row.id,
        portalTop: (row.portalTop===0||'')?1:0
      }).then(res => {
        if (res.success) {
          let succMsg = row.portalTop === 0 ? '置顶成功' : '取消置顶成功';
          this.$message.success(succMsg);
          this.getHotTopicList();
        } else {
          this.$message.error(res.message);
        }
      })
      .catch(err => {
        this.$message.error(err.message);
      }).finally(_ => {
      })
    },

    search() {
      if (this.tabActive === 'circle') {
        this.getHotCircleList();
      } else if (this.tabActive === 'column') {
        this.getHotColumnList();
      } else if (this.tabActive === 'topic') {
        this.getHotTopicList();
      }
    },

    handleCurrentChange(current) {
      this.currentPage = current;
      if (this.tabActive === 'circle') {
        this.getHotCircleList();
      } else if (this.tabActive === 'column') {
        this.getHotColumnList();
      } else if (this.tabActive === 'topic') {
        this.getHotTopicList();
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
.hot-wrapper {
  margin: 20px 0;
}
.hot-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.hot-wrapper >>> .el-table {
  width: 100%;
}
.tip-text {
  font-size: 14px;
  color: #666666;
}
</style>
