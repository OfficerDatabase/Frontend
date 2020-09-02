<template>
  <Incident :data="incident" />
</template>

<script>
import Incident from '~/components/incident'
export default {
  components: { Incident },
  async asyncData({ $axios, params }) {
    const incident = (await $axios.$get(`/api/incidents/${params.id}`)).data
    return {
      incident,
    }
  },
  data() {
    return { incident: {} }
  },
}
</script>
