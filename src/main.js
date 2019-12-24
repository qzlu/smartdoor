import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import("@/assets/css/reset.scss")
import '@/assets/css_font/iconfont.css'
import {post} from './request/http.js'
Vue.prototype.$post = post

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem('FToken')
  if(to.path !== '/login'&&!token){
    next({path:'/login'})
  }else{
    next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
