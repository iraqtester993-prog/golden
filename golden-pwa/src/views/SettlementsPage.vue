<template>
  <div class="page">
    <TopBar />

    <main class="page-content">
      <!-- Summary Card -->
      <section class="summary-card">
        <div class="summary-icon">
          <span class="material-symbols-outlined">account_balance_wallet</span>
        </div>
        <div class="summary-text">
          <span class="summary-label">إجمالي المبلغ المتبقي</span>
          <div class="summary-amount">
            <span class="summary-num">4,500,000</span>
            <span class="summary-currency">د.ع</span>
          </div>
        </div>
      </section>

      <!-- Tabs -->
      <div class="tabs">
        <button class="tab" :class="{ active: activeTab === 'current' }" @click="activeTab = 'current'">أقساطي الحالية</button>
        <button class="tab" :class="{ active: activeTab === 'paid' }" @click="activeTab = 'paid'">أقساطي المسدده</button>
      </div>

      <!-- Current Installments -->
      <div class="invoice-list" v-if="activeTab === 'current'">
        <div class="invoice-card" v-for="inv in currentInstallments" :key="inv.id" @click="openDetails(inv)">
          <div class="inv-header">
            <div class="inv-id-name">
              <span class="inv-id">#{{ inv.id }}</span>
              <span class="inv-name">{{ inv.name }}</span>
            </div>
            <span class="inv-status active">فعالة</span>
          </div>
          <div class="inv-products" v-if="inv.products.length > 1">
            <div class="inv-mini-prod" v-for="p in inv.products" :key="p.name">
              <img :src="p.img" class="mini-prod-img" />
              <span class="mini-prod-name">{{ p.name }}</span>
            </div>
          </div>
          <div class="inv-price-row">
            <div class="inv-price">{{ inv.total }} د.ع</div>
            <div class="inv-price-label">المبلغ الكلي</div>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: inv.progress + '%' }"></div>
          </div>
          <div class="inv-stats">
            <div class="inv-stat">
              <span class="inv-stat-num paid-color">{{ inv.paid }}</span>
              <span class="inv-stat-label">المدفوع</span>
            </div>
            <div class="inv-stat">
              <span class="inv-stat-num">{{ inv.paidMonths }}</span>
              <span class="inv-stat-label">الأشهر المدفوعة</span>
            </div>
            <div class="inv-stat">
              <span class="inv-stat-num remaining-color">{{ inv.remaining }}</span>
              <span class="inv-stat-label">المتبقي</span>
            </div>
            <div class="inv-stat">
              <span class="inv-stat-num">{{ inv.totalMonths }}</span>
              <span class="inv-stat-label">إجمالي الأشهر</span>
            </div>
          </div>
          <div class="inv-next">
            <span class="material-symbols-outlined next-icon">calendar_today</span>
            <span class="next-text">القسط القادم: {{ inv.nextDate }}</span>
          </div>
        </div>
      </div>

      <!-- Paid Installments -->
      <div class="invoice-list" v-if="activeTab === 'paid'">
        <div class="invoice-card paid-card" v-for="inv in paidInstallments" :key="inv.id" @click="openDetails(inv)">
          <div class="inv-header">
            <div class="inv-id-name">
              <span class="inv-id">#{{ inv.id }}</span>
              <span class="inv-name">{{ inv.name }}</span>
            </div>
            <span class="inv-status paid">منتهية</span>
          </div>
          <div class="inv-products" v-if="inv.products.length > 1">
            <div class="inv-mini-prod" v-for="p in inv.products" :key="p.name">
              <img :src="p.img" class="mini-prod-img" />
              <span class="mini-prod-name">{{ p.name }}</span>
            </div>
          </div>
          <div class="inv-price-row">
            <div class="inv-price">{{ inv.total }} د.ع</div>
            <div class="inv-price-label">المبلغ الكلي</div>
          </div>
          <div class="progress-bar">
            <div class="progress-fill full"></div>
          </div>
          <div class="inv-stats">
            <div class="inv-stat">
              <span class="inv-stat-num paid-color">{{ inv.paid }}</span>
              <span class="inv-stat-label">المدفوع</span>
            </div>
            <div class="inv-stat">
              <span class="inv-stat-num">{{ inv.totalMonths }}</span>
              <span class="inv-stat-label">إجمالي الأشهر</span>
            </div>
            <div class="inv-stat">
              <span class="inv-stat-num paid-date">{{ inv.paidDate }}</span>
              <span class="inv-stat-label">تاريخ السداد</span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Details Bottom Sheet -->
    <div v-if="selectedInv" class="overlay" @click.self="selectedInv = null">
      <div class="bottom-sheet" @click.stop>
        <div class="sheet-handle">
          <button class="sheet-close" @click="selectedInv = null">
            <span class="material-symbols-outlined">close</span>
          </button>
          <span class="handle-bar"></span>
        </div>

        <div class="sheet-scroll">
          <!-- Invoice Header -->
          <div class="sheet-header">
            <h2 class="sheet-title">#{{ selectedInv.id }}</h2>
            <span class="sheet-status" :class="selectedInv.paidMonths === selectedInv.totalMonths ? 'paid' : 'active'">
              {{ selectedInv.paidMonths === selectedInv.totalMonths ? 'منتهية' : 'فعالة' }}
            </span>
          </div>

          <!-- Products in invoice -->
          <div class="sheet-products">
            <div class="sheet-product" v-for="p in selectedInv.products" :key="p.name">
              <img :src="p.img" class="sheet-prod-img" />
              <div class="sheet-prod-info">
                <span class="sheet-prod-name">{{ p.name }}</span>
                <span class="sheet-prod-spec">{{ p.spec }}</span>
                <span class="sheet-prod-price">{{ p.price }} د.ع</span>
              </div>
            </div>
          </div>

          <!-- Amount Summary -->
          <div class="amount-grid">
            <div class="amount-box total-box">
              <span class="amount-label">المبلغ الكلي</span>
              <span class="amount-val">{{ selectedInv.total }} د.ع</span>
            </div>
            <div class="amount-box paid-box">
              <span class="amount-label">المدفوع</span>
              <span class="amount-val">{{ selectedInv.paid }} د.ع</span>
            </div>
            <div class="amount-box remain-box">
              <span class="amount-label">المتبقي</span>
              <span class="amount-val">{{ selectedInv.remaining }} د.ع</span>
            </div>
          </div>

          <!-- Progress -->
          <div class="detail-progress">
            <div class="detail-progress-bar">
              <div class="detail-progress-fill" :style="{ width: selectedInv.progress + '%' }"></div>
            </div>
            <div class="detail-progress-labels">
              <span>{{ selectedInv.paidMonths }} / {{ selectedInv.totalMonths }} شهر</span>
              <span>{{ selectedInv.progress }}%</span>
            </div>
          </div>

          <!-- Monthly Breakdown -->
          <div class="month-section">
            <h3 class="month-heading">تفاصيل الأقساط الشهرية</h3>
            <div class="month-row" v-for="(m, i) in selectedInv.months" :key="i">
              <div class="month-info">
                <span class="month-num">القسط {{ i + 1 }}</span>
                <span class="month-date">{{ m.date }}</span>
              </div>
              <div class="month-right">
                <span class="month-amount">{{ m.amount }} د.ع</span>
                <span class="month-badge" :class="m.status">{{ m.status === 'paid' ? 'مدفوع' : m.status === 'next' ? 'القادم' : 'قادم' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Action -->
        <div class="sheet-actions">
          <button class="action-ok" @click="selectedInv = null">حسناً</button>
        </div>
      </div>
    </div>

    <nav class="bottom-nav">
      <button class="nav-item" v-for="(item, i) in navItems" :key="item.label" :class="{ active: i === 2 }" @click="goTo(item.route)">
        <div class="nav-icon-wrap">
          <span class="material-symbols-outlined nav-icon" :class="{ filled: i === 2 }">{{ item.icon }}</span>
          <span v-if="item.badge" class="nav-badge"></span>
          <span v-if="i === 2" class="nav-dot"></span>
        </div>
        <span class="nav-label">{{ item.label }}</span>
      </button>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopBar from '../components/TopBar.vue'

const router = useRouter()
const activeTab = ref('current')
const selectedInv = ref(null)

const goTo = (route) => { if (route) router.push(route) }

const currentInstallments = [
  {
    id: 10235, name: 'BYD 2024 + iPhone 15', total: '20,000,000', paid: '11,500,000',
    remaining: '8,500,000', paidMonths: 14, totalMonths: 24, progress: 58,
    nextDate: '15 سبتمبر 2026',
    products: [
      { name: 'BYD Dolphin 2024', spec: 'سيارة كهربائية', price: '15,000,000', img: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=200&h=120&fit=crop' },
      { name: 'iPhone 15 Pro Max', spec: '256GB', price: '5,000,000', img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200&h=120&fit=crop' }
    ],
    months: [
      { date: '15 يناير 2025', amount: '833,000', status: 'paid' },
      { date: '15 فبراير 2025', amount: '833,000', status: 'paid' },
      { date: '15 مارس 2025', amount: '833,000', status: 'paid' },
      { date: '15 أبريل 2025', amount: '833,000', status: 'paid' },
      { date: '15 مايو 2025', amount: '833,000', status: 'paid' },
      { date: '15 يونيو 2025', amount: '833,000', status: 'paid' },
      { date: '15 يوليو 2025', amount: '833,000', status: 'paid' },
      { date: '15 أغسطس 2025', amount: '833,000', status: 'paid' },
      { date: '15 سبتمبر 2025', amount: '833,000', status: 'paid' },
      { date: '15 أكتوبر 2025', amount: '833,000', status: 'paid' },
      { date: '15 نوفمبر 2025', amount: '833,000', status: 'paid' },
      { date: '15 ديسمبر 2025', amount: '833,000', status: 'paid' },
      { date: '15 يناير 2026', amount: '833,000', status: 'paid' },
      { date: '15 فبراير 2026', amount: '833,000', status: 'paid' },
      { date: '15 مارس 2026', amount: '833,000', status: 'next' },
      { date: '15 أبريل 2026', amount: '833,000', status: 'pending' },
      { date: '15 مايو 2026', amount: '833,000', status: 'pending' },
      { date: '15 يونيو 2026', amount: '833,000', status: 'pending' },
      { date: '15 يوليو 2026', amount: '833,000', status: 'pending' },
      { date: '15 أغسطس 2026', amount: '833,000', status: 'pending' },
      { date: '15 سبتمبر 2026', amount: '833,000', status: 'pending' },
      { date: '15 أكتوبر 2026', amount: '833,000', status: 'pending' },
      { date: '15 نوفمبر 2026', amount: '833,000', status: 'pending' },
      { date: '15 ديسمبر 2026', amount: '833,000', status: 'pending' }
    ]
  },
  {
    id: 10312, name: 'Samsung S24 Ultra', total: '1,650,000', paid: '550,000',
    remaining: '1,100,000', paidMonths: 4, totalMonths: 12, progress: 33,
    nextDate: '10 سبتمبر 2026',
    products: [
      { name: 'Samsung S24 Ultra', spec: '512GB - أسود', price: '1,650,000', img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=200&h=120&fit=crop' }
    ],
    months: [
      { date: '10 مايو 2026', amount: '137,500', status: 'paid' },
      { date: '10 يونيو 2026', amount: '137,500', status: 'paid' },
      { date: '10 يوليو 2026', amount: '137,500', status: 'paid' },
      { date: '10 أغسطس 2026', amount: '137,500', status: 'paid' },
      { date: '10 سبتمبر 2026', amount: '137,500', status: 'next' },
      { date: '10 أكتوبر 2026', amount: '137,500', status: 'pending' },
      { date: '10 نوفمبر 2026', amount: '137,500', status: 'pending' },
      { date: '10 ديسمبر 2026', amount: '137,500', status: 'pending' },
      { date: '10 يناير 2027', amount: '137,500', status: 'pending' },
      { date: '10 فبراير 2027', amount: '137,500', status: 'pending' },
      { date: '10 مارس 2027', amount: '137,500', status: 'pending' },
      { date: '10 أبريل 2027', amount: '137,500', status: 'pending' }
    ]
  }
]

const paidInstallments = [
  {
    id: 10230, name: 'Hisense 55 inch + مكيف', total: '3,500,000', paid: '3,500,000',
    remaining: '0', paidMonths: 8, totalMonths: 8, progress: 100,
    paidDate: '20 أغسطس 2026',
    products: [
      { name: 'Hisense 55 inch 4K', spec: 'Smart TV ULED', price: '2,000,000', img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=120&fit=crop' },
      { name: 'مكيف سبليت يونيون اير', spec: '18000 وحدة', price: '1,500,000', img: 'https://images.unsplash.com/photo-1631545806609-206480c4ca4d?w=200&h=120&fit=crop' }
    ],
    months: [
      { date: '15 ديسمبر 2025', amount: '437,500', status: 'paid' },
      { date: '15 يناير 2026', amount: '437,500', status: 'paid' },
      { date: '15 فبراير 2026', amount: '437,500', status: 'paid' },
      { date: '15 مارس 2026', amount: '437,500', status: 'paid' },
      { date: '15 أبريل 2026', amount: '437,500', status: 'paid' },
      { date: '15 مايو 2026', amount: '437,500', status: 'paid' },
      { date: '15 يونيو 2026', amount: '437,500', status: 'paid' },
      { date: '15 يوليو 2026', amount: '437,500', status: 'paid' }
    ]
  },
  {
    id: 10198, name: 'Kia Sportage 2023', total: '12,000,000', paid: '12,000,000',
    remaining: '0', paidMonths: 24, totalMonths: 24, progress: 100,
    paidDate: '1 يوليو 2026',
    products: [
      { name: 'Kia Sportage 2023', spec: 'GT Line - أبيض', price: '12,000,000', img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=200&h=120&fit=crop' }
    ],
    months: [
      { date: '1 يوليو 2024', amount: '500,000', status: 'paid' },
      { date: '1 أغسطس 2024', amount: '500,000', status: 'paid' },
      { date: '1 سبتمبر 2024', amount: '500,000', status: 'paid' },
      { date: '1 أكتوبر 2024', amount: '500,000', status: 'paid' },
      { date: '1 نوفمبر 2024', amount: '500,000', status: 'paid' },
      { date: '1 ديسمبر 2024', amount: '500,000', status: 'paid' },
      { date: '1 يناير 2025', amount: '500,000', status: 'paid' },
      { date: '1 فبراير 2025', amount: '500,000', status: 'paid' },
      { date: '1 مارس 2025', amount: '500,000', status: 'paid' },
      { date: '1 أبريل 2025', amount: '500,000', status: 'paid' },
      { date: '1 مايو 2025', amount: '500,000', status: 'paid' },
      { date: '1 يونيو 2025', amount: '500,000', status: 'paid' },
      { date: '1 يوليو 2025', amount: '500,000', status: 'paid' },
      { date: '1 أغسطس 2025', amount: '500,000', status: 'paid' },
      { date: '1 سبتمبر 2025', amount: '500,000', status: 'paid' },
      { date: '1 أكتوبر 2025', amount: '500,000', status: 'paid' },
      { date: '1 نوفمبر 2025', amount: '500,000', status: 'paid' },
      { date: '1 ديسمبر 2025', amount: '500,000', status: 'paid' },
      { date: '1 يناير 2026', amount: '500,000', status: 'paid' },
      { date: '1 فبراير 2026', amount: '500,000', status: 'paid' },
      { date: '1 مارس 2026', amount: '500,000', status: 'paid' },
      { date: '1 أبريل 2026', amount: '500,000', status: 'paid' },
      { date: '1 مايو 2026', amount: '500,000', status: 'paid' },
      { date: '1 يونيو 2026', amount: '500,000', status: 'paid' }
    ]
  }
]

const openDetails = (inv) => { selectedInv.value = inv }

const navItems = [
  { icon: 'home', label: 'الرئيسية', route: '/home' },
  { icon: 'shopping_bag', label: 'المتجر', route: '/store' },
  { icon: 'account_balance_wallet', label: 'أقساطي', route: null },
  { icon: 'receipt_long', label: 'طلباتي', badge: true, route: '/orders' },
  { icon: 'person', label: 'حسابي', route: '/account' }
]
</script>

<style scoped>
.page { width: 100%; height: 100dvh; background: var(--bg); display: flex; flex-direction: column; overflow: hidden; overscroll-behavior: none; }

.page-content {
  flex: 1; overflow-y: auto; overscroll-behavior-y: contain; padding: 12px 16px 90px;
  display: flex; flex-direction: column; gap: 14px;
}

/* Summary Card */
.summary-card {
  background: var(--surface-container-high);
  border: 1px solid rgba(99, 179, 237, 0.28); border-radius: 16px;
  padding: 20px; display: flex; align-items: center; gap: 16px;
}

.summary-icon {
  width: 50px; height: 50px; border-radius: 14px;
  background: rgba(99, 179, 237, 0.15);
  display: flex; align-items: center; justify-content: center;
}

.summary-icon .material-symbols-outlined { font-size: 26px; color: #63b3ed; }

.summary-text { display: flex; flex-direction: column; gap: 4px; }
.summary-label { font-size: 12px; color: var(--on-surface-variant); }

.summary-amount { display: flex; align-items: baseline; gap: 6px; }
.summary-num { font-size: 24px; font-weight: 700; color: #63b3ed; }
.summary-currency { font-size: 14px; color: var(--on-surface-variant); }

/* Tabs */
.tabs { display: flex; border-bottom: 1px solid var(--outline-variant); }

.tab {
  flex: 1; background: none; border: none; border-bottom: 2px solid transparent;
  padding: 10px 0; font-size: 13px; font-weight: 600;
  color: var(--on-surface-variant); cursor: pointer;
  font-family: 'Noto Kufi Arabic', sans-serif; transition: all 0.2s;
}

.tab.active { color: var(--primary); border-bottom-color: var(--primary); }

/* Invoice List */
.invoice-list { display: flex; flex-direction: column; gap: 12px; }

.invoice-card {
  background: var(--surface-container); border: 1px solid var(--outline-variant);
  border-radius: 16px; padding: 16px; display: flex; flex-direction: column; gap: 10px;
  cursor: pointer; transition: all 0.2s;
}

.invoice-card:active { transform: scale(0.98); }

.paid-card { opacity: 0.85; }

.inv-header { display: flex; justify-content: space-between; align-items: center; }

.inv-id-name { display: flex; flex-direction: column; gap: 2px; }
.inv-id { font-size: 16px; font-weight: 700; color: var(--on-surface); }
.inv-name { font-size: 12px; color: var(--on-surface-variant); }

.inv-status {
  font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 6px;
}

.inv-status.paid { background: rgba(52, 211, 153, 0.15); color: var(--success); }
.inv-status.active { background: rgba(242, 202, 80, 0.15); color: var(--primary); }

/* Products preview */
.inv-products { display: flex; gap: 8px; overflow-x: auto; padding: 2px 0;
  -ms-overflow-style: none; scrollbar-width: none; }
.inv-products::-webkit-scrollbar { display: none; }

.inv-mini-prod {
  display: flex; align-items: center; gap: 6px;
  background: var(--bg); border-radius: 10px; padding: 6px 10px;
  min-width: fit-content;
}

.mini-prod-img { width: 32px; height: 32px; border-radius: 6px; object-fit: cover; }
.mini-prod-name { font-size: 11px; color: var(--on-surface); white-space: nowrap; }

.inv-price-row { direction: rtl; }
.inv-price { font-size: 18px; font-weight: 700; color: var(--on-surface); }
.inv-price-label { font-size: 11px; color: var(--on-surface-variant); margin-top: -2px; }

/* Progress Bar */
.progress-bar {
  width: 100%; height: 6px; background: var(--bg); border-radius: 3px; overflow: hidden;
}

.progress-fill { height: 100%; background: var(--primary); border-radius: 3px; transition: width 0.5s ease; }
.progress-fill.full { background: var(--success); }

.inv-stats {
  display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
}

.inv-stat { display: flex; flex-direction: column; align-items: center; gap: 1px; min-width: 60px; }
.inv-stat-num { font-size: 13px; font-weight: 700; color: var(--on-surface); }
.inv-stat-label { font-size: 9px; color: var(--on-surface-variant); }

.paid-color { color: var(--success) !important; }
.remaining-color { color: var(--primary) !important; }
.paid-date { font-size: 11px !important; }

.inv-next {
  display: flex; align-items: center; gap: 6px;
  background: rgba(242, 202, 80, 0.08); border-radius: 8px; padding: 8px 12px;
}

.next-icon { font-size: 16px; color: var(--primary); }
.next-text { font-size: 12px; color: var(--on-surface-variant); }

/* Bottom Sheet */
.overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5); z-index: 100;
  display: flex; align-items: flex-end; justify-content: center;
}

.bottom-sheet {
  width: 100%; max-width: 480px; max-height: 90dvh;
  background: var(--bg); border-radius: 20px 20px 0 0;
  display: flex; flex-direction: column; overflow: hidden;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.sheet-handle { display: flex; justify-content: center; padding: 10px 0 4px; position: relative; }
.handle-bar { width: 40px; height: 4px; background: var(--outline-variant); border-radius: 2px; }

.sheet-close {
  position: absolute; left: 16px; top: 50%; transform: translateY(-50%);
  background: var(--surface-container); border: none; border-radius: 50%;
  width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
  cursor: pointer;
}

.sheet-close .material-symbols-outlined { font-size: 18px; color: var(--on-surface-variant); }

.sheet-scroll { flex: 1; overflow-y: auto; padding-bottom: 80px; }

/* Sheet Header */
.sheet-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 16px 12px; border-bottom: 1px solid var(--outline-variant);
}

.sheet-title { font-size: 20px; font-weight: 700; color: var(--on-surface); }

.sheet-status {
  font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 8px;
}

.sheet-status.paid { background: rgba(52, 211, 153, 0.15); color: var(--success); }
.sheet-status.active { background: rgba(242, 202, 80, 0.15); color: var(--primary); }

/* Sheet Products */
.sheet-products { padding: 12px 16px; display: flex; flex-direction: column; gap: 10px; border-bottom: 1px solid var(--outline-variant); }

.sheet-product {
  display: flex; gap: 12px; align-items: center;
  background: var(--surface-container); border-radius: 12px; padding: 10px;
}

.sheet-prod-img { width: 60px; height: 60px; border-radius: 10px; object-fit: cover; }

.sheet-prod-info { display: flex; flex-direction: column; gap: 2px; }
.sheet-prod-name { font-size: 14px; font-weight: 700; color: var(--on-surface); }
.sheet-prod-spec { font-size: 11px; color: var(--on-surface-variant); }
.sheet-prod-price { font-size: 14px; font-weight: 700; color: var(--primary); direction: rtl; }

/* Amount Grid */
.amount-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; padding: 12px 16px; border-bottom: 1px solid var(--outline-variant); }

.amount-box {
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  padding: 10px 4px; border-radius: 10px;
}

.total-box { background: var(--surface-container); }
.paid-box { background: rgba(52, 211, 153, 0.1); }
.remain-box { background: rgba(242, 202, 80, 0.1); }

.amount-label { font-size: 10px; color: var(--on-surface-variant); }
.amount-val { font-size: 12px; font-weight: 700; color: var(--on-surface); direction: rtl; }
.paid-box .amount-val { color: var(--success); }
.remain-box .amount-val { color: var(--primary); }

/* Detail Progress */
.detail-progress { padding: 12px 16px; border-bottom: 1px solid var(--outline-variant); }

.detail-progress-bar { width: 100%; height: 8px; background: var(--surface-container); border-radius: 4px; overflow: hidden; }
.detail-progress-fill { height: 100%; background: var(--primary); border-radius: 4px; transition: width 0.5s ease; }

.detail-progress-labels { display: flex; justify-content: space-between; margin-top: 6px; }
.detail-progress-labels span { font-size: 11px; color: var(--on-surface-variant); }

/* Month Section */
.month-section { padding: 12px 16px; }
.month-heading { font-size: 14px; font-weight: 700; color: var(--on-surface); margin-bottom: 10px; }

.month-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.04);
}

.month-info { display: flex; flex-direction: column; gap: 2px; }
.month-num { font-size: 13px; font-weight: 600; color: var(--on-surface); }
.month-date { font-size: 11px; color: var(--on-surface-variant); }

.month-right { display: flex; align-items: center; gap: 8px; }
.month-amount { font-size: 13px; font-weight: 700; color: var(--on-surface); direction: rtl; }

.month-badge {
  font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 4px;
}

.month-badge.paid { background: rgba(52, 211, 153, 0.15); color: var(--success); }
.month-badge.next { background: rgba(242, 202, 80, 0.15); color: var(--primary); }
.month-badge.pending { background: var(--surface-container); color: var(--on-surface-variant); }

/* Sheet Actions */
.sheet-actions {
  position: absolute; bottom: 0; left: 0; right: 0;
  display: flex; padding: 12px 16px;
  background: var(--bg); border-top: 1px solid var(--outline-variant);
  padding-bottom: calc(12px + env(safe-area-inset-bottom, 4px));
}

.action-ok {
  width: 100%; border: none; border-radius: 12px; padding: 12px 0;
  font-size: 14px; font-weight: 700; cursor: pointer;
  font-family: 'Noto Kufi Arabic', sans-serif;
  background: var(--primary); color: #0a0f1d;
}

/* Bottom Nav */
.bottom-nav {
  position: fixed; bottom: 0; left: 0; right: 0; height: 64px;
  background: var(--bg); border-top: 1px solid var(--outline-variant);
  display: flex; justify-content: space-around; align-items: center;
  padding-bottom: env(safe-area-inset-bottom, 4px); z-index: 50;
}

.nav-item {
  display: flex; flex-direction: column; align-items: center; gap: 2px;
  background: none; border: none; color: var(--on-surface-variant);
  cursor: pointer; padding: 4px 8px;
}

.nav-item.active { color: var(--primary); }
.nav-icon-wrap { position: relative; display: flex; align-items: center; justify-content: center; }
.nav-icon { font-size: 24px; }
.nav-icon.filled { font-variation-settings: 'FILL' 1; }
.nav-dot { position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%); width: 5px; height: 5px; background: var(--primary); border-radius: 50%; }
.nav-badge { position: absolute; top: -2px; right: -4px; width: 8px; height: 8px; background: var(--error); border-radius: 50%; }
.nav-label { font-size: 10px; font-weight: 500; }
</style>
