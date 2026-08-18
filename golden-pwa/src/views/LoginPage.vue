<template>
  <div class="login-screen">
    <div class="login-container">
      <div class="top-section">
        <div class="logo-area">
          <img :src="logo" alt="العصر الذهبي" class="login-logo" />
        </div>
      </div>

      <div class="form-area">
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
import logo from '../assets/logo.png'

const router = useRouter()
const phone = ref('')
const password = ref('')
const showPass = ref(false)

const login = () => {
  router.push('/home')
}
</script>

<style scoped>
.login-screen {
  width: 100%;
  height: 100dvh;
  background: #0a0f1d;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.login-container {
  width: 100%;
  max-width: 400px;
  height: 100%;
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
}

.login-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  mix-blend-mode: screen;
}

.form-area {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group {
  display: flex;
  align-items: center;
  background: #141b2d;
  border: 1px solid #4d4635;
  border-radius: 14px;
  padding: 0 16px;
  height: 56px;
  transition: border-color 0.3s;
}

.input-group:focus-within {
  border-color: #f2ca50;
}

.input-icon {
  color: #99907c;
  font-size: 22px;
  margin-left: 12px;
}

.input-field {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #eae1d4;
  font-size: 15px;
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

.forgot-pass {
  background: none;
  border: none;
  color: #f2ca50;
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
  color: #99907c;
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
