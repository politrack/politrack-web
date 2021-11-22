<template>
  <div>
    <canvas id="trendingPoliticiansChart" style="height: 250px"></canvas>
  </div>
</template>

<script>

import {Chart, registerables} from "chart.js";
import ChartPluginLabels from '../../utils/chartjs-plugin-labels'
import trends from "../../assets/trends.json";

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
      data: trends['politicians']
    }
  },
  mounted() {
    Chart.register(...registerables);
    ChartPluginLabels(Chart)
    this.renderChart()
  },
  methods: {
    prepareData() {
      let data = [];
      let images = [];
      let colors = []
      let labels = [];
      Object.entries(this.data).forEach((entry) => {
        let item = entry[1]
        data.push(item.count);
        colors.push(partyColors[item.party])
        labels.push(item.firstName + ' ' + item.lastName)
        images.push(
            {
              src: 'https://image.facethefacts-api.de/' + item.id + '.jpg',
              width: 35,
              height: 35
            }
        )
      });
      return {
        datasets: [{
          type: "bar",
          label: "",
          data: data,
          backgroundColor: colors,
        }],
        images: images,
        labels: labels
      }
    },
    renderChart() {
      let component = this;
      let data = this.prepareData();
      let ctx = document.getElementById('trendingPoliticiansChart').getContext('2d');
      component.chart = new Chart(ctx, {
        data: {
          datasets: data.datasets,
          labels: data.labels
        },
        type: 'bar',
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          barThickness: 30,
          plugins: {
            legend: {
              display: false,
            },
            labels: {
              render: 'image',
              textMargin: 0,
              images: data.images
            }
          },
          layout: {
            padding: {
              top: 20,
              right: 20
            }
          },
          scales: {
            y: {
              grid: {
                display: false
              },
            },
            x: {
              grid: {
                display: true
              },
              ticks: {
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
