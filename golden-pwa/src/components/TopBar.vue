<template>
  <header class="top-bar" :class="{ 'with-back': showBack }">
    <button v-if="showBack" class="icon-btn" @click="$router.back()">
      <span class="material-symbols-outlined">arrow_forward_ios</span>
    </button>
    <button v-else class="icon-btn" @click="toggleTheme">
      <span class="material-symbols-outlined">{{ isDark ? 'light_mode' : 'dark_mode' }}</span>
    </button>
    <div class="brand-center">
      <div v-if="!title && !showBack" class="brand-lockup" :style="{ '--brand-logo': `url(${logo})` }" aria-label="العصر الذهبي - Golden Group">
        <span class="brand-mark" aria-hidden="true"></span>
        <span class="brand-copy">
          <span class="brand-arabic" aria-hidden="true"></span>
          <span class="brand-divider" aria-hidden="true"></span>
          <span class="brand-english" aria-hidden="true"></span>
        </span>
      </div>
      <h1 v-else class="brand-title">{{ title || 'العصر الذهبي' }}</h1>
    </div>
    <button v-if="!showBack" class="icon-btn relative" @click="showNotifications = true" aria-label="الإشعارات">
      <span class="material-symbols-outlined">notifications</span>
      <span class="notif-badge">3</span>
    </button>
    <span v-else style="width:40px;"></span>
  </header>
  <div v-if="showNotifications" class="notifications-overlay" @click.self="showNotifications = false">
    <section class="notifications-panel">
      <div class="notifications-head"><div><h2>الإشعارات</h2><span>آخر التحديثات</span></div><button @click="showNotifications = false" aria-label="إغلاق"><span class="material-symbols-outlined">close</span></button></div>
      <article v-for="notification in notifications" :key="notification.id" class="notification-item">
        <span class="material-symbols-outlined notification-icon" :class="notification.type">{{ notification.icon }}</span>
        <div><strong>{{ notification.title }}</strong><p>{{ notification.text }}</p><small>{{ notification.time }}</small></div>
      </article>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import logo from '../assets/logo-transparent-fast.png'

defineProps({
  title: { type: String, default: '' },
  showBack: { type: Boolean, default: false }
})

const isDark = ref(document.documentElement.classList.contains('dark'))
const showNotifications = ref(false)
const notifications = [
  { id: 1, icon: 'event', type: 'gold', title: 'تذكير بالقسط القادم', text: 'موعد القسط القادم للفاتورة #10235 خلال 5 أيام.', time: 'منذ ساعتين' },
  { id: 2, icon: 'shopping_bag', type: 'blue', title: 'عروض جديدة', text: 'اكتشف العروض الجديدة المتاحة بالتقسيط.', time: 'أمس' },
  { id: 3, icon: 'description', type: 'red', title: 'تحديث حالة طلب', text: 'تمت إضافة ملاحظة جديدة إلى أحد طلباتك.', time: 'منذ يومين' }
]

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
}
</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  height: 56px;
  background: var(--bg);
  flex-shrink: 0;
  z-index: 40;
  border-bottom: 1px solid var(--outline-variant);
}
.top-bar.with-back { border-bottom-color: rgba(242, 202, 80, 0.35); }

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

.brand-center { display: flex; align-items: center; flex: 1; justify-content: center; min-width: 0; }
.brand-title { font-size: 18px; font-weight: 700; color: var(--primary); letter-spacing: 1px; }
.brand-lockup { display: flex; align-items: center; gap: 7px; direction: ltr; height: 46px; }
.brand-mark { width: 45px; height: 31px; flex: none; background-image: var(--brand-logo); background-size: 82px 82px; background-position: -20px -14px; background-repeat: no-repeat; filter: drop-shadow(0 2px 2px rgba(0,0,0,.4)); }
.brand-copy { display: flex; flex-direction: column; align-items: center; gap: 0; direction: rtl; }
.brand-arabic { display: block; width: 118px; height: 18px; background-image: var(--brand-logo); background-size: 150px 150px; background-position: -16px -106px; background-repeat: no-repeat; filter: drop-shadow(0 1px 1px rgba(0,0,0,.35)); }
.brand-divider { display: block; width: 132px; height: 5px; background-image: var(--brand-logo); background-size: 150px 150px; background-position: -9px -99px; background-repeat: no-repeat; }
.brand-english { display: block; width: 145px; height: 15px; background-image: var(--brand-logo); background-size: 150px 150px; background-position: -6px -82px; background-repeat: no-repeat; filter: drop-shadow(0 1px 1px rgba(0,0,0,.35)); }
.notifications-overlay { position:fixed; inset:0; z-index:240; background:rgba(5,8,15,.42); display:flex; align-items:flex-start; justify-content:center; padding:64px 12px 0; }
.notifications-panel { width:min(100%,480px); max-height:72vh; overflow:auto; background:var(--surface-container); border:1px solid var(--outline-variant); border-radius:18px; box-shadow:0 16px 42px rgba(0,0,0,.36); padding:12px; }
.notifications-head { display:flex; align-items:center; justify-content:space-between; padding:3px 4px 10px; border-bottom:1px solid var(--outline-variant); }.notifications-head h2 { color:var(--on-surface); font-size:16px; }.notifications-head span { color:var(--on-surface-variant); font-size:11px; }.notifications-head button { width:30px; height:30px; border:0; border-radius:50%; color:var(--on-surface-variant); background:var(--bg); cursor:pointer; }
.notification-item { display:flex; gap:10px; padding:12px 5px; border-bottom:1px solid rgba(77,70,53,.55); }.notification-item:last-child { border-bottom:0; }.notification-icon { width:36px; height:36px; display:flex; align-items:center; justify-content:center; flex:none; border-radius:11px; background:rgba(196,154,59,.13); color:var(--primary); }.notification-icon.blue { background:rgba(99,179,237,.13); color:#63b3ed; }.notification-icon.red { background:rgba(239,83,80,.13); color:#ff8585; }.notification-item strong { display:block; font-size:13px; color:var(--on-surface); }.notification-item p { margin:2px 0; color:var(--on-surface-variant); font-size:11px; line-height:1.65; }.notification-item small { color:var(--primary); font-size:10px; }
</style>
