<template>
  <div>
    <div class="sign-title">用户注册</div>
    <van-icon name="revoke" size="25px" class="sign-icon" @click="$router.back()"/>
    <van-form @submit="sign" label-width="70px">
      <van-field v-model="username" name="username" label="用户名" placeholder="用户名"
                 :rules="[{ required: true, message: '请填写用户名' }]"/>
      <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
                 :rules="[{ required: true, message: '请填写密码' }]"/>
      <van-field v-model="check" type="password" name="check" label="确认密码" placeholder="确认密码"
                 :rules="[{ validator:checkPass, message: '确认密码不一致' }]"/>
      <van-field v-model="phone" name="phone" label="手机号码" placeholder="手机号码"
                 :rules="[{ pattern:phone_pattern, message: '请输入正确的手机号码' }]"/>
      <van-field v-model="email" name="email" label="电子邮箱" placeholder="电子邮箱"
                 :rules="[{ pattern:email_pattern, message: '请填写正确的电子邮箱' }]"/>

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>

    <p class="p-des">请如实填写邮箱，注册完成后，将通过1461987661@qq.com发送注册成功邮件到你填写的邮箱中，届时请注意查收并认真阅读</p>

    <van-dialog v-model="show" title="注册事项" show-cancel-button :show-confirm-button="false" :showCancelButton="false">
      <div class="agree">
        <p>你注册成功后，在网页上提交的数据将存储在郭友光的服务器上，安全性无法保证，责任请自行承担。不过一般也没人知道这个网址，此网站会持续更新提供更好，更安全的服务。</p>
        <van-button type="danger" class="left-btn" size="small" @click="goLogin">不同意</van-button>
        <van-button type="info" class="right-btn" size="small" @click="show=false">同意</van-button>
      </div>
    </van-dialog>

  </div>
</template>

<script>
import {sign} from "../network";
import {Notify} from 'vant'

export default {
  name: "Sign",
  data() {
    return {
      show: true,
      username: '',
      password: '',
      check: '',
      phone: '',
      email: '',
      phone_pattern: /1\d{10}/,
      email_pattern: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    }
  },

  methods: {
    checkPass(val) {
      return this.password === this.check;
    },
    sign() {
      let params = new URLSearchParams();
      params.append("username", this.username)
      params.append("password", this.password)
      params.append("phone", this.phone)
      params.append("email", this.email)

      sign(params).then(res => {
        if (res.data===1) {
          let _this = this
          Notify({type: 'success', message: '注册成功，2秒后将跳转到登录界面'})
          setTimeout(function () {
            _this.$router.push("/login")
          }, 2000)
        } else if(res.data===3){
          Notify({type: 'warning', message: '用户名已存在，请重试'})
        }else {
          Notify({type: 'warning', message: '该邮箱已被使用，请重新注册'})
        }
      }).catch(err => {
        Notify({type: 'danger', message: '请求失败'})
      })
    },
    goLogin() {
      this.$router.push("/login")
    },

  }
}
</script>

<style scoped>
@import "../assets/css/sign.css";
</style>
