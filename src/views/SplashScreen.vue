<template>
  <div class="splash-screen">
    <div class="splash-content" :class="{ 'fade-out': isFading }">
      <div class="logo-wrapper">
        <img :src="logo" alt="Golden Group" class="logo" />
      </div>
      <div class="loading-bar">
        <div class="loading-fill"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import logo from '../assets/logo.png'

const router = useRouter()
const isFading = ref(false)

onMounted(() => {
  setTimeout(() => {
    isFading.value = true
  }, 2200)
  setTimeout(() => {
    router.replace('/login')
  }, 3000)
})
</script>

<style scoped>
.splash-screen {
  width: 100%;
  height: 100dvh;
  background: #0a0f1d;
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
  gap: 40px;
  opacity: 1;
  transition: opacity 0.8s ease;
}

.splash-content.fade-out {
  opacity: 0;
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
  mix-blend-mode: screen;
}

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
  animation: fill-bar 2.5s ease-in-out;
}

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
</style>
