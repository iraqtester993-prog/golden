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

      <!-- Image Slider -->
      <section class="slider-section">
        <div class="slider-container">
          <div class="slider-track" :style="{ transform: `translateX(${currentSlide * 100}%)` }">
            <div class="slide" v-for="(slide, i) in slides" :key="i">
              <img :src="slide.img" class="slide-img" />
              <div class="slide-overlay">
                <span class="slide-title">{{ slide.title }}</span>
                <span class="slide-sub">{{ slide.sub }}</span>
              </div>
            </div>
          </div>
          <div class="slider-dots">
            <span v-for="(_, i) in slides" :key="i" class="dot" :class="{ active: currentSlide === i }" @click="currentSlide = i"></span>
          </div>
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
            <button class="fav-btn" :class="{ 'fav-active': isFav(product) }" @click.stop="toggleFav(product)">
              <span class="material-symbols-outlined">favorite</span>
            </button>
          </div>
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <span class="product-spec">{{ product.spec }}</span>
            <div class="product-price">{{ product.price }} د.ع</div>
            <button class="btn-details" @click="openDetails(product)">عرض التفاصيل</button>
          </div>
        </div>
      </div>
    </main>

    <!-- Product Details Bottom Sheet -->
    <div v-if="selectedProduct" class="overlay" @click.self="selectedProduct = null">
      <div class="bottom-sheet" @click.stop>
        <div class="sheet-handle" @click="selectedProduct = null"><span class="handle-bar"></span></div>

        <div class="sheet-scroll">
          <!-- Image Gallery -->
          <div class="gallery" ref="galleryRef">
            <div class="gallery-track" :style="{ transform: `translateX(${galleryIndex * -100}%)` }">
              <div class="gallery-slide" v-for="(img, i) in selectedProduct.images" :key="i" @click="fullscreenImg = img">
                <img :src="img" class="gallery-img" />
              </div>
            </div>
            <div class="gallery-dots">
              <span v-for="(_, i) in selectedProduct.images" :key="i" class="g-dot" :class="{ active: galleryIndex === i }" @click="galleryIndex = i"></span>
            </div>
          </div>

          <!-- Details -->
          <div class="detail-section">
            <h2 class="detail-name">{{ selectedProduct.name }}</h2>
            <div class="detail-price">{{ selectedProduct.price }} د.ع</div>
            <span class="detail-spec">{{ selectedProduct.spec }}</span>
          </div>

          <div class="detail-section">
            <h3 class="detail-heading">الوصف</h3>
            <p class="detail-desc">{{ selectedProduct.desc }}</p>
          </div>

          <div class="detail-section">
            <h3 class="detail-heading">المواصفات</h3>
            <div class="spec-row" v-for="(val, key) in selectedProduct.specs" :key="key">
              <span class="spec-key">{{ key }}</span>
              <span class="spec-val">{{ val }}</span>
            </div>
          </div>
        </div>

        <!-- Bottom Actions -->
        <div class="sheet-actions">
          <button class="action-cash">شراء نقد</button>
          <button class="action-installment">شراء بالقسط</button>
          <button class="action-calc" @click="selectedProduct && goTo('/calculator?product=' + encodeURIComponent(JSON.stringify({ name: selectedProduct.name })))">حساب الأقساط</button>
        </div>
      </div>
    </div>

    <!-- Fullscreen Image -->
    <div v-if="fullscreenImg" class="fullscreen-overlay" @click="fullscreenImg = null">
      <button class="fs-close"><span class="material-symbols-outlined">close</span></button>
      <img :src="fullscreenImg" class="fs-img" />
    </div>

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
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import TopBar from '../components/TopBar.vue'

const router = useRouter()
const activeCat = ref('هواتف')
const activeTab = ref('popular')
const currentSlide = ref(0)
const selectedProduct = ref(null)
const galleryIndex = ref(0)
const fullscreenImg = ref(null)
const galleryRef = ref(null)

const goTo = (route) => { if (route) router.push(route) }

const favorites = ref(JSON.parse(localStorage.getItem('golden_favorites') || '[]'))
const isFav = (p) => favorites.value.some(f => f.name === p.name)
const toggleFav = (p) => {
  if (isFav(p)) {
    favorites.value = favorites.value.filter(f => f.name !== p.name)
  } else {
    favorites.value.push({ name: p.name, spec: p.spec, price: p.price, img: p.img })
  }
  localStorage.setItem('golden_favorites', JSON.stringify(favorites.value))
}

watch(selectedProduct, () => { galleryIndex.value = 0 })

const categories = [
  { img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=200&h=200&fit=crop', label: 'سيارات' },
  { img: 'https://images.unsplash.com/photo-1631545806609-206480c4ca4d?w=200&h=200&fit=crop', label: 'مكيفات' },
  { img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=200&h=200&fit=crop', label: 'شاحنات' },
  { img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop', label: 'أجهزة منزلية' },
  { img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop', label: 'هواتف' }
]

const slides = [
  { img: 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=800&h=400&fit=crop', title: 'عروض نهاية الأسبوع', sub: 'خصومات تصل إلى 50%' },
  { img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop', title: 'إلكترونيات مميزة', sub: 'أحدث الأجهزة بأسعار منافسة' },
  { img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop', title: 'أثاث منزلي عصري', sub: 'تشكيلة واسعة من الأثاث' }
]

let sliderTimer = null
onMounted(() => {
  sliderTimer = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 3000)
})
onUnmounted(() => { if (sliderTimer) clearInterval(sliderTimer) })

const products = [
  {
    name: 'iPhone 16 Pro Max', spec: '256GB - تيتانيوم', price: '1,850,000',
    img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1695048060896-8af0a9ae61d0?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1695048133422-28a6e0e3d338?w=800&h=800&fit=crop'
    ],
    desc: 'هاتف آيفون 16 برو ماكس بسعة 256 جيجابايت، شاشة Super Retina XDR بحجم 6.9 بوصة، معالج A18 Pro، كاميرا ثلاثية 48 ميجابكسل، مقاوم للماء والغبار.',
    specs: { 'الشاشة': '6.9 بوصة Super Retina XDR', 'المعالج': 'A18 Pro', 'الذاكرة': '256GB', 'الكاميرا': '48MP + 12MP + 12MP', 'البطارية': '4685 mAh', 'نظام التشغيل': 'iOS 18' }
  },
  {
    name: 'Samsung S24 Ultra', spec: '512GB - أسود', price: '1,650,000',
    img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1565849904461-04a58adcb756?w=800&h=800&fit=crop'
    ],
    desc: 'سامسونج جالكسي S24 ألترا بسعة 512 جيجابايت، شاشة Dynamic AMOLED 2X بحجم 6.8 بوصة، معالج Snapdragon 8 Gen 3، قلم S Pen، كاميرا 200 ميجابكسل.',
    specs: { 'الشاشة': '6.8 بوصة Dynamic AMOLED 2X', 'المعالج': 'Snapdragon 8 Gen 3', 'الذاكرة': '512GB', 'الكاميرا': '200MP + 50MP + 12MP + 10MP', 'البطارية': '5000 mAh', 'نظام التشغيل': 'Android 14' }
  },
  {
    name: 'Hisense 55 inch 4K', spec: 'Smart TV - ULED', price: '820,000',
    img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1461151304265-3855d7e1c881?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&h=800&fit=crop'
    ],
    desc: 'تلفزيون هيسينس ذكي 55 بوصة بتقنية ULED 4K، دعم HDR10+، نظام تشغيل سهل الاستخدام، صوت Dolby Atmos، مثالي للمشاهدة السينمائية في المنزل.',
    specs: { 'الشاشة': '55 بوصة 4K ULED', 'الدقة': '3840 × 2160', ' HDR': 'HDR10+', 'الصوت': 'Dolby Atmos 30W', 'المنافذ': '3 × HDMI, 2 × USB', 'النظام': 'VIDAA U6' }
  }
]

const openDetails = (product) => {
  selectedProduct.value = product
  galleryIndex.value = 0
}

const navItems = [
  { icon: 'home', label: 'الرئيسية', route: '/home' },
  { icon: 'shopping_bag', label: 'المتجر', route: null },
  { icon: 'account_balance_wallet', label: 'أقساطي', route: '/settlements' },
  { icon: 'receipt_long', label: 'طلباتي', badge: true, route: '/orders' },
  { icon: 'person', label: 'حسابي', route: '/account' }
]
</script>

<style scoped>
.page { width: 100%; height: 100dvh; background: var(--bg); display: flex; flex-direction: column; overflow: hidden; overscroll-behavior: none; }

.page-content {
  flex: 1; overflow-y: auto; overscroll-behavior-y: contain; padding: 12px 16px 90px;
  display: flex; flex-direction: column; gap: 12px;
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
  display: flex; gap: 12px; overflow-x: auto; padding: 4px 0;
  -ms-overflow-style: none; scrollbar-width: none; flex-shrink: 0;
}

.categories::-webkit-scrollbar { display: none; }

.cat-item {
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  background: none; border: none; cursor: pointer; min-width: 70px;
}

.cat-icon-wrap {
  width: 62px; height: 62px; border-radius: 50%;
  background: var(--surface-container); border: 2px solid var(--outline-variant);
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s; overflow: hidden;
}

.cat-item.active .cat-icon-wrap { border-color: var(--primary); background: rgba(242, 202, 80, 0.1); }

.cat-img { width: 62px; height: 62px; object-fit: cover; border-radius: 50%; }

.cat-label { font-size: 11px; color: var(--on-surface-variant); white-space: nowrap; font-weight: 500; }
.cat-item.active .cat-label { color: var(--primary); font-weight: 700; }

/* Slider */
.slider-section { position: relative; flex-shrink: 0; }

.slider-container {
  width: 100%; border-radius: 16px; overflow: hidden; position: relative;
  height: 160px; border: 1px solid var(--outline-variant);
}

.slider-track { display: flex; width: 100%; height: 100%; transition: transform 0.5s ease; }
.slide { min-width: 100%; height: 100%; position: relative; }
.slide-img { width: 100%; height: 100%; object-fit: cover; }

.slide-overlay {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  padding: 16px; display: flex; flex-direction: column; gap: 2px;
}

.slide-title { font-size: 16px; font-weight: 700; color: #fff; }
.slide-sub { font-size: 12px; color: rgba(255,255,255,0.8); }

.slider-dots { position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); display: flex; gap: 6px; }
.dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.4); cursor: pointer; transition: all 0.3s; }
.dot.active { background: var(--primary); width: 16px; border-radius: 3px; }

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
.fav-btn.fav-active { background: rgba(239, 68, 68, 0.8); }
.fav-btn.fav-active .material-symbols-outlined { font-variation-settings: 'FILL' 1; color: #fff; }

.product-info { flex: 1; display: flex; flex-direction: column; gap: 3px; }
.product-name { font-size: 14px; font-weight: 700; color: var(--on-surface); }
.product-spec { font-size: 11px; color: var(--on-surface-variant); }
.product-price { font-size: 15px; font-weight: 700; color: var(--primary); direction: rtl; }

.btn-details {
  margin-top: auto; background: var(--bg); border: 1px solid var(--outline-variant);
  border-radius: 8px; padding: 6px 0; font-size: 12px; font-weight: 600;
  color: var(--primary); cursor: pointer; font-family: 'Noto Kufi Arabic', sans-serif;
  transition: all 0.2s; width: 100%;
}

.btn-details:active { background: var(--primary); color: #0a0f1d; }

/* Bottom Sheet */
.overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5); z-index: 100;
  display: flex; align-items: flex-end; justify-content: center;
}

.bottom-sheet {
  width: 100%; max-width: 480px; max-height: 90dvh;
  background: var(--bg); border-radius: 20px 20px 0 0;
  display: flex; flex-direction: column; overflow: hidden;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.sheet-handle {
  display: flex; justify-content: center; padding: 10px 0 4px; cursor: pointer;
}

.handle-bar { width: 40px; height: 4px; background: var(--outline-variant); border-radius: 2px; }

.sheet-scroll { flex: 1; min-height: 0; overflow-y: auto; padding-bottom: 16px; }

/* Gallery */
.gallery { position: relative; width: 100%; height: 280px; overflow: hidden; }

.gallery-track { display: flex; width: 100%; height: 100%; transition: transform 0.4s ease; }

.gallery-slide { min-width: 100%; height: 100%; cursor: pointer; }

.gallery-img { width: 100%; height: 100%; object-fit: cover; }

.gallery-dots {
  position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%);
  display: flex; gap: 6px;
}

.g-dot { width: 7px; height: 7px; border-radius: 50%; background: rgba(255,255,255,0.4); cursor: pointer; transition: all 0.3s; }
.g-dot.active { background: var(--primary); width: 18px; border-radius: 4px; }

/* Detail Sections */
.detail-section { padding: 14px 16px; border-bottom: 1px solid var(--outline-variant); }
.detail-name { font-size: 18px; font-weight: 700; color: var(--on-surface); margin-bottom: 4px; }
.detail-price { font-size: 20px; font-weight: 700; color: var(--primary); direction: rtl; margin-bottom: 4px; }
.detail-spec { font-size: 12px; color: var(--on-surface-variant); }

.detail-heading { font-size: 14px; font-weight: 700; color: var(--on-surface); margin-bottom: 8px; }
.detail-desc { font-size: 13px; color: var(--on-surface-variant); line-height: 1.7; }

.spec-row {
  display: flex; justify-content: space-between; padding: 8px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.spec-key { font-size: 12px; color: var(--on-surface-variant); }
.spec-val { font-size: 12px; font-weight: 600; color: var(--on-surface); }

/* Sheet Actions */
.sheet-actions {
  display: flex; gap: 8px; padding: 12px 16px;
  background: var(--bg); border-top: 1px solid var(--outline-variant);
  padding-bottom: calc(12px + env(safe-area-inset-bottom, 4px));
  flex-shrink: 0;
}

.sheet-actions button {
  flex: 1; border: none; border-radius: 10px; padding: 10px 0;
  font-size: 12px; font-weight: 700; cursor: pointer;
  font-family: 'Noto Kufi Arabic', sans-serif; transition: all 0.2s;
}

.action-cash { background: var(--primary-container); color: #0a0f1d; }
.action-installment { background: var(--primary); color: #0a0f1d; }
.action-calc { background: var(--surface-container); color: var(--on-surface); border: 1px solid var(--outline-variant) !important; }

/* Fullscreen Image */
.fullscreen-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.95); z-index: 200;
  display: flex; align-items: center; justify-content: center;
}

.fs-close {
  position: absolute; top: 16px; left: 16px;
  background: rgba(255,255,255,0.2); border: none; border-radius: 50%;
  width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
  cursor: pointer; z-index: 201;
}

.fs-close .material-symbols-outlined { font-size: 24px; color: #fff; }

.fs-img { max-width: 95%; max-height: 90dvh; object-fit: contain; border-radius: 8px; }

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
