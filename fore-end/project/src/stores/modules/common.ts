import { ref, computed} from 'vue'
import { defineStore } from 'pinia'
import csgMessage from '@lib/components/functionComponents/csgMessage'

interface State{
  logoClickCount:number
}

export const useCommonStore = defineStore('common', {
  state:():State=>({
    logoClickCount:0
  }),
  getters:{
    getLogoClickCount: (state) => state.logoClickCount,
  },
  actions:{
    addLogoClickCount() {
      this.logoClickCount ++
      switch(this.logoClickCount){
        case 3:
          csgMessage({
            type:'warn',
            message:'别点我！'
          })
          break
        case 4:
          csgMessage({
            type:'warn',
            message:'你再点！'
          })
          break
        case 5:
          this.logoClickCount = 0
          break
      }
    },
  }
})