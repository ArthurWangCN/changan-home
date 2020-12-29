<template>
  <div class="professional-channel knowlege-channel">
    <div class="knowlege-channel-title">
      <div class="icon-wrapper iconmajor">
        <svg class="iconfont iconmajor" aria-hidden="true">
          <use xlink:href="#iconmajor" />
        </svg>
      </div>
      专业频道
    </div>
    <div class="knowlege-items">
      <div class="inner-container">
        <div
          v-for="(item, index) in data"
          @click="goChannel(item.url)"
          class="knowlege-row knowlege-channel-row"
        >
          <p>{{ item.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getChannel } from "../api/interface/home";

export default {
  data() {
    return {
      data: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      getChannel({})
        .then((json) => {
          if (json.success) {
            this.data = json.content;
          } else {
            this.$message.error(json.message);
          }
        })
        .catch((json) => {
          this.$message.error(json.message);
        });
    },

    //跳转专业频道
    goChannel(url) {
      window.open(url);
    },
  },
};
</script>