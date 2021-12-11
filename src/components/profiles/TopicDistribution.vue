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
          borderColor: "#F72585",
          backgroundColor: "rgba(247,37,133,0.73)",
        }],

      }
    },
    renderArticleDistributionChart() {
      let component = this;
      let data = component.prepareData();
      let gridColor = component.light ? "#ffffff" : "#888888";
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
                color: gridColor
              },
              angleLines: {
                color: gridColor
              },
              pointLabels: {
                color: fontColor,
                //backdropColor: '#f0f0f0',
                backdropPadding: 3
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