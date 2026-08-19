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
        <div class="profile-cover"><img :src="item.img" :alt="item.name" /></div>
        <div class="profile-body">
          <div class="profile-avatar"><img :src="item.img" :alt="item.name" /><span class="material-symbols-outlined">verified</span></div>
          <div class="profile-info">
            <span class="profile-kind">فرع معتمد</span>
            <h3>{{ item.name }}</h3>
            <p><span class="material-symbols-outlined">location_on</span>{{ item.address }}</p>
          </div>
          <span class="material-symbols-outlined profile-arrow">arrow_back</span>
        </div>
      </button>
    </main>

    <main v-else class="detail-content">
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
.directory-card { width: 100%; overflow: hidden; margin-bottom: 16px; border: 1px solid var(--outline-variant); border-radius: 18px; background: var(--surface-container); color: inherit; text-align: right; font-family: inherit; cursor: pointer; padding: 0; box-shadow: 0 10px 24px rgba(0,0,0,.12); }
.directory-card:active { border-color: var(--primary); transform: scale(.99); }
.profile-cover { height: 88px; overflow: hidden; background: var(--surface-container-high); }
.profile-cover img { width: 100%; height: 100%; object-fit: cover; opacity: .55; }
.profile-body { position: relative; display: flex; align-items: center; gap: 12px; padding: 0 14px 14px; }
.profile-avatar { width: 68px; height: 68px; margin-top: -34px; position: relative; flex-shrink: 0; border: 3px solid var(--surface-container); border-radius: 50%; overflow: visible; }
.profile-avatar img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
.profile-avatar .material-symbols-outlined { position: absolute; left: -3px; bottom: -3px; padding: 2px; border-radius: 50%; background: var(--surface-container); color: var(--primary); font-size: 21px; font-variation-settings: 'FILL' 1; }
.profile-info { flex: 1; min-width: 0; padding-top: 10px; }
.profile-kind { font-size: 10px; font-weight: 700; color: var(--primary); }
.profile-info h3 { font-size: 15px; margin: 2px 0 5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.profile-info p, .info-row { display: flex; gap: 6px; align-items: center; color: var(--on-surface-variant); font-size: 12px; line-height: 1.6; }
.profile-info p .material-symbols-outlined, .info-row .material-symbols-outlined { font-size: 17px; color: var(--primary); }
.profile-arrow { color: var(--primary); font-size: 22px; flex-shrink: 0; }
.hero-image { display: block; width: 100%; object-fit: cover; }
.hero-image { height: 230px; border-radius: 18px; border: 1px solid var(--outline-variant); }
.detail-card { position: relative; margin-top: -20px; margin-inline: 12px; padding: 22px 16px 16px; background: var(--surface-container); border: 1px solid var(--outline-variant); border-radius: 18px; }
.detail-icon { display: block; margin-bottom: 8px; }
.detail-card h3 { margin: 22px 0 10px; font-size: 14px; }
.info-row { margin-top: 10px; }
.contact-button { display: flex; align-items: center; gap: 9px; padding: 12px; margin-top: 8px; color: var(--on-surface); text-decoration: none; background: rgba(37, 211, 102, .08); border: 1px solid rgba(37, 211, 102, .3); border-radius: 12px; }
.contact-button .material-symbols-outlined { color: #25d366; }
</style>
