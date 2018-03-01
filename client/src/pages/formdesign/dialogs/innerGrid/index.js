
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import App from '@/formdesign/dialogs/innerGrid/innerGrid.vue';
import $ from 'jquery';
import elementui from 'element-ui';
import store from '@/store';
import 'element-ui/packages/theme-chalk/lib/index.css';

Vue.config.productionTip = false;
Vue.use(elementui);
/* eslint-disable no-new */
window.vue = new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
});
