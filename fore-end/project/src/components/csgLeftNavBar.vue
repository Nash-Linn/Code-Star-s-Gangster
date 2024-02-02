<template>
  <div class="left-nav-bar-wrap">
    <div
      class="type-item"
      :class="[choseTypeId === item.id ? 'type-item-active' : '']"
      v-for="(item, index) in typeList"
      :key="index"
      @click="handleClickType(item)"
    >
      {{ item.name }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { tagType } from '@/api/tagManage/tagManage'
import { ref, onBeforeMount, watch, type Ref } from 'vue'

import { useBlogStore } from '@/stores/modules/blog'

const blogStore = useBlogStore()

const emits = defineEmits(['on-type-change'])

interface Props {
  navTypeId: number
}

const props = withDefaults(defineProps<Props>(), {
  navTypeId: 0
})

watch(
  () => props.navTypeId,
  (val) => {
    choseTypeId.value = val
  }
)

interface TypeItem {
  id: number
  name: string
}

let typeList: Ref<TypeItem[]> = ref([])

let choseTypeId = ref(0)

const handleClickType = (item: TypeItem) => {
  if (item.id === choseTypeId.value) {
    return
  }
  choseTypeId.value = item.id
  emits('on-type-change', item.id)
}

interface TypeEnum {
  [key: number]: string
}

const TagType = () => {
  tagType().then((res) => {
    typeList.value = res.data
    typeList.value.unshift({
      id: 0,
      name: '全部'
    })

    let typeEnum: TypeEnum = {}
    typeList.value.forEach((item) => {
      typeEnum[item.id] = item.name
    })
    blogStore.setTypeList(typeList.value)
    blogStore.setTypeEnum(typeEnum)
  })
}

onBeforeMount(() => {
  TagType()
})
</script>
<style lang="less" scoped>
.left-nav-bar-wrap {
  width: @left-nav-bar-width;
  background-color: #fff;
  padding: 10px;
  border-radius: @base-border-radius;
  box-shadow: 0 0 10px #f0f0f0;
}

.type-item {
  padding: 10px;
  font-size: 18px;
  border-radius: @base-border-radius;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
}

.type-item-active {
  background-color: @base-color-2 !important;
}
</style>
