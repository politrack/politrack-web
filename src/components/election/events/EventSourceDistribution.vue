<template>
  <div class="position-relative">
    <canvas id="eventArticleDistributionChart"></canvas>
  </div>
</template>

<script>
import sources from "../../../assets/btw/sources_config.json";
import {Chart, registerables} from "chart.js";

export default {
  name: "EventSourceDistribution",
  props: {
    event: Object
  },
  mounted() {
    Chart.register(...registerables);
    this.renderArticleDistributionChart();
  },
  methods: {
    prepareData() {
      let article_counts = {};

      Object.entries(sources).forEach(function ([source, info]) {
        article_counts[source] = 0;
      });

      this.event.articles.forEach(function (a) {
        article_counts[a.info.source]++;
      })

      let data = [];
      let labels = [];
      let colors = [];

      Object.entries(article_counts).forEach(function ([source, count]) {
        data.push(count);
        colors.push(sources[source].color);
        labels.push(sources[source].label);
      });
      return {
        labels: labels,
        datasets: [{
          backgroundColor: colors,
          data: data,
          label: "sources"
        }]
      }
    },
    renderArticleDistributionChart() {
      let component = this;
      let data = this.prepareData();
      console.log(data);
      let ctx = document.getElementById('eventArticleDistributionChart').getContext('2d');
      component.chart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "right"
            }
          },
        }
      });
    }

  }
}
</script>

<style scoped>

</style>