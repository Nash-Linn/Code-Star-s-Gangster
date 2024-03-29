<template>
  <div v-if="props.type == 'pictureCard'" class="csg-upload-wrap">
    <div class="preview-wrap">
      <div v-for="(item, index) in fileList" :key="index" class="preview">
        <template v-if="item">
          <img :src="item.src" alt="" />
        </template>
        <div v-else class="placeholder"></div>
      </div>
      <div v-if="!props.limit || (props.limit && fileList.length < props.limit)" class="preview">
        <div class="placeholder"></div>
      </div>
    </div>
    <div class="delete-wrap">
      <div v-for="(item, index) in fileList" :key="index" class="preview">
        <template v-if="item">
          <div class="delete" @click="handleDelete(index)"></div>
        </template>
      </div>
      <div
        v-if="!props.limit || (props.limit && fileList.length < props.limit)"
        class="input-extra"
      >
        <input
          :accept="props.accept"
          class="input"
          type="file"
          title=""
          :multiple="props.multiple"
          @change="handleFileChange"
        />
      </div>
    </div>
  </div>
  <div v-else class="csg-upload-button-wrap">
    <slot><csg-button>上传文件</csg-button> </slot>
    <input
      class="input"
      type="file"
      :accept="props.accept"
      title=""
      :multiple="props.multiple"
      @change="handleFileChange"
    />
  </div>
</template>
<script setup lang="ts">
import { isEmpty } from '@/utils/validate'
import { ref, reactive, toRaw, watch } from 'vue'

interface Props {
  type: 'defalut' | 'pictureCard'
  multiple?: boolean
  limit?: number
  fileList?: any[]
  accept?: string
}

interface FileItem {
  name: string
  raw: any
  src?: any
}

const props = withDefaults(defineProps<Props>(), {
  type: 'defalut',
  multiple: true
})

const emits = defineEmits(['change', 'exceed'])

const file = ref()

const fileList: any[] = reactive([])

const handleFileChange = (event: Event) => {
  let input = event.target as HTMLInputElement
  file.value = input.files as FileList

  for (let item of file.value) {
    if (item) {
      if (props.limit && fileList.length >= props.limit) {
        emits('exceed')
        return
      }

      let fileItem: FileItem = reactive({
        name: '',
        src: null,
        raw: null
      })

      if (item.type.search('image') != -1) {
        let reader = new FileReader()
        reader.readAsDataURL(item)
        reader.onload = function (e: Event) {
          //成功读取文件
          fileItem.src = (e.target as FileReader).result
        }
      }
      fileItem.name = item.name
      fileItem.raw = item
      fileList.push(fileItem)

      emits('change', {
        file: fileItem,
        fileList: toRaw(fileList)
      })
    }
  }
}

const handleDelete = (index: any) => {
  fileList.splice(index, 1)

  emits('change', {
    fileList: toRaw(fileList)
  })
}

watch(
  () => props.fileList,
  (val) => {
    fileList.length = 0
    if (!isEmpty(val)) {
      fileList.push(...(val as any[]))
    }
  },
  {
    immediate: true,
    deep: true
  }
)
</script>
<style scoped lang="less">
.input {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.csg-upload-wrap {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin-bottom: -10px;
  z-index: 0;

  .preview-wrap {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .preview {
    position: relative;
    width: 100px;
    height: 100px;
    flex-shrink: 0;
    border-radius: @base-border-radius;
    border: 1px solid @base-color-border;
    overflow: hidden;
    margin-right: 10px;
    margin-bottom: 10px;

    &:last-of-type {
      margin-right: 0;
    }
  }

  .delete-wrap {
    position: absolute;
    z-index: 3;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    overflow: hidden;
    top: 0;

    .delete {
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 2px solid @base-color-border;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      cursor: pointer;
      opacity: 0;
      transition: 0.5s;

      &:before {
        display: block;
        content: '';
        width: 50%;
        height: 3px;
        background-color: @base-color-border;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
      }

      &:hover {
        opacity: 1;
      }
    }
  }

  .input-extra {
    height: 100px;
    width: 100px;
    margin-bottom: 10px;
    cursor: pointer;
  }

  .placeholder {
    width: 100%;
    height: 100%;
    position: relative;

    &:before {
      display: block;
      content: '';
      width: 50%;
      height: 3px;
      background-color: @base-color-border;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &:after {
      display: block;
      content: '';
      width: 3px;
      height: 50%;
      background-color: @base-color-border;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

.csg-upload-button-wrap {
  position: relative;
  .input {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
