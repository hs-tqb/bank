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
      {{id}}
      <input type="button" class="btn text primary" value="注销">
    </div>
    <div id="account-info">
      <h2>我的钱包余额: {{balance}} ETH</h2>
      <h2>邀请有奖: 邀请码 {{id}}</h2>
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
  data () {
    return {
      id:'13131313131',
      balance:300
    }
  }
}
</script>
