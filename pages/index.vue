<style lang="less">
  @import url(~assets/css/variable.less);
  @import url(~assets/css/icons/failure.less);
  
  @input-height:25px;
  #page-home {
    min-width:260px;
    padding-top:1px;
    font-size:12px;
    h1 { 
      font-size:18px; font-weight:500; color:@color-text-primary; 
      span { font-size:12px; color:@color-info; vertical-align:top; }
    }
    .panel { 
      padding:15px 25px; 
      label { 
        display:inline-block; .relative; margin-top:12px; line-height:20px; 
        &.required::after { color:@color-danger; content:'*'; }
        .explain { position:absolute; left:100%; top:0; margin-left:10px; white-space:nowrap; color:@color-info; }
      }
      .input-wrapper {
        .flow();
        input { .flex(1); min-width:0; height:@input-height; .border(bottom); }
        input[type=button] { 
          flex:none; margin:(@input-height - 35px) 0 0 5px; width:120px; .radius(4px); font-size:12px; 
          &:disabled { opacity:.5; }
        }
      }
      #confirm { margin:20px 0; .radius(4px); }
    }
    // .help { display:inline-block; vertical-align:middle; width:20px; height:20px; background:url(~assets/img/icons/help.png) no-repeat center; background-size:100% auto; }
    .website { 
      .flow(row,wrap); justify-content:space-around; color:@color-text-primary;
      a { padding:7px 0; white-space:nowrap; text-align:center; }
    }
    #login { position:absolute; right:0; top:0; height:auto; }
  }
</style>

<template>
  <div id="page-home">
    <input id="login" type="button" class="btn text primary" value="已有帐号" @click="$router.push('/login')"/>
    <a id="logo" href="http://valp.io" target="_blank"></a>
    <h1 class="text-center" v-html="lang.title"></h1>
    <div class="panel">
      <ul class="inp-list">
        <li v-for="(item,key) in input" :key="`input-${key}`">
          <label :for="item.id" :class="item.required?'required':''" >
            {{lang.input[key].label}}
            <!-- <div v-if="item.help" class="icon help" @click="call(item.help.event)"></div> -->
            <span class="explain" v-if="item.explain">{{lang.input[key].explain}}</span>
          </label>
          <div class="input-wrapper">
            <input :type="item.type||'text'" :id="item.id" v-model.trim="item.value">
            <input 
              type="button" 
              class="btn transparent"
              :value="lang.input[key].addition.text" 
              :disabled="input.vfCode.addition.disabled"
              v-if="item.addition" @click="call(item.addition.event, {key})"
            >
          </div>
        </li>
      </ul>
      <input type="button" id="confirm" class="btn primary block" :value="lang.confirm" @click="confirm">
      <h3 class="website">
        <a :href="website.official" class="text-left">{{lang.website.official}} {{website.official}}</a>
        <a :href="website.telegram" class="text-right">{{lang.website.telegram}} {{website.telegram}}</a>
      </h3>
    </div>


    <div id="dialog-result" class="dialog-container" :class="dialogResult.show?'show':''">
      <div class="outer-wrapper">
        <div class="inner-wrapper" :class="dialogResult.state" v-if="dialogResult.state">
          <a href="javascript:void(0)" class="close" @click="dialogResult.show=false"></a>
          <img src="~/assets/img/icons/success.png" width="60" height="60" v-if="dialogResult.state==='success'">
          <img src="~/assets/img/icons/failure.png" width="60" height="60" v-else>
          <h2>{{lang.dialogResult[dialogResult.state].title}}</h2>
          <p>{{lang.dialogResult[dialogResult.state].text}}</p>
          <a href="http://valp.io">
            <img src="~/assets/img/activity.png">
          </a>
          <div class="placeholder"></div>
          <h3 class="website">
            <a :href="website.official">{{lang.website.official}} {{website.official}}</a>
            <a :href="website.telegram">{{lang.website.telegram}} {{website.telegram}}</a>
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cn  :{
        title:'ValPromise 区块链银行 <span>Beta</span>',
        input: {
          name: {
            label:'姓名',
            warning:''
          },
          mobile: {
            label:'手机号',
            warning:'无效的手机号'
          },
          vfCode:{
            label:'验证码',
            addition: {
              text:'发送验证码',
              countDownText:'#placeholder#s 后重新获取'
            },
            warning:'验证码不能为空'
          },
          email:{
            label:'邮箱',
            warning:'无效的邮箱'
          },
          wallet:{
            label:'ETH 钱包地址',
            // explain:'(仅用于发放糖果)',
            warning:'钱包地址不能为空'
          },
          amount: {
            label:'ETH 数量',
            explain:'(不得少于0.1个)',
            warning:'ETH 数量不正确',
          },
          key:{
            label:'糖果兑换码',
            warning:'兑换码不能为空'
          },
          wechat: {
            label:'微信',
          }
        },
        confirm:'领取',
        website: {
          official: '官网',
          telegram: '电报群'
        },
        dialogResult: {
          failure:{
            title:'领取失败',
            text :'兑换码填写错误，请重新输入！'
          },
          success: {
            title:'提交成功',
            text :'我们会在3个工作日内完成发放，到时可在表单填写的 ETH 地址查询'
          }
        }
      },
      input: {
        name:{
          id:'xkflhsldf',
          value:'',
          required:false,
        },
        mobile:{
          id:'kdfjliq',
          // regexp:/^\+?[\d- ]+\d+$/,
          regexp:/^1[3-9]\d{9}$/,
          value:'17328397970',
          required:true
        },
        vfCode:{
          id:'z9dkflsj',
          value:'',
          required:true,
          addition: {
            event:'sendSMSCode',
            timer:-1,
          }
        },
        // email:{
        //   id:'xkvjslf',
        //   regexp:/^[a-zA-Z0-9\u4e00-\u9fa5]+([\.\_\-]?[a-zA-Z0-9\u4e00-\u9fa5])+@([a-zA-Z0-9]+[\.\-])+[a-zA-Z0-9]+$/,
        //   value:'',
        //   required:false,
        // },
        wallet:{
          id:'xkvj1kddk',
          value:'',
          required:true,
          // explain:true
          // help: {
          //   show:false,
          //   text:'',
          //   event:'showWalletExplain'
          // }
        },
        amount: {
          id:'xkdh189djhfvk',
          value:'',
          type:'number',
          required:true,
          explain:true,
          verify(){
            return !isNaN(+this.value.trim()) && +this.value.trim()>=0.1;
          }
        },
        // key:{
        //   id:'sdkvfjfssl',
        //   value:'',
        //   required:true,
        // }
        wechat: {
          id:'xkdusdjfsdfkusduf',
          value:''
        }
      },
      website: {
        official: 'http://valp.io',
        telegram: 'https://t.me/ValPromise'
      },
      dialogResult: {
        show:false,
        state:'',
      }
    }
  },
  computed: {
    lang() {
      return this.cn;
    }
  },
  methods: {
    call(name, value) {
      this[name](value);
    },
    sendSMSCode({key}) {
      // 如果手机号非法，则中断操作
      let mobile = this.input.mobile;
      if ( !mobile.regexp.test(mobile.value) ) {
        return this.$store.commit('showMessageDialog', {
          type:'failure',
          text:this.lang.input.mobile.warning
        });
      }

      this.$http.post('/customer/getMobileCode', {mobile:mobile.value} )
        .then(resp=>{ 
          resp = resp.data;
          if ( resp.state !== 1 ) throw resp.message;
          // 倒计时逻辑
          let btn = this.lang.input.vfCode.addition;
          let secs = 60;
          let timer = -1;
          
          this.input.vfCode.addition.disabled = true;
          btn.bakText  = btn.text;
          btn.text = btn.countDownText.replace('#placeholder#', secs);
          
          timer = setInterval(()=>{
            if (--secs === 0 ) {
              clearInterval(timer);
              btn.text = btn.bakText;
              this.input.vfCode.addition.disabled = false;
            } else {
              btn.text = btn.countDownText.replace('#placeholder#', secs);
            }
          }, 1e3);

        })
        .catch(err=>{
          this.$store.commit('showMessageDialog', {type:'failure', text:err.toString()});
        });
    },
    showWalletExplain() {
      this.input.wallet.help.show = true;
    },
    confirm() {
      let input     = this.input;
      let temp      = null;
      for ( let p in input ) {
        temp = input[p];
        if ( 
          temp.required? 
          (!temp.value || (temp.regexp&&!temp.regexp.test(temp.value)) || (temp.verify&&!temp.verify()) ):
          ( 
            (temp.value && temp.regexp && !temp.regexp.test(temp.value)) || 
            (temp.value && temp.verify && !temp.verify())
          )
        ) {
          return this.$store.commit('showMessageDialog', {
            type:'failure', 
            text:this.lang.input[p].warning
          });
        }
      };

      this.$http.post('/customer/register', {
        name:input.name.value,
        mobile:input.mobile.value,
        mobileCode:input.vfCode.value,
        withdrawalAccount:input.wallet.value,
        invite:input.wechat.value
      })
      .then(resp=>{
        resp = resp.data;
        if ( resp.state !== 1 ) return;
        localStorage.setItem('token', resp.data.token);
        this.$router.push('/confirm');
      })
    }
  }
}
</script>
