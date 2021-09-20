import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

Vue.config.productionTip = false
Vue.http = Vue.prototype.$http = axios;
axios.defaults.baseURL = 'http://api.openweathermap.org/data/2.5';

// Import CSS Stylesheets
import "@/assets/css/main.css";


new Vue({
  render: h => h(App),
}).$mount('#app')
