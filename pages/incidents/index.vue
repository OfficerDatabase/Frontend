<template>
  <v-row>
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
      <v-card
        height="100%"
        color="bg-accent"
        :to="`/incidents/${incident._id}`"
      >
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
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    return {
      incidents: (await $axios.$get('/api/incidents')).data,
    }
  },
  data() {
    return { incidents: [] }
  },
  methods: {
    trimContent(text = '') {
      const maxLength = 10
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
  },
}
</script>
