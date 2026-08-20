<template>
  <div v-if="enabled && (pulling || refreshing)" class="refresh-indicator" :class="{ ready: pullDistance >= triggerDistance, refreshing }" :style="{ transform: `translate(-50%, ${indicatorOffset}px)` }">
    <img :src="logo" alt="العصر الذهبي" />
    <div class="refresh-bar"><span :style="{ width: `${progress}%` }"></span></div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import logo from '../assets/logo-transparent.png'

const route = useRoute()
const triggerDistance = 82
const startY = ref(0)
const pullDistance = ref(0)
const pulling = ref(false)
const refreshing = ref(false)
const progress = ref(0)
let activeScroller = null
let timer = null
const enabled = computed(() => !['/', '/login', '/register'].includes(route.path))
const indicatorOffset = computed(() => refreshing.value ? 10 : Math.min(-72 + pullDistance.value, 10))

const findScroller = target => {
  let element = target
  while (element && element !== document.body) {
    if (element.scrollHeight > element.clientHeight && getComputedStyle(element).overflowY !== 'visible') return element
    element = element.parentElement
  }
  return null
}
const onStart = event => {
  if (!enabled.value || refreshing.value) return
  activeScroller = findScroller(event.target)
  if (!activeScroller || activeScroller.scrollTop > 0) { activeScroller = null; return }
  startY.value = event.touches ? event.touches[0].clientY : event.clientY
}
const onMove = event => {
  if (!activeScroller || refreshing.value) return
  const point = event.touches ? event.touches[0] : event
  const distance = Math.max(0, point.clientY - startY.value)
  if (!distance) return
  pulling.value = true
  pullDistance.value = Math.min(distance * .55, triggerDistance + 28)
  if (event.cancelable) event.preventDefault()
}
const finishRefresh = () => {
  progress.value = 100
  window.setTimeout(() => window.location.reload(), 80)
}
const onEnd = () => {
  if (!activeScroller || refreshing.value) return
  const shouldRefresh = pullDistance.value >= triggerDistance
  activeScroller = null
  if (!shouldRefresh) { pulling.value = false; pullDistance.value = 0; return }
  pulling.value = false
  refreshing.value = true
  progress.value = 0
  const startedAt = Date.now()
  timer = window.setInterval(() => {
    progress.value = Math.min(100, Math.round(((Date.now() - startedAt) / 3000) * 100))
    if (progress.value >= 100) { window.clearInterval(timer); timer = null; finishRefresh() }
  }, 30)
}

onMounted(() => {
  document.addEventListener('touchstart', onStart, { passive: true })
  document.addEventListener('touchmove', onMove, { passive: false })
  document.addEventListener('touchend', onEnd, { passive: true })
})
onBeforeUnmount(() => {
  document.removeEventListener('touchstart', onStart)
  document.removeEventListener('touchmove', onMove)
  document.removeEventListener('touchend', onEnd)
  if (timer) window.clearInterval(timer)
})
</script>

<style scoped>
.refresh-indicator { position:fixed; top:0; left:50%; z-index:500; width:138px; padding:8px 13px 10px; border:1px solid rgba(242,202,80,.28); border-radius:0 0 16px 16px; background:var(--bg); box-shadow:0 8px 18px rgba(0,0,0,.2); transition:transform .16s ease; pointer-events:none; }
.refresh-indicator img { display:block; width:74px; height:42px; margin:0 auto 4px; object-fit:contain; }
.refresh-bar { height:3px; overflow:hidden; border-radius:4px; background:rgba(242,202,80,.18); }.refresh-bar span { display:block; height:100%; border-radius:inherit; background:linear-gradient(90deg,var(--primary-container),var(--primary)); transition:width .03s linear; }
.ready .refresh-bar span { background:var(--success); }
</style>
