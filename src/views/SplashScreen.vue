<template>
  <div class="splash-screen">
    <div class="splash-content" :class="{ 'fade-out': isFading }">
      <div class="logo-wrapper">
        <img :src="logo" alt="Golden Group" class="logo" />
      </div>
      <p class="welcome-message">تسوق الآن وادفع على راحتك</p>
      <button class="skip-button" @click="goToLogin">تخطي</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import logo from '../assets/logo-transparent-v3.png'

const router = useRouter()
const isFading = ref(false)
let fadeTimer
let redirectTimer

const goToLogin = () => {
  clearTimeout(fadeTimer)
  clearTimeout(redirectTimer)
  router.replace('/login')
}

onMounted(() => {
  fadeTimer = setTimeout(() => {
    isFading.value = true
  }, 2600)
  redirectTimer = setTimeout(() => {
    goToLogin()
  }, 3000)
})

onUnmounted(() => {
  clearTimeout(fadeTimer)
  clearTimeout(redirectTimer)
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
  gap: 24px;
  opacity: 1;
  transition: opacity 0.4s ease;
}

.splash-content.fade-out {
  opacity: 0;
}

.logo-wrapper {
  width: min(260px, 70vw);
  height: min(260px, 70vw);
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

.welcome-message {
  color: var(--primary);
  font-size: clamp(16px, 4vw, 20px);
  font-weight: 700;
  text-align: center;
}

.skip-button {
  padding: 8px 20px;
  border: 1px solid var(--outline-variant);
  border-radius: 20px;
  background: transparent;
  color: var(--on-surface-variant);
  font: inherit;
  font-size: 13px;
  cursor: pointer;
}

.skip-button:active { border-color: var(--primary); color: var(--primary); }

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

</style>
