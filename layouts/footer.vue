<template>
  <v-footer padless>
    <v-card color="bg-opaque" width="100%" flat tile>
      <v-card-text>
        <v-row class="text-center">
          <v-col cols="12" xs="12" sm="6">
            <h1>Officer Database</h1>
            <p>Where bad conduct gets reported</p>
          </v-col>
          <v-col cols="12" xs="12" sm="6" class="links">
            <nuxt-link to="/toc">Terms & Condition</nuxt-link>
            <nuxt-link to="/status">Status</nuxt-link>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-card-text class="text-center">
        &copy; {{ new Date().getFullYear() }} — OfficerDB
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style lang="scss">
.links {
  * {
    display: block;
  }
}
</style>
