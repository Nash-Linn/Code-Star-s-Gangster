<template>
  <div class="container-wrap">
    <csg-card class="base-info-wrap">
      <csg-forms ref="formRef" :model="baseInfo" class="form-wrap">
        <div class="form-part1">
          <csg-form-item class="form-item" label="文章标题">
            <csg-input formId="username" v-model="baseInfo.title" required />
          </csg-form-item>
        </div>
        <div class="form-part2">
          <csg-form-item class="form-item form-cover" label="文章封面">
            <csg-upload type="pictureCard" @change="handleCoverChange" :limit="1" />
          </csg-form-item>
          <csg-form-item class="form-item form-summary" label="文章摘要">
            <csg-textarea class="textarea-summary" v-model="baseInfo.summary" type="textarea" />
          </csg-form-item>
        </div>
      </csg-forms>
      <div class="button-wrap">
        <csg-button class="button" @click="handlePublish">发布</csg-button>
      </div>
    </csg-card>
    <csg-card>
      <csgRichText v-model:model-value="valueHtml" class="pulish-blog-wrap" />
    </csg-card>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'

import csgRichText from '@/components/csgRichText.vue'

// 内容 HTML
const valueHtml = ref('')

const baseInfo = reactive({
  title: '',
  cover: null,
  summary: ''
})

const handleCoverChange = (val: any) => {
  baseInfo.cover = val.file
}

const handlePublish = () => {
  console.log('valueHtml.value', valueHtml.value)
  console.log('baseInfo.title', baseInfo.title)
  console.log('baseInfo.cover', baseInfo.cover)
  console.log('baseInfo.summary', baseInfo.summary)
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

    .form-part2 {
      display: flex;

      .form-cover {
        margin-right: 20px;
      }

      .form-summary {
        flex-grow: 1;

        .textarea-summary {
          min-height: 100px;
          :deep(.csg-textarea-inner) {
            min-height: 100px;
          }
        }
      }
    }
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
