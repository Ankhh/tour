// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUi from 'element-ui'
import Http from './axios/http'
import moment from 'moment'
import MyBread from '@/components/myBread.vue'

import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/index.css'
// 引入mockjs
// require('./mock/mock.js')

Vue.filter('fmtDate', (v) => {
  return moment(v).format('YYYY-MM-DD')
})

Vue.config.productionTip = false
Vue.use(ElementUi)
Vue.use(Http)
Vue.component(MyBread.name, MyBread)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
