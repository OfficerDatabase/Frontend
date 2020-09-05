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
          hide-details
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
          hide-details
          cache-items=""
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
          hide-details
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
          hide-details
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
          hide-details
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
          :items="items.location.state"
          label="State"
          background-color="bg-accent"
          item-text="name"
          item-value="value"
          hide-details
          outlined
          return-object
          :disabled="!submitable"
          @input="changeCity"
        />
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="incidentData.location.city"
          :items="items.location.city"
          label="City"
          background-color="bg-accent"
          item-text="name"
          item-value="value"
          hide-details
          outlined
          eager
          return-object
          :disabled="!submitable"
        />
      </v-col>
      <v-col cols="6">
        <v-autocomplete
          v-model="incidentData.officer"
          :items="officers"
          :search-input.sync="searchOfficer"
          item-text="displayName"
          item-value="_id"
          label="Officer"
          background-color="bg-accent"
          hide-details
          hide-no-data
          outlined
          return-object
          auto-select-first
          :disabled="!submitable"
        />
      </v-col>
      <v-col cols="6">
        <v-menu
          ref="dateMenu"
          v-model="dateMenu"
          :close-on-content-click="false"
          :return-value.sync="incidentData.date"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="formatDate"
              label="Date"
              background-color="bg-accent"
              v-bind="attrs"
              outlined
              :disabled="!submitable"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="incidentData.date"
            color="bg-primary"
            no-title
            scrollable
            @input="$refs.dateMenu.save(incidentData.date)"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="dateMenu = false">Cancel</v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.dateMenu.save(incidentData.date)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
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
import * as location from '@/assets/state-city.json'

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
      dateMenu: null,
      officerList: [],
      loading: false,
      searchOfficer: null,
      incident: {
        officer: this.queryOfficer()[0],
        content: '',
        title: '',
        date: new Date().toISOString().substr(0, 10),
        created_by: {
          name: '',
          age: '',
          sex: '',
          ethnicity: '',
          height: '',
          weight: '',
        },
        location: {
          state: {},
          city: {},
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
          state: Object.keys(location.default).map((name, value) => ({
            name,
            value,
          })),
          city: location.default[
            !this.submitable
              ? this.data.location.state.name
              : Object.keys(location.default)[0]
          ].map((name, value) => ({
            name,
            value,
          })),
        },
      },
    }
  },
  computed: {
    incidentData() {
      const data = this.submitable ? this.incident : this.data

      if (data.officer && !data.officer.displayName) {
        data.officer = {
          displayName: `${data.officer.fullname} - ${data.officer.badge}`,
          _id: data.officer._id,
        }
      }

      return data
    },
    officers() {
      if (!this.submitable) {
        return [this.incidentData.officer]
      }
      return (this.officerList.length < 1
        ? this.queryOfficer()
        : this.officerList
      ).map((officer) => ({
        displayName: `${officer.fullname} - ${officer.badge}`,
        _id: officer._id,
      }))
    },
    selectedOfficer() {
      return this.incidentData.officer._id
    },
    formatDate() {
      if (!this.incidentData.date) {
        return undefined
      }
      return this.incidentData.date.substr(0, 10)
    },
  },
  watch: {
    searchOfficer() {
      if (!this.submitable || this.officers.length > 0 || this.loading) return

      this.loading = true

      this.$axios
        .$get('/api/officers/list')
        .then(({ data }) => {
          this.officerList = data
        })
        .finally(() => (this.loading = false))
    },
  },
  methods: {
    async submit() {
      try {
        this.$toasted.show('Creating report... please wait!')
        const { _id } = await this.$axios.$post('/api/incidents', {
          ...this.incident,
          officer: this.selectedOfficer,
        })
        await this.$router.push({ path: `/incidents/${_id}` })
        this.$toasted.success('Report created!')
      } catch {}
    },
    queryOfficer() {
      if (
        Object.keys(this.$route.query).every(
          (entry) => !['badge', 'officer', '_id'].includes(entry)
        )
      ) {
        return []
      }

      const { officer, badge, _id } = this.$route.query
      return [
        {
          fullname: officer,
          badge,
          _id,
        },
      ]
    },
    changeCity() {
      const { name } = this.incidentData.location.state
      this.items.location.city = location.default[name].map((name, value) => ({
        name,
        value,
      }))
      this.incidentData.location.city = location.default[name]
    },
  },
}
</script>
