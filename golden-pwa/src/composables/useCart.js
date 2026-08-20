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
  const total = computed(() => cart.value.reduce((sum, item) => sum + Number(String(item.price).replace(/,/g, '')), 0))
  const add = product => {
    if (!cart.value.some(item => item.name === product.name)) {
      cart.value.push(product)
      persist()
    }
  }
  const remove = name => {
    cart.value = cart.value.filter(item => item.name !== name)
    persist()
  }
  const clear = () => { cart.value = []; persist() }
  return { cart, total, add, remove, clear, persist }
}
