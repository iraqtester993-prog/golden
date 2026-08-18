<template>
  <div class="register-screen">
    <div class="register-container">
      <!-- Header -->
      <div class="reg-header">
        <button class="back-btn" @click="$router.back()">
          <span class="material-symbols-outlined">arrow_forward</span>
        </button>
        <h1 class="reg-title">إنشاء حساب</h1>
      </div>

      <!-- Form -->
      <div class="form-area">
        <!-- Personal Info -->
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

        <!-- Type Selector -->
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

        <!-- Employee Fields -->
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

        <!-- Merchant Fields -->
        <template v-if="form.type === 'merchant'">
          <div class="input-group">
            <span class="material-symbols-outlined input-icon">business</span>
            <input type="text" placeholder="عنوان العمل" class="input-field" v-model="form.workAddress" />
          </div>
        </template>

        <!-- File Uploads - National ID (Front & Back) -->
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

        <!-- Residence Card -->
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

        <!-- Department ID - Employee only -->
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

        <button class="register-btn" @click="register">
          <span>إنشاء الحساب</span>
        </button>

        <div class="login-link">
          <span>لديك حساب بالفعل؟</span>
          <button class="gold-link" @click="$router.push('/')">تسجيل الدخول</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showPass = ref(false)

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
  departmentId: null
})

const handleFile = (event, field) => {
  const file = event.target.files[0]
  if (file) {
    form[field] = file
  }
}

const register = () => {
  router.push('/home')
}
</script>

<style scoped>
.register-screen {
  width: 100%;
  min-height: 100dvh;
  background: #0a0f1d;
  overflow-y: auto;
}

.register-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 16px 20px 40px;
}

.reg-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
  padding-top: 8px;
}

.back-btn {
  background: none;
  border: none;
  color: #eae1d4;
  cursor: pointer;
  padding: 8px;
  display: flex;
}

.reg-title {
  font-size: 22px;
  font-weight: 700;
  color: #eae1d4;
}

.form-area {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.input-group {
  display: flex;
  align-items: center;
  background: #141b2d;
  border: 1px solid #4d4635;
  border-radius: 14px;
  padding: 0 16px;
  height: 52px;
  transition: border-color 0.3s;
}

.input-group:focus-within {
  border-color: #f2ca50;
}

.input-icon {
  color: #99907c;
  font-size: 20px;
  margin-left: 10px;
}

.input-field {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #eae1d4;
  font-size: 14px;
  font-family: 'Noto Kufi Arabic', sans-serif;
  direction: rtl;
}

.input-field::placeholder {
  color: #99907c;
}

.eye-btn {
  background: none;
  border: none;
  color: #99907c;
  cursor: pointer;
  padding: 4px;
  display: flex;
}

/* Type Selector */
.type-selector {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.type-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 16px 8px;
  background: #141b2d;
  border: 2px solid #4d4635;
  border-radius: 14px;
  color: #99907c;
  font-size: 14px;
  font-family: 'Noto Kufi Arabic', sans-serif;
  cursor: pointer;
  transition: all 0.3s;
}

.type-btn .material-symbols-outlined {
  font-size: 28px;
}

.type-btn.active {
  border-color: #f2ca50;
  color: #f2ca50;
  background: rgba(242, 202, 80, 0.08);
}

/* Upload Section */
.upload-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 4px;
}

.upload-title {
  font-size: 14px;
  font-weight: 600;
  color: #d0c5af;
}

.upload-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.upload-box {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 20px 8px;
  background: #141b2d;
  border: 2px dashed #4d4635;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s;
  min-height: 100px;
}

.upload-box.full {
  grid-column: 1 / -1;
}

.upload-box:active {
  border-color: #f2ca50;
}

.upload-box.uploaded {
  border-color: #34d399;
  border-style: solid;
  background: rgba(52, 211, 153, 0.06);
}

.file-input {
  display: none;
}

.upload-icon {
  font-size: 32px;
  color: #99907c;
}

.upload-box.uploaded .upload-icon {
  color: #34d399;
}

.upload-label {
  font-size: 12px;
  color: #99907c;
  text-align: center;
}

.upload-box.uploaded .upload-label {
  color: #34d399;
}

.check-upload {
  position: absolute;
  top: 8px;
  left: 8px;
  color: #34d399;
  font-size: 20px;
}

/* Register Button */
.register-btn {
  width: 100%;
  height: 56px;
  background: linear-gradient(135deg, #d4af37, #f2ca50);
  border: none;
  border-radius: 14px;
  color: #0a0f1d;
  font-size: 17px;
  font-weight: 700;
  font-family: 'Noto Kufi Arabic', sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  transition: transform 0.15s, box-shadow 0.3s;
  box-shadow: 0 4px 20px rgba(212, 175, 55, 0.25);
}

.register-btn:active {
  transform: scale(0.97);
}

.login-link {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #99907c;
  margin-top: 4px;
}

.gold-link {
  background: none;
  border: none;
  color: #f2ca50;
  font-size: 14px;
  font-weight: 600;
  font-family: 'Noto Kufi Arabic', sans-serif;
  cursor: pointer;
}
</style>
