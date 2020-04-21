import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'highlight.js/styles/color-brewer.css'
import demoBox from './components/demo-box.vue'
import allComp from '../packages/index'
import './css/index.css'

Vue.component('demo-box', demoBox);
Vue.config.productionTip = false
Vue.use(allComp)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
