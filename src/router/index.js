import Vue from "vue";
import VueRouter from "vue-router";
import Home from '@/views/home/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },

  {
    path: '/notice',     // 更多 通知公告列表页
    name: 'notice',
    component: () => import(
      /* webpackChunkName: "more" */ '@/views/more/Notice.vue'
    )
  },
  {
    path: '/notice/detail/:id',     // 更多 通知公告详情页
    name: 'noticeDetail',
    component: () => import(
      /* webpackChunkName: "more" */ '@/views/more/NoticeDetail.vue'
    )
  },
  {
    path: '/feedback',     // 反馈建议
    name: 'feedback',
    component: () => import(
      /* webpackChunkName: "more" */ '@/views/more/Feedback.vue'
    )
  },

  {
    path: '/manage/home',     // 后台管理 —— 首页设置
    name: 'manage',
    component: () => import(
      /* webpackChunkName: "manage" */ '@/views/manage/home/ManageHome.vue'
    )
  },
  {
    path: '/manage/opinion',   // 后台管理 —— 反馈建议管理
    name: 'opinion',
    component: () => import(
      /* webpackChunkName: "manage" */ '@/views/manage/opinion/Opinion.vue'
    )
  },
  {
    path: '/manage/demand',     //后台管理 —— 用户需求管理
    name: 'demand',
    component: () => import(
      /* webpackChunkName: "manage" */ '@/views/manage/demand/UserDemand.vue'
    )
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
