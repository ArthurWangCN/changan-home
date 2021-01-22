<template>
  <div class="knowlege-map">
    <div class="hot-tags-title circle-title">
      <div class="title-left">
        <p class="circle-title-name">项目知识地图</p>
      </div>
    </div>
    <el-carousel
      height="345px"
      :interval="5000"
      arrow="never"
      indicator-position="none"
    >
      <el-carousel-item
        v-for="item1 in 1"
        :key="item1"
      >
        <div id="divs">
          <div
            class="map"
            v-for="(item, index) in data"
            :key="index"
            :style="item.styleObject"
          >
            <span>{{ item.title }}</span>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import { mapdata, colordata } from "@/utils/index.js";

export default {
  data: () => ({
    data: [],
  }),
  created() {
    this.init();
  },
  methods: {
    init() {
      var data = mapdata.map((item, index) => {
        item.styleObject = this.getStyle(index, item.styleObject.left);
        return item;
      });
      this.data = data;
    },

    getStyle(index, data) {
      var randWidth = Math.floor(Math.random() * (100 - 60)) + 60;
      if (index == 0) {
        var Left = 30;
      } else {
        var Left = 30 + 180 * index;
      }
      var Top = Math.floor(Math.random() * 200) + 1;
      var color = colordata[Math.floor(Math.random() * colordata.length)];
      var style = {
        width: randWidth + "px",
        height: randWidth + "px",
        top: Top + "px",
        left: Left + "px",
        backgroundColor: color,
      };
      return style;
    },
  },
};
</script>
<style scoped>
* {
  transition: all 0.7s ease 0s;
}
#divs {
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
  position: relative;
  height: 345px;
}
#divs .map {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  border-radius: 50%;
  color: #fff;
  animation: myfirstd linear infinite 2s;
  position: absolute;
}
#divs .map:hover {
  transform: scale(1.3);
  transition: all 0.3s;
}
@keyframes myfirstd {
  0% {
    margin-top: 0;
  }
  40% {
    margin-top: 8px;
  }
  100% {
    margin-top: 0;
  }
}
@-webkit-keyframes myfirstd {
  0% {
    margin-top: 0;
  }
  40% {
    margin-top: 8px;
  }
  100% {
    margin-top: 0;
  }
}

.knowlege-map >>> .el-carousel__button {
  opacity: 1;
  background-color: #a8a8a8;
  width: 20px;
  height: 4px;
  border-radius: 2px;
}
.knowlege-map >>> .el-carousel__indicator.is-active button {
  background-color: #3d8cfc;
  width: 30px;
  height: 6px;
  border-radius: 3px;
}
</style>