<template>
  <div class="position-relative">
    <canvas id="articleDistributionChart"></canvas>
  </div>
</template>

<script>
import article_distribution from "../../../assets/btw/article_distribution.json";
import sources from "../../../assets/btw/sources_config.json";
import {Chart, registerables} from "chart.js";

export default {
  name: "ArticleDistribution",
  mounted() {
    Chart.register(...registerables);
    this.renderArticleDistributionChart();
  },
  methods: {
    prepareData() {
      let data = [];
      let labels = [];
      let colors = [];
      Object.entries(article_distribution).forEach(function ([source, count]) {
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
      let ctx = document.getElementById('articleDistributionChart').getContext('2d');
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