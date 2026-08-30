<template>
  <div class="page">
    <TopBar />

    <main class="page-content">
      <div v-if="route.query.branch" class="branch-store-banner"><span class="material-symbols-outlined">storefront</span><div><small>تتسوق من</small><strong>{{ route.query.branch }}</strong></div><button @click="router.push('/store')"><span class="material-symbols-outlined">close</span></button></div>

      <!-- Categories -->
      <section v-if="activeCat === 'الكل'" class="categories">
        <button class="cat-item" v-for="cat in availableCategories" :key="cat.label" :class="{ active: activeCat === cat.label }" @click="selectMainCategory(cat.label)">
          <div class="cat-icon-wrap">
            <img :src="cat.img" class="cat-img" />
          </div>
          <span class="cat-label">{{ cat.label }}</span>
        </button>
      </section>
      <section v-else class="categories subcategory-grid"><button class="cat-item main-categories-btn" @click="selectMainCategory('الكل')"><div class="cat-icon-wrap"><span class="material-symbols-outlined">apps</span></div><span class="cat-label">الأقسام الرئيسية</span></button><button v-for="sub in availableSubcategories" :key="sub.label" class="cat-item" :class="{active:activeSub===sub.label}" @click="selectSubCategory(sub.label)"><div class="cat-icon-wrap"><img :src="sub.img" class="cat-img"/></div><span class="cat-label">{{ sub.label }}</span></button></section>

      <section class="brands-store" aria-label="الماركات التجارية">
        <button class="cat-item" :class="{ active: activeBrand === 'الكل' }" @click="activeBrand = 'الكل'"><div class="cat-icon-wrap"><span class="material-symbols-outlined">apps</span></div><span class="cat-label">كل الماركات</span></button>
        <button class="cat-item" v-for="brand in availableBrands" :key="brand.name" :class="{ active: activeBrand === brand.name }" @click="activeBrand = brand.name"><div class="cat-icon-wrap"><img :src="brand.img" class="cat-img" /></div><span class="cat-label">{{ brand.name }}</span></button>
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

      <!-- Product sections -->
      <section v-for="section in productSections" v-show="!showAllTab || showAllTab === section.key" :key="section.key" class="product-section">
        <div class="section-title-row"><h2>{{ section.label }}</h2><button @click="openSection(section.key)">{{ showAllTab === section.key ? 'رجوع للمتجر' : 'عرض الكل' }}</button></div>
        <div class="products-list product-carousel" :class="{ 'show-all-products': showAllTab === section.key }">
        <div class="product-card" v-for="product in sectionProducts(section.key)" :key="product.name" role="button" tabindex="0" @click="openDetails(product)" @keydown.enter="openDetails(product)">
          <div class="product-img-wrap">
            <img :src="product.img" class="product-img" />
          </div>
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <div class="product-price"><small>السعر النقدي</small>{{ product.price }} د.ع</div>
            <div class="installment-strip"><span class="material-symbols-outlined">account_balance_wallet</span>يدعم التقسيط</div>
            <div class="product-cart-control" @click.stop><button class="add-product" aria-label="إضافة إلى السلة" @click="addToCart(product)"><span class="material-symbols-outlined">add_shopping_cart</span>إضافة للسلة</button></div>
          </div>
        </div>
        </div>
      </section>
    </main>

    <!-- Product Details Bottom Sheet -->
    <div v-if="selectedProduct" class="overlay" @click.self="selectedProduct = null">
      <div class="bottom-sheet" @click.stop>
        <div class="sheet-handle"><span class="handle-bar"></span><button class="sheet-close" aria-label="إغلاق" @click="selectedProduct = null"><span class="material-symbols-outlined">close</span></button></div>

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
            <div v-if="route.query.branch" class="product-branch-name"><span class="material-symbols-outlined">location_on</span> متوفر في {{ route.query.branch }}</div>
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
        <div class="sheet-actions"><button class="action-calc" @click="selectedProduct && goTo('/calculator?product=' + encodeURIComponent(JSON.stringify({ name: selectedProduct.name })))">حساب الأقساط</button></div>
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
<style scoped>.subcategory-grid{min-height:92px}.main-categories-btn .cat-icon-wrap{background:rgba(196,154,59,.12);border-color:var(--primary)}.main-categories-btn .material-symbols-outlined{font-size:27px;color:var(--primary)}</style>
<style scoped>
.categories{position:relative;z-index:3;min-height:92px;padding:6px 0 8px;isolation:isolate}.cat-item{min-height:80px;justify-content:flex-start;flex-shrink:0}.cat-icon-wrap{position:relative;z-index:2;flex:none}.slider-section{position:relative;z-index:1;clear:both}
</style>

<script setup>
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import TopBar from '../components/TopBar.vue'
import { useCart } from '../composables/useCart'

const router = useRouter()
const route = useRoute()
const activeCat = ref('الكل')
const activeSub = ref('الكل')
const activeBrand = ref('الكل')
const activeTab = ref('popular')
const showAllTab = ref(null)
const currentSlide = ref(0)
const selectedProduct = ref(null)
const galleryIndex = ref(0)
const fullscreenImg = ref(null)
const galleryRef = ref(null)
const { cart, add: addToCart, decrease, clear: clearCart } = useCart()

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
watch(() => route.query.tab, tab => { if (tab) activeTab.value = tab }, { immediate: true })
watch(() => route.query.section, section => { showAllTab.value = section || null }, { immediate: true })
const openSection = section => router.push('/store-section/' + section)

const categories = [
  { img: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=200&h=200&fit=crop', label: 'الكل', subcategories: [] },
  { img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop', label: 'إلكترونيات', subcategories: [{label:'الكل',img:'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=200&h=200&fit=crop'},{label:'هواتف',img:'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop'},{label:'تلفزيونات',img:'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop'}] },
  { img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=200&h=200&fit=crop', label: 'مركبات', subcategories: [{label:'الكل',img:'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=200&h=200&fit=crop'},{label:'سيارات',img:'https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=200&h=200&fit=crop'},{label:'شاحنات',img:'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=200&h=200&fit=crop'}] },
  { img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop', label: 'المنزل', subcategories: [{label:'الكل',img:'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=200&h=200&fit=crop'},{label:'مكيفات',img:'https://images.unsplash.com/photo-1631545806609-206480c4ca4d?w=200&h=200&fit=crop'},{label:'أجهزة منزلية',img:'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=200&h=200&fit=crop'}] }
]
const brands = [
  { name: 'Apple', img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=200&fit=crop' },
  { name: 'Samsung', img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=200&h=200&fit=crop' },
  { name: 'Hisense', img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop' },
  { name: 'Toyota', img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=200&h=200&fit=crop' },
  { name: 'Gree', img: 'https://images.unsplash.com/photo-1631545806609-206480c4ca4d?w=200&h=200&fit=crop' }
]
const activeCategory = computed(() => categories.find(category => category.label === activeCat.value) || categories[0])
const selectMainCategory = label => { activeCat.value = label; activeSub.value = 'الكل' }
const selectSubCategory = label => { activeSub.value = label }

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
    brand: 'Apple', mainCat: 'إلكترونيات', subCat: 'هواتف', offer: true, specs: { 'الشاشة': '6.9 بوصة Super Retina XDR', 'المعالج': 'A18 Pro', 'الذاكرة': '256GB', 'الكاميرا': '48MP + 12MP + 12MP', 'البطارية': '4685 mAh', 'نظام التشغيل': 'iOS 18' }
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
    brand: 'Samsung', mainCat: 'إلكترونيات', subCat: 'هواتف', offer: true, specs: { 'الشاشة': '6.8 بوصة Dynamic AMOLED 2X', 'المعالج': 'Snapdragon 8 Gen 3', 'الذاكرة': '512GB', 'الكاميرا': '200MP + 50MP + 12MP + 10MP', 'البطارية': '5000 mAh', 'نظام التشغيل': 'Android 14' }
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
    brand: 'Hisense', mainCat: 'إلكترونيات', subCat: 'تلفزيونات', specs: { 'الشاشة': '55 بوصة 4K ULED', 'الدقة': '3840 × 2160', ' HDR': 'HDR10+', 'الصوت': 'Dolby Atmos 30W', 'المنافذ': '3 × HDMI, 2 × USB', 'النظام': 'VIDAA U6' }
  },
  { name:'Toyota Camry 2024',spec:'GLE - أبيض',price:'38,000,000',img:'https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=400&h=300&fit=crop',images:['https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=800&h=800&fit=crop'],desc:'سيارة تويوتا كامري موديل 2024 بمواصفات عملية ومريحة.',brand:'Toyota',mainCat:'مركبات',subCat:'سيارات',offer:true,specs:{'الموديل':'2024','المحرك':'2.5L','اللون':'أبيض'} },
  { name:'شاحنة JAC خفيفة',spec:'حمولة 3 طن',price:'45,000,000',img:'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop',images:['https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=800&fit=crop'],desc:'شاحنة خفيفة مناسبة للنقل والأعمال التجارية.',brand:'JAC',mainCat:'مركبات',subCat:'شاحنات',specs:{'الحمولة':'3 طن','الوقود':'ديزل','ناقل الحركة':'يدوي'} },
  { name:'مكيف Gree سبليت',spec:'18000 وحدة',price:'1,250,000',img:'https://images.unsplash.com/photo-1631545806609-206480c4ca4d?w=400&h=300&fit=crop',images:['https://images.unsplash.com/photo-1631545806609-206480c4ca4d?w=800&h=800&fit=crop'],desc:'مكيف سبليت اقتصادي بتبريد قوي وهادئ.',brand:'Gree',mainCat:'المنزل',subCat:'مكيفات',specs:{'السعة':'18000 BTU','الطاقة':'موفر','الضمان':'سنة'} },
  { name:'غسالة Samsung أوتوماتيك',spec:'9 كغم',price:'980,000',img:'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&h=300&fit=crop',images:['https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&h=800&fit=crop'],desc:'غسالة أوتوماتيك بسعة 9 كغم للاستخدام العائلي.',brand:'Samsung',mainCat:'المنزل',subCat:'أجهزة منزلية',specs:{'السعة':'9 كغم','النوع':'أوتوماتيك','اللون':'فضي'} }
]

const branchProducts = { 'الفرع الرئيسي - بغداد': ['iPhone 16 Pro Max', 'Samsung S24 Ultra', 'Hisense 55 inch 4K', 'Toyota Camry 2024'], 'فرع الأعظمية': ['Samsung S24 Ultra', 'شاحنة JAC خفيفة', 'مكيف Gree سبليت'], 'فرع البصرة': ['Hisense 55 inch 4K', 'مكيف Gree سبليت', 'غسالة Samsung أوتوماتيك'], 'فرع كربلاء': ['iPhone 16 Pro Max', 'Toyota Camry 2024', 'غسالة Samsung أوتوماتيك'], 'فرع النجف': ['Samsung S24 Ultra', 'Hisense 55 inch 4K', 'شاحنة JAC خفيفة'], 'وكالة الأمل للسيارات': ['Toyota Camry 2024', 'شاحنة JAC خفيفة'], 'وكالة النور للإلكترونيات': ['iPhone 16 Pro Max', 'Samsung S24 Ultra', 'Hisense 55 inch 4K', 'غسالة Samsung أوتوماتيك'] }
const branchAvailableProducts = computed(() => route.query.branch ? products.filter(product => branchProducts[route.query.branch]?.includes(product.name)) : products)
const availableCategories = computed(() => categories.filter(category => category.label === 'الكل' || branchAvailableProducts.value.some(product => product.mainCat === category.label)))
const availableSubcategories = computed(() => activeCategory.value.subcategories.filter(subcategory => subcategory.label === 'الكل' || branchAvailableProducts.value.some(product => product.mainCat === activeCat.value && product.subCat === subcategory.label)))
const availableBrands = computed(() => brands.filter(brand => branchAvailableProducts.value.some(product => product.brand === brand.name)))
const baseProducts = computed(() => products.filter(p => (!route.query.brand || p.brand === route.query.brand) && (activeBrand.value === 'الكل' || p.brand === activeBrand.value) && (!route.query.branch || branchProducts[route.query.branch]?.includes(p.name)) && (activeCat.value === 'الكل' || p.mainCat === activeCat.value) && (activeSub.value === 'الكل' || p.subCat === activeSub.value)))
const displayedProducts = computed(() => baseProducts.value.filter(product => activeTab.value !== 'offers' || product.offer))
const productSections = [{ key:'popular', label:'الأكثر مبيعاً' }, { key:'new', label:'الجديد' }, { key:'offers', label:'العروض' }]
const sectionProducts = key => {
  let list = baseProducts.value
  if (key === 'offers') list = list.filter(product => product.offer)
  if (key === 'new') list = list.slice(-4)
  return showAllTab.value === key ? list : list.slice(0, 4)
}
const cartQty = product => cart.value.find(item => item.name === product.name)?.quantity || 0
const cashPurchase = source => {
  const selected = Array.isArray(source) ? source : [source]
  if (!selected.length) return
  const orders = JSON.parse(localStorage.getItem('golden_orders') || '[]')
  const total = selected.reduce((sum, p) => sum + Number(String(p.price).replace(/,/g, '')), 0)
  orders.push({ id: orders.length ? Math.max(...orders.map(o => o.id)) + 1 : 1001, date: new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' }), status: 'pending', type: 'cash', products: selected, totalPrice: total, totalAmount: total, monthlyInstallment: total, fullName: '', phone: '', address: '', ownerNote: '' })
  localStorage.setItem('golden_orders', JSON.stringify(orders)); clearCart(); router.push('/orders')
}
const buyInstallment = source => { const selected = Array.isArray(source) ? source : [source]; if (selected.length) router.push('/calculator?products=' + encodeURIComponent(JSON.stringify(selected.map(p => ({ name: p.name }))))); }

const openDetails = (product) => {
  router.push('/product?name=' + encodeURIComponent(product.name))
}

const navItems = [
  { icon: 'home', label: 'الرئيسية', route: '/home' },
  { icon: 'shopping_bag', label: 'المتجر', route: null },
  { icon: 'account_balance_wallet', label: 'أقساطي', route: '/settlements' },
  { icon: 'receipt_long', label: 'طلباتي', badge: true, route: '/orders' },
  { icon: 'person', label: 'حسابي', route: '/account' }
]
</script>
<style scoped>.subcategories{display:flex;align-items:center;gap:8px;overflow-x:auto;padding:2px 1px;scrollbar-width:none}.subcategories::-webkit-scrollbar{display:none}.subcategories button{flex:none;min-width:74px;height:40px;padding:0 13px;border:1px solid var(--outline-variant);border-radius:999px;background:var(--surface-container);color:var(--on-surface-variant);font:inherit;font-size:10px;cursor:pointer}.section-branch{flex-wrap:nowrap}.subcategories button.active{border-color:var(--primary);background:rgba(196,154,59,.16);color:var(--primary);font-weight:700}.main-back{display:flex!important;align-items:center;justify-content:center;gap:3px;min-width:126px!important;border-color:var(--primary)!important;color:var(--primary)!important}.main-back .material-symbols-outlined{font-size:15px}.installment-strip{display:flex;align-items:center;justify-content:center;gap:5px;margin-top:9px;padding:7px;border-radius:9px;background:rgba(196,154,59,.11);color:var(--primary);font-size:10px;font-weight:700}.installment-strip .material-symbols-outlined{font-size:15px}</style>

<style scoped>
.page { width: 100%; max-width:100%; height: 100dvh; background: var(--bg); display: flex; flex-direction: column; overflow: hidden; overscroll-behavior: none; }
.branch-store-banner{display:flex;align-items:center;gap:9px;padding:10px 12px;border:1px solid rgba(196,154,59,.35);border-radius:13px;background:rgba(196,154,59,.1);color:var(--primary)}.branch-store-banner>span{font-size:22px}.branch-store-banner div{display:flex;flex:1;flex-direction:column;gap:1px}.branch-store-banner small{font-size:9px;color:var(--on-surface-variant)}.branch-store-banner strong{font-size:12px}.branch-store-banner button{width:30px;height:30px;border:0;border-radius:9px;background:var(--surface-container);color:var(--on-surface-variant);cursor:pointer}.branch-store-banner button .material-symbols-outlined{font-size:18px}

.page-content {
  flex: 1; min-width:0; max-width:100%; overflow-y: auto; overflow-x:hidden; overscroll-behavior-y: contain; padding: 12px 16px 90px;
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
.categories { display:flex; justify-content:space-between; gap:4px; overflow-x:hidden; padding:4px 0; flex-shrink:0; }

.categories::-webkit-scrollbar { display: none; }

.cat-item { flex:1; min-width:0; display:flex; flex-direction:column; align-items:center; gap:6px; background:none; border:none; cursor:pointer; }

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

/* The store starts with discovery: slider, departments, then brands. */
.slider-section { order:-3; }
.categories { order:-2; }
.brands-store { order:-1; display:flex; justify-content:space-between; gap:4px; overflow-x:auto; padding:4px 0; flex-shrink:0; scrollbar-width:none; }
.brands-store::-webkit-scrollbar { display:none; }
.brands-store .cat-item { flex:0 0 70px; }
.brands-store .cat-icon-wrap, .brands-store .cat-img { width:56px; height:56px; }
.product-card { cursor:pointer; transition:border-color .2s,transform .2s; }
.product-card:active { transform:scale(.99); border-color:var(--primary); }
.product-cart-control { display:flex; align-items:center; justify-content:center; gap:6px; margin-top:8px; }
.product-cart-control > button { min-height:29px; display:flex; align-items:center; justify-content:center; border:1px solid rgba(196,154,59,.3); border-radius:9px; background:rgba(196,154,59,.12); color:var(--primary); font:700 10px inherit; cursor:pointer; }
.product-cart-control > button:first-child { width:30px; font-size:18px; }
.product-cart-control > b { min-width:18px; color:var(--on-surface); text-align:center; font-size:12px; }
.add-product { flex:0 0 auto; min-width:128px; gap:4px; padding:0 12px; white-space:nowrap; }
.add-product .material-symbols-outlined { font-size:16px; }

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
.product-section { display:flex; flex-direction:column; gap:8px; }.section-title-row{display:flex;align-items:center;justify-content:space-between}.section-title-row h2{margin:0;color:var(--on-surface);font-size:16px}.section-title-row button{border:0;background:transparent;color:var(--primary);font:700 11px inherit;cursor:pointer}div.products-list.product-carousel{flex-direction:row;overflow-x:auto;scroll-snap-type:x mandatory;padding:1px 1px 8px;scrollbar-width:none}.product-carousel::-webkit-scrollbar{display:none}.product-carousel .product-card{flex:0 0 176px;flex-direction:column;gap:8px;scroll-snap-align:start}.product-carousel .product-img-wrap{width:100%;min-width:0;height:118px}.product-carousel .product-info{width:100%}.product-carousel .product-name{font-size:12px}.product-carousel .product-spec{font-size:10px}.product-carousel .product-price{font-size:12px}.product-carousel .installment-strip{margin-top:6px;padding:6px;font-size:9px}.product-carousel .product-cart-control{margin-top:6px}.product-carousel.show-all-products{flex-wrap:wrap;overflow:visible}.product-carousel.show-all-products .product-card{flex:0 0 176px}
.products-list { display: flex; flex-direction: column; gap: 12px; }

.product-card {
  display: flex; gap: 12px; background: linear-gradient(145deg,var(--surface-container-high),var(--surface-container));
  border: 1px solid rgba(196,154,59,.28); border-radius: 18px; padding: 10px;
  overflow: hidden; box-shadow:0 8px 18px rgba(0,0,0,.12);
}

.product-img-wrap {
  position: relative; width: 100px; min-width: 100px; height: 100px;
  border-radius: 14px; overflow: hidden; background: var(--bg);
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

.product-info { flex: 1; min-width:0; display: flex; flex-direction: column; gap: 3px; }
.product-name { font-size: 14px; font-weight: 800; color: var(--on-surface); line-height:1.45; }
.product-spec { font-size: 11px; color: var(--on-surface-variant); }
.product-price { font-size: 15px; font-weight: 700; color: var(--primary); direction: rtl; }.product-price small{display:block;margin-bottom:1px;color:var(--on-surface-variant);font-size:9px;font-weight:600;}

.btn-details {
  margin-top: auto; background: var(--bg); border: 1px solid var(--outline-variant);
  border-radius: 8px; padding: 6px 0; font-size: 12px; font-weight: 600;
  color: var(--primary); cursor: pointer; font-family: 'Noto Kufi Arabic', sans-serif;
  transition: all 0.2s; width: 100%;
}

.btn-details:active { background: var(--primary); color: #0a0f1d; }
.btn-cart { margin-top: 6px; border: 0; background: transparent; color: var(--primary); font: inherit; font-size: 11px; font-weight: 700; cursor: pointer; }

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
.sheet-close { position:absolute; left:12px; top:7px; border:0; background:transparent; color:var(--on-surface-variant); cursor:pointer; padding:5px; }
.sheet-close .material-symbols-outlined { font-size:21px; }

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
.product-branch-name{display:flex;align-items:center;gap:4px;margin-top:9px;color:var(--primary);font-size:11px;font-weight:700}.product-branch-name .material-symbols-outlined{font-size:16px}

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
