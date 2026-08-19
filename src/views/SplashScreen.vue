<template>
  <div class="splash-screen">
    <div class="splash-content" :class="{ 'fade-out': isFading }">
      <div class="logo-wrapper">
        <img :src="logo" alt="Golden Group" class="logo" />
      </div>
      <p class="welcome-message">تسوق الآن وادفع على راحتك</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import logo from '../assets/logo-transparent-v3.png'

const router = useRouter()
const isFading = ref(false)

onMounted(() => {
  setTimeout(() => {
    isFading.value = true
  }, 1600)
  setTimeout(() => {
    router.replace('/login')
  }, 2000)
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
  transition: opacity 0.8s ease;
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
