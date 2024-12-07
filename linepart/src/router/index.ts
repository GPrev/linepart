import { createRouter, createWebHistory } from 'vue-router'
import MainMenu from '../views/MainMenuPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'menu',
      component: MainMenu,
    },
    {
      path: '/puzzle',
      name: 'puzzle',
      // route level code-splitting
      // this generates a separate chunk for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PuzzlePage.vue'),
    },
  ],
})

export default router
