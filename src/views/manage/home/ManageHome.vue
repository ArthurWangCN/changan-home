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

    <home-layout v-if="tabActive === 'layout'"></home-layout>

    <home-banner v-if="tabActive === 'banner'"></home-banner>

    <home-notice v-if="tabActive === 'notice'"></home-notice>

    <home-information v-if="tabActive === 'information'"></home-information>

    <hot-setting v-if="tabActive === 'circle'" key="circle" tabActive="circle"></hot-setting>
    <hot-setting v-if="tabActive === 'column'" key="column" tabActive="column"></hot-setting>
    <hot-setting v-if="tabActive === 'topic'" key="topic" tabActive="topic"></hot-setting>

    <login-pic v-if="tabActive === 'login'"></login-pic>
  </div>
</template>

<script>
import '@/assets/css/manage.css';
import HomeLayout from '@/components/manage/HomeLayout.vue';
import HomeBanner from '@/components/manage/HomeBanner.vue';
import HomeNotice from '@/components/manage/HomeNotice.vue';
import HomeInformation from '@/components/manage/HomeInformation.vue';
import HotSetting from '@/components/manage/HotSetting.vue';
import LoginPic from '@/components/manage/LoginPic.vue';
export default {
  name: 'manageHome',
  components: {
    HomeLayout,
    HomeBanner,
    HomeNotice,
    HomeInformation,
    HotSetting,
    LoginPic,
  },
  data() {
    return {
      tabBtns: [
        { id:"layout", name: "门户组件显示设置" },
        { id:"banner", name: "轮播图设置" },
        { id:"notice", name: "系统公告设置" },
        { id:"information", name: "技术资讯设置" },
        { id:"circle", name: "热门圈子设置" },
        { id:"column", name: "专栏设置" },
        { id:"topic", name: "热门话题设置" },
        { id:"login", name: "登录页图片修改" }
      ],
      tabActive: 'layout'
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
