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
          name: 'CreateUser',
          component: () => import('../components/CreateUser.vue')
        },
        {
          path: '/users-list',
          name: '/UsersList',
          component: () => import('../components/UsersList.vue')
        }
      ]
    }
  ]
})

export default router
