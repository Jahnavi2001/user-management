import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'UserDetails',
      component: () => import('../pages/UserDetails.vue'),
      children: [
        {
          path: '/',
          name: 'UsersList',
          component: () => import('../components/UsersList.vue')
        },
        {
          path: '/create-user',
          name: '/CreateUser',
          component: () => import('../components/CreateUser.vue')
        }
      ]
    }
  ]
})

export default router
