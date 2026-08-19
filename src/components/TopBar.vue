<template>
  <header class="top-bar">
    <button v-if="showBack" class="icon-btn" @click="$router.back()">
      <span class="material-symbols-outlined">arrow_forward_ios</span>
    </button>
    <button v-else class="icon-btn" @click="toggleTheme">
      <span class="material-symbols-outlined">{{ isDark ? 'light_mode' : 'dark_mode' }}</span>
    </button>
    <div class="brand-center" aria-label="Golden Group - العصر الذهبي">
      <div class="header-logo">
        <span class="gg-mark">GG</span>
        <div class="wordmark" dir="rtl">
          <span class="wordmark-ar">العصر الذهبي</span>
          <span class="wordmark-en">GOLDEN GROUP</span>
        </div>
      </div>
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

.brand-center { display: flex; align-items: center; flex: 1; justify-content: center; }
.header-logo { display: flex; align-items: center; gap: 7px; direction: ltr; line-height: 1; }
.gg-mark { display: inline-flex; align-items: center; justify-content: center; width: 33px; height: 33px; border: 1px solid rgba(242, 202, 80, .65); border-radius: 10px; background: linear-gradient(145deg, rgba(242, 202, 80, .18), rgba(212, 175, 55, .04)); color: var(--primary); font-family: Georgia, serif; font-size: 18px; font-weight: 700; letter-spacing: -5px; padding-left: 1px; text-shadow: 0 1px 8px rgba(242, 202, 80, .35); }
.wordmark { display: flex; flex-direction: column; align-items: flex-end; gap: 3px; min-width: 92px; }
.wordmark-ar { color: var(--primary); font-size: 12px; font-weight: 700; }
.wordmark-en { color: var(--on-surface-variant); font-family: Georgia, serif; font-size: 8px; font-weight: 700; letter-spacing: .8px; }
</style>
