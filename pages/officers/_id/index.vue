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
          <v-card-title>{{ officer.fullname }}</v-card-title>
        </v-img>
        <v-card-text>
          <div>Incidents: {{ incidentCount }}</div>
          <div>Badge: {{ officer.badge }}</div>
          <div>Location: {{ officer.location }}</div>
          <v-btn class="mt-5" text outlined block>Report</v-btn>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" xd="12" sm="8" md="8" lg="8" xl="8">
      <v-card color="bg-accent">
        <v-subheader class="d-flex justify-space-between">
          <span>Incidents</span>
          <v-badge
            :content="incidentCount"
            :value="incidentCount"
            color="primary"
            inline
          />
        </v-subheader>
        <div v-for="(incident, i) in officer.incidents.data" :key="i">
          <v-divider />
          <v-list-item color="bg-secondary" :to="`/incidents/${incident._id}`">
            <v-card height="100%" width="100%" color="transparent" flat>
              <v-list-item-content>
                <v-list-item-title>{{ incident.title }}</v-list-item-title>
                <v-list-item-subtitle>
                  <Timeago :datetime="incident.created_at" />
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>{{ incident.content }}</v-list-item-content>
            </v-card>
          </v-list-item>
        </div>
        <div v-if="officer.incidents.data.length < 1">
          <v-divider />
          <v-list-item>
            <v-list-item-content class="grey--text text--lighten-1">
              No incidents found for this officer.
            </v-list-item-content>
          </v-list-item>
        </div>
        <div v-else>
          <v-divider />
          <v-card-text>
            <v-pagination
              v-model="page"
              :length="officer.incidents.pages"
              @input="movePage"
            />
          </v-card-text>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  async asyncData({ $axios, params, query }) {
    const page = parseInt(query.page || 1)
    const res = await $axios.$get(
      `/api/officers/${params.id}/incidents?page=${page}`
    )
    return {
      officer: {
        ...(await $axios.$get(`/api/officers/${params.id}`)).data,
        incidents: {
          data: res.data,
          pages: res.pages,
        },
      },
      incidentCount: res.incidentCount,
      page,
    }
  },
  data() {
    return {
      officer: {},
      page: 1,
      incidentCount: 0,
    }
  },
  methods: {
    async movePage() {
      const res = await this.$axios.$get(
        `/api/officers/${this.$route.params.id}/incidents?page=${this.page}`
      )

      this.officer.incidents.data = res.data
      this.pages = res.pages

      await this.$router.push({
        query: { page: this.page.toString() },
      })
    },
  },
}
</script>
