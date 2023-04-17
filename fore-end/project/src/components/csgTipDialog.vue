<template>
  <csg-dialog
    v-model="dialogVisible"
    title="Tip"
    footer
    @on-cancel="handleCancel"
    @on-confirm="handleConfirm"
  >
    <template #content>
      <div class="content">{{ props.message }}</div>
    </template>
  </csg-dialog>
</template>
<script setup lang="ts">
import { computed } from 'vue'
interface Props {
  modelValue: boolean
  message: string
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: false
})

const emits = defineEmits(['update:modelValue', 'on-cancel', 'on-confirm'])

const dialogVisible = computed({
  get: () => props.modelValue || false,
  set: (value) => {
    emits('update:modelValue', value)
  }
})

const handleCancel = () => {
  dialogVisible.value = false
  emits('on-cancel')
}
const handleConfirm = () => {
  emits('on-confirm')
}
</script>
<style lang="less" scoped>
.content {
  margin-top: 10px;
}
</style>
