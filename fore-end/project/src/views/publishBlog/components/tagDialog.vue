<template>
  <csg-dialog v-model="dialogVisible" title="添加标签">
    <template #content>
      <div class="content">
        <div class="left">
          <csg-scroll height="300">
            <div
              class="tag-type"
              :class="[tagTypeIndex == index ? 'tag-type-selected' : '']"
              v-for="(item, index) in tagTypeList"
              :key="index"
              @click="handleClickTagType(index, item.id)"
            >
              <div class="tag-type-name">{{ item.name }}</div>
            </div>
            <div
              class="tag-type"
              :class="[tagTypeIndex == -1 ? 'tag-type-selected' : '']"
              @click="handleNewTag"
            >
              <div class="tag-type-name">新增标签</div>
            </div>
          </csg-scroll>
        </div>
        <div class="right">
          <csg-scroll height="300">
            <template v-if="addNew">
              <csg-select
                v-model="newTagInfo.tagType"
                class="tag-type-select"
                filter
                :options="tagTypeList"
                placeholder="选择或输入标签分类"
                label-name="name"
                value-name="id"
                @on-change="handleSelectTagTypeChange"
              />
              <csg-input v-model="newTagInfo.tag" placeholder="输入标签名" />
              <div class="add-tag-button">
                <csg-button @click="handleAddNewTag">新增标签</csg-button>
              </div>
            </template>
            <template v-else>
              <csg-tag
                class="tag-item"
                v-for="(item, index) in tagList"
                :key="index"
                @click="handleClickTag(item)"
              >
                {{ item.name }}</csg-tag
              >
            </template>
          </csg-scroll>
        </div>
      </div>
    </template>
  </csg-dialog>
</template>
<script setup lang="ts">
import { ref, reactive, computed, onBeforeMount } from 'vue'
import { tagType, tag } from '@/api/tagManage/tagManage'
import type { TagItem } from '../interface/tag'
interface Props {
  modelValue: boolean
}
const props = withDefaults(defineProps<Props>(), {})
const emits = defineEmits(['update:modelValue', 'click-tag'])

const dialogVisible = computed({
  get: () => props.modelValue || false,
  set: (value) => {
    emits('update:modelValue', value)
  }
})

//标签类别
interface TagTypeItem {
  id: number
  name: string
}

const tagTypeList = reactive<TagTypeItem[]>([])
const tagList = ref<TagItem[]>([])
const TagType = async () => {
  tagTypeList.length = 0
  await tagType().then((res) => {
    tagTypeList.push(...res.data)
  })
}

const tagTypeIndex = ref()
const handleClickTagType = (index: number, id: number) => {
  addNew.value = false
  tagTypeIndex.value = index
  Tag(id)
}

const handleClickTag = (tag: TagItem) => {
  emits('click-tag', tag)
}

const Tag = (id: number) => {
  tag(id).then((res) => {
    tagList.value = res.data
  })
}

//新增标签
const addNew = ref(false)
const newTagInfo = reactive({
  tagType: '',
  tag: '',
  isNewType: false
})
//切换至新增标签
const handleNewTag = () => {
  tagTypeIndex.value = -1
  addNew.value = true
}

//新增标签中  标签类型改变
const handleSelectTagTypeChange = (val: any) => {
  console.log('val', val)
}

const handleAddNewTag = () => {}

const beforeMountOnload = async () => {
  await TagType()
  tagTypeIndex.value = 0
  Tag(tagTypeList[0].id)
}

onBeforeMount(() => {
  beforeMountOnload()
})
</script>
<style lang="less" scoped>
.content {
  margin-top: 10px;
  display: flex;
  .left {
    width: 100px;
    border: 1px solid @base-color;
    padding: 10px;
    border-radius: @base-border-radius;
    .tag-type {
      box-sizing: border-box;
      border: 1px solid @base-color;
      border-radius: @base-border-radius;
      margin-bottom: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: all 0.5s;

      .tag-type-name {
        padding: 5px 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &:hover {
        background-color: @base-color;
        color: #fff;
      }
    }
    .tag-type-selected {
      background-color: @base-color !important
        ;
      color: #fff !important;
    }
  }

  .right {
    width: 100%;
    border: 1px solid @base-color;
    padding: 10px;
    border-radius: @base-border-radius;
    margin-left: 10px;

    .tag-item {
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
}

.tag-type-select {
  margin-bottom: 10px;
}

.add-tag-button {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
</style>
