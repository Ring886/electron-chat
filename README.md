# 项目初始化
``` bash
vue create electron-todolist
cd electron-todolist
vue add electron-builder
npm install vue-cli-plugin-electron --save-dev
```

# 如何解决 transition 动画进入时没有效果
vue3.0把v-enter的选择器改了，具体改成了v-enter-from。
``` css
.active-enter-active,.active-leave-active{
  transition: all 0.5s;
}
.active-enter-from,.active-leave-to{
   opacity:0;
}
.active-enter-to,.active-leave{
  opacity: 1;
}
```

# h-screen：滚动出现白色区域
这个是固定高度，和窗口高度一致,会裁剪，取消使用

# 父容器如果不设置高度,子元素高度会撑不满父容器

# main 区域双滚动条解决方法
需要对 `div` 设置固定高度,否则出现双滚动条
``` html
<div v-if="selectedItem" class="p-5" :style="`height: ${innerHeight - 100}px;`">
  <!-- 可编辑标题 -->
  <h2 class="text-2xl font-bold">
    <input v-model="selectedItem.title" type="text"
      class="w-full bg-transparent border-b-2 border-gray-300 p-1 text-2xl font-bold outline-none" />
  </h2>
  <textarea v-model="selectedItem.text" class="text-lg bg-transparent border-b-2 border-gray-300 p-1 text-lg outline-none w-full h-full"  
@blur="changeText"></textarea>
</div>
```
``` javascript
const innerHeight = ref(window.innerHeight)
window.addEventListener('resize', () => {
  innerHeight.value = window.innerHeight
})
```