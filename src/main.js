import Vue from "vue";
import router from "./router.js";
import store from "./store/index.js";
import app from "./app.vue";

import axios from "axios";
import VueAxios from "vue-axios";

import Buefy from "buefy";
import "buefy/dist/buefy.css";

Vue.use(VueAxios, axios);
Vue.use(Buefy);

new Vue({
  el: "#vue",
  router,
  store,
  render: h => h(app)
});
