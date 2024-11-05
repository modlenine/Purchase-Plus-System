<template>
  <div id="app">
    <div v-if="userData !== null">
      <Header
        :userDataProps="this.userData"
      />
      <router-view></router-view>
    </div>

    <div v-else>
      <Loginpage/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Loginpage from '@/views/Loginpage.vue'
// import Swal from 'sweetalert2'
export default {
  name:"App",
  components:{
    Header,
    Loginpage
  },
  data() {
    return {
      userData:this.getSessionStorage(),

      events:[
        'click' , 'mousemove' , 'mousedown' , 'scroll' , 'keypress' , 'load'
      ],
      warningTimer:null,
		  logoutTimer:null,
      hasAlerted: false, // เพิ่มตัวแปรเพื่อตรวจสอบการแสดง Swal


      baseurl:'',
    }
  },
  created() {
    this.checkSessionExpiry(); // เช็ก session ตอนเข้าโปรแกรม
      // เริ่มจับการเคลื่อนไหวเมื่อหน้าโหลดแล้ว
    this.setupActivityListeners();
  },
  mounted() {
   

  },
  beforeUnmount() {

  },
  beforeUpdate(){

  },
  beforeDestroy() {
    // ลบ event listeners เมื่อออกจากหน้าเว็บ
    this.events.forEach(event => {
      window.removeEventListener(event, this.resetTimer);
    });
  },
  methods: {
    checkSessionExpiry() {
      if (this.userData && this.userData.timeExpire) {
        const currentTime = Math.floor(Date.now() / 1000); // เวลาปัจจุบันเป็น timestamp
        const timeExpire = this.userData.timeExpire; // เวลาหมดอายุ

        if (timeExpire <= currentTime && !this.hasAlerted) {
          // ถ้าเวลาหมดอายุแล้ว
          this.hasAlerted = true; // ตั้งค่าเพื่อป้องกันการแสดงซ้ำ
          localStorage.removeItem('userData'); // ลบข้อมูลจาก localStorage
          location.reload();
          // Swal.fire({
					// 	title: 'Session หมดอายุกรุณา Login ใหม่อีกครั้ง',
					// 	icon: 'warning',
					// 	showConfirmButton: true,
					// 	timer:2500
					// }).then(function(){
          //   location.reload();
					// });
        }
      }
    },
    setupActivityListeners() {
      // เพิ่ม event listeners เพื่อตรวจสอบการทำกิจกรรมของ user
      this.events.forEach(event => {
        window.addEventListener(event, this.resetTimer);
      });
    },
    resetTimer() {
      // เมื่อมีการเคลื่อนไหว ตรวจสอบ session ใหม่ทุกครั้ง
      this.checkSessionExpiry();
    },
  },
}
</script>

<style>

</style>