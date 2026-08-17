<template>
  <div class="login-screen">
    <div class="login-container">
      <div class="top-section">
        <div class="logo-area">
          <img :src="logo" alt="Golden Group" class="login-logo" />
        </div>
        <h1 class="brand-name">GOLDEN GROUP</h1>
        <p class="brand-sub">العصر الذهبي</p>
      </div>

      <div class="form-area">
        <div class="input-group">
          <span class="material-symbols-outlined input-icon">person</span>
          <input type="text" placeholder="رقم الهاتف أو البريد" class="input-field" />
        </div>
        <div class="input-group">
          <span class="material-symbols-outlined input-icon">lock</span>
          <input type="password" placeholder="كلمة المرور" class="input-field" />
        </div>

        <button class="login-btn" @click="login">
          <span>تسجيل الدخول</span>
          <span class="material-symbols-outlined">arrow_forward</span>
        </button>

        <div class="divider">
          <span class="line"></span>
          <span class="or-text">أو</span>
          <span class="line"></span>
        </div>

        <button class="guest-btn" @click="login">
          <span class="material-symbols-outlined">login</span>
          <span>دخول كضيف</span>
        </button>
      </div>

      <div class="bottom-text">
        <p>بتسجيل الدخول أنت توافق على <span class="gold-link">الشروط والأحكام</span></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import logo from '../assets/logo.png'

const router = useRouter()

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
  justify-content: space-between;
  padding: 60px 28px 40px;
}

.top-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.logo-area {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.login-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  mix-blend-mode: screen;
}

.brand-name {
  font-size: 26px;
  font-weight: 700;
  color: #f2ca50;
  letter-spacing: 2px;
}

.brand-sub {
  font-size: 14px;
  color: #d0c5af;
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

.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 4px 0;
}

.line {
  flex: 1;
  height: 1px;
  background: #4d4635;
}

.or-text {
  color: #99907c;
  font-size: 13px;
}

.guest-btn {
  width: 100%;
  height: 52px;
  background: transparent;
  border: 1px solid #4d4635;
  border-radius: 14px;
  color: #eae1d4;
  font-size: 15px;
  font-weight: 500;
  font-family: 'Noto Kufi Arabic', sans-serif;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: border-color 0.3s, background 0.3s;
}

.guest-btn:active {
  background: rgba(242, 202, 80, 0.08);
  border-color: #d4af37;
}

.bottom-text {
  text-align: center;
}

.bottom-text p {
  font-size: 12px;
  color: #99907c;
}

.gold-link {
  color: #f2ca50;
}
</style>
