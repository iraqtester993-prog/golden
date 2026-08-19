<template>
  <div class="app-shell" @touchstart.passive="onTouchStart" @touchmove.passive="onTouchMove" @touchend="onTouchEnd">
    <router-view />
    <div v-if="isRefreshing" class="refresh-overlay" role="status" aria-live="polite">
      <img :src="logo" alt="العصر الذهبي" class="refresh-logo" />
      <div class="refresh-track"><span class="refresh-progress" :style="{ width: `${refreshProgress}%` }"></span></div>
      <span class="refresh-percent">{{ refreshProgress }}%</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import logo from './assets/logo.png'

const isRefreshing = ref(false)
const refreshProgress = ref(0)
let touchStartY = 0
let pullDistance = 0

const onTouchStart = (event) => {
  if (isRefreshing.value) return
  touchStartY = event.touches[0]?.clientY || 0
  pullDistance = 0
}

const onTouchMove = (event) => {
  if (isRefreshing.value) return
  const scrollContainer = event.target.closest('[class*="content"]')
  if (scrollContainer?.scrollTop > 0) return
  pullDistance = (event.touches[0]?.clientY || 0) - touchStartY
}

const onTouchEnd = () => {
  if (!isRefreshing.value && pullDistance >= 80) refresh()
}

const refresh = () => {
  isRefreshing.value = true
  refreshProgress.value = 0
  const duration = 3000
  const startedAt = performance.now()
  const tick = (now) => {
    refreshProgress.value = Math.min(100, Math.round(((now - startedAt) / duration) * 100))
    if (now - startedAt < duration) {
      requestAnimationFrame(tick)
    } else {
      window.location.reload()
    }
  }
  requestAnimationFrame(tick)
}
</script>

<style>
.app-shell { width: 100%; height: 100%; }
.refresh-overlay { position: fixed; inset: 0; z-index: 1000; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; background: color-mix(in srgb, var(--bg) 94%, transparent); }
.refresh-logo { width: min(210px, 55vw); height: auto; object-fit: contain; }
.refresh-track { width: min(250px, 68vw); height: 4px; overflow: hidden; border-radius: 999px; background: var(--surface-variant); }
.refresh-progress { display: block; height: 100%; border-radius: inherit; background: var(--primary); transition: width 80ms linear; }
.refresh-percent { font-size: 12px; font-weight: 700; color: var(--on-surface-variant); }
</style>
