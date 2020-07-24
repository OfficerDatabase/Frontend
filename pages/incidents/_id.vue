<template>
  <div>
    <v-subheader class="px-0 d-flex justify-space-between">
      <span>User information</span>
      <span>Incident #{{ incident._id }}</span>
    </v-subheader>
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="incident.created_by.name"
          label="Name"
          background-color="bg-accent"
          hide-details
          outlined
          disabled
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="incident.created_by.age"
          label="Age"
          background-color="bg-accent"
          hide-details
          outlined
          disabled
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="incident.created_by.sex"
          label="Sex"
          background-color="bg-accent"
          hide-details
          outlined
          disabled
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="incident.created_by.ethnicity"
          label="Ethnicity"
          background-color="bg-accent"
          hide-details
          outlined
          disabled
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="incident.created_by.weight"
          label="Weight"
          background-color="bg-accent"
          hide-details
          outlined
          disabled
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="incident.created_by.height"
          label="Height"
          background-color="bg-accent"
          hide-details
          outlined
          disabled
        />
      </v-col>
    </v-row>
    <v-subheader class="px-0">Report Details</v-subheader>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="incident.title"
          label="Title"
          background-color="bg-accent"
          hide-details
          outlined
          disabled
        />
      </v-col>
      <v-col cols="12">
        <v-textarea
          v-model="incident.content"
          label="Details"
          background-color="bg-accent"
          height="300px"
          auto-grow
          hide-details
          outlined
          disabled
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    return {
      incident: (await $axios.$get(`/api/incidents/${params.id}`)).data,
    }
  },
  data() {
    return { incident: {} }
  },
}
</script>
