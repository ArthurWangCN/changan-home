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
    <!-- <div class="knowlege-items">
      <div class="inner-container">
        <div
          v-for="(item, index) in data"
          @click="goChannel(item.url)"
          class="knowlege-row knowlege-channel-row"
        >
          <p>{{ item.title }}</p>
        </div>
      </div>
    </div> -->
    <div class="channel-content">
      <ul class="content-l">
        <li
          class="channel-item"
          v-for="iteml in dataL"
          :key="iteml.id"
          @click="goChannel(iteml.url)"
        >{{ iteml.title }}</li>
      </ul>
      <ul class="content-r">
        <li
          class="channel-item ml20"
          v-for="itemr in dataR"
          :key="itemr.id"
          @click="goChannel(itemr.url)"
        >{{ itemr.title }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getChannel } from "../api/interface/home";

export default {
  data() {
    return {
      data: [],
      dataL: [],
      dataR: []
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
            this.data.forEach((item, index) => {
              if (index%2 === 0 && this.dataL.length<10) {
                this.dataL.push(item);
              }
              if (index%2 === 1 && this.dataR.length<10) {
                this.dataR.push(item);
              }
            })
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

<style scoped>
.channel-content {
  margin: 0 30px;
  margin-top: 15px;
  height: 320px;
}
.channel-content > ul {
  float: left;
  box-sizing: border-box;
  width: 50%;
  height: 100%;
}
.content-l {
  border-right: 1px solid #eeeeee;
}
.channel-item {
  font-size: 14px;
  color: #666;
  cursor: pointer;
  width: 95%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 15px;
}
.channel-item:hover {
  color: #3b83ff;
}
.ml20{
  margin-left: 20px;
}
</style>
