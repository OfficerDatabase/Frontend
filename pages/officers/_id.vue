<template>
  <v-row>
    <v-col cols="12" xs="12" sm="4" md="4" lg="4" xl="4">
      <v-card color="bg-secondary" flat>
        <v-img
          class="white--text align-end"
          :src="officer.picture"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="300px"
        >
          <v-card-title>{{ officer.name }}</v-card-title>
        </v-img>
        <v-card-text>
          <div>Incidents: {{ officer.incidents.length }}</div>
          <div>Badge: {{ officer.badge }}</div>
          <div>Location: {{ officer.location }}</div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" xd="12" sm="8" md="8" lg="8" xl="8">
      <v-card color="bg-accent">
        <v-subheader>Incidents</v-subheader>
        <div v-for="(incident, i) in officer.incidents" :key="i">
          <v-divider />
          <v-card color="bg-secondary" :to="`/incidents/${incident._id}`" flat>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ incident.title }}</v-list-item-title>
                <v-list-item-subtitle>
                  <Timeago :datetime="incident.created_at" />
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-card-text>{{ incident.content }}</v-card-text>
          </v-card>
        </div>
        <div v-if="officer.incidents.length < 1">
          <v-divider />
          <v-list-item>
            <v-list-item-content class="grey--text text--lighten-1">
              No incidents found for this officer.
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    return {
      officer: {
        ...(await $axios.$get(`/api/officers/${params.id}`)).data,
        incidents: (await $axios.$get(`/api/officers/${params.id}/incidents`))
          .data.incidents,
      },
    }
  },
  data() {
    return {
      officer: {},
    }
  },
}
</script>
