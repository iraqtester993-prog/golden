<template>
  <div class="page"><TopBar :title="sectionTitle" :showBack="true"/><main class="content"><div class="section-head"><span>{{ sectionTitle }}</span><small>{{ products.length }} منتجات</small></div><div class="products-grid"><article v-for="product in products" :key="product.name" @click="router.push('/product?name='+encodeURIComponent(product.name))"><img :src="product.img"/><div><h2>{{ product.name }}</h2><p>{{ product.spec }}</p><strong><small>السعر النقدي</small>{{ product.price }} د.ع</strong><div class="installment"><span class="material-symbols-outlined">account_balance_wallet</span> يدعم التقسيط</div><div class="cart-control" @click.stop><button v-if="qty(product)" @click="decrease(product.name)">−</button><b v-if="qty(product)">{{ qty(product) }}</b><button @click="add(product)"><span class="material-symbols-outlined">{{ qty(product) ? 'add' : 'add_shopping_cart' }}</span>{{ qty(product) ? 'زيادة' : 'إضافة للسلة' }}</button></div></div></article></div></main><BottomNav/></div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TopBar from '../components/TopBar.vue'
import BottomNav from '../components/BottomNav.vue'
import { useCart } from '../composables/useCart'
const route=useRoute(),router=useRouter();const {cart,add,decrease}=useCart()
const all=[
{name:'iPhone 16 Pro Max',spec:'256GB - تيتانيوم',price:'1,850,000',img:'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop',kind:'popular',offer:true},
{name:'Samsung S24 Ultra',spec:'512GB - أسود',price:'1,650,000',img:'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop',kind:'popular',offer:true},
{name:'Hisense 55 inch 4K',spec:'Smart TV - ULED',price:'820,000',img:'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop',kind:'popular'},
{name:'Toyota Camry 2024',spec:'GLE - أبيض',price:'38,000,000',img:'https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=400&h=300&fit=crop',kind:'new',offer:true},
{name:'شاحنة JAC خفيفة',spec:'حمولة 3 طن',price:'45,000,000',img:'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop',kind:'new'},
{name:'مكيف Gree سبليت',spec:'18000 وحدة',price:'1,250,000',img:'https://images.unsplash.com/photo-1631545806609-206480c4ca4d?w=400&h=300&fit=crop',kind:'new'},
{name:'غسالة Samsung أوتوماتيك',spec:'9 كغم',price:'980,000',img:'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&h=300&fit=crop',kind:'new'}]
const section=computed(()=>route.params.section||'popular');const sectionTitle=computed(()=>({popular:'الأكثر مبيعاً',new:'الجديد',offers:'العروض'})[section.value]||'المنتجات');const products=computed(()=>section.value==='offers'?all.filter(p=>p.offer):section.value==='new'?all.filter(p=>p.kind==='new'):all.filter(p=>p.kind==='popular'));const qty=p=>cart.value.find(item=>item.name===p.name)?.quantity||0
</script>

<style scoped>
.page{height:100dvh;display:flex;flex-direction:column;background:var(--bg)}.content{flex:1;overflow:auto;padding:16px 16px 100px}.section-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;color:var(--on-surface);font-size:18px;font-weight:800}.section-head small{color:var(--on-surface-variant);font-size:11px}.products-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}article{min-width:0;padding:8px;border:1px solid rgba(196,154,59,.28);border-radius:16px;background:linear-gradient(145deg,var(--surface-container-high),var(--surface-container));box-shadow:0 6px 14px rgba(0,0,0,.1);cursor:pointer}article>img{width:100%;height:110px;object-fit:cover;border-radius:11px}h2{margin:8px 0 3px;color:var(--on-surface);font-size:12px;line-height:1.5}p{margin:0;color:var(--on-surface-variant);font-size:10px}strong{display:block;margin-top:7px;color:var(--primary);font-size:12px}strong small{display:block;color:var(--on-surface-variant);font-size:8px;font-weight:600}.installment{display:flex;align-items:center;gap:3px;margin-top:7px;color:var(--primary);font-size:9px;font-weight:700}.installment .material-symbols-outlined{font-size:13px}.cart-control{display:flex;align-items:center;gap:4px;margin-top:8px}.cart-control button{display:flex;align-items:center;justify-content:center;gap:3px;min-height:28px;flex:1;border:1px solid rgba(196,154,59,.32);border-radius:8px;background:rgba(196,154,59,.12);color:var(--primary);font:700 9px inherit;cursor:pointer;white-space:nowrap}.cart-control button:first-child{flex:0 0 26px;font-size:17px}.cart-control b{min-width:13px;text-align:center;color:var(--on-surface);font-size:11px}.cart-control .material-symbols-outlined{font-size:14px}@media(max-width:340px){.products-grid{grid-template-columns:1fr}article>img{height:135px}}
</style>
