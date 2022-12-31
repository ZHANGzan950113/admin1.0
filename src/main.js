import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import directive from './directive'

Vue.config.productionTip = false

// 引入路由守卫，监听页面权限
import './router/routerGuard'

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
// 引入icon
import './icons'


// Vue.directive('hasBtn', {
//   // 当被绑定的元素插入到 DOM 中时……
//   inserted: function (el) {
//     // 聚焦元素
//     // el.focus()
//     console.log('el=>',el)
//   }
// })

Vue.use(directive)


// 全局样式
  import '@/styles/index.scss'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
