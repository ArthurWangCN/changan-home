import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/style.css';
import './assets/iconfont.js';

import Nothing from "@/components/nothing.vue";

Vue.use(Element);
Vue.use(Nothing);

Vue.component('nothing', Nothing);


// import VueGridLayout from "vue-grid-layout";

router.beforeEach((to, from, next) => {
  /* 路由发生变化的时候修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  component: {
    Nothing
  },
  render: h => h(App)
}).$mount("#app");
