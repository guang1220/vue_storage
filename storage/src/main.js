import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

import {Toast} from "vant";
router.beforeEach((to, from, next) => {
  if (to.path === '/login'||to.path==='/sign') {
    next();
  } else {
    if (window.sessionStorage.getItem("userId")) {
      next();
    } else {
      Toast.fail("您尚未登录，请登录")
      next('/login');
    }
  }
})
