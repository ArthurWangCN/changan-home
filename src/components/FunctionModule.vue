<template>
  <div class="function-wrapper">
    <div>
      <svg
        class="iconfont"
        aria-hidden="true"
        @click="moduleDialogVisible = true"
      >
        <use xlink:href="#iconadd1" />
      </svg>
    </div>

    <el-dialog
      custom-class="module-dialog"
      width="405px"
      title="功能模块"
      :lock-scroll="true"
      :modal="false"
      :append-to-body="true"
      :visible.sync="moduleDialogVisible"
    >
      <div style="height: 400px; padding: 10px 0">
        <el-scrollbar style="height: 100%">
          <ul class="module-list">
            <li class="module-item" v-for="item in layout" :key="item.id">
              <div>
                <p class="module-name">{{ item.componentName }}</p>
                <p class="module-desc">{{ item.componentDescribe }}</p>
              </div>
              <span
                v-if="item.componentStatus == 1"
                class="remove-btn"
                :class="{ 'is-remove': item.showRemove,'btn-disabled':item.isMove==0}"
                @mouseenter="item.showRemove = true"
                @mouseout="item.showRemove = false"
                @click="updatePortalComp(item, 'remove')"
              >
                {{ !item.showRemove&&item.isMove!=0 ? "已添加" : "移除" }}
              </span>
              <span v-else class="add-btn" @click="updatePortalComp(item, 'add')">添加</span>
            </li>
          </ul>
        </el-scrollbar>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPortalList, updatePortalComp } from "@/api/interface/manage";
export default {
  name: "functionModule",
  data() {
    return {
      moduleDialogVisible: false,
      modules: [
        {
          name: "知识目录",
          desc: "展示智谷平台知识目录体系",
        },
        {
          name: "专业频道",
          desc: "展示智谷平台所有专业频道",
        },
        {
          name: "通知公告",
          desc: "展示相关通知公告",
        },
        {
          name: "轮播图",
          desc: "展示相关宣传图片",
        },
        {
          name: "推荐知识",
          desc: "根据用户画像自动推送及管理员人工推送的相关知识",
        },
        {
          name: "热点知识",
          desc: "展示平台用户浏览较多的知识",
        },
        {
          name: "行业资讯",
          desc: "公司所处行业相关的资讯信息",
        },
        {
          name: "热门标签",
          desc: "展示平台用户检索频率高的检索词",
        },
        {
          name: "热门话题/最新话题",
          desc: "展示浏览量较多和最新提问的话题",
        },
        {
          name: "热门圈子",
          desc: "展示加入成员较多的圈子",
        },
        {
          name: "专栏",
          desc: "展示智谷平台的知识专栏",
        },
        {
          name: "项目知识地图",
          desc: "展示相关的知识地图",
        },
      ],
      layout: [],
      removeText: false,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getPortalList();
    },

    getPortalList() {
      getPortalList()
        .then((res) => {
          if (res.success) {
            let arr = res.content;
            arr.forEach((item) => {
              item.showRemove = false;
            });
            this.layout = arr;
            console.log(this.layout);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.$message.error(err.message);
        })
        .finally((_) => {
          // this.isLoading = false;
        });
    },

    updatePortalComp(comp, operation) {
      if (comp.isMove==0) return;
      updatePortalComp({
        id: comp.id,
        isMove: operation==='add' ? 0 : 1
      }).then(res => {
        if (res.success) {
          this.getPortalList();
        }
      }).catch((err) => {
        this.$message.error(err.message);
      })
    }
  },
};
</script>

<style scoped>
.function-wrapper {
  width: 406px;
  height: 348px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 10px;
  margin-left: 20px;
}
.function-wrapper .iconfont {
  width: 70px;
  height: 70px;
  fill: #367fff;
  cursor: pointer;
}

.module-list {
  padding: 0 20px;
  overflow-x: hidden;
}
.module-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  height: 70px;
}

.add-btn,
.remove-btn {
  width: 60px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  padding: 0;
  border-radius: 16px;
  cursor: pointer;
  flex-shrink: 0;
}
.add-btn {
  background-color: #3789ff;
  color: #ffffff;
}
.remove-btn {
  background-color: #ebf3ff;
  color: #3789ff;
}
.is-remove {
  background-color: #eeeeee;
  color: #333333;
}

.module-item {
  color: #333333;
  font-size: 14px;
}
.module-desc {
  font-size: 12px;
}

.btn-disabled{
  cursor: not-allowed;
  background-color: #eeeeee;
  color: #333333;
}
</style>
