<template>
  <v-footer padless>
    <v-card color="bg-accent" width="100%" flat tile>
      <v-card-text>
        <v-row class="text-center">
          <v-col cols="12" xs="12" sm="4">
            <h1>Officer Database</h1>
            <span>Where bad conduct gets reported</span>
          </v-col>
          <v-col cols="12" xs="12" sm="4">
            <v-btn
              href="https://twitter.com/OfficerDatabase"
              target="_blank"
              icon
            >
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
            <v-btn
              href="https://www.instagram.com/officerdatabase/"
              target="_blank"
              icon
            >
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" xs="12" sm="4" class="links">
            <div>
              <nuxt-link to="/toc">
                Terms & Condition
              </nuxt-link>
              <a href="status.officerdb.com">Status</a>
            </div>
          </v-col>
        </v-row>
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
