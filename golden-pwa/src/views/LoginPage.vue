<template>
  <div class="login-screen">
    <div class="login-container">
      <div class="top-section">
        <div class="logo-area">
          <img :src="logo" alt="العصر الذهبي" class="login-logo" />
        </div>
      </div>

      <div class="form-area">
        <div v-if="loginNotice" class="login-notice" role="status">
          <span class="material-symbols-outlined">check_circle</span>
          <span>{{ loginNotice }}</span>
        </div>
        <div class="input-group">
          <span class="material-symbols-outlined input-icon">phone</span>
          <input type="tel" placeholder="رقم الهاتف" class="input-field" v-model="phone" />
        </div>
        <div class="input-group">
          <span class="material-symbols-outlined input-icon">lock</span>
          <input :type="showPass ? 'text' : 'password'" placeholder="كلمة المرور" class="input-field" v-model="password" />
          <button class="eye-btn" @click="showPass = !showPass">
            <span class="material-symbols-outlined">{{ showPass ? 'visibility' : 'visibility_off' }}</span>
          </button>
        </div>

        <button class="forgot-pass">نسيت كلمة المرور؟</button>

        <button class="login-btn" @click="login">
          <span>تسجيل الدخول</span>
        </button>

        <div class="register-link">
          <span>ليس لديك حساب؟</span>
          <button class="gold-link" @click="$router.push('/register')">إنشاء حساب</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import logo from '../assets/logo-dark.png'

const router = useRouter()
const phone = ref('')
const password = ref('')
const showPass = ref(false)
const loginNotice = ref('')

const login = () => {
  loginNotice.value = 'تم تسجيل الدخول بنجاح، أهلاً بك'
  setTimeout(() => router.push('/home'), 700)
}
</script>

<style scoped>
.login-screen {
  width: 100%;
  height: 100dvh;
  background: var(--bg);
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior-y: contain;
}

.login-container {
  width: 100%;
  max-width: 400px;
  min-height: 100dvh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 28px;
  gap: 40px;
}

.top-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-area {
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg);
  isolation: isolate;
}

.login-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.form-area {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.login-notice { display: flex; align-items: center; justify-content: center; gap: 7px; padding: 10px 12px; border: 1px solid rgba(52, 211, 153, 0.35); border-radius: 12px; background: rgba(52, 211, 153, 0.1); color: var(--success); font-size: 12px; font-weight: 600; }
.login-notice .material-symbols-outlined { font-size: 18px; font-variation-settings: 'FILL' 1; }

.input-group {
  display: flex;
  align-items: center;
  background: var(--surface-container);
  border: 1px solid var(--outline-variant);
  border-radius: 14px;
  padding: 0 16px;
  height: 56px;
  transition: border-color 0.3s;
}

.input-group:focus-within {
  border-color: var(--primary);
}

.input-icon {
  color: var(--on-surface-variant);
  font-size: 22px;
  margin-left: 12px;
}

.input-field {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--on-surface);
  font-size: 15px;
  font-family: 'Noto Kufi Arabic', sans-serif;
  direction: rtl;
}

.input-field::placeholder {
  color: var(--on-surface-variant);
}

.eye-btn {
  background: none;
  border: none;
  color: var(--on-surface-variant);
  cursor: pointer;
  padding: 4px;
  display: flex;
}

.forgot-pass {
  background: none;
  border: none;
  color: var(--primary);
  font-size: 13px;
  font-family: 'Noto Kufi Arabic', sans-serif;
  text-align: left;
  cursor: pointer;
  padding: 0;
  align-self: flex-start;
}

.login-btn {
  width: 100%;
  height: 56px;
  background: linear-gradient(135deg, var(--primary-container), var(--primary));
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
  gap: 8px;
  margin-top: 8px;
  transition: transform 0.15s, box-shadow 0.3s;
  box-shadow: 0 4px 20px rgba(212, 175, 55, 0.25);
}

.login-btn:active {
  transform: scale(0.97);
}

.register-link {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--on-surface-variant);
}

.gold-link {
  background: none;
  border: none;
  color: var(--primary);
  font-size: 14px;
  font-weight: 600;
  font-family: 'Noto Kufi Arabic', sans-serif;
  cursor: pointer;
}
</style>
