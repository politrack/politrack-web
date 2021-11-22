<template>
  <div>
    <canvas id="partiesChart"></canvas>
  </div>
</template>

<script>

import {Chart, registerables} from "chart.js";
import 'chartjs-adapter-moment';
import trends from "../../assets/trends.json";
import parties_config from "../../assets/parties.json"


const partyColors = {
  'CDU/CSU': 'black',
  'SPD': 'red',
  'Grüne': 'green',
  'Die Linke': 'purple',
  'FDP': 'yellow',
  'AfD': 'blue'
}

export default {
  name: "PartiesChart",
  data: function () {
    return {
      data: trends.parties
    }
  },
  mounted() {
    Chart.register(...registerables);
    this.renderChart()
  },
  methods: {
    prepareData() {
      let datasets = [];
      Object.entries(this.data.parties).forEach((entry) => {
        let data = [];
        let partyId = entry[0]
        let values = entry[1]
        let party = parties_config.parties.find(function (item) {
          return item.id !== null && item.id.toString() === partyId.toString();
        })
        for (let i = 0; i < values.length; i++) {
          let date = new Date(this.data.x[i]);
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
      let component = this;
      let data = this.prepareData();
      let ctx = document.getElementById('partiesChart').getContext('2d');
      component.chart = new Chart(ctx, {
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                text: "#Artikel",
                display: true
              }
            },
            x: {
              type: 'time',
              time: {
                unit: 'day'
              },
              grid: {
                display: false
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
