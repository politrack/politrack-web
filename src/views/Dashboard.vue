<template>
  <div>
    <div class="header"></div>
    <div class="header-content">
      <v-container>
        <v-row class="px-5 mt-2" style="">
          <v-col cols="12" lg="6" sm="12">
            <v-card class="pa-3">
              <v-card-title>Politiker im Fokus</v-card-title>
              <trending-politicians></trending-politicians>
            </v-card>
          </v-col>
          <v-col cols="12" lg="6" sm="12">
            <quotes-card :politician="politician"></quotes-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div>
      <div class="headlines-container">
        <v-container>
          <v-row><h2 class="text--darken-2 mt-5">Schlagzeilen des Tages</h2></v-row>
          <v-row class="mt-5">
            <v-col cols="12" lg="4" sm="6" xl="3" v-for="(topic, idx) in topics" v-bind:key="idx">
              <news-headline :topic="topic"></news-headline>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div class="headlines-container">
        <div class="graph-container"></div>
        <v-container>
          <v-row class="py-5">
            <v-col cols="12" lg="6" sm="6">
              <v-card class="pa-3">
                <v-card-title>Parteien in den Medien</v-card-title>
                <parties-chart class="mt-5"></parties-chart>
              </v-card>
            </v-col>
            <v-col cols="12" lg="4" sm="12">
              <v-card class="pa-3">
                <v-card-title>Themenfokus</v-card-title>
                <topic-distribution :statistics="statistics" class="mt-5"></topic-distribution>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import trends from "../assets/trends.json";
import PartiesChart from "../components/dashboard/PartiesChart";
import TrendingPoliticians from "../components/dashboard/TrendingPoliticians";
import NewsHeadline from "../components/dashboard/NewsHeadline";
import QuotesCard from "../components/profiles/QuotesCard";
import TopicDistribution from "../components/profiles/TopicDistribution";

export default {
  name: "Dashboard",
  data: () => {
    return {
      politicians: trends.politicians,
      topics: trends.topics,
      politician: {'quotes': trends.quotes, 'first_name': 'Karl', 'last_name': 'Lauterbach'},
      statistics: {
        'topicDistribution': trends.topicDistribution
      }
    }
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

</style>