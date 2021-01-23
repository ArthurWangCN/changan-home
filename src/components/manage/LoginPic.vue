<template>
  <div class="login-pic-wrapper">
    <div style="text-align:right;">
      <span class="manage-home-btn" @click="addBackground">保存</span>
    </div>

    <div class="login-box" v-loading="isLoading">
      <div
        class="login-l"
        :style="{'background': `url(${loginPicUrl}) no-repeat 50%`, 'backgroundSize':'cover'}"
      >
        <img class="login-words" src="../../assets/img/login-words.png" alt="">
        <el-upload
            :action="actionUrl"
            ref="loginPicUpload"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-success="onUploadSucc"
            :on-change="handleChangePic"
            class="banner-upload"
          >
            <el-button type="warning" class="upload-btn">上传新图片</el-button>
          </el-upload>
      </div>
      <div class="login-r"></div>
    </div>
  </div>
</template>

<script>
import {
  getBackground,
  addBackground
} from '@/api/interface/manage';
export default {
  name: 'loginPic',
  data() {
    return {
      isLoading: false,
      // loginPicUrl: require('../../assets/img/login_bg.png'),
      loginPicUrl: '',
      actionUrl: '/home/file/upload',
    }
  },
  created() {
    this.init();
    if (process.env.NODE_ENV === 'development') {
      this.actionUrl = '/file/upload';
    }
  },
  methods: {
    init() {
      this.getBackground();
    },

    // 获取登录页图片
    getBackground() {
      this.isLoading = true;
      getBackground()
      .then(res => {
        if (res.success) {
          this.loginPicUrl = res.content.backgroundImgUrl;
        } else {
          this.$message.error(res.message);
        }
      }).catch(err => {
        this.$message.error(err.message);
      }).finally(_ => {
        this.isLoading = false;
      })
    },

    // 登录页图片保存
    addBackground() {
      addBackground({
        backgroundImgUrl: this.loginPicUrl
      }).then(res => {
        if (res.success) {
          this.$message.success('保存成功!');
        } else {
          this.$message.error(res.message);
        }
      })
      .catch(err => {
        this.$message.error(err.message);
      }).finally(_ => {
      })
    },

    // 上传
    beforeUpload(file) {
      const isLt500M = file.size / 1024 / 1024 <= 4;
      if (!isLt500M) {
        this.$message.warning('图片大小4M以内');
        return false;
      }
    },
    handleChangePic(file,fileList){
      if (fileList.length > 1) {
        fileList.splice(0, 1);
      }
    },
    onUploadSucc(res, file, fileList) {
      // this.fileList = fileList;
      this.loginPicUrl = res.message;
    },
  }
}
</script>

<style scoped>
.login-pic-wrapper{
  padding-top: 20px;
  min-width: 1300px;
}

.login-box {
  margin-top: 10px;
  width: 100%;
  height: 84vh;
  display: flex;
  align-items: center;
}
.login-l {
  width: 65%;
  height: 100%;
  position: relative;
  /* background: url(../../assets/img/login_bg.png) no-repeat 50%; */
  background-size: cover;
}
.login-r {
  width: 35%;
  height: 100%;
  background: url(../../assets/img/login-r.png) no-repeat 50%;
  background-size: cover;
}

.login-words {
  position: absolute;
  top: 80px;
  width: 70%;
  left: 50%;
  transform: translateX(-50%);
}
.upload-btn {
  position: absolute;
  right: 20px;
  top: 20px;
  width: 160px;
}
</style>
