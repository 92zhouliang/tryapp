<!-- footer -->
<style lang='scss' scoped>
  .mint-tabbar {
    >.mint-tab-item {
      >.mint-tab-item-icon {
        >i {
          background: url('./../../assets/images/tabbar.png') 0 0 no-repeat;
          &.tabbar-home {
            background-position: -98px -54px;
          }
          &.tabbar-information {
            background-position: -54px -98px;
          }
          &.tabbar-forum {
            background-position: -54px -10px;
          }
          &.tabbar-account {
            background-position: -54px -54px;
          }
        }

      }
      &.is-selected {
        background-color: #eaeaea;
        color: red;
        >.mint-tab-item-icon {
          >i.tabbar-home {
            background-position: -98px -10px;
          }
          >i.tabbar-information {
            background-position: -10px -98px;
            ;
          }
          >i.tabbar-forum {
            background-position: -10px -10px;
          }
          >i.tabbar-account {
            background-position: -10px -54px;
          }
        }

      }
    }
  }

</style>



<template>
  <mt-tabbar v-model="selected" :fixed=true>
    <mt-tab-item id="index" @click="$router.push('/index')">
      <i slot="icon" class="tabbar-home" /> 首页
    </mt-tab-item>
    <mt-tab-item id="information" @click="$router.push('/information')">
      <i slot="icon" class="tabbar-information" />资讯
    </mt-tab-item>
    <mt-tab-item id="forum" @click="$router.push('/forum')">
      <i slot="icon" class="tabbar-forum" /> 论坛
    </mt-tab-item>
    <mt-tab-item id="home" @click="$router.push('/home')">
      <i slot="icon" class="tabbar-account" /> 账户
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
  export default {
    data() {
      return {
        selected: "index"
      };
    },

    watch: {
      selected: function (val, oldVal) {
        console.log(this.$router);
        let _this = this;
        if (val !== oldVal) {
          _this.$router.push(val);
        }
      }
    },

    components: {},

    computed: {

    },

    methods: {

    },

    mounted: function () {
      //footerTab依赖路由处理初始化
      const tabbarIndex = ["index", "information", "forum", "home"];
      const urlIndex = this.$route.name;
      if (tabbarIndex.includes(urlIndex, 0)) {
        return this.$data.selected = urlIndex;
      } else {
        return this.$data.selected = "index";
      }
    }
  }

</script>

