<template>
  <div class="page">
    <TopBar />
    <div class="page-inner">
      <div class="reg-header">
        <button class="back-btn" @click="$router.back()">
          <span class="material-symbols-outlined">arrow_forward</span>
        </button>
        <h1 class="reg-title">البيانات الشخصية</h1>
      </div>

      <div class="form-area">
        <!-- Profile Photo -->
        <div class="profile-photo-section">
          <label class="profile-photo-label">
            <input type="file" accept="image/*" class="file-input" @change="handleProfilePhoto" />
            <div class="profile-circle" :class="{ uploaded: profilePreview }">
              <img v-if="profilePreview" :src="profilePreview" class="profile-img" />
              <span v-else class="material-symbols-outlined profile-icon">person</span>
              <div class="camera-badge">
                <span class="material-symbols-outlined">photo_camera</span>
              </div>
            </div>
          </label>
          <span class="profile-hint">تعديل الصورة الشخصية</span>
        </div>

        <div class="input-group">
          <span class="material-symbols-outlined input-icon">person</span>
          <input type="text" placeholder="الاسم الكامل" class="input-field" v-model="form.fullName" />
        </div>

        <div class="input-group">
          <span class="material-symbols-outlined input-icon">phone</span>
          <input type="tel" placeholder="رقم الهاتف" class="input-field" v-model="form.phone" />
        </div>

        <div class="input-group">
          <span class="material-symbols-outlined input-icon">location_on</span>
          <input type="text" placeholder="العنوان" class="input-field" v-model="form.address" />
        </div>

        <div class="input-group">
          <span class="material-symbols-outlined input-icon">lock</span>
          <input :type="showPass ? 'text' : 'password'" placeholder="كلمة المرور" class="input-field" v-model="form.password" />
          <button class="eye-btn" @click="showPass = !showPass">
            <span class="material-symbols-outlined">{{ showPass ? 'visibility' : 'visibility_off' }}</span>
          </button>
        </div>

        <div class="type-selector">
          <button class="type-btn" :class="{ active: form.type === 'employee' }" @click="form.type = 'employee'">
            <span class="material-symbols-outlined">badge</span>
            <span>موظف</span>
          </button>
          <button class="type-btn" :class="{ active: form.type === 'merchant' }" @click="form.type = 'merchant'">
            <span class="material-symbols-outlined">storefront</span>
            <span>كاسب</span>
          </button>
        </div>

        <template v-if="form.type === 'employee'">
          <div class="input-group">
            <span class="material-symbols-outlined input-icon">domain</span>
            <input type="text" placeholder="اسم الدائرة" class="input-field" v-model="form.department" />
          </div>
          <div class="input-group">
            <span class="material-symbols-outlined input-icon">work</span>
            <input type="text" placeholder="المسمى الوظيفي" class="input-field" v-model="form.jobTitle" />
          </div>
        </template>

        <template v-if="form.type === 'merchant'">
          <div class="input-group">
            <span class="material-symbols-outlined input-icon">business</span>
            <input type="text" placeholder="عنوان العمل" class="input-field" v-model="form.workAddress" />
          </div>
        </template>

        <div class="upload-section">
          <h3 class="upload-title">البطاقة الوطنية</h3>
          <div class="upload-row">
            <label class="upload-box" :class="{ uploaded: form.nationalFront }">
              <input type="file" accept="image/*" class="file-input" @change="e => handleFile(e, 'nationalFront')" />
              <span class="material-symbols-outlined upload-icon">credit_card</span>
              <span class="upload-label">الوجه الأمامي</span>
              <span v-if="form.nationalFront" class="material-symbols-outlined check-upload">check_circle</span>
            </label>
            <label class="upload-box" :class="{ uploaded: form.nationalBack }">
              <input type="file" accept="image/*" class="file-input" @change="e => handleFile(e, 'nationalBack')" />
              <span class="material-symbols-outlined upload-icon">credit_card</span>
              <span class="upload-label">الوجه الخلفي</span>
              <span v-if="form.nationalBack" class="material-symbols-outlined check-upload">check_circle</span>
            </label>
          </div>
        </div>

        <div class="upload-section">
          <h3 class="upload-title">بطاقة السكن</h3>
          <div class="upload-row">
            <label class="upload-box full" :class="{ uploaded: form.residenceCard }">
              <input type="file" accept="image/*" class="file-input" @change="e => handleFile(e, 'residenceCard')" />
              <span class="material-symbols-outlined upload-icon">home</span>
              <span class="upload-label">ارفع صورة البطاقة</span>
              <span v-if="form.residenceCard" class="material-symbols-outlined check-upload">check_circle</span>
            </label>
          </div>
        </div>

        <div class="upload-section" v-if="form.type === 'employee'">
          <h3 class="upload-title">هوية الدائرة</h3>
          <div class="upload-row">
            <label class="upload-box full" :class="{ uploaded: form.departmentId }">
              <input type="file" accept="image/*" class="file-input" @change="e => handleFile(e, 'departmentId')" />
              <span class="material-symbols-outlined upload-icon">badge</span>
              <span class="upload-label">ارفع صورة الهوية</span>
              <span v-if="form.departmentId" class="material-symbols-outlined check-upload">check_circle</span>
            </label>
          </div>
        </div>

        <button class="register-btn" @click="save">
          <span class="material-symbols-outlined">save</span>
          <span>تأكيد التعديلات</span>
        </button>
      </div>
    </div>

    <!-- Toast -->
    <div v-if="toast" class="toast toast-success">
      <span class="material-symbols-outlined">check_circle</span>
      <span>{{ toast }}</span>
    </div>
    <BottomNav />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TopBar from '../components/TopBar.vue'
import BottomNav from '../components/BottomNav.vue'

const router = useRouter()
const showPass = ref(false)
const profilePreview = ref(null)
const toast = ref(null)

const form = reactive({
  fullName: '',
  phone: '',
  address: '',
  password: '',
  type: 'employee',
  department: '',
  jobTitle: '',
  workAddress: '',
  nationalFront: null,
  nationalBack: null,
  residenceCard: null,
  departmentId: null,
  profilePhoto: null
})

onMounted(() => {
  const saved = JSON.parse(localStorage.getItem('golden_user') || '{}')
  form.fullName = saved.fullName || ''
  form.phone = saved.phone || ''
  form.address = saved.address || ''
  form.password = ''
  form.type = saved.clientType || 'employee'
  form.department = saved.department || ''
  form.jobTitle = saved.jobTitle || ''
  form.workAddress = saved.workAddress || ''
  if (saved.profilePhoto) profilePreview.value = saved.profilePhoto
})

const handleProfilePhoto = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      profilePreview.value = e.target.result
      form.profilePhoto = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleFile = (event, field) => {
  const file = event.target.files[0]
  if (file) {
    form[field] = { name: file.name, size: file.size }
  }
}

const save = () => {
  const saved = JSON.parse(localStorage.getItem('golden_user') || '{}')
  const data = {
    ...saved,
    fullName: form.fullName,
    phone: form.phone,
    address: form.address,
    clientType: form.type,
    department: form.department,
    jobTitle: form.jobTitle,
    workAddress: form.workAddress
  }
  if (form.password) data.password = form.password
  if (profilePreview.value) data.profilePhoto = profilePreview.value
  if (form.nationalFront) data.nationalFront = form.nationalFront
  if (form.nationalBack) data.nationalBack = form.nationalBack
  if (form.residenceCard) data.residenceCard = form.residenceCard
  if (form.departmentId) data.departmentId = form.departmentId
  localStorage.setItem('golden_user', JSON.stringify(data))
  toast.value = 'تم حفظ التعديلات بنجاح'
  setTimeout(() => { router.back() }, 1200)
}
</script>

<style scoped>
.page {
  width: 100%;
  height: 100dvh;
  background: var(--bg);
  overflow-y: auto;
  overscroll-behavior: none;
}
.page-inner {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 12px 20px 100px;
}

.reg-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-top: 8px;
}
.back-btn {
  background: none;
  border: none;
  color: var(--on-surface);
  cursor: pointer;
  padding: 8px;
  display: flex;
}
.reg-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--on-surface);
}

.form-area {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Profile Photo */
.profile-photo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
}
.profile-photo-label { cursor: pointer; }
.profile-circle {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: var(--surface-container);
  border: 2px dashed var(--outline-variant);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: border-color 0.3s;
  overflow: hidden;
}
.profile-circle.uploaded { border-style: solid; border-color: var(--primary); }
.profile-circle:active { border-color: var(--primary); }
.profile-img { width: 100%; height: 100%; object-fit: cover; }
.profile-icon { font-size: 36px; color: var(--on-surface-variant); }
.camera-badge {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
}
.camera-badge .material-symbols-outlined { font-size: 18px; color: var(--primary); }
.profile-hint { font-size: 11px; color: var(--on-surface-variant); }
.file-input { display: none; }

.input-group {
  display: flex;
  align-items: center;
  background: var(--surface-container);
  border: 1px solid var(--outline-variant);
  border-radius: 12px;
  padding: 0 14px;
  height: 50px;
  transition: border-color 0.3s;
}
.input-group:focus-within { border-color: var(--primary); }
.input-icon { color: var(--on-surface-variant); font-size: 20px; margin-left: 10px; }
.input-field {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--on-surface);
  font-size: 14px;
  font-family: 'Noto Kufi Arabic', sans-serif;
  direction: rtl;
}
.input-field::placeholder { color: var(--on-surface-variant); }
.eye-btn {
  background: none;
  border: none;
  color: var(--on-surface-variant);
  cursor: pointer;
  padding: 4px;
  display: flex;
}

.type-selector { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.type-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 14px 8px;
  background: var(--surface-container);
  border: 2px solid var(--outline-variant);
  border-radius: 12px;
  color: var(--on-surface-variant);
  font-size: 13px;
  font-family: 'Noto Kufi Arabic', sans-serif;
  cursor: pointer;
  transition: all 0.3s;
}
.type-btn .material-symbols-outlined { font-size: 26px; }
.type-btn.active { border-color: var(--primary); color: var(--primary); }

.upload-section { display: flex; flex-direction: column; gap: 8px; margin-top: 4px; }
.upload-title { font-size: 13px; font-weight: 600; color: var(--on-surface-variant); }
.upload-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.upload-box {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 16px 8px;
  background: var(--surface-container);
  border: 2px dashed var(--outline-variant);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  min-height: 90px;
}
.upload-box.full { grid-column: 1 / -1; }
.upload-box:active { border-color: var(--primary); }
.upload-box.uploaded { border-color: var(--success); border-style: solid; }
.upload-icon { font-size: 28px; color: var(--on-surface-variant); }
.upload-box.uploaded .upload-icon { color: var(--success); }
.upload-label { font-size: 11px; color: var(--on-surface-variant); text-align: center; }
.upload-box.uploaded .upload-label { color: var(--success); }
.check-upload { position: absolute; top: 8px; left: 8px; color: var(--success); font-size: 20px; }

.register-btn {
  width: 100%;
  height: 52px;
  background: linear-gradient(135deg, var(--primary-container), var(--primary));
  border: none;
  border-radius: 12px;
  color: #0a0f1d;
  font-size: 16px;
  font-weight: 700;
  font-family: 'Noto Kufi Arabic', sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
  transition: transform 0.15s, box-shadow 0.3s;
  box-shadow: 0 4px 20px rgba(212, 175, 55, 0.25);
}
.register-btn:active { transform: scale(0.97); }
.register-btn .material-symbols-outlined { font-size: 20px; }

.toast {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 600;
  z-index: 200;
  animation: slideUp 0.2s ease;
  white-space: nowrap;
}
.toast-success { background: var(--primary); color: #0a0f1d; }
.toast .material-symbols-outlined { font-size: 20px; }
@keyframes slideUp { from { transform: translate(-50%, 20px); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }
</style>
