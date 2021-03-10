<template>
  <div>
    <iframe class="tech-info" :src="url" frameborder="0"></iframe>
  </div>
</template>

<script>
import { publiceUrl } from "@/utils/index.js";
export default {
  name: 'homeInformation',
  data() {
    return {
      url: `${publiceUrl}/skdm/#/knowledge/common/manage?isIndustry=true`
    }
  }
}
</script>

<style scoped>
.tech-info {
  width: 100%;
  min-height: calc(100vh - 100px);
  margin-top: 20px;
}
</style>
