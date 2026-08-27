<template>
  <router-view :key="viewKey" />
  <FloatingCart />
  <PullToRefresh />
  <BottomSheetGestures />
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import FloatingCart from './components/FloatingCart.vue'
import PullToRefresh from './components/PullToRefresh.vue'
import BottomSheetGestures from './components/BottomSheetGestures.vue'
import { useLanguage } from './composables/useLanguage'

const refreshKey = ref(0)
const { language } = useLanguage()
const refreshCurrentPage = () => { refreshKey.value++ }
onMounted(() => {
  window.addEventListener('golden-page-refresh', refreshCurrentPage)
  window.addEventListener('golden-language-change', refreshCurrentPage)
})
onBeforeUnmount(() => {
  window.removeEventListener('golden-page-refresh', refreshCurrentPage)
  window.removeEventListener('golden-language-change', refreshCurrentPage)
})
const viewKey = () => `${window.location.hash}:${refreshKey.value}:${language.value}`
</script>
