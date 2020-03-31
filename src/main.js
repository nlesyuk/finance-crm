import Vue from 'vue'; // from node_modules
import Vuelidate from 'vuelidate'; // from node_modules
import App from './App.vue';
import dateFilter from '@/filters/date.filter'
import router from './router';
import store from './store';
import messagePlugin from '@/utils/message.plugin'
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min'; // from node_modules


Vue.config.productionTip = false;

Vue.filter('dateFilter', dateFilter)

Vue.use(messagePlugin)
Vue.use(Vuelidate)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
