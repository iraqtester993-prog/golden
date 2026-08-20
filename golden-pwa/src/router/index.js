import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Splash',
    component: () => import('../views/SplashScreen.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterPage.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/store',
    name: 'Store',
    component: () => import('../views/StorePage.vue')
  },
  { path: '/cart', name: 'Cart', component: () => import('../views/CartPage.vue') },
  { path: '/brands', name: 'Brands', component: () => import('../views/BrandsPage.vue') },
  { path: '/branches', name: 'Branches', component: () => import('../views/DirectoryPage.vue') },
  { path: '/dealers', name: 'Dealers', component: () => import('../views/DirectoryPage.vue') },
  {
    path: '/settlements',
    name: 'Settlements',
    component: () => import('../views/SettlementsPage.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/AccountPage.vue')
  },
  {
    path: '/calculator',
    name: 'Calculator',
    component: () => import('../views/InstallmentCalculatorPage.vue')
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('../views/OrdersPage.vue')
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('../views/FavoritesPage.vue')
  },
  {
    path: '/profile-edit',
    name: 'ProfileEdit',
    component: () => import('../views/ProfileEditPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
