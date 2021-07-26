import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    userId:'',
    username:'',
  },
  getters:{
    userId:state=>{
      let userId=state.userId
      if(!userId){
        userId=JSON.parse(window.sessionStorage.getItem('userId')||null)
      }
      return userId
    },
    username:state=>{
      let username=state.username
      if(!username){
        username=JSON.parse(window.sessionStorage.getItem('username')||null)
      }
      return username
    }
  },
  mutations:{
    setUserId:(state,userId)=>{
      state.userId=userId
      window.sessionStorage.setItem('userId',JSON.stringify(userId))
    },
    setUsername: (state, username) => {
      state.username = username
      window.sessionStorage.setItem('username', JSON.stringify(username))
    },
  },
  actions:{}
})
