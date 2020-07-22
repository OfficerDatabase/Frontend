<template>
  <v-app dark>
    <Navbar />
    <v-main class="background">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from './navbar'
import Footer from './footer'
export default {
  components: { Footer, Navbar },
}
</script>
