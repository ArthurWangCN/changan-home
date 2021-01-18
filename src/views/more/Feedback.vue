<template>
  <div class="more-wrapper">
    <top type="common" />

    <div  v-loading="isLoading">
      <div class="more-breadcrumb ">
        <span @click="goHome">智谷首页</span>
        <i class="el-icon-arrow-right" style="margin:0 6px;"></i>
        <span @click="goFeedback" class="breadcrumb-cur">反馈建议</span>
      </div>

      <div class="more-content feedback-content">
        <el-tabs v-model="tabName">
          <!-- 发表意见 -->
          <el-tab-pane label="发表意见" name="opinion">
            <div class="feedback-opinion">
              <p class="mt30 mb20">请选择意见类型：</p>
              <el-select v-model="opinionType" placeholder="请选择">
                <el-option
                  v-for="item in opinionTypeList"
                  :key="item.id"
                  :label="item.type_name"
                  :value="item.id">
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
                <el-button @click="clearOpinion" round>取消</el-button>
              </div>
            </div>
          </el-tab-pane>

          <!-- 我有外部行业资讯需求 -->
          <el-tab-pane label="我有外部行业资讯需求" name="demand">
            <div class="feedback-demand">
              <p class="mt30 mb20">需求内容：</p>
              <el-input
                type="textarea"
                maxlength="500"
                show-word-limit
                placeholder="请输入内容"
                v-model="demandContent">
              </el-input>
              <p class="mt30 mb20">已有信息或已交流供应商：</p>
              <el-input
                type="textarea"
                maxlength="500"
                show-word-limit
                placeholder="请输入内容"
                v-model="supplier">
              </el-input>
              <p class="mt30 mb20">所需项目/所需单位：</p>
              <el-input
                class="project-input"
                type="textarea"
                placeholder="请输入内容"
                v-model="requiredItems">
              </el-input>
              <div class="feedback-btns">
                <el-button type="primary" @click="submitDemand" round>提交</el-button>
                <el-button @click="clearDemand" round>取消</el-button>
              </div>
            </div>
          </el-tab-pane>

          <!-- 意见反馈记录 -->
          <el-tab-pane label="意见反馈记录" name="opinionRecord">
            <ul class="opinion-record">
              <li
                class="record-item"
                v-for="item of opinionList"
                :key="item.id"
              >
                <div class="record-text">
                  <p :class="{'text-ellipsis2': item.isFold}">{{ item.submitInfo }}</p>
                  <span class="expand" @click="item.isFold=!item.isFold" v-if="item.showFold">
                    <span v-if="item.isFold">展开<i class="el-icon-arrow-down"></i></span>
                    <span v-else>收起<i class="el-icon-arrow-up"></i></span>
                  </span>
                </div>
                <p class="record-time">提交时间: {{ item.submitTime }}</p>
                <div class="record-reply" v-if="item.replyStatus!=0">
                  <div class="record-text">
                    <p :class="{'text-ellipsis2': item.isReplyFold}">回复意见 : {{ item.reply }}</p>
                    <span class="expand" @click="item.isReplyFold=!item.isReplyFold" v-if="item.showReplyFold">
                      <span v-if="item.isReplyFold">展开<i class="el-icon-arrow-down"></i></span>
                      <span v-else>收起<i class="el-icon-arrow-up"></i></span>
                    </span>
                  </div>
                  <p class="record-time">回复时间: {{ item.replyTime }}</p>
                </div>
              </li>
            </ul>

            <el-pagination
              @current-change="handleOpinionCurrentChange"
              :current-page.sync="opinionCurrent"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="opinionTotal"
              background
              hide-on-single-page
              style="text-align: center; margin-top: 50px; margin-bottom: 30px"
            />
          </el-tab-pane>

          <!-- 需求反馈记录 -->
          <el-tab-pane label="需求反馈记录" name="demandRecord">
            <ul class="opinion-record">
              <li
                class="record-item"
                v-for="item of demandList"
                :key="item.id"
              >
                <div class="record-text">
                  <p :class="{'text-ellipsis2': item.isFold}">{{ item.demandContent }}</p>
                  <span class="expand" @click="item.isFold=!item.isFold" v-if="item.showFold">
                    <span v-if="item.isFold">展开<i class="el-icon-arrow-down"></i></span>
                    <span v-else>收起<i class="el-icon-arrow-up"></i></span>
                  </span>
                </div>
                <p class="demand-info">
                  <span class="demand-info-item text-ellipsis" :title="item.supplier">已有信息或已交流供应商: {{ item.supplier }}</span>
                  <span class="demand-info-item text-ellipsis" :title="item.requiredItems">所需项目/所需单位: {{ item.requiredItems }}</span>
                  <span class="demand-info-item text-ellipsis" style="text-align:right;">提交时间: {{ item.submitTime }}</span>
                </p>
                <div class="record-reply" v-if="item.demandStatus!=0">
                  <div class="record-text">
                    <p :class="{'text-ellipsis2': item.isReplyFold}">回复意见 : {{ item.reply }}</p>
                    <span class="expand" @click="item.isReplyFold=!item.isReplyFold" v-if="item.showReplyFold">
                      <span v-if="item.isReplyFold">展开<i class="el-icon-arrow-down"></i></span>
                      <span v-else>收起<i class="el-icon-arrow-up"></i></span>
                    </span>
                  </div>
                  <p class="record-time">回复时间: {{ item.replyTime }}</p>
                </div>
              </li>
            </ul>

            <el-pagination
              @current-change="handleDemandCurrentChange"
              :current-page.sync="demandCurrent"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="demandTotal"
              background
              hide-on-single-page
              style="text-align: center; margin-top: 50px; margin-bottom: 30px"
            />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <common-footer />
  </div>
</template>

<script>
import '@/assets/css/more.css';
import {
  getOpinionTypeList,
  submitOpinion,
  submitDemand,
  getOpinionList,
  getDemandList
} from '@/api/interface/more';
export default {
  name: 'feedback',
  data () {
    return {
      isLoading: false,
      tabName: 'opinion',
      opinionTypeList: [],
      opinionList: [],
      demandList: [],
      opinionType: '',   // 意见类型
      opinionText: '',   // 意见内容
      demandContent: '', // 需求内容
      supplier: '',      // 已有信息或已交流供应商
      requiredItems: '', // 所需项目/所需单位
      opinionCurrent: 1,
      opinionTotal: 0,
      demandCurrent: 1,
      demandTotal: 0,
    }
  },
  components: {
    Top: window.TopCommonFooter.Top,
    CommonFooter: window.TopCommonFooter.CommonFooter,
  },
  created() {
    this.init();
  },
  watch: {
    tabName(val) {
      this.opinionCurrent = 1;
      this.demandCurrent = 1;
      if (val === 'opinion') {
        this.getOpinionTypeList();
      } else if (val === 'opinionRecord') {
        this.getOpinionList();
      } else if (val === 'demandRecord') {
        this.getDemandList();
      }
    }
  },
  methods: {
    init() {
      this.getOpinionTypeList();
    },

    getOpinionTypeList() {
      this.isLoading = true;
      getOpinionTypeList()
      .then(res => {
        if (res.success) {
          this.opinionTypeList = res.content;
          this.opinionType = this.opinionTypeList[0].id;
        }
      }).catch(err => {
        this.$message.error(err.message);
      }).finally(_ => {
        this.isLoading = false;
      })
    },

    // 意见记录
    getOpinionList() {
      this.isLoading = true;
      getOpinionList({
        current: this.opinionCurrent,
        size: 10
      }).then(res => {
        if (res.success) {
          this.opinionList = res.content.records;
          this.opinionTotal = res.content.total;
          this.opinionList.forEach(item => {
            // 格式化时间
            item.submitTime = this.formatTime(item.submitTime);
            item.replyTime = this.formatTime(item.replyTime);
            this.$set(item, 'isFold', true);  // 展开/收起
            this.$set(item, 'showFold', item.submitInfo.length>150);  // 是否显示展开/收起
            if(item.replyStatus != 0) {
              this.$set(item, 'isReplyFold', true);
              this.$set(item, 'showReplyFold', item.reply.length>150);
            }
          })
        }
      }).catch(err => {
        this.$message.error(err.message);
      }).finally(_ => {
        this.isLoading = false;
      })
    },

    // 需求记录
    getDemandList() {
      this.isLoading = true;
      getDemandList({
        current: this.demandCurrent,
        size: 10
      }).then(res => {
        if (res.success) {
          this.demandList = res.content.records;
          this.demandTotal = res.content.total;
          this.demandList.forEach(item => {
            // 格式化时间
            item.submitTime = this.formatTime(item.submitTime);
            item.replyTime = this.formatTime(item.replyTime);
            this.$set(item, 'isFold', true);  // 展开/收起
            this.$set(item, 'showFold', item.demandContent.length>150);  // 是否显示展开/收起
            if(item.demandStatus != 0) {
              this.$set(item, 'isReplyFold', true);
              this.$set(item, 'showReplyFold', item.reply.length>150);
            }
          })
        }
      }).catch(err => {
        this.$message.error(err.message);
      }).finally(_ => {
        this.isLoading = false;
      })
    },

    // 提交意见
    submitOpinion() {
      if (this.opinionText.trim() === '') return this.$message.warning('意见内容不能为空');
      submitOpinion({
        opType: this.opinionType,
        submitInfo: this.opinionText.trim()
      }).then(res => {
        if (res.success) {
          this.$message.success('提交成功');
          this.clearOpinion();
        }
      }).catch(err => {
        this.$message.error(err.message);
      })
    },
    clearOpinion() {
      this.opinionType = this.opinionTypeList[0].id;
      this.opinionText = '';
    },

    // 提交需求
    submitDemand() {
      if (this.demandContent.trim() === '') return this.$message.warning('需求内容不能为空');
      if (this.supplier.trim() === '') return this.$message.warning('已有信息或已交流供应商不能为空');
      if (this.requiredItems.trim() === '') return this.$message.warning('所需项目/单位不能为空');
      submitDemand({
        demandContent: this.demandContent.trim(),
        supplier: this.supplier.trim(),
        requiredItems: this.requiredItems.trim(),
      }).then(res => {
        if (res.success) {
          this.$message.success('提交成功');
          this.clearDemand();
        }
      }).catch(err => {
        this.$message.error(err.message);
      })
    },
    clearDemand() {
      this.demandContent = '';
      this.supplier = '';
      this.requiredItems = '';
    },

    handleOpinionCurrentChange(current) {
      this.opinionCurrent = current;
      this.getOpinionList();
    },

    handleDemandCurrentChange(current) {
      this.demandCurrent = current;
      this.getDemandList();
    },

    goHome() {
      this.$router.push({path: '/'})
    },

    goFeedback() {
      this.$router.push({path: '/feedback'})
    },

    formatTime(time) {
      if (!time) return '';
      let date = time.substr(0, 16);
      date = date.replace(/-/g, '/');
      return date;
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

/* 意见 */
.feedback-opinion,
.feedback-demand,
.opinion-record {
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

/* 需求 */
.feedback-demand >>> .el-textarea__inner {
  resize: none;
  height: 200px;
}
.feedback-demand .project-input >>> .el-textarea__inner{
  height: 160px;
}
.feedback-demand .feedback-btns { margin-top: 50px; }

/* 意见记录 */
.record-item {
  position: relative;
  padding: 30px 0;
  border-bottom: 1px solid #eeeeee;
}
.record-time {
  color: #999999;
  font-size: 12px;
  margin-top: 10px;
}
.record-reply {
  margin-top: 30px;
  padding: 20px;
  padding-bottom: 30px;
  background-color: #f9fafb;
}
.outer-text {
  height: 38px;
  overflow: hidden;
}
.record-text{
  position: relative;
}
.expand {
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 0 10px;
  padding-right: 0;
  color: #3d8cfc;
  background-color: #ffffff;
  cursor: pointer;
}
.record-reply .expand {
  background-color: #f9fafb;
}

.demand-info {
  margin-top: 10px;
  color: #999999;
  font-size: 12px;
}
.demand-info-item {
  display: inline-block;
  box-sizing: border-box;
  padding-right: 20px;
  width: 40%;
}
.demand-info-item:last-child {
  width: 20%;
  padding-right: 0;
}
</style>
