<template>
  <v-row>
    <v-col cols="12">
      <v-btn
        id="addIncident"
        class="bg-secondary"
        to="/incidents/create"
        text
        outlined
      >
        Make a Report
      </v-btn>
    </v-col>
    <v-col
      v-for="(incident, i) in incidents"
      :key="i"
      cols="12"
      xs="12"
      sm="6"
      md="4"
      lg="4"
      xl="4"
    >
      <v-card height="100%" color="bg-accent" outlined>
        <v-list-item :to="`/incidents/${incident._id}`" class="pa-0 ma-0">
          <v-list-item-content class="pa-0 ma-0">
            <v-card-title
              :title="incident.title"
              class="d-flex justify-space-between"
            >
              <span>{{ trimTitle(incident.title) || 'Untitled' }}</span>
              <span>#{{ incident._id }}</span>
            </v-card-title>
            <v-card-subtitle>
              <Timeago :datetime="incident.created_at" />
            </v-card-subtitle>
            <v-divider />
            <v-card-text>
              {{ trimContent(incident.content) || 'No content' }}
            </v-card-text>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-pagination v-model="page" :length="pages" @input="movePage" />
    </v-col>
    <v-tour name="myTour" :steps="tour" :callbacks="tourCallbacks" />
  </v-row>
</template>

<script>
export default {
  async asyncData({ $axios, query }) {
    const page = parseInt(query.page || 1)
    const res = await $axios.$get(`/api/incidents?page=${page}`)
    return {
      incidents: res.data,
      pages: res.pages,
      page,
    }
  },
  data() {
    return {
      incidents: [],
      page: 1,
      pages: 1,
      tourCallbacks: {
        onFinish: this.gotTop,
        onSkip: this.gotTop,
      },
      tour: [
        {
          target: '.v-card',
          header: {
            title: 'Incidents',
          },
          content:
            'This is a user created report to an officer. Click the card to see more details about the report.',
          params: {
            placement: 'bottom',
            enableScrolling: false,
          },
        },
        {
          target: '#addIncident',
          header: {
            title: 'Want to make one?',
          },
          content:
            'If you want to report an officer you can click this button to fill out the incident form.',
          params: {
            placement: 'bottom',
            enableScrolling: false,
          },
        },
        {
          target: '.v-pagination',
          header: {
            title: 'More...',
          },
          content:
            'You can keep looking for the other incidents in the other pages.',
          params: {
            placement: 'top',
          },
        },
      ],
    }
  },
  mounted() {
    this.$tours.myTour.start()
  },
  methods: {
    trimContent(text = '') {
      const maxLength = 200
      let newContent = text.substring(0, maxLength)
      if (text.length > maxLength) {
        newContent += '...'
      }
      return newContent
    },
    trimTitle(text = '') {
      const maxLength = 30
      let newContent = text.substring(0, maxLength)
      if (text.length > maxLength) {
        newContent += '...'
      }
      return newContent
    },
    gotTop() {
      this.$vuetify.goTo(0)
    },
    async movePage() {
      const res = await this.$axios.$get(`/api/incidents?page=${this.page}`)

      this.incidents = res.data
      this.pages = res.pages

      await this.$router.push({
        query: { page: this.page.toString() },
      })
    },
  },
}
</script>
