<template>
  <div class="manage-home manage-comp">
    <ul class="manage-home-tabs">
      <li
        v-for="item in tabBtns"
        :key="item.id"
        class="home-tab-btn"
        :class="{'home-tab-active': tabActive===item.id}"
        @click="tabActive = item.id"
      >{{item.name}}</li>
    </ul>

    <home-notice v-show="tabActive === 'notice'"></home-notice>
  </div>
</template>

<script>
import '@/assets/css/manage.css';
import HomeNotice from '@/components/manage/HomeNotice.vue';
export default {
  name: 'manageHome',
  components: {
    HomeNotice,
  },
  data() {
    return {
      tabBtns: [
        { id:"layout", name: "门户组件显示设置" },
        { id:"banner", name: "轮播图设置" },
        { id:"notice", name: "系统公告设置" },
        { id:"information", name: "行业资讯设置" },
        { id:"circle", name: "热门圈子设置" },
        { id:"column", name: "热门专栏设置" },
        { id:"topic", name: "热门话题设置" },
        { id:"login", name: "登录页图片修改" }
      ],
      tabActive: 'notice'
    }
  }
}
</script>

<style scoped>
.manage-home-tabs {
  display: flex;
  align-items: center;
}
.home-tab-btn {
  font-size: 14px;
  margin-right: 10px;
  cursor: pointer;
}
.home-tab-active {background-color: #367fff;}
</style>
