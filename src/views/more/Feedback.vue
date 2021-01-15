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
              <p class="mt30 mb20">请选择意见类型：</p>
              <el-select v-model="opinionType" placeholder="请选择">
                <el-option
                  v-for="item in opinionTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <p class="mt30 mb20">请填写对平台的意见和建议：</p>
              <el-input
                type="textarea"
                maxlength="500"
                show-word-limit
                placeholder="请输入您要写的意见"
                v-model="opinionText">
              </el-input>
              <div class="feedback-btns">
                <el-button type="primary" @click="submitOpinion" round>提交</el-button>
                <el-button @click="cancelOpinion" round>取消</el-button>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="我有外部行业资讯需求" name="demand">
            <div class="feedback-demand">
              <p class="mt30 mb20">需求内容：</p>
              <el-input
                type="textarea"
                maxlength="500"
                show-word-limit
                placeholder="请输入内容"
                v-model="opinionText">
              </el-input>
              <p class="mt30 mb20">已有信息或已交流供应商：</p>
              <el-input
                type="textarea"
                maxlength="500"
                show-word-limit
                placeholder="请输入内容"
                v-model="opinionText">
              </el-input>
              <p class="mt30 mb20">所需项目/所需单位：</p>
              <el-input
                class="project-input"
                type="textarea"
                placeholder="请输入内容"
                v-model="opinionText">
              </el-input>
              <div class="feedback-btns">
                <el-button type="primary" @click="submitOpinion" round>提交</el-button>
                <el-button @click="cancelOpinion" round>取消</el-button>
              </div>
            </div>
          </el-tab-pane>
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
      opinionTypeList: [{
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
        opinionType: '',
        opinionText: ''
    }
  },
  components: {
    Top: window.TopCommonFooter.Top,
    CommonFooter: window.TopCommonFooter.CommonFooter,
  },
  methods: {

    // 提交意见
    submitOpinion() {

    },
    cancelOpinion() {

    },


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

.feedback-opinion,
.feedback-demand {
  font-size: 14px;
  color: #333333;
}
.feedback-opinion >>> .el-select {
  width: 100%;
}
.feedback-opinion >>> .el-textarea__inner{
  resize: none;
  height: 304px;
}
.feedback-btns {
  margin-top: 100px;
  text-align: center;
}

.feedback-demand >>> .el-textarea__inner {
  resize: none;
  height: 200px;
}
.feedback-demand .project-input >>> .el-textarea__inner{
  height: 160px;
}
.feedback-demand .feedback-btns { margin-top: 50px; }
</style>

