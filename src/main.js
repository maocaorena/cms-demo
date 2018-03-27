import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import App from './App';
import store from './stores';
import router from './router';

import {Util} from '@/utils/util.js';
import {User} from '@/utils/user.js';
import {Storage} from '@/utils/storage.js';

import '@/assets/styles/css/init.css';
import '@/assets/styles/css/flex.css';
import '@/lib/iconfont/iconfont.css';

import wjcon from './components/wjcon';
Vue.use(wjcon);

Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.prototype.Util = Util;
Vue.prototype.User = User;
Vue.prototype.Storage = Storage;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
}).$mount('#app')
