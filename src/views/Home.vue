<template>
  <div class="flex">
    <!-- 左侧栏：导航栏或菜单 -->

      <Aside @itemSelected="handleItemSelected" />
    
    <Setting :isOpen="isSidebarOpen" />


    <!-- 右侧栏：主要内容区域 -->
    <main class="flex-1 bg-gray-100 overflow-auto relative h-screen" >
      <header class="text-xl py-2 px-5 h-12">
        <a @click="toggleSidebar" class="text-2xl absolute left-4 cursor-pointer hover:bg-gray-300">📑</a>
        <a @click="newText" class="text-2xl absolute cursor-pointer right-5 hover:bg-gray-300 ">📝</a>
      </header>
      <hr class="mx-5 border-gray-300">



      <div v-if="selectedItem" class="p-5">
        <!-- 可编辑标题 -->
        <h2 class="text-2xl font-bold">
          <input v-model="selectedItem.title" type="text"
            class="w-full bg-transparent border-b-2 border-gray-300 p-1 text-2xl font-bold outline-none" />
        </h2>

        <!-- 可编辑文本内容 -->
        <!-- <p class="text-lg">
          <textarea v-model="selectedItem.text"
            class="w-full bg-transparent border-b-2 border-gray-300 p-1 text-lg outline-none" rows="12" 
            @blur="changeText"></textarea>
        </p> -->
        <textarea v-model="selectedItem.text" class="text-lg bg-transparent border-b-2 border-gray-300 p-1 text-lg outline-none w-full" rows="12" 
        @blur="changeText"></textarea>
         
      </div>

    </main>
  </div>
</template>

<script setup>
  import { ref, onUnmounted } from 'vue'
  import { useMemoStore } from '../store/index'
  import Aside from "../components/Aside.vue"
  import Setting from "../components/Setting.vue"

  // 引入 Pinia store
  const memoStore = useMemoStore()

  // 控制侧边栏的展开与收起
  const isSidebarOpen = ref(false)

  // Aside 子组件通信
  const selectedItem = ref(null)

  // 切换侧边栏的状态
  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  // 处理从 Aside 传递过来的选中项
  const handleItemSelected = (item) => {
    selectedItem.value = item
  }

  // 失去焦点后更新数据
  const changeText = () => {
    if (selectedItem.value) {
      // 使用 Pinia 的 updateMemo 方法更新备忘录
      memoStore.updateMemo(selectedItem.value.id, selectedItem.value.title, selectedItem.value.text)
      console.log(selectedItem.value.id)
    }
  }

  const newText = () => {
    memoStore.addMemo('未命名标题', '')
  }

  onUnmounted(() => {
    console.log('hhh')
    changeText()
  })

</script>

<style scoped>
  header {
    -webkit-app-region: drag;
    /* position: absolute;
    top: 0; */
  }
  input, textarea {
    background-color: transparent;
    border: none;
    outline: none;
    resize: none;
    caret-color: #FF6347;
  }
  input:focus, textarea:focus {
    border-bottom-color: #4A90E2;
    /* 修改聚焦时边框的颜色 */
  }
  .aside {
    max-width: 100%;
    /* width: auto; */
  }
</style>