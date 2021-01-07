<template>
  <div class="opinion manage-comp">
    <div class="opinion-header flex-align-c">
      <ul class="opinion-tabs">
        <li :class="{'tab-active': tabActive==0}" @click="tabActive=0">意见建议</li>
        <li :class="{'tab-active': tabActive==1}" @click="tabActive=1">意见分类管理</li>
      </ul>
      <div class="flex-align-c">
        <span class="btn-export" @click="exportData">导出数据</span>
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

    <div class="opinion-content">
      <opinion-list ref="opinionList" :searchText="searchText" v-if="tabActive==0"></opinion-list>
      <opinion-type ref="opinionType" v-if="tabActive==1"></opinion-type>
    </div>
  </div>
</template>

<script>
import '@/assets/css/manage.css';
import OpinionList from './OpinionList';
import OpinionType from './OpinionType';
export default {
  name: 'opinion',
  components: {
    OpinionList,
    OpinionType
  },
  data() {
    return {
      searchText: '',
      tabActive: 0,   // 0:意见建议  1:意见分类管理
    }
  },
  methods: {
    search() {
      if (this.tabActive === 0) {
        this.$refs.opinionList.getOpinionList();
      }
    },
    exportData() {
      if (this.tabActive === 0) {
        this.$refs.opinionList.exportExcel();
      }
    }
  }
}
</script>

<style scoped>
.opinion-header {
  margin-bottom: 20px;
  justify-content: space-between;
}

.opinion-tabs {
  display: flex;
}
.opinion-tabs li {
  margin-right: 10px;
  cursor: pointer;
}
.tab-active {
  color: #409eff;
}
</style>
