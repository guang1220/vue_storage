<template>
  <div>

    <van-sticky offset-top="0">
      <div class="s-title">
        <MenuDialog icon-name="user-o"/>
        <span>账号密码</span>
      </div>
    </van-sticky>

    <form action="/">
      <van-search v-model="value" placeholder="请输入搜索关键词" @search="onSearch"/>
    </form>

    <div class="add">
      <van-button type="success" plain block @click="addBtn">
        <van-icon name="plus" size="35px" class="add-icon"/>
        新增
      </van-button>
    </div>

    <div>
      <van-collapse v-model="activeNames" accordion>
        <van-collapse-item :name="index" v-for="(item,index) in accounts" :key="index">
          <template #title>
            <div style="font-size: 18px">{{ item.name }}</div>
          </template>
          <p>账号: {{ item.account }}</p>
          <p>密码: {{ item.password }}</p>
          <p style="font-size: 12px">最近更新时间: {{ item.alterTime }}</p>
          <van-button size="small" @click="editBtn(item)">更新信息</van-button>
        </van-collapse-item>
      </van-collapse>
    </div>
    <!--编辑-->
    <div>
      <van-dialog v-model="showEdit" title="更新" show-cancel-button @cancel="cancelEdit" @confirm="editSubmit">
        <van-form label-width="50px">
          <van-field v-model="submitForm.name" name="name" label="名称" :placeholder="echoForm.name"
                     :rules="[{ required: false, message: '请填写名称' }]"/>
          <van-field v-model="submitForm.account" name="account" label="账号" :placeholder="echoForm.account"
                     :rules="[{ required: false, message: '请填写账号' }]"/>
          <van-field v-model="submitForm.password" name="password" label="密码" :placeholder="echoForm.password"
                     :rules="[{ required: false, message: '请填写密码' }]"/>
        </van-form>
      </van-dialog>
    </div>
    <!--新增-->
    <div>
      <van-dialog v-model="showAdd" title="新增" :show-confirm-button="false">
        <van-form label-width="50px" @submit="addSubmit">
          <van-field v-model="submitForm.name" name="name" label="名称" placeholder="输入名称"
                     :rules="[{ required: true, message: '请填写名称' }]"/>
          <van-field v-model="submitForm.account" name="account" label="账号" placeholder="输入账号"
                     :rules="[{ required: false, message: '请填写账号' }]"/>
          <van-field v-model="submitForm.password" name="password" label="密码" placeholder="输入密码"
                     :rules="[{ required: true, message: '请填写密码' }]"/>
          <van-button block plain hairline native-type="submit">确认</van-button>
        </van-form>
        <van-button block hairline plain color="#848484" @click="showAdd=false">取消</van-button>
      </van-dialog>
    </div>

  </div>
</template>

<script>
import {getAccounts, editAccount, addAccount} from "../network";
import {getAccountOfName} from "../network";
import MenuDialog from "../components/MenuDialog";
import {Notify} from 'vant';
import {mapGetters} from 'vuex'

export default {
  name: "Accounts",
  computed: {
    ...mapGetters([
      'userId'
    ]),
  },
  components: {
    MenuDialog
  },
  data() {
    return {
      value: '',
      activeNames: '1',
      showEdit: false,
      showAdd: false,
      accounts: [
        {}
      ],
      submitForm: {
        name: '',
        account: '',
        password: '',
      },
      echoForm: {
        id: '',
        name: '',
        account: '',
        password: '',
      }
    }
  },
  created() {
    getAccounts(this.userId).then(res => {
      this.accounts = res.data;
    }).catch(err => console.log(err))
  },
  methods: {
    onSearch(val) {
      getAccountOfName(val,this.userId).then(res => {
        if (res.data) {
          this.accounts = res.data
          //this.$router.go(0);
        } else {
          Notify({type: 'warning', message: '暂无信息'})
        }
      }).catch(err => console.log(err))
    },
    editBtn(item) {

      this.echoForm = item

      this.showEdit = true;
    },
    addBtn() {
      this.showAdd = true;
    },
    cancelEdit() {
      this.echoForm = {}
    },
    editSubmit() {
      let params = new URLSearchParams()
      params.append('id', this.echoForm.id)
 params.append('userId', this.userId)
      if (this.submitForm.name !== undefined && this.submitForm.name !== '')
        params.append('name', this.submitForm.name)
      if (this.submitForm.account !== undefined && this.submitForm.account !== '')
        params.append('account', this.submitForm.account)
      if (this.submitForm.password !== undefined && this.submitForm.password !== '')
        params.append('password', this.submitForm.password)

      this.submitForm = {}
      editAccount(params).then(res => {
        if (res.data) {
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
    addSubmit() {
this.showAdd=false
      let params = new URLSearchParams()
      params.append('name', this.submitForm.name)
      params.append('account', this.submitForm.account)
      params.append('password', this.submitForm.password)
 params.append('userId', this.userId)
      this.submitForm = {}
      addAccount(params).then(res => {
        if (res.data) {
          Notify({type: 'success', message: '新增成功'})
          this.$router.go(0);
        } else {
          Notify({type: 'warning', message: '新增失败'})
        }
      }).catch(err => {
        console.log(err)
        Notify({type: 'danger', message: '请求失败'})
      })
    },

  }
}
</script>

<style lang="css" scoped>
@import '../assets/css/accounts.css';
</style>
