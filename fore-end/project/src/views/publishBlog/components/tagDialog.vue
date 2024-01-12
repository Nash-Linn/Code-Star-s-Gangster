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
              v-if="isAdmin()"
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
            <template v-if="tagTypeIndex == -1">
              <csg-forms ref="formRef" :model="newTagInfo" :rules="ruleValidate">
                <csg-form-item formId="tagType">
                  <csg-select
                    v-model="newTagInfo.tagType"
                    filter
                    :options="tagTypeList"
                    placeholder="选择或输入标签分类"
                    label-name="name"
                    value-name="id"
                    @on-change="handleSelectTagTypeChange"
                  />
                </csg-form-item>
                <csg-form-item formId="tag">
                  <csg-input v-model="newTagInfo.tag" placeholder="输入标签名" />
                </csg-form-item>
              </csg-forms>

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
import { ref, reactive, inject, computed, onBeforeMount } from 'vue'
import { tagType, tag, addTag } from '@/api/tagManage/tagManage'
import type { TagItem } from '../interface/tag'
import { isAdmin } from '@/utils/permission'

const $csgMessage: any = inject('$csgMessage')

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
const GetTagTypeList = async () => {
  tagTypeList.length = 0
  await tagType().then((res) => {
    tagTypeList.push(...res.data)
  })
}

const tagTypeIndex = ref()
const handleClickTagType = (index: number, id: number) => {
  tagTypeIndex.value = index
  Tag(id)
}

const handleClickTag = (tag: TagItem) => {
  emits('click-tag', tag)
}

const Tag = async (id: number) => {
  await tag(id).then((res) => {
    tagList.value = res.data
  })
}

//新增标签
const newTagInfo = reactive({
  tagType: '',
  tagType1: '',
  tag: '',
  isNewType: false
})
const initNewTagInfo = () => {
  newTagInfo.isNewType = false
  newTagInfo.tag = ''
  newTagInfo.tagType = ''
}

const ruleValidate = reactive({
  tagType: [
    {
      required: true,
      message: '请选择或输入标签分类',
      trigger: 'blur'
    }
  ],
  tag: [
    {
      required: true,
      message: '请输入新增的标签',
      trigger: 'blur'
    }
  ]
})

const formRef = ref()
//切换至新增标签
const handleNewTag = () => {
  tagTypeIndex.value = -1
}

//新增标签中  标签类型改变
const handleSelectTagTypeChange = (val: any) => {
  newTagInfo.isNewType = val.isNew
  newTagInfo.tagType = val.value
}

const handleAddNewTag = () => {
  if (!formRef.value.verify()) {
    return false
  }
  AddTag(newTagInfo)
}

const addTagSuccess = async (typeId: any) => {
  await GetTagTypeList()
  let index = tagTypeList.findIndex((item) => item.id == typeId)
  tagTypeIndex.value = index
  initNewTagInfo()
  await Tag(typeId)
}

const AddTag = (data: { isNewType: boolean; tagType: any; tag: string }) => {
  addTag(data)
    .then((res) => {
      if (res.success) {
        $csgMessage({
          type: 'success',
          message: '新增成功！'
        })
        addTagSuccess(res.data.typeId)
      }
    })
    .catch((err) => {
      console.log('err', err)
      if (!err.success) {
        $csgMessage({
          type: 'danger',
          message: err.msg
        })
      }
    })
}

const beforeMountOnload = async () => {
  await GetTagTypeList()
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
  display: flex;
  justify-content: center;
}
</style>
