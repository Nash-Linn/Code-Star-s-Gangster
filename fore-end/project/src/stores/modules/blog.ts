import { defineStore } from 'pinia'

interface TypeEnum{
  [key:number]:string
}

interface State{
  typeList:any[]
  typeEnum:TypeEnum
}

export const useBlogStore = defineStore('blog', {
  state:():State=>({
    typeList:[],
    typeEnum:{}
  }),
  getters:{
    getTypeList: (state) => state.typeList,
    getTypeEnum: (state) => state.typeEnum,
  },
  actions:{
    setTypeList(typeList:any[]) {
      this.typeList = typeList
    },
    setTypeEnum(TypeEnum:any) {
      this.typeEnum = TypeEnum
    },
  }
})