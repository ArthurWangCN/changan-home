<template>
  <div class="hot-knowlege">
    <div class="hot-knowlege-title circle-title">
      <p class="circle-title-name">热点知识</p>
      <a class="more" @click.prevent="goHotKno">更多</a>
    </div>
    <div class="hot-knowlege-items">
      <div
        class="hot-knowlege-item-wrapper"
        v-for="(item, index) in hotKnowlege"
        :key="index"
      >
        <div class="first-column-item" v-show="item.isShowPicInfo">
          <div class="item-img">
            <img src="../assets/img/document.png" alt="" />
            <svg :class="`iconfont iconHot iconHot${index}`" aria-hidden="true">
              <use xlink:href="#iconHot" />
              <text x="5" y="13" font-size="12" fill="white">
                {{ index + 1 }}
              </text>
            </svg>
          </div>
          <div class="recommend-item-info">
            <div class="first-item-title" @click="goKnow(item.detailUrl)" :title="item.title">{{ item.title }}</div>
            <div class="first-item-intro">{{ item.detail }}</div>
          </div>
        </div>
        <div
          class="normal-column-item"
          @mouseenter="showHotKnowlegeItemWithImg(index)"
          v-show="!item.isShowPicInfo"
        >
          <svg
            v-if="index === 0 || index === 1 || index === 2"
            :class="`iconfont iconHot iconHot${index}`"
            aria-hidden="true"
          >
            <use xlink:href="#iconHot" />
            <text x="5" y="13" font-size="12" fill="white">
              {{ index + 1 }}
            </text>
          </svg>
          <span v-else>{{ index + 1 }}</span>
          <p class="hot-item-name text-ellipsis" @click="goKnow(item.detailUrl)">{{ item.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getHotKnoList } from '@/api/interface/home';
export default {
  data() {
    return {
      // 热点知识
      hotKnowlege: [
        // {
        //   title: "长安汽车与宁德时代…",
        //   detail: "盖世汽车讯据外媒拉加拿大电池研密度的新一代电池",
        //   imgUrl: "../../assets/img/document.jpg",
        //   isShowPicInfo: true,
        // },
        // {
        //   title: "通用为电动车信息",
        //   detail: "盖世汽车讯据外媒拉加拿大电池研密度的新一代电池",
        //   imgUrl: "../../assets/img/document.jpg",
        //   isShowPicInfo: false,
        // },
        // {
        //   title: "上汽大众ID.4信息",
        //   detail: "盖世汽车讯据外媒拉加拿大电池研密度的新一代电池",
        //   imgUrl: "../../assets/img/document.jpg",
        //   isShowPicInfo: false,
        // },
        // {
        //   title: "探访XPT蔚来科技",
        //   detail: "盖世汽车讯据外媒拉加拿大电池研密度的新一代电池",
        //   imgUrl: "../../assets/img/document.jpg",
        //   isShowPicInfo: false,
        // },
        // {
        //   title: "科学家从原子层研究",
        //   detail: "盖世汽车讯据外媒拉加拿大电池研密度的新一代电池",
        //   imgUrl: "../../assets/img/document.jpg",
        //   isShowPicInfo: false,
        // },
        // {
        //   title: "CAICV联盟发布,智网",
        //   detail: "盖世汽车讯据外媒拉加拿大电池研密度的新一代电池",
        //   imgUrl: "../../assets/img/document.jpg",
        //   isShowPicInfo: false,
        // },
        // {
        //   title: "CAICV联盟发布,智网",
        //   detail: "盖世汽车讯据外媒拉加拿大电池研密度的新一代电池",
        //   imgUrl: "../../assets/img/document.jpg",
        //   isShowPicInfo: false,
        // },
      ],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getHotKnoList();
    },

    getHotKnoList() {
      getHotKnoList({
        current: 1,
        size: 7
      }).then(res => {
        this.hotKnowlege = res.list;
        this.hotKnowlege.forEach(item => {
          this.$set(item, "isShowPicInfo", false);
          this.$set(item, "imgUrl", "../../assets/img/document.jpg");
        })
        if(this.hotKnowlege.length>0) this.hotKnowlege[0].isShowPicInfo = true;
      }).catch(err => {
        this.$message.error(err.message);
      })
    },

    // 跳转热点知识列表页
    goHotKno() {
      // this.$router.push({
      //   path: "/hotKno"
      // });
      let routeUrl = this.$router.resolve({
        path: "/hotKno"
      });
      window.open(routeUrl.href, '_blank');
    },

    //跳转知识页面
    goKnow(url) {
      window.open(url);
      // window.location.href = url;
    },

    // 热点知识鼠标上移显示待图片的信息
    showHotKnowlegeItemWithImg(index) {
      const newHotKnowlege = this.hotKnowlege.map((item, itemIndex) => {
        item.isShowPicInfo = itemIndex === index;
        return item;
      });
      this.hotKnowlege = newHotKnowlege;
    },
  },
};
</script>