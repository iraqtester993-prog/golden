<template>
  <div class="page">
    <TopBar title="حاسبة التقسيط" :showBack="true" />

    <div class="page-content">
      <!-- STEP 1: Product Selection -->
      <template v-if="!showCalculator">
        <!-- Search -->
        <div class="search-bar">
          <span class="material-symbols-outlined search-icon">search</span>
          <input v-model="searchQuery" class="search-input" placeholder="ابحث عن منتج..." type="text" />
          <span v-if="searchQuery" class="material-symbols-outlined clear-icon" @click="searchQuery = ''">close</span>
        </div>

        <!-- Selected Products -->
        <div v-if="selectedProducts.length" class="selected-bar">
          <div class="selected-pills">
            <div v-for="(p, i) in selectedProducts" :key="p.name" class="pill">
              <span class="pill-name">{{ p.name }}</span>
              <button class="pill-x" @click="removeProduct(i)">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>
          <button class="calc-fab" @click="showCalculator = true">
            <span class="material-symbols-outlined">calculate</span>
            <span>احسب ({{ selectedProducts.length }})</span>
          </button>
        </div>

        <!-- Product List -->
        <div class="products-grid">
          <div
            v-for="p in filteredProducts"
            :key="p.name"
            class="product-card"
            :class="{ chosen: isSelected(p) }"
            @click="toggleProduct(p)"
          >
            <img :src="p.img" class="product-card-img" />
            <div class="product-card-info">
              <span class="product-card-name">{{ p.name }}</span>
              <span class="product-card-spec">{{ p.spec }}</span>
              <span class="product-card-price">{{ p.price }} د.ع</span>
            </div>
            <div v-if="isSelected(p)" class="chosen-badge"><span class="material-symbols-outlined">check</span></div>
            <span v-else class="material-symbols-outlined add-icon">add_circle</span>
          </div>
          <div v-if="filteredProducts.length === 0" class="empty-state">
            <span class="material-symbols-outlined empty-icon">search_off</span>
            <span class="empty-text">لا توجد نتائج</span>
          </div>
        </div>
      </template>

      <!-- STEP 2: Calculator -->
      <template v-else>
        <!-- Selected Products Summary -->
        <div class="calc-summary">
          <div class="calc-summary-header">
            <span class="calc-summary-title">المنتجات المختارة</span>
            <button class="back-btn" @click="showCalculator = false">
              <span class="material-symbols-outlined">arrow_forward_ios</span>
              <span>تعديل</span>
            </button>
          </div>
          <div v-for="p in selectedProducts" :key="p.name" class="calc-product-row">
            <img :src="p.img" class="calc-product-img" />
            <div class="calc-product-info">
              <span class="calc-product-name">{{ p.name }}</span>
              <span class="calc-product-price">{{ p.price }} د.ع</span>
            </div>
          </div>
          <div class="calc-total-row">
            <span class="calc-total-label">الإجمالي</span>
            <span class="calc-total-value">{{ formatNum(totalPrice) }} د.ع</span>
          </div>
        </div>

        <!-- Add More Products -->
        <button class="add-more-btn" @click="showCalculator = false">
          <span class="material-symbols-outlined">add</span>
          <span>إضافة منتج آخر</span>
        </button>

        <!-- Down Payment -->
        <div class="calc-section">
          <h3 class="calc-section-title">المبلغ المقدم <span class="optional">(اختياري)</span></h3>
          <div class="calc-input-wrap">
            <input v-model="downPayment" class="calc-amount-input" type="number" placeholder="0" min="0" />
            <span class="calc-input-unit">د.ع</span>
          </div>
          <div v-if="downPayment > 0" class="calc-after-down">
            المبلغ بعد الخصم: <strong>{{ formatNum(netAmount) }} د.ع</strong>
          </div>
        </div>

        <!-- Duration -->
        <div class="calc-section">
          <h3 class="calc-section-title">مدة التقسيط</h3>
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
            <span class="result-value-sm">{{ formatNum(totalAmount) }} د.ع</span>
          </div>
          <div class="result-row">
            <span class="result-label">عدد الأقساط</span>
            <span class="result-value-sm">{{ selectedMonths }} قسط</span>
          </div>
        </div>

        <!-- Submit -->
        <button class="submit-btn" :disabled="!selectedMonths || !netAmount" @click="submitRequest">
          <span class="material-symbols-outlined">send</span>
          <span>تقديم طلب تقسيط</span>
        </button>
      </template>
    </div>

    <nav class="bottom-nav">
      <button class="nav-item" v-for="item in navItems" :key="item.label" @click="goTo(item.route)">
        <div class="nav-icon-wrap">
          <span class="material-symbols-outlined nav-icon">{{ item.icon }}</span>
        </div>
        <span class="nav-label">{{ item.label }}</span>
      </button>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import TopBar from '../components/TopBar.vue'

const router = useRouter()
const route = useRoute()
const goTo = (r) => { if (r) router.push(r) }

const searchQuery = ref('')
const selectedProducts = ref([])
const showCalculator = ref(false)
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

const isSelected = (p) => selectedProducts.value.some(s => s.name === p.name)

const toggleProduct = (p) => {
  if (isSelected(p)) {
    selectedProducts.value = selectedProducts.value.filter(s => s.name !== p.name)
  } else {
    selectedProducts.value.push(p)
  }
}

const removeProduct = (i) => {
  selectedProducts.value.splice(i, 1)
  if (selectedProducts.value.length === 0) showCalculator.value = false
}

const totalPrice = computed(() => selectedProducts.value.reduce((sum, p) => sum + p.priceRaw, 0))

const netAmount = computed(() => {
  const down = Number(downPayment.value) || 0
  return Math.max(0, totalPrice.value - down)
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

onMounted(() => {
  if (route.query.product) {
    try {
      const p = JSON.parse(route.query.product)
      const found = products.find(pr => pr.name === p.name)
      if (found) {
        selectedProducts.value = [found]
        showCalculator.value = true
      }
    } catch (e) { /* ignore */ }
  }
})

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

/* Search */
.search-bar { display: flex; align-items: center; gap: 8px; background: var(--surface-container); border: 1px solid var(--outline-variant); border-radius: 14px; padding: 0 12px; height: 48px; }
.search-icon { font-size: 20px; color: var(--on-surface-variant); }
.search-input { flex: 1; background: none; border: none; outline: none; color: var(--on-surface); font-size: 13px; font-family: inherit; direction: rtl; }
.search-input::placeholder { color: var(--on-surface-variant); }
.clear-icon { font-size: 18px; color: var(--on-surface-variant); cursor: pointer; }

/* Selected Bar */
.selected-bar { display: flex; align-items: center; gap: 10px; background: var(--surface-container); border: 1px solid var(--primary); border-radius: 14px; padding: 10px 12px; }
.selected-pills { flex: 1; display: flex; gap: 6px; overflow-x: auto; -webkit-overflow-scrolling: touch; }
.selected-pills::-webkit-scrollbar { display: none; }
.pill { display: flex; align-items: center; gap: 4px; padding: 6px 10px; border-radius: 20px; background: rgba(242, 202, 80, 0.1); border: 1px solid rgba(242, 202, 80, 0.25); white-space: nowrap; flex-shrink: 0; }
.pill-name { font-size: 11px; font-weight: 600; color: var(--primary); }
.pill-x { width: 18px; height: 18px; border-radius: 50%; background: rgba(242, 202, 80, 0.2); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; padding: 0; }
.pill-x .material-symbols-outlined { font-size: 12px; color: var(--primary); }
.calc-fab { display: flex; align-items: center; gap: 6px; padding: 8px 14px; border-radius: 12px; background: var(--primary); border: none; color: #0a0f1d; font-size: 13px; font-weight: 700; font-family: inherit; cursor: pointer; white-space: nowrap; flex-shrink: 0; }
.calc-fab .material-symbols-outlined { font-size: 20px; }

/* Product List */
.products-grid { display: flex; flex-direction: column; gap: 10px; }
.product-card { display: flex; align-items: center; gap: 12px; background: var(--surface-container); border: 2px solid transparent; border-radius: 16px; padding: 12px; cursor: pointer; transition: border-color 0.2s; }
.product-card.chosen { border-color: var(--primary); }
.product-card-img { width: 60px; height: 60px; border-radius: 12px; object-fit: cover; flex-shrink: 0; }
.product-card-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.product-card-name { font-size: 14px; font-weight: 700; color: var(--on-surface); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.product-card-spec { font-size: 12px; color: var(--on-surface-variant); }
.product-card-price { font-size: 14px; font-weight: 700; color: var(--primary); margin-top: 2px; }
.add-icon { font-size: 26px; color: var(--on-surface-variant); flex-shrink: 0; }
.chosen-badge { width: 28px; height: 28px; border-radius: 50%; background: var(--primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.chosen-badge .material-symbols-outlined { font-size: 18px; color: #0a0f1d; }

.empty-state { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 40px 0; }
.empty-icon { font-size: 48px; color: var(--on-surface-variant); opacity: 0.4; }
.empty-text { font-size: 14px; color: var(--on-surface-variant); }

/* Calculator Summary */
.calc-summary { background: var(--surface-container); border: 1px solid var(--outline-variant); border-radius: 16px; padding: 14px; }
.calc-summary-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
.calc-summary-title { font-size: 14px; font-weight: 700; color: var(--on-surface); }
.back-btn { display: flex; align-items: center; gap: 4px; font-size: 12px; color: var(--primary); background: none; border: none; cursor: pointer; font-family: inherit; font-weight: 600; }
.back-btn .material-symbols-outlined { font-size: 16px; }
.calc-product-row { display: flex; align-items: center; gap: 10px; padding: 8px 0; }
.calc-product-row + .calc-product-row { border-top: 1px solid var(--outline-variant); }
.calc-product-img { width: 44px; height: 44px; border-radius: 10px; object-fit: cover; flex-shrink: 0; }
.calc-product-info { flex: 1; min-width: 0; }
.calc-product-name { font-size: 13px; font-weight: 600; color: var(--on-surface); display: block; }
.calc-product-price { font-size: 12px; color: var(--primary); font-weight: 600; }
.calc-total-row { display: flex; align-items: center; justify-content: space-between; margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--outline-variant); }
.calc-total-label { font-size: 13px; color: var(--on-surface-variant); }
.calc-total-value { font-size: 16px; font-weight: 800; color: var(--primary); }

/* Add More */
.add-more-btn { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 12px; border-radius: 14px; background: none; border: 2px dashed var(--outline-variant); color: var(--on-surface-variant); font-size: 14px; font-weight: 600; font-family: inherit; cursor: pointer; transition: border-color 0.2s; }
.add-more-btn .material-symbols-outlined { font-size: 20px; }
.add-more-btn:active { border-color: var(--primary); }

/* Sections */
.calc-section { background: var(--surface-container); border: 1px solid var(--outline-variant); border-radius: 16px; padding: 16px; }
.calc-section-title { font-size: 14px; font-weight: 600; color: var(--on-surface); margin-bottom: 12px; }
.calc-section-title .optional { font-weight: 400; color: var(--on-surface-variant); font-size: 12px; }
.calc-input-wrap { display: flex; align-items: center; gap: 8px; background: var(--bg); border: 1px solid var(--outline-variant); border-radius: 12px; padding: 0 14px; height: 48px; }
.calc-amount-input { flex: 1; background: none; border: none; outline: none; color: var(--on-surface); font-size: 16px; font-weight: 600; font-family: inherit; direction: ltr; text-align: right; }
.calc-amount-input::placeholder { color: var(--on-surface-variant); font-weight: 400; }
.calc-input-unit { font-size: 14px; color: var(--on-surface-variant); font-weight: 600; }
.calc-after-down { margin-top: 10px; font-size: 13px; color: var(--on-surface-variant); }
.calc-after-down strong { color: var(--primary); }

/* Duration */
.duration-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; }
.duration-btn { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 14px 8px; border-radius: 14px; background: var(--bg); border: 2px solid var(--outline-variant); cursor: pointer; transition: all 0.2s; }
.duration-btn.active { border-color: var(--primary); background: rgba(242, 202, 80, 0.08); }
.dur-num { font-size: 18px; font-weight: 700; color: var(--on-surface); }
.dur-label { font-size: 10px; color: var(--on-surface-variant); }
.duration-btn.active .dur-num { color: var(--primary); }

/* Result */
.result-card { background: linear-gradient(135deg, rgba(242, 202, 80, 0.08), rgba(242, 202, 80, 0.03)); border: 1px solid var(--primary); border-radius: 16px; padding: 16px; }
.result-row { display: flex; align-items: center; justify-content: space-between; padding: 4px 0; }
.result-label { font-size: 13px; color: var(--on-surface-variant); }
.result-value-wrap { display: flex; align-items: baseline; gap: 4px; }
.result-value { font-size: 28px; font-weight: 800; color: var(--primary); }
.result-unit { font-size: 14px; font-weight: 600; color: var(--primary); }
.result-value-sm { font-size: 14px; font-weight: 600; color: var(--on-surface); }
.result-divider { height: 1px; background: var(--outline-variant); margin: 8px 0; }

/* Submit */
.submit-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 16px; border-radius: 14px; background: var(--primary); border: none; color: #0a0f1d; font-size: 16px; font-weight: 700; font-family: inherit; cursor: pointer; transition: opacity 0.2s; }
.submit-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.submit-btn .material-symbols-outlined { font-size: 22px; }

/* Bottom Nav */
.bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; height: 64px; background: var(--bg); border-top: 1px solid var(--outline-variant); display: flex; justify-content: space-around; align-items: center; padding-bottom: env(safe-area-inset-bottom, 4px); z-index: 50; }
.nav-item { display: flex; flex-direction: column; align-items: center; gap: 2px; background: none; border: none; color: var(--on-surface-variant); cursor: pointer; padding: 4px 8px; }
.nav-icon { font-size: 24px; }
.nav-label { font-size: 10px; font-weight: 500; }
</style>
