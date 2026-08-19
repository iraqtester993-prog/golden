<template>
  <div class="directory-screen">
    <TopBar />
    <button class="page-back" @click="router.back()">
      <span class="material-symbols-outlined">arrow_forward</span> رجوع
    </button>

    <main v-if="!isDetail" class="directory-content">
      <div class="page-intro">
        <span class="material-symbols-outlined intro-icon">support_agent</span>
        <div>
          <h2>الوكلاء المعتمدون</h2>
          <p>تعرّف على وكلائنا وخيارات التواصل المباشر معهم.</p>
        </div>
      </div>

      <button v-for="item in agents" :key="item.id" class="directory-card" @click="openDetail(item.id)">
        <div class="profile-cover"><img :src="item.img" :alt="item.name" /></div>
        <div class="profile-body">
          <div class="profile-avatar"><img :src="item.img" :alt="item.name" /><span class="material-symbols-outlined">verified</span></div>
          <div class="profile-info">
            <span class="profile-kind">وكيل معتمد</span>
            <h3>{{ item.name }}</h3>
            <p><span class="material-symbols-outlined">location_on</span>{{ item.address }}</p>
          </div>
          <span class="material-symbols-outlined profile-arrow">arrow_back</span>
        </div>
      </button>
    </main>

    <main v-else class="detail-content">
      <img :src="agent.img" :alt="agent.name" class="hero-image" />
      <section class="detail-card">
        <span class="material-symbols-outlined detail-icon">verified</span>
        <h2>{{ agent.name }}</h2>
        <p class="status">وكيل معتمد لدى العصر الذهبي</p>
        <div class="info-row"><span class="material-symbols-outlined">location_on</span><span>{{ agent.address }}</span></div>
        <div class="info-row"><span class="material-symbols-outlined">schedule</span><span>يوميًا من 10:00 صباحًا إلى 8:00 مساءً</span></div>
        <h3>التواصل مع الوكيل</h3>
        <a v-for="phone in agent.phones" :key="phone" :href="`tel:${phone}`" class="contact-button">
          <span class="material-symbols-outlined">phone</span><span dir="ltr">{{ phone }}</span>
        </a>
      </section>
    </main>
    <BottomNav />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TopBar from '../components/TopBar.vue'
import BottomNav from '../components/BottomNav.vue'

const route = useRoute()
const router = useRouter()
const agents = [
  { id: 'alamal', name: 'وكالة الأمل للسيارات', address: 'المنطقة الصناعية، بغداد', img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=500&fit=crop', phones: ['07705556677', '07805556677'] },
  { id: 'alnoor', name: 'وكالة النور للإلكترونيات', address: 'شارع المتنبي، بغداد', img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop', phones: ['07704443322', '07804443322'] },
  { id: 'alzahraa', name: 'وكالة الزهراء للأجهزة', address: 'الكاظمية، بغداد', img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop', phones: ['07702221100', '07802221100'] }
]
const agent = computed(() => agents.find(item => item.id === route.params.id) || agents[0])
const isDetail = computed(() => Boolean(route.params.id))
const openDetail = id => router.push(`/agents/${id}`)
</script>

<style scoped>
.directory-screen { min-height: 100dvh; background: var(--bg); color: var(--on-surface); }
.page-back { display: flex; align-items: center; gap: 5px; margin: 14px 16px -6px; padding: 0; background: none; border: 0; color: var(--primary); font: inherit; font-size: 13px; font-weight: 700; cursor: pointer; }
.page-back .material-symbols-outlined { font-size: 18px; }
.directory-content, .detail-content { max-width: 520px; margin: 0 auto; padding: 20px 16px 100px; }
.page-intro { display: flex; gap: 12px; align-items: center; margin-bottom: 20px; }
.intro-icon, .detail-icon { color: var(--primary); font-size: 34px; }
.page-intro h2, .detail-card h2 { font-size: 18px; margin-bottom: 4px; }
.page-intro p, .status { font-size: 12px; color: var(--on-surface-variant); line-height: 1.7; }
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
