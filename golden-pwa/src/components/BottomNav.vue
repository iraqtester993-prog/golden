<template>
  <nav class="bottom-nav">
    <button v-for="item in items" :key="item.label" class="nav-item" :class="{ active: route.path === item.route }" @click="router.push(item.route)">
      <span class="nav-icon-wrap"><span class="material-symbols-outlined">{{ item.icon }}</span></span><span>{{ item.label }}</span>
    </button>
  </nav>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
const route = useRoute(); const router = useRouter()
const items = [{ icon:'home', label:'الرئيسية', route:'/home' }, { icon:'shopping_bag', label:'المتجر', route:'/store' }, { icon:'account_balance_wallet', label:'أقساطي', route:'/settlements' }, { icon:'receipt_long', label:'طلباتي', route:'/orders' }, { icon:'person', label:'حسابي', route:'/account' }]
</script>

<style scoped>
.bottom-nav { height:68px; margin:0 12px 10px; display:flex; justify-content:space-around; align-items:center; flex-shrink:0; padding:5px 6px calc(5px + env(safe-area-inset-bottom)); background:var(--surface-container); border:1px solid var(--outline-variant); border-radius:22px; box-shadow:0 8px 24px rgba(0,0,0,.2); z-index:40; }
.nav-item { flex:1; display:flex; flex-direction:column; align-items:center; gap:3px; border:0; background:transparent; color:var(--on-surface-variant); font:inherit; font-size:11px; font-weight:600; cursor:pointer; }.nav-icon-wrap{width:36px;height:32px;display:grid;place-items:center;border-radius:12px;transition:.2s}.nav-item .material-symbols-outlined{font-size:22px}.nav-item.active{color:var(--primary);font-weight:700}.nav-item.active .nav-icon-wrap{background:var(--primary);color:#0a0f1d;box-shadow:0 4px 10px rgba(242,202,80,.22)}
</style>
