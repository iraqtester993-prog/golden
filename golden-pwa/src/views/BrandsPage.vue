<template>
  <div class="brands-page">
    <TopBar title="الماركات" :showBack="true" />

    <main class="brands-content">
      <template v-if="!selectedBrand">
        <p class="page-intro">اختر الماركة لعرض منتجاتها</p>
        <div class="brands-grid">
          <button v-for="brand in brands" :key="brand.name" class="brand-card" @click="selectedBrand = brand">
            <img :src="brand.img" :alt="brand.name" class="brand-image" />
            <span>{{ brand.name }}</span>
          </button>
        </div>
      </template>

      <template v-else>
        <button class="back-to-brands" @click="selectedBrand = null">
          <span class="material-symbols-outlined">arrow_forward_ios</span>
          العودة إلى الماركات
        </button>
        <div class="brand-header">
          <img :src="selectedBrand.img" :alt="selectedBrand.name" class="brand-header-image" />
          <div>
            <h2>{{ selectedBrand.name }}</h2>
            <p>منتجات {{ selectedBrand.name }}</p>
          </div>
        </div>
        <div class="products-list">
          <article v-for="product in selectedProducts" :key="product.name" class="product-card">
            <img :src="product.img" :alt="product.name" class="product-image" />
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <span>{{ product.spec }}</span>
              <strong>{{ product.price }} د.ع</strong>
            </div>
          </article>
        </div>
      </template>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import TopBar from '../components/TopBar.vue'

const selectedBrand = ref(null)

const brands = [
  { name: 'Apple', img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=200&fit=crop' },
  { name: 'Samsung', img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=200&h=200&fit=crop' },
  { name: 'Hisense', img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop' }
]

const productsByBrand = {
  Apple: [
    { name: 'iPhone 16 Pro Max', spec: '256GB - تيتانيوم', price: '1,850,000', img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop' },
    { name: 'MacBook Pro M3', spec: '14 inch - 512GB', price: '5,200,000', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop' },
    { name: 'iPad Pro M4', spec: '13 inch - 256GB', price: '3,100,000', img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop' },
    { name: 'AirPods Pro 2', spec: 'USB-C - إلغاء ضوضاء نشط', price: '580,000', img: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=300&fit=crop' }
  ],
  Samsung: [
    { name: 'Samsung S24 Ultra', spec: '512GB - أسود', price: '1,650,000', img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop' }
  ],
  Hisense: [
    { name: 'Hisense 55 inch 4K', spec: 'Smart TV - ULED', price: '820,000', img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop' }
  ]
}

const selectedProducts = computed(() => productsByBrand[selectedBrand.value?.name] || [])
</script>

<style scoped>
.brands-page { width: 100%; height: 100dvh; display: flex; flex-direction: column; background: var(--bg); overflow: hidden; }
.brands-content { flex: 1; overflow-y: auto; padding: 20px 16px 32px; }
.page-intro { margin-bottom: 18px; font-size: 13px; color: var(--on-surface-variant); }
.brands-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.brand-card { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 16px 8px; border: 1px solid var(--outline-variant); border-radius: 16px; background: var(--surface-container); color: var(--on-surface); font: inherit; font-size: 12px; font-weight: 700; cursor: pointer; }
.brand-card:active { border-color: var(--primary); }
.brand-image { width: 68px; height: 68px; border: 2px solid var(--outline-variant); border-radius: 50%; object-fit: cover; }
.back-to-brands { display: flex; align-items: center; gap: 5px; margin-bottom: 16px; padding: 0; border: 0; background: transparent; color: var(--primary); font: inherit; font-size: 13px; font-weight: 700; cursor: pointer; }
.back-to-brands .material-symbols-outlined { font-size: 18px; }
.brand-header { display: flex; align-items: center; gap: 12px; padding: 14px; margin-bottom: 16px; border: 1px solid var(--outline-variant); border-radius: 16px; background: var(--surface-container); }
.brand-header-image { width: 56px; height: 56px; border-radius: 50%; object-fit: cover; }
.brand-header h2 { font-size: 17px; color: var(--on-surface); }
.brand-header p { margin-top: 3px; font-size: 12px; color: var(--on-surface-variant); }
.products-list { display: flex; flex-direction: column; gap: 12px; }
.product-card { display: flex; gap: 12px; padding: 12px; border: 1px solid var(--outline-variant); border-radius: 16px; background: var(--surface-container); }
.product-image { width: 92px; height: 92px; flex-shrink: 0; border-radius: 12px; object-fit: cover; }
.product-info { display: flex; flex: 1; min-width: 0; flex-direction: column; gap: 5px; }
.product-info h3 { font-size: 14px; color: var(--on-surface); }
.product-info span { font-size: 11px; color: var(--on-surface-variant); }
.product-info strong { margin-top: auto; font-size: 14px; color: var(--primary); }
</style>
