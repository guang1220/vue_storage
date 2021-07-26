import Vue from 'vue'
import Router from 'vue-router'

import Login from "../view/Login";
import Accounts from "../view/Accounts";
import BirthInfo from "../view/BirthInfo";
import Setting from "../view/Setting";
import Sign from "../view/Sign";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      component: Login,

    },
    {
      path: '/accounts',
      name: "accounts",
      component: Accounts
    }, {
      path: '/birthInfo',
      name: "birthInfo",
      component: BirthInfo
    }, {
      path: '/setting',
      name: "setting",
      component: Setting
    },
    {
      path: '/sign',
      name: 'sign',
      component: Sign
    }
  ]
})
