<template>
  <div class="page">
    <TopBar />

    <main class="page-content">
      <!-- Profile Section -->
      <section class="profile-section">
        <div class="profile-photo-wrap">
          <div class="profile-photo">
            <span class="material-symbols-outlined">person</span>
          </div>
          <button class="camera-btn">
            <span class="material-symbols-outlined">photo_camera</span>
          </button>
        </div>
        <h2 class="profile-name">أحمد محمد علي</h2>
        <span class="profile-phone">0771 234 5678</span>
      </section>

      <!-- Membership Card -->
      <section class="membership-card">
        <div class="membership-left">
          <span class="membership-icon">👑</span>
          <div class="membership-info">
            <span class="membership-title">عضو ذهبي</span>
          </div>
        </div>
        <div class="membership-stats">
          <div class="mem-stat">
            <span class="mem-stat-num">28,500,000</span>
            <span class="mem-stat-label">إجمالي مشترياتك د.ع</span>
          </div>
          <div class="mem-stat">
            <span class="mem-stat-num">12</span>
            <span class="mem-stat-label">عدد الفواتير</span>
          </div>
        </div>
      </section>

      <!-- Menu Items -->
      <section class="menu-list">
        <button class="menu-item" v-for="item in menuItems" :key="item.label">
          <div class="menu-right">
            <span class="material-symbols-outlined menu-icon">{{ item.icon }}</span>
            <span class="menu-label">{{ item.label }}</span>
          </div>
          <span class="material-symbols-outlined menu-arrow">chevron_left</span>
        </button>
      </section>

      <!-- Support Section -->
      <section class="support-section">
        <div class="support-icon-wrap">
          <span class="material-symbols-outlined support-icon">headset_mic</span>
        </div>
        <div class="support-text">
          <h3 class="support-title">مركز الدعم</h3>
          <span class="support-sub">نحن هنا لمساعدتك</span>
        </div>
      </section>
    </main>

    <nav class="bottom-nav">
      <button class="nav-item" v-for="(item, i) in navItems" :key="item.label" :class="{ active: i === 4 }" @click="goTo(item.route)">
        <div class="nav-icon-wrap">
          <span class="material-symbols-outlined nav-icon" :class="{ filled: i === 4 }">{{ item.icon }}</span>
          <span v-if="item.badge" class="nav-badge"></span>
          <span v-if="i === 4" class="nav-dot"></span>
        </div>
        <span class="nav-label">{{ item.label }}</span>
      </button>
    </nav>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import TopBar from '../components/TopBar.vue'

const router = useRouter()
const goTo = (route) => { if (route) router.push(route) }

const menuItems = [
  { icon: 'person', label: 'البيانات الشخصية' },
  { icon: 'shopping_bag', label: 'طلباتي' },
  { icon: 'location_on', label: 'عنويني' },
  { icon: 'favorite', label: 'المفضلة' },
  { icon: 'credit_card', label: 'طرق الدفع' },
  { icon: 'lock', label: 'تغيير كلمة المرور' },
  { icon: 'notifications', label: 'الإشعارات' }
]

const navItems = [
  { icon: 'home', label: 'الرئيسية', route: '/home' },
  { icon: 'shopping_bag', label: 'المتجر', route: '/store' },
  { icon: 'account_balance_wallet', label: 'تسوياتي', route: '/settlements' },
  { icon: 'notifications', label: 'الإشعارات', badge: true, route: null },
  { icon: 'person', label: 'حسابي', route: null }
]
</script>

<style scoped>
.page { width: 100%; height: 100dvh; background: var(--bg); display: flex; flex-direction: column; overflow: hidden; }

.page-content {
  flex: 1; overflow-y: auto; padding: 0 16px 90px;
  display: flex; flex-direction: column; gap: 16px;
}

/* Profile */
.profile-section {
  display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 0;
}

.profile-photo-wrap { position: relative; }

.profile-photo {
  width: 90px; height: 90px; border-radius: 50%;
  background: var(--surface-container); border: 2px solid var(--outline-variant);
  display: flex; align-items: center; justify-content: center; overflow: hidden;
}

.profile-photo .material-symbols-outlined { font-size: 40px; color: var(--on-surface-variant); }

.camera-btn {
  position: absolute; bottom: 0; right: -4px;
  width: 30px; height: 30px; border-radius: 50%;
  background: var(--primary); border: 2px solid var(--bg);
  display: flex; align-items: center; justify-content: center; cursor: pointer;
}

.camera-btn .material-symbols-outlined { font-size: 16px; color: #0a0f1d; }

.profile-name { font-size: 18px; font-weight: 700; color: var(--on-surface); }
.profile-phone { font-size: 14px; color: var(--on-surface-variant); }

/* Membership */
.membership-card {
  background: linear-gradient(135deg, #1a1207, #2a1f0f);
  border: 1px solid var(--outline-variant); border-radius: 16px;
  padding: 16px; display: flex; flex-direction: column; gap: 12px;
}

.membership-left { display: flex; align-items: center; gap: 10px; }
.membership-icon { font-size: 24px; }
.membership-title { font-size: 16px; font-weight: 700; color: var(--primary); }

.membership-stats {
  display: flex; gap: 20px;
  border-top: 1px solid rgba(77, 70, 53, 0.5); padding-top: 12px;
}

.mem-stat { display: flex; flex-direction: column; gap: 2px; }
.mem-stat-num { font-size: 16px; font-weight: 700; color: var(--on-surface); direction: rtl; }
.mem-stat-label { font-size: 11px; color: var(--on-surface-variant); }

/* Menu */
.menu-list {
  background: var(--surface-container); border: 1px solid var(--outline-variant);
  border-radius: 16px; overflow: hidden;
}

.menu-item {
  display: flex; justify-content: space-between; align-items: center;
  padding: 16px; background: none; border: none; border-bottom: 1px solid var(--outline-variant);
  cursor: pointer; width: 100%; font-family: 'Noto Kufi Arabic', sans-serif;
}

.menu-item:last-child { border-bottom: none; }
.menu-item:active { background: var(--surface-variant); }

.menu-right { display: flex; align-items: center; gap: 12px; }
.menu-icon { font-size: 22px; color: var(--on-surface-variant); }
.menu-label { font-size: 14px; color: var(--on-surface); }
.menu-arrow { font-size: 20px; color: var(--on-surface-variant); }

/* Support */
.support-section {
  background: linear-gradient(135deg, #1a1207, #2a1f0f);
  border: 1px solid var(--outline-variant); border-radius: 16px;
  padding: 20px; display: flex; align-items: center; gap: 14px;
}

.support-icon-wrap {
  width: 50px; height: 50px; border-radius: 50%;
  background: rgba(242, 202, 80, 0.15);
  display: flex; align-items: center; justify-content: center;
}

.support-icon { font-size: 26px; color: var(--primary); }
.support-text { display: flex; flex-direction: column; gap: 2px; }
.support-title { font-size: 16px; font-weight: 700; color: var(--on-surface); }
.support-sub { font-size: 12px; color: var(--on-surface-variant); }

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
