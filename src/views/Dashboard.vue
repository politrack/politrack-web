<template>
  <v-container>
    <div>
      <v-row>
        <h2 class="grey--text text--darken-2">Politiker im Fokus</h2>
      </v-row>
      <v-row class="px-5 mt-2">
        <v-col cols="12" lg="6" sm="12">
          <trending-politicians></trending-politicians>
        </v-col>
      </v-row>

      <v-row><h2 class="grey--text text--darken-2 mt-5">Schlagzeilen des Tages</h2></v-row>
      <v-row class="mt-5">
        <v-col cols="12" lg="4" sm="6" xl="3" v-for="topic in topics">
          <news-headline :topic="topic"></news-headline>
        </v-col>
      </v-row>

      <v-row><h2 class="grey--text text--darken-2 mt-5">Parteien in den Medien</h2></v-row>
      <v-row class="px-5 mt-5">
        <v-col cols="12" lg="7" sm="6">
          <parties-chart></parties-chart>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import trends from "../assets/trends.json";
import PartiesChart from "../components/dashboard/PartiesChart";
import TrendingPoliticians from "../components/dashboard/TrendingPoliticians";
import NewsHeadline from "../components/dashboard/NewsHeadline";

export default {
  name: "Dashboard",
  data: () => {
    return {
      politicians: trends.politicians,
      topics: trends.topics
    }
  },
  components: {
    PartiesChart,
    TrendingPoliticians,
    NewsHeadline
  }
}
</script>

<style scoped>

</style>