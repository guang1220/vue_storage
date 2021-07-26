<template>
  <div>
    <van-icon name="exchange" size="25px" class="menu-icon-exchange" @click="goPage('/')"/>

    <van-icon :name="iconName" size="25" class="menu-icon-setting" @click="goPage('/setting')"/>

  </div>

</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "index",
  props:[
    'iconName'
  ],
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'username',
    ])
  },
  methods: {
    goPage(path) {
      if(path==='/setting'){
        this.$router.push({path:path});
      } else if(this.$route.path!=='/accounts'){
        this.$router.push({path: '/accounts'})
      }else{
        this.$router.push({path: '/birthInfo'})
      }
    }
  }
}
</script>

<style lang="css" scoped>
@import "../assets/css/menudialog.css";
</style>
