// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
import MintUI from 'mint-ui'
import 'babel-polyfill'
import FastClick from "fastclick";//处理移动端click事件300毫秒延迟
import VeeValidate from "vee-validate";
import 'mint-ui/lib/style.css'
import store from "./store/index";
import {fetch,post} from './utils/axios'

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
      FastClick.attach(document.body);
  }, false);

  document.addEventListener('plusready', function() {//解决返回键直接退出问题
    var webview = plus.webview.currentWebview();
    plus.key.addEventListener('backbutton', function() {
        webview.canBack(function(e) {
            if(e.canBack) {
                webview.back();             
            } else {
                webview.close(); //hide,quit
                plus.runtime.quit();
                
            }
        })
    });
});
}
Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(MintUI)
Vue.use(VeeValidate)
Vue.prototype.$fetch=fetch
Vue.prototype.$post=post
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
