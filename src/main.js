import '@babel/polyfill'
import Vue from 'vue'
import firebase from 'firebase'
import firebaseui from 'firebaseui'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import {config} from './helpers/firebaseConfig'
import './registerServiceWorker'
import FullCalendar from 'vue-full-calendar'

Vue.use(FullCalendar)
Vue.config.productionTip = false

new Vue({
  router,
  created() {
    var db = firebase.initializeApp(config).database();
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.$router.push('/success')
      }
    });
  },
  store,
  render: h => h(App)
}).$mount('#app')

export { db };
