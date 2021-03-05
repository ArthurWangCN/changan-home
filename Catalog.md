```bash
├─api
│  └─interface
├─assets
│  ├─css
│  └─img
│      └─medal
├─components
│  └─manage #后台管理首页设置一些组件
│  │   ├─FunctionModule.vue #首页组件设置——功能模块
│  │   ├─HomeBanner.vue #轮播图
│  │   ├─HomeLayout.vue #首页组件设置
│  │   ├─HomeNotice.vue #通知公告设置
│  │   ├─HotSetting.vue #热门圈子设置、专栏设置、热门话题设置
│  │   └─LoginPic.vue #登录页图片设置
│  ├─Banner.vue #轮播图组件
│  ├─Channel.vue #专业频道组件
│  ├─ChannelBannerUser.vue #专业频道、轮播图、用户信息组件 用于首页组件拖拽
│  ├─CirCleDialog.vue #话题无权限时加入圈子引导弹窗组件
│  ├─Column.vue #专栏组件
│  ├─HomeSearch.vue #首页搜索组件
│  ├─HotForum.vue #热门圈子组件
│  ├─HotKnowledge.vue #热点知识组件
│  ├─HotTag.vue #热门标签组件
│  ├─HotTopic.vue #热门话题组件
│  ├─Information.vue #技术资讯组件
│  ├─Knowledge.vue #知识组件
│  ├─Map.vue #知识地图组件
│  ├─notiong.vue #暂无数据组件
│  ├─Notice.vue #通知公告组件
│  ├─Personal.vue #个人信息组件
│  └─RecommendKnowledge #推荐知识组件
├─router
├─store
├─utils
│   ├─index.js #一些工具方法
│   └─quillEditor.js #富文本编辑器vue-quill-editor相关配置
└─views
    ├─home  #首页 Home.vue拖拽组件布局;  Home copy.vue 原始无拖拽布局
    ├─manage  #后台管理页面
    │  ├─demand #后台管理 —— 用户需求管理
    │  ├─home #后台管理 —— 首页设置
    │  └─opinion #后台管理 —— 意见建议管理
    └─more  #首页更多
        ├─Colleague.vue #搜同事
        ├─Feedback.vue #反馈建议
        ├─Information.vue #技术资讯
        ├─MoreKnowledge.vue #热点知识、推荐知识
        ├─MoreTopic.vue #热门话题列表页
        ├─Notice.vue #通知公告
        └─NoticeDetail.vue #通知公告详情页
```