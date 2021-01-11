<template>
  <div class="manage-home-comp">
    <div class="flex-align-c flex-space-between">
      <span class="manage-home-btn">发布公告</span>
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
        <p v-show="!isLoading">暂无数据</p>
      </template>
      <el-table-column label="序号" align="center" width="100">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
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
// import '@/assets/css/manage.css';
export default {
  name: 'homeNotice',
  data() {
    return {
      isLoading: false,
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
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {},

    search() {},

    handleCurrentChange() {}
  }
}
</script>

<style scoped>
</style>
