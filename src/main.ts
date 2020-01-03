// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import {postRequest,getRequest,fileRequest} from './newHttp/http';

import mountForm from './components/validatorForm/mountForm'
import alert from './components/alert/mountAlert';
Vue.use(mountForm)

Vue.config.productionTip = false;

// 扩展 Vue属性例子
declare module "vue/types/vue" {
  interface Vue {
    $message: any;
    $postRequest: any,
    $getRequest: any,
    $fileRequest: any,
    $Toast: any;
  }
}
Vue.prototype.$postRequest = postRequest;
Vue.prototype.$postRequest = postRequest;
Vue.prototype.$getRequest = getRequest;
Vue.prototype.$fileRequest = fileRequest;
Vue.prototype.$Toast = alert

/* eslint-disable no-new */
// tslint:disable-next-line:no-unused-expression
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
