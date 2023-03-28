<template>
  <div class="pulish-blog-wrap">
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
      />
      <Editor
        style="height: 500px"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        @onCreated="handleCreated"
      />
    </div>

    <div>
      <csg-button @click="handlePublish">发布</csg-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import type { IToolbarConfig, IEditorConfig, IDomEditor } from '@wangeditor/editor'
import { baseURL } from '@/config'
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')

const toolbarConfig: Partial<IToolbarConfig> = {}
const editorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入内容...',
  readOnly: false,
  scroll: true,
  MENU_CONF: {
    uploadImage: {}
  }
}

type InsertFnType = (url: string, alt: string, href: string) => void

editorConfig.MENU_CONF!.uploadImage = {
  server: baseURL + 'blogsManage/uploadfile',
  // form-data fieldName ，默认值 'wangeditor-uploaded-image'
  fieldName: 'file',

  // 单个文件的最大体积限制，默认为 2M
  maxFileSize: 1 * 1024 * 1024, // 1M

  // 最多可上传几个文件，默认为 100
  maxNumberOfFiles: 10,

  // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
  allowedFileTypes: ['image/*'],

  // 将 meta 拼接到 url 参数中，默认 false
  metaWithUrl: false,
  // 超时时间，默认为 10 秒
  timeout: 5 * 1000, // 5 秒

  // 上传之前触发
  onBeforeUpload(file: File) {
    // file 选中的文件，格式如 { key: file }
    console.log('file', file)
    return file

    // 可以 return
    // 1. return file 或者 new 一个 file ，接下来将上传
    // 2. return false ，不上传这个 file
  },

  // 上传进度的回调函数
  onProgress(progress: number) {
    // progress 是 0-100 的数字
    console.log('progress', progress)
  },

  // 单个文件上传成功之后
  onSuccess(file: File, res: any) {
    console.log(`${file.name} 上传成功`, res)
  },

  // 单个文件上传失败
  onFailed(file: File, res: any) {
    console.log(`${file.name} 上传失败`, res)
  },

  // 上传错误，或者触发 timeout 超时
  onError(file: File, err: any, res: any) {
    console.log(`${file.name} 上传出错`, err, res)
  },

  // 自定义插入图片
  customInsert(res: any, insertFn: InsertFnType) {
    const { url, alt, href } = res.data.data
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
}

const handlePublish = () => {
  console.log('valueHtml.value', valueHtml.value)
}
</script>
<style scoped lang="less">
.pulish-blog-wrap {
  width: 100%;
  height: 100%;
  padding: @base-padding;
}
</style>
