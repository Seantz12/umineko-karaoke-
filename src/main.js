import Vue from 'vue'
import App from './App.vue'
import VueRecord from '@codekraft-studio/vue-record'

Vue.config.productionTip = false;
Vue.use(VueRecord);

new Vue({
  render: h => h(App),
}).$mount('#app')
