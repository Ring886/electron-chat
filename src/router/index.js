import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '@/views/About.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  },
  { path: '/:pathMatch(.*)', redirect: '/' },
]


// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes
// })

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),  // 使用 hash 模式
  routes  // 路由配置
})


// Vue2 写法，摘自https://blog.csdn.net/qq_40994260/article/details/107440478
// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })



// router.beforeEach((to, from, next) => {
//   // 如果路由没有匹配，重定向到 /about
//   if (!to.matched.length) {
//     next('/about');
//   } else {
//     next();
//   }
// });



export default router
