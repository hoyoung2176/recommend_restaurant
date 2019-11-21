import Vue from 'vue'
import App from './App.vue'
import BootStrapVue from 'bootstrap-vue'
import router from './route'
import store from './store'
import VuePlaceAutocomplete from 'vue-place-autocomplete';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vuetify from './plugins/vuetify';
import VueSessionStorage from 'vue-sessionstorage'
import VueLazyload from 'vue-lazyload'
 


Vue.use(BootStrapVue)
Vue.use(VuePlaceAutocomplete);
Vue.config.productionTip = false

Vue.use(VueSessionStorage)
Vue.use(VueLazyload)



new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
