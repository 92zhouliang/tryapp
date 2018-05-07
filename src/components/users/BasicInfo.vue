<template>
  <div id="BasicInfo">
    <mt-header title="基本信息认证">
      <mt-button icon="back" slot="left" @click="$router.go(-1)"></mt-button>
      <mt-button slot="right" v-if="editable" @click="saveInfo()">保存</mt-button>
      <mt-button slot="right" v-else @click="()=>editable=true">编辑</mt-button>
    </mt-header>
    <h2>身份信息</h2>
    <mt-field label="姓名" placeholder="请输入用户名" :readonly="!editable" v-model="userBaseInfo.name"></mt-field>
    <mt-field label="身份证号码" placeholder="请输入身份证号码" :readonly="!editable" v-model="userBaseInfo.identityId"></mt-field>
    <h2>个人信息</h2>
    <mt-field label="教育程度" placeholder="请选择" :value=userBaseInfo.education :readonly=true @click.native="()=>{if(editable)popVisible.education=true}"></mt-field>
    <mt-field label="车辆信息" placeholder="请选择" :readonly=true :value="userBaseInfo.carInfo" @click.native="()=>{if(editable)popVisible.carInfoPop=true}"></mt-field>
    <mt-field label="最大还款额" placeholder="最大还款额" type="number" :readonly="!editable" v-model=userBaseInfo.maxAmount></mt-field>
    <h2>工作信息</h2>
    <mt-field label="职业类别" placeholder="请选择" :value="userBaseInfo.careerType" :readonly=true @click.native="()=>{if(editable)popVisible.careerType=true}"></mt-field>
    <mt-field label="收入" placeholder="收入" :readonly="!editable" v-model="userBaseInfo.income" type="number"></mt-field>
    <mt-field label="工作年限" placeholder="请输入工作年限" :readonly="!editable" v-model="userBaseInfo.year" type="number"></mt-field>
    <mt-field label="是否缴纳社保" placeholder="请选择" :value="userBaseInfo.socialSecurity" :readonly=true @click.native="()=>{if(editable)popVisible.socialSecurity=true}"></mt-field>
    <mt-popup v-model="popVisible.carInfoPop" position="bottom">
      <mt-picker :slots="slot" @change="onValuesChange" valueKey="val" id="carInfo"></mt-picker>
    </mt-popup>
    <mt-popup v-model="popVisible.careerType" position="bottom">
      <mt-picker :slots="careerType" @change="onValuesChange" valueKey="val" id="careerType"></mt-picker>
    </mt-popup>
    <mt-popup v-model="popVisible.education" position="bottom">
      <mt-picker :slots="education" @change="onValuesChange" valueKey="val" id="education"></mt-picker>
    </mt-popup>
    <mt-popup v-model="popVisible.socialSecurity" position="bottom">
      <mt-picker :slots="socialSecurity" @change="onValuesChange" valueKey="val" id="socialSecurity"></mt-picker>
    </mt-popup>

  </div>
</template>
<style lang="scss" scoped>
  .mint-cell {
    margin: 3px 0
  }

  .mint-popup-bottom {
    width: 100%;
  }

</style>
<script>
  import {
    getSessionStorage
  } from "./../../utils/jsTool.js";
  export default {
    data() {
      return {
        Token: getSessionStorage('MemberToken'),
        editable: false,
        popVisible: {
          carInfoPop: false,
          careerType: false,
          education: false,
          socialSecurity: false
        },
        // userBaseInfo:{
        //   educationText:'',
        // },
        userBaseInfo: {
          carInfo: '',
          careerType: '',
          education: '',
          identityId: '',
          income: '',
          maxAmount: '',
          name: '',
          socialSecurity: '',
          year: ''
        },
        slot: [{
          // flex: 1,
          values: [{
            "id": "1",
            val: "无车"
          }, {
            "id": "2",
            val: "有车无贷款"
          }, {
            "id": "3",
            val: "有车按揭"
          }, {
            "id": "4",
            val: "有车抵押"
          }, {
            "id": "5",
            val: "其他"
          }],
          visibleItemCount: 6,
          // className: 'slot1',
          // defaultIndex:this.userBaseInfo.carInfo!=''?thisuserBaseInfo.carInfo-1:0,
          textAlign: 'center'
        }],
        careerType: [{
          values: [{
            "id": "1",
            val: "企业主"
          }, {
            "id": "2",
            val: "个体工商户"
          }, {
            "id": "3",
            val: "上班人群"
          }, {
            "id": "4",
            val: "学生"
          }, {
            "id": "5",
            val: "无固定职业"
          }],
          visibleItemCount: 6,
          textAlign: 'center'
        }],
        education: [{
          values: [{
            "id": "1",
            val: "硕士及以上 "
          }, {
            "id": "2",
            val: "本科"
          }, {
            "id": "3",
            val: "大专"
          }, {
            "id": "4",
            val: "中专"
          }, {
            "id": "5",
            val: "高中及以下"
          }],
          visibleItemCount: 6,
          textAlign: 'center'
        }],
        socialSecurity: [{
          values: [{
            "id": "1",
            val: "缴纳 "
          }, {
            "id": "1",
            val: "未缴纳 "
          }],
          textAlign: 'center'
        }]
      };
    },

    watch: {},

    components: {},

    computed: {},

    methods: {
      async getInfo() { //获取设置信息
        await this.$post('api/info/getBaseInfo', {
          token: this.Token
        }).then(res => {
          this.userBaseInfo = {
            carInfo,
            careerType,
            education,
            identityId,
            income,
            maxAmount,
            name,
            socialSecurity,
            year,
          } = res;
        }).catch(err => {
          console.log(err);
        })
      },
      async saveInfo() {
        console.log(this.userBaseInfo)
        this.userBaseInfo.token = this.Token;
        this.$post('api/info/setBaseInfo', this.userBaseInfo).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err);
        });
        this.editable = false;
      },
      onValuesChange(picker, values) {
        // console.log(picker);
        // console.log(values);
        try {
          let selected = values[0].val;
          switch (picker.$el.id) {
            case "carInfo":
              this.userBaseInfo.carInfo = selected;
              // this.popVisible.carInfoPop = false;
              break;
            case "careerType":
              this.userBaseInfo.careerType = selected;
              // this.popVisible.careerType = false;
              break;
            case "education":
              this.userBaseInfo.education = selected;
              // this.popVisible.education = false;
              break;
            case "socialSecurity":
              this.userBaseInfo.socialSecurity = selected;
              // this.popVisible.socialSecurity = false;
              break;
          }
        } catch (er) {
          //
        }

      }
    },

    mounted: function () {
      this.getInfo()
    }
  }

</script>

