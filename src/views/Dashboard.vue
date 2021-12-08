<template>
  <div>
    <div class="header-content">
      <v-container class="py-5">
        <v-row>
          <v-col lg="12" class="align-self-center">
            <v-card class="rounded d-flex header-card align-center rounded-xl" rounded elevation="0">
              <p>
                Mithilfe von künstlicher Intelligenz haben wir Artikel über politisch relevante Ereignisse nach Themen
                gruppiert und diese zeitlich mit den Umfragewerten zur Bundestagswahl verknüpft. Die Punkte
                repräsentieren
                die Ergebnisse einzelner Umfragen, während die Linien den Trend über die wichtigsten Umfragen im
                jeweiligen Zeitraum widerspiegeln. In der nächsten Zeit werden wir weitere Analysen über die politische
                Berichterstattung in Deutschland erstellen.
              </p>
              <v-sheet
                  class="sheet mx-auto transition-swing rounded-circle pa-0"
                  height="250"
                  width="250"
                  elevation="0"
              >
                <v-img
                    src="../assets/img/news.png"
                    contain
                    alt="Nachrichten"
                />
              </v-sheet>
            </v-card>


          </v-col>
        </v-row>
      </v-container>
    </div>
    <div>
      <div class="mt-5">
        <v-container>
          <v-row>
            <v-col lg="7">
              <v-autocomplete
                  v-model="select"
                  :loading="searchLoading"
                  :items="searchItems"
                  :search-input.sync="search"
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
            </v-col>
            <v-col lg="5">
              <div class="d-flex align-center">
                <div class="me-3 caption">Derzeit populär:</div>
                <PoliticianAvatarRow v-if="politicians" :persons="politicians.slice(0,6)" :size="48"/>

              </div>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" v-if="topics">
              <v-row justify="center"><h2 class="text--darken-2">Schlagzeilen</h2></v-row>
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
                <v-btn text outlined rounded class="mt-3">Entdecke alle Schlagzeilen</v-btn>
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
        <v-row justify="center">
          <h2>Statistiken von Heute</h2>
        </v-row>
        <v-row>
          <v-col cols="12" lg="6" sm="6" xs="12">
            <v-card class="pa-3 rounded-xl blur-background" rounded>
              <v-card-title>Politiker im Fokus</v-card-title>
              <trending-politicians v-if="politicians" :data="politicians"></trending-politicians>
            </v-card>
          </v-col>

          <v-col cols="12" lg="6" sm="12">
            <v-card class="pa-3 rounded-xl blur-background" rounded>
              <v-card-title>Themenfokus</v-card-title>
              <topic-distribution v-if="statistics" :statistics="statistics" class="mt-5" :light="false"/>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="">
          <v-col cols="12" lg="12" sm="12">
            <v-card class="pa-3 rounded-xl blur-background" rounded>
              <v-card-title>Parteien in den Medien</v-card-title>
              <PartiesChart class="mt-5" :partiesData="partiesData"/>
            </v-card>
          </v-col>

        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import PartiesChart from "../components/dashboard/PartiesChart";
import TrendingPoliticians from "../components/dashboard/TrendingPoliticians";
import NewsHeadline from "../components/dashboard/NewsHeadline";
import QuotesCard from "../components/profiles/QuotesCard";
import TopicDistribution from "../components/profiles/TopicDistribution";
import PoliticianAvatarRow from "../components/base/PoliticianAvatarRow";
import axios from 'axios'
import parties_config from "../assets/parties.json"

export default {
  name: "Dashboard",
  data() {
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
  },
  components: {
    TopicDistribution,
    PartiesChart,
    TrendingPoliticians,
    NewsHeadline,
    PoliticianAvatarRow,
    QuotesCard
  }
}
</script>

<style scoped>

.header-content {
  padding-top: 80px;
  padding-bottom: 10px;
  color: #efefef;
}


/deep/ .v-icon.fas.fa-search {
  font-size: 16px;
}

.avatar {
  border: 2px solid #ffff;
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
  position: relative;
  background: #efefef;
  margin-right: 125px !important;
}
.header-card p {
  padding: 2em 140px 2em 2em;
}

.header-card .sheet {
  position: absolute;
  right: -125px;
  background: #efefef
}
</style>