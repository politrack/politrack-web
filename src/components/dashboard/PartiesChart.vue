<template>
  <v-card class="blur-background rounded-xl pa-5">
    <canvas id="partiesChart"></canvas>
  </v-card>
</template>

<script>

import {Chart, registerables} from "chart.js";
import 'chartjs-adapter-moment';
import parties_config from "../../assets/parties.json"

export default {
  name: "PartiesChart",
  props: {
    partiesData: Object
  },
  mounted() {
    Chart.register(...registerables);
    if (this.partiesData != null) {
      this.renderChart()
    }
  },
  data() {
    return {}
  },
  watch: {
    partiesData: {
      handler(){
        if (this.partiesData != null) {
          this.renderChart()
        }
      },
      deep: true
    }
  },
  methods: {
    prepareData() {
      let datasets = [];

      let totals = []
      Object.entries(this.partiesData.parties).forEach((entry) => {
        let values = entry[1]
        for (let i = 0; i < values.length; i++) {
          if (i + 1 > totals.length) {
            totals.push(0)
          }
          totals[i] += values[i]
        }
      });

      Object.entries(this.partiesData.parties).forEach((entry) => {
        let data = [];
        let partyId = entry[0]
        let values = entry[1]
        let party = parties_config.parties.find(function (item) {
          return item.id !== null && item.id.toString() === partyId.toString();
        })
        for (let i = 0; i < values.length; i++) {
          let date = new Date(this.partiesData.x[i]);
          data.push({x: date, y: values[i]});
        }
        datasets.push({
          type: "line",
          data: data,
          label: party.label,
          backgroundColor: party.color,
          borderColor: party.color,
          lineTension: 0.3,
          yAxisID: "y"
        })
      });
      return {
        datasets: datasets
      }
    },
    renderChart() {
      let gridColor = "#ffffff";
      let component = this;
      let data = component.prepareData();
      let ctx = document.getElementById('partiesChart').getContext('2d');
      component.chart = new Chart(ctx, {
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: gridColor,

              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                text: "#Artikel",
                color: gridColor,
                display: true
              },
              grid: {
                color: gridColor
              },
              ticks: {
                color: gridColor
              },
            },
            x: {
              type: 'time',
              time: {
                unit: 'day'
              },
              grid: {
                display: false,
              },
              ticks: {
                color: gridColor
              }
            }
          }
        },
      });
    }
  }
}
</script>

<style scoped>

#partiesChart {
  height: 300px;
}

</style>
