<template>
  <div class="more-wrapper">
    <top type="common" />

    <div  v-loading="isLoading">
      <div class="more-breadcrumb ">
        <span @click="goHome">智谷首页</span>
        <i class="el-icon-arrow-right" style="margin:0 6px;"></i>
        <span @click="goKno" class="breadcrumb-cur">{{ knoType === 'hotKno' ? '热点知识' : '推荐知识' }}</span>
      </div>

      <div class="more-content kno-content">
        <div class="kno-header">
          <span>
            排序方式：
            <span class="color-blue">时间<i class="el-icon-bottom"></i></span>
          </span>
          <span class="font-info">共{{total}}条结果</span>
        </div>

        <ul class="kno-list">
          <li
            class="kno-item"
            v-for="(item, index) in knoList"
            :key="index"
          >
            <p class="kno-title text-ellipsis" @click="goKnoDetail(item)">{{ item.title }}</p>
            <div class="kno-info">
              <span :class="{'kno-info-wide': knoType==='recommendKno'}">作者：{{ item.author }}</span>
              <span class="kno-info-from" :class="{'kno-info-wider': knoType==='recommendKno'}">来源：{{ '暂无' }}</span>
              <span v-if="knoType==='hotKno'">浏览量：77</span>
              <span>发布时间：{{ item.uploadTime }}</span>
            </div>
          </li>
        </ul>

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
    </div>

    <common-footer />
  </div>
</template>

<script>
import '@/assets/css/more.css';
import { formatDate } from '@/utils/index';
import {
  getRecommendKnoList
} from '@/api/interface/more';
export default {
  name: 'knowledgeList',
  data() {
    return {
      isLoading: false,
      knoType: '',  // hotKno:热点知识  recommendKno:推荐知识
      currentPage: 1,
      total: 0,
      knoList: [],
    }
  },
  components: {
    Top: window.TopCommonFooter.Top,
    CommonFooter: window.TopCommonFooter.CommonFooter,
  },
  created() {
    this.knoType = this.$route.name;
    this.init();
  },
  methods: {
    init() {
      if (this.knoType === 'hotKno') {

      } else if (this.knoType === 'recommendKno') {
        this.getRecommendKnoList();
      }
    },

    // 推荐知识列表
    getRecommendKnoList() {
      getRecommendKnoList({
        current: this.currentPage,
        size: 10
      }).then(res => {
        if (res.success) {
          this.knoList = res.content.list;
          this.total = res.content.total;
          this.knoList.forEach(item => {
            // 格式化时间
            item.uploadTime = formatDate(item.uploadTime);
          })
        }
      }).catch(err => {
        this.$message.error(err.message);
      }).finally(_ => {
        this.isLoading = false;
      })
    },

    goKnoDetail(kno) {
      window.open(kno.detailUrl, '_blank')
    },

    handleCurrentChange(current) {
      this.currentPage = current;
      if (this.knoType === 'hotKno') {

      } else if (this.knoType === 'recommendKno') {
        this.getRecommendKnoList();
      }
    },

    goHome() {
      this.$router.push({path: '/'});
    },

    goKno() {
      this.$router.push({path: '/hotKnow'});
    },
  }
}
</script>

<style scoped>
.kno-content {
  box-sizing: border-box;
  padding: 10px 30px 0;
}
.kno-header {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #666666;
  font-size: 14px;
  border-bottom: 1px solid #eeeeee;
}

.kno-item {
  box-sizing: border-box;
  padding: 20px 0 30px;
  border-bottom: 1px solid #eeeeee;
}
.kno-title {
  font-size: 16px;
  color: #333333;
  cursor: pointer;
}
.kno-title:hover{ color: #367fff; }
.kno-info {
  font-size: 12px;
  color: #999999;
  margin-top: 20px;
}
.kno-info span {
  display: inline-block;
  box-sizing: border-box;
  padding-right: 20px;
  width: 25%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.kno-info .kno-info-from {width: 35%;}
.kno-info .kno-info-wide {width: 30%;}
.kno-info .kno-info-wider {width: 50%;}
.kno-info span:nth-child(3) {
  width: 20%;
}
.kno-info span:last-child {
  padding-right: 0;
  width: 20%;
  text-align: right;
}

.font-info {
  font-size: 12px;
  color: #999999;
}
.color-blue {color: #367fff; cursor: pointer;}
</style>
