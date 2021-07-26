<template>
  <div>
    <van-sticky offset-top="0">
      <div class="s-title">
        <menu-dialog icon-name="user-o"/>
        <span>生日信息</span>
      </div>
    </van-sticky>
    <!--    搜索-->
    <form action="/">
      <van-search v-model="value" placeholder="请输入搜索关键词" @search="onSearch"/>
    </form>
    <!--新增按钮-->
    <div class="add">
      <van-button type="success" plain block @click="addBtn">
        <van-icon name="plus" size="35px" class="add-icon"/>
        新增
      </van-button>
    </div>
    <!--    主体-->
    <div>
      <van-swipe-cell v-for="(item,index) in birthInfo" :key="index" right-width="70px" style="margin-bottom: 5px">
        <div class="content">
          <van-icon name="contact" size="50" class="icon"/>
          <div class="text">
            <p>姓名: {{ item.name }}</p>
            <p>生日: {{ item.birth }}</p>
            <div class="subscribe">
              <p>订阅</p>
              <van-switch v-model="item.subscribe" active-color="#BCF5A9" inactive-color="#dcdee0" size="20px"
                          @change="subscribe(item)"/>
            </div>

          </div>
        </div>
        <template #right>
          <van-button square text="编辑" plain type="info" class="btn" @click="editBtn(item)"/>
          <van-button square text="删除" plain type="warning" class="btn" @click="delBtn(item.id)"/>
        </template>
      </van-swipe-cell>
    </div>

    <!--编辑表单-->
    <div>
      <van-dialog v-model="showEdit" title="编辑" show-cancel-button @cancel="cancelEdit" @confirm="editSubmit">
        <van-form label-width="50px">
          <van-field v-model="submitForm.name" name="name" label="姓名" :placeholder="echoFrom.name"
                     :rules="[{ required: false, message: '请填写姓名' }]"/>
          <van-field v-model="submitForm.birth" name="birth" label="生日"
                     :placeholder="echoFrom.birth" :rules="[{ pattern:birth_pattern, message: '请填写生日' }]"/>
        </van-form>
      </van-dialog>
    </div>
    <!--新增表单-->
    <div>
      <van-dialog v-model="showAdd" title="新增" :show-confirm-button="false">
        <van-form label-width="70px" @submit="addSubmit">
          <van-field v-model="submitForm.name" name="name" label="姓名" placeholder="输入姓名"
                     :rules="[{ required: true, message: '请填写姓名' }]"/>
          <van-field v-model="submitForm.birth" name="birth" label="生日" placeholder="生日格式为 MM-dd 例如 05-25"
                     :rules="[{ pattern:birth_pattern, message: '请正确填写生日格式' }]"/>
          <van-field name="switch" label="生日订阅">
            <template #input>
              <van-switch v-model="submitForm.subscribe" size="20"/>
            </template>
          </van-field>
          <van-button block plain hairline native-type="submit">确认</van-button>
        </van-form>
        <van-button block hairline plain color="#848484" @click="showAdd=false">取消</van-button>
      </van-dialog>
    </div>

  </div>
</template>

<script>
import {getBirthOfName, getBirthInfo, editBirth, deleteBirth, addBirth} from "../network";
import MenuDialog from "../components/MenuDialog";
import {Notify, Toast} from "vant";
import {mapGetters} from 'vuex'

export default {
  name: "BirthInfo",
  components: {
    MenuDialog
  },
  computed: {
    ...mapGetters([
      'userId'
    ]),
  },
  data() {
    return {
      value: '',
      showEdit: false,
      showAdd: false,
      submitForm: {
        name: '',
        birth: '',
        subscribe: false,
      },
      birthInfo: [],
      echoFrom: {
        id: '',
        name: '',
        birth: ''
      },
      birth_pattern: /^[0-1]+[0-9]+\-+[0-3]+[0-9]/,
    };
  },
  created() {
    getBirthInfo(this.userId).then(res => {
      this.birthInfo = res.data
    })
  },
  methods: {
    onSearch(val) {
      getBirthOfName(val, this.userId).then(res => {
        if (res.data) {
          this.birthInfo = res.data

        } else {
          Notify({type: 'warning', message: '暂无信息'})
        }
      }).catch(err => console.log(err))
    },
    editBtn(item) {
      this.echoFrom = item;
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
      params.append('userId', this.userId)
      params.append('id', this.echoFrom.id)
      if (this.submitForm.name !== undefined && this.submitForm.name !== '')
        params.append('name', this.submitForm.name)
      if (this.submitForm.birth !== undefined && this.submitForm.birth !== '')
        params.append('birth', this.submitForm.birth)
      else params.append('birth', this.echoFrom.birth)
      this.submitForm = {}
      editBirth(params).then(res => {
        if (res.data === 1) {
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
      this.showAdd = false
      let params = new URLSearchParams()
      params.append('name', this.submitForm.name)
      params.append('userId', this.userId)
      params.append('birth', this.submitForm.birth)
      params.append('subscribe', this.submitForm.subscribe)
      this.submitForm = {}
      addBirth(params).then(res => {
        if (res.data === 1) {
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

    delBtn(id) {
      deleteBirth(id).then(res => {
        if (res.data === 1) {
          Notify({type: 'success', message: '删除成功'})
          this.$router.go(0);
        } else {
          Notify({type: 'warning', message: '删除失败'})
        }
      }).catch(err => {
        Notify({type: 'danger', message: '请求失败'})
      })
    },
    subscribe(item) {
//当进入这里时，item.subscribe已经改变了，subscribe此时是改变后的值
      let flag = item.subscribe;
      let params = new URLSearchParams();
      params.append("id", item.id);
      params.append("subscribe", (item.subscribe));
      editBirth(params).then(res => {
        if (res.data === 1) {
          // this.$router.go(0)
          if (flag === true) {
            Toast.success('确认订阅');
          } else {
            Toast.fail('取消订阅');
          }
        }
      }).catch(err => {
        Notify({type: 'danger', message: '请求失败'})
      })

    }

  }
}
</script>

<style lang="css" scoped>
@import '../assets/css/birthInfo.css';
</style>
