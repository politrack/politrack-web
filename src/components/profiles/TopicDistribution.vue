<template>
  <div class="position-relative">
    <canvas id="topicDistributionChart"></canvas>
  </div>
</template>

<script>
import {Chart, registerables} from "chart.js";

export default {
  name: "TopicDistribution",
  props: {
    statistics: Object,
    light: Boolean
  },
  mounted() {
    Chart.register(...registerables);
    this.renderArticleDistributionChart();
  },
  methods: {
    prepareData() {

      let data = [];
      let labels = [];

      this.statistics.topicDistribution.forEach(function (item) {
        data.push(item.count);
        labels.push(item.name);
      });

      return {
        labels: labels,
        datasets: [{
          data: data,
          borderColor: "rgb(183,60,92)",
          backgroundColor: "rgba(183,60,92,0.55)",
        }],

      }
    },
    renderArticleDistributionChart() {
      let component = this;
      let data = component.prepareData();
      let gridColor = component.light? "#ffffff": "#b9b9b9";
      let fontColor = component.light? "#ffffff": "#3a3a3a";
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
                color: gridColor
              },
              angleLines: {
                color: gridColor
              },
              pointLabels: {
                color: fontColor
              }
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
    }
  }
}
</script>

<style scoped>

</style>