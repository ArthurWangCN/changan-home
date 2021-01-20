<template>
  <div class="home-personal-info">
    <div class="home-avatar" @click="goPersonal">
      <img
        :src="
          userdata && userdata.profilePicture
            ? userdata.profilePicture
            : defaultAvatar
        "
        alt=""
      />
      <div class="level">LV.35</div>
    </div>
    <div class="nickname" @click="goPersonal">{{ userdata.userName }}</div>
    <div class="level-cards">
      <div v-for="(item, index) in leveldata" class="card-item">
        <img :src="item.image" alt="" />
        <span>{{ item.number }}</span>
      </div>
    </div>
    <div class="information">
      <div class="info-left">
        <div class="info-item">
          <svg class="iconfont fonts14" aria-hidden="true">
            <use xlink:href="#iconnews" />
          </svg>
          消息{{ userdata.messageNum }}
        </div>
        <div class="info-item">
          <svg class="iconfont fonts14" aria-hidden="true">
            <use xlink:href="#iconwait" />
          </svg>
          待办{{ userdata.todo }}
        </div>
      </div>
      <div class="info-left">
        <div class="info-item">
          <svg class="iconfont fonts15" aria-hidden="true">
            <use xlink:href="#iconupload1" />
          </svg>
          上传{{ userdata.uploadNum }}
        </div>
        <div class="info-item">
          <svg class="iconfont fonts15" aria-hidden="true">
            <use xlink:href="#iconcircle2" />
          </svg>
          圈子{{ userdata.circleNum }}
        </div>
      </div>
      <div class="info-left">
        <div class="info-item">
          <svg class="iconfont fonts15" aria-hidden="true">
            <use xlink:href="#iconcollection2" />
          </svg>
          收藏{{ userdata.collectionNum }}
        </div>
        <div class="info-item">
          <svg class="iconfont fonts14" aria-hidden="true">
            <use xlink:href="#iconsubscribe2" />
          </svg>
          订阅{{ userdata.subscribeNum }}
        </div>
      </div>
      <div class="info-line"></div>
      <div class="info-left">
        <div class="info-item">
          <svg class="iconfont fonts14" aria-hidden="true">
            <use xlink:href="#iconstandard" />
          </svg>
          论文{{ userdata.paperNum }}
        </div>
        <div class="info-item">
          <svg class="iconfont fonts14" aria-hidden="true">
            <use xlink:href="#iconfile" />
          </svg>
          文件{{ userdata.fileNum }}
        </div>
      </div>
      <div class="info-left">
        <div class="info-item">
          <svg class="iconfont fonts14" aria-hidden="true">
            <use xlink:href="#iconpaper" />
          </svg>
          标准{{ userdata.standardNum }}
        </div>
        <div class="info-item" style="cursor: pointer" @click="goPersonal">
          <svg class="iconfont fonts14" aria-hidden="true">
            <use xlink:href="#iconmore" />
          </svg>
          更多
        </div>
      </div>
    </div>
    <button class="upload-knowlege" @click="goUpload">
      <svg class="iconfont iconUparrow" aria-hidden="true">
        <use xlink:href="#iconUparrow" />
      </svg>
      上传知识
    </button>
  </div>
</template>
<script>
import { publiceUrl } from "@/utils/index.js";
import { getUserInfo } from "../api/interface/home";

export default {
  data() {
    return {
      leveldata: [
        {
          image: require("../assets/img/medal/medal_discuss_1.png"),
          number: 1,
        },
        {
          image: require("../assets/img/medal/medal_write_1.png"),
          number: 2,
        },
        {
          image: require("../assets/img/medal/medal_curious_1.png"),
          number: 5,
        },
        {
          image: require("../assets/img/medal/medal_study_1.png"),
          number: 3,
        },
        {
          image: require("../assets/img/medal/medal_discovery_1.png"),
          number: 1,
        },
      ],
      userdata: {},
      defaultAvatar: require("../assets/img/home-avatar.png"),
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      getUserInfo({})
        .then((json) => {
          if (json.success) {
            const data = json.content;
            if (data != "") {
              this.userdata = data;
            }
          } else {
            this.$message.error(json.message);
          }
        })
        .catch((json) => {
          this.$message.error(json.message);
        });
    },

    //跳转个人中心
    goPersonal() {
      window.open(publiceUrl + "/pmc/#/home");
    },

    //跳转上传知识
    goUpload() {
      window.open(publiceUrl + "/pmc/#/knowledge");
    },
  },
};
</script>