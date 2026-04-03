<template>
  <div id="app">
    <!-- รอให้เช็ค session เสร็จก่อน -->
    <div v-if="isChecking">
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
        <div>กำลังตรวจสอบข้อมูลผู้ใช้...</div>
      </div>
    </div>
    <div v-else-if="userData !== null">
      <Header :userDataProps="userData" />
      <router-view></router-view>
    </div>
    <div v-else>
      <!-- Dev mode: แสดงหน้า login ของตัวเอง -->
      <Loginpage v-if="isDev" />
      <!-- Production: redirect ไป intranet (จะ redirect ใน created()) -->
      <div v-else>
        <!-- Redirecting to Intranet login... -->
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Loginpage from '@/views/Loginpage.vue'

export default {
  name: "App",
  components: {
    Header,
    Loginpage
  },
  data() {
    return {
      userData: this.getSessionStorage(),
      url: this.getUrl(),
      isChecking: true, // flag รอเช็ค session
      isDev: process.env.NODE_ENV !== 'production' // เช็คว่าเป็น dev mode หรือไม่
    }
  },
  async created() {
    // เรียก API เช็ค session จาก backend (สำหรับ dev ที่อ่าน localStorage ข้าม port ไม่ได้)
    await this.checkSessionFromBackend();
    this.isChecking = false; // เช็คเสร็จแล้ว
  },
  methods: {
    getSessionStorage() {
      const getUserData = localStorage.getItem("userData");
      return JSON.parse(getUserData);
    },
    async checkSessionFromBackend() {
      try {
        // ใช้ relative path เพื่อให้ผ่าน proxy (dev) หรือเรียกตรง (production)
        const apiUrl = '/intsys/purchaseplus/purchaseplus_backend/login/checksession';
        console.log('🔍 Calling checksession API...');
        const res = await fetch(apiUrl, {
          credentials: 'include' // ส่ง cookie session ไปด้วย
        });
        const result = await res.json();
        console.log('📦 API Response:', result);

        if (result.hasSession && result.userData) {
          // ✅ มี session → อัพเดท userData ลง localStorage
          console.log('✅ Session found, saving userData:', result.userData);
          this.userData = result.userData;
          localStorage.setItem('userData', JSON.stringify(result.userData));
        } else {
          console.log('❌ No session from API, current localStorage userData:', this.userData);
          
          // Production mode → redirect ไป intranet login
          if (!this.isDev && !this.userData) {
            console.log('🔄 Production mode: Redirecting to intranet login...');
            const currentUrl = window.location.href;
            const returnUrl = encodeURIComponent(currentUrl);
            window.location.href = '/intranet/login?return_url=' + returnUrl;
          }
          // Dev mode → แสดงหน้า Loginpage (ไม่ redirect)
          else if (this.isDev && !this.userData) {
            console.log('🔧 Dev mode: Show local login page');
          }
        }
      } catch (error) {
        console.error("❌ Error checking session:", error);
        
        // Production mode และไม่มี userData local → redirect
        if (!this.isDev && !this.userData) {
          console.log('🔄 Production mode: API error, redirecting to login...');
          const currentUrl = window.location.href;
          const returnUrl = encodeURIComponent(currentUrl);
          window.location.href = '/intranet/login?return_url=' + returnUrl;
        }
        // Dev mode หรือมี userData local → ไม่ต้องทำอะไร
        else {
          console.log('⚠️ Dev mode or have local userData, continue...');
        }
      }
    }
  }
}
</script>

<style></style>
