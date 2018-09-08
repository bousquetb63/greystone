<template>
  <v-app>
    <Header />
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue"
export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {
    Header,
  }
}
</script>
