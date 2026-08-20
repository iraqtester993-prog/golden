<template>
  <nav class="bottom-nav">
    <button v-for="item in items" :key="item.label" class="nav-item" :class="{ active: route.path === item.route }" @click="router.push(item.route)">
      <span class="material-symbols-outlined">{{ item.icon }}</span><span>{{ item.label }}</span>
    </button>
  </nav>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
const route = useRoute(); const router = useRouter()
const items = [{ icon:'home', label:'الرئيسية', route:'/home' }, { icon:'shopping_bag', label:'المتجر', route:'/store' }, { icon:'account_balance_wallet', label:'أقساطي', route:'/settlements' }, { icon:'receipt_long', label:'طلباتي', route:'/orders' }, { icon:'person', label:'حسابي', route:'/account' }]
</script>

<style scoped>
.bottom-nav { height:68px; display:flex; justify-content:space-around; align-items:center; flex-shrink:0; padding:5px 8px calc(5px + env(safe-area-inset-bottom)); background:var(--bg); border-top:1px solid var(--outline-variant); z-index:40; }
.nav-item { flex:1; display:flex; flex-direction:column; align-items:center; gap:2px; border:0; background:transparent; color:var(--on-surface-variant); font:inherit; font-size:9px; cursor:pointer; }
.nav-item .material-symbols-outlined { font-size:22px; }.nav-item.active { color:var(--primary); font-weight:700; }
</style>
