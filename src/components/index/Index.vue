<template>
  <div id='home'>
    <mt-header title="金服服">
      <router-link to="/sign" slot="left">
        <mt-button>签到</mt-button>
      </router-link>
      <router-link to="/location" slot="right">
        <mt-button>
          <i class="iconfont icon-dingwei"></i>{{defaultCity}}
        </mt-button>
      </router-link>
    </mt-header>
    <mt-cell title="标题文字" value="说明文字"></mt-cell>
    <mt-cell title="标题文字" value="说明文字"></mt-cell>
    <mt-cell title="标题文字" value="说明文字"></mt-cell>
    <mt-cell title="标题文字" value="说明文字"></mt-cell>
    <!-- <div id='' @click="$router.push('/test')">test:获取手机唯一标识测试</div> -->
    <footer-view/>
  </div>
</template>
<style lang="scss">


</style>
<script>
  import footerView from './../footer/footerView'
  import {
    getDefaultCity,
    setLocalStorage,
    getSessionStorage,
    getLocalStorage
  } from "./../../utils/jsTool.js";
  export default {
    name: "home",
    data() {
      return {
        // defaultCity:""
      }
    },
    mounted: function () {
      this.$store.dispatch('setCity')
    },
    watch: {
      // "$store.getters.defaultCity":(val,oldVal)=>{
      //   debugger;
      //   this.defaultCity=val
      // }
    },
    methods: {
      setCity() {
        this.$store.dispatch('setCity')
      }
    },
    computed: {
      defaultCity() {
        if (getLocalStorage("defaultCity")) {
          return getLocalStorage("defaultCity")
        } else {
          setLocalStorage('defaultCity',this.$store.getters.defaultCity)
          return this.$store.getters.defaultCity
        }
        // return this.$store.getters.defaultCity
      }
    },
    components: {
      footerView
    }
  }

</script>

