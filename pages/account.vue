<style lang="less">
  @import url(~assets/css/variable.less);
  #page-account {
    display:flex; flex-direction:column;
    .placeholder { flex:1; }
    #user-info {
      // display:flex;
      line-height:35px;
      text-align:right;
    }
    #account-info {
      margin:35px 25px;
      line-height:30px;
      font-size:16px;
    }
    .btn-group { 
      display:flex; 
      padding:1px 0;
      background-color:#ccc;
      .btn { flex:1; }
      .btn:first-child { margin-right:1px; }
    }
    #tips { 
      padding:25px;
      p { margin-bottom:10px; line-height:1.6; }
    }
  }
</style>

<template>
  <div id="page-account">
    <div id="user-info">
      <!-- <p>{{id}}</p> -->
      {{name}}
      <input type="button" class="btn text primary" value="注销" @click="logout">
    </div>
    <div id="account-info">
      <h2>我的钱包余额: {{balance}} ETH ( ≈ 人民币{{cny}} )</h2>
      <h2>邀请有奖: {{mobile}}</h2>
    </div>
    <div class="btn-group">
      <input type="button" class="btn block" value="转入" @click="$router.push('/recharge')"/>
      <input type="button" class="btn block" value="提现" @click="$router.push('/withdraw')"/>
    </div>
    <div id="tips">
      <p>1. 请勿向该地址充值除ETH之外的资产，任何充入ETH地址的非ETH资产将不可找回。</p>
      <p>2. ETH充值需要网络确认才能到账。具体到账时间将以网络繁忙度而定，一般在30min以内。</p>
      <p>3. 最小充值金额为0.1 ETH</p>
    </div>
    <div class="placeholder"></div>
    <h3 class="website">
      <a href="http://valp.io" class="text-left">官网 website.official</a>
      <a href="https://t.me/ValPromise" class="text-right">电报群 https://t.me/ValPromise</a>
    </h3>
  </div>
</template>

<script>
export default {
  asyncData() {

  },
  data () {
    return {
      id:'',
      name:'',
      balance:0,
      mobile:'',
      cny:0,
    }
  },
  methods: {
    logout() {
      this.$http.post('/customer/loginOut', {token:localStorage.getItem('token')})
      .then(resp=>{
        resp=resp.data;
        if ( resp.state !== 1 ) return this.$store.commit('showMessageDialog', {
          type:'failure', text:'注销失败'}
        );
        this.$store.commit('showMessageDialog', {type:'failure', text:'注销成功, 即将跳转'});
        localStorage.setItem('token', '');
        setTimeout(()=>{
          this.$router.push('/');
        }, 1000);
      })
    }
  },
  mounted() {
    if ( !localStorage.getItem('token') ) {
      this.$router.replace('/login');
      return;
    }

    this.$http.post('/customer/customerDetail', {token:localStorage.getItem('token')})
    .then(resp=>{
      resp=resp.data;
      if ( resp.state !== 1 ) return this.$store.commit('showMessageDialog', {
        type:'failure', 
        text:resp.message
      });
      this.id = resp.data.id;
      this.name = resp.data.name;
      this.mobile = resp.data.mobile;
      this.balance = resp.data.balance;
      this.cny = resp.data.cny;
    })
  }
}
</script>
