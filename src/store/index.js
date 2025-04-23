import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    url: '',
    datetimeNow: '',
    userDataState: {},
    baseurl: ''
  },
  mutations: {
    setCount(state, value) {
      state.count = value
    },
    setUrl(state, value) {
      state.url = value
    },
    setDatetimeNow(state, datetime) {
      state.datetimeNow = datetime
    },
    setUserData(state, value) {
      state.userDataState = value
    }
  },
  getters: {
    getCount(state) {
      return state.count
    },
    getUrl(state) {
      if (typeof window !== "undefined") {
        return state.url = window.location.protocol + "//" + window.location.hostname + "/";
      }
    },
    get_datetimeNow(state) {
      return state.datetimeNow;
    },
    get_userdata(state) {
      return state.userDataState;
    },
    canAccess: (state) => (deptcodecreate) => {
      return state.userDataState.DeptCode == deptcodecreate;
    },
    canAccessPurchase: (state) => (allowedDepts = []) => {
      return allowedDepts.includes(state.userDataState.DeptCode);
    }
    
  },
  actions: {
    getdata_datetimenow(context) {
      const url = context.getters.getUrl + 'intsys/purchaseplus/purchaseplus_backend/mainapi/getNowdate';
      axios.get(url).then(res => {
        context.commit('setDatetimeNow', res.data);
      });
    },
    getSessionStorage(context) {
      const getUserData = localStorage.getItem("userData");
      if (getUserData) {
        context.commit('setUserData', JSON.parse(getUserData));
      }
    },
    setDatetimeNow({ commit }) {
      const now = new Date().toLocaleString();
      commit('setDatetimeNow', now);
    }
  },
  modules: {}
});
