<template>
  <div class="position-relative">
    <canvas id="articleDistributionChart"></canvas>
  </div>
</template>

<script>
import sources from "../../assets/sources_config.json";
import {Chart, registerables} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

export default {
  name: "SourceDistribution",
  props: {
    statistics: Object
  },
  mounted() {
    Chart.register(...registerables);
    this.renderArticleDistributionChart();
  },
  methods: {
    prepareData() {
      let article_counts = this.statistics.sourceDistribution;

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
          label: "sources",
          datalabels: {
            anchor: 'center'
          }
        }],

      }
    },
    renderArticleDistributionChart() {
      let component = this;
      let data = this.prepareData();
      let ctx = document.getElementById('articleDistributionChart').getContext('2d');
      component.chart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        plugins: [ChartDataLabels],
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            datalabels: {
              backgroundColor: function (context) {
                return context.dataset.backgroundColor;
              },
              borderColor: 'white',
              borderRadius: 25,
              borderWidth: 0,
              color: 'white',
              display: function (context) {
                var dataset = context.dataset;
                var count = dataset.data.length;
                var value = dataset.data[context.dataIndex];
                return value > count * 1.5;
              },
              font: {
              },
              padding: 6,
              formatter: function (value, context) {
                return context.chart.data.labels[context.dataIndex];
              }
            },
            legend: {
              display: false,
              position: "right"
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