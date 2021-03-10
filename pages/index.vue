<template>
  <v-app>
    <Header/>
    <Calendar/>
  </v-app>
</template>

<script>
import Header from "../components/Header"
import Calendar from "../components/Calendar"

export default {
  name:"Home",
  components: {
    Header,
    Calendar
  }
}
</script>
