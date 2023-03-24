<template>
  <div class="csg-message-wrap" :class="messageStyle">
    <span v-if="props.type == 'success'" class="icon">
      <svg
        t="1679648847096"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1973"
        width="20"
        height="20"
      >
        <path
          d="M512 64c126.677333 3.328 232.192 47.146667 316.501333 131.498667C912.853333 279.808 956.672 385.28 960 512c-3.328 126.677333-47.146667 232.192-131.498667 316.501333C744.192 912.853333 638.72 956.672 512 960c-126.677333-3.328-232.192-47.146667-316.501333-131.498667C111.146667 744.192 67.328 638.72 64 512c3.328-126.677333 47.146667-232.192 131.498667-316.501333C279.808 111.146667 385.28 67.328 512 64z m-56.021333 536.021333l-98.986667-99.029333a39.509333 39.509333 0 0 0-27.477333-11.008 37.034667 37.034667 0 0 0-27.008 11.52 36.266667 36.266667 0 0 0-11.52 26.453333c0.042667 10.026667 3.712 19.029333 11.008 27.008l127.018666 127.018667a36.693333 36.693333 0 0 0 27.008 11.008 36.693333 36.693333 0 0 0 27.008-11.008l262.997334-262.997333c10.026667-10.026667 13.226667-22.186667 9.514666-36.522667a35.072 35.072 0 0 0-27.008-27.008c-14.336-3.669333-26.496-0.512-36.48 9.514667l-236.032 235.008z"
          fill="#088108"
          p-id="1974"
        ></path>
      </svg>
    </span>
    <span v-if="props.type == 'warn'" class="icon">
      <svg
        t="1679649980444"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2200"
        width="20"
        height="20"
      >
        <path
          d="M512 64c126.677333 3.328 232.192 47.146667 316.501333 131.498667C912.853333 279.808 956.672 385.28 960 512c-3.328 126.677333-47.146667 232.192-131.498667 316.501333C744.192 912.853333 638.72 956.672 512 960c-126.677333-3.328-232.192-47.146667-316.501333-131.498667C111.146667 744.192 67.328 638.72 64 512c3.328-126.677333 47.146667-232.192 131.498667-316.501333C279.808 111.146667 385.28 67.328 512 64zM512 256c-17.322667 0-31.658667 6.357333-43.008 19.029333A58.197333 58.197333 0 0 0 453.973333 320l23.04 256a35.925333 35.925333 0 0 0 11.477334 22.485333 34.048 34.048 0 0 0 23.466666 8.533334 33.664 33.664 0 0 0 23.466667-8.533334 36.181333 36.181333 0 0 0 11.52-22.485333l23.04-256a57.984 57.984 0 0 0-15.018667-44.970667A55.381333 55.381333 0 0 0 511.914667 256H512z m0 512c14.677333-0.64 26.88-5.674667 36.522667-15.018667 9.642667-9.344 14.506667-21.333333 14.506666-35.968A49.578667 49.578667 0 0 0 512 665.984a49.450667 49.450667 0 0 0-50.986667 51.029333c0 14.677333 4.821333 26.666667 14.506667 35.968 9.642667 9.301333 21.802667 14.293333 36.48 15.018667z"
          fill="#e0620d"
          p-id="2201"
          data-spm-anchor-id="a313x.7781069.0.i4"
          class=""
        ></path>
      </svg>
    </span>

    <span class="message">
      {{ props.message }}
    </span>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
interface Props {
  type: string
  message?: string
  showtime?: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  message: '默认信息',
  showtime: 3000
})

const messageStyle = computed(() => {
  let bgStyle: string
  switch (props.type) {
    case 'success':
      bgStyle = 'success-bg'
      break

    case 'warn':
      bgStyle = 'warn-bg'
      break

    case 'danger':
      bgStyle = 'danger-bg'
      break

    default:
      bgStyle = 'default-bg'
      break
  }

  return bgStyle
})
</script>
<style scoped lang="less">
.success-bg {
  background-color: @base-success-color-2 !important;
}
.warn-bg {
  background-color: @base-warn-color-2 !important;
}
.danger-bg {
  background-color: @base-danger-color !important;
}
.default-bg {
  background-color: @base-color !important;
}
.csg-message-wrap {
  background-color: @base-color;
  border-radius: @base-border-radius;
  position: absolute;
  padding: 10px;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;

  display: flex;
  align-items: center;

  .message {
    display: block;
    flex-grow: 1;
    margin-right: 10px;
  }
}

.icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
</style>
