import Vue from 'vue'

export default function ({ $axios }) {
  $axios.onError((err) => {
    const { error } = err.response.data
    Vue.toasted.error(error)
  })
}
