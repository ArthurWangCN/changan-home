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
      :visible.sync="moduleDialogVisible"
        style="right:20px;height:800px;"
    >
      <div style="height:400px;padding:10px 0;">
        <el-scrollbar style="height:100%">
        <ul class="module-list">
          <li class="module-item" v-for="item in modules" :key="item.name">
            <div>
              <p>{{ item.name }}</p>
              <p>{{ item.desc }}</p>
            </div>
            <el-button round>添加</el-button>
          </li>
        </ul>
      </el-scrollbar>
      </div>
    </el-dialog>
  </div>
</template>

<script>
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
    };
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
</style>
