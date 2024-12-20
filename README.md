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


# 修改菜单原生样式(文档中原生)
1. `<style lang="scss">`
2. 在 `devtool` 中找到类名
  ``` scss
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
  ```

# 要将 selectedItem 设置成 ref(memoStore.memos[0]), 否则会出现刷新页面时 main 区域为空


# python路径出错
1. 找到本地 Python 安装路径 
``` bash
which python 
```
2. 找到/node_modules/dmg-builder/out/dmg.js
3. 搜索"/usr/bin/python" 
4. 将其替换成 `Python` 路径




# 0.5.0更新 2024-12-20 14:44
## 刷新页面,如果点击除第一个的任意备忘录,直接修改标题,侧边栏不更新,失去焦点后也不会更新
解决方法: 同下


## 刷新页面,前面不论怎么样,只要失去一次焦点,然后再去编辑,不会同步更新,只有当再次失去焦点时,才会更新,并且如果编辑后不主动失去焦点的话,再刷新页面,数据会丢失,不会储存到pinia
解决方法: 将 `<textarea>` 上的 `@blur` 事件改成 `@input` 事件

## 配置更新
1. 将 node 版本 20.0.0 ->20.9.0
2. electron 版本 13.6.9 -> 18.3.15
3. electron-builder 版本 22.4.13 -> 25.1.8

## 新功能:
1. 添加最后修改日期
2. 左侧栏高亮当前编辑的 MeMo



# 0.6.0 更新 2024-12-20 16:58
## 针对 electron-builder 做了些更改, 目前还是无法打包,还是链接问题