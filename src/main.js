// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import 'vuetify/dist/vuetify.min.css'
import { store } from './store'
import DateFilter from './filters/date'
import AlertCmp from './components/Shared/Alert.vue'


Vue.use(Vuetify)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
  	firebase.initializeApp({
		apiKey: 'AIzaSyDCGkglp7SNUD69OBDe7hEyRpTzPWmhpNk',
		authDomain: 'fotos-488ce.firebaseapp.com',
		databaseURL: 'https://fotos-488ce.firebaseio.com',
		projectId: 'fotos-488ce',
		storageBucket: 'gs://fotos-488ce.appspot.com',
  	})
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMeetups')
  }
  // components: { App },
  // template: '<App/>'
})


