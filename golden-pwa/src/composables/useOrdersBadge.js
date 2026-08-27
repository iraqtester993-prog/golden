import { ref } from 'vue'

const ordersCount = ref(0)

export function useOrdersBadge() {
  const storedOrders = JSON.parse(localStorage.getItem('golden_orders') || '[]')
  ordersCount.value = storedOrders.length || 8
  return { ordersCount }
}
