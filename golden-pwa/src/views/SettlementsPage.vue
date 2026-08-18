<template>
  <div class="page">
    <header class="top-bar">
      <button class="icon-btn" @click="$router.back()">
        <span class="material-symbols-outlined">arrow_forward</span>
      </button>
      <h1 class="page-title">تسوياتي</h1>
      <button class="icon-btn">
        <span class="material-symbols-outlined">filter_list</span>
      </button>
    </header>

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
        <button class="tab" :class="{ active: activeTab === 'current' }" @click="activeTab = 'current'">الفواتير الحالية</button>
        <button class="tab" :class="{ active: activeTab === 'past' }" @click="activeTab = 'past'">الفواتير السابقة</button>
      </div>

      <!-- Invoice List -->
      <div class="invoice-list">
        <div class="invoice-card" v-for="inv in invoices" :key="inv.id">
          <div class="inv-header">
            <div class="inv-id-name">
              <span class="inv-id">#{{ inv.id }}</span>
              <span class="inv-name">{{ inv.name }}</span>
            </div>
            <div class="inv-img-wrap">
              <img :src="inv.img" class="inv-img" />
            </div>
          </div>
          <div class="inv-price">{{ inv.total }} د.ع</div>
          <div class="inv-price-label">المبلغ الكلي</div>
          <div class="inv-stats">
            <div class="inv-stat">
              <span class="inv-stat-num">{{ inv.paid }}</span>
              <span class="inv-stat-label">المدفوع</span>
            </div>
            <div class="inv-stat">
              <span class="inv-stat-num">{{ inv.paidInstallments }}</span>
              <span class="inv-stat-label">المدفوع الأقساط</span>
            </div>
            <div class="inv-stat">
              <span class="inv-stat-num">{{ inv.remaining }}</span>
              <span class="inv-stat-label">المتبقي</span>
            </div>
            <span class="inv-status" :class="inv.statusClass">{{ inv.status }}</span>
          </div>
        </div>
      </div>
    </main>

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

const router = useRouter()
const activeTab = ref('current')

const goTo = (route) => { if (route) router.push(route) }

const invoices = [
  { id: 10235, name: 'BYD 2024', total: '20,000,000', paid: '42', paidInstallments: '18', remaining: '6,000,000', status: 'مسدد', statusClass: 'paid', img: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=200&h=120&fit=crop' },
  { id: 10230, name: 'Hisense 55 inch', total: '3,500,000', paid: '18', paidInstallments: '8', remaining: '1,500,000', status: 'مسدد', statusClass: 'paid', img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=120&fit=crop' },
  { id: 10228, name: 'iPhone 15 Pro', total: '2,800,000', paid: '6', paidInstallments: '6', remaining: '2,000,000', status: 'مدفوع', statusClass: 'active', img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200&h=120&fit=crop' }
]

const navItems = [
  { icon: 'home', label: 'الرئيسية', route: '/home' },
  { icon: 'shopping_bag', label: 'المتجر', route: '/store' },
  { icon: 'account_balance_wallet', label: 'تسوياتي', route: null },
  { icon: 'notifications', label: 'الإشعارات', badge: true, route: null },
  { icon: 'person', label: 'حسابي', route: '/account' }
]
</script>

<style scoped>
.page { width: 100%; height: 100dvh; background: var(--bg); display: flex; flex-direction: column; overflow: hidden; }

.top-bar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 0 16px; height: 56px; background: var(--bg); flex-shrink: 0; z-index: 40;
}

.icon-btn { background: none; border: none; color: var(--on-surface-variant); cursor: pointer; padding: 8px; }
.icon-btn .material-symbols-outlined { font-size: 24px; }
.page-title { font-size: 18px; font-weight: 700; color: var(--on-surface); }

.page-content {
  flex: 1; overflow-y: auto; padding: 0 16px 90px;
  display: flex; flex-direction: column; gap: 16px;
}

/* Summary Card */
.summary-card {
  background: linear-gradient(135deg, #1a1207, #2a1f0f);
  border: 1px solid var(--outline-variant); border-radius: 16px;
  padding: 20px; display: flex; align-items: center; gap: 16px;
}

.summary-icon {
  width: 50px; height: 50px; border-radius: 14px;
  background: rgba(242, 202, 80, 0.15);
  display: flex; align-items: center; justify-content: center;
}

.summary-icon .material-symbols-outlined { font-size: 26px; color: var(--primary); }

.summary-text { display: flex; flex-direction: column; gap: 4px; }
.summary-label { font-size: 12px; color: var(--on-surface-variant); }

.summary-amount { display: flex; align-items: baseline; gap: 6px; }
.summary-num { font-size: 24px; font-weight: 700; color: var(--primary); }
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
}

.inv-header { display: flex; justify-content: space-between; align-items: flex-start; }

.inv-id-name { display: flex; flex-direction: column; gap: 2px; }
.inv-id { font-size: 16px; font-weight: 700; color: var(--on-surface); }
.inv-name { font-size: 12px; color: var(--on-surface-variant); }

.inv-img-wrap { width: 80px; height: 56px; border-radius: 8px; overflow: hidden; }
.inv-img { width: 100%; height: 100%; object-fit: cover; }

.inv-price { font-size: 18px; font-weight: 700; color: var(--on-surface); direction: rtl; }
.inv-price-label { font-size: 11px; color: var(--on-surface-variant); margin-top: -6px; }

.inv-stats {
  display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
  border-top: 1px solid var(--outline-variant); padding-top: 10px;
}

.inv-stat { display: flex; flex-direction: column; align-items: center; gap: 1px; min-width: 60px; }
.inv-stat-num { font-size: 14px; font-weight: 700; color: var(--on-surface); }
.inv-stat-label { font-size: 9px; color: var(--on-surface-variant); }

.inv-status {
  margin-right: auto; font-size: 11px; font-weight: 600;
  padding: 3px 10px; border-radius: 6px;
}

.inv-status.paid { background: rgba(52, 211, 153, 0.15); color: var(--success); }
.inv-status.active { background: rgba(242, 202, 80, 0.15); color: var(--primary); }

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
