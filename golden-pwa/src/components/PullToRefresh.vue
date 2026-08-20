<template>
  <template v-if="enabled && (pulling || refreshing)">
    <div class="refresh-backdrop"></div>
    <div class="refresh-indicator" :class="{ ready: pullDistance >= triggerDistance, refreshing }">
      <div class="refresh-ring" :style="{ '--progress': `${displayProgress * 3.6}deg` }">
        <div class="ring-inner"><img :src="logo" alt="العصر الذهبي" /></div>
      </div>
    </div>
  </template>
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
const displayProgress = computed(() => refreshing.value ? progress.value : Math.min(100, Math.round((pullDistance.value / triggerDistance) * 100)))

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
.refresh-backdrop { position:fixed; inset:0; z-index:490; background:rgba(10,15,29,.07); backdrop-filter:blur(4px); -webkit-backdrop-filter:blur(4px); pointer-events:none; animation:fade-in .16s ease-out; }
.refresh-indicator { position:fixed; top:50%; left:50%; z-index:500; width:146px; height:146px; display:grid; place-items:center; border:1px solid rgba(242,202,80,.22); border-radius:50%; background:rgba(20,27,45,.30); box-shadow:0 14px 36px rgba(0,0,0,.14); transform:translate(-50%,-50%); backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px); pointer-events:none; animation:indicator-in .18s ease-out; }
.refresh-ring { width:118px; height:118px; display:grid; place-items:center; border-radius:50%; padding:4px; background:conic-gradient(var(--primary) var(--progress), rgba(242,202,80,.16) 0); transform:rotate(-90deg); transition:background .03s linear; }
.ring-inner { width:100%; height:100%; display:grid; place-items:center; border-radius:50%; background:rgba(10,15,29,.18); transform:rotate(90deg); }.ring-inner img { width:80px; height:62px; object-fit:contain; }
.ready .refresh-ring { background:conic-gradient(var(--success) var(--progress), rgba(52,211,153,.16) 0); }
@keyframes fade-in { from { opacity:0 } to { opacity:1 } } @keyframes indicator-in { from { opacity:0; transform:translate(-50%,-46%) scale(.94) } to { opacity:1; transform:translate(-50%,-50%) scale(1) } }
</style>
