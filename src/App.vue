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
export default {
  name:"App",
  components:{
    Header,
    Loginpage
  },
  data() {
    return {
      userData:this.getSessionStorage(),
    }
  },
  created() {
    
  },
  mounted() {

  },
  beforeUpdate(){

  },
  methods: {

  },
}
</script>

<style>

</style>