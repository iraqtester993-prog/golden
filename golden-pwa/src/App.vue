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

const refreshKey = ref(0)
const refreshCurrentPage = () => { refreshKey.value++ }
onMounted(() => window.addEventListener('golden-page-refresh', refreshCurrentPage))
onBeforeUnmount(() => window.removeEventListener('golden-page-refresh', refreshCurrentPage))
const viewKey = () => `${window.location.hash}:${refreshKey.value}`
</script>
