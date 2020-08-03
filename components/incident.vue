<template>
  <div>
    <v-subheader class="px-0 d-flex justify-space-between">
      <span>User information</span>
      <span v-if="!submitable">Incident #{{ incidentData._id }}</span>
    </v-subheader>
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="incidentData.created_by.name"
          label="Name"
          background-color="bg-accent"
          hide-details
          outlined
          :disabled="!submitable"
        />
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="incidentData.created_by.age"
          :items="items.age"
          label="Age"
          background-color="bg-accent"
          cache-items
          outlined
          :disabled="!submitable"
        />
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="incidentData.created_by.sex"
          :items="items.sex"
          label="Sex"
          background-color="bg-accent"
          cache-items
          outlined
          :disabled="!submitable"
        />
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="incidentData.created_by.ethnicity"
          :items="items.ethnicity"
          label="Ethnicity"
          background-color="bg-accent"
          cache-items
          outlined
          :disabled="!submitable"
        />
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="incidentData.created_by.weight"
          :items="items.weight"
          label="Weight"
          background-color="bg-accent"
          cache-items
          outlined
          :disabled="!submitable"
        />
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="incidentData.created_by.height"
          :items="items.height"
          label="Height"
          background-color="bg-accent"
          cache-items
          outlined
          :disabled="!submitable"
        />
      </v-col>
    </v-row>
    <v-subheader class="px-0">Report Details</v-subheader>
    <v-row>
      <v-col cols="6">
        <v-select
          v-model="incidentData.location.state"
          label="State"
          background-color="bg-accent"
          cache-items
          outlined
          :disabled="!submitable"
        />
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="incidentData.location.city"
          label="City"
          background-color="bg-accent"
          cache-items
          outlined
          :disabled="!submitable"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="incidentData.officer"
          label="Officer"
          background-color="bg-accent"
          hide-details
          outlined
          :disabled="!submitable"
        />
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="incidentData.title"
          label="Title"
          background-color="bg-accent"
          hide-details
          outlined
          :disabled="!submitable"
        />
      </v-col>
      <v-col cols="12">
        <v-textarea
          v-model="incidentData.content"
          label="Details"
          background-color="bg-accent"
          row-height="60px"
          auto-grow
          hide-details
          outlined
          :disabled="!submitable"
        />
      </v-col>
      <v-col v-if="submitable" cols="12">
        <v-btn text outlined @click="submit">
          Save
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Incident',
  props: {
    data: {
      type: Object,
      default() {
        return {
          created_by: {},
          location: {},
        }
      },
    },
    submitable: Boolean,
  },
  data() {
    return {
      incident: {
        officer: '',
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
  computed: {
    incidentData() {
      return this.submitable ? this.incident : this.data
    },
  },
  methods: {
    async submit() {
      try {
        this.$toasted.show('Creating report... please wait!')
        const { _id } = await this.$axios.$post('/api/incidents', this.incident)
        await this.$router.push({ path: `/incidents/${_id}` })
        this.$toasted.show('Report created!')
      } catch {}
    },
  },
}
</script>
