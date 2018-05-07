<template>
  <div id="forum">
    <mt-cell title="标题文字" value="说明文字"></mt-cell>
    <footer-view/>
  </div>
</template>
<style lang="scss" scoped>

</style>
<script>
import footerView from './../footer/footerView'
export default {
  data() {
      return {
        title:'forum'
      };
    },

    watch: {},

    components: {footerView},

    computed: {},

    methods: {
      
    },

    mounted: function () {
      
    }
}
</script>
