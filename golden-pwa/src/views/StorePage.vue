<template>
  <div class="page">
    <TopBar />

    <main class="page-content">
      <!-- Search -->
      <div class="search-bar">
        <button class="filter-btn">
          <span class="material-symbols-outlined">tune</span>
        </button>
        <input type="text" placeholder="ابحث عن منتج..." class="search-input" />
        <span class="material-symbols-outlined search-icon">search</span>
      </div>

      <!-- Categories -->
      <section class="categories">
        <button class="cat-item" v-for="cat in categories" :key="cat.label" :class="{ active: activeCat === cat.label }" @click="activeCat = cat.label">
          <div class="cat-icon-wrap">
            <img :src="cat.img" class="cat-img" />
          </div>
          <span class="cat-label">{{ cat.label }}</span>
        </button>
      </section>

      <!-- Promo Banner -->
      <section class="promo-banner">
        <div class="promo-content">
          <span class="promo-title">خصومات تصل إلى</span>
          <span class="promo-percent">30%</span>
          <button class="promo-btn">تسوق الآن</button>
        </div>
      </section>

      <!-- Tabs -->
      <div class="tabs">
        <button class="tab" :class="{ active: activeTab === 'popular' }" @click="activeTab = 'popular'">الأكثر مبيعاً</button>
        <button class="tab" :class="{ active: activeTab === 'new' }" @click="activeTab = 'new'">الجديد</button>
        <button class="tab" :class="{ active: activeTab === 'offers' }" @click="activeTab = 'offers'">العروض</button>
      </div>

      <!-- Products -->
      <div class="products-list">
        <div class="product-card" v-for="product in products" :key="product.name">
          <div class="product-img-wrap">
            <img :src="product.img" class="product-img" />
            <button class="fav-btn">
              <span class="material-symbols-outlined">favorite</span>
            </button>
          </div>
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <span class="product-spec">{{ product.spec }}</span>
            <div class="product-price">{{ product.price }} د.ع</div>
            <div class="product-rating">
              <span class="stars">★ {{ product.rating }}</span>
              <span class="review-count">({{ product.reviews }})</span>
            </div>
            <div class="product-actions">
              <button class="btn-calc">احسب القسط</button>
              <button class="btn-buy">شراء فوراً</button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <nav class="bottom-nav">
      <button class="nav-item" v-for="(item, i) in navItems" :key="item.label" :class="{ active: i === 1 }" @click="goTo(item.route)">
        <div class="nav-icon-wrap">
          <span class="material-symbols-outlined nav-icon" :class="{ filled: i === 1 }">{{ item.icon }}</span>
          <span v-if="item.badge" class="nav-badge"></span>
          <span v-if="i === 1" class="nav-dot"></span>
        </div>
        <span class="nav-label">{{ item.label }}</span>
      </button>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopBar from '../components/TopBar.vue'

const router = useRouter()
const activeCat = ref('هواتف')
const activeTab = ref('popular')

const goTo = (route) => { if (route) router.push(route) }

const categories = [
  { img: 'https://img.icons8.com/3d-fluency/94/car.png', label: 'سيارات' },
  { img: 'https://img.icons8.com/3d-fluency/94/air-conditioner.png', label: 'مكيفات' },
  { img: 'https://img.icons8.com/3d-fluency/94/truck.png', label: 'شاحنات' },
  { img: 'https://img.icons8.com/3d-fluency/94/washing-machine.png', label: 'أجهزة منزلية' },
  { img: 'https://img.icons8.com/3d-fluency/94/iphone-x.png', label: 'هواتف' }
]

const products = [
  { name: 'iPhone 16 Pro Max', spec: '256GB', price: '1,850,000', rating: '4.9', reviews: '128', img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop' },
  { name: 'Samsung S24 Ultra', spec: '512GB', price: '1,650,000', rating: '4.8', reviews: '96', img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop' },
  { name: 'Hisense 55 inch 4K', spec: 'Smart TV', price: '820,000', rating: '4.6', reviews: '75', img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop' }
]

const navItems = [
  { icon: 'home', label: 'الرئيسية', route: '/home' },
  { icon: 'shopping_bag', label: 'المتجر', route: null },
  { icon: 'account_balance_wallet', label: 'تسوياتي', route: '/settlements' },
  { icon: 'notifications', label: 'الإشعارات', badge: true, route: null },
  { icon: 'person', label: 'حسابي', route: '/account' }
]
</script>

<style scoped>
.page { width: 100%; height: 100dvh; background: var(--bg); display: flex; flex-direction: column; overflow: hidden; }

.page-content {
  flex: 1; overflow-y: auto; padding: 0 16px 90px;
  display: flex; flex-direction: column; gap: 14px;
}

/* Search */
.search-bar {
  display: flex; align-items: center; gap: 8px;
  background: var(--surface-container); border: 1px solid var(--outline-variant);
  border-radius: 14px; padding: 0 12px; height: 48px;
}

.search-icon { font-size: 20px; color: var(--on-surface-variant); }

.search-input {
  flex: 1; background: transparent; border: none; outline: none;
  color: var(--on-surface); font-size: 13px; font-family: 'Noto Kufi Arabic', sans-serif; direction: rtl;
}

.search-input::placeholder { color: var(--on-surface-variant); }

.filter-btn {
  background: var(--surface-variant); border: none; border-radius: 10px;
  padding: 6px; cursor: pointer; display: flex;
}

.filter-btn .material-symbols-outlined { font-size: 20px; color: var(--on-surface-variant); }

/* Categories */
.categories {
  display: flex; gap: 14px; overflow-x: auto; padding: 4px 0;
  -ms-overflow-style: none; scrollbar-width: none;
}

.categories::-webkit-scrollbar { display: none; }

.cat-item {
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  background: none; border: none; cursor: pointer; min-width: 70px;
}

.cat-icon-wrap {
  width: 64px; height: 64px; border-radius: 16px;
  background: var(--surface-container); border: 1px solid var(--outline-variant);
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s; overflow: hidden;
}

.cat-item.active .cat-icon-wrap { border-color: var(--primary); background: rgba(242, 202, 80, 0.1); }

.cat-img { width: 44px; height: 44px; object-fit: contain; }

.cat-label { font-size: 11px; color: var(--on-surface-variant); white-space: nowrap; font-weight: 500; }
.cat-item.active .cat-label { color: var(--primary); font-weight: 700; }

/* Promo Banner */
.promo-banner {
  background: linear-gradient(135deg, #1a1207, #2a1f0f);
  border: 1px solid var(--outline-variant); border-radius: 16px;
  padding: 20px; position: relative; overflow: hidden; min-height: 100px;
  display: flex; align-items: center;
}

.promo-content { display: flex; flex-direction: column; gap: 6px; z-index: 1; }
.promo-title { font-size: 14px; color: var(--on-surface-variant); }
.promo-percent { font-size: 36px; font-weight: 700; color: var(--primary); line-height: 1; }

.promo-btn {
  background: var(--primary); color: #0a0f1d; border: none; border-radius: 10px;
  padding: 8px 20px; font-size: 13px; font-weight: 700;
  font-family: 'Noto Kufi Arabic', sans-serif; cursor: pointer; width: fit-content; margin-top: 4px;
}

/* Tabs */
.tabs { display: flex; border-bottom: 1px solid var(--outline-variant); }

.tab {
  flex: 1; background: none; border: none; border-bottom: 2px solid transparent;
  padding: 10px 0; font-size: 13px; font-weight: 600;
  color: var(--on-surface-variant); cursor: pointer;
  font-family: 'Noto Kufi Arabic', sans-serif; transition: all 0.2s;
}

.tab.active { color: var(--primary); border-bottom-color: var(--primary); }

/* Products */
.products-list { display: flex; flex-direction: column; gap: 12px; }

.product-card {
  display: flex; gap: 12px; background: var(--surface-container);
  border: 1px solid var(--outline-variant); border-radius: 14px; padding: 12px;
  overflow: hidden;
}

.product-img-wrap {
  position: relative; width: 100px; min-width: 100px; height: 100px;
  border-radius: 10px; overflow: hidden; background: var(--bg);
}

.product-img { width: 100%; height: 100%; object-fit: cover; }

.fav-btn {
  position: absolute; top: 4px; left: 4px;
  background: rgba(0,0,0,0.4); border: none; border-radius: 50%;
  width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
  cursor: pointer;
}

.fav-btn .material-symbols-outlined { font-size: 16px; color: #fff; }

.product-info { flex: 1; display: flex; flex-direction: column; gap: 3px; }
.product-name { font-size: 14px; font-weight: 700; color: var(--on-surface); }
.product-spec { font-size: 11px; color: var(--on-surface-variant); }
.product-price { font-size: 15px; font-weight: 700; color: var(--primary); direction: rtl; }

.product-rating { display: flex; align-items: center; gap: 4px; }
.stars { font-size: 12px; color: var(--primary); }
.review-count { font-size: 11px; color: var(--on-surface-variant); }

.product-actions { display: flex; gap: 8px; margin-top: 4px; }

.btn-calc {
  flex: 1; background: var(--bg); border: 1px solid var(--outline-variant);
  border-radius: 8px; padding: 6px 0; font-size: 11px; font-weight: 600;
  color: var(--on-surface); cursor: pointer; font-family: 'Noto Kufi Arabic', sans-serif;
}

.btn-buy {
  flex: 1; background: var(--primary-container); border: none;
  border-radius: 8px; padding: 6px 0; font-size: 11px; font-weight: 700;
  color: #0a0f1d; cursor: pointer; font-family: 'Noto Kufi Arabic', sans-serif;
}

/* Bottom Nav */
.bottom-nav {
  position: fixed; bottom: 0; left: 0; right: 0; height: 64px;
  background: var(--bg); border-top: 1px solid var(--outline-variant);
  display: flex; justify-content: space-around; align-items: center;
  padding-bottom: env(safe-area-inset-bottom, 4px); z-index: 50;
}

.nav-item {
  display: flex; flex-direction: column; align-items: center; gap: 2px;
  background: none; border: none; color: var(--on-surface-variant);
  cursor: pointer; padding: 4px 8px;
}

.nav-item.active { color: var(--primary); }
.nav-icon-wrap { position: relative; display: flex; align-items: center; justify-content: center; }
.nav-icon { font-size: 24px; }
.nav-icon.filled { font-variation-settings: 'FILL' 1; }
.nav-dot { position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%); width: 5px; height: 5px; background: var(--primary); border-radius: 50%; }
.nav-badge { position: absolute; top: -2px; right: -4px; width: 8px; height: 8px; background: var(--error); border-radius: 50%; }
.nav-label { font-size: 10px; font-weight: 500; }
</style>
