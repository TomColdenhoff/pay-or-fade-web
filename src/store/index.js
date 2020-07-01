import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    userId: localStorage.getItem("userId") || ""
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, userData) {
      state.status = "success";
      state.token = userData.token;
      state.userId = userData.userId;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    }
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "https://localhost:5001/api/user/login",
          data: user,
          method: "POST"
        })
          .then(resp => {
            const token = `Bearer ${resp.data.token}`;
            const userId = resp.data.userId;
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            axios.defaults.headers.common["Authorization"] = token;
            console.log(token);
            commit("auth_success", { token, userId });
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit("logout");
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    userId: state => state.userId
  },
  modules: {}
});
