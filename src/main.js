import "babel-polyfill";   //兼容IE系列
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import beforeRouter from './beforeRouter'
import globalApi from './api/axios'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
// import VueVideoPlayer from 'vue-video-player'
// Vue.use(VueVideoPlayer)
// Vue.use(VueVideoPlayer)


// console.log(ElementUI)

Vue.use(ElementUI)

Vue.config.productionTip = false

var app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
