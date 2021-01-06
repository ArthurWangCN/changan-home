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
    path: '/notice',     // 通知公告 更多
    name: 'notice',
    component: () => import(
      /* webpackChunkName: "more" */ '@/views/more/Notice.vue'
    )
  },

  {
    path: '/manage/home',     // 后台管理 —— 首页设置
    name: 'manage',
    component: () => import(
      /* webpackChunkName: "manage" */ '@/views/manage/ManageHome.vue'
    )
  },
  {
    path: '/manage/suggestion',   // 后台管理 —— 反馈建议管理
    name: 'suggestion',
    component: () => import(
      /* webpackChunkName: "manage" */ '@/views/manage/suggestion/Suggestion.vue'
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
