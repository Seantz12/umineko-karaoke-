import Vue from 'vue'
import App from './App.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import VueProgressBar from 'vue-progressbar'
import VueRecord from '@codekraft-studio/vue-record'

const options = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'left',
  inverse: false
}


Vue.config.productionTip = false;
Vue.use(PulseLoader);
Vue.use(VueRecord);
Vue.use(VueProgressBar, options)

new Vue({
  render: h => h(App),
}).$mount('#app')
