import Vue from 'vue'
import Vuex from 'vuex'
import home  from "./modules/home";
import user from "./modules/users";
import getters from "./getter";
Vue.use(Vuex)
const store=new Vuex.Store({
    modules:{
        home,
        user
    },
    getters
})
export default store