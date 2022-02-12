<template>
  <div>
    <canvas id="articleOverTimeChart"></canvas>
  </div>
</template>

<script>

import articles_over_time from "../../../assets/btw/articles_over_time.json";
import {Chart, registerables} from "chart.js";
let moment = require("moment");
import 'chartjs-adapter-moment';

moment.locale('de-DE');

export default {
  name: "ArticleDistribution",
  mounted() {
    Chart.register(...registerables);
    this.renderArticleDistributionChart();
  },
  methods: {
    prepareData() {
      let bar_data = [];
      let line_data = [];
      let total_value = 0;
      Object.entries(articles_over_time).forEach(function ([date, count]) {
        date = new Date(date);
        bar_data.push({x: date, y: count});
        total_value += count;
        line_data.push({x: date, y: total_value});
      });

      return {
        datasets: [{
          type: "bar",
          data: bar_data,
          label: "Neue Artikel",
          backgroundColor: "#28abf1",
          yAxisID: "y"
        }]
      }
    },
    renderArticleDistributionChart() {
      let component = this;
      let data = this.prepareData();
      let ctx = document.getElementById('articleOverTimeChart').getContext('2d');
      component.chart = new Chart(ctx, {
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                title(item, objs) {
                  let currentX = item[0].raw.x;

                  return "Woche vom " + moment(currentX).format('Do MMMM YYYY')
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                text: "#Artikel pro Woche",
                display: true
              }
            },
            x: {
              type: 'time',
              time: {
                unit: 'month'
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

</style>