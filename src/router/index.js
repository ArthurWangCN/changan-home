import Vue from "vue";
import VueRouter from "vue-router";
import Home from '@/views/home/Home.vue'
// const SpecialSearch = () => import('@/views/Special/specialsearch.vue');
import ManageHome from '@/views/manage/ManageHome.vue'
import Suggestion from '@/views/suggestion/Suggestion.vue'
import UserDemand from '@/views/demand/UserDemand.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/manage/home',     // 后台管理 —— 首页设置
    name: 'manage',
    component: ManageHome
  },
  {
    path: '/manage/suggestion',   // 后台管理 —— 反馈建议管理
    name: 'suggestion',
    component: Suggestion
  },
  {
    path: '/manage/demand',     //后台管理 —— 用户需求管理
    name: 'manage',
    component: UserDemand
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
