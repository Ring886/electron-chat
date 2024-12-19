<template>
  <aside 
    class="resize-container bg-gray-800 text-white p-4 py-10 h-screen overflow-y-auto" 
    :style="{ width: sidebarWidth + 'px' }" 
    style="user-select: none;">
    <h1 class="text-2xl font-bold mb-4">随心记</h1>
    <ul class="space-y-2">
      <!-- 循环显示备忘录 -->
      <li v-for="memo in memoStore.memos" :key="memo.id"
          class="block hover:bg-gray-700 p-2 rounded cursor-pointer" 
          @click="handleClick(memo)">
        <h1>{{ memo.title }}</h1>
        <a>{{ memo.text }}</a>
      </li>
    </ul>

    <!-- 右侧拖动条 -->
    <div class="resize-handle" @mousedown="startResize"></div>
  </aside>
</template>

<script setup>
  import { ref, defineEmits } from 'vue'
  import { useMemoStore } from '../store/index'

  const emit = defineEmits()  // 定义 emit 以便向父组件传递数据
  const memoStore = useMemoStore()  // 引入 Pinia store
  const sidebarWidth = ref(200)  // 默认宽度
  let startX = 0
  let startWidth = 0

  // 处理鼠标按下事件，开始拖动
  const startResize = (e) => {
    e.preventDefault()

    // 获取鼠标初始位置和右侧边栏的初始宽度
    startX = e.clientX
    startWidth = sidebarWidth.value

    // 监听鼠标移动和松开事件
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  // 处理鼠标移动事件，更新宽度
  const onMouseMove = (e) => {
    const delta = e.clientX - startX  // 计算鼠标移动的距离
    // 设置新的宽度，限制最小宽度为 100px，最大宽度为 600px
    sidebarWidth.value = Math.max(100, Math.min(600, startWidth + delta))
  }

  // 处理鼠标松开事件，结束拖动
  const onMouseUp = () => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  // 点击某个备忘录项时，传递给父组件
  const handleClick = (memo) => {
    emit('itemSelected', memo)  // 触发事件并传递选中的备忘录
    console.log(memo.id)
  }
</script>

<style scoped>
  .resize-container {
    position: relative;
  }

  /* 右侧拖动条 */
  .resize-handle {
    position: absolute;
    top: 0;
    right: -5px; /* 在右边缘显示拖动条 */
    width: 10px;
    height: 100%;
    cursor: ew-resize;  /* 设置鼠标为拖动状态 */
    background-color: rgba(0, 0, 0, 0.2);
  }

  .resize-handle:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }

  a {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.75rem;
  }
</style>