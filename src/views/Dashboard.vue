<template>
  <div>
    <div class="header-content">
      <v-container class="py-5">
        <v-row>
          <v-col lg="12" class="align-self-center">
            <v-card class="rounded d-flex header-card align-center rounded-xl" rounded elevation="2">
              <v-sheet
                  class="sheet mx-auto transition-swing rounded-circle pa-0"
                  height="250"
                  width="250"
                  elevation="0"
              >
                <v-img
                    src="../assets/img/news.png"
                    contain
                    alt="Nachrichten"/>
              </v-sheet>
              <p>
                Mithilfe von künstlicher Intelligenz haben wir Artikel über politisch relevante Ereignisse nach Themen
                gruppiert. Diese Gruppierung erlaubt es uns verschiedene Auswertungen über Meinungen und
                Aüßerungen von Politikern zu erstellen. Gleichzeitig können wir
                die Berichterstattung zu bestimmten Ereignissen
                transparenter und übersichtlicher machen.
              </p>
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" lg="4">
            <SearchBar :partyMap="partyMap"/>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div>
      <div class="mt-5">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" v-if="topics">
              <v-row><h2 class="text--darken-2">Schlagzeilen</h2></v-row>
              <v-row class="mt-5">
                <TopicSlider :topics="topics"/>
              </v-row>
              <v-row justify="center">
                <v-btn outlined rounded class="mt-3">Entdecke alle Schlagzeilen</v-btn>
              </v-row>
            </v-col>
          </v-row>

          <v-row>
            <v-divider class="my-5"></v-divider>
          </v-row>

          <v-row align="center" class="ma-0">
            <v-col cols="12" lg="4" class="text-center">
              <h2>Zitate</h2>
            </v-col>
            <v-col cols="12" lg="8">
              <quotes-card :quotes="quotes" v-if="quotes"></quotes-card>
            </v-col>
          </v-row>
        </v-container>
        <div class="content-end"></div>
      </div>

    </div>
    <div class="py-5">
      <v-container>
        <v-row justify="center" class="mb-5">
          <h1>Statistiken von Heute</h1>
        </v-row>
        <v-row>
          <v-col cols="12" lg="6" sm="6" xs="12">
            <h3 class="text-center">Politiker im Fokus</h3>
            <trending-politicians v-if="politicians" :data="politicians"></trending-politicians>
          </v-col>

          <v-col cols="12" lg="6" sm="12">
              <h3 class="text-center">Themenfokus</h3>
              <topic-distribution v-if="statistics" :statistics="statistics" class="mt-5" :light="false"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="12" sm="12">
              <h3 class="text-center">Parteien in den Medien</h3>
              <PartiesChart class="mt-5" :partiesData="partiesData"/>
          </v-col>

        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import PartiesChart from "../components/dashboard/PartiesChart";
import TrendingPoliticians from "../components/dashboard/TrendingPoliticians";
import QuotesCard from "../components/profiles/QuotesCard";
import TopicDistribution from "../components/profiles/TopicDistribution";
import SearchBar from "../components/dashboard/SearchBar";
import TopicSlider from "../components/dashboard/TopicSlider";
import axios from 'axios'
import parties_config from "../assets/parties.json"

export default {
  name: "Dashboard",
  data() {
    return {
      politicians: null,
      topics: null,
      quotes: null,
      statistics: null,
      partiesData: null,
      partyMap: {}
    }
  },
  mounted() {
    parties_config.parties.forEach((party) => {
      this.partyMap[party.id] = {
        'name': party.label,
        'color': party.color
      }
    })
    axios.get(process.env.VUE_APP_URL + '/web/data/trends.json').then((data) => {
      this.topics = data.data['topics']
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
    });
  },
  components: {
    TopicDistribution,
    PartiesChart,
    TrendingPoliticians,
    QuotesCard,
    TopicSlider,
    SearchBar
  }
}
</script>

<style scoped>

.header-content {
  padding-top: 80px;
  padding-bottom: 10px;
  color: #efefef;
}

.content-start {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' transform='scale(1 -1)' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='300' preserveAspectRatio='none' viewBox='0 0 1440 300'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1055%26quot%3b)' fill='none'%3e%3cpath d='M 0%2c182 C 96%2c167.6 288%2c105 480%2c110 C 672%2c115 768%2c207.6 960%2c207 C 1152%2c206.4 1344%2c127 1440%2c107L1440 300L0 300z' fill='rgba(76%2c 201%2c 240%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c81 C 96%2c110.2 288%2c225.8 480%2c227 C 672%2c228.2 768%2c98.2 960%2c87 C 1152%2c75.8 1344%2c154.2 1440%2c171L1440 300L0 300z' fill='rgba(72%2c 149%2c 239%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c93 C 96%2c118.8 288%2c214.8 480%2c222 C 672%2c229.2 768%2c118.6 960%2c129 C 1152%2c139.4 1344%2c245 1440%2c274L1440 300L0 300z' fill='rgba(247%2c 37%2c 133%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c113 C 96%2c145.2 288%2c269.2 480%2c274 C 672%2c278.8 768%2c159 960%2c137 C 1152%2c115 1344%2c158.6 1440%2c164L1440 300L0 300z' fill='rgba(239%2c 239%2c 239%2c 1)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1055'%3e%3crect width='1440' height='300' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
  background-size: 100% 100%;
  height: 4em;
}

.content-end {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' transform='scale(-1 1)' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='300' preserveAspectRatio='none' viewBox='0 0 1440 300'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1055%26quot%3b)' fill='none'%3e%3cpath d='M 0%2c182 C 96%2c167.6 288%2c105 480%2c110 C 672%2c115 768%2c207.6 960%2c207 C 1152%2c206.4 1344%2c127 1440%2c107L1440 300L0 300z' fill='rgba(76%2c 201%2c 240%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c81 C 96%2c110.2 288%2c225.8 480%2c227 C 672%2c228.2 768%2c98.2 960%2c87 C 1152%2c75.8 1344%2c154.2 1440%2c171L1440 300L0 300z' fill='rgba(72%2c 149%2c 239%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c93 C 96%2c118.8 288%2c214.8 480%2c222 C 672%2c229.2 768%2c118.6 960%2c129 C 1152%2c139.4 1344%2c245 1440%2c274L1440 300L0 300z' fill='rgba(247%2c 37%2c 133%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c113 C 96%2c145.2 288%2c269.2 480%2c274 C 672%2c278.8 768%2c159 960%2c137 C 1152%2c115 1344%2c158.6 1440%2c164L1440 300L0 300z' fill='rgba(239%2c 239%2c 239%2c 1)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1055'%3e%3crect width='1440' height='300' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
  background-size: 100% 100%;
  height: 4em;
}

.header-card {
  background: #efefef99;
  backdrop-filter: blur(5px);
  margin-left: 120px !important;
  margin-right: 120px !important;
}

.header-card p {
  padding: 2em 2em 2em 140px;
}

.header-card .sheet {
  position: absolute;
  left: -125px;
  background: transparent;
}
</style>