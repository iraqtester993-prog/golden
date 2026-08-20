<template>
  <div class="page">
    <TopBar title="حاسبة التقسيط" :showBack="true" />

    <div class="page-content">
      <!-- STEP 1: Product Selection -->
      <template v-if="!showCalculator && !showStep3">
        <!-- Categories -->
        <div class="categories">
          <button class="cat-item" v-for="cat in categories" :key="cat.label" :class="{ active: activeCat === cat.label }" @click="activeCat = cat.label">
            <div class="cat-icon-wrap">
              <img :src="cat.img" class="cat-img" />
            </div>
            <span class="cat-label">{{ cat.label }}</span>
          </button>
        </div>

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
            <span>احسب القسط ({{ selectedProducts.length }})</span>
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
            <button class="details-btn" @click.stop="openDetails(p)">
              <span class="material-symbols-outlined">info</span>
              <span>تفاصيل المنتج</span>
            </button>
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
      <template v-else-if="showCalculator && !showStep3">
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
        <button class="submit-btn" :disabled="!selectedMonths || !netAmount" @click="goToStep3">
          <span class="material-symbols-outlined">calculate</span>
          <span>تقديم طلب أقساط</span>
        </button>
      </template>

      <!-- STEP 3: Personal Info + Submit -->
      <template v-else-if="showStep3">
        <div class="calc-summary">
          <div class="calc-summary-header">
            <span class="calc-summary-title">ملخص الطلب</span>
            <button class="back-btn" @click="showStep3 = false">
              <span class="material-symbols-outlined">arrow_forward_ios</span>
              <span>تعديل</span>
            </button>
          </div>
          <div class="calc-total-row">
            <span class="calc-total-label">{{ selectedProducts.length }} منتجات - {{ selectedMonths }} شهر</span>
            <span class="calc-total-value">{{ formatNum(monthlyInstallment) }} د.ع/شهر</span>
          </div>
        </div>

        <!-- Personal Info -->
        <div class="calc-section">
          <h3 class="calc-section-title">
            <span class="material-symbols-outlined" style="font-size:18px;color:var(--primary)">person</span>
            البيانات الشخصية
          </h3>
          <div class="form-group">
            <label class="form-label">الاسم الكامل</label>
            <input v-model="fullName" class="form-input" type="text" placeholder="أدخل الاسم الكامل" />
          </div>
          <div class="form-group">
            <label class="form-label">رقم الهاتف</label>
            <input v-model="phone" class="form-input" type="tel" dir="ltr" placeholder="07XX XXX XXXX" />
          </div>
          <div class="form-group">
            <label class="form-label">العنوان</label>
            <input v-model="address" class="form-input" type="text" placeholder="المدينة / المنطقة" />
          </div>
          <div class="form-group">
            <label class="form-label">نوع العميل</label>
            <div class="client-type-grid">
              <button class="client-type-btn" :class="{ active: clientType === 'employee' }" @click="clientType = 'employee'">
                <span class="material-symbols-outlined">badge</span>
                <span>موظف</span>
              </button>
              <button class="client-type-btn" :class="{ active: clientType === 'merchant' }" @click="clientType = 'merchant'">
                <span class="material-symbols-outlined">storefront</span>
                <span>تاجر</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Salary -->
        <div class="calc-section">
          <h3 class="calc-section-title">
            <span class="material-symbols-outlined" style="font-size:18px;color:var(--primary)">account_balance</span>
            الراتب الشهري
          </h3>
          <div class="calc-input-wrap">
            <input v-model="salary" class="calc-amount-input" type="number" placeholder="0" min="0" />
            <span class="calc-input-unit">د.ع</span>
          </div>
          <div v-if="salary && monthlyInstallment > 0" class="salary-check">
            <span class="material-symbols-outlined" :class="salaryCheck.ok ? 'check-ok' : 'check-bad'">{{ salaryCheck.ok ? 'check_circle' : 'error' }}</span>
            <span :class="salaryCheck.ok ? 'check-ok' : 'check-bad'">{{ salaryCheck.text }}</span>
          </div>
        </div>

        <!-- Final Summary -->
        <div class="result-card">
          <div class="result-row">
            <span class="result-label">إجمالي المنتجات</span>
            <span class="result-value-sm">{{ formatNum(totalPrice) }} د.ع</span>
          </div>
          <div class="result-row" v-if="downPayment > 0">
            <span class="result-label">المبلغ المقدم</span>
            <span class="result-value-sm">{{ formatNum(Number(downPayment)) }} د.ع</span>
          </div>
          <div class="result-row">
            <span class="result-label">مدة التقسيط</span>
            <span class="result-value-sm">{{ selectedMonths }} شهر</span>
          </div>
          <div class="result-divider"></div>
          <div class="result-row">
            <span class="result-label">القسط الشهري</span>
            <div class="result-value-wrap">
              <span class="result-value">{{ formatNum(monthlyInstallment) }}</span>
              <span class="result-unit">د.ع</span>
            </div>
          </div>
        </div>

        <!-- Submit -->
        <button class="submit-btn" :disabled="!isFormValid" @click="submitRequest">
          <span class="material-symbols-outlined">send</span>
          <span>تقديم طلب التقسيط</span>
        </button>
      </template>
    </div>

    <!-- Detail Sheet -->
    <div v-if="detailProduct" class="sheet-overlay" @click.self="detailProduct = null">
      <div class="sheet">
        <div class="sheet-handle"><div class="handle-bar"></div><button class="sheet-close" @click="detailProduct = null"><span class="material-symbols-outlined">close</span></button></div>
        <div class="sheet-scroll">
          <img :src="detailProduct.img" class="sheet-img" @click="fullscreenImg = detailProduct.img" />
          <div class="sheet-body">
            <h2 class="sheet-name">{{ detailProduct.name }}</h2>
            <span class="sheet-spec">{{ detailProduct.spec }}</span>
            <div class="sheet-price">{{ detailProduct.price }} د.ع</div>
            <p class="sheet-desc">{{ detailProduct.desc }}</p>
            <h3 class="sheet-sub">المواصفات</h3>
            <div class="sheet-specs">
              <div v-for="(val, key) in detailProduct.specs" :key="key" class="sheet-spec-row">
                <span class="sheet-spec-key">{{ key }}</span>
                <span class="sheet-spec-val">{{ val }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="sheet-actions">
          <button class="sheet-action-select" @click="toggleProduct(detailProduct); detailProduct = null">
            <span class="material-symbols-outlined">{{ isSelected(detailProduct) ? 'remove_circle' : 'add_circle' }}</span>
            <span>{{ isSelected(detailProduct) ? 'إزالة من الاختيار' : 'اختيار المنتج' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Fullscreen Image -->
    <div v-if="fullscreenImg" class="fullscreen-overlay" @click="fullscreenImg = null">
      <button class="fs-close"><span class="material-symbols-outlined">close</span></button>
      <img :src="fullscreenImg" class="fs-img" />
    </div>

    <nav class="bottom-nav">
      <button class="nav-item" v-for="item in navItems" :key="item.label" :class="{ active: item.route === '/calculator' }" @click="goTo(item.route)">
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
const showStep3 = ref(false)
const downPayment = ref('')
const selectedMonths = ref(null)
const detailProduct = ref(null)
const fullscreenImg = ref(null)
const activeCat = ref('الكل')
const fullName = ref('')
const phone = ref('')
const address = ref('')
const clientType = ref('employee')
const salary = ref('')
const durations = [10, 16, 18, 24, 36]

const openDetails = (p) => { detailProduct.value = p }

const goToStep3 = () => { showStep3.value = true }

const salaryCheck = computed(() => {
  if (!salary.value || !monthlyInstallment.value) return { ok: true, text: '' }
  const ratio = monthlyInstallment.value / Number(salary.value)
  if (ratio <= 0.4) return { ok: true, text: 'القسط مقبول نسبةً للراتب' }
  if (ratio <= 0.6) return { ok: false, text: 'تنبيه: القسط مرتفع نسبياً للراتب' }
  return { ok: false, text: 'القسط يتجاوز 60% من الراتب' }
})

const isFormValid = computed(() => {
  return fullName.value.trim() && phone.value.trim() && address.value.trim() && salary.value > 0 && selectedMonths.value && netAmount.value > 0
})

const categories = [
  { img: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=200&h=200&fit=crop', label: 'الكل' },
  { img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop', label: 'هواتف' },
  { img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop', label: 'لابتوب' },
  { img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop', label: 'تلفزيونات' },
  { img: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=200&h=200&fit=crop', label: 'سماعات' }
]

const products = [
  {
    name: 'iPhone 16 Pro Max', spec: '256GB - تيتانيوم', price: '1,850,000', priceRaw: 1850000, cat: 'هواتف',
    img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=800&fit=crop',
    desc: 'هاتف آيفون 16 برو ماكس بسعة 256 جيجابايت، شاشة Super Retina XDR بحجم 6.9 بوصة، معالج A18 Pro، كاميرا ثلاثية 48 ميجابكسل.',
    specs: { 'الشاشة': '6.9 بوصة Super Retina XDR', 'المعالج': 'A18 Pro', 'الذاكرة': '256GB', 'الكاميرا': '48MP + 12MP + 12MP', 'البطارية': '4685 mAh', 'نظام التشغيل': 'iOS 18' }
  },
  {
    name: 'Samsung S24 Ultra', spec: '512GB - أسود', price: '1,650,000', priceRaw: 1650000, cat: 'هواتف',
    img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&h=800&fit=crop',
    desc: 'سامسونج جالكسي S24 ألترا بسعة 512 جيجابايت، شاشة Dynamic AMOLED 2X، معالج Snapdragon 8 Gen 3، قلم S Pen.',
    specs: { 'الشاشة': '6.8 بوصة Dynamic AMOLED 2X', 'المعالج': 'Snapdragon 8 Gen 3', 'الذاكرة': '512GB', 'الكاميرا': '200MP + 50MP + 12MP', 'البطارية': '5000 mAh', 'نظام التشغيل': 'Android 14' }
  },
  {
    name: 'Hisense 55 inch 4K', spec: 'Smart TV - ULED', price: '820,000', priceRaw: 820000, cat: 'تلفزيونات',
    img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=800&fit=crop',
    desc: 'تلفزيون هيسينس ذكي 55 بوصة بتقنية ULED 4K، دعم HDR10+، صوت Dolby Atmos.',
    specs: { 'الشاشة': '55 بوصة 4K ULED', 'الدقة': '3840 × 2160', 'HDR': 'HDR10+', 'الصوت': 'Dolby Atmos 30W', 'المنافذ': '3 × HDMI, 2 × USB', 'النظام': 'VIDAA U6' }
  },
  {
    name: 'MacBook Pro M3', spec: '14 inch - 512GB', price: '5,200,000', priceRaw: 5200000, cat: 'لابتوب',
    img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop',
    desc: 'ماك بوك برو بمعالج M3، شاشة Liquid Retina XDR بحجم 14 بوصة، أداء احترافي للمطورين والمبدعين.',
    specs: { 'الشاشة': '14.2 بوصة Liquid Retina XDR', 'المعالج': 'Apple M3', 'الذاكرة': '512GB SSD', 'الرام': '18GB Unified', 'البطارية': 'حتى 17 ساعة', 'نظام التشغيل': 'macOS Sonoma' }
  },
  {
    name: 'iPad Pro M4', spec: '13 inch - 256GB', price: '3,100,000', priceRaw: 3100000, cat: 'لابتوب',
    img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=800&fit=crop',
    desc: 'آيباد برو بمعالج M4، شاشة Ultra Retina XDR بحجم 13 بوصة، أرفع وأخف من أي وقت.',
    specs: { 'الشاشة': '13 بوصة Ultra Retina XDR', 'المعالج': 'Apple M4', 'الذاكرة': '256GB', 'الكاميرا': '12MP Wide', 'الوزن': '579 جرام', 'نظام التشغيل': 'iPadOS 17' }
  },
  {
    name: 'AirPods Pro 2', spec: 'USB-C - Active NC', price: '580,000', priceRaw: 580000, cat: 'سماعات',
    img: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&h=800&fit=crop',
    desc: 'إيربودز برو 2 مع تقنية إلغاء الضوضاء النشط، صوت مكاني، وشحن عبر USB-C.',
    specs: { 'النوع': 'In-Ear Wireless', 'الإلغاء': 'Active Noise Cancellation', 'المدة': 'حتى 6 ساعات', 'الحالة': 'حتى 30 ساعة', 'الشحن': 'USB-C + MagSafe', 'المقاومة': 'IP54' }
  }
]

const filteredProducts = computed(() => {
  let list = products
  if (activeCat.value !== 'الكل') {
    list = list.filter(p => p.cat === activeCat.value)
  }
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.spec.toLowerCase().includes(q))
  }
  return list
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
  if (selectedProducts.value.length === 0) { showCalculator.value = false; showStep3.value = false }
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
  const orders = JSON.parse(localStorage.getItem('golden_orders') || '[]')
  const newId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1001
  const now = new Date()
  const dateStr = now.toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' })

  orders.push({
    id: newId,
    date: dateStr,
    status: 'pending',
    products: selectedProducts.value.map(p => ({ name: p.name, spec: p.spec, price: p.price, priceRaw: p.priceRaw, img: p.img })),
    fullName: fullName.value,
    phone: phone.value,
    address: address.value,
    clientType: clientType.value,
    salary: Number(salary.value),
    totalPrice: totalPrice.value,
    downPayment: Number(downPayment.value) || 0,
    netAmount: netAmount.value,
    months: selectedMonths.value,
    monthlyInstallment: monthlyInstallment.value,
    totalAmount: totalAmount.value,
    ownerNote: ''
  })

  localStorage.setItem('golden_orders', JSON.stringify(orders))
  router.push('/orders')
}

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('golden_user') || 'null')
  if (user) {
    fullName.value = user.fullName || ''
    phone.value = user.phone || ''
    address.value = user.address || ''
    clientType.value = user.clientType || 'employee'
  }

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
  if (route.query.products) {
    try {
      const requested = JSON.parse(route.query.products)
      selectedProducts.value = products.filter(product => requested.some(item => item.name === product.name))
      showCalculator.value = selectedProducts.value.length > 0
    } catch (e) { /* ignore */ }
  }
})

const navItems = [
  { icon: 'home', label: 'الرئيسية', route: '/home' },
  { icon: 'shopping_bag', label: 'المتجر', route: '/store' },
  { icon: 'account_balance_wallet', label: 'أقساطي', route: '/settlements' },
  { icon: 'receipt_long', label: 'طلباتي', route: '/orders' },
  { icon: 'person', label: 'حسابي', route: '/account' }
]
</script>

<style scoped>
.page { width: 100%; max-width:100%; height: 100dvh; background: var(--bg); display: flex; flex-direction: column; overflow: hidden; }
.page-content { flex: 1; min-width:0; max-width:100%; overflow-y: auto; overflow-x:hidden; padding: 12px 16px 100px; display: flex; flex-direction: column; gap: 12px; }
.page-content > * { flex-shrink: 0; }

/* Search */
.search-bar { display: flex; align-items: center; gap: 8px; background: var(--surface-container); border: 1px solid var(--outline-variant); border-radius: 14px; padding: 0 12px; height: 48px; }
.search-icon { font-size: 20px; color: var(--on-surface-variant); }
.search-input { flex: 1; background: none; border: none; outline: none; color: var(--on-surface); font-size: 13px; font-family: inherit; direction: rtl; }
.search-input::placeholder { color: var(--on-surface-variant); }
.clear-icon { font-size: 18px; color: var(--on-surface-variant); cursor: pointer; }

/* Categories */
.categories { display: flex; justify-content:space-between; gap:4px; overflow-x: hidden; padding: 4px 0; flex-shrink: 0; }
.categories::-webkit-scrollbar { display: none; }
.cat-item { flex:1; min-width:0; display: flex; flex-direction: column; align-items: center; gap: 6px; background: none; border: none; cursor: pointer; }
.cat-icon-wrap { width: 56px; height: 56px; border-radius: 50%; background: var(--surface-container); border: 2px solid var(--outline-variant); display: flex; align-items: center; justify-content: center; transition: all 0.2s; overflow: hidden; }
.cat-item.active .cat-icon-wrap { border-color: var(--primary); background: rgba(242, 202, 80, 0.1); }
.cat-img { width: 56px; height: 56px; object-fit: cover; border-radius: 50%; }
.cat-label { font-size: 11px; color: var(--on-surface-variant); white-space: nowrap; font-weight: 500; }
.cat-item.active .cat-label { color: var(--primary); font-weight: 700; }

/* Selected Bar */
.selected-bar { display: flex; flex-wrap:wrap; align-items: center; gap: 10px; background: var(--surface-container); border: 1px solid var(--primary); border-radius: 14px; padding: 10px 12px; }
.selected-pills { flex: 1 1 100%; display: flex; flex-wrap:wrap; gap: 6px; overflow-x: hidden; }
.selected-pills::-webkit-scrollbar { display: none; }
.pill { display: flex; align-items: center; gap: 4px; padding: 6px 10px; border-radius: 20px; background: rgba(242, 202, 80, 0.1); border: 1px solid rgba(242, 202, 80, 0.25); white-space: nowrap; flex-shrink: 0; }
.pill-name { font-size: 11px; font-weight: 600; color: var(--primary); }
.pill-x { width: 18px; height: 18px; border-radius: 50%; background: rgba(242, 202, 80, 0.2); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; padding: 0; }
.pill-x .material-symbols-outlined { font-size: 12px; color: var(--primary); }
.calc-fab { width:100%; display: flex; justify-content:center; align-items: center; gap: 6px; padding: 8px 14px; border-radius: 12px; background: var(--primary); border: none; color: #0a0f1d; font-size: 13px; font-weight: 700; font-family: inherit; cursor: pointer; white-space: nowrap; }
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
.details-btn { display: flex; align-items: center; gap: 4px; padding: 6px 10px; border-radius: 8px; background: rgba(99, 179, 237, 0.12); border: 1px solid rgba(99, 179, 237, 0.3); cursor: pointer; flex-shrink: 0; }
.details-btn .material-symbols-outlined { font-size: 16px; color: #63b3ed; }
.details-btn span:last-child { font-size: 11px; font-weight: 600; color: #63b3ed; font-family: inherit; white-space: nowrap; }
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
.duration-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 8px; }
.duration-btn { min-width:0; display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 12px 3px; border-radius: 14px; background: var(--bg); border: 2px solid var(--outline-variant); cursor: pointer; transition: all 0.2s; }
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

/* Form */
.form-group { margin-bottom: 14px; }
.form-group:last-child { margin-bottom: 0; }
.form-label { display: block; font-size: 13px; font-weight: 600; color: var(--on-surface-variant); margin-bottom: 6px; }
.form-input { width: 100%; padding: 12px 14px; border-radius: 12px; border: 1px solid var(--outline-variant); background: var(--bg); color: var(--on-surface); font-size: 14px; font-family: inherit; outline: none; }
.form-input:focus { border-color: var(--primary); }
.form-input::placeholder { color: var(--on-surface-variant); }
.client-type-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.client-type-btn { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 12px; border-radius: 12px; background: var(--bg); border: 2px solid var(--outline-variant); font-size: 14px; font-weight: 600; color: var(--on-surface-variant); cursor: pointer; font-family: inherit; }
.client-type-btn .material-symbols-outlined { font-size: 20px; }
.client-type-btn.active { border-color: var(--primary); background: rgba(242, 202, 80, 0.08); color: var(--primary); }

/* Salary Check */
.salary-check { display: flex; align-items: center; gap: 6px; margin-top: 10px; font-size: 13px; font-weight: 600; }
.check-ok { color: #81c784; }
.check-bad { color: #ef5350; }
.salary-check .material-symbols-outlined { font-size: 18px; }

/* Bottom Nav */
.bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; height: 64px; background: var(--bg); border-top: 1px solid var(--outline-variant); display: flex; justify-content: space-around; align-items: center; padding-bottom: env(safe-area-inset-bottom, 4px); z-index: 50; }
.nav-item { display: flex; flex-direction: column; align-items: center; gap: 2px; background: none; border: none; color: var(--on-surface-variant); cursor: pointer; padding: 4px 8px; }
.nav-icon { font-size: 24px; }
.nav-label { font-size: 10px; font-weight: 500; }

/* Detail Sheet */
.sheet-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 100; display: flex; align-items: flex-end; justify-content: center; }
.sheet { width: 100%; max-width: 480px; max-height: 85vh; background: var(--bg); border-radius: 20px 20px 0 0; display: flex; flex-direction: column; animation: slideUp 0.25s ease; }
@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
.sheet-handle { display: flex; justify-content: center; padding: 10px 0 4px; cursor: pointer; position:relative; }
.sheet-close { position:absolute; left:12px; top:5px; border:0; background:transparent; color:var(--on-surface-variant); cursor:pointer; }.sheet-close .material-symbols-outlined{font-size:20px}
.handle-bar { width: 40px; height: 4px; border-radius: 2px; background: var(--outline-variant); }
.sheet-scroll { flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch; }
.sheet-img { width: 100%; aspect-ratio: 4/3; object-fit: cover; cursor: pointer; }
.sheet-body { padding: 16px; }
.sheet-name { font-size: 20px; font-weight: 800; color: var(--on-surface); margin-bottom: 4px; }
.sheet-spec { font-size: 13px; color: var(--on-surface-variant); display: block; margin-bottom: 8px; }
.sheet-price { font-size: 22px; font-weight: 800; color: var(--primary); margin-bottom: 14px; }
.sheet-desc { font-size: 13px; line-height: 1.8; color: var(--on-surface-variant); margin-bottom: 16px; }
.sheet-sub { font-size: 15px; font-weight: 700; color: var(--on-surface); margin-bottom: 10px; }
.sheet-specs { background: var(--surface-container); border-radius: 14px; overflow: hidden; }
.sheet-spec-row { display: flex; justify-content: space-between; padding: 12px 14px; border-bottom: 1px solid var(--outline-variant); }
.sheet-spec-row:last-child { border-bottom: none; }
.sheet-spec-key { font-size: 13px; color: var(--on-surface-variant); }
.sheet-spec-val { font-size: 13px; font-weight: 600; color: var(--on-surface); }
.sheet-actions { padding: 12px 16px; border-top: 1px solid var(--outline-variant); }
.sheet-action-select { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 14px; border-radius: 14px; background: var(--primary); border: none; color: #0a0f1d; font-size: 15px; font-weight: 700; font-family: inherit; cursor: pointer; }
.sheet-action-select .material-symbols-outlined { font-size: 22px; }

/* Fullscreen */
.fullscreen-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.95); z-index: 200; display: flex; align-items: center; justify-content: center; }
.fs-close { position: absolute; top: 16px; left: 16px; width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,0.15); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 1; }
.fs-close .material-symbols-outlined { font-size: 24px; color: #fff; }
.fs-img { max-width: 95%; max-height: 90vh; object-fit: contain; border-radius: 8px; }
</style>
