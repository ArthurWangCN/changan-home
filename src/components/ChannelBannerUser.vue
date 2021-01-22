<template>
  <div class="flex">
    <!-- 专业频道、图、个人信息 -->
    <channel />
    <div class="banner">
      <!-- 轮播图 -->
      <!-- <img v-if="isRemove" src="../assets/img/banner-temp.png" alt=""> -->
      <banner />
    </div>
    <!-- 个人信息 -->
    <personal />
  </div>
</template>

<script>
import Banner from "@/components/Banner.vue";
import Channel from "@/components/Channel.vue";
import Personal from "@/components/Personal.vue";
export default {
  name: "channelBannerUser",
  components: {
    Banner,
    Channel,
    Personal,
  },
  props: {
    isRomove: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>