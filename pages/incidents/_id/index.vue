<template>
  <Incident :data="incident" />
</template>

<script>
import Incident from '~/components/incident'
export default {
  components: { Incident },
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
