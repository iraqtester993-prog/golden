<template>
  <header class="top-bar" :class="{ 'with-back': showBack }">
    <button v-if="showBack" class="icon-btn" @click="$router.back()">
      <span class="material-symbols-outlined">arrow_forward_ios</span>
    </button>
    <button v-else class="icon-btn" @click="toggleTheme">
      <span class="material-symbols-outlined">{{ isDark ? 'light_mode' : 'dark_mode' }}</span>
    </button>
    <div class="brand-center">
      <div v-if="!title && !showBack" class="brand-lockup" aria-label="العصر الذهبي - Golden Group">
        <span class="brand-mark">GG</span>
        <span class="brand-copy">
          <span class="brand-arabic">العصر الذهبي</span>
          <span class="brand-english">GOLDEN GROUP</span>
        </span>
      </div>
      <h1 v-else class="brand-title">{{ title || 'العصر الذهبي' }}</h1>
    </div>
    <button v-if="!showBack" class="icon-btn relative">
      <span class="material-symbols-outlined">notifications</span>
      <span class="notif-badge">2</span>
    </button>
    <span v-else style="width:40px;"></span>
  </header>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  title: { type: String, default: '' },
  showBack: { type: Boolean, default: false }
})

const isDark = ref(document.documentElement.classList.contains('dark'))

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
.brand-lockup { display: flex; align-items: center; gap: 7px; direction: ltr; color: var(--primary); }
.brand-mark { font-family: Georgia, serif; font-size: 35px; font-weight: 700; letter-spacing: -7px; line-height: 1; text-shadow: 0 0 12px rgba(242, 202, 80, 0.18); }
.brand-copy { display: flex; flex-direction: column; align-items: flex-start; line-height: 1; direction: rtl; }
.brand-arabic { font-size: 17px; font-weight: 700; white-space: nowrap; }
.brand-english { margin-top: 2px; font-family: Georgia, serif; font-size: 11px; letter-spacing: 1.4px; white-space: nowrap; }
</style>
