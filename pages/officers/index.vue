<template>
  <div>
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
          flat
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
    </v-row>
    <v-row v-else>
      <v-subheader>No officers found...</v-subheader>
    </v-row>
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
    }
  },
}
</script>
