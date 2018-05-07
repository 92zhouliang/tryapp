<template>
  <div id="home">
    <div class="content">
      <div class="my-header">
        <!-- <div class="my-settings">
          <div>
            <i class="settings" @click="$router.push('/sttings')"></i>
            <i class="msg-icon"></i>
          </div>
        </div> -->
        <div class="userinfo" @click="$router.push(!userData.userInfo?'/login':'settings')">
          <div class="avatar">
            <img :src="!userData.userInfo? 'https://static.hdslb.com/images/akari.jpg' : userData.userInfo.headImg==''?'https://static.hdslb.com/images/akari.jpg':userData.userInfo.headImg" alt="">
          </div>
          <div class="info-box">
            <span class="username">{{!userData.userInfo?"登陆/注册 >":"用户名:"+(userData.userInfo.nickName==''?userData.userinfo.tel:userData.userInfo.nickName)}}</span>
            <div class="my-validWalletAmount" v-if="userData.userInfo">0</div>
          </div>
        </div>
      </div>
      <p class="order-header">贷款订单</p>
      <div class="my-order">
        <div class="order-item" @click="()=>{}">
          <img src="./../../assets/images/notcompete.png" alt="">
          <span>待完成订单</span>
        </div>
        <div class="order-item" @click="()=>{}">
          <img src="./../../assets/images/payment.png" alt="">
          <span>待还款订单</span>
        </div>
        <div class="order-item" @click="()=>{}">
          <img src="./../../assets/images/allorder.png" alt="">
          <span>全部订单</span>
        </div>
      </div>
      <div class="my-attention">
        <div class="attention-item">
          <img src="./../../assets/images/allorder.png" alt="">
          <span>订单</span>
        </div>
        <div class="attention-item">
          <img src="./../../assets/images/allorder.png" alt="">
          <span>订单</span>
        </div>
        <div class="attention-item">
          <img src="./../../assets/images/allorder.png" alt="">
          <span>订单</span>
        </div>
        <div class="attention-item">
          <img src="./../../assets/images/allorder.png" alt="">
          <span>订单</span>
        </div>
      </div>
      <!-- <div class="my-recommend">
        <div class="recommend-tip">
          <img src="" alt="">
        </div>
        <ul class="recommend-list">
          <li class="recommend-item">
            <div class="item-posre">
              <img src="" alt="">
            </div>
            <p class="item-product-text">位</p>
            <p class="item-product-info">
              <span>&yen;</span>
            </p>
            <p class="item-product-praise">好评率100%</p>
          </li>
        </ul>
      </div> -->
    </div>
    <footer-view/>
  </div>
</template>
<style lang="scss" scoped>
  @import './../../assets/css/mixin.scss';
  .order-header {
    padding: 10px;
    font-size: .9rem
  }

  .content {
    padding-bottom: 1.35rem;
    min-height: 100vh;
  }

  .my-header {
    // height: 3rem;
    padding: 10px 15px; // background: -webkit-linear-gradient(left, #eb3c3c, #ff7459);
    background: #26a2ff; // box-shadow: 0 2px 5px rgba(255, 98, 98, .4);
    position: relative; // &:after {
    //   content: '';
    //   position: absolute;
    //   bottom: -20px;
    //   left: 0px;
    //   width: 100%;
    //   background: -webkit-linear-gradient(left, #eb3c3c, #ff7459);
    //   background: linear-gradient(90deg, #eb3c3c, #ff7459);
    //   height: 1rem;
    //   border-radius: 50%;
    // }
    @include flexbox(flex-start, space-between, column, wrap);
    .my-settings {
      width: 100%;
      text-align: right;
      >div {
        @include flexbox(flex-end, center, row, nowrap);
        i {
          width: .65rem;
          height: .65rem;
        }
        .settings {
          display: block; // background: url('~jd/images/settings.png') no-repeat;
          // background-size: 100%; // background-position: -2.6rem 0!important;
        }
        .msg-icon {
          display: block;
          margin-left: 20px; // background: url('~jd/images/searchIcon.png') no-repeat;
          // background-size: 600% 100%;
          // background-position: -1.3rem 0 !important;
        }
      }
    }
    .userinfo {
      @include flexbox(flex-start,
      flex-start,
      row,
      nowrap);
      .avatar {
        img {
          border: 1px solid hsla(0, 0%, 100%, .4);
          border-radius: 60px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, .15);
          width: 60px;
          height: 60px;
        }
      }
      .info-box {
        @include flexbox(center,
        flex-start,
        column,
        wrap);
        flex: initial;
        padding: 0 15px;
        color: #fff;
        font-size: 16px;
        .my-validWalletAmount {
          margin: 5px 0;
        }
        .username {
          margin-top: 10px;
        }
      }
    }
  }

  .my-order {
    clear: both;
    background: #fff;
    padding: 15px 0 20px;
    @include flexbox(center,
    center,
    row,
    nowrap);
    .order-item {
      width: 33.3333%;
      @include flexbox(space-between,
      center,
      column,
      wrap);
      img {
        height: 35px;
      }
      span {
        margin: 10px 0 0;
        font-size: 13px;
        color: #333;
      }
      &.myorder {
        position: relative;
        border-left: 1px solid #eee;
        &:before {
          content: '';
          position: absolute;
          left: -2px;
          z-index: 999;
          top: calc(100%/2 - 10px);
          width: 0;
          height: 0;
          border: 8px solid transparent;
          border-left-color: #fff;
        }
        &:after {
          content: '';
          position: absolute;
          left: 0;
          top: calc(100%/2 - 10px);
          width: 0;
          height: 0;
          border: 8px solid transparent;
          border-left-color: #eee;
        }
      }
    }
  }

  .my-attention {
    clear: both;
    background: #fff;
    margin-top: 10px;
    padding: 10px 0;
    @include flexbox(center,
    center,
    row,
    nowrap);
    .attention-item {
      width: 25%;
      @include flexbox(space-between,
      center,
      column,
      wrap);
      img {
        // text-align: center;
        // font-size: 16px;
        // font-weight: normal;
        // background-image: -webkit-linear-gradient(left, rgb(255, 42, 0), rgb(255, 0, 175));
        // -webkit-background-clip: text;
        // -webkit-text-fill-color: transparent;
        height: 35px;
      }
      span {
        margin: 10px 0;
        font-size: 14px;
        color: #333;
        text-align: center;
      }
    }
  }

  /* 为您推荐 */

  .my-recommend {
    clear: both;
    margin-top: 10px;
    .recommend-tip {
      text-align: center;
      margin: 0 0 10px;
      img {
        height: 35px;
      }
    }
    .recommend-list {
      background: #fff;
      @include flexbox(flex-start,
      center,
      row,
      wrap);
      overflow: hidden;
      clear: both;
      .recommend-item {
        background: #fff;
        width: 4.935rem;
        margin-bottom: .15rem;
        .item-posre {
          img {
            max-height: 185px;
            width: 100%;
          }
        }
        .item-product-text {
          padding: .1rem 0 0 .1rem;
          font-size: 14px;
          @include textoverflow(2);
        }
        .item-product-info {
          color: #f23030;
          padding: .2rem .1rem;
          font-size: 16px;
          span {
            font-size: 12px;
            margin-right: .1rem;
          }
        }
        .item-product-praise {
          padding: 0 0 .2rem .1rem;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }

</style>
<script>
  import {
    getSessionStorage
  } from "./../../utils/jsTool.js";
  import footerView from "@/components/footer/footerView";
  export default {
    data() {
      return {
        userData: {
          userInfo: null
        },
        title: '账户信息'
      };
    },

    watch: {},

    components: {
      footerView
    },
computed:{
  hidUserName(){
    this.userInfo.tel.substr(0, 3) + '****' + this.userInfo.tel.substr(7)
  }
},
    methods: {
      async initData() {
        if (!this.userInfo) {
          let token =await getSessionStorage('MemberToken')
          if (!token) return;
          let res =await this.$store.dispatch('GetUserInfo', token);
          await this.$store.commit('SET_USERINFO_DATA',res.data)
          this.userData.userInfo = res.data;
        } else {
          this.userData.userInfo = this.userInfo
        }
      }
    },

    mounted: function () {
      this.initData();
    }
  }

</script>

