<template>
  <div>
    <canvas id="partiesChart"></canvas>
  </div>
</template>

<script>

import {Chart, registerables} from "chart.js";
import 'chartjs-adapter-moment';
import parties from "../../assets/parties.json";

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
      data: parties
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
        let party = entry[0]
        let values = entry[1]
        for (let i = 0; i < values.length; i++) {
          let date = new Date(this.data.x[i]);
          data.push({x: date, y: values[i]});
        }
        datasets.push({
          type: "line",
          data: data,
          label: party,
          backgroundColor: partyColors[party],
          borderColor: partyColors[party],
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
