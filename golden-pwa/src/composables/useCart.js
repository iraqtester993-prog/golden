import { computed, ref } from 'vue'

const storageKey = 'golden_cart'
const readCart = () => {
  try { return JSON.parse(localStorage.getItem(storageKey) || '[]') } catch { return [] }
}

const cart = ref(readCart())
const persist = () => {
  localStorage.setItem(storageKey, JSON.stringify(cart.value))
  window.dispatchEvent(new Event('golden-cart-updated'))
}

export const useCart = () => {
  const total = computed(() => cart.value.reduce((sum, item) => sum + Number(String(item.price).replace(/,/g, '')) * (item.quantity || 1), 0))
  const add = product => {
    const found = cart.value.find(item => item.name === product.name)
    if (found) found.quantity = (found.quantity || 1) + 1
    else cart.value.push({ ...product, quantity: 1 })
    persist()
  }
  const decrease = name => {
    const found = cart.value.find(item => item.name === name)
    if (!found) return
    if ((found.quantity || 1) > 1) found.quantity -= 1
    else cart.value = cart.value.filter(item => item.name !== name)
    persist()
  }
  const remove = name => {
    cart.value = cart.value.filter(item => item.name !== name)
    persist()
  }
  const clear = () => { cart.value = []; persist() }
  return { cart, total, add, decrease, remove, clear, persist }
}
