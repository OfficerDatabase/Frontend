<template>
  <div>
    <v-navigation-drawer
      v-model="opened"
      color="background"
      fixed
      temporary
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="background" fixed elevate-on-scroll app>
      <v-app-bar-nav-icon class="d-flex d-sm-none" @click="toggleDrawer" />

      <v-toolbar-title>
        <nuxt-link to="/" class="text-decoration-none logo-title">
          <span>Officer</span>
          <span>Database</span>
        </nuxt-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn to="/reports" text>
        Reports
      </v-btn>

      <v-btn to="/officers" text>
        Officers
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      opened: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
    }
  },
  methods: {
    toggleDrawer() {
      this.opened = !this.opened
    },
  },
}
</script>

<style lang="scss">
.logo-title {
  transition: color 200ms ease-in-out;
  :first-child {
    color: var(--v-primary-base);
  }
  :last-child {
    color: var(--v-secondary-base);
  }

  :hover {
    :last-child {
      color: var(--v-primary-base);
    }
    :first-child {
      color: var(--v-secondary-base);
    }
  }
}
</style>
