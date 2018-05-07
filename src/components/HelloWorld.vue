<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          @click="getSign"
        >
          getSign
        </a>
      </li>
      <li>
        <a
          @click="getCentifcation"
        >
          getCentifcation
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
    </ul>
    <footer-view/>
  </div>
</template>

<script>
import footerView from './footer/footerView'
import {getDeviceId} from '../utils/jsTool.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    getSign:()=>{
    alert(getDeviceId());
    },
    printSign:(val)=>{
      alert(val)
    },
    getCentifcation(){
      this.$fetch('/api/user/sendVerificationCode',{tel:''}).then((response)=>{
        console.log(response);
      })
    }
  },
  components:{footerView}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
