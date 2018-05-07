// import Vue from 'vue'
import axios from "axios";
import { setSessionStorage,removeSessionStorage } from "./../../utils/jsTool";
import { fetch, post } from "./../../utils/axios";
// Vue.use(axios)
// Vue.prototype.$post
const user = {
  state: {
    userInfo: null //用户信息
  },
  mutations: {
    SET_USERINFO_DATA(state, userInfo) {
      state.userInfo = userInfo;
    }
  },
  actions: {
    Login(
      {
        //登录
        commit,
        state
      },
      parameterData
    ) {
      return fetch("/api/user/loginByCode", parameterData)
        .then(response => {
          console.log(response.data.token);
          setSessionStorage("MemberToken", response.data.token);
          return response;
        })
        .catch(err => {
          console.log(err);
        });
    },
    LoginForPassword(
      {
        //登录
        commit,
        state
      },
      parameterData
    ) {
      return fetch("/api/user/loginByPwd", parameterData)
        .then(response => {
          console.log(response.data.token);
          setSessionStorage("MemberToken", response.data.token);
          return response;
        })
        .catch(err => {
          console.log(err);
        });
    },
    GetUserInfo({ commit, state }, token) {
      return new Promise((resolve,reject)=>{
        fetch("/api/user/getUserInfo", { token })
        .then(res => {
          console.log("getUserInfo:" + res);
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err)
        });
      })
      
      // return commit("SET_USERINFO_DATA", userInfo);
    },
    LogOut({commit,state}){
      return new Promise((resolve, reject) => {
        removeSessionStorage('MemberToken');
        commit('SET_USERINFO_DATA',null)        
        resolve();
      })
    }
  }
};

export default user;
