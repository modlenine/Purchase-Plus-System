<template>
  <div id="app">
    <div v-if="userData !== null">
      <Header :userDataProps="userData" />
      <router-view></router-view>
    </div>
    <div v-else>
      <!-- Redirecting to Intranet login... -->
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: "App",
  components: {
    Header
  },
  data() {
    return {
      userData: this.getSessionStorage(),
      url: this.getUrl()
    }
  },
  methods: {
    getSessionStorage() {
      const getUserData = localStorage.getItem("userData");
      return JSON.parse(getUserData);
    }
  }
}
</script>

<style></style>
