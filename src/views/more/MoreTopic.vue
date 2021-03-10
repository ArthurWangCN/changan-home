<template>
  <div class="more-wrapper">
    <top type="common" />

    <div  v-loading="isLoading">
      <div class="more-breadcrumb ">
        <span @click="goHome">智谷首页</span>
        <i class="el-icon-arrow-right" style="margin:0 6px;"></i>
        <span class="breadcrumb-cur">热门话题</span>
      </div>

      <div class="more-content kno-content">
        <div class="kno-header">
          <span>
            排序方式：
            <span class="color-blue">浏览量<i class="el-icon-bottom"></i></span>
          </span>
          <span class="font-info">共{{total}}条结果</span>
        </div>

        <ul class="kno-list">
          <li
            class="kno-item"
            v-for="(item, index) in hotTopic"
            :key="index"
          >
            <p class="kno-title text-ellipsis" @click="goTopicDetail(item)">{{ item.questionTitle }}</p>
            <div class="kno-info">
              <span :title="item.creator">作者：{{ item.creator }}</span>
              <span class="kno-info-from" :title="item.classification">
                来源：{{ item.circleName || '圈子' }}
              </span>
              <span>浏览量：{{ item.viewCount || 0 }}</span>
              <span>发布时间：{{ item.createTime }}</span>
            </div>
          </li>
        </ul>

        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="20"
          layout="prev, pager, next, jumper"
          :total="total"
          background
          hide-on-single-page
          style="text-align: center; margin-top: 40px; padding-bottom: 50px"
        />
      </div>
    </div>

    <common-footer />

    <circle-dialog ref="circleDialog" :curTopic='curTopic' @joinCircle="getHotTopic"></circle-dialog>
  </div>
</template>

<script>
import '@/assets/css/more.css';
import { formatDate } from '@/utils/index';
import { getHotTopic, getTopicItem } from '@/api/interface/home';
import { publiceUrl } from "@/utils/index.js";
import CircleDialog from '@/components/CircleDialog.vue';
export default {
  name: 'knowledgeList',
  data() {
    return {
      isLoading: false,
      currentPage: 1,
      total: 0,
      hotTopic: [],
      curTopic: {},
    }
  },
  components: {
    CircleDialog,
    Top: window.TopCommonFooter.Top,
    CommonFooter: window.TopCommonFooter.CommonFooter,
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getHotTopic();
    },

    getHotTopic() {
      getHotTopic({
        current: this.currentPage,
        size: 20,
        type: 'hot'
      }).then(res => {
        if (res.success) {
          this.hotTopic = res.content.rows;
          this.total = res.content.totalRows;
          this.hotTopic.forEach(item => {
            // 格式化时间
            item.createTime = formatDate(item.createTime);
          })
        }
      }).catch(err => {
        this.$message.error(err.message);
      }).finally(_ => {
        this.isLoading = false;
      })
    },

    goTopicDetail(topic) {
      const id = topic.id;
      getTopicItem({
        questionId: id,
      })
        .then((json) => {
          if (json.success) {
            if (json.content.isVerify) {
              window.open(
                publiceUrl + "/circle/#/circle-specialArea/detail?id=" + id
              );
            } else {
              // this.$message.warning("您暂无权限查看该话题");
              if (topic.joinStatus == '1') {
                this.$message({
                  message: '圈子审核中，请稍候',
                  type: 'warning',
                  offset: 60
                });
              } else {
                this.curTopic = topic;
                this.$refs.circleDialog.dialogVisible = true;
                this.$refs.circleDialog.circleId = topic.circleId;
              }
            }
          } else {
            this.$message.error(json.message);
          }
        })
        .catch((json) => {
          this.$message.error(json.message);
        });
    },
    handleCurrentChange(current) {
      this.currentPage = current;
      this.getHotTopic();
    },

    goHome() {
      this.$router.push({path: '/'});
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
  font-size: 14px;
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
.color-blue {color: #367fff;}
</style>
