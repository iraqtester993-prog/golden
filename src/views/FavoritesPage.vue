<template>
  <div class="page">
    <TopBar />
    <button class="page-back" @click="$router.back()">
      <span class="material-symbols-outlined">arrow_forward</span> رجوع إلى الرئيسية
    </button>

    <div class="page-content">
      <div v-if="favorites.length === 0" class="empty-state">
        <span class="material-symbols-outlined empty-icon">favorite</span>
        <span class="empty-text">لا توجد منتجات في المفضلة</span>
        <button class="empty-btn" @click="$router.push('/store')">
          <span class="material-symbols-outlined">shopping_bag</span>
          <span>تصفح المتجر</span>
        </button>
      </div>

      <div v-else class="fav-list">
        <div v-for="p in favorites" :key="p.name" class="fav-card">
          <img :src="p.img" class="fav-img" />
          <div class="fav-info">
            <span class="fav-name">{{ p.name }}</span>
            <span class="fav-spec">{{ p.spec }}</span>
            <span class="fav-price">{{ p.price }} د.ع</span>
          </div>
          <button class="fav-remove" @click="removeFav(p)">
            <span class="material-symbols-outlined">favorite</span>
          </button>
        </div>
      </div>
    </div>

    <nav class="bottom-nav">
      <button class="nav-item" v-for="item in navItems" :key="item.label" @click="$router.push(item.route)">
        <div class="nav-icon-wrap">
          <span class="material-symbols-outlined nav-icon">{{ item.icon }}</span>
        </div>
        <span class="nav-label">{{ item.label }}</span>
      </button>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TopBar from '../components/TopBar.vue'

const favorites = ref([])

onMounted(() => {
  favorites.value = JSON.parse(localStorage.getItem('golden_favorites') || '[]')
})

const removeFav = (p) => {
  favorites.value = favorites.value.filter(f => f.name !== p.name)
  localStorage.setItem('golden_favorites', JSON.stringify(favorites.value))
}

const navItems = [
  { icon: 'home', label: 'الرئيسية', route: '/home' },
  { icon: 'shopping_bag', label: 'المتجر', route: '/store' },
  { icon: 'account_balance_wallet', label: 'أقساطي', route: '/settlements' },
  { icon: 'receipt_long', label: 'طلباتي', route: '/orders' },
  { icon: 'person', label: 'حسابي', route: '/account' }
]
</script>

<style scoped>
.page { width: 100%; height: 100dvh; background: var(--bg); display: flex; flex-direction: column; overflow: hidden; }
.page-back { display: flex; align-items: center; gap: 5px; margin: 12px 16px 0; padding: 0; border: 0; background: none; color: var(--primary); font: inherit; font-size: 13px; font-weight: 700; cursor: pointer; flex-shrink: 0; }
.page-back .material-symbols-outlined { font-size: 18px; }
.page-content { flex: 1; overflow-y: auto; padding: 12px 16px 100px; display: flex; flex-direction: column; gap: 12px; }
.page-content > * { flex-shrink: 0; }

.empty-state { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 60px 0; }
.empty-icon { font-size: 64px; color: var(--on-surface-variant); opacity: 0.3; }
.empty-text { font-size: 16px; font-weight: 700; color: var(--on-surface); }
.empty-btn { display: flex; align-items: center; gap: 8px; margin-top: 8px; padding: 12px 24px; border-radius: 14px; background: var(--primary); border: none; color: #0a0f1d; font-size: 14px; font-weight: 700; font-family: inherit; cursor: pointer; }
.empty-btn .material-symbols-outlined { font-size: 20px; }

.fav-list { display: flex; flex-direction: column; gap: 10px; }
.fav-card { display: flex; align-items: center; gap: 12px; background: var(--surface-container); border: 1px solid var(--outline-variant); border-radius: 16px; padding: 12px; }
.fav-img { width: 64px; height: 64px; border-radius: 12px; object-fit: cover; flex-shrink: 0; }
.fav-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.fav-name { font-size: 14px; font-weight: 700; color: var(--on-surface); }
.fav-spec { font-size: 12px; color: var(--on-surface-variant); }
.fav-price { font-size: 14px; font-weight: 700; color: var(--primary); }
.fav-remove { width: 36px; height: 36px; border-radius: 50%; background: rgba(239, 68, 68, 0.1); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; }
.fav-remove .material-symbols-outlined { font-size: 20px; color: #ef5350; font-variation-settings: 'FILL' 1; }

.bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; height: 64px; background: var(--bg); border-top: 1px solid var(--outline-variant); display: flex; justify-content: space-around; align-items: center; padding-bottom: env(safe-area-inset-bottom, 4px); z-index: 50; }
.nav-item { display: flex; flex-direction: column; align-items: center; gap: 2px; background: none; border: none; color: var(--on-surface-variant); cursor: pointer; padding: 4px 8px; }
.nav-icon { font-size: 24px; }
.nav-label { font-size: 10px; font-weight: 500; }
</style>
