<template>
  <div class="csg-rich-text-wrap" @click="handleClickEdit">
    <div class="toolbar">
      <Toolbar
        v-if="props.toolbar"
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
      />
    </div>
    <Editor
      v-model="valueHtml"
      class="editor"
      :defaultConfig="editorConfig"
      @onCreated="handleCreated"
    />
  </div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, shallowRef, computed, reactive } from 'vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import type { IToolbarConfig, IEditorConfig, IDomEditor, IButtonMenu } from '@wangeditor/editor'
import { SlateTransforms, Boot } from '@wangeditor/editor'
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

// class MyButtonMenuClass implements IButtonMenu {
//   title = '生成目录'
//   tag = 'button'

//   constructor() {
//     this.title = '生成目录' // 自定义菜单标题
//     this.tag = 'button'
//   }
//   // 获取菜单执行时的 value
//   getValue() {
//     // 用不到 getValue
//     return ''
//   }

//   // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
//   isActive() {
//     return false
//   }
//   // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
//   isDisabled() {
//     return false
//   }

//   // 点击菜单时触发的函数
//   exec(editor: any) {
//     let headers = editor.getElemsByTypePrefix('header')
//     let nodes = headers.map((item: any) => {
//       let node: any = {
//         type: 'paragraph',
//         children: [
//           {
//             text: item.children[0].text,
//             color: 'rgb(78, 210, 210)'
//           }
//         ]
//       }
//       if (item.type === 'header1') {
//         node.indent = '2em'
//       }

//       if (item.type === 'header2') {
//         node.indent = '4em'
//       }
//       if (item.type === 'header3') {
//         node.indent = '6em'
//       }
//       if (item.type === 'header4') {
//         node.indent = '8em'
//       }
//       if (item.type === 'header5') {
//         node.indent = '10em'
//       }

//       return node
//     })
//     const divider = {
//       type: 'divider',
//       children: [
//         {
//           text: ''
//         }
//       ]
//     }

//     const menu = {
//       type: 'paragraph',
//       children: [
//         {
//           text: '目录',
//           bold: true
//         }
//       ]
//     }
//     nodes.unshift(menu)
//     nodes.push(divider)
//     SlateTransforms.insertNodes(editor, nodes)
//   }
// }
// const myButtonMenu = {
//   key: 'createMenu', // menu key ，唯一。注册之后，可配置到工具栏
//   factory() {
//     return new MyButtonMenuClass()
//   }
// }

// Boot.registerMenu(myButtonMenu)

const toolbarConfig: Partial<IToolbarConfig> = {
  // insertKeys: { index: 27, keys: ['createMenu'] },
  excludeKeys: [
    'headerSelect',
    'bold',
    'color',
    'bgColor',
    'group-video',
    'fullScreen',
    'undo',
    'redo'
  ]
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

  .toolbar {
    position: sticky;
    top: 50px;
    z-index: 9;
  }
}
</style>
