import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";import vuetify from './plugins/vuetify'
import VueMask from 'v-mask'
import VueApexCharts from 'vue-apexcharts'



const options = {
  position: "top-right",
  timeout: 2500,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: false,
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
  size:50
};

Vue.use(Toast, options);
Vue.use(VueApexCharts)
Vue.config.productionTip = false
Vue.use(VueMask);
Vue.component('apexchart', VueApexCharts)

Vue.prototype.$overlay = (value) => {
  store.commit("SET_OVERLAY", value)
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
