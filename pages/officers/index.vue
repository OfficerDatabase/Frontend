<template>
  <div>
    <v-row>
      <v-col cols="12" class="d-flex align-center">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              id="addOfficer"
              v-bind="attrs"
              class="bg-secondary mr-5"
              to="/officers/create"
              icon
              outlined
              fab
              v-on="on"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Add Officer</span>
        </v-tooltip>

        <v-autocomplete
          v-model="search.officer"
          :items="officersToComplete"
          :search-input.sync="searchOfficer"
          label="Search Officer"
          background-color="bg-accent"
          item-text="displayName"
          item-value="_id"
          hide-details
          hide-no-data
          outlined
          return-object
          auto-select-first
          dense
          @input="goToOfficer"
        />
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
          class="officer-card"
          color="bg-secondary"
          height="100%"
          outlined
        >
          <v-badge
            v-if="
              Date.now() < new Date(officer.created_at).getTime() + 259200000
            "
            color="secondary"
            content="NEW"
            inline
          />
          <v-list-item :to="`/officers/${officer._id}`" class="pa-0 ma-0">
            <v-list-item-content class="pa-0 ma-0">
              <v-img
                class="white--text align-end"
                :src="officer.picture"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title>{{ officer.fullname }}</v-card-title>
              </v-img>
              <v-card-text>
                <div v-if="officer.incidents.length > 0">
                  <div class="d-flex justify-space-between">
                    Incidents
                    <span>
                      {{ officer.incidents.length }}
                    </span>
                  </div>
                  <div class="d-flex justify-space-between">
                    Last Report
                    <Timeago :datetime="officer.latest_incident.created_at" />
                  </div>
                </div>
                <div v-else>No Incidents</div>
                <v-btn
                  class="mt-5"
                  text
                  outlined
                  block
                  @click.prevent="reportOfficer(i)"
                >
                  Report
                </v-btn>
              </v-card-text>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-pagination v-model="page" :length="pages" @input="movePage" />
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
  async asyncData({ $axios, query }) {
    const page = parseInt(query.page || 1)
    const res = await $axios.$get(`/api/officers?page=${page}`)
    return {
      officers: res.data,
      pages: res.pages,
      page,
    }
  },
  data() {
    return {
      searchOfficer: null,
      search: {
        officer: null,
        officerList: [],
      },
      officers: [],
      page: 1,
      pages: 1,
      loading: false,
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
  computed: {
    officersToComplete() {
      return this.search.officerList.map((officer) => ({
        displayName: `${officer.fullname} - ${officer.badge}`,
        _id: officer._id,
      }))
    },
  },
  watch: {
    searchOfficer() {
      if (this.officersToComplete.length > 0 || this.loading) return

      this.loading = true

      this.$axios
        .$get('/api/officers/list')
        .then(({ data }) => {
          this.search.officerList = data
        })
        .finally(() => (this.loading = false))
    },
  },
  mounted() {
    // this.$tours.myTour.start()
  },
  methods: {
    gotTop() {
      this.$vuetify.goTo(0)
    },
    async movePage() {
      const res = await this.$axios.$get(`/api/officers?page=${this.page}`)

      this.officers = res.data
      this.pages = res.pages

      await this.$router.push({
        query: { page: this.page.toString() },
      })
    },
    goToOfficer() {
      if (!this.search.officer) return
      this.$router.push({ path: `/officers/${this.search.officer._id}` })
    },
    async reportOfficer(index) {
      const officer = this.officers[index]
      await this.$router.push({
        path: '/incidents/create',
        query: {
          officer: officer.fullname,
          badge: officer.badge,
          _id: officer._id,
        },
      })
    },
  },
}
</script>

<style lang="scss">
.officer-card {
  position: relative;
  .v-badge {
    position: absolute;
    top: -10px;
    right: -20px;
    z-index: 1;
  }
}
</style>
