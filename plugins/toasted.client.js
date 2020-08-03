import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
  keepOnHover: true,
  duration: 5000,
  action: {
    text: 'Close',
    onClick: (e, toastObject) => {
      toastObject.goAway(0)
    },
  },
})
