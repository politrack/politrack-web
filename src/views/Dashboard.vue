<template>
  <div>
    <div class="header-container">
      <div class="overlay">
        <v-container>
          <v-row justify="center" class="mt-5">
            <v-col cols="12" lg="6">
              <div class="d-flex flex-column align-end">
                <SearchBar :partyMap="partyMap" class="w-100"/>
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
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="4">
              <h3 class="text-center">Aktuell beliebt</h3>
              <TrendingPoliticiansGrid v-if="politicians" :politicians="politicians"/>
            </v-col>
            <v-col cols="12" lg="4">
              <h3 class="text-center">Aktuelle Zitate</h3>
              <quotes-card :quotes="quotes" v-if="quotes"></quotes-card>
            </v-col>
            <v-col cols="12" lg="4">
              <h3 class="text-center">Politiker in den Medien</h3>
              <trending-politicians v-if="politicians" :data="politicians"></trending-politicians>
            </v-col>

          </v-row>

        </v-container>
      </div>
    </div>
    <div class="py-5 middle-container">
      <div>
        <v-container>

          <div class="text-h2">Schlagzeilen</div>
          <div class="d-flex justify-end mt-5">
            <v-btn color="accent" rounded @click="topicDistributionVisible=!topicDistributionVisible">
              <span v-if="topicDistributionVisible"><v-icon>fas fa-chevron-right</v-icon></span>
              <span v-else>Aktuelle Themen</span>
            </v-btn>
          </div>
          <div class="position-relative">
            <div v-if="topics">
              <TopicSlider class="mt-2" :topics="topics"/>
            </div>
            <v-slide-y-reverse-transition>
              <v-card elevation="4" class="topic-distribution-container rounded-xl blur-background"
                      v-if="topicDistributionVisible" :key="topicDistributionVisible">
                <h3 class="text-center">Themenfokus</h3>
                <topic-distribution v-if="statistics" :statistics="statistics"/>
              </v-card>
            </v-slide-y-reverse-transition>
          </div>

        </v-container>
      </div>

    </div>
    <div class="parties-container">
      <div class="overlay">

        <v-container>
          <div class="text-h3">Parteien im Fokus</div>

          <v-row class="mt-5">
            <v-col md="6" cols="12">
              <PeopleInParties v-if="partiesData !== null" :parties-data="partiesData"/>
            </v-col>
            <v-col cols="12" md="6">
              <h3 class="text-center">Parteien in den Medien</h3>
              <PartiesChart class="mt-5" :partiesData="partiesData"/>
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
import QuotesCard from "../components/profiles/QuotesCard";
import TopicDistribution from "../components/profiles/TopicDistribution";
import SearchBar from "../components/dashboard/SearchBar";
import TopicSlider from "../components/dashboard/TopicSlider";
import PeopleInParties from "../components/dashboard/PeopleInParties";
import TrendingPoliticiansGrid from "../components/dashboard/TrendingPoliticiansGrid";
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
      topicDistributionVisible: false,
      partyMap: {},
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
    SearchBar,
    PeopleInParties,
    TrendingPoliticiansGrid
  }
}
</script>

<style scoped>

.w-100 {
  width: 100%;
}

.position-relative {
  position: relative;
}

.topic-distribution-container {
  position: absolute;
  z-index: 3;
  padding: 10px;
  top: 0;
  right: 0;
}

.header-container {
  margin-top: -64px;
  background-image: url('../assets/img/newspaper.jpg');
  background-attachment: fixed;
  background-size: cover;
  color: white;
}

.header-container > div.overlay {
  padding-bottom: 64px;
  padding-top: 84px;
  background-color: rgba(0, 0, 0, .65)
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

.parties-container {
  background-image: url("../assets/img/reichstag.jpg");
  background-color: white;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  margin-bottom: -80px;
}

.parties-container > div.overlay {
  padding-top: 50px;
  padding-bottom: 100px;
  background-color: rgba(60, 60, 60, .75);
  color: white;
}

.middle-container {
  overflow: hidden;
  background: #efefef;
  margin-top: -2%;
  margin-bottom: -2%;
  clip-path: polygon(
      0% 0%,
      1% 2%,
      3.5% 0.1%,
      8.9% 2.7%,
      16.2% 1.2%,
      19.7% 0.8%,
      24.7% 2%,
      31.2% 0%,
      35.9% 2.3%,
      40.6% 0.5%,
      47.1% 1.8%,
      49.9% 1%,
      53.8% 2.5%,
      62.2% 0.4%,
      67.3% 1.2%,
      70.3% 0.3%,
      75.8% 1.4%,
      78.5% 1.7%,
      84% 2.6%,
      91.1% 0.5%,
      93.6% 2.4%,
      97.3% 0.3%,
      98.9% 2%,
      100% 0,
      100% 100%,
      98% 98.6%,
      93.6% 97.4%,
      90.3% 98.3%,
      86.8% 98.3%,
      78.6% 98.5%,
      76.4% 99.2%,
      69.7% 99.8%,
      64.2% 99.3%,
      61.8% 99.2%,
      57.2% 98.1%,
      48.7% 98.3%,
      46.8% 99%,
      39.6% 98.9%,
      33.8% 97.3%,
      28.2% 99.4%,
      27% 98.3%,
      22.1% 98.6%,
      13.1% 97.1%,
      8.7% 99.3%,
      2.7% 97.4%,
      2% 98.2%,
      0% 100%
  );
}
</style>