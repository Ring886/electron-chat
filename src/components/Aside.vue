<template>
  <aside 
    class="resize-container bg-gray-800 text-white p-4 py-10 h-screen overflow-y-auto" 
    :style="{ width: sidebarWidth + 'px' }" 
    style="user-select: none;">
    <div class="bg-gray-800 fixed left-0 top-0 h-12" :style="{ width: sidebarWidth + 'px'}"></div>
    <h1 class="text-2xl font-bold mb-4 mt-4">随心记</h1>
    <ul class="space-y-2">
      <!-- 循环显示备忘录 -->
      <li v-for="memo in memoStore.memos" :key="memo.id"
          class="block hover:bg-gray-700 p-2 rounded cursor-pointer" 
          @click="handleClick(memo)" @contextmenu="showContextMenu($event, memo)">
        
          <!-- <context-menu
            v-model:show="show"
            :options="menuOptions"
          >
            <context-menu-item label="删除" @click="onDelete" />
          </context-menu> -->

        <h1>{{ memo.title }}</h1>
        <a>{{ memo.text }}</a>
      </li>
    </ul>

    <!-- 右侧拖动条 -->
    <div class="resize-handle" @mousedown="startResize"></div>
  </aside>
</template>

<script setup lang="js">
  import { ref, defineEmits, h } from 'vue'
  import { useMemoStore } from '../store/index'
  import ContextMenu from '@imengyu/vue3-context-menu'
  import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'

  
  const emit = defineEmits()  // 定义 emit 以便向父组件传递数据
  const memoStore = useMemoStore()  // 引入 Pinia store
  const sidebarWidth = ref(200)  // 默认宽度
  let startX = 0
  let startWidth = 0
  const selectedMemo = ref(null)  // 用于存储被右键点击的备忘录



  // 显示菜单的标志
  const show = ref(false)

  // 菜单的位置和配置
  const menuOptions = ref({
    items: [
      {
        label: h('div', {
          style: {
            width: '5px',
            fontSize: '12px',
            // color: '#f98',
            'text-align': 'center'
          }
        }, "删除"),
        onClick: () => {
          onDelete(selectedMemo.value)
        }
      }
    ],
    zIndex: 1000,
    theme: 'mac',
    minWidth: 40,
    x: 0,
    y: 0
  })

  // 右键点击时显示菜单
  const showContextMenu = (e, memo) => {
    selectedMemo.value = memo  // 设置当前选中的备忘录
    e.preventDefault() // 阻止默认的右键菜单
    show.value = true
    menuOptions.value.x = e.clientX
    menuOptions.value.y = e.clientY
    ContextMenu.showContextMenu(menuOptions);
    // console.log(menuOptions.value.x)
    // console.log(menuOptions.value.y)
    // console.log(show.value)
    // console.log(menuOptions.value)
  }

  // 删除操作
  const onDelete = (memo) => {
    // alert(memo.id, memo.index)
    const index = memoStore.memos.findIndex(item => item.id === memo.id)
    if (index !== -1) {
      memoStore.memos.splice(index, 1)
    }
    show.value = false // 关闭菜单

    if(memoStore.memos.length === 0) window.location.reload()
  }

  



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
    emit('BarWidth', sidebarWidth.value)
    // console.log(sidebarWidth.value)
  }

  // 点击某个备忘录项时，传递给父组件
  const handleClick = (memo) => {
    emit('itemSelected', memo)  // 触发事件并传递选中的备忘录
    // console.log(memo.id)
  }
</script>

<style lang="scss">
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
  .mx-menu-bar.mac, .mx-context-menu.mac {
    padding: 4px 0;
    & {
      --mx-menu-hover-backgroud: rgb(129, 143, 182);
      --mx-menu-active-backgroud: rgb(76, 104, 183);
    }
  }
  .mx-context-menu-item .mx-item-row {
    display: block;
  }
</style>