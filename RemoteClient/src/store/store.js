import Vue from 'vue';
import Vuex from 'vuex';
import username from './modules/username';
import password from "./modules/password";
import notification from "./modules/notification";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    username,
    password,
    notification
  }
});


