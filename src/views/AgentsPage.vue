<template>
  <div class="directory-screen">
    <TopBar :title="isDetail ? agent.name : 'الوكلاء'" show-back />

    <main v-if="!isDetail" class="directory-content">
      <div class="page-intro">
        <span class="material-symbols-outlined intro-icon">support_agent</span>
        <div>
          <h2>الوكلاء المعتمدون</h2>
          <p>تعرّف على وكلائنا وخيارات التواصل المباشر معهم.</p>
        </div>
      </div>

      <button v-for="item in agents" :key="item.id" class="directory-card" @click="openDetail(item.id)">
        <img :src="item.img" :alt="item.name" class="card-image" />
        <div class="card-body">
          <h3>{{ item.name }}</h3>
          <p><span class="material-symbols-outlined">location_on</span>{{ item.address }}</p>
          <span class="details-link">عرض التفاصيل <span class="material-symbols-outlined">arrow_back</span></span>
        </div>
      </button>
    </main>

    <main v-else class="detail-content">
      <button class="list-back" @click="router.push('/agents')">
        <span class="material-symbols-outlined">arrow_forward</span> العودة إلى الوكلاء
      </button>
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
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TopBar from '../components/TopBar.vue'

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
.directory-content, .detail-content { max-width: 520px; margin: 0 auto; padding: 20px 16px 40px; }
.page-intro { display: flex; gap: 12px; align-items: center; margin-bottom: 20px; }
.intro-icon, .detail-icon { color: var(--primary); font-size: 34px; }
.page-intro h2, .detail-card h2 { font-size: 18px; margin-bottom: 4px; }
.page-intro p, .status { font-size: 12px; color: var(--on-surface-variant); line-height: 1.7; }
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
