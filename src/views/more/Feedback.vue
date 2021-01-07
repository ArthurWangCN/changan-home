<template>
  <div class="more-wrapper">
    <top type="common" />

    <div  v-loading="isLoading">
      <div class="more-breadcrumb ">
        <span @click="goHome">智谷首页</span>
        <i class="el-icon-arrow-right" style="margin:0 6px;"></i>
        <span class="breadcrumb-cur">反馈建议</span>
      </div>

      <div class="more-content feedback-content">
        <el-tabs v-model="tabName">
          <el-tab-pane label="发表意见" name="opinion">
            <div class="feedback-opinion">
              <p>请选择意见类型：</p>
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-tab-pane>
          <el-tab-pane label="我有外部行业资讯需求" name="demand">我有外部行业资讯需求</el-tab-pane>
          <el-tab-pane label="意见反馈记录" name="opinionRecord">意见反馈记录</el-tab-pane>
          <el-tab-pane label="需求反馈记录" name="demandRecord">需求反馈记录</el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <common-footer />
  </div>
</template>

<script>
import '@/assets/css/more.css';
import {} from '@/api/interface/more';
export default {
  name: 'feedback',
  data () {
    return {
      isLoading: false,
      tabName: 'opinion',
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
    }
  },
  components: {
    Top: window.TopCommonFooter.Top,
    CommonFooter: window.TopCommonFooter.CommonFooter,
  },
  methods: {
    goHome() {

    }
  }
}
</script>

<style scoped>
.feedback-content {
  box-sizing: border-box;
  padding: 0 30px 40px;
}

/* 导航栏 */
.feedback-content >>> .el-tabs__item {
  height: 70px;
  line-height: 70px;
  font-size: 18px;
  color: #000000;
}
.feedback-content >>> .el-tabs__header{ margin-bottom: 0; }
.feedback-content >>> .el-tabs__item.is-active { color: #3d8cfc; }
.feedback-content >>> .el-tabs__active-bar {
  height: 3px;
  background-color: #3d8cfc;
}
.feedback-content >>> .el-tabs__nav-wrap::after { background-color: #eeeeee; }

.feedback-opinion {
  font-size: 14px;
  color: #333333;
}
</style>

