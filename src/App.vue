<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
// import { useMemoStore } from '../store/index'
// 组件挂载时执行一些初始化逻辑（例如，初始化数据或状态）
onMounted(() => {
  console.log('App.vue 已挂载')

})
</script>

<style>

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: Arial, sans-serif;
  /* overflow: hidden; */
}

#app {
  height: 100%;
  color: #333;
  overflow-y: auto;
}
</style>