<template>
  <div class="home-screen">
    <TopBar />

    <main class="main-content">
      <!-- Installment Card -->
      <section class="card-wrap">
        <div class="card-header">
            <div class="invoice-pill" @click="showInvoices = !showInvoices">
              <span>اختر الفاتورة</span>
              <span class="material-symbols-outlined pill-arrow" :class="{ rotated: showInvoices }">keyboard_arrow_down</span>
            </div>
            <h2 class="card-title">أقساطي</h2>
            <div class="invoice-num-pill">
              <span>#{{ selectedInvoice.id }}</span>
            </div>
            <div class="invoice-dropdown" v-if="showInvoices">
              <div class="invoice-option" v-for="inv in invoices" :key="inv.id" :class="{ selected: selectedInvoice.id === inv.id }" @click="selectInvoice(inv)">
                <div class="inv-info">
                  <span class="inv-name">{{ inv.name }}</span>
                  <span class="inv-id">فاتورة #{{ inv.id }}</span>
                </div>
                <span class="inv-remaining">{{ inv.remaining }} د.ع</span>
              </div>
            </div>
          </div>

          <div class="stats-grid">
            <div class="stat-col border-l">
              <span class="stat-label">المبلغ المتبقي</span>
              <div class="stat-row">
                <span class="stat-num gold">{{ selectedInvoice.remaining }}</span>
                <span class="stat-unit">د.ع</span>
              </div>
            </div>
            <div class="stat-col pr-2">
              <span class="stat-label">المبلغ الكلي</span>
              <div class="stat-row">
                <span class="stat-num">{{ selectedInvoice.total }}</span>
                <span class="stat-unit">د.ع</span>
              </div>
            </div>
          </div>

          <div class="stats-grid border-t">
            <div class="stat-col border-l">
              <span class="stat-label">عدد الأقساط المتبقية</span>
              <div class="stat-row">
                <span class="stat-num">{{ selectedInvoice.remainingInstallments }}</span>
                <span class="stat-unit">قسط</span>
              </div>
            </div>
            <div class="stat-col pr-2">
              <span class="stat-label">عدد الأقساط الكلية</span>
              <div class="stat-row">
                <span class="stat-num">{{ selectedInvoice.totalInstallments }}</span>
                <span class="stat-unit">قسط</span>
              </div>
            </div>
          </div>

          <div class="date-bar">
            <div class="date-left">
              <span class="material-symbols-outlined date-icon">calendar_today</span>
              <span>تاريخ القسط {{ selectedInvoice.nextDate }}</span>
            </div>
            <span class="date-badge">{{ selectedInvoice.duration }}</span>
          </div>
      </section>

      <!-- Quick Actions -->
      <section class="quick-grid">
        <button class="action-btn" v-for="action in quickActions" :key="action.label" @click="action.handler">
          <span class="material-symbols-outlined action-icon filled">{{ action.icon }}</span>
          <span class="action-label">{{ action.label }}</span>
        </button>
      </section>

      <!-- Image Slider -->
      <section class="slider-wrap">
        <div class="slider-viewport">
          <div class="slider-track" :style="{ transform: `translateX(${currentSlide * 100}%)` }">
            <div class="slide" v-for="(slide, i) in slides" :key="i">
              <img :src="slide" class="slide-img" />
            </div>
          </div>
          <div class="slider-dots">
            <span v-for="(_, i) in slides" :key="i" class="s-dot" :class="{ active: currentSlide === i }" @click="currentSlide = i"></span>
          </div>
        </div>
      </section>

      <!-- Services Grid -->
      <section>
        <h2 class="section-heading">الخدمات</h2>
        <div class="services-grid">
          <div class="svc-item" v-for="service in services" :key="service.label" @click="service.handler">
            <span class="material-symbols-outlined svc-icon filled">{{ service.icon }}</span>
            <span class="svc-label">{{ service.label }}</span>
          </div>
        </div>
      </section>

      <!-- Recent Transaction -->
      <section>
        <div class="tx-header">
          <h2 class="section-heading">آخر الحركات</h2>
          <button class="view-all">عرض الكل</button>
        </div>
        <div class="tx-card">
          <div class="tx-right">
            <div class="tx-icon">
              <span class="material-symbols-outlined">payments</span>
            </div>
            <div>
              <h4 class="tx-name">تم تسديد قسط</h4>
              <p class="tx-ref">فاتورة #10235</p>
            </div>
          </div>
          <div class="tx-left">
            <div class="tx-amount-row">
              <span class="material-symbols-outlined tx-check">check_circle</span>
              <span class="tx-amount">250,000 د.ع</span>
            </div>
            <span class="tx-date">2024/05/20</span>
          </div>
        </div>
      </section>
    </main>

    <!-- Branches Sheet -->
    <div v-if="showBranchesSheet" class="sheet-overlay" @click.self="showBranchesSheet = false">
      <div class="sheet">
        <div class="sheet-handle"><div class="handle-bar"></div><button class="sheet-close" @click="showBranchesSheet = false"><span class="material-symbols-outlined">close</span></button></div>
        <div class="sheet-scroll">
          <h3 class="sheet-title">فروع الشركة</h3>
          <div v-for="b in branches" :key="b.name" class="branch-card">
            <img :src="b.img" class="branch-img" />
            <div class="branch-body">
              <h4 class="branch-name">{{ b.name }}</h4>
              <div class="branch-row">
                <span class="material-symbols-outlined">location_on</span>
                <span>{{ b.address }}</span>
              </div>
              <div class="branch-phones">
                <a v-for="phone in b.phones" :key="phone" :href="'https://wa.me/' + phone.replace(/^0/, '964')" target="_blank" class="phone-btn" @click.stop>
                  <span class="material-symbols-outlined">phone</span>
                  <span dir="ltr">{{ phone }}</span>
                  <span class="wa-badge">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dealers Sheet -->
    <div v-if="showDealersSheet" class="sheet-overlay" @click.self="showDealersSheet = false">
      <div class="sheet">
        <div class="sheet-handle"><div class="handle-bar"></div><button class="sheet-close" @click="showDealersSheet = false"><span class="material-symbols-outlined">close</span></button></div>
        <div class="sheet-scroll">
          <h3 class="sheet-title">الوكلاء المعتمدون</h3>
          <div v-for="d in dealers" :key="d.name" class="branch-card">
            <img :src="d.img" class="branch-img" />
            <div class="branch-body">
              <h4 class="branch-name">{{ d.name }}</h4>
              <div class="branch-row">
                <span class="material-symbols-outlined">location_on</span>
                <span>{{ d.address }}</span>
              </div>
              <div class="branch-phones">
                <a v-for="phone in d.phones" :key="phone" :href="'https://wa.me/' + phone.replace(/^0/, '964')" target="_blank" class="phone-btn" @click.stop>
                  <span class="material-symbols-outlined">phone</span>
                  <span dir="ltr">{{ phone }}</span>
                  <span class="wa-badge">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Brands Sheet -->
    <div v-if="showBrandsSheet" class="sheet-overlay" @click.self="showBrandsSheet = false">
      <div class="sheet">
        <div class="sheet-handle"><div class="handle-bar"></div><button class="sheet-close" @click="showBrandsSheet = false"><span class="material-symbols-outlined">close</span></button></div>
        <div class="sheet-scroll">
          <h3 class="sheet-title">الماركات</h3>
          <template v-if="!selectedBrand">
            <div class="brands-grid">
              <div v-for="brand in brands" :key="brand.name" class="brand-card" @click="selectedBrand = brand">
                <img :src="brand.img" class="brand-img" />
                <span class="brand-name">{{ brand.name }}</span>
              </div>
            </div>
          </template>
          <template v-else>
            <button class="back-link" @click="selectedBrand = null">
              <span class="material-symbols-outlined">arrow_forward_ios</span>
              <span>العودة للماركات</span>
            </button>
            <h4 class="brand-selected-title">{{ selectedBrand.name }}</h4>
            <div class="brand-products">
              <div v-for="p in brandProducts" :key="p.name" class="brand-product-card" @click="goTo('/store')">
                <img :src="p.img" class="brand-product-img" />
                <div class="brand-product-info">
                  <span class="brand-product-name">{{ p.name }}</span>
                  <span class="brand-product-spec">{{ p.spec }}</span>
                  <span class="brand-product-price">{{ p.price }} د.ع</span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Close Invoice Sheet -->
    <div v-if="showCloseSheet" class="sheet-overlay" @click.self="showCloseSheet = false">
      <div class="sheet">
        <div class="sheet-handle"><div class="handle-bar"></div><button class="sheet-close" @click="showCloseSheet = false"><span class="material-symbols-outlined">close</span></button></div>
        <div class="sheet-scroll">
          <div class="close-invoice-content">
            <span class="material-symbols-outlined close-icon">receipt_long</span>
            <h3 class="sheet-title">إطفاء فاتورة</h3>
            <p class="close-desc">سيتم تقديم طلب لتسديد كامل المبالغ المتبقية على الفاتورة المحددة.</p>
            <div class="close-inv-card">
              <span class="close-inv-name">{{ selectedInvoice.name }}</span>
              <span class="close-inv-id">فاتورة #{{ selectedInvoice.id }}</span>
              <span class="close-inv-amount">المبلغ المتبقي: {{ selectedInvoice.remaining }} د.ع</span>
            </div>
            <div class="close-actions">
              <button class="close-confirm-btn" @click="submitCloseInvoice">تقديم الطلب</button>
              <button class="close-cancel-btn" @click="showCloseSheet = false">إلغاء</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Account Statement Sheet -->
    <div v-if="showStatementSheet" class="sheet-overlay" @click.self="showStatementSheet = false">
      <div class="sheet">
        <div class="sheet-handle"><div class="handle-bar"></div><button class="sheet-close" @click="showStatementSheet = false"><span class="material-symbols-outlined">close</span></button></div>
        <div class="sheet-scroll">
          <h3 class="sheet-title">كشف حساب</h3>
          <div class="statement-inv-select">
            <button v-for="inv in invoices" :key="inv.id" class="stmt-inv-btn" :class="{ active: statementInv.id === inv.id }" @click="statementInv = inv">
              <span class="stmt-inv-name">{{ inv.name }}</span>
              <span class="stmt-inv-id">#{{ inv.id }}</span>
            </button>
          </div>
          <div class="stmt-details">
            <div class="stmt-row highlight">
              <span class="stmt-label">المنتج</span>
              <span class="stmt-value">{{ statementInv.name }}</span>
            </div>
            <div class="stmt-row">
              <span class="stmt-label">رقم الفاتورة</span>
              <span class="stmt-value">#{{ statementInv.id }}</span>
            </div>
            <div class="stmt-row">
              <span class="stmt-label">المبلغ الكلي</span>
              <span class="stmt-value">{{ statementInv.total }} د.ع</span>
            </div>
            <div class="stmt-row">
              <span class="stmt-label">المبلغ المتبقي</span>
              <span class="stmt-value stmt-primary">{{ statementInv.remaining }} د.ع</span>
            </div>
            <div class="stmt-row">
              <span class="stmt-label">القسط الشهري</span>
              <span class="stmt-value">{{ statementInv.monthly }} د.ع</span>
            </div>
            <div class="stmt-divider"></div>
            <div class="stmt-row">
              <span class="stmt-label">إجمالي الأقساط</span>
              <span class="stmt-value">{{ statementInv.totalInstallments }} قسط</span>
            </div>
            <div class="stmt-row">
              <span class="stmt-label">الأقساط المدفوعة</span>
              <span class="stmt-value">{{ statementInv.totalInstallments - statementInv.remainingInstallments }} قسط</span>
            </div>
            <div class="stmt-row">
              <span class="stmt-label">الأقساط المتبقية</span>
              <span class="stmt-value stmt-primary">{{ statementInv.remainingInstallments }} قسط</span>
            </div>
            <div class="stmt-divider"></div>
            <div class="stmt-row">
              <span class="stmt-label">تاريخ القسط القادم</span>
              <span class="stmt-value">{{ statementInv.nextDate }}</span>
            </div>
            <div class="stmt-row">
              <span class="stmt-label">المدة المتبقية</span>
              <span class="stmt-value">{{ statementInv.duration }}</span>
            </div>
            <!-- Installment Breakdown -->
            <h4 class="stmt-sub-title">جدول الأقساط</h4>
            <div class="stmt-installments">
              <div v-for="n in statementInv.totalInstallments" :key="n" class="inst-row" :class="{ paid: n <= (statementInv.totalInstallments - statementInv.remainingInstallments), next: n === (statementInv.totalInstallments - statementInv.remainingInstallments + 1) }">
                <span class="inst-num">قسط {{ n }}</span>
                <span class="inst-amount">{{ statementInv.monthly }} د.ع</span>
                <span class="inst-status">
                  <span v-if="n <= (statementInv.totalInstallments - statementInv.remainingInstallments)" class="material-symbols-outlined inst-check">check_circle</span>
                  <span v-else-if="n === (statementInv.totalInstallments - statementInv.remainingInstallments + 1)" class="inst-next-badge">القادم</span>
                  <span v-else class="inst-pending">قريبًا</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <div v-if="toast" class="toast" :class="'toast-' + toast.type">
      <span class="material-symbols-outlined">{{ toast.type === 'success' ? 'check_circle' : 'info' }}</span>
      <span>{{ toast.msg }}</span>
    </div>

    <nav class="bottom-nav">
      <button class="nav-item" v-for="(item, i) in navItems" :key="item.label" :class="{ active: i === 0 }" @click="goTo(item.route)">
        <div class="nav-icon-wrap">
          <span class="material-symbols-outlined nav-icon" :class="{ filled: i === 0 }">{{ item.icon }}</span>
          <span v-if="item.badge" class="nav-badge"></span>
          <span v-if="i === 0" class="nav-dot"></span>
        </div>
        <span class="nav-label">{{ item.label }}</span>
      </button>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import TopBar from '../components/TopBar.vue'

const router = useRouter()
const goTo = (route) => { if (route) router.push(route) }

const showInvoices = ref(false)
const showBranchesSheet = ref(false)
const showDealersSheet = ref(false)
const showBrandsSheet = ref(false)
const showCloseSheet = ref(false)
const showStatementSheet = ref(false)
const selectedBrand = ref(null)
const toast = ref(null)
const currentSlide = ref(0)
let slideInterval = null

const showToast = (msg, type = 'success') => {
  toast.value = { msg, type }
  setTimeout(() => { toast.value = null }, 2500)
}

const invoices = [
  { id: 10235, name: 'سوناتا 2024', remaining: '250,000,000', total: '400,000,000', remainingInstallments: 17, totalInstallments: 24, nextDate: '2026/09/01', duration: 'بعد 14 يوم', monthly: '10,416,667' },
  { id: 10312, name: 'كيا سبورتاج', remaining: '180,000,000', total: '350,000,000', remainingInstallments: 12, totalInstallments: 18, nextDate: '2026/09/05', duration: 'بعد 18 يوم', monthly: '19,444,444' },
  { id: 10478, name: 'هونداي تكسس', remaining: '95,000,000', total: '300,000,000', remainingInstallments: 8, totalInstallments: 36, nextDate: '2026/08/28', duration: 'بعد 10 أيام', monthly: '8,333,333' }
]

const selectedInvoice = ref(invoices[0])
const statementInv = ref(invoices[0])

const selectInvoice = (inv) => {
  selectedInvoice.value = inv
  showInvoices.value = false
}

const slides = [
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=400&fit=crop'
]

onMounted(() => {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 3000)
})
onUnmounted(() => clearInterval(slideInterval))

const submitCloseInvoice = () => {
  showCloseSheet.value = false
  const orders = JSON.parse(localStorage.getItem('golden_orders') || '[]')
  const newId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1001
  orders.push({
    id: newId,
    date: new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' }),
    status: 'pending',
    type: 'close_invoice',
    invoiceId: selectedInvoice.value.id,
    invoiceName: selectedInvoice.value.name,
    remaining: selectedInvoice.value.remaining,
    products: [],
    fullName: '',
    phone: '',
    address: '',
    clientType: '',
    salary: 0,
    totalPrice: 0,
    downPayment: 0,
    netAmount: 0,
    months: 0,
    monthlyInstallment: 0,
    totalAmount: 0,
    ownerNote: ''
  })
  localStorage.setItem('golden_orders', JSON.stringify(orders))
  showToast('تم تقديم طلب إطفاء الفاتورة بنجاح! سيتم مراجعة طلبك من قبل الإدارة')
}

const branches = [
  { name: 'الفرع الرئيسي - بغداد', address: 'شارع الرشيد،وسط البلد، بغداد', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop', phones: ['07701234567', '07801234567'] },
  { name: 'فرع الأعظمية', address: 'شارع حسين خليل، الأعظمية، بغداد', img: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=400&fit=crop', phones: ['07709876543', '07809876543'] },
  { name: 'فرع البصرة', address: 'شارع الع╢abi، البصرة', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop', phones: ['07801112233', '07701112233'] }
]

const dealers = [
  { name: 'وكالة الأمل للسيارات', address: 'المنطقة الصناعية، بغداد', img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=400&fit=crop', phones: ['07705556677', '07805556677'] },
  { name: 'وكالة النور للإلكترونيات', address: 'شارع المتنبي، بغداد', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop', phones: ['07704443322', '07804443322'] },
  { name: 'وكالة الزهراء للأجهزة', address: 'الكاظمية، بغداد', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop', phones: ['07702221100', '07802221100'] }
]

const brands = [
  { name: 'Apple', img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=200&fit=crop' },
  { name: 'Samsung', img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=200&h=200&fit=crop' },
  { name: 'Hisense', img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop' }
]

const brandProductsMap = {
  Apple: [
    { name: 'iPhone 16 Pro Max', spec: '256GB - تيتانيوم', price: '1,850,000', img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop' },
    { name: 'MacBook Pro M3', spec: '14 inch - 512GB', price: '5,200,000', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop' },
    { name: 'iPad Pro M4', spec: '13 inch - 256GB', price: '3,100,000', img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop' },
    { name: 'AirPods Pro 2', spec: 'USB-C - Active NC', price: '580,000', img: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=300&fit=crop' }
  ],
  Samsung: [
    { name: 'Samsung S24 Ultra', spec: '512GB - أسود', price: '1,650,000', img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop' }
  ],
  Hisense: [
    { name: 'Hisense 55 inch 4K', spec: 'Smart TV - ULED', price: '820,000', img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop' }
  ]
}

const brandProducts = computed(() => {
  if (!selectedBrand.value) return []
  return brandProductsMap[selectedBrand.value.name] || []
})

const quickActions = [
  { icon: 'credit_score', label: 'إطفاء فاتورة', handler: () => { showCloseSheet.value = true } },
  { icon: 'add_circle', label: 'طلب جديد', handler: () => goTo('/store') },
  { icon: 'receipt_long', label: 'كشف حساب', handler: () => { statementInv.value = selectedInvoice.value; showStatementSheet.value = true } },
  { icon: 'calculate', label: 'حاسبة التقسيط', handler: () => goTo('/calculator') }
]

const services = [
  { icon: 'category', label: 'المنتجات', handler: () => goTo('/store') },
  { icon: 'local_offer', label: 'العروض', handler: () => goTo('/store?tab=offers') },
  { icon: 'account_balance_wallet', label: 'أقساطي', handler: () => goTo('/settlements') },
  { icon: 'store', label: 'الماركات', handler: () => goTo('/brands') },
  { icon: 'location_on', label: 'الفروع', handler: () => goTo('/branches') },
  { icon: 'support_agent', label: 'الوكلاء', handler: () => goTo('/dealers') },
  { icon: 'account_balance_wallet', label: 'تسديد قسط', handler: () => goTo('/settlements') },
  { icon: 'more_horiz', label: 'المزيد', handler: () => {} }
]

const navItems = [
  { icon: 'home', label: 'الرئيسية', route: null },
  { icon: 'shopping_bag', label: 'المتجر', route: '/store' },
  { icon: 'account_balance_wallet', label: 'أقساطي', route: '/settlements' },
  { icon: 'receipt_long', label: 'طلباتي', badge: true, route: '/orders' },
  { icon: 'person', label: 'حسابي', route: '/account' }
]
</script>

<style scoped>
.home-screen { width: 100%; height: 100dvh; background: var(--bg); display: flex; flex-direction: column; overflow: hidden; }
.main-content { flex: 1; overflow-y: auto; overscroll-behavior-y: contain; padding: 16px 16px 90px; display: flex; flex-direction: column; gap: 16px; width: 100%; margin: 0 auto; }

/* Card */
.card-wrap { border-radius: 16px; border: 1px solid var(--outline-variant); padding: 14px; background: var(--surface-container-high); }
.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; position: relative; }
.card-title { font-size: 16px; font-weight: 700; color: var(--primary); text-align: center; flex: 1; }
.invoice-pill { display: flex; align-items: center; gap: 6px; background: var(--bg); border: 1px solid var(--outline-variant); border-radius: 20px; padding: 4px 12px; font-size: 11px; color: var(--on-surface-variant); cursor: pointer; transition: border-color 0.2s; }
.invoice-pill:active { border-color: var(--primary); }
.invoice-num-pill { background: var(--surface-variant); border-radius: 20px; padding: 4px 10px; font-size: 11px; font-weight: 600; color: var(--on-surface); }
.pill-arrow { font-size: 18px; color: var(--primary); transition: transform 0.3s; }
.pill-arrow.rotated { transform: rotate(180deg); }
.invoice-dropdown { position: absolute; top: 100%; left: 0; right: 0; margin-top: 8px; background: var(--surface-container-high); border: 1px solid var(--outline-variant); border-radius: 14px; overflow: hidden; z-index: 20; max-height: 280px; overflow-y: auto; }
.invoice-option { display: flex; justify-content: space-between; align-items: center; padding: 14px 16px; border-bottom: 1px solid var(--outline-variant); cursor: pointer; transition: background 0.2s; }
.invoice-option:last-child { border-bottom: none; }
.invoice-option:active { background: var(--surface-variant); }
.invoice-option.selected { background: rgba(242, 202, 80, 0.1); }
.inv-info { display: flex; flex-direction: column; gap: 2px; }
.inv-name { font-size: 14px; font-weight: 600; color: var(--on-surface); }
.inv-id { font-size: 11px; color: var(--on-surface-variant); }
.inv-remaining { font-size: 12px; font-weight: 600; color: var(--primary); }

/* Stats */
.stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
.stats-grid.border-t { border-top: 1px solid rgba(77, 70, 53, 0.5); padding-top: 12px; margin-bottom: 12px; }
.stat-col { display: flex; flex-direction: column; gap: 4px; }
.border-l { border-right: 1px solid rgba(77, 70, 53, 0.5); padding-right: 16px; }
.pr-2 { padding-right: 8px; }
.stat-label { font-size: 12px; color: var(--on-surface-variant); }
.stat-row { display: flex; align-items: baseline; gap: 4px; }
.stat-num { font-size: 16px; font-weight: 700; color: var(--on-surface); }
.stat-num.gold { font-size: 18px; color: var(--primary); }
.stat-unit { font-size: 13px; color: var(--on-surface-variant); }

/* Date Bar */
.date-bar { display: flex; justify-content: space-between; align-items: center; background: var(--surface-container); border: 1px solid var(--outline-variant); border-radius: 12px; padding: 8px 12px; }
.date-left { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--on-surface-variant); }
.date-icon { font-size: 16px; color: var(--primary); }
.date-badge { font-size: 12px; color: var(--on-surface); background: var(--surface-variant); padding: 4px 10px; border-radius: 8px; }

/* Quick Actions */
.quick-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.action-btn { height: 90px; background: var(--surface-container); border: 1px solid rgba(196,154,59,.45); border-radius: 18px; padding: 10px 4px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 7px; cursor: pointer; transition: border-color 0.2s, transform .2s; }
.action-btn:active { border-color: var(--primary); transform: scale(.97); }
.action-icon { font-size: 28px; color: var(--primary); }
.action-icon.filled { font-variation-settings: 'FILL' 1; }
.action-label { font-size: 11px; font-weight: 700; color: var(--on-surface); text-align: center; white-space: nowrap; }

/* Slider */
.slider-wrap { width: 100%; }
.slider-viewport { position: relative; border-radius: 16px; overflow: hidden; border: 1px solid var(--outline-variant); }
.slider-track { display: flex; transition: transform 0.5s ease; }
.slide { min-width: 100%; }
.slide-img { width: 100%; height: 160px; object-fit: cover; display: block; }
.slider-dots { position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); display: flex; gap: 6px; }
.s-dot { width: 7px; height: 7px; border-radius: 50%; background: rgba(255,255,255,0.4); cursor: pointer; transition: all 0.3s; }
.s-dot.active { background: var(--primary); width: 20px; border-radius: 4px; }

/* Services */
.section-heading { font-size: 16px; font-weight: 700; color: var(--on-surface); margin-bottom: 12px; }
.services-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.svc-item { background: var(--surface-container); border: 1px solid var(--outline-variant); border-radius: 12px; padding: 12px 4px; display: flex; flex-direction: column; align-items: center; gap: 6px; cursor: pointer; transition: border-color 0.2s; }
.svc-item:active { border-color: var(--primary); }
.svc-icon { font-size: 24px; color: var(--primary); }
.svc-icon.filled { font-variation-settings: 'FILL' 1; }
.svc-label { font-size: 10px; color: var(--on-surface); text-align: center; }

/* Transaction */
.tx-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.view-all { background: none; border: 1px solid var(--outline-variant); color: var(--on-surface-variant); font-size: 11px; font-family: 'Noto Kufi Arabic', sans-serif; border-radius: 20px; padding: 4px 12px; cursor: pointer; }
.tx-card { background: var(--surface-container); border: 1px solid var(--outline-variant); border-radius: 16px; padding: 14px; display: flex; justify-content: space-between; align-items: center; }
.tx-right { display: flex; align-items: center; gap: 12px; }
.tx-icon { width: 40px; height: 40px; border-radius: 50%; background: var(--surface-variant); display: flex; align-items: center; justify-content: center; color: var(--primary); }
.tx-name { font-size: 14px; font-weight: 700; color: var(--on-surface); }
.tx-ref { font-size: 12px; color: var(--on-surface-variant); }
.tx-left { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
.tx-amount-row { display: flex; align-items: center; gap: 4px; }
.tx-check { color: var(--success); font-size: 18px; font-variation-settings: 'FILL' 1; }
.tx-amount { font-size: 14px; font-weight: 700; color: var(--success); }
.tx-date { font-size: 11px; color: var(--on-surface-variant); }

/* Bottom Nav */
.bottom-nav { position:fixed; bottom:10px; left:12px; right:12px; height:68px; background:var(--surface-container); border:1px solid var(--outline-variant); border-radius:22px; display:flex; justify-content:space-around; align-items:center; padding:5px 6px calc(5px + env(safe-area-inset-bottom)); box-shadow:0 8px 24px rgba(0,0,0,.2); z-index:50; }
.nav-item { flex:1; display:flex; flex-direction:column; align-items:center; gap:3px; background:none; border:none; color:var(--on-surface-variant); cursor:pointer; padding:3px 2px; font-family:inherit; }
.nav-item.active { color:var(--primary); font-weight:700; }
.nav-icon-wrap { width:36px; height:32px; position:relative; display:flex; align-items:center; justify-content:center; border-radius:12px; transition:.2s; }
.nav-item.active .nav-icon-wrap { background:var(--primary); color:#0a0f1d; box-shadow:0 4px 10px rgba(242,202,80,.22); }
.nav-icon { font-size:22px; }
.nav-icon.filled { font-variation-settings: 'FILL' 1; }
.nav-dot { position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%); width: 5px; height: 5px; background: var(--primary); border-radius: 50%; }
.nav-badge { position: absolute; top: -2px; right: -4px; width: 8px; height: 8px; background: var(--error); border-radius: 50%; }
.nav-label { font-size:11px; font-weight:600; }

/* ── Shared Sheet Styles ── */
.sheet-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 100; display: flex; align-items: flex-end; justify-content: center; }
.sheet { width: 100%; max-width: 480px; max-height: 85vh; background: var(--bg); border-radius: 20px 20px 0 0; display: flex; flex-direction: column; animation: slideUp 0.25s ease; }
@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
.sheet-handle { display: flex; justify-content: center; padding: 10px 0 4px; cursor: pointer; position:relative; }
.sheet-close { position:absolute; left:12px; top:5px; border:0; background:transparent; color:var(--on-surface-variant); cursor:pointer; }.sheet-close .material-symbols-outlined{font-size:20px}
.handle-bar { width: 40px; height: 4px; border-radius: 2px; background: var(--outline-variant); }
.sheet-scroll { flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch; padding: 0 16px 20px; }
.sheet-title { font-size: 18px; font-weight: 700; color: var(--on-surface); margin-bottom: 16px; text-align: center; }

/* Branches / Dealers */
.branch-card { background: var(--surface-container); border: 1px solid var(--outline-variant); border-radius: 16px; overflow: hidden; margin-bottom: 12px; }
.branch-img { width: 100%; height: 140px; object-fit: cover; }
.branch-body { padding: 14px; }
.branch-name { font-size: 15px; font-weight: 700; color: var(--on-surface); margin-bottom: 8px; }
.branch-row { display: flex; align-items: center; gap: 6px; font-size: 13px; color: var(--on-surface-variant); margin-bottom: 10px; }
.branch-row .material-symbols-outlined { font-size: 18px; color: var(--primary); }
.branch-phones { display: flex; flex-direction: column; gap: 8px; }
.phone-btn { display: flex; align-items: center; gap: 8px; padding: 10px 14px; background: rgba(37, 211, 102, 0.08); border: 1px solid rgba(37, 211, 102, 0.25); border-radius: 12px; text-decoration: none; color: var(--on-surface); transition: background 0.2s; }
.phone-btn:active { background: rgba(37, 211, 102, 0.15); }
.phone-btn .material-symbols-outlined { font-size: 20px; color: #25d366; }
.wa-badge { font-size: 11px; font-weight: 600; color: #25d366; margin-right: auto; background: rgba(37, 211, 102, 0.1); padding: 2px 8px; border-radius: 6px; }

/* Brands */
.brands-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.brand-card { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 14px 8px; background: var(--surface-container); border: 1px solid var(--outline-variant); border-radius: 14px; cursor: pointer; transition: border-color 0.2s; }
.brand-card:active { border-color: var(--primary); }
.brand-img { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; border: 2px solid var(--outline-variant); }
.brand-name { font-size: 12px; font-weight: 600; color: var(--on-surface); }
.back-link { display: flex; align-items: center; gap: 4px; font-size: 13px; color: var(--primary); background: none; border: none; cursor: pointer; font-family: inherit; font-weight: 600; margin-bottom: 12px; }
.back-link .material-symbols-outlined { font-size: 18px; }
.brand-selected-title { font-size: 16px; font-weight: 700; color: var(--on-surface); margin-bottom: 12px; }
.brand-products { display: flex; flex-direction: column; gap: 10px; }
.brand-product-card { display: flex; align-items: center; gap: 12px; background: var(--surface-container); border: 1px solid var(--outline-variant); border-radius: 14px; padding: 12px; cursor: pointer; }
.brand-product-card:active { border-color: var(--primary); }
.brand-product-img { width: 56px; height: 56px; border-radius: 10px; object-fit: cover; flex-shrink: 0; }
.brand-product-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.brand-product-name { font-size: 14px; font-weight: 600; color: var(--on-surface); }
.brand-product-spec { font-size: 11px; color: var(--on-surface-variant); }
.brand-product-price { font-size: 13px; font-weight: 700; color: var(--primary); }

/* Close Invoice */
.close-invoice-content { display: flex; flex-direction: column; align-items: center; gap: 12px; padding-top: 10px; }
.close-icon { font-size: 48px; color: var(--primary); }
.close-desc { font-size: 13px; color: var(--on-surface-variant); text-align: center; line-height: 1.7; }
.close-inv-card { width: 100%; background: var(--surface-container); border: 1px solid var(--outline-variant); border-radius: 14px; padding: 16px; display: flex; flex-direction: column; align-items: center; gap: 6px; }
.close-inv-name { font-size: 16px; font-weight: 700; color: var(--on-surface); }
.close-inv-id { font-size: 12px; color: var(--on-surface-variant); }
.close-inv-amount { font-size: 14px; font-weight: 700; color: var(--primary); }
.close-actions { display: flex; flex-direction: column; gap: 10px; width: 100%; margin-top: 8px; }
.close-confirm-btn { width: 100%; padding: 14px; border-radius: 14px; background: var(--primary); border: none; color: #0a0f1d; font-size: 15px; font-weight: 700; font-family: inherit; cursor: pointer; }
.close-cancel-btn { width: 100%; padding: 12px; border-radius: 14px; background: none; border: 1px solid var(--outline-variant); color: var(--on-surface-variant); font-size: 14px; font-weight: 600; font-family: inherit; cursor: pointer; text-align: center; }

/* Account Statement */
.statement-inv-select { display: flex; gap: 8px; overflow-x: auto; margin-bottom: 16px; padding-bottom: 4px; }
.stmt-inv-btn { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 10px 14px; border-radius: 12px; background: var(--surface-container); border: 2px solid var(--outline-variant); cursor: pointer; flex-shrink: 0; font-family: inherit; }
.stmt-inv-btn.active { border-color: var(--primary); background: rgba(242, 202, 80, 0.08); }
.stmt-inv-name { font-size: 12px; font-weight: 600; color: var(--on-surface); }
.stmt-inv-id { font-size: 11px; color: var(--on-surface-variant); }
.stmt-details { background: var(--surface-container); border-radius: 14px; padding: 14px; }
.stmt-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid var(--outline-variant); }
.stmt-row:last-child { border-bottom: none; }
.stmt-row.highlight { background: rgba(242, 202, 80, 0.06); margin: 0 -8px; padding: 10px 8px; border-radius: 10px; border-bottom: none; }
.stmt-label { font-size: 13px; color: var(--on-surface-variant); }
.stmt-value { font-size: 13px; font-weight: 600; color: var(--on-surface); }
.stmt-primary { color: var(--primary); font-weight: 700; }
.stmt-divider { height: 1px; background: var(--outline-variant); margin: 4px 0; }
.stmt-sub-title { font-size: 14px; font-weight: 700; color: var(--on-surface); margin: 16px 0 10px; }
.stmt-installments { display: flex; flex-direction: column; gap: 6px; }
.inst-row { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; border-radius: 10px; background: var(--bg); border: 1px solid var(--outline-variant); }
.inst-row.paid { background: rgba(129, 199, 132, 0.06); border-color: rgba(129, 199, 132, 0.2); }
.inst-row.next { background: rgba(242, 202, 80, 0.08); border-color: var(--primary); }
.inst-num { font-size: 12px; font-weight: 600; color: var(--on-surface); }
.inst-amount { font-size: 12px; color: var(--on-surface-variant); }
.inst-check { font-size: 18px; color: #81c784; font-variation-settings: 'FILL' 1; }
.inst-next-badge { font-size: 10px; font-weight: 700; color: var(--primary); background: rgba(242, 202, 80, 0.15); padding: 2px 8px; border-radius: 6px; }
.inst-pending { font-size: 11px; color: var(--on-surface-variant); }

/* Toast */
.toast { position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: 8px; padding: 12px 20px; border-radius: 14px; font-size: 13px; font-weight: 600; z-index: 200; animation: slideUp 0.2s ease; white-space: nowrap; }
.toast-success { background: var(--primary); color: #0a0f1d; }
.toast-info { background: var(--surface-container); border: 1px solid var(--outline-variant); color: var(--on-surface); }
.toast .material-symbols-outlined { font-size: 20px; }
</style>
