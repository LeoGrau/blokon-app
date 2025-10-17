import { createRouter, createWebHistory } from 'vue-router'

import WalletGeneratorPage from '@/pages/wallet-generator/WalletGeneratorPage.vue'
import HomePage from '@/pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/wallet-generator',
      name: 'wallet-generator',
      component: WalletGeneratorPage,
    },
  ],
})

export default router
