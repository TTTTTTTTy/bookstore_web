// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import {getRequest} from './utils/api'
import {postRequest} from './utils/api'
import {deleteRequest} from './utils/api'
import {putRequest} from './utils/api'

Vue.use(ElementUI)// 全局使用ElementUI

Vue.config.productionTip = false

Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;

router.beforeEach((to, from, next)=> {
    if (to.name === 'login' || to.name === 'register') { //登录和注册页面不需要检查登录状态
      next();
      return;
    }
    if (store.state.username === '') { //未登录
      if (to.meta.requireAuth || to.name == null) {
        next({path: '/', query: {redirect: to.path}}) //登录后重定向到此页面
      } else {
        next();
      }
    } else {
      next();
    }
  }
)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
