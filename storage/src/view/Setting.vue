<template>
  <div>

    <van-sticky :offset-top="0">

      <div class="s-title">
        <MenuDialog icon-name="manager"/>
        <span>个人信息</span>
      </div>
    </van-sticky>


    <div class="admin">
      <van-icon name="user-o" size="70px" class="admin-icon"/>
      <span class="name">{{ username }}</span>
      <span class="phone">{{ phone }}</span>
      <span class="email">{{ email }}</span>
      <van-button size="mini" plain hairline type="info" class="editBtn" @click="editBtn(phone,email)">&nbsp;&nbsp; &nbsp;编辑 &nbsp;&nbsp;&nbsp;</van-button>
      <van-button size="mini" plain color="#A4A4A4" @click="showAlter=true" class="alterBtn">修改密码</van-button>
    </div>

    <div class="info">
      <ul>
        <li>
          <van-icon name="orders-o" size="30px" class="info-icon"/>
          <span>管理的账号密码: {{ numOfAccount }}</span>
        </li>
        <li>
          <van-icon name="user-circle-o" size="30px" class="info-icon"/>
          <span>记录的生日信息: {{ numOfBirthInfo }}</span>
        </li>

      </ul>
    </div>

    <van-button block color="#A4A4A4" @click="logout(userId)">注销</van-button>



    <van-dialog v-model="showEdit" title="编辑" show-cancel-button @confirm="editSubmit">
      <van-form label-width="50px">
        <van-field v-model="submitForm.name" name="name" label="名称" :placeholder="echoFrom.username"
                   :rules="[{ required: true, message: '请填写名称' }]"/>
        <van-field v-model="submitForm.phone" name="phone" label="手机号" :placeholder="echoFrom.phone"
                   :rules="[{ pattern:phone_pattern, message: '请填写手机号' }]"/>
        <van-field v-model="submitForm.email" name="password" label="邮箱" :placeholder="echoFrom.email"
                   :rules="[{ pattern:email_pattern, message: '请填写邮箱' }]"/>
      </van-form>
    </van-dialog>

    <van-dialog v-model="showAlter" title="修改密码" :show-confirm-button="false">
      <van-form @submit="alterPass" label-width="70px">
        <van-field v-model="oldPass" name="oldPass" type="password" label="旧密码" placeholder="填写旧密码"
                   :rules="[{ required: true, message: '请填写旧密码' }]"/>
        <van-field v-model="newPass" type="password" name="password" label="新密码" placeholder="新密码"
                   :rules="[{ required: true, message: '请填写密码' }]"/>
        <van-field v-model="passCheck" type="password" name="check" label="确认密码" placeholder="确认密码"
                   :rules="[{ validator:checkPass, message: '确认密码不一致' }]"/>

        <van-button block plain hairline native-type="submit">确认</van-button>
      </van-form>
      <van-button block hairline plain color="#848484" @click="showAlter=false">取消</van-button>
    </van-dialog>

  </div>
</template>

<script>
import {getNumOfAcc, getNumOfBir, logout, getAdmin, editAdmin,alterPass} from "../network";
import {mapGetters} from 'vuex'
import {Notify, Dialog} from 'vant';
import MenuDialog from "../components/MenuDialog";

export default {
  name: "Setting",
  components: {
    MenuDialog
  },
  computed: {
    ...mapGetters([
      'username',
      'userId'
    ])
  },
  data() {
    return {
      numOfAccount: 0,
      numOfBirthInfo: 0,
      phone: '',
      email: '',
      showEdit: false,
      submitForm: {
        name: '',
        phone: '',
        email: '',
      },
      echoFrom: {
        username: '',
        phone: '',
        email: '',
      },
      phone_pattern: /1\d{10}/,
      email_pattern: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
      showAlter: false,
      oldPass:'',
      newPass:'',
      passCheck:''
    }
  },
  created() {
    getNumOfAcc(this.userId).then(res => {
      if (res.data) {
        this.numOfAccount = res.data;
      }
    }).catch(err => console.log(err));

    getNumOfBir(this.userId).then(res => {
      if (res.data) {
        this.numOfBirthInfo = res.data;
      }
    }).catch(err => console.log(err));

    getAdmin(this.userId).then(res => {
      if (res.data) {
        this.phone = res.data.phone
        this.email = res.data.email
      }
    })
  },

  methods: {
    logout(id) {
      Dialog.confirm({
        title: '注销',
        message: '是否注销登录',
      }).then(() => {
        logout(id).then(res => {
          if (res.data) {
            this.$router.push("/login")
          } else {
            Notify({type: 'warning', message: '注销失败'})
          }
        }).catch(err => {
          Notify({type: 'danger', message: '请求失败'})
        })
      }).catch(() => {
        // on cancel
      });
    },
    editBtn(phone, email) {
      this.echoFrom.username = this.username
      this.echoFrom.phone = phone
      this.echoFrom.email = email
      this.showEdit = true;
    },
    editSubmit() {
      let params = new URLSearchParams()
      params.append('id', this.userId)
      if (this.submitForm.name !== undefined && this.submitForm.name !== '')
        params.append('username', this.submitForm.name)
      else params.append('username', this.username)
      if (this.submitForm.phone !== undefined && this.submitForm.phone !== '')
        params.append('phone', this.submitForm.phone)
      if (this.submitForm.email !== undefined && this.submitForm.email !== '')
        params.append('email', this.submitForm.email);
      this.submitForm = {}
      editAdmin(params).then(res => {
        if (res.data===1) {
          Notify({type: 'success', message: '修改成功'})
          this.$router.go(0);
        } else {
          Notify({type: 'warning', message: '修改失败'})
        }
      }).catch(err => {
        console.log(err)
        Notify({type: 'danger', message: '请求失败'})
      })
    },
    checkPass() {
      return this.newPass===this.passCheck;
    },
    alterPass(){
      let params=new URLSearchParams();
      params.append("oldPass",this.oldPass)
      params.append("newPass",this.newPass)
      params.append("userId",this.userId)
this.showAlter=false
      alterPass(params).then(res=>{
        if (res.data===1) {
          Notify({type: 'success', message: '修改成功'})
        } else {
          Notify({type: 'warning', message: '旧密码错误，修改失败'})
        }
      }).catch(err => {
        console.log(err)
        Notify({type: 'danger', message: '请求失败'})
      })
    }
  }

}
</script>

<style lang="css" scoped>
@import "../assets/css/setting.css";
</style>
