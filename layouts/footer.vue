<template>
  <v-footer padless>
    <v-card color="bg-accent" width="100%" flat tile>
      <v-card-text>
        <v-row class="text-center">
          <v-col cols="12" xs="12" sm="4">
            <nuxt-link class="text-decoration-none text-secondary--text" to="/">
              <h1>Officer Database</h1>
              <span>Where bad conduct gets reported</span>
            </nuxt-link>
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
            <v-btn
              href="https://github.com/OfficerDatabase"
              target="_blank"
              icon
            >
              <v-icon>mdi-github</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" xs="12" sm="4" class="links">
            <div class="footer-links">
              <nuxt-link class="text-decoration-none" to="/terms">
                Terms & Condition
              </nuxt-link>
              <a
                class="text-decoration-none"
                href="https://status.officerdb.com"
                target="_blank"
              >
                Status
              </a>
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

.v-footer {
  a {
    transition: opacity 200ms ease-in-out !important;
    opacity: 65% !important;
  }

  &:hover {
    a {
      opacity: 100% !important;
    }
  }

  .footer-links {
    a {
      color: var(--v-text-secondary-base) !important;

      &:hover {
        text-decoration: underline !important;
      }
    }
  }
}
</style>
