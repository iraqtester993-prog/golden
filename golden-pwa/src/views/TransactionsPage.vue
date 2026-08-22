<template>
  <div class="page"><TopBar title="كل الحركات" :showBack="true"/><main class="content"><article v-for="transaction in transactions" :key="transaction.id" class="transaction"><div class="transaction-main"><span class="material-symbols-outlined">{{ transaction.icon }}</span><div><h2>{{ transaction.name }}</h2><p>فاتورة #{{ transaction.invoice }} · {{ transaction.date }}</p></div></div><strong>{{ transaction.amount }} د.ع</strong></article></main><BottomNav active-route="/home"/></div>
</template>
<script setup>
import TopBar from '../components/TopBar.vue'
import BottomNav from '../components/BottomNav.vue'
const transactions=[
  {id:1,icon:'payments',name:'تم تسديد قسط',invoice:10235,amount:'250,000',date:'2026/08/20'},
  {id:2,icon:'request_quote',name:'تم تقديم طلب تقسيط',invoice:10312,amount:'1,650,000',date:'2026/08/18'},
  {id:3,icon:'add_card',name:'تمت إضافة دفعة',invoice:10478,amount:'300,000',date:'2026/08/15'},
  {id:4,icon:'shopping_bag',name:'تم إنشاء طلب جديد',invoice:10478,amount:'820,000',date:'2026/08/10'},
  {id:5,icon:'payments',name:'تم تسديد قسط',invoice:10235,amount:'250,000',date:'2026/07/20'},
  {id:6,icon:'payments',name:'تم تسديد قسط',invoice:10312,amount:'137,500',date:'2026/07/10'}
]
</script>
<style scoped>
.page{height:100dvh;display:flex;flex-direction:column;background:var(--bg)}.content{flex:1;overflow:auto;padding:14px 16px 92px}.transaction{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px;padding:14px;border:1px solid var(--outline-variant);border-radius:15px;background:var(--surface-container)}.transaction-main{display:flex;align-items:center;gap:11px}.transaction-main>.material-symbols-outlined{display:grid;place-items:center;width:42px;height:42px;border-radius:13px;background:rgba(196,154,59,.13);color:var(--primary)}h2{margin:0;color:var(--on-surface);font-size:13px}p{margin:4px 0 0;color:var(--on-surface-variant);font-size:10px}strong{flex:none;color:var(--primary);font-size:12px}
</style>
