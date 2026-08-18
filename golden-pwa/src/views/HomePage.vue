<template>
  <div class="home-screen">
    <!-- TopAppBar -->
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

    <!-- Main Content -->
    <main class="main-content">
      <!-- Installment Card -->
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

      <!-- Quick Actions -->
      <section class="quick-actions">
        <button class="action-item" v-for="action in quickActions" :key="action.label">
          <span class="material-symbols-outlined action-icon" :class="{ filled: action.filled }">{{ action.icon }}</span>
          <span class="action-label">{{ action.label }}</span>
        </button>
      </section>

      <!-- Promo Banner -->
      <section class="promo-banner">
        <div class="promo-bg" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAUXdp7ZiRF1rEzp-RxdZBnHzrvUZVKSx_blCYzj8riquymEg4fw_9T6ZYfMPYSjz3x27Q7zE1AUhn13h3fYzedr6v4oMzMTvRVH1sfCH4B-QBJdjJL9-Xp58iSzdRBBadQIM3mzqUhidIunR7bHcFzhksCn9uMCu2s8x61ZH7c74fkpc4rfTLOSU1dQ0Yf2agEhN6xZJh2Wp8eXO-ZaiTDtEvljjothEJc40u2Et_cjter4FTGvc6l')"></div>
        <div class="promo-overlay"></div>
        <div class="promo-content">
          <h3 class="promo-title">عروض حصرية</h3>
          <p class="promo-sub gold">على السيارات</p>
          <button class="promo-btn">تسوق الآن</button>
        </div>
        <div class="promo-dots">
          <span class="dot active"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </section>

      <!-- Search Bar -->
      <div class="search-bar">
        <span class="material-symbols-outlined search-icon">search</span>
        <input type="text" placeholder="ابحث عن منتج أو خدمة..." class="search-input" />
      </div>

      <!-- Services Grid -->
      <section>
        <h2 class="section-title mb-4">الخدمات</h2>
        <div class="services-grid">
          <div class="service-item" v-for="service in services" :key="service.label">
            <span class="material-symbols-outlined service-icon" :class="{ filled: service.filled }">{{ service.icon }}</span>
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

    <!-- BottomNavBar -->
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
  { icon: 'credit_score', label: 'إطفاء فاتورة', filled: true },
  { icon: 'add_circle', label: 'طلب جديد', filled: true },
  { icon: 'receipt_long', label: 'كشف حساب', filled: true },
  { icon: 'payments', label: 'تسديد قسط', filled: true }
]

const services = [
  { icon: 'category', label: 'المنتجات', filled: true },
  { icon: 'local_offer', label: 'العروض', filled: true },
  { icon: 'account_balance_wallet', label: 'تسوياتي', filled: true },
  { icon: 'store', label: 'الماركات', filled: true },
  { icon: 'location_on', label: 'الفروع', filled: true },
  { icon: 'support_agent', label: 'الوكلاء', filled: true },
  { icon: 'calculate', label: 'حاسبة التقسيط', filled: true },
  { icon: 'more_horiz', label: 'المزيد', filled: false }
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
  background: #0a0f1d;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* TopAppBar */
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  height: 64px;
  background: #0a0f1d;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 40;
}

.icon-btn {
  background: none;
  border: none;
  color: #bec6df;
  cursor: pointer;
  padding: 8px;
}

.relative {
  position: relative;
}

.notif-badge {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 18px;
  height: 18px;
  background: #d4af37;
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
  flex-direction: column;
  align-items: center;
}

.brand-title {
  font-size: 20px;
  font-weight: 700;
  color: #f2ca50;
  letter-spacing: 1px;
  line-height: 1;
}

/* Main Content */
.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 0 16px 100px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.glass-card {
  background: rgba(20, 27, 45, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(77, 70, 53, 0.8);
  border-radius: 16px;
  padding: 20px;
}

/* Installment Card */
.installment-card {
  position: relative;
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #eae1d4;
}

.invoice-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  background: #141b2d;
  border: 1px solid #4d4635;
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 12px;
  color: #d0c5af;
}

.text-sm {
  font-size: 16px;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

.stats-grid.top-border {
  border-top: 1px solid rgba(77, 70, 53, 0.5);
  padding-top: 16px;
  margin-bottom: 16px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.border-right {
  border-right: 1px solid rgba(77, 70, 53, 0.5);
  padding-right: 16px;
}

.stat-label {
  font-size: 12px;
  color: #bec6df;
}

.stat-value-row {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
  color: #eae1d4;
}

.stat-value.gold {
  font-size: 26px;
  color: #f2ca50;
}

.stat-unit {
  font-size: 13px;
  color: #bec6df;
}

.date-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #141b2d;
  border: 1px solid #4d4635;
  border-radius: 12px;
  padding: 10px 14px;
}

.date-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #d0c5af;
}

.gold {
  color: #f2ca50;
}

.date-badge {
  font-size: 12px;
  color: #d0c5af;
  background: #38342b;
  padding: 4px 10px;
  border-radius: 8px;
}

/* Quick Actions */
.quick-actions {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.action-item {
  background: #141b2d;
  border: 1px solid #4d4635;
  border-radius: 12px;
  padding: 14px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: border-color 0.2s;
}

.action-item:active {
  border-color: rgba(242, 202, 80, 0.5);
}

.action-icon {
  font-size: 28px;
  color: #f2ca50;
}

.action-icon.filled {
  font-variation-settings: 'FILL' 1;
}

.action-label {
  font-size: 11px;
  color: #eae1d4;
  text-align: center;
}

/* Promo Banner */
.promo-banner {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  height: 144px;
  border: 1px solid #4d4635;
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
  background: linear-gradient(to left, #0a0f1d, #0a0f1d 30%, transparent);
}

.promo-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 0 24px;
  width: 50%;
  margin-left: auto;
  text-align: right;
}

.promo-title {
  font-size: 18px;
  font-weight: 700;
  color: #eae1d4;
  margin-bottom: 4px;
}

.promo-sub {
  font-size: 14px;
  margin-bottom: 12px;
}

.promo-btn {
  background: #d4af37;
  color: #0a0f1d;
  font-size: 12px;
  font-weight: 700;
  border: none;
  border-radius: 20px;
  padding: 6px 18px;
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

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #38342b;
}

.dot.active {
  background: #f2ca50;
}

/* Search Bar */
.search-bar {
  position: relative;
}

.search-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #d0c5af;
}

.search-input {
  width: 100%;
  background: #141b2d;
  border: 1px solid #4d4635;
  border-radius: 28px;
  padding: 14px 48px 14px 20px;
  color: #eae1d4;
  font-size: 14px;
  font-family: 'Noto Kufi Arabic', sans-serif;
  outline: none;
  direction: rtl;
  transition: border-color 0.3s;
}

.search-input::placeholder {
  color: #99907c;
}

.search-input:focus {
  border-color: #f2ca50;
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.service-item {
  background: #141b2d;
  border: 1px solid #4d4635;
  border-radius: 12px;
  padding: 14px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.service-icon {
  font-size: 28px;
  color: #f2ca50;
}

.service-icon.filled {
  font-variation-settings: 'FILL' 1;
}

.service-label {
  font-size: 11px;
  color: #eae1d4;
  text-align: center;
}

/* Transaction */
.transaction-section {
  margin-bottom: 16px;
}

.transaction-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.view-all-btn {
  background: none;
  border: 1px solid #4d4635;
  color: #bec6df;
  font-size: 12px;
  font-family: 'Noto Kufi Arabic', sans-serif;
  border-radius: 20px;
  padding: 4px 14px;
  cursor: pointer;
}

.transaction-card {
  background: #141b2d;
  border: 1px solid #4d4635;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.transaction-right {
  display: flex;
  align-items: center;
  gap: 14px;
}

.transaction-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #38342b;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f2ca50;
}

.transaction-name {
  font-size: 15px;
  font-weight: 700;
  color: #eae1d4;
}

.transaction-ref {
  font-size: 13px;
  color: #bec6df;
}

.transaction-left {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.transaction-amount-row {
  display: flex;
  align-items: center;
  gap: 4px;
}

.check-icon {
  color: #34d399;
  font-size: 18px;
  font-variation-settings: 'FILL' 1;
}

.transaction-amount {
  font-size: 15px;
  font-weight: 700;
  color: #34d399;
}

.transaction-date {
  font-size: 12px;
  color: #bec6df;
}

/* Bottom Nav */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 72px;
  background: #0a0f1d;
  border-top: 1px solid #4d4635;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: env(safe-area-inset-bottom, 8px);
  z-index: 50;
  border-radius: 16px 16px 0 0;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  background: none;
  border: none;
  color: #bec6df;
  cursor: pointer;
  padding: 4px 8px;
}

.nav-item.active {
  color: #f2ca50;
}

.nav-icon-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-icon {
  font-size: 26px;
}

.nav-icon.filled {
  font-variation-settings: 'FILL' 1;
}

.nav-dot {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  background: #f2ca50;
  border-radius: 50%;
}

.nav-badge {
  position: absolute;
  top: -2px;
  right: -4px;
  width: 8px;
  height: 8px;
  background: #ff6b6b;
  border-radius: 50%;
}

.nav-label {
  font-size: 11px;
  font-weight: 500;
}

.mb-4 {
  margin-bottom: 16px;
}
</style>
