import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Bus from './plugins/bus';
import Emitter from './plugins/emitter';

Vue.use(Bus);
Vue.use(Emitter);

Vue.config.productionTip = false;


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
