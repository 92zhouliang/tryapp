<template>
  <div id='login'>
    <mt-header title="登陆">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
    </mt-header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="loginForPwd">密码登陆</mt-tab-item>
      <mt-tab-item id="loginForCode">验证码登陆</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="loginForPwd">
        <div class="from-user">
          <div class="cell-list">
            <div class="cell-item">
              <div class="left">
                <span>账号</span>
              </div>
              <div class="right">
                <input v-validate.initial="'required'" type="text" name="username" v-model="loginForm.username" placeholder="请输入用户名或手机号码">
              </div>
              <i class="clear" style="" v-show="loginForm.username.length>0" @click="loginForm.username=''"></i>
            </div>
            <div class="cell-item">
              <div class="left">
                <span>密码</span>
              </div>
              <div class="right">
                <input v-validate.initial="'required'" name="password" @keyup.enter="Login" :type="loginForm.passwordFormType" v-model="loginForm.password"
                  placeholder="请输入密码">
              </div>
              <i class="clear" v-show="loginForm.password.length>0" @click="loginForm.password=''" style="right: 40px;"></i>
              <i :class="['eye-icon', loginForm.passwordFormType=='password'?'eye-close-icon':'']" style="position: absolute;right: 10px;"
                @click="loginForm.passwordFormType=loginForm.passwordFormType=='password'?'text':'password'"></i>
            </div>
          </div>
          <div :class="['cell-btn',errors.has('username')||errors.has('password')?'disabled-btn':'']" @click="()=>{errors.has('username')||errors.has('password')?false:login('forPassword')}">登录</div>
          <div class="other-link">
            <!-- <span @click="()=>visiblePopup.registered=true">手机快速注册</span> -->
            <span @click="()=>selected='loginForCode'">忘记密码</span>
          </div>
        </div>
        <!-- <div class="mint-tabbar is-fixed">协议</div> -->
      </mt-tab-container-item>
      <mt-tab-container-item id="loginForCode">
        <mt-field label="手机号" placeholder="请输入手机号" v-validate.initial="'required'" type="tel" name='registeredPhone' v-model="registeredForm.phone"></mt-field>
        <mt-field label="验证码" placeholder="请输入验证码" v-model="registeredForm.code" name='registeredCode'>
          <mt-button size="small" :class="[registeredForm.resetSendPhoneMessage>0?'disabled-btn':'']" :disabled="registeredForm.resetSendPhoneMessage>0"
            type="primary" @click.native="registeredSendPhoneMessage">{{registeredForm.resetSendPhoneMessage ? `(${registeredForm.resetSendPhoneMessage})s后重新获取` : '获取验证码'}}</mt-button>
        </mt-field>
        <mt-button type="primary" size='large' style="margin-top:30px" @click.native="login('forCode')">登陆</mt-button>
        <!-- <div class="mint-tabbar is-fixed">协议</div> -->
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-popup v-model="visiblePopup.forgetResetPassword" :closeOnClickModal="true" :modal="false" position="right" class="modal-popup">
      <mt-header title="设置密码">
        <mt-button icon="back" slot="left" @click="()=>visiblePopup.forgetResetPassword=false"></mt-button>
      </mt-header>

      <div class="from-user">
        <div class="cell-list">
          <div class="cell-item">
            <div class="left">
              <span>输入新密码</span>
            </div>
            <div class="right">
              <input v-validate.initial="'required'" name="forgetFormPassword" :type="forgetForm.passwordFormType" v-model="forgetForm.password"
                placeholder="请输入新的密码，位数6-12位">
            </div>
            <i class="clear" v-show="forgetForm.password.length>0" @click="forgetForm.password=''" style="right: 40px;"></i>
            <i :class="['eye-icon', forgetForm.passwordFormType=='password'?'eye-close-icon':'']" style="position: absolute;right: 10px;"
              @click="forgetForm.passwordFormType=forgetForm.passwordFormType=='password'?'text':'password'"></i>
          </div>
          <div class="cell-item">
            <div class="left">
              <span>确认新密码</span>
            </div>
            <div class="right">
              <input v-validate.initial="'required'" name="forgetFormConfirmPassword" :type="forgetForm.confirmPasswordFormType" v-model="forgetForm.confirmPassword"
                placeholder="请输入确认密码">
            </div>
            <i class="clear" v-show="forgetForm.confirmPassword.length>0" @click="forgetForm.confirmPassword=''" style="right: 40px;"></i>
            <i :class="['eye-icon', forgetForm.confirmPasswordFormType=='password'?'eye-close-icon':'']" style="position: absolute;right: 10px;"
              @click="forgetForm.confirmPasswordFormType=forgetForm.confirmPasswordFormType=='password'?'text':'password'"></i>
          </div>
        </div>
        <div :class="['cell-btn',(!errors.has('forgetFormPassword')&&!errors.has('forgetFormConfirmPassword'))&&forgetForm.password === forgetForm.confirmPassword?'':'disabled-btn']"
          @click="setPassword()">确认</div>
      </div>
    </mt-popup>

  </div>
</template>

<style lang="scss" scoped>
  @import './../../assets/css/theme.scss'; //眼睛
  .eye-icon {
    display: block;
    width: 25px;
    height: 25px;
    background: url('./../../assets/images/eye.png') no-repeat;
    background-size: 100% 100%;
    &.eye-close-icon {
      background: url('./../../assets/images/eye-close.png') no-repeat;
      background-size: 100% 100%;
    }
  }

  .clear {
    width: 16px;
    height: 16px;
    margin: 0;
    position: absolute;
    right: 10px;
    @include bg('./../../assets/images/close.png');
  }

  .from-user {
    padding: $padding;
    background: #fff;
    .cell-list {
      .cell-item {
        @include flexbox(flex-start,
        center,
        row,
        nowrap);
        border-bottom: 1px solid #eee;
        padding: $padding $padding $padding 0;
        margin: $margin 0;
        position: relative;
        .left {
          span {
            font-size: $title;
            color: #333;
          }
        }
        .right {
          width: 70%;
          margin-left: 20px;
          @include placeholderColor($gray);
          input {
            width: 100%;
            border: none;
            outline: none;
            box-shadow: none;
            text-shadow: none;
            text-align: left;
            font-size: $title;
            color: #333;
          } // .arrow-right {
          //   display: block;
          //   width: 16px;
          //   height: 20px;
          //   background: url('~jd/images/arrow-right.png') no-repeat;
          //   background-size: 100%;
          // }
        }
      }
    }
    .other-link {
      @include flexbox(space-between,
      center,
      row,
      nowrap);
      font-size: 15px;
      color: $gray;
      margin-top: $margin;
    }
  }

</style>
<script>
  import {
    getDeviceId
  } from './../../utils/jsTool'
  import md5 from "js-md5";
  import {
    getSessionStorage,
    setSessionStorage
  } from "./../../utils/jsTool.js";
  export default {
    data() {
      return {
        selected: 'loginForPwd',
        loginForm: {
          username: '',
          password: '',
          passwordFormType: 'password'
        },
        registeredForm: {
          phone: '',
          code: '',
          resetSendPhoneMessage: null,
          resetSendPhoneSign: 0
        },
        visiblePopup: {
          forgetResetPassword: false
        },
        forgetForm: {
          resetSendPhoneMessage: null,
          userName: null,
          password: '',
          passwordFormType: 'password',
          confirmPasswordFormType: 'password',
          confirmPassword: '',
          phone: '',
          code: ''
        }
      };
    },

    watch: {},

    components: {

    },

    computed: {},

    methods: {
      async registeredSendPhoneMessage() { //获取验证码
        this.$fetch('/api/user/sendVerificationCode', {
          tel: this.registeredForm.phone
        }).then((response) => {
          console.log(response);
        }).catch((err) => {
          debugger;
        })
        this.registeredForm.resetSendPhoneMessage = 60;
        let times = setInterval(() => {
          if (this.registeredForm.resetSendPhoneMessage <= 0) {
            this.registeredForm.resetSendPhoneMessage = 0;
            clearInterval(times);
          } else {
            this.registeredForm.resetSendPhoneMessage--;
          }
        }, 1000)
      },
      async login(type) { //登陆 
        if (type === 'forCode') {
          let Data = await this.$store.dispatch('Login', {
            tel: this.registeredForm.phone,
            imei: getDeviceId(),
            code: this.registeredForm.code,
          })
          console.log('登陆返回:' + JSON.stringify(Data))
          if (Data.code !== 1) return Toast({
            message: Data.msg,
            position: 'middle'
          })
          if (Data.hasPwd === 1) {
            this.$router.go(-1);
          } else {
            this.visiblePopup.forgetResetPassword = true;
          }

        } else if (type = 'forPassword') {
          let pwdData = await this.$store.dispatch('LoginForPassword', {
            tel: this.loginForm.username,
            imei: getDeviceId(),
            pwd: md5(this.loginForm.password)
          })
          console.log('登陆返回:' + JSON.stringify(pwdData))
          if (pwdData.code !== 1) return Toast({
            message: pwdData.msg,
            position: 'middle'
          })
          this.$router.push('home')
        }
        // this.$router.go(-1);
      },
      setPassword() { //设置密码 or 重置密码
        this.$fetch('/api/user/setPwd', {
          pwd: md5(this.forgetForm.password),
          token: getSessionStorage('MemberToken')
        }).then(res => {
          console.log(res)
          if (res.code === 1) {
            //   this.$store.dispatch('LoginForPassword', {
            //   tel: this.loginForm.username,
            //   imei: getDeviceId(),
            //   pwd: md5(this.loginForm.password)
            // })
            this.$router.push('home')
          } else {
            Toast({
              message: res.msg,
              position: 'middle'
            })
          }
        }).catch(err => {
          Toast({
            message: err.msg,
            position: 'middle'
          })
        })
      }
    },

    mounted: function () {

    }
  }

</script>

