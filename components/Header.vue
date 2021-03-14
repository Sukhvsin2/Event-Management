<template>
  <v-container fluid class="navbar">
    <v-row class="align-center justify-space-between">
      <div class="heading">Lions Event</div>
      <div>
        <v-btn v-if="!isLoggedIn" to="/login">Login</v-btn>
        <v-btn v-else @click="isLoggedIn">Logout</v-btn>
      </div>
    </v-row>
  </v-container>
</template>

<script>
export default {
    name: 'Header',
    data(){
        return {
            isLoggedIn: false,
        }
    },
    mounted(){
        this.isLoggedIn = this.$store.getters.isAuthenticated;
        console.log(this.isLoggedIn);

    },
    methods: {
        // logout(){
        //     authStore.logout()
        //     this.$router.push({path: '/'})
        // }
    }
}
</script>

<style scoped>
.navbar{
    background-color: #2d3436 !important;
    border-radius: 5px;
    padding: 25px;
}
</style>