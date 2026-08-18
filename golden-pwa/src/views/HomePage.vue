<template>
  <div class="home-screen">
    <header class="top-bar">
      <button class="icon-btn" @click="toggleTheme">
        <span class="material-symbols-outlined">{{ isDark ? 'light_mode' : 'dark_mode' }}</span>
      </button>
      <div class="brand-center">
        <h1 class="brand-title">العصر الذهبي</h1>
      </div>
      <button class="icon-btn relative">
        <span class="material-symbols-outlined">notifications</span>
        <span class="notif-badge">2</span>
      </button>
    </header>

    <main class="main-content">
      <!-- Installment Card -->
      <section class="card-wrap">
        <div class="card-gradient"></div>
        <div class="card-inner">
          <div class="card-header">
            <h2 class="card-title">أقساطي</h2>
            <div class="invoice-pill">
              <span>فاتورة #10235</span>
              <span class="material-symbols-outlined pill-arrow">keyboard_arrow_down</span>
            </div>
          </div>

          <div class="stats-grid">
            <div class="stat-col border-l">
              <span class="stat-label">المبلغ المتبقي</span>
              <div class="stat-row">
                <span class="stat-num gold">4,250,000</span>
                <span class="stat-unit">د.ع</span>
              </div>
            </div>
            <div class="stat-col pr-2">
              <span class="stat-label">المبلغ الكلي</span>
              <div class="stat-row">
                <span class="stat-num">12,500,000</span>
                <span class="stat-unit">د.ع</span>
              </div>
            </div>
          </div>

          <div class="stats-grid border-t">
            <div class="stat-col border-l">
              <span class="stat-label">عدد الأقساط المتبقية</span>
              <div class="stat-row">
                <span class="stat-num">17</span>
                <span class="stat-unit">قسط</span>
              </div>
            </div>
            <div class="stat-col pr-2">
              <span class="stat-label">عدد الأقساط الكلية</span>
              <div class="stat-row">
                <span class="stat-num">24</span>
                <span class="stat-unit">قسط</span>
              </div>
            </div>
          </div>

          <div class="date-bar">
            <div class="date-left">
              <span class="material-symbols-outlined date-icon">calendar_today</span>
              <span>تاريخ القسط 2024/06/25</span>
            </div>
            <span class="date-badge">بعد 8 أيام</span>
          </div>
        </div>
      </section>

      <!-- Quick Actions -->
      <section class="quick-grid">
        <button class="action-btn" v-for="action in quickActions" :key="action.label">
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
            <span
              v-for="(_, i) in slides"
              :key="i"
              class="s-dot"
              :class="{ active: currentSlide === i }"
              @click="currentSlide = i"
            ></span>
          </div>
        </div>
      </section>

      <!-- Services Grid -->
      <section>
        <h2 class="section-heading">الخدمات</h2>
        <div class="services-grid">
          <div class="svc-item" v-for="service in services" :key="service.label">
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

    <nav class="bottom-nav">
      <button class="nav-item active" v-for="(item, i) in navItems" :key="item.label" :class="{ active: i === 0 }">
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
import { ref, onMounted, onUnmounted } from 'vue'

const isDark = ref(true)
const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
}

const currentSlide = ref(0)
let slideInterval = null

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

const quickActions = [
  { icon: 'credit_score', label: 'إطفاء فاتورة' },
  { icon: 'add_circle', label: 'طلب جديد' },
  { icon: 'receipt_long', label: 'كشف حساب' },
  { icon: 'payments', label: 'تسديد قسط' }
]

const services = [
  { icon: 'category', label: 'المنتجات' },
  { icon: 'local_offer', label: 'العروض' },
  { icon: 'account_balance_wallet', label: 'تسوياتي' },
  { icon: 'store', label: 'الماركات' },
  { icon: 'location_on', label: 'الفروع' },
  { icon: 'support_agent', label: 'الوكلاء' },
  { icon: 'calculate', label: 'حاسبة التقسيط' },
  { icon: 'more_horiz', label: 'المزيد' }
]

const navItems = [
  { icon: 'home', label: 'الرئيسية' },
  { icon: 'shopping_bag', label: 'المتجر' },
  { icon: 'account_balance_wallet', label: 'تسوياتي' },
  { icon: 'notifications', label: 'الإشعارات', badge: true },
  { icon: 'person', label: 'حسابي' }
]
</script>

<style scoped>
.home-screen {
  width: 100%;
  height: 100dvh;
  background: var(--bg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Top Bar */
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  height: 56px;
  background: var(--bg);
  flex-shrink: 0;
  z-index: 40;
}

.icon-btn { background: none; border: none; color: var(--on-surface-variant); cursor: pointer; padding: 8px; }
.icon-btn .material-symbols-outlined { font-size: 24px; }
.relative { position: relative; }

.notif-badge {
  position: absolute; top: 2px; right: 2px;
  width: 18px; height: 18px;
  background: var(--primary-container); color: #0a0f1d;
  font-size: 10px; font-weight: 700; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}

.brand-center { display: flex; align-items: center; }
.brand-title { font-size: 18px; font-weight: 700; color: var(--primary); letter-spacing: 1px; }

/* Main */
.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px 16px 90px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
}

/* ── Installment Card ── */
.card-wrap {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--outline-variant);
}

.card-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(10,15,29,0.4), rgba(30,41,67,0.4));
  z-index: 0;
}

.card-inner {
  position: relative;
  z-index: 1;
  padding: 20px;
  background: rgba(20, 27, 45, 0.7);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.card-title { font-size: 18px; font-weight: 700; color: var(--on-surface); }

.invoice-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--surface-container);
  border: 1px solid var(--outline-variant);
  border-radius: 20px;
  padding: 4px 14px;
  font-size: 12px;
  color: var(--on-surface-variant);
}

.pill-arrow { font-size: 18px; color: var(--primary); }

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

.stats-grid.border-t {
  border-top: 1px solid rgba(77, 70, 53, 0.5);
  padding-top: 16px;
  margin-bottom: 16px;
}

.stat-col { display: flex; flex-direction: column; gap: 4px; }

.border-l {
  border-right: 1px solid rgba(77, 70, 53, 0.5);
  padding-right: 16px;
}

.pr-2 { padding-right: 8px; }

.stat-label { font-size: 12px; color: #bec6df; }
.stat-row { display: flex; align-items: baseline; gap: 4px; }

.stat-num { font-size: 22px; font-weight: 700; color: var(--on-surface); }
.stat-num.gold { font-size: 28px; color: var(--primary); }
.stat-unit { font-size: 13px; color: #bec6df; }

/* Date Bar */
.date-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--surface-container);
  border: 1px solid var(--outline-variant);
  border-radius: 12px;
  padding: 10px 14px;
}

.date-left {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--on-surface-variant);
}

.date-icon { font-size: 16px; color: var(--primary); }

.date-badge {
  font-size: 12px;
  color: var(--on-surface);
  background: var(--surface-variant);
  padding: 4px 10px;
  border-radius: 8px;
}

/* Quick Actions */
.quick-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.action-btn {
  background: var(--surface-container);
  border: 1px solid var(--outline-variant);
  border-radius: 12px;
  padding: 14px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: border-color 0.2s;
}

.action-btn:active { border-color: var(--primary); }
.action-icon { font-size: 26px; color: var(--primary); }
.action-icon.filled { font-variation-settings: 'FILL' 1; }
.action-label { font-size: 10px; color: var(--on-surface); text-align: center; }

/* Slider */
.slider-wrap { width: 100%; }

.slider-viewport {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--outline-variant);
}

.slider-track {
  display: flex;
  transition: transform 0.5s ease;
}

.slide { min-width: 100%; }

.slide-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  display: block;
}

.slider-dots {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
}

.s-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(255,255,255,0.4);
  cursor: pointer;
  transition: all 0.3s;
}

.s-dot.active {
  background: var(--primary);
  width: 20px;
  border-radius: 4px;
}

/* Services */
.section-heading { font-size: 16px; font-weight: 700; color: var(--on-surface); margin-bottom: 12px; }

.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.svc-item {
  background: var(--surface-container);
  border: 1px solid var(--outline-variant);
  border-radius: 12px;
  padding: 12px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.svc-icon { font-size: 24px; color: var(--primary); }
.svc-icon.filled { font-variation-settings: 'FILL' 1; }
.svc-label { font-size: 10px; color: var(--on-surface); text-align: center; }

/* Transaction */
.tx-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.view-all {
  background: none;
  border: 1px solid var(--outline-variant);
  color: var(--on-surface-variant);
  font-size: 11px;
  font-family: 'Noto Kufi Arabic', sans-serif;
  border-radius: 20px;
  padding: 4px 12px;
  cursor: pointer;
}

.tx-card {
  background: var(--surface-container);
  border: 1px solid var(--outline-variant);
  border-radius: 16px;
  padding: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tx-right { display: flex; align-items: center; gap: 12px; }

.tx-icon {
  width: 40px; height: 40px; border-radius: 50%;
  background: var(--surface-variant);
  display: flex; align-items: center; justify-content: center;
  color: var(--primary);
}

.tx-name { font-size: 14px; font-weight: 700; color: var(--on-surface); }
.tx-ref { font-size: 12px; color: var(--on-surface-variant); }

.tx-left { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
.tx-amount-row { display: flex; align-items: center; gap: 4px; }
.tx-check { color: var(--success); font-size: 18px; font-variation-settings: 'FILL' 1; }
.tx-amount { font-size: 14px; font-weight: 700; color: var(--success); }
.tx-date { font-size: 11px; color: var(--on-surface-variant); }

/* Bottom Nav */
.bottom-nav {
  position: fixed; bottom: 0; left: 0; right: 0;
  height: 64px;
  background: var(--bg);
  border-top: 1px solid var(--outline-variant);
  display: flex; justify-content: space-around; align-items: center;
  padding-bottom: env(safe-area-inset-bottom, 4px);
  z-index: 50;
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
