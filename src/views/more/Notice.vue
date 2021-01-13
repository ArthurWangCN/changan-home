<template>
  <div class="more-wrapper">
    <top type="common" />

    <div  v-loading="isLoading">
      <div class="more-breadcrumb ">
        <span @click="goHome">智谷首页</span>
        <i class="el-icon-arrow-right" style="margin:0 6px;"></i>
        <span class="breadcrumb-cur" @click="goNotice">通知公告</span>
      </div>

      <div class="more-content more-notice">
        <div class="notice-header">
          <h2 class="notice-title">通知公告</h2>
          <div>
            <el-input
              class="search-input"
              placeholder="搜索公告"
              v-model="searchText"
              @keyup.13.native="search"
            >
            </el-input>
            <i class="el-icon-search notice-search" @click="search"></i>
          </div>
        </div>

        <ul class="notice-list">
          <li
            class="notice-item"
            v-for="item in noticeList"
            :key="item.id"
          >
            <div class="notice-item-header">
              <span><span class="notice-item-title" @click="goNoticeDetail(item.sysId)">{{item.title}}</span></span>
              <span class="notice-item-date">{{item.createDate}}</span>
            </div>
            <p class="notice-abstract">{{item.abstractText}}</p>
          </li>
        </ul>

        <div class="nodata-tip" v-if="noticeList.length <= 0">
          <div>
            <img src="../../assets/img/nothing_l.png" alt="">
            <p>暂无数据</p>
          </div>
        </div>

        <el-pagination
          :current-page="currentPage"
          :page-size="10"
          hide-on-single-page
          layout="total, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <common-footer />
  </div>
</template>

<script>
import '@/assets/css/more.css';
import {
  getNotice
} from '@/api/interface/more';
export default {
  name: 'moreNotice',
  data() {
    return {
      isLoading: false,
      searchText: '',
      noticeList:  [],
      currentPage: 1,
      total: 0,
    }
  },
  components: {
    Top: window.TopCommonFooter.Top,
    CommonFooter: window.TopCommonFooter.CommonFooter,
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getNotice();
    },
    getNotice() {
      this.isLoading = true;
      getNotice({
        current: this.currentPage,
        size: 10,
        search: this.searchText
      }).then(res => {
        if (res.success) {
          this.noticeList = res.content.records;
          this.total = res.content.total;
        } else {
          this.$message.error(res.message)
        }
      }).catch(err => {
        this.$message.error(err.message);
      }).finally(_ => {
        this.isLoading = false;
      })
    },

    goHome() {
      this.$router.push({path: '/'})
    },

    goNotice() {
      this.$router.push({path: '/notice'})
    },

    goNoticeDetail(sysId) {
      this.$router.push({path: `/notice/detail/${sysId}`});
    },

    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getNotice();
    },

    search() {
      this.getNotice();
    }
  }
}
</script>

<style scoped>
.more-notice {
  box-sizing: border-box;
  padding: 0 30px 40px;
}

.notice-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
}
.notice-title {
  font-size: 18px;
  color: #000000;
  position: relative;
}
.notice-title:after {
  position: absolute;
  left: 0;
  bottom: -28px;
  content: '';
  width: 100%;
  height: 3px;
  background-color: #3d8cfc;
  border-radius: 2px;
}
.search-input { width: 320px; }
.search-input >>> .el-input__inner{
  height: 36px;
  line-height: 36px;
  font-size: 12px;
  color: #999999;
  border-radius: 18px;
  padding: 0 30px 0 20px;
}
.notice-search{
  position: absolute;
  right: 10px;
  font-size: 16px;
  top: 50%;
  color: #b5b5b5;
  transform: translateY(-50%);
  cursor: pointer;
}

.notice-item {
  box-sizing: border-box;
  padding: 20px 0 30px;
  border-top: 1px solid #eeeeee;
}
.notice-item-header{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.notice-item-title{
  display: inline-block;
  width: 720px;
  font-size: 16px;
  color: #000000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.notice-item-title:hover {
  color: #3d8cfc;
}
.notice-item-date {
  font-size: 12px;
  color: #999999;
}
.notice-abstract{
  font-size: 14px;
  color: #666666;
  margin-top: 10px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.more-notice >>> .el-pagination {
  text-align: center;
  margin-top: 40px;
}
</style>
