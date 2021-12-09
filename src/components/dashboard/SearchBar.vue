<template>
  <v-autocomplete
      v-model="select"
      :loading="searchLoading"
      :items="searchItems"
      :search-input.sync="search"
      label="z.B. Robert Habeck"
      item-text="label"
      item-value="_id"
      hide-no-data
      hide-details
      solo
      prepend-inner-icon="fas fa-search"
      rounded>
    <template v-slot:item="{ item }">
      <v-list-item-avatar
          :color="partyMap[item.party] ? partyMap[item.party].color : 'indigo'"
          class="text-h5 font-weight-light white--text avatar">
        <v-img
            alt="Avatar"
            :src="'https://image.facethefacts-api.de/' + item._id + '.jpg'">
          <template v-slot:placeholder>
            <v-row
                class="fill-height ma-0 white--text"
                align="center"
                justify="center">
              {{ item.first_name.charAt(0) + item.last_name.charAt(0) }}
            </v-row>
          </template>
        </v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-text="item.first_name + ' ' + item.last_name"></v-list-item-title>
        <v-list-item-subtitle v-if="partyMap[item.party]"
                              v-text="partyMap[item.party].name"></v-list-item-subtitle>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
import axios from "axios";

export default {
  name: "SearchBar",
  props: {
    partyMap: Object
  },
  data() {
    return {
      search: '',
      select: null,
      searchLoading: null,
      searchItems: [],
    }
  },
  watch: {
    search(val) {
      val && this.querySelections(val)
    },
    select(val) {
      this.$router.push('/politician/' + val)
    }
  },
  methods: {
    querySelections(v) {
      this.searchLoading = true
      axios.get(process.env.VUE_APP_URL + '/web/search', {
        params: {'query': v}
      }).then((data) => {
        let result = data.data
        if (result['politicians'].length > 0) {
          this.searchItems = result['politicians']
        }
        this.searchLoading = false
      })
    },
  }
}
</script>

<style scoped>

/deep/ .v-icon.fas.fa-search {
  font-size: 16px;
}

.avatar {
  border: 2px solid #ffff;
}
</style>