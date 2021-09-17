import { createRouter, createWebHistory } from 'vue-router'

const routes = [
 // {
 //   path: '/',
 //   name: 'Home',
 //   component: Home
 // },
  
  {
    path: '/',
    name: 'Layers',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/ThePanelTabsVertical.vue')
  },
  {
    path: '/panel1',
    name: 'panel1',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/ThePanelTabsVertical.vue')
  },
  {
    path: '/panel2',
    name: 'panel2',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/ThePanelTabsVertical.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
