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
import Swal from 'sweetalert2'
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
      baseurl:'',
    }
  },
  created() {
    
  },
  mounted() {
   

  },
  beforeUnmount() {

  },
  beforeUpdate(){
 // ใช้ arrow function เพื่อเข้าถึง this ได้โดยตรง
    this.events.forEach(event => {
      window.addEventListener(event, this.checkLoginExpire());
    });

    this.checkLoginExpire();
  },
  methods: {

    checkLoginExpire(){
      const userData = JSON.parse(localStorage.getItem('userData'));
      const now = new Date().getTime();

      if (userData && userData.loginexpire) {
          if (now > userData.loginexpire) {
              // loginexpire หมดอายุแล้ว
              Swal.fire({
                title: 'Session หมดอายุ กรุณา Login ใหม่อีกครั้ง',
                icon: 'error',
                showConfirmButton: false,
                timer:2500
              }).then(function(){
                localStorage.removeItem('userData');
                location.reload();
              });
              // เพิ่มโค้ดสำหรับ redirect ไปหน้า login หรืออื่น ๆ
          } else {
              // ถ้า loginexpire ยังไม่หมดอายุ
              // อัพเดต loginexpire เพิ่มไปอีก 2 ชั่วโมงจากตอนนี้
              userData.loginexpire = now + 2 * 60 * 60 * 1000;
              localStorage.setItem('userData', JSON.stringify(userData));
          }
      }
    }
  },
}
</script>

<style>

</style>