<template>
  <v-app>
    <Navbar />
    <v-main class="bg-primary">
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
