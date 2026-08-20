<template>
  <router-view />
  <FloatingCart />
  <PullToRefresh />
</template>

<script setup>
import FloatingCart from './components/FloatingCart.vue'
import PullToRefresh from './components/PullToRefresh.vue'
</script>
