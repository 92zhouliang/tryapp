<template>
  <div id='location' style="margin-top:40px;">
    <mt-header fixed title="城市选择">
      <router-link to="/index" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div>
      <p>当前选中城市：</p>
      <p v-text="checkedCity"></p>
    </div>
    <mt-index-list>
      <mt-index-section v-for="(city,index) in cityList" :key="index" :index="city.initial">
        <div v-for="(data,index) in city.list" :key="index" @click="selectCity(data)">
          <mt-cell :title="data.name"></mt-cell>
        </div>
      </mt-index-section>
    </mt-index-list>
  </div>
</template>
<style lang="scss" scoped>


</style>
<script>
import {
  setLocalStorage,
  getLocalStorage
} from "./../../utils/jsTool.js";
  import {
    cityList
  } from "./../../utils/cityIndex";
  export default {
    data() {
      return {
        checkedCity: getLocalStorage('defaultCity'),
        cityList: cityList
      };
    },

    watch: {},
    components: {},

    computed: {},

    methods: {
      selectCity(data) {
        this.checkedCity = data.name;
        setLocalStorage('defaultCity',data.name)
      }
    },

    mounted: function () {

    }
  }

</script>

