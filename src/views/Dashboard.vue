<template>
  <div>
    <div class="header"></div>
    <div class="header-content">
      <v-container>
        <v-row justify="center">
          <v-text-field rounded solo label="Suche" style="max-width: 300px"
                        prepend-inner-icon="fas fa-search">
          </v-text-field>
        </v-row>
        <v-row class="px-5 mt-2" style="">
          <v-col cols="12" lg="6" sm="6" xs="12">
            <v-card class="pa-3">
              <v-card-title>Politiker im Fokus</v-card-title>
              <trending-politicians></trending-politicians>
            </v-card>
          </v-col>
          <v-col cols="12" lg="6" sm="6" xs="12">
            <quotes-card :quotes="quotes" v-if="quotes"></quotes-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div>
      <div class="headlines-container">
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
            <v-btn text outlined rounded class="mt-3 ">Entdecke alle Schlagzeilen</v-btn>
          </v-row>
        </v-container>
      </div>
      <div class="headlines-container">
        <div class="graph-container"></div>
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

export default {
  name: "Dashboard",
  data: () => {
    return {
      politicians: null,
      topics: null,
      quotes: null,
      statistics: null,
      partiesData: null
    }
  },
  mounted() {
    axios.get('http://localhost:5000/web/data/trends.json').then((data) => {
      this.topics = data.data['topics']
      console.log(data.data)
      this.politcians = data.data['politicians']
      this.quotes = data.data.quotes
      this.statistics = {
        'topicDistribution': data.data.topicDistribution
      }
      this.partiesData = data.data['parties']
      this.quotes = data.data['quotes']
    })
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
  background: #eeeeee;
  clip-path: polygon(0 0, 100% 0, 100% 75%, 0 100%);
  position: absolute;
  height: 350px;
  margin-top: -64px;
  width: 100%;
}

.headlines-container {
  background-color: #F1FAEE;
  padding-bottom: 60px;
}

.header-content {
  background-color: #F1FAEE;
}

.graph-container {
  clip-path: polygon(0 20%, 100% 30%, 100% 100%, 0 100%);
  position: absolute;
  width: 100%;
  height: 600px;
  background-color: #457B9D;
}

/deep/ .v-icon.fas.fa-search {
  font-size: 16px;
}

</style>