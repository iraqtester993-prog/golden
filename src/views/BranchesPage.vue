<template>
  <div class="directory-screen">
    <TopBar />
    <button class="page-back" @click="router.back()">
      <span class="material-symbols-outlined">arrow_forward</span> رجوع
    </button>

    <main v-if="!isDetail" class="directory-content">
      <div class="page-intro">
        <span class="material-symbols-outlined intro-icon">location_on</span>
        <div>
          <h2>فروع العصر الذهبي</h2>
          <p>اختر الفرع للاطلاع على التفاصيل ووسائل التواصل.</p>
        </div>
      </div>

      <button v-for="item in branches" :key="item.id" class="directory-card" @click="openDetail(item.id)">
        <img :src="item.img" :alt="item.name" class="card-image" />
        <div class="card-body">
          <h3>{{ item.name }}</h3>
          <p><span class="material-symbols-outlined">location_on</span>{{ item.address }}</p>
          <span class="details-link">عرض التفاصيل <span class="material-symbols-outlined">arrow_back</span></span>
        </div>
      </button>
    </main>

    <main v-else class="detail-content">
      <button class="list-back" @click="router.push('/branches')">
        <span class="material-symbols-outlined">arrow_forward</span> العودة إلى الفروع
      </button>
      <img :src="branch.img" :alt="branch.name" class="hero-image" />
      <section class="detail-card">
        <span class="material-symbols-outlined detail-icon">storefront</span>
        <h2>{{ branch.name }}</h2>
        <div class="info-row"><span class="material-symbols-outlined">location_on</span><span>{{ branch.address }}</span></div>
        <div class="info-row"><span class="material-symbols-outlined">schedule</span><span>يوميًا من 9:00 صباحًا إلى 9:00 مساءً</span></div>
        <h3>أرقام التواصل</h3>
        <a v-for="phone in branch.phones" :key="phone" :href="`tel:${phone}`" class="contact-button">
          <span class="material-symbols-outlined">phone</span><span dir="ltr">{{ phone }}</span>
        </a>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TopBar from '../components/TopBar.vue'

const route = useRoute()
const router = useRouter()
const branches = [
  { id: 'baghdad', name: 'الفرع الرئيسي - بغداد', address: 'شارع الرشيد، وسط البلد، بغداد', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop', phones: ['07701234567', '07801234567'] },
  { id: 'adhamiya', name: 'فرع الأعظمية', address: 'شارع حسين خليل، الأعظمية، بغداد', img: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=500&fit=crop', phones: ['07709876543', '07809876543'] },
  { id: 'basra', name: 'فرع البصرة', address: 'شارع العربي، البصرة', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop', phones: ['07801112233', '07701112233'] }
]
const branch = computed(() => branches.find(item => item.id === route.params.id) || branches[0])
const isDetail = computed(() => Boolean(route.params.id))
const openDetail = id => router.push(`/branches/${id}`)
</script>

<style scoped>
.directory-screen { min-height: 100dvh; background: var(--bg); color: var(--on-surface); }
.page-back { display: flex; align-items: center; gap: 5px; margin: 14px 16px -6px; padding: 0; background: none; border: 0; color: var(--primary); font: inherit; font-size: 13px; font-weight: 700; cursor: pointer; }
.page-back .material-symbols-outlined { font-size: 18px; }
.directory-content, .detail-content { max-width: 520px; margin: 0 auto; padding: 20px 16px 40px; }
.page-intro { display: flex; gap: 12px; align-items: center; margin-bottom: 20px; }
.intro-icon, .detail-icon { color: var(--primary); font-size: 34px; }
.page-intro h2, .detail-card h2 { font-size: 18px; margin-bottom: 4px; }
.page-intro p { font-size: 12px; color: var(--on-surface-variant); line-height: 1.7; }
.directory-card { width: 100%; overflow: hidden; margin-bottom: 14px; border: 1px solid var(--outline-variant); border-radius: 16px; background: var(--surface-container); color: inherit; text-align: right; font-family: inherit; cursor: pointer; padding: 0; }
.directory-card:active { border-color: var(--primary); }
.card-image, .hero-image { display: block; width: 100%; object-fit: cover; }
.card-image { height: 150px; }
.card-body { padding: 14px; }
.card-body h3 { font-size: 15px; margin-bottom: 8px; }
.card-body p, .info-row { display: flex; gap: 7px; align-items: center; color: var(--on-surface-variant); font-size: 12px; line-height: 1.6; }
.card-body p .material-symbols-outlined, .info-row .material-symbols-outlined { font-size: 18px; color: var(--primary); }
.details-link { display: flex; align-items: center; justify-content: flex-end; gap: 4px; margin-top: 12px; color: var(--primary); font-size: 12px; font-weight: 700; }
.details-link .material-symbols-outlined { font-size: 16px; }
.list-back { display: flex; align-items: center; gap: 5px; padding: 0; margin-bottom: 14px; color: var(--primary); background: none; border: 0; font: inherit; font-size: 13px; font-weight: 700; cursor: pointer; }
.list-back .material-symbols-outlined { font-size: 18px; }
.hero-image { height: 230px; border-radius: 18px; border: 1px solid var(--outline-variant); }
.detail-card { position: relative; margin-top: -20px; margin-inline: 12px; padding: 22px 16px 16px; background: var(--surface-container); border: 1px solid var(--outline-variant); border-radius: 18px; }
.detail-icon { display: block; margin-bottom: 8px; }
.detail-card h3 { margin: 22px 0 10px; font-size: 14px; }
.info-row { margin-top: 10px; }
.contact-button { display: flex; align-items: center; gap: 9px; padding: 12px; margin-top: 8px; color: var(--on-surface); text-decoration: none; background: rgba(37, 211, 102, .08); border: 1px solid rgba(37, 211, 102, .3); border-radius: 12px; }
.contact-button .material-symbols-outlined { color: #25d366; }
</style>
