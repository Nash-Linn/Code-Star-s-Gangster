<template>
  <div class="container-wrap">
    <csg-card class="base-info-wrap">
      <csg-forms ref="formRef" :model="baseInfo" class="form-wrap">
        <csg-form-item class="form-item" label="文章标题">
          <csg-input formId="username" v-model="baseInfo.title" required />
        </csg-form-item>
        <csg-form-item class="form-item" label="文章封面">
          <csg-upload type="pictureCard" @change="handleCoverChange" />
        </csg-form-item>
        <csg-form-item class="form-item" label="文章摘要">
          <csg-textarea v-model="baseInfo.summary" type="textarea" />
        </csg-form-item>
      </csg-forms>
      <div class="button-wrap">
        <csg-button class="button" @click="handlePublish">发布</csg-button>
      </div>
    </csg-card>
    <csg-card class="pulish-blog-wrap">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
      />
      <Editor
        style="height: 300px"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        @onCreated="handleCreated"
      />
    </csg-card>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'

import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import type { IToolbarConfig, IEditorConfig, IDomEditor } from '@wangeditor/editor'
import { baseURL } from '@/config'

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')

const toolbarConfig: Partial<IToolbarConfig> = {
  excludeKeys: ['group-video', 'fullScreen', 'undo', 'redo']
}

const editorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入内容...',
  readOnly: false,
  scroll: false,
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

const baseInfo = reactive({})

const handleCoverChange = (val: any) => {
  console.log('val', val)
}

const handlePublish = () => {
  console.log('valueHtml.value', valueHtml.value)
}
</script>
<style scoped lang="less">
.container-wrap {
  padding: @base-padding;
}
.base-info-wrap {
  width: 100%;
  padding: @base-padding;

  .form-wrap {
    width: 100%;
  }
}
.pulish-blog-wrap {
  margin-top: 20px;
  width: 100%;
  min-height: calc(@main-height - 340px);
  padding: @base-padding;
  padding-top: 0;
}

.button-wrap {
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
