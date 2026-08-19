<template>
  <nav class="bottom-nav">
    <button v-for="item in items" :key="item.label" class="nav-item" :class="{ active: route.path === item.route }" @click="router.push(item.route)">
      <div class="nav-icon-wrap">
        <span class="material-symbols-outlined nav-icon" :class="{ filled: route.path === item.route }">{{ item.icon }}</span>
      </div>
      <span class="nav-label">{{ item.label }}</span>
    </button>
  </nav>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const items = [
  { icon: 'home', label: 'الرئيسية', route: '/home' },
  { icon: 'shopping_bag', label: 'المتجر', route: '/store' },
  { icon: 'account_balance_wallet', label: 'أقساطي', route: '/settlements' },
  { icon: 'receipt_long', label: 'طلباتي', route: '/orders' },
  { icon: 'person', label: 'حسابي', route: '/account' }
]
</script>

<style scoped>
.bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; height: 64px; background: var(--bg); border-top: 1px solid var(--outline-variant); display: flex; justify-content: space-around; align-items: center; padding-bottom: env(safe-area-inset-bottom, 4px); z-index: 300; }
.nav-item { display: flex; flex-direction: column; align-items: center; gap: 2px; background: none; border: 0; color: var(--on-surface-variant); cursor: pointer; padding: 4px 8px; }
.nav-item.active { color: var(--primary); }
.nav-icon { font-size: 24px; }
.nav-icon.filled { font-variation-settings: 'FILL' 1; }
.nav-label { font-size: 10px; font-weight: 500; }
</style>
