<template>
  <div id="app">
    <!-- รอโหลดข้อมูล userData ก่อนแสดง router-view -->
    <div v-if="userDataChecked">
      <div v-if="userData">
        <Header :userDataProps="userData" />
        <router-view></router-view>
      </div>
      <div v-else>
        <Loginpage />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Loginpage from '@/views/Loginpage.vue'
import axios from 'axios'

export default {
  name: "App",
  components: {
    Header,
    Loginpage
  },
  data() {
    return {
      userData: null,
      userDataChecked: false,  // flag เพื่อบอกว่าเช็ก userData เสร็จแล้ว
      url:this.getUrl(),
      intervalId: null
    }
  },
  created() {
    this.checkUserData();
  },
  mounted() {
    // ไม่ต้องเช็กซ้ำแล้ว เพราะเราเช็กใน created()
    // แต่ถ้ามี session เราจะ setInterval เพื่อเช็กหมดอายุ
    if (this.userData && this.userData.loginexpire) {
      this.intervalId = setInterval(() => {
        this.checkSessionExpiry();
      }, 5000);
    }
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
  methods: {
    async checkUserData() {
      try {
        // 🔍 1. เช็ก userData ใน localStorage ก่อน
        const localData = JSON.parse(localStorage.getItem("userData") || null);
        if (localData) {
          this.userData = localData;
          this.userDataChecked = true;
          return;
        }

        // 🔍 2. ถ้าไม่มี localData → เรียก backend เช็ก session
        const res = await axios.get(this.url+'intsys/purchaseplus/purchaseplus_backend/login/checksession', {
          withCredentials: true // ส่ง cookie session ไปด้วย
        });
        const result = res.data;

        if (result.sessionActive && result.session_data) {
          // ✅ 3. ถ้ามี session backend → สร้าง userData ใหม่
          
					let sessionData = result.session_data;


					let userData = {
						'Dept':sessionData.Dept,
						'DeptCode':sessionData.DeptCode,
						'Fname':sessionData.Fname,
						'Lname':sessionData.Lname,
						'ecode':sessionData.ecode,
						'file_img':sessionData.file_img,
						'memberemail':sessionData.memberemail,
						'posi':sessionData.posi,
						'username':sessionData.username,

						'loginexpire':res.data.loginexpire,
						'loginexpire_con':res.data.loginexpire_con,
						'timeNow':res.data.timeNow,
						'timeNow_con':res.data.timeNow_con
					}

					localStorage.setItem('userData' , JSON.stringify(userData));

          this.userData = userData;
          this.userDataChecked = true;
        } else {
          // ❌ 4. ถ้าไม่มี session backend → redirect หน้า Login
          localStorage.clear();
          this.userData = null;
          this.userDataChecked = true;
          // ถ้าอยากให้ redirect หน้านี้ไป login page เลย ก็ใช้ router push ได้
          // this.$router.push('/login');
        }
      } catch (error) {
        console.error("Error checking backend session:", error);
        localStorage.clear();
        this.userData = null;
        this.userDataChecked = true;
      }
    },
    checkSessionExpiry() {
      const data = JSON.parse(localStorage.getItem("userData") || null);
      const now = Math.floor(Date.now() / 1000);
      console.log('Check Login Expire Progress');
      if (!data || now >= data.loginexpire) {
        clearInterval(this.intervalId);
        localStorage.clear();
        location.reload();
      }
    }
  }
}
</script>

<style></style>
