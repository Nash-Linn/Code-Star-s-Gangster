import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface State{
  token:string
  username:string
  usercode:string
  avatar:string
  roles:string[]
}

export const useUserStore = defineStore('user', {
  state:():State=>({
    token:'',
    username:'',
    usercode:'',
    avatar:'',
    roles:[]
  }),
  getters:{
    getToken: (state) => state.token,
    getUsername: (state) => state.username,
    getUsercode: (state) => state.usercode,
    getAvatar: (state) => state.avatar,
    getRoles: (state) => state.roles,
  },
  actions:{
    setToken(token:string) {
      this.token = token
    },
    setUsername(username:string) {
      this.username = username
    },
    setUsercode(usercode:string) {
      this.usercode = usercode
    },
    setAvatar(avatar:string) {
      this.avatar = avatar
    },
    setRoles(roles:string[]) {
      this.roles = roles
    },
  }
})
