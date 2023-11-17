import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'UserHub',
      component: () => import('../pages/UserHub.vue'),
      children: [
        {
          path: '/',
          name: 'UserDetails',
          component: () => import('../components/UserDetails.vue')
        },
        {
          path: '/create-user-account',
          name: '/CreateUserAccount',
          component: () => import('../components/CreateUserAccount.vue')
        }
      ]
    }
  ]
})

export default router
