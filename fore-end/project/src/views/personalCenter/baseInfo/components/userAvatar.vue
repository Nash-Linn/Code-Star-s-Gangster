<template>
  <div>
    <csg-upload @change="handleChange">
      <div class="avatar">
        <img :src="userStore.getAvatar" alt="" />
        <div class="icon">
          <svg
            t="1680772165049"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1949"
            width="60"
            height="60"
          >
            <path
              d="M460.074667 192a32 32 0 0 1 45.226666 0l241.365334 241.365333a32 32 0 0 1 0 45.226667l-271.530667 271.530667a32 32 0 0 1-22.613333 9.386666H211.157333a32 32 0 0 1-32-32v-241.365333a32 32 0 0 1 9.386667-22.613333L460.074667 192z m22.613333 67.882667l-239.530667 239.530666v196.096h196.096l239.530667-239.530666-196.096-196.096zM181.333333 832a32 32 0 0 1 32-32h106.666667a32 32 0 0 1 0 64H213.333333a32 32 0 0 1-32-32zM373.333333 832a32 32 0 0 1 32-32h128a32 32 0 0 1 0 64h-128a32 32 0 0 1-32-32zM586.666667 832a32 32 0 0 1 32-32h170.666666a32 32 0 0 1 0 64h-170.666666a32 32 0 0 1-32-32z"
              fill="#cccccc"
              p-id="1950"
            ></path>
          </svg>
        </div>
      </div>
    </csg-upload>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user'

const userStore = useUserStore()

const handleChange = (val: any) => {
  console.log('val', val)
}
</script>
<style lang="less" scoped>
.avatar {
  position: relative;
  cursor: pointer;

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    transition: 0.5s;
  }

  .icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: 0.5s;
  }

  &:hover {
    .icon {
      opacity: 1;
    }

    img {
      width: 100px;
      height: 100px;
    }
  }
}
</style>
