<template>
  <div class="splash-screen">
    <div class="splash-content">
      <div class="logo-wrapper">
        <img :src="logo" alt="Golden Group" class="logo" />
      </div>
      <div class="welcome-copy">
        <h1>أهلاً بك في العصر الذهبي</h1>
        <p>خدماتك ومنتجاتك في مكان واحد</p>
      </div>
      <div class="loading-bar">
        <div class="loading-fill"></div>
      </div>
      <button v-if="isLoadingComplete" class="skip-btn" @click="router.replace('/login')">
        تخطي
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import logo from '../assets/logo-dark.png'

const router = useRouter()
const isLoadingComplete = ref(false)

onMounted(() => {
  setTimeout(() => {
    isLoadingComplete.value = true
  }, 3000)
})
</script>

<style scoped>
.splash-screen {
  width: 100%;
  height: 100dvh;
  background: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.splash-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 28px;
}

.logo-wrapper {
  width: 260px;
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse-in 1.2s ease-out;
}

.logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.welcome-copy { text-align: center; }
.welcome-copy h1 { font-size: 18px; color: var(--primary); }
.welcome-copy p { margin-top: 6px; font-size: 12px; color: var(--on-surface-variant); }

.loading-bar {
  width: 180px;
  height: 3px;
  background: rgba(242, 202, 80, 0.15);
  border-radius: 4px;
  overflow: hidden;
}

.loading-fill {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #d4af37, #f2ca50);
  border-radius: 4px;
  animation: fill-bar 3s linear forwards;
}

.skip-btn { display: flex; align-items: center; gap: 6px; padding: 10px 20px; border: 1px solid var(--primary); border-radius: 12px; background: transparent; color: var(--primary); font: inherit; font-size: 13px; font-weight: 700; cursor: pointer; animation: show-skip 0.25s ease-out; }
.skip-btn .material-symbols-outlined { font-size: 18px; }

@keyframes pulse-in {
  0% {
    transform: scale(0.6);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fill-bar {
  0% { width: 0%; }
  100% { width: 100%; }
}

@keyframes show-skip {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
