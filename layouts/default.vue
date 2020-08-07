<template>
  <v-app>
    <Navbar />
    <v-main class="bg-primary">
      <v-container>
        <v-breadcrumbs :items="path" />
        <vue-page-transition name="fade-in-up">
          <nuxt />
        </vue-page-transition>
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
  computed: {
    path() {
      const currentPath = this.$route.path.split('/')
      currentPath.shift()
      const paths = currentPath.map((path, i, array) => ({
        text: path,
        to: i !== 0 ? `/${array[i - 1]}/${path}` : `/${path}`,
        exact: true,
      }))

      if (currentPath[0] !== '') {
        paths.unshift({
          text: 'home',
          to: '/',
          exact: true,
        })
      }

      return paths
    },
  },
}
</script>

<style lang="scss">
.v-pagination li button {
  background: var(--v-bg-secondary-base) !important;
}
.v-pagination .v-pagination__item--active {
  background: var(--v-primary-base) !important;
}
</style>
