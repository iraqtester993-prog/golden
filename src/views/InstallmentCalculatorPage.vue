<template>
  <div class="page">
    <TopBar title="حاسبة التقسيط" :showBack="true" />

    <div class="page-content">
      <!-- Search -->
      <div class="search-bar">
        <span class="material-symbols-outlined search-icon">search</span>
        <input
          v-model="searchQuery"
          class="search-input"
          placeholder="ابحث عن منتج..."
          type="text"
        />
        <span v-if="searchQuery" class="material-symbols-outlined clear-icon" @click="searchQuery = ''">close</span>
      </div>

      <!-- Product Selected State -->
      <template v-if="selectedProduct">
        <!-- Selected Product Card -->
        <div class="product-card">
          <img :src="selectedProduct.img" class="product-img" />
          <div class="product-info">
            <h3 class="product-name">{{ selectedProduct.name }}</h3>
            <span class="product-spec">{{ selectedProduct.spec }}</span>
            <div class="product-price-row">
              <span class="product-price-label">سعر المنتج</span>
              <span class="product-price">{{ selectedProduct.price }} د.ع</span>
            </div>
          </div>
          <button class="change-btn" @click="selectedProduct = null">
            <span class="material-symbols-outlined">swap_horiz</span>
          </button>
        </div>

        <!-- Down Payment -->
        <div class="section">
          <h3 class="section-title">المبلغ المقدم (اختياري)</h3>
          <div class="input-wrap">
            <input
              v-model="downPayment"
              class="amount-input"
              type="number"
              placeholder="0"
              min="0"
            />
            <span class="input-unit">د.ع</span>
          </div>
          <div v-if="downPayment > 0" class="after-down">
            المبلغ بعد الخصم: <strong>{{ formatNum(netAmount) }} د.ع</strong>
          </div>
        </div>

        <!-- Duration Selection -->
        <div class="section">
          <h3 class="section-title">مدة التقسيط</h3>
          <div class="duration-grid">
            <button
              v-for="m in durations"
              :key="m"
              class="duration-btn"
              :class="{ active: selectedMonths === m }"
              @click="selectedMonths = m"
            >
              <span class="dur-num">{{ m }}</span>
              <span class="dur-label">شهر</span>
            </button>
          </div>
        </div>

        <!-- Result -->
        <div class="result-card" v-if="selectedMonths > 0">
          <div class="result-row">
            <span class="result-label">القسط الشهري</span>
            <div class="result-value-wrap">
              <span class="result-value">{{ formatNum(monthlyInstallment) }}</span>
              <span class="result-unit">د.ع</span>
            </div>
          </div>
          <div class="result-divider"></div>
          <div class="result-row">
            <span class="result-label">إجمالي المبلغ</span>
            <div class="result-value-wrap">
              <span class="result-value-sm">{{ formatNum(totalAmount) }} د.ع</span>
            </div>
          </div>
          <div class="result-row">
            <span class="result-label">عدد الأقساط</span>
            <div class="result-value-wrap">
              <span class="result-value-sm">{{ selectedMonths }} قسط</span>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <button class="submit-btn" :disabled="!selectedMonths || !netAmount" @click="submitRequest">
          <span class="material-symbols-outlined">send</span>
          <span>تقديم طلب تقسيط</span>
        </button>
      </template>

      <!-- Product Selection State -->
      <template v-else>
        <div class="products-grid">
          <div
            v-for="p in filteredProducts"
            :key="p.name"
            class="product-select-card"
            @click="selectProduct(p)"
          >
            <img :src="p.img" class="product-select-img" />
            <div class="product-select-info">
              <span class="product-select-name">{{ p.name }}</span>
              <span class="product-select-spec">{{ p.spec }}</span>
              <span class="product-select-price">{{ p.price }} د.ع</span>
            </div>
            <span class="material-symbols-outlined select-arrow">chevron_left</span>
          </div>
          <div v-if="filteredProducts.length === 0" class="empty-state">
            <span class="material-symbols-outlined empty-icon">search_off</span>
            <span class="empty-text">لا توجد نتائج</span>
          </div>
        </div>
      </template>
    </div>

    <nav class="bottom-nav">
      <button class="nav-item" v-for="(item, i) in navItems" :key="item.label" @click="goTo(item.route)">
        <div class="nav-icon-wrap">
          <span class="material-symbols-outlined nav-icon">{{ item.icon }}</span>
        </div>
        <span class="nav-label">{{ item.label }}</span>
      </button>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import TopBar from '../components/TopBar.vue'

const router = useRouter()
const goTo = (route) => { if (route) router.push(route) }

const searchQuery = ref('')
const selectedProduct = ref(null)
const downPayment = ref('')
const selectedMonths = ref(null)
const durations = [10, 16, 18, 24, 36]

const products = [
  { name: 'iPhone 16 Pro Max', spec: '256GB - تيتانيوم', price: '1,850,000', priceRaw: 1850000, img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop' },
  { name: 'Samsung S24 Ultra', spec: '512GB - أسود', price: '1,650,000', priceRaw: 1650000, img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop' },
  { name: 'Hisense 55 inch 4K', spec: 'Smart TV - ULED', price: '820,000', priceRaw: 820000, img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop' },
  { name: 'MacBook Pro M3', spec: '14 inch - 512GB', price: '5,200,000', priceRaw: 5200000, img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop' },
  { name: 'iPad Pro M4', spec: '13 inch - 256GB', price: '3,100,000', priceRaw: 3100000, img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop' },
  { name: 'AirPods Pro 2', spec: 'USB-C - Active NC', price: '580,000', priceRaw: 580000, img: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=300&fit=crop' }
]

const filteredProducts = computed(() => {
  if (!searchQuery.value) return products
  const q = searchQuery.value.toLowerCase()
  return products.filter(p => p.name.toLowerCase().includes(q) || p.spec.toLowerCase().includes(q))
})

const selectProduct = (p) => {
  selectedProduct.value = p
  downPayment.value = ''
  selectedMonths.value = null
}

const netAmount = computed(() => {
  if (!selectedProduct.value) return 0
  const down = Number(downPayment.value) || 0
  return Math.max(0, selectedProduct.value.priceRaw - down)
})

const monthlyInstallment = computed(() => {
  if (!selectedMonths.value || !netAmount.value) return 0
  return Math.ceil(netAmount.value / selectedMonths.value)
})

const totalAmount = computed(() => {
  if (!selectedMonths.value || !netAmount.value) return 0
  return monthlyInstallment.value * selectedMonths.value
})

const formatNum = (n) => n.toLocaleString('en')

const submitRequest = () => {
  alert('تم تقديم طلب التقسيط بنجاح!')
  router.push('/home')
}

const navItems = [
  { icon: 'home', label: 'الرئيسية', route: '/home' },
  { icon: 'shopping_bag', label: 'المتجر', route: '/store' },
  { icon: 'account_balance_wallet', label: 'أقساطي', route: '/settlements' },
  { icon: 'notifications', label: 'طلباتي', route: null },
  { icon: 'person', label: 'حسابي', route: '/account' }
]
</script>

<style scoped>
.page { width: 100%; height: 100dvh; background: var(--bg); display: flex; flex-direction: column; overflow: hidden; }
.page-content { flex: 1; overflow-y: auto; padding: 12px 16px 100px; display: flex; flex-direction: column; gap: 12px; }
.page-content > * { flex-shrink: 0; }

.search-bar { display: flex; align-items: center; gap: 8px; background: var(--surface-container); border: 1px solid var(--outline-variant); border-radius: 14px; padding: 0 12px; height: 48px; }
.search-icon { font-size: 20px; color: var(--on-surface-variant); }
.search-input { flex: 1; background: none; border: none; outline: none; color: var(--on-surface); font-size: 13px; font-family: inherit; direction: rtl; }
.search-input::placeholder { color: var(--on-surface-variant); }
.clear-icon { font-size: 18px; color: var(--on-surface-variant); cursor: pointer; }

.product-card { display: flex; align-items: center; gap: 12px; background: var(--surface-container); border: 1px solid var(--outline-variant); border-radius: 16px; padding: 12px; position: relative; }
.product-img { width: 72px; height: 72px; border-radius: 12px; object-fit: cover; flex-shrink: 0; }
.product-info { flex: 1; min-width: 0; }
.product-name { font-size: 15px; font-weight: 700; color: var(--on-surface); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.product-spec { font-size: 12px; color: var(--on-surface-variant); display: block; margin-top: 2px; }
.product-price-row { display: flex; align-items: center; gap: 6px; margin-top: 6px; }
.product-price-label { font-size: 11px; color: var(--on-surface-variant); }
.product-price { font-size: 14px; font-weight: 700; color: var(--primary); }
.change-btn { width: 36px; height: 36px; border-radius: 10px; background: var(--surface-variant); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; }
.change-btn .material-symbols-outlined { font-size: 20px; color: var(--on-surface-variant); }

.section { background: var(--surface-container); border: 1px solid var(--outline-variant); border-radius: 16px; padding: 16px; }
.section-title { font-size: 14px; font-weight: 600; color: var(--on-surface); margin-bottom: 12px; }

.input-wrap { display: flex; align-items: center; gap: 8px; background: var(--bg); border: 1px solid var(--outline-variant); border-radius: 12px; padding: 0 14px; height: 48px; }
.amount-input { flex: 1; background: none; border: none; outline: none; color: var(--on-surface); font-size: 16px; font-weight: 600; font-family: inherit; direction: ltr; text-align: right; }
.amount-input::placeholder { color: var(--on-surface-variant); font-weight: 400; }
.input-unit { font-size: 14px; color: var(--on-surface-variant); font-weight: 600; }
.after-down { margin-top: 10px; font-size: 13px; color: var(--on-surface-variant); }
.after-down strong { color: var(--primary); }

.duration-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; }
.duration-btn { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 14px 8px; border-radius: 14px; background: var(--bg); border: 2px solid var(--outline-variant); cursor: pointer; transition: all 0.2s; }
.duration-btn.active { border-color: var(--primary); background: rgba(242, 202, 80, 0.08); }
.dur-num { font-size: 18px; font-weight: 700; color: var(--on-surface); }
.dur-label { font-size: 10px; color: var(--on-surface-variant); }
.duration-btn.active .dur-num { color: var(--primary); }

.result-card { background: linear-gradient(135deg, rgba(242, 202, 80, 0.08), rgba(242, 202, 80, 0.03)); border: 1px solid var(--primary); border-radius: 16px; padding: 16px; }
.result-row { display: flex; align-items: center; justify-content: space-between; padding: 4px 0; }
.result-label { font-size: 13px; color: var(--on-surface-variant); }
.result-value-wrap { display: flex; align-items: baseline; gap: 4px; }
.result-value { font-size: 28px; font-weight: 800; color: var(--primary); }
.result-unit { font-size: 14px; font-weight: 600; color: var(--primary); }
.result-value-sm { font-size: 14px; font-weight: 600; color: var(--on-surface); }
.result-divider { height: 1px; background: var(--outline-variant); margin: 8px 0; }

.submit-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 16px; border-radius: 14px; background: var(--primary); border: none; color: #0a0f1d; font-size: 16px; font-weight: 700; font-family: inherit; cursor: pointer; transition: opacity 0.2s; }
.submit-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.submit-btn .material-symbols-outlined { font-size: 22px; }

.products-grid { display: flex; flex-direction: column; gap: 10px; }
.product-select-card { display: flex; align-items: center; gap: 12px; background: var(--surface-container); border: 1px solid var(--outline-variant); border-radius: 16px; padding: 12px; cursor: pointer; transition: border-color 0.2s; }
.product-select-card:active { border-color: var(--primary); }
.product-select-img { width: 64px; height: 64px; border-radius: 12px; object-fit: cover; flex-shrink: 0; }
.product-select-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.product-select-name { font-size: 14px; font-weight: 700; color: var(--on-surface); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.product-select-spec { font-size: 12px; color: var(--on-surface-variant); }
.product-select-price { font-size: 14px; font-weight: 700; color: var(--primary); margin-top: 2px; }
.select-arrow { font-size: 22px; color: var(--on-surface-variant); flex-shrink: 0; }

.empty-state { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 40px 0; }
.empty-icon { font-size: 48px; color: var(--on-surface-variant); opacity: 0.4; }
.empty-text { font-size: 14px; color: var(--on-surface-variant); }

.bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; height: 64px; background: var(--bg); border-top: 1px solid var(--outline-variant); display: flex; justify-content: space-around; align-items: center; padding-bottom: env(safe-area-inset-bottom, 4px); z-index: 50; }
.nav-item { display: flex; flex-direction: column; align-items: center; gap: 2px; background: none; border: none; color: var(--on-surface-variant); cursor: pointer; padding: 4px 8px; }
.nav-icon { font-size: 24px; }
.nav-label { font-size: 10px; font-weight: 500; }
</style>
