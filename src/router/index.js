import Vue from "vue";
import VueRouter from "vue-router";
import Home from '@/views/home/Home.vue'
// const SpecialSearch = () => import('@/views/Special/specialsearch.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  
];

const router = new VueRouter({
  routes
});

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default router;
