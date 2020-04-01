import Vue from 'vue'; // from node_modules
import Vuelidate from 'vuelidate'; // from node_modules
import App from './App.vue';
import dateFilter from '@/filters/date.filter'
import router from './router';
import store from './store';
import messagePlugin from '@/utils/message.plugin'
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min'; // from node_modules

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false;

Vue.filter('dateFilter', dateFilter)

Vue.use(messagePlugin)
Vue.use(Vuelidate)


const firebaseConfig = {
  apiKey: "AIzaSyDJWjn5rgRsfM6Fhjz4wJnBRtMZfjol1t8U",
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

