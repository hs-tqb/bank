<style lang="less">
  @import url(~assets/css/variable.less);
  #page-login {
    padding-top:1px;
    @input-height:25px;
    .input-group { padding:15px 25px; }
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
    .btn.primary { margin-top:40px; width:120px; .radius(4px); }
  }
</style>

<template>
  <div id="page-login">
    <a id="logo" href="http://valp.io" target="_blank"></a>
    <div class="input-group">
      <ul class="inp-list">
        <li v-for="(item,key) in input" :key="`input-${key}`">
          <label :for="item.id" :class="item.required?'required':''" >
            {{item.label}}
            <!-- <div v-if="item.help" class="icon help" @click="call(item.help.event)"></div> -->
            <span class="explain" v-if="item.explain">{{item.explain}}</span>
          </label>
          <div class="input-wrapper">
            <input :type="item.type||'text'" :id="item.id" v-model.trim="item.value">
            <input 
              type="button" 
              class="btn transparent"
              :value="item.addition.text" 
              :disabled="item.addition.disabled"
              v-if="item.addition" @click="call(item.addition.event, {key})"
            >
          </div>
        </li>
      </ul>
    </div>
    <div class="btn-wrapper text-center">
      <input type="button" class="btn primary" value="登录" @click="confirm">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input: {
        mobile:{
          id:'kdfjliq',
          // regexp:/^\+?[\d- ]+\d+$/,
          regexp:/^1[3-9]\d{9}$/,
          value:'',
          required:true,
          label:'手机号',
          warning:'无效的手机号'
        },
        verifyCode: {
          label:'短信验证码',
          value:'',
          required:true,
          warning:'请填写验证码',
          addition: {
            text:'短信验证码',
            countDownText:'#placeholder#s 后重新获取',
            event:'sendSMSCode',
            timer:-1,
          },
        },
        // amount: {
        //   label:'ETH 数量',
        //   value:'',
        //   type:'number',
        //   required:true,
        //   explain:'(不得少于0.1个)',
        //   warning: 'ETH 数量不正确',
        //   verify() {
        //     return !isNaN( +this.value.trim() );
        //   }
        // }
      }
    }
  },
  methods: {
    confirm() {
      let input     = this.input;
      let temp      = null;
      for ( let p in input ) {
        temp = input[p];
        // if ( !temp.required ) {
        //   if ( temp.value && temp.regexp && !temp.regexp.test(temp.value) ) {
        //     return this.$store.commit('showMessageDialog', {
        //       type:'failure', 
        //       text:this.input[p].warning
        //     });
        //   } else {
        //     continue;
        //   }
        // }
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
            text:this.input[p].warning
          });
        }
      }

      this.$http.post('/customer/login', {
        mobile:this.input.mobile.value,
        mobileCode:this.input.verifyCode.value
      })
      .then(resp=>{
        resp = resp.data;
        if ( resp.state !== 1 ) return this.$store.commit('showMessageDialog', {
            type:'failure', 
            text:resp.message
          });
        localStorage.setItem('token', resp.data.token);
        this.$router.push('/account');
      })
    },
    sendSMSCode({key}) {
      // 如果手机号非法，则中断操作
      let mobile = this.input.mobile;
      if ( !mobile.regexp.test(mobile.value) ) {
        return this.$store.commit('showMessageDialog', {
          type:'failure',
          text:this.input.mobile.warning
        });
      }

      this.$http.post('/customer/getMobileCode', {mobile:mobile.value} )
      // axios.get('/customer/getMobileCode', {params:{mobile:mobile.value}} )
        .then(resp=>{ 
          resp = resp.data;
          if ( resp.state !== 1 ) throw resp.message;
          // 倒计时逻辑
          let btn = this.input.verifyCode.addition;
          let secs = 60;
          let timer = -1;
          
          this.input.verifyCode.addition.disabled = true;
          btn.bakText  = btn.text;
          btn.text = btn.countDownText.replace('#placeholder#', secs);
          
          timer = setInterval(()=>{
            if (--secs === 0 ) {
              clearInterval(timer);
              btn.text = btn.bakText;
              this.input.verifyCode.addition.disabled = false;
            } else {
              btn.text = btn.countDownText.replace('#placeholder#', secs);
            }
          }, 1e3);

        })
        .catch(err=>{
          this.$store.commit('showMessageDialog', {type:'failure', text:err.toString()});
        });
    }
  },
}
</script>
