<template>
  <div id='settings'>
    <mt-header title="账户信息">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <mt-cell title="头像" style="margin:3px 0">
      <img :src="!userInfo? 'https://static.hdslb.com/images/akari.jpg' : userInfo.headImg==''?'https://static.hdslb.com/images/akari.jpg':userInfo.headImg"
        style="width:60px;height:60px" alt="" @click="()=>{}">
    </mt-cell>
    <mt-cell title="昵称" is-link style="margin:3px 0" @click.native="()=>visiblePopup.nameTabVisible=true">
      <span>{{userName}}</span>
    </mt-cell>
    <mt-cell title="手机号" style="margin:3px 0">
      <span>{{hidTel}}</span>
    </mt-cell>
    <h2>基本信息</h2>
    <mt-cell title="信用卡申请信息" to="/basicInfo" is-link>
    </mt-cell>
    <mt-button type="danger" size="large" @click="loginOut()">退出登录</mt-button>
    <mt-popup v-model="visiblePopup.nameTabVisible" :closeOnClickModal="true" :modal="false" position="right" class="modal-popup">
      <mt-header title="修改昵称">
        <mt-button icon="back" slot="left" @click="()=>visiblePopup.nameTabVisible=false"></mt-button>
        <mt-button slot="right" @click="SaveNickName()">保存</mt-button>
      </mt-header>
      <mt-field placeholder="昵称" v-model="userInfo.nickName" style="margin:3px 0"></mt-field>
      <p>4-16个字符</p>
    </mt-popup>
  </div>

</template>
<style lang="sass" scoped>


</style>
<script>
  import {
    setSessionStorage,
    getSessionStorage
  } from "./../../utils/jsTool.js";
  export default {
    name: 'settings',
    data() {
      return {
        Token: '',
        userInfo: null,
        visiblePopup: {
          nameTabVisible: false,
        }

      };
    },
    computed: {
      hidTel() {
        return this.userInfo.tel.substr(0, 3) + '****' + this.userInfo.tel.substr(7)
      },
      userName() {
        return this.userInfo.nickName != '' ? this.userInfo.nickName : '添加'
      }
    },
    methods: {
      //退出
      async loginOut() {
        await this.$store.dispatch('LogOut');
        this.$router.push('/login')
      },
      async getUserInfo() {
        if (!this.userInfo) {
          let token = await getSessionStorage('MemberToken')
          if (!token) return;
          this.Token = token;
          let res = await this.$store.dispatch('GetUserInfo', token);
          this.userInfo = res.data;
        } else {
          this.userInfo = this.userInfo
        }
      },
      async SaveNickName() {
        await this.$fetch('/api/user/setNickName', {
          token: this.Token,
          nickName: this.userInfo.nickName
        }).then(res => {
          debugger;
          this.visiblePopup.nameTabVisible = false;
        }).catch(err => {
          //异常
          console.log(err);
        })
      }
    },
    mounted: function () {
      this.getUserInfo()
    }
  }

</script>

