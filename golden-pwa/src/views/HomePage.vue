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
      <section class="glass-card installment-card">
        <div class="card-header">
          <h2 class="section-title">أقساطي</h2>
          <div class="invoice-badge">
            <span>فاتورة #10235</span>
            <span class="material-symbols-outlined badge-arrow">keyboard_arrow_down</span>
          </div>
        </div>

        <div class="amount-highlight">
          <span class="amount-label">المبلغ المتبقي</span>
          <div class="amount-row">
            <span class="amount-big">4,250,000</span>
            <span class="amount-currency">د.ع</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: '66%' }"></div>
          </div>
          <div class="progress-labels">
            <span>سددت 8,250,000</span>
            <span>الكلي 12,500,000</span>
          </div>
        </div>

        <div class="stats-grid">
          <div class="stat-item border-right">
            <span class="material-symbols-outlined stat-icon">payments</span>
            <span class="stat-label">الأقساط المتبقية</span>
            <div class="stat-value-row">
              <span class="stat-value gold">17</span>
              <span class="stat-unit">قسط</span>
            </div>
          </div>
          <div class="stat-item">
            <span class="material-symbols-outlined stat-icon">receipt_long</span>
            <span class="stat-label">الأقساط الكلية</span>
            <div class="stat-value-row">
              <span class="stat-value">24</span>
              <span class="stat-unit">قسط</span>
            </div>
          </div>
        </div>

        <div class="date-row">
          <div class="date-box">
            <span class="material-symbols-outlined date-icon">event</span>
            <div class="date-text">
              <span class="date-label">القسط القادم</span>
              <span class="date-value">2026/09/01</span>
            </div>
          </div>
          <div class="duration-box">
            <span class="material-symbols-outlined date-icon">schedule</span>
            <div class="date-text">
              <span class="date-label">المدة المتبقية</span>
              <span class="date-value">17 شهر</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Quick Actions -->
      <section class="quick-actions">
        <button class="action-item" v-for="action in quickActions" :key="action.label">
          <span class="material-symbols-outlined action-icon filled">{{ action.icon }}</span>
          <span class="action-label">{{ action.label }}</span>
        </button>
      </section>

      <!-- Image Slider -->
      <section class="slider-section">
        <div class="slider-container" ref="sliderRef">
          <div class="slider-track" :style="{ transform: `translateX(${currentSlide * 100}%)` }">
            <div class="slide" v-for="(slide, i) in slides" :key="i">
              <img :src="slide" class="slide-img" />
            </div>
          </div>
          <div class="slider-dots">
            <span
              v-for="(_, i) in slides"
              :key="i"
              class="slider-dot"
              :class="{ active: currentSlide === i }"
              @click="currentSlide = i"
            ></span>
          </div>
        </div>
      </section>

      <!-- Services Grid -->
      <section>
        <h2 class="section-title mb-4">الخدمات</h2>
        <div class="services-grid">
          <div class="service-item" v-for="service in services" :key="service.label">
            <span class="material-symbols-outlined service-icon filled">{{ service.icon }}</span>
            <span class="service-label">{{ service.label }}</span>
          </div>
        </div>
      </section>

      <!-- Recent Transaction -->
      <section class="transaction-section">
        <div class="transaction-header">
          <h2 class="section-title">آخر الحركات</h2>
          <button class="view-all-btn">عرض الكل</button>
        </div>
        <div class="transaction-card">
          <div class="transaction-right">
            <div class="transaction-icon">
              <span class="material-symbols-outlined">payments</span>
            </div>
            <div>
              <h4 class="transaction-name">تم تسديد قسط</h4>
              <p class="transaction-ref">فاتورة #10235</p>
            </div>
          </div>
          <div class="transaction-left">
            <div class="transaction-amount-row">
              <span class="material-symbols-outlined check-icon">check_circle</span>
              <span class="transaction-amount">250,000 د.ع</span>
            </div>
            <span class="transaction-date">2024/05/20</span>
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

// Slider
const currentSlide = ref(0)
const sliderRef = ref(null)
let slideInterval = null

const slides = [
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=400&fit=crop'
]

const startSlider = () => {
  slideInterval = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 3000)
}

onMounted(() => startSlider())
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

.icon-btn {
  background: none;
  border: none;
  color: var(--on-surface-variant);
  cursor: pointer;
  padding: 8px;
}

.icon-btn .material-symbols-outlined { font-size: 24px; }
.relative { position: relative; }

.notif-badge {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 18px;
  height: 18px;
  background: var(--primary-container);
  color: #0a0f1d;
  font-size: 10px;
  font-weight: 700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-center { display: flex; align-items: center; }

.brand-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary);
  letter-spacing: 1px;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 0 16px 90px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
}

.glass-card {
  background: var(--surface-container);
  backdrop-filter: blur(10px);
  border: 1px solid var(--outline-variant);
  border-radius: 16px;
  padding: 20px;
}

.installment-card { position: relative; overflow: hidden; }

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--on-surface);
}

.invoice-badge {
  display: flex;
  align-items: center;
  gap: 2px;
  background: var(--bg);
  border: 1px solid var(--outline-variant);
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 11px;
  color: var(--on-surface-variant);
}

.badge-arrow { font-size: 18px; }

/* Amount Highlight */
.amount-highlight {
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--outline-variant);
}

.amount-label {
  font-size: 12px;
  color: var(--on-surface-variant);
  display: block;
  margin-bottom: 4px;
}

.amount-row {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 6px;
  margin-bottom: 12px;
}

.amount-big {
  font-size: 32px;
  font-weight: 700;
  color: var(--primary);
}

.amount-currency {
  font-size: 14px;
  color: var(--on-surface-variant);
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: var(--outline-variant);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 6px;
}

.progress-fill {
  height: 100%;
  background: var(--primary);
  border-radius: 3px;
  transition: width 0.6s ease;
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: var(--on-surface-variant);
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
  text-align: center;
}

.border-right {
  border-right: 1px solid var(--outline-variant);
  padding-right: 12px;
}

.stat-icon {
  font-size: 22px;
  color: var(--primary);
  margin-bottom: 2px;
}

.stat-label { font-size: 11px; color: var(--on-surface-variant); }

.stat-value-row {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.stat-value {
  font-size: 22px;
  font-weight: 700;
  color: var(--on-surface);
}

.stat-value.gold { color: var(--primary); }
.stat-unit { font-size: 11px; color: var(--on-surface-variant); }

/* Date Row */
.date-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.date-box, .duration-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg);
  border: 1px solid var(--outline-variant);
  border-radius: 12px;
  padding: 10px 12px;
}

.date-icon {
  font-size: 20px;
  color: var(--primary);
}

.date-text {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.date-label {
  font-size: 10px;
  color: var(--on-surface-variant);
}

.date-value {
  font-size: 12px;
  font-weight: 600;
  color: var(--on-surface);
}

/* Quick Actions */
.quick-actions {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.action-item {
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

.action-item:active { border-color: var(--primary); }
.action-icon { font-size: 26px; color: var(--primary); }
.action-icon.filled { font-variation-settings: 'FILL' 1; }
.action-label { font-size: 10px; color: var(--on-surface); text-align: center; }

/* Image Slider */
.slider-section {
  width: 100%;
}

.slider-container {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--outline-variant);
}

.slider-track {
  display: flex;
  transition: transform 0.5s ease;
}

.slide {
  min-width: 100%;
}

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

.slider-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(255,255,255,0.4);
  cursor: pointer;
  transition: background 0.3s;
}

.slider-dot.active {
  background: var(--primary);
  width: 20px;
  border-radius: 4px;
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.service-item {
  background: var(--surface-container);
  border: 1px solid var(--outline-variant);
  border-radius: 12px;
  padding: 12px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.service-icon { font-size: 24px; color: var(--primary); }
.service-icon.filled { font-variation-settings: 'FILL' 1; }
.service-label { font-size: 10px; color: var(--on-surface); text-align: center; }

/* Transaction */
.transaction-section { margin-bottom: 8px; }

.transaction-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.view-all-btn {
  background: none;
  border: 1px solid var(--outline-variant);
  color: var(--on-surface-variant);
  font-size: 11px;
  font-family: 'Noto Kufi Arabic', sans-serif;
  border-radius: 20px;
  padding: 4px 12px;
  cursor: pointer;
}

.transaction-card {
  background: var(--surface-container);
  border: 1px solid var(--outline-variant);
  border-radius: 16px;
  padding: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.transaction-right { display: flex; align-items: center; gap: 12px; }

.transaction-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--surface-variant);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
}

.transaction-name { font-size: 14px; font-weight: 700; color: var(--on-surface); }
.transaction-ref { font-size: 12px; color: var(--on-surface-variant); }

.transaction-left { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
.transaction-amount-row { display: flex; align-items: center; gap: 4px; }

.check-icon { color: var(--success); font-size: 18px; font-variation-settings: 'FILL' 1; }
.transaction-amount { font-size: 14px; font-weight: 700; color: var(--success); }
.transaction-date { font-size: 11px; color: var(--on-surface-variant); }

/* Bottom Nav */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: var(--bg);
  border-top: 1px solid var(--outline-variant);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: env(safe-area-inset-bottom, 4px);
  z-index: 50;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  background: none;
  border: none;
  color: var(--on-surface-variant);
  cursor: pointer;
  padding: 4px 8px;
}

.nav-item.active { color: var(--primary); }
.nav-icon-wrap { position: relative; display: flex; align-items: center; justify-content: center; }
.nav-icon { font-size: 24px; }
.nav-icon.filled { font-variation-settings: 'FILL' 1; }

.nav-dot {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 5px;
  height: 5px;
  background: var(--primary);
  border-radius: 50%;
}

.nav-badge {
  position: absolute;
  top: -2px;
  right: -4px;
  width: 8px;
  height: 8px;
  background: var(--error);
  border-radius: 50%;
}

.nav-label { font-size: 10px; font-weight: 500; }
.mb-4 { margin-bottom: 12px; }
</style>
