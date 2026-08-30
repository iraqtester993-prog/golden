<template>
  <div class="page"><TopBar /><main class="content">
    <div class="title-row"><h2>سلة المنتجات</h2><button v-if="cart.length" class="clear" @click="clear">إلغاء الكل</button></div>
    <div v-if="!cart.length" class="empty"><span class="material-symbols-outlined">shopping_cart</span><p>السلة فارغة حالياً</p><button @click="router.push('/store')">الذهاب إلى المتجر</button></div>
    <template v-else><article v-for="item in cart" :key="item.name" class="item"><img :src="item.img"/><div><h3>{{ item.name }}</h3><p>{{ item.spec }}</p><strong>{{ formatPrice(item.price) }} د.ع</strong><div class="quantity-control"><button aria-label="تقليل الكمية" @click="decrease(item.name)">−</button><b>{{ item.quantity || 1 }}</b><button aria-label="زيادة الكمية" @click="add(item)">+</button></div></div><button class="remove" aria-label="حذف المنتج" @click="remove(item.name)"><span class="material-symbols-outlined">close</span></button></article><div class="total"><span>الإجمالي</span><strong>{{ formatPrice(total) }} د.ع</strong></div><div class="actions"><button class="cash" @click="cashPurchase">شراء نقد</button><button class="installment" @click="buyInstallment">شراء بالقسط</button></div></template>
  </main><BottomNav /></div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import TopBar from '../components/TopBar.vue'
import BottomNav from '../components/BottomNav.vue'
import { useCart } from '../composables/useCart'
const router = useRouter(); const { cart, total, add, decrease, remove, clear } = useCart()
const formatPrice = value => Number(String(value).replace(/,/g, '')).toLocaleString('en')
const cashPurchase = () => { const selected = [...cart.value]; if (!selected.length) return; const orders = JSON.parse(localStorage.getItem('golden_orders') || '[]'); const orderTotal = total.value; orders.push({ id: orders.length ? Math.max(...orders.map(order => order.id)) + 1 : 1001, date: new Date().toLocaleDateString('ar-EG', { year:'numeric', month:'short', day:'numeric' }), status:'pending', type:'cash', products:selected, totalPrice:orderTotal, totalAmount:orderTotal, monthlyInstallment:orderTotal, fullName:'', phone:'', address:'', ownerNote:'' }); localStorage.setItem('golden_orders', JSON.stringify(orders)); clear(); router.push('/orders') }
const buyInstallment = () => router.push('/calculator?products=' + encodeURIComponent(JSON.stringify(cart.value.map(product => ({ name:product.name })))))
</script>

<style scoped>
.page{height:100dvh;display:flex;flex-direction:column;background:var(--bg)}.content{flex:1;overflow:auto;padding:18px 16px 20px}.title-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px}.title-row h2{font-size:19px;color:var(--on-surface)}.clear,.remove{border:0;background:transparent;color:var(--error);font:inherit;cursor:pointer}.item{display:flex;align-items:center;gap:11px;margin-bottom:10px;padding:10px;background:var(--surface-container);border:1px solid var(--outline-variant);border-radius:15px}.item img{width:66px;height:66px;object-fit:cover;border-radius:10px}.item div{flex:1;min-width:0}.item h3{font-size:13px;color:var(--on-surface)}.item p{margin-top:3px;font-size:11px;color:var(--on-surface-variant)}.item strong{display:block;margin-top:5px;font-size:13px;color:var(--primary)}.remove{display:grid;place-items:center;padding:7px}.total{display:flex;justify-content:space-between;margin-top:18px;padding:15px;border-radius:13px;background:rgba(242,202,80,.1);color:var(--on-surface);font-size:14px}.total strong{color:var(--primary);font-size:17px}.actions{display:flex;gap:9px;margin-top:12px}.actions button,.empty button{flex:1;border:0;border-radius:12px;padding:13px;font:inherit;font-weight:800;cursor:pointer}.cash{background:var(--surface-container-high);color:var(--on-surface)}.installment,.empty button{background:var(--primary);color:#0a0f1d}.empty{padding:55px 10px;text-align:center;color:var(--on-surface-variant)}.empty .material-symbols-outlined{font-size:50px;color:var(--primary)}.empty p{margin:12px 0 20px}.empty button{width:100%;max-width:210px}
</style>
