<template>
  <div class="d-flex flex-column align-end">
    <v-autocomplete
        v-model="select"
        :loading="searchLoading"
        :items="searchItems"
        :search-input.sync="search"
        class="w-100"
        label="Nach Politiker:innen suchen"
        item-text="label"
        item-value="_id"
        hide-no-data
        hide-details
        solo
        prepend-inner-icon="fas fa-search"
        rounded>
      <template v-slot:item="data">
        <template v-if="typeof data.item !== 'object'">
          <v-list-item-content v-text="data.item">
            <v-list-item-title text="Keine Politiker mit diesem Namen gefunden."></v-list-item-title>
          </v-list-item-content>
        </template>
        <template v-else>
          <v-list-item-avatar
              :color="partyMap[data.item.party] ? partyMap[data.item.party].color : 'indigo'"
              class="text-h5 font-weight-light white--text avatar">
            <PoliticianImage :id="data.item._id"/>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title
                v-text="data.item.first_name + ' ' + data.item.last_name"></v-list-item-title>
            <v-list-item-subtitle v-if="partyMap[data.item.party]"
                                  v-text="partyMap[data.item.party].name"></v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </template>
    </v-autocomplete>
    <div class="d-flex mt-1">
      <div class="caption white--text ms-3">Andere suchten nach:</div>
      <v-carousel hide-delimiters vertical cycle :show-arrows="false" interval="2000" height="auto"
                  style="width: auto;">
        <v-carousel-item
            v-for="(text, i) in searchBarTexts"
            :key="i"
        >
          <div class="caption ms-1 white--text font-weight-bold">{{ text }}</div>
        </v-carousel-item>
      </v-carousel>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PoliticianImage from "../base/PoliticianImage";
import parties_config from "../../assets/parties.json"
import {debounce} from "../../js/utils";

export default {
  name: "SearchBar",
  components: {PoliticianImage},
  data() {
    return {
      partyMap: {},
      search: '',
      select: null,
      searchLoading: null,
      searchItems: [],
      searchBarTexts: ['Bärbel Bas', 'Robert Habeck', 'Alice Weidel', 'Angela Merkel', 'Karl Lauterbach']

    }
  },
  mounted() {
    parties_config.parties.forEach((party) => {
      this.partyMap[party.id] = {
        'name': party.label,
        'color': party.color
      }
    })
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
    querySelections: debounce(function(v) {
      console.count("requests")
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
    }, 200),
  }
}
</script>

<style scoped>

.w-100 {
  width: 100%;
}

/deep/ .v-icon.fas.fa-search {
  font-size: 16px;
}

.avatar {
  border: 2px solid #ffff;
}
</style>