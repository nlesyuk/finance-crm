import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'
import router from './router'
import store from './store/store'
import tooltipDirective from '@/directives/tooltip.directive'
import messagePlugin from '@/utils/message.plugin'
import Paginate from 'vuejs-paginate'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'
import Loader from '@/components/app/Loader'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false;

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('dateFilter', dateFilter)
Vue.filter('currencyFilter', currencyFilter)
Vue.filter('localizeFilter', localizeFilter)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)
Vue.directive('tooltip', tooltipDirective)

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE,
  authDomain: "vue-fincrm-173a0.firebaseapp.com",
  databaseURL: "https://vue-fincrm-173a0.firebaseio.com",
  projectId: "vue-fincrm-173a0",
  storageBucket: "vue-fincrm-173a0.appspot.com",
  messagingSenderId: "253469932060",
  appId: "1:253469932060:web:17876bdfeb4fce7fb5bdd9",
  measurementId: "G-V9R237T0Y4"
};
firebase.initializeApp(firebaseConfig)

// firebase.auth().onAuthStateChanged(calback) ищет локальные данные пользователя для автоматической авторизации
// вызывается onAuthStateChanged нескольо раз во время сесии юзера (авториз, выход) поэтому нужно делать так
let app
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
})

