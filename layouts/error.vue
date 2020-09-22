<template>
  <div class="errorContainer">
    <div>
      <h1 class="errorCode">{{ error.statusCode }}</h1>
      <h1 class="text-center">{{ reason }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      reason: this.error.statusCode === 404 ? 'Not Found' : 'An error occurred',
    }
  },
  head() {
    return {
      title: `${this.error.statusCode} - ${this.reason}`,
    }
  },
}
</script>

<style scoped>
.errorContainer {
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.errorCode {
  font-size: 35vw;
  line-height: 25vw;
}
</style>
