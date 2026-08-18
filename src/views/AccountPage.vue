<template>
  <div class="page">
    <TopBar />
    <div class="page-content">
      <!-- Profile -->
      <div class="profile-box">
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
      </div>

      <!-- Menu Card -->
      <div class="card">
        <div class="menu-row">
          <div class="menu-left">
            <div class="menu-icon-wrap"><span class="material-symbols-outlined mi">person</span></div>
            <span class="menu-label">البيانات الشخصية</span>
          </div>
          <span class="material-symbols-outlined arrow">chevron_left</span>
        </div>
        <div class="menu-row" @click="$router.push('/orders')">
          <div class="menu-left">
            <div class="menu-icon-wrap"><span class="material-symbols-outlined mi">receipt_long</span></div>
            <span class="menu-label">طلباتي</span>
          </div>
          <span class="material-symbols-outlined arrow">chevron_left</span>
        </div>
        <div class="menu-row last">
          <div class="menu-left">
            <div class="menu-icon-wrap"><span class="material-symbols-outlined mi">favorite</span></div>
            <span class="menu-label">المفضلة</span>
          </div>
          <span class="material-symbols-outlined arrow">chevron_left</span>
        </div>
      </div>

      <!-- Support Card -->
      <div class="card support-card">
        <div class="menu-left">
          <div class="support-icon-wrap"><span class="material-symbols-outlined">headset_mic</span></div>
          <div>
            <div class="menu-label" style="font-weight:700;">مركز الدعم الفني</div>
            <div class="profile-phone">نحن هنا لمساعدتك</div>
          </div>
        </div>
        <span class="material-symbols-outlined arrow">chevron_left</span>
      </div>

      <!-- Social Card -->
      <div class="card social-card">
        <span class="social-title">تابعنا على</span>
        <div class="social-icons">
          <a href="#" class="social-link fb"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
          <a href="#" class="social-link ig"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
          <a href="#" class="social-link wa"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>
          <a href="#" class="social-link tt"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg></a>
        </div>
      </div>

      <!-- Links Card -->
      <div class="card">
        <div class="menu-row">
          <div class="menu-left">
            <span class="material-symbols-outlined mi">description</span>
            <span class="menu-label">الشروط والأحكام</span>
          </div>
        </div>
        <div class="menu-row last">
          <div class="menu-left">
            <span class="material-symbols-outlined mi">lock</span>
            <span class="menu-label">سياسة الخصوصية</span>
          </div>
        </div>
      </div>

      <!-- Logout -->
      <div class="logout-btn" @click="goTo('/')">
        <span class="material-symbols-outlined">logout</span>
        <span>تسجيل الخروج</span>
      </div>

      <span class="version">الإصدار 1.0.0</span>
    </div>

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
const goTo = (r) => { if (r) router.push(r) }
const navItems = [
  { icon: 'home', label: 'الرئيسية', route: '/home' },
  { icon: 'shopping_bag', label: 'المتجر', route: '/store' },
  { icon: 'account_balance_wallet', label: 'أقساطي', route: '/settlements' },
  { icon: 'receipt_long', label: 'طلباتي', badge: true, route: '/orders' },
  { icon: 'person', label: 'حسابي', route: null }
]
</script>

<style scoped>
.page { width: 100%; height: 100dvh; background: var(--bg); display: flex; flex-direction: column; overflow: hidden; overscroll-behavior: none; }

.page-content { flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch; overscroll-behavior-y: contain; padding: 12px 16px 100px; display: flex; flex-direction: column; gap: 12px; align-items: stretch; }
.page-content > * { flex-shrink: 0; }

.profile-box { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 10px 0; }
.profile-photo-wrap { position: relative; }
.profile-photo { width: 90px; height: 90px; border-radius: 50%; background: var(--surface-container); border: 2px solid var(--outline-variant); display: flex; align-items: center; justify-content: center; }
.profile-photo .material-symbols-outlined { font-size: 40px; color: var(--on-surface-variant); }
.camera-btn { position: absolute; bottom: 0; right: -4px; width: 30px; height: 30px; border-radius: 50%; background: var(--primary); border: 2px solid var(--bg); display: flex; align-items: center; justify-content: center; cursor: pointer; }
.camera-btn .material-symbols-outlined { font-size: 16px; color: #0a0f1d; }
.profile-name { font-size: 18px; font-weight: 700; color: var(--on-surface); }
.profile-phone { font-size: 14px; color: var(--on-surface-variant); }

.card { background: var(--surface-container); border: 1px solid var(--outline-variant); border-radius: 16px; overflow: hidden; }

.menu-row { display: flex; align-items: center; justify-content: space-between; padding: 16px; border-bottom: 1px solid var(--outline-variant); }
.menu-row.last { border-bottom: none; }

.menu-left { display: flex; align-items: center; gap: 12px; }
.menu-icon-wrap { width: 36px; height: 36px; border-radius: 10px; background: rgba(242, 202, 80, 0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.mi { font-size: 20px; color: var(--primary); }
.menu-label { font-size: 14px; color: var(--on-surface); }
.arrow { font-size: 20px; color: var(--on-surface-variant); }

.support-card { background: var(--surface-container-high); display: flex; align-items: center; justify-content: space-between; padding: 0 16px; }
.support-icon-wrap { width: 46px; height: 46px; border-radius: 12px; background: rgba(99, 179, 237, 0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.support-icon-wrap .material-symbols-outlined { font-size: 24px; color: #63b3ed; }

.social-card { text-align: center; padding: 20px 16px; }
.social-title { font-size: 14px; font-weight: 600; color: var(--on-surface-variant); display: block; margin-bottom: 14px; }
.social-icons { display: flex; justify-content: center; gap: 16px; }
.social-link { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; text-decoration: none; }
.fb { background: rgba(24, 119, 242, 0.15); color: #1877F2; }
.ig { background: linear-gradient(135deg, rgba(225, 48, 108, 0.15), rgba(131, 58, 180, 0.15)); color: #E1306C; }
.wa { background: rgba(37, 211, 102, 0.15); color: #25D366; }
.tt { background: var(--surface-variant); color: var(--on-surface); }

.logout-btn { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 14px; border-radius: 14px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); color: var(--error); font-size: 15px; font-weight: 600; cursor: pointer; }
.version { text-align: center; font-size: 11px; color: var(--on-surface-variant); opacity: 0.5; padding: 8px 0 16px; }

.bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; height: 64px; background: var(--bg); border-top: 1px solid var(--outline-variant); display: flex; justify-content: space-around; align-items: center; padding-bottom: env(safe-area-inset-bottom, 4px); z-index: 50; }
.nav-item { display: flex; flex-direction: column; align-items: center; gap: 2px; background: none; border: none; color: var(--on-surface-variant); cursor: pointer; padding: 4px 8px; }
.nav-item.active { color: var(--primary); }
.nav-icon-wrap { position: relative; display: flex; align-items: center; justify-content: center; }
.nav-icon { font-size: 24px; }
.nav-icon.filled { font-variation-settings: 'FILL' 1; }
.nav-dot { position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%); width: 5px; height: 5px; background: var(--primary); border-radius: 50%; }
.nav-badge { position: absolute; top: -2px; right: -4px; width: 8px; height: 8px; background: var(--error); border-radius: 50%; }
.nav-label { font-size: 10px; font-weight: 500; }
</style>
