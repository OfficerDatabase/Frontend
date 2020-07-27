<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-btn
          id="addOfficer"
          class="bg-secondary"
          to="/officers/create"
          text
          outlined
        >
          Add Officer
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="officers.length > 0">
      <v-col
        v-for="(officer, i) in officers"
        :key="i"
        cols="12"
        xs="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
      >
        <v-card
          :to="`/officers/${officer._id}`"
          color="bg-secondary"
          height="100%"
          outlined
        >
          <v-img
            class="white--text align-end"
            :src="officer.picture"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title>{{ officer.name }}</v-card-title>
          </v-img>
          <v-card-text>
            <div v-if="officer.incidents.length > 0">
              <div>Incidents {{ officer.incidents.length }}</div>
              <div>Last Report {{ officer.latest_incident }}</div>
            </div>
            <div v-else>No Incidents</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-pagination v-model="page" :length="15" :total-visible="8" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-subheader>No officers found...</v-subheader>
    </v-row>
    <v-tour name="myTour" :steps="tour" :callbacks="tourCallbacks" />
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    return {
      officers: (await $axios.$get('/api/officers')).data,
    }
  },
  data() {
    return {
      officers: [],
      page: 1,
      tourCallbacks: {
        onFinish: this.gotTop,
        onSkip: this.gotTop,
      },
      tour: [
        {
          target: '.v-card',
          header: {
            title: 'Officers',
          },
          content:
            'This is an officer and you can click it to see all their reports.',
          params: {
            placement: 'right',
            enableScrolling: false,
          },
        },
        {
          target: '#addOfficer',
          header: {
            title: "Can't find one?",
          },
          content:
            "If you can' find one of the officers you can just add it to database",
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
            'You can keep looking for the other officers in the other pages.',
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
    gotTop() {
      this.$vuetify.goTo(0)
    },
  },
}
</script>
