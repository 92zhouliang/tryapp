import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import Index from "@/components/index/Index";    //首页 
import Home from "@/components/users/Home";  //个人 
import Login from '@/components/users/Login'
import Forum from "@/components/index/Forum";      //论坛 
import Information from "@/components/index/Information";  //资讯
import CityList from "@/components/location/CityList"; //城市选择组件
import Sign from "@/components/common/sign";  //签到
import Setting from "@/components/users/Setting";
import BasicInfo from "@/components/users/BasicInfo"; //信用卡基本信息认证
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "",
      redirect: "/index"
    },
    {
      path:'/test',
      name:'test',
      component:HelloWorld
    },
    {
      path: "/index",
      name: "index",
      component: Index,
      meta: {}
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: {}
    },
    {
      path: "/forum",
      name: "forum",
      component: Forum,
      meta: {}
    },
    {
      path: "/information",
      name: "information",
      component: Information,
      meta: {}
    },
    {
      path: "/location",
      name: "location",
      component: CityList,
      meta: {}
    },
    {
      path:'/sign',
      name:'sign',
      component:Sign
    },{
      path: "/login",
      name: "login",
      component: Login,
      meta: {}
    },{
      path: "/settings",
      name: "settings",
      component: Setting,
      meta: {}
    },{
      path: "/basicInfo",
      name: "basicInfo",
      component: BasicInfo,
      meta: {}
    }
  ]
});
