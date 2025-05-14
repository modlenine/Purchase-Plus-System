<template>
  <div id="app">
    <div v-if="userData !== null">
      <Header :userDataProps="this.userData" />
      <router-view></router-view>
    </div>

    <div v-else>
      <Loginpage />
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

      events: [
        'click', 'mousemove', 'mousedown', 'scroll', 'keypress', 'load'
      ],
      warningTimer: null,
      logoutTimer: null,
      intervalId: null,

      baseurl: '',
    }
  },
  created() {

  },
  mounted() {
    // เรียก check ทุก 5 วินาที
    const data = JSON.parse(localStorage.getItem("userData") || null);
    if (data && data.loginexpire) {
      this.intervalId = setInterval(() => {
        this.checkSessionExpiry();
      }, 5000);
    }
  },
  beforeUnmount() {

  },
  beforeUpdate() {

  },
  beforeDestroy() {

  },
  methods: {
    checkSessionExpiry() {
      const data = JSON.parse(localStorage.getItem("userData") || null);
      const now = Math.floor(Date.now() / 1000);
      console.log('Check Login Expire Progress');
      if (!data || now >= data.loginexpire) {
        clearInterval(this.intervalId); // ✅ หยุด interval
        localStorage.clear();
        location.reload();
      }
    },
  },
}
</script>

<style></style>