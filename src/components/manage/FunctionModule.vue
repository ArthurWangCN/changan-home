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
            <li class="module-item" v-for="item in moduleList" :key="item.id">
              <div>
                <p class="module-name">{{ item.componentName }}</p>
                <p class="module-desc text-ellipsis" :title="item.componentDescribe">{{ item.componentDescribe }}</p>
              </div>
              <span
                v-if="item.componentStatus == 1"
                class="remove-btn"
                :class="{ 'is-remove': item.showRemove,'btn-disabled':item.isMove==0}"
                @mouseenter="item.showRemove = true"
                @mouseout="item.showRemove = false"
                @click="updatePortalComp(item, 'remove')"
              >
                <span class="remove-btn-text" v-if="item.isMove==0">已添加</span>
                <span class="remove-btn-text" v-else>{{ !item.showRemove ? "已添加" : "移除" }}</span>
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
      moduleList: [],
      removeText: false,
    };
  },
  created() {
    this.init();
  },
  watch: {
    moduleDialogVisible(val) {
      if (val) {
        this.getPortalList();
      } else {
        this.$emit('updateComp');
      }
    }
  },
  methods: {
    init() {
      // this.getPortalList();
    },

    // 功能模块列表
    getPortalList() {
      getPortalList()
        .then((res) => {
          if (res.success) {
            let arr = res.content;
            arr.forEach((item) => {
              item.showRemove = false;
            });
            this.moduleList = arr;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.$message.error(err.message);
        })
    },

    // 添加移除功能模块
    updatePortalComp(comp, operation) {
      if (comp.isMove==0) return; // isMove为0表示组件不可移除
      updatePortalComp({
        id: comp.id,
        isMove: operation==='add' ? 0 : 1
      }).then(res => {
        if (res.success) {
          comp.componentStatus == 1 ? 0 : 1;
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
.remove-btn,
.added-btn {
  background-color: #ebf3ff;
  color: #3789ff;
}
.remove-btn-text {
  display: inline-block;
  width: 100%;
  height: 100%;
  border-radius: 16px;
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
  margin-top: 6px;
  max-width: 300px;
}

.btn-disabled{
  cursor: not-allowed;
  background-color: #eeeeee;
  color: #333333;
}

.text-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
