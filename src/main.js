import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/index.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'



// Vue.use(VueContextMenu)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App).use(store).use(router).use(pinia).use(ContextMenu).use(ElementPlus).mount('#app')
