import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { tokenName } from '@/config'
import { getUserInfo, login } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/token'

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
      setToken(token)
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



     /**
      * @description 登录
      * @param {*} userInfo
      */
     async login(userInfo:{usercode:string,password:string}) {
        const {
          data: { [tokenName]: token },
        } = await login(userInfo)
        this.afterLogin(token)
      },

      /**
       * @description 设置token并发送提醒
       * @param {string} token 更新令牌
       */
      afterLogin(token:string) {
        if (token) {
          this.setToken(token)
          this.getUserInfo()
        }
      },
      async getUserInfo() {
        const {
          data: {
            username,
            avatar,
            roles,
            usercode,
          },
        } = await getUserInfo()
        username && this.setUsername(username)
        usercode && this.setUsercode(usercode)
        avatar && this.setAvatar(avatar)
        roles && this.setRoles(roles)
      },
  }
})
