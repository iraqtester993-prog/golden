<template>
  <button v-if="cart.length && isAppPage" class="floating-cart" aria-label="فتح السلة" @click="router.push('/cart')">
    <span class="cart-count">{{ cart.length }}</span>
    <span class="material-symbols-outlined">shopping_cart</span>
  </button>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCart } from '../composables/useCart'

const router = useRouter()
const route = useRoute()
const { cart } = useCart()
const tick = ref(0)
const isAppPage = computed(() => {
  tick.value
  return !['/', '/login', '/register'].includes(route.path)
})
const refresh = () => { tick.value++ }
onMounted(() => window.addEventListener('golden-cart-updated', refresh))
onBeforeUnmount(() => window.removeEventListener('golden-cart-updated', refresh))
</script>

<style scoped>
.floating-cart { position:fixed; left:18px; bottom:82px; z-index:80; width:54px; height:54px; display:grid; place-items:center; border:0; border-radius:50%; background:var(--primary); color:#0a0f1d; box-shadow:0 8px 22px rgba(0,0,0,.32); cursor:pointer; animation:cart-enter .28s ease-out, cart-float 2s ease-in-out infinite; }
.floating-cart .material-symbols-outlined { font-size:25px; }
.cart-count { position:absolute; top:-7px; right:-4px; min-width:23px; height:23px; padding:0 5px; display:grid; place-items:center; border:2px solid var(--bg); border-radius:50%; background:var(--error); color:white; font-size:11px; font-weight:800; animation:count-pop .32s ease-out; }
@keyframes cart-enter { from { transform:scale(.65); opacity:0 } to { transform:scale(1); opacity:1 } }
@keyframes cart-float { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-5px) } }
@keyframes count-pop { 0% { transform:scale(.3) } 80% { transform:scale(1.15) } 100% { transform:scale(1) } }
</style>
