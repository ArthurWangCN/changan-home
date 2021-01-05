<template>
  <div class="suggestion manage-comp">
    <div class="suggestion-header flex-align-c">
      <ul class="suggestion-tabs">
        <li :class="{'tab-active': tabActive==0}" @click="tabActive=0">意见建议</li>
        <li :class="{'tab-active': tabActive==1}" @click="tabActive=1">意见分类管理</li>
      </ul>
      <div class="flex-align-c">
        <span class="btn-export">导出数据</span>
        <el-input
          v-model="serachText"
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

    <div class="suggestion-content">
      <suggestion-list v-if="tabActive==0"></suggestion-list>
      <suggestion-type v-if="tabActive==1"></suggestion-type>
    </div>
  </div>
</template>

<script>
import '@/assets/css/manage.css';
import SuggestionList from './SuggestionList';
import SuggestionType from './SuggestionType';
export default {
  name: 'suggestion',
  components: {
    SuggestionList,
    SuggestionType
  },
  data() {
    return {
      serachText: '',
      tabActive: 0,   // 0:意见建议  1:意见分类管理
    }
  },
  methods: {
    search() {}
  }
}
</script>

<style scoped>
.suggestion-header {
  margin-bottom: 20px;
  justify-content: space-between;
}

.suggestion-tabs {
  display: flex;
}
.suggestion-tabs li {
  margin-right: 10px;
  cursor: pointer;
}
.tab-active {
  color: #409eff;
}
</style>
