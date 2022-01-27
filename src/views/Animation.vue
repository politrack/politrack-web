<template>
  <v-container style="background: white">
    <div class="py-5" style="margin: 100px; background: white">
      <v-row>
        <v-col v-if="politician" class="text-center" md="4" cols="12">
          <div>
            <v-avatar class="avatar elevation-2" size="128">
              <PoliticianImage :id="politician._id"/>
            </v-avatar>
            <h2 class="mt-1">{{ politician.label }}</h2>
            <PartyChip :partyId="politician.party"/>
          </div>
        </v-col>
        <v-col md="8" cols="12">
          <canvas id="topicDistributionChart" style="height: 400px; width: 400px"></canvas>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>

import {Chart, registerables} from "chart.js";
import axios from "axios";
import PoliticianImage from "../components/base/PoliticianImage";
import PartyChip from "../components/profiles/PartyChip";

function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export default {
  name: "BlogArticle",
  components: {
    PoliticianImage,
    PartyChip
  },
  data() {
    return {
      ids: [66924, 79475, 137564, 79334, 132545],
      statistics: [],
      politician: null,
      politicians: [],
      statistic: null
    }
  },
  async mounted() {
    Chart.register(...registerables);

    for (let i = 0; i < this.ids.length; i++) {
      let resp = await axios.get(process.env.VUE_APP_URL + '/web/data/politicians/' + this.ids[i] + '.json')
      let result = resp.data
      this.statistics.push(result['statistics'])
      this.politicians.push(result['politician'])
    }
    for (let i = 0; i < this.ids.length; i++) {
      this.statistic = this.statistics[i]
      this.politician = this.politicians[i]
      console.log(this.chart)
      if (this.chart == null) {
        this.renderArticleDistributionChart();
      } else {
        let data = this.generateData()
        this.chart.config.data.datasets[0].data = data['data']
        this.chart.update()
      }
      console.log('sleeping')
      await sleep(1000)
    }
  },
  methods: {

    generateData() {
      let data = [];
      let labels = [];
      let max = 0;
      let min = 0;
      this.statistic.topicDistribution.forEach(function (item) {
        max = Math.max(item.count, max)
        min = Math.min(item.count, min)
      });
      this.statistic.topicDistribution.forEach(function (item) {
        data.push((item.count- min) / (max - min));
        console.log((item.count- min) / (max - min))
        labels.push(item.name);
      });
      return {
        'data': data,
        'labels': labels
      }
    },

    prepareData() {
      let data = this.generateData()
      return {
        labels: data['labels'],
        datasets: [{
          data: data['data'],
          borderColor: "#F72585",
          backgroundColor: "rgba(247,37,133,0.73)",
        }],
      }
    },
    renderArticleDistributionChart() {
      let component = this;
      let data = component.prepareData();
      let gridColor = component.light ? "#ffffff" : "#e8e5e5";
      let fontColor = component.light ? "#ffffff" : "#1a1a1a";
      let ctx = document.getElementById('topicDistributionChart').getContext('2d');
      component.chart = new Chart(ctx, {
        type: 'radar',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              ticks: {
                display: false
              },
              grid: {
                circular: true,
                //display: false,
                color: gridColor
              },
              angleLines: {
                //display: false,
                color: '#E8E5E5FF'
              },
              pointLabels: {
                color: fontColor,
                backdropPadding: 3
              },
              suggestedMin: 0,
              suggestedMax: 1
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: false
          }
        }
      });
      //this.chart = component.chart
    }
  }
}
</script>

<style scoped>

</style>