<template>
  <div>
    <div class="header headerColor"></div>
    <div class="header-content content1">
      <v-container>
        <v-row justify="center">
          <v-autocomplete
              v-model="select"
              :loading="searchLoading"
              :items="searchItems"
              :search-input.sync="search"
              style="max-width: 400px"
              label="z.B. Robert Habeck"
              item-text="label"
              item-value="_id"
              hide-no-data
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
        </v-row>
        <v-row class="px-5 mt-2" style="">
          <v-col cols="12" lg="6" sm="6" xs="12">
            <v-card class="pa-3">
              <v-card-title>Politiker im Fokus</v-card-title>
              <trending-politicians v-if="politicians" :data="politicians"></trending-politicians>
            </v-card>
          </v-col>
          <v-col cols="12" lg="6" sm="6" xs="12">
            <quotes-card :quotes="quotes" v-if="quotes"></quotes-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div>
      <div class="content-container content1">
        <v-container v-if="topics">
          <v-row><h2 class="text--darken-2 mt-5">Schlagzeilen des Tages</h2></v-row>
          <v-row class="mt-5">
            <v-slide-group
                class="overflow-y-visible"
                multiple
                show-arrows>
              <v-slide-item v-for="(topic, idx) in topics" v-bind:key="idx">
                <div class="pa-2 h-100">
                  <news-headline :topic="topic"></news-headline>
                </div>
              </v-slide-item>
            </v-slide-group>
          </v-row>
          <v-row justify="center">
            <v-btn flat outlined rounded class="mt-3 ">Entdecke alle Schlagzeilen</v-btn>
          </v-row>
        </v-container>
      </div>
      <div class="content-container content1">
        <div class="graph-container content2"></div>
        <v-container>
          <v-row class="">
            <v-col cols="12" lg="6" sm="6">
              <v-card class="pa-3">
                <v-card-title>Parteien in den Medien</v-card-title>
                <parties-chart class="mt-5" :data="partiesData"></parties-chart>
              </v-card>
            </v-col>
            <v-col cols="12" lg="4" sm="12">
              <v-card class="pa-3">
                <v-card-title>Themenfokus</v-card-title>
                <topic-distribution v-if="statistics" :statistics="statistics" class="mt-5" :light="false"/>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import PartiesChart from "../components/dashboard/PartiesChart";
import TrendingPoliticians from "../components/dashboard/TrendingPoliticians";
import NewsHeadline from "../components/dashboard/NewsHeadline";
import QuotesCard from "../components/profiles/QuotesCard";
import TopicDistribution from "../components/profiles/TopicDistribution";
import axios from 'axios'
import parties_config from "../assets/parties.json"

export default {
  name: "Dashboard",
  data: () => {
    return {
      search: '',
      select: null,
      searchLoading: null,
      searchItems: [],
      politicians: null,
      topics: null,
      quotes: null,
      statistics: null,
      partiesData: null,
      partyMap: {}
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
  mounted() {
    parties_config.parties.forEach((party) => {
      this.partyMap[party.id] = {
        'name': party.label,
        'color': party.color
      }
    })
    axios.get('http://localhost:5000/web/data/trends.json').then((data) => {
      this.topics = data.data['topics']
      console.log(data.data)
      this.politicians = data.data['politicians'].map((x) => {
        x['party'] = this.partyMap[x['party']]
        return x
      })
      this.quotes = data.data.quotes
      this.statistics = {
        'topicDistribution': data.data.topicDistribution
      }
      this.partiesData = data.data['parties']
      this.quotes = data.data['quotes']
      console.log(this.partyMap)
    })
  },
  methods: {
    querySelections(v) {
      this.searchLoading = true
      axios.get('http://localhost:5000/web/search', {
        params: {'query': v}
      }).then((data) => {
        let result = data.data
        if (result['politicians'].length > 0) {
          this.searchItems = result['politicians']
        }
        this.searchLoading = false
      })
    },
  },
  components: {
    TopicDistribution,
    PartiesChart,
    TrendingPoliticians,
    NewsHeadline,
    QuotesCard
  }
}
</script>

<style scoped>

.header {
  clip-path: polygon(0 0, 100% 0, 100% 75%, 0 100%);
  position: absolute;
  height: 350px;
  margin-top: -64px;
  width: 100%;
}

.content-container {
  padding-bottom: 60px;
}

.graph-container {
  clip-path: polygon(0 20%, 100% 30%, 100% 100%, 0 100%);
  position: absolute;
  width: 100%;
  height: 600px;
}

/deep/ .v-icon.fas.fa-search {
  font-size: 16px;
}

.avatar {
  border: 2px solid #ffff;
}

</style>