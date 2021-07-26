<template>
  <div>
    <div class="title">
      <span>资料仓库</span>
    </div>

    <div class="loginForm">
      <div class="login-head">
        <span>账号登录</span>
      </div>

      <van-form @submit="onSubmit" label-width="50px">
        <van-field v-model="username" name="username" label="用户名" placeholder="用户名"
                   :rules="[{ required: true, message: '请填写用户名' }]"/>
        <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
                   :rules="[{ required: true, message: '请填写密码' }]"/>
        <div style="margin:16px 16px 5px 16px;">
          <van-button square hairline type="info" block size="small" native-type="submit">登录</van-button>
        </div>
        <div style="margin:0 16px;">
          <van-button square plain hairline type="info" block size="small" @click="sign">注册</van-button>
        </div>

      </van-form>

      <div style="margin:5px 16px;">
        <van-button square plain hairline color="#A4A4A4" size="mini" @click="showPass=true">找回密码</van-button>
      </div>

      <div>
        <van-dialog v-model="showPass" title="找回密码" :show-confirm-button="false">
          <van-form label-width="50px" @submit="findPass">
            <van-field v-model="email" name="email" label="邮箱" placeholder="输入注册时使用的邮箱"
                       :rules="[{ required: true, message: '请填写邮箱' }]"/>
            <van-button block plain hairline native-type="submit">确认</van-button>
          </van-form>
          <van-button block hairline plain color="#848484" @click="showPass=false">取消</van-button>
        </van-dialog>
      </div>

      <div>
        <van-dialog v-model="showCode" title="重置密码" :show-confirm-button="false">
          <van-form label-width="70px" @submit="setPass">
            <van-field v-model="code" name="code" label="验证码" placeholder="输入发送至您邮箱的4位验证码"
                       :rules="[{ required: true, message: '验证码' }]"/>
            <van-field v-model="newPass" type="password" name="password" label="密码" placeholder="密码"
                       :rules="[{ required: true, message: '请填写密码' }]"/>
            <van-field v-model="passCheck" type="password" name="check" label="确认密码" placeholder="确认密码"
                       :rules="[{ validator:checkPass, message: '确认密码不一致' }]"/>
            <van-button block plain hairline native-type="submit">确认</van-button>
          </van-form>
          <van-button block hairline plain color="#848484" @click="showCode=false">取消</van-button>
        </van-dialog>
      </div>

    </div>


  </div>
</template>

<script>
import {login,findPass,setPass} from "../network/index";
import {Notify,Toast} from 'vant';

export default {
  name: "login",
  data() {
    return {
      username: '',
      password: '',
      showPass:false,
      email:'',
      showCode:false,
      newPass:'',
      passCheck:'',
      code:''
    }
  },
  methods: {
    checkPass() {
      return this.newPass===this.passCheck;
    },
    onSubmit(values) {
      login(values).then(res => {

        if (res.data) {
          this.$store.commit('setUserId', res.data.id)
          this.$store.commit('setUsername', res.data.username)
          Notify({type: 'success', message: '登录成功'});
          this.$router.push("/accounts")
        } else {
          Notify({type: 'warning', message: '用户名或密码错误'});
        }
      }).catch(err => {
        console.log(err)
        Notify({type: 'danger', message: '请求失败'})
      })
    },
    sign() {
      this.$router.push('/sign')
    },
    findPass(){
      this.showPass=false
let _this=this
      findPass(this.email).then(res=>{
        if(res.data===1){
          Toast('服务器已将验证码发送至您的邮箱，请注意查收');   
setTimeout(function () {
  _this.showCode=true;
}, 2000);
        }else {
          Toast.fail("该邮箱不存在")
        }
      })
    },
    setPass(){
      let params=new URLSearchParams();
      params.append("code",this.code);
      params.append("email",this.email);
      params.append("newPass",this.newPass)
this.code=''
this.email=''
this.newPass=''
      this.showCode=false;
      setPass(params).then(res=>{
        if(res.data===1){
          Toast.success("密码重置成功，请返回登录")
        }else {
          Toast.fail("验证码错误")
        }
      })
    }
  },
}
</script>

<style lang="css" scoped>
@import "../assets/css/login.css";
</style>
