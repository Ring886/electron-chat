<template>
  <transition name="sidebar-transition" @before-enter="beforeEnter" @enter="enter" @leave="leave">
    <aside v-if="isOpen" class="fixed top-0 left-0 w-1/4 bg-sky-700 text-white p-4 py-10 h-screen">
      <h2 class="text-xl font-bold mb-4">菜单</h2>
      <ul class="space-y-2">
        <li><a href="#" class="block hover:bg-gray-700 p-2 rounded">吐槽一下</a></li>
        <li><a href="#" class="block hover:bg-gray-700 p-2 rounded">设置</a></li>
        <li><a href="#" class="block hover:bg-gray-700 p-2 rounded">关于我们</a></li>
      </ul>
    </aside>
  </transition>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  isOpen: Boolean
})
</script>

<style lang="scss">
.sidebar-transition-enter-active,
.sidebar-transition-leave-active {
  transition: transform 0.4s ease;
}

.sidebar-transition-enter-from,
.sidebar-transition-leave-to {
  transform: translateX(-100%);
}

.sidebar-transition-enter-to,
.sidebar-transition-leave {
  transform: translateX(0);
}
</style>