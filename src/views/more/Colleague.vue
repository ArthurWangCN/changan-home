<template>
  <div class="more-wrapper">
    <top type="common" />

    <div v-loading="isLoading" element-loading-background="rgba(0, 0, 0, 0)">
      <div class="more-breadcrumb ">
        <span @click="goHome">智谷首页</span>
        <i class="el-icon-arrow-right" style="margin:0 6px;"></i>
        <span class="breadcrumb-cur">搜同事</span>
      </div>

      <div class="more-content colleague-wrapper">
        <div style="text-align:center;margin:50px 0;">
          <el-input placeholder="搜同事" @keyup.13.native="search" v-model="searchText" class="colleague-input">
            <div slot="append" @click="search">
              <i class="el-icon-search"></i>
              搜索
            </div>
          </el-input>
        </div>

        <ul class="colleague-list clearfix">
          <li
            class="colleague-item"
            v-for="item in colleagueList"
            :key="item.userId"
          >
            <div class="info-top">
              <img class="user-avatar" :src="item.profilePicture" alt="">
              <div style="width:210px;">
                <p class="mb10">
                  <span class="user-name">{{ item.userName }}</span>
                  <span class="user-id">{{ item.loginId }}</span>
                </p>
                <p class="mb10 text-ellipsis">
                  <svg class="iconfont" aria-hidden="true">
                    <use xlink:href="#iconposition" />
                  </svg>
                  <span>研发工程师</span>
                </p>
                <p class="text-ellipsis">
                  <svg class="iconfont" aria-hidden="true">
                    <use xlink:href="#icondepartment" />
                  </svg>
                  <span>{{ item.departmentName }}</span>
                </p>
              </div>
            </div>
            <div class="info-bottom">
              <p>
                <svg class="iconfont" aria-hidden="true">
                  <use xlink:href="#iconemail1" />
                </svg>
                <span>wx10000@cnki.net</span>
              </p>
              <p>
                <svg class="iconfont" aria-hidden="true">
                  <use xlink:href="#iconextension" />
                </svg>
                <span>010-87839732</span>
              </p>
              <p>
                <svg class="iconfont" aria-hidden="true">
                  <use xlink:href="#iconphone1" />
                </svg>
                <span>13701380518</span>
              </p>
              <p>
                <svg class="iconfont" aria-hidden="true">
                  <use xlink:href="#iconproject1" />
                </svg>
                大数据智能标引
              </p>
            </div>
          </li>
        </ul>

        <el-pagination
          :current-page="currentPage"
          :page-size="12"
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
  findColleague
} from '@/api/interface/more';
export default {
  name: 'Colleague',
  components: {
    Top: window.TopCommonFooter.Top,
    CommonFooter: window.TopCommonFooter.CommonFooter,
  },
  data() {
    return {
      isLoading: false,
      colleagueList: [],
      searchText: '',
      currentPage: 1,
      total: 0,
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.findColleague();
    },

    findColleague() {
      this.isLoading = true;
      findColleague({
        loginIdOrUserName: this.searchText,
        pageNo: this.currentPage,
        pageSize: 12
      }).then(res => {
        if (res.success) {
          this.colleagueList = res.content.queryUserInfoList;
          this.total = res.content.totalSize;
        } else {
          this.$message.error(res.message);
        }
      }).catch(err => {
        this.$message.error(err.message);
      }).finally(_ => {
        this.isLoading = false;
      });
    },

    search() {
      this.findColleague();
    },

    goHome() {
      this.$router.push({path: '/'})
    },

    handleCurrentChange(current) {
      this.currentPage = current;
      this.findColleague();
    }
  }
}
</script>

<style scoped>
.more-content{
  /* margin-bottom: 20px; */
}
.colleague-wrapper {
  background-color: #f1f2f5;
  border-radius: 0;
}
.colleague-list{
}
.colleague-item {
  float: left;
  margin-bottom: 30px;
  margin-right: 30px;
  width: 380px;
  height: 360px;
  border-radius: 8px;
  background-color: #ffffff;
  box-sizing: border-box;
  padding: 0 20px;
}
.colleague-item:nth-child(3n) {
  margin-right: 0;
}
.info-top {
  display: flex;
  align-items: center;
  height: 160px;
  border-bottom: 1px solid #eeeeee;
  box-sizing: border-box;
}
.info-bottom {
  height: 200px;
  box-sizing: border-box;
  padding: 30px 0;
}

.user-avatar {
  display: block;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  margin-right: 20px;
}
.info-top{
  font-size: 12px;
  color: #999999;
}
.user-name {
  font-size: 22px;
  color: #333333;
  margin-right: 20px;
}
.info-top .iconfont {
  margin-right: 10px;
}

.info-bottom p {
  font-size: 14px;
  color: #666666;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}
.info-bottom p:last-child{
  margin-bottom: 0;
}
.info-bottom .iconfont {
  margin-right: 20px;
}
</style>
