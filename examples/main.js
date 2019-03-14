import Vue from 'vue'
import router from './router'
import App from './App.vue'
import 'iview/dist/styles/iview.css'
import '@/css/index.css'
import iView from 'iview'

import './markdown.css'
Vue.use(iView)
// import Vue from "vue"

import elementui from "element-ui"
Vue.use(elementui);
import 'element-ui/lib/theme-chalk/index.css';

import directives from "@/directives";
  Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key]);
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
