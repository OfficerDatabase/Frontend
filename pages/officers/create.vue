<template>
  <div>
    <v-subheader class="px-0 d-flex justify-space-between">
      <span>Officer information</span>
    </v-subheader>
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="officer.fullname"
          label="Name"
          background-color="bg-accent"
          outlined
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="officer.badge"
          label="Badge"
          background-color="bg-accent"
          outlined
        />
      </v-col>
      <v-col cols="12">
        <v-file-input
          v-model="officer.picture"
          background-color="bg-accent"
          label="Picture"
          prepend-icon=""
          counter
          outlined
          show-size
        />
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="officer.location.state"
          :items="items.location.state"
          label="State"
          background-color="bg-accent"
          cache-items
          outlined
        />
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="officer.location.city"
          :items="items.location.city"
          label="City"
          background-color="bg-accent"
          cache-items
          outlined
        />
      </v-col>
      <v-col>
        <v-btn outlined @click="submit">Save</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      officer: {
        fullname: '',
        badge: '',
        picture: null,
        location: {
          state: '',
          city: '',
        },
      },
      items: {
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
        const formData = new FormData()
        Object.keys(this.officer).forEach((key) => {
          formData.append(key, this.officer[key])
        })

        await this.$axios.$post('/api/officers', formData, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        })
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>
