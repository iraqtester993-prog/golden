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
      <section class="glass-card installment-card">
        <div class="card-header">
          <h2 class="section-title">أقساطي</h2>
          <div class="invoice-badge">
            <span>فاتورة #10235</span>
            <span class="material-symbols-outlined text-sm">keyboard_arrow_down</span>
          </div>
        </div>
        <div class="stats-grid">
          <div class="stat-item border-right">
            <span class="stat-label">المبلغ المتبقي</span>
            <div class="stat-value-row">
              <span class="stat-value gold">4,250,000</span>
              <span class="stat-unit">د.ع</span>
            </div>
          </div>
          <div class="stat-item">
            <span class="stat-label">المبلغ الكلي</span>
            <div class="stat-value-row">
              <span class="stat-value">12,500,000</span>
              <span class="stat-unit">د.ع</span>
            </div>
          </div>
        </div>
        <div class="stats-grid top-border">
          <div class="stat-item border-right">
            <span class="stat-label">الأقساط المتبقية</span>
            <div class="stat-value-row">
              <span class="stat-value">17</span>
              <span class="stat-unit">قسط</span>
            </div>
          </div>
          <div class="stat-item">
            <span class="stat-label">الأقساط الكلية</span>
            <div class="stat-value-row">
              <span class="stat-value">24</span>
              <span class="stat-unit">قسط</span>
            </div>
          </div>
        </div>
        <div class="date-bar">
          <div class="date-info">
            <span class="material-symbols-outlined text-sm gold">calendar_today</span>
            <span>تاريخ القسط 2024/06/25</span>
          </div>
          <span class="date-badge">بعد 8 أيام</span>
        </div>
      </section>

      <section class="quick-actions">
        <button class="action-item" v-for="action in quickActions" :key="action.label">
          <span class="material-symbols-outlined action-icon filled">{{ action.icon }}</span>
          <span class="action-label">{{ action.label }}</span>
        </button>
      </section>

      <section class="promo-banner">
        <div class="promo-bg" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAUXdp7ZiRF1rEzp-RxdZBnHzrvUZVKSx_blCYzj8riquymEg4fw_9T6ZYfMPYSjz3x27Q7zE1AUhn13h3fYzedr6v4oMzMTvRVH1sfCH4B-QBJdjJL9-Xp58iSzdRBBadQIM3mzqUhidIunR7bHcFzhksCn9uMCu2s8x61ZH7c74fkpc4rfTLOSU1dQ0Yf2agEhN6xZJh2Wp8eXO-ZaiTDtEvljjothEJc40u2Et_cjter4FTGvc6l')"></div>
        <div class="promo-overlay"></div>
        <div class="promo-content">
          <h3 class="promo-title">عروض حصرية</h3>
          <p class="promo-sub gold">على السيارات</p>
          <button class="promo-btn">تسوق الآن</button>
        </div>
        <div class="promo-dots">
          <span class="dot active"></span><span class="dot"></span><span class="dot"></span>
        </div>
      </section>

      <div class="search-bar">
        <span class="material-symbols-outlined search-icon">search</span>
        <input type="text" placeholder="ابحث عن منتج أو خدمة..." class="search-input" />
      </div>

      <section>
        <h2 class="section-title mb-4">الخدمات</h2>
        <div class="services-grid">
          <div class="service-item" v-for="service in services" :key="service.label">
            <span class="material-symbols-outlined service-icon filled">{{ service.icon }}</span>
            <span class="service-label">{{ service.label }}</span>
          </div>
        </div>
      </section>

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
import { ref } from 'vue'

const isDark = ref(true)

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
}

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
  position: sticky;
  top: 0;
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

.brand-center {
  display: flex;
  align-items: center;
}

.brand-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary);
  letter-spacing: 1px;
  line-height: 1;
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
  gap: 4px;
  background: var(--bg);
  border: 1px solid var(--outline-variant);
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 11px;
  color: var(--on-surface-variant);
}

.text-sm { font-size: 16px; }

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}

.stats-grid.top-border {
  border-top: 1px solid var(--outline-variant);
  padding-top: 14px;
  margin-bottom: 14px;
}

.stat-item { display: flex; flex-direction: column; gap: 4px; }

.border-right {
  border-right: 1px solid var(--outline-variant);
  padding-right: 12px;
}

.stat-label { font-size: 11px; color: var(--on-surface-variant); }

.stat-value-row { display: flex; align-items: baseline; gap: 4px; }

.stat-value {
  font-size: 18px;
  font-weight: 700;
  color: var(--on-surface);
}

.stat-value.gold {
  font-size: 24px;
  color: var(--primary);
}

.stat-unit { font-size: 12px; color: var(--on-surface-variant); }

.date-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg);
  border: 1px solid var(--outline-variant);
  border-radius: 12px;
  padding: 10px 12px;
}

.date-info {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--on-surface-variant);
}

.gold { color: var(--primary); }

.date-badge {
  font-size: 11px;
  color: var(--on-surface);
  background: var(--surface-variant);
  padding: 4px 10px;
  border-radius: 8px;
}

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

.promo-banner {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  height: 140px;
  border: 1px solid var(--outline-variant);
}

.promo-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.6;
}

.promo-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to left, var(--bg), var(--bg) 30%, transparent);
}

.promo-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 0 20px;
  width: 50%;
  margin-left: auto;
  text-align: right;
}

.promo-title { font-size: 16px; font-weight: 700; color: var(--on-surface); margin-bottom: 4px; }
.promo-sub { font-size: 13px; margin-bottom: 10px; }

.promo-btn {
  background: var(--primary-container);
  color: #0a0f1d;
  font-size: 11px;
  font-weight: 700;
  border: none;
  border-radius: 20px;
  padding: 6px 16px;
  cursor: pointer;
  font-family: 'Noto Kufi Arabic', sans-serif;
}

.promo-dots {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 2;
}

.dot { width: 6px; height: 6px; border-radius: 50%; background: var(--surface-variant); }
.dot.active { background: var(--primary); }

.search-bar { position: relative; }

.search-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--on-surface-variant);
  font-size: 20px;
}

.search-input {
  width: 100%;
  background: var(--surface-container);
  border: 1px solid var(--outline-variant);
  border-radius: 28px;
  padding: 12px 44px 12px 16px;
  color: var(--on-surface);
  font-size: 13px;
  font-family: 'Noto Kufi Arabic', sans-serif;
  outline: none;
  direction: rtl;
  transition: border-color 0.3s;
}

.search-input::placeholder { color: var(--on-surface-variant); }
.search-input:focus { border-color: var(--primary); }

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
