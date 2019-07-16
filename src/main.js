// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '@ionic/core/css/core.css'
import '@ionic/core/css/ionic.bundle.css'
import IonicVue from '@ionic/vue'
import firebase from 'firebase'


/**
 * Adds the cordova.js file when project is builded
 */
if (window.location.protocol === 'file:' || window.location.port === '3000') {
  var cordovaScript = document.createElement('script')
  cordovaScript.setAttribute('type', 'text/javascript')
  cordovaScript.setAttribute('src', 'cordova.js')
  document.body.appendChild(cordovaScript)
}
/**
 * Cordova plaform ready event fired
 */
document.addEventListener('deviceready', () => {
  console.log("device is ready");
  console.log(window, window.plugins, cordova, navigator)
})


Vue.use(IonicVue);

Vue.config.productionTip = false
/**
 * Updating the localstorage whenever store changes
 */
store.subscribe((mutation, state) => {
  console.log("state changes");
  localStorage.setItem('tasks', JSON.stringify(state));
})


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDNxAT2FCdKdL_JqtPlCccZB795T4CzdvI",
  authDomain: "taskmanager-481f0.firebaseapp.com",
  databaseURL: "https://taskmanager-481f0.firebaseio.com",
  projectId: "taskmanager-481f0",
  storageBucket: "taskmanager-481f0.appspot.com",
  messagingSenderId: "1065978663438",
  appId: "1:1065978663438:web:b9a609859aa3a423"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',

})
