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
    statistics: Object
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
        labels.push(item.label);
      });

      console.log(this.articles)
      console.log(labels)

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
      let data = this.prepareData();
      console.log(data);
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

      console.log(component.chart);
    }

  }
}
</script>

<style scoped>

</style>