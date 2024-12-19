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