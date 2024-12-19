<template>
  <aside class="w-1/4 bg-gray-800 text-white p-4 py-10 h-screen overflow-y-auto" style=" user-select: none;">
    <h1 class="text-2xl font-bold mb-4">随心记</h1>
    <ul class="space-y-2">
       <!-- 循环显示备忘录 -->
       <li v-for="memo in memoStore.memos" :key="memo.id"
          class="block hover:bg-gray-700 p-2 rounded cursor-pointer" @click="handleClick(memo)">
        <h1>{{ memo.title }}</h1>
        <a>{{ memo.text }}</a>
      </li>
    </ul>
  </aside>
</template>


<script setup>
  import { defineEmits, defineProps } from 'vue'
  import { useMemoStore } from '../store/index'

  const memoStore = useMemoStore()  // 引入 Pinia store

  const emit = defineEmits()

  // 点击某个备忘录项时，传递给父组件
  const handleClick = (memo) => {
    emit('itemSelected', memo)
    console.log(memo.id)
  }
</script>


<style scoped>
  a {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.75rem;
  }
</style>