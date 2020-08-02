<template>
  <div>
    <v-subheader class="px-0 d-flex justify-space-between">
      <span>User information</span>
    </v-subheader>
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="incident.created_by.name"
          label="Name"
          background-color="bg-accent"
          outlined
        />
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="incident.created_by.age"
          :items="items.age"
          label="Age"
          background-color="bg-accent"
          cache-items
          outlined
        />
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="incident.created_by.sex"
          :items="items.sex"
          label="Sex"
          background-color="bg-accent"
          cache-items
          outlined
        />
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="incident.created_by.ethnicity"
          :items="items.ethnicity"
          label="Ethnicity"
          background-color="bg-accent"
          cache-items
          outlined
        />
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="incident.created_by.weight"
          :items="items.weight"
          label="Weight"
          background-color="bg-accent"
          cache-items
          outlined
        />
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="incident.created_by.height"
          :items="items.height"
          label="Height"
          background-color="bg-accent"
          cache-items
          outlined
        />
      </v-col>
    </v-row>
    <v-subheader class="px-0">Report Details</v-subheader>
    <v-row>
      <v-col cols="6">
        <v-select
          v-model="incident.location.state"
          :items="items.location.state"
          label="State"
          background-color="bg-accent"
          cache-items
          outlined
        />
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="incident.location.city"
          :items="items.location.city"
          label="City"
          background-color="bg-accent"
          cache-items
          outlined
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="incident.title"
          label="Title"
          background-color="bg-accent"
          outlined
        />
      </v-col>
      <v-col cols="12">
        <v-textarea
          v-model="incident.content"
          label="Details"
          background-color="bg-accent"
          row-height="60px"
          auto-grow
          outlined
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      incident: {
        content: '',
        title: '',
        created_by: {
          name: '',
          age: '',
          sex: '',
          ethnicity: '',
          height: '',
          weight: '',
        },
        location: {
          state: '',
          city: '',
        },
      },
      items: {
        age: ['< 18', '18-24', '25-34', '35-44', '44 >'],
        sex: ['Male', 'Female', 'Other'],
        ethnicity: [
          'White',
          'Black or African American',
          'Native American or American Indian',
          'Asian / Pacific Islander',
          'Hispanic or Latino',
          'Other',
        ],
        height: ['< 5.0', '5.1-5.11', '6.0 >'],
        weight: ['< 120', '121-150', '151-199', '200+'],
        location: {
          state: [],
          city: [],
        },
      },
    }
  },
  methods: {
    async submit() {
      try {
        await this.$axios.$post('/api/incidents')
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>
