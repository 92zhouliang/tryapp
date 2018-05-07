import {
  getDefaultCity,
  setLocalStorage,
  getSessionStorage
} from "./../../utils/jsTool.js";
import { Toast } from "mint-ui";
const home = {
  state: {
    defaultCity: ""
  },
  mutations: {
    SETCITY(state, city) {
      state.defaultCity = city;
    }
  },
  actions: {
    setCity({ commit }) {
      getDefaultCity()
        .then(res => {
          commit("SETCITY", res);
        })
        .catch(err => {
          return err;
        });
      //   commit('SETCITY',{city})
    }
  }
};

export default home;
