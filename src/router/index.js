import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/login/LoginPage.vue'
import SignUp from '../views/Register/SignUp.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/LayoutContainer/LayoutContainer.vue'),
      redirect: '/Gadget/Home',
      children: [
        {
          path: '/Gadget/Home',
          component: () => import('@/views/Gadget/Home.vue')
        },
        {
          path: '/Gadget/Market',
          component: () => import('@/views/Gadget/Market.vue')
        },
        {
          path: '/Gadget/Ranking',
          component: () => import('@/views/Gadget/Ranking.vue')
        },
        {
          path: '/Login',
          component: LoginPage,
          children: [
            {
              path: 'Inventory',
              component: () => import('@/views/Login/Inventory.vue')
            },
            {
              path: 'Sale',
              component: () => import('@/views/Login/Sale.vue')
            }
          ]
        },
        {
          path: '/Register',
          component: SignUp,
        }
      ]
    }
  ]
})

export default router
