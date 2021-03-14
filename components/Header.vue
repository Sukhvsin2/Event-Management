<template>
  <v-container fluid class="navbar">
    <v-row class="align-center justify-space-between">
      <div class="heading"><v-btn text large dark @click="home">Lions Event</v-btn></div>
      <div>
        <v-btn dark v-if="isLoggedIn" @click="addEvents" icon><v-icon>mdi-pencil-plus</v-icon></v-btn>
        <v-btn v-if="!isLoggedIn" to="/login">Login</v-btn>
        <v-btn v-else @click="logout">Logout</v-btn>
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
        this.isLoggedIn = this.$store.getters.isAuthenticated.login;
    },
    methods: {
        logout(){
            this.$store.dispatch('logout')
            this.$router.push({path: '/'})
        },
        addEvents(){
          this.$router.push('/add-events')
        },
        home(){
          this.$router.push('/')
        }
    }
}
</script>

<style scoped>
.navbar{
    background-color: #2d3436 !important;
    padding: 25px;
}
</style>