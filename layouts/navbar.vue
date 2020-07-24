<template>
  <div>
    <v-navigation-drawer
      v-model="opened"
      color="bg-primary"
      fixed
      temporary
      app
    >
      <v-list>
        <v-list-item>
          <v-toolbar-title
            class="logo-title d-flex justify-center font-weight-bold"
          >
            <span>Officer</span>
            <span>Database</span>
          </v-toolbar-title>
        </v-list-item>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="bg-primary" fixed elevate-on-scroll app>
      <v-toolbar-title>
        <nuxt-link
          to="/"
          class="text-decoration-none logo-title d-flex justify-center"
        >
          <span>Officer</span>
          <span>Database</span>
        </nuxt-link>
      </v-toolbar-title>

      <v-spacer />

      <nuxt-link
        v-for="(item, i) in items"
        :key="i"
        active-class="active"
        :to="item.to"
        class="d-none d-sm-flex nav-item"
        exact
      >
        {{ item.title }}
      </nuxt-link>

      <v-app-bar-nav-icon class="d-flex d-sm-none" @click="toggleDrawer" />
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
          title: 'Incidents',
          to: '/incidents',
        },
        {
          title: 'Officers',
          to: '/officers',
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
  * {
    transition: color 200ms ease-in-out;
  }
  :first-child {
    color: var(--v-primary-base);
  }
  :last-child {
    color: var(--v-secondary-base);
  }

  &:hover {
    :last-child {
      color: var(--v-primary-base);
    }

    :first-child {
      color: var(--v-secondary-base);
    }
  }
}

.nav-item {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1.2rem;
  text-decoration: none;
  color: white;
  transition: color 200ms ease-in-out;

  &:hover {
    color: var(--v-secondary-base);
  }
}
.active {
  color: var(--v-secondary-base);
}
</style>
