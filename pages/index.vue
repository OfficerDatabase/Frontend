<template>
  <div>
    <v-row class="d-flex align-center main-screen">
      <v-col cols="12" xs="12" sm="6" md="6" lg="5" xl="5">
        <h1>
          <span class="primary--text">Officer</span>
          <span class="secondary--text">DB</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu
          neque eget ligula congue mattis. Pellentesque lacinia lorem luctus,
          scelerisque mi sed, sagittis nunc. Etiam lacus diam, consectetur et
          tincidunt eu, vestibulum ac urna. Sed sit amet orci consequat,
          pharetra ante et, vehicula erat. Nam maximus, sapien at malesuada
          rutrum, dolor ex elementum nunc, sollicitudin ornare nisl arcu vitae
          quam. Pellentesque bibendum risus vel dolor pellentesque, et rutrum
          est vulputate. Proin ac arcu a ex sodales ultrices id a nisl. Cras
          eleifend augue vel felis ultricies, id lobortis lectus tincidunt. Nunc
          vitae semper risus.
        </p>
      </v-col>
      <v-col
        cols="12"
        xs="12"
        sm="6"
        md="6"
        lg="3"
        xl="3"
        offset-lg="3"
        offset-xl="3"
        class="align-self-start"
      >
        <v-list color="bg-secondary" outlined>
          <v-subheader>Latest Incidents</v-subheader>
          <v-divider />
          <div v-if="latestIncidents.length > 0">
            <v-list-item
              v-for="(incident, i) in latestIncidents"
              :key="i"
              class="white--text text-decoration-none"
              color="bg-primary"
              :to="`/incidents/${incident._id}`"
            >
              <v-list-item-content class="d-inline">
                <span class="yellow--text">
                  {{ incident.created_by.name }}
                </span>
                <span class="grey--text text--lighten-1"> reported </span>
                <span class="blue--text">{{ incident.officer.fullname }} </span>
                <Timeago
                  :datetime="incident.created_at"
                  class="grey--text text--lighten-1"
                />
              </v-list-item-content>
            </v-list-item>
            <v-list-item-action>
              <v-list-item-action-text>
                <nuxt-link to="/incidents">Read More!</nuxt-link>
              </v-list-item-action-text>
            </v-list-item-action>
          </div>
          <v-list-item v-else disabled>
            <v-list-item-content>
              No incidents found... Come back later!
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-row class="bg-secondary mx-1 mb-10">
      <v-col
        v-for="(stat, i) in stats"
        :key="i"
        cols="12"
        xs="12"
        sm="4"
        md="4"
        lg="4"
        xl="4"
        class="text-center"
      >
        <v-card
          height="100%"
          class="py-10"
          color="transparent"
          :to="stat.href"
          flat
        >
          <h2 class="capitalize">{{ stat.name }}</h2>
          <h1>
            <Timeago v-if="stat.time" :datetime="stat.value" />
            <span v-else>{{ stat.value }}</span>
          </h1>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const stats = (await $axios.$get('/api/stats')).data.map((stat) => {
      if (typeof stat.value === 'object' && stat.value.created_at) {
        stat.value = stat.value.created_at
        stat.time = true
      }

      return stat
    })

    return {
      latestIncidents: (await $axios.$get('/api/incidents/latest')).data,
      stats,
    }
  },
  data() {
    return {
      stats: [],
      latestIncidents: [],
    }
  },
}
</script>

<style>
.main-screen {
  min-height: 100vh;
}
</style>
