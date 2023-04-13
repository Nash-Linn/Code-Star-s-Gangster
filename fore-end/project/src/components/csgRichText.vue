<template>
  <div class="csg-rich-text-wrap" @click="handleClickEdit">
    <Toolbar
      v-if="props.toolbar"
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
    />
    <Editor
      v-model="valueHtml"
      class="editor"
      :defaultConfig="editorConfig"
      @onCreated="handleCreated"
    />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import type { IToolbarConfig, IEditorConfig, IDomEditor } from '@wangeditor/editor'
import { baseURL, requestTimeout } from '@/config'
import { getToken } from '@/utils/token'
import { useUserStore } from '@/stores/modules/user'

const userStore = useUserStore()
const emits = defineEmits(['update:modelValue'])

interface Props {
  modelValue: string
  toolbar?: boolean
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  toolbar: true,
  readonly: false
})

const token = getToken()
// 内容 HTML
const valueHtml = computed({
  get: () => props.modelValue || '',
  set: (val) => {
    emits('update:modelValue', val)
  }
})

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

const toolbarConfig: Partial<IToolbarConfig> = {
  excludeKeys: ['group-video', 'fullScreen', 'undo', 'redo']
}

const editorConfig: Partial<IEditorConfig> = {
  placeholder: props.readonly ? '' : '请输入内容...',
  readOnly: false,
  scroll: false,
  MENU_CONF: {
    uploadImage: {}
  }
}

type InsertFnType = (url: string, alt: string, href: string) => void

editorConfig.MENU_CONF!.uploadImage = {
  server: baseURL + '/blogsManage/uploadfile',
  // form-data fieldName ，默认值 'wangeditor-uploaded-image'
  fieldName: 'file',

  // // 小于该值就插入 base64 格式（而不上传），默认为 0
  // base64LimitSize: 10 * 1024, // 5kb

  // 单个文件的最大体积限制，默认为 2M
  maxFileSize: 1 * 1024 * 1024, // 1M

  // 最多可上传几个文件，默认为 100
  maxNumberOfFiles: 10,

  // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
  allowedFileTypes: ['image/*'],

  // 将 meta 拼接到 url 参数中，默认 false
  metaWithUrl: false,

  // 自定义增加 http  header
  headers: {
    Authorization: `Bearer ${token}`
  },
  // 超时时间，默认为 10 秒
  timeout: requestTimeout,

  // 自定义插入图片
  customInsert(res: any, insertFn: InsertFnType) {
    let { url, alt, href } = res.data.data
    url = baseURL + `/blogsManage/image/${userStore.getUsercode}/` + url

    insertFn(url, alt, href)
  }
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor: IDomEditor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
  if (props.readonly) {
    editor.disable()
  }
}

const handleClickEdit = () => {
  editorRef.value.focus()
}
</script>
<style lang="less" scoped>
.csg-rich-text-wrap {
  width: 100%;
  height: inherit;
  display: flex;
  flex-direction: column;

  :deep(.w-e-scroll) {
    div {
      padding: 0;
    }
  }
}
</style>
