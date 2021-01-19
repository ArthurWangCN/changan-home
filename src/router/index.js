import Vue from "vue";
import VueRouter from "vue-router";
import Home from '@/views/home/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '智谷研发知识平台'
    }
  },

  {
    path: '/notice',     // 更多 通知公告列表页
    name: 'notice',
    component: () => import(
      /* webpackChunkName: "more" */ '@/views/more/Notice.vue'
    ),
    meta: { title: '通知公告' }
  },
  {
    path: '/hotKno',     // 更多 热点知识
    name: 'hotKno',
    component: () => import(
      /* webpackChunkName: "more" */ '@/views/more/HotKno.vue'
    ),
    meta: { title: '热点知识' }
  },
  {
    path: '/recommendKno',     // 更多 推荐知识
    name: 'recommendKno',
    component: () => import(
      /* webpackChunkName: "more" */ '@/views/more/HotKno.vue'
    ),
    meta: { title: '推荐知识' }
  },
  {
    path: '/colleague',     // 搜同事
    name: 'colleague',
    component: () => import(
      /* webpackChunkName: "more" */ '@/views/more/Colleague.vue'
    ),
    meta: { title: '搜同事' }
  },
  {
    path: '/notice/detail/:id',     // 更多 通知公告详情页
    name: 'noticeDetail',
    component: () => import(
      /* webpackChunkName: "more" */ '@/views/more/NoticeDetail.vue'
    ),
    meta: { title: '通知公告' }
  },
  {
    path: '/feedback',     // 反馈建议
    name: 'feedback',
    component: () => import(
      /* webpackChunkName: "more" */ '@/views/more/Feedback.vue'
    ),
    meta: { title: '反馈建议' }
  },

  {
    path: '/manage/home',     // 后台管理 —— 首页设置
    name: 'manage',
    component: () => import(
      /* webpackChunkName: "manage" */ '@/views/manage/home/ManageHome.vue'
    ),
    meta: {
      title: '后台管理'
    }
  },
  {
    path: '/manage/opinion',   // 后台管理 —— 反馈建议管理
    name: 'opinion',
    component: () => import(
      /* webpackChunkName: "manage" */ '@/views/manage/opinion/Opinion.vue'
    ),
    meta: {
      title: '后台管理'
    }
  },
  {
    path: '/manage/demand',     //后台管理 —— 用户需求管理
    name: 'demand',
    component: () => import(
      /* webpackChunkName: "manage" */ '@/views/manage/demand/UserDemand.vue'
    ),
    meta: {
      title: '后台管理'
    }
  }
];

const router = new VueRouter({
  routes
});

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default router;
