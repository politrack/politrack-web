<template>
  <div class="position-relative">
    <help :text="helpText" :title="helpTitle"/>
    <canvas id="articlesOverTimeChart"></canvas>
  </div>
</template>

<script>
import {Chart, registerables} from "chart.js";
import 'chartjs-adapter-moment';
import moment from 'moment'
import Help from "../base/Help";

moment.locale('de');

export default {
  name: "ArticlesOverTime",
  components: {Help},
  props: {
    statistics: Object
  },
  data() {
    return {
      helpTitle: "Präsenz in den Medien Erklärung",
      helpText: "Diese Grafik stellt dar, wie häufig diese Person in Nachrichtenartikeln erwähnt wurde. " +
          "Dabei werden hohe Werte zunächst mit gelber und dann mit roter Farbe besonders hervorgehoben. " +
          "Für eine bessere Übersicht, zeigen wir nur die Zahlen ab dem 01.01.2021 an. Wenn sie die Maus über die " +
          "Übersicht bewegen können Sie die genauen Zahlen für konkrete Zeitpunkte sehen."
    }
  },
  mounted() {
    Chart.register(...registerables);
    this.renderArticleDistributionChart();
  },
  methods: {
    prepareData() {
      let bar_data = [];
      this.statistics.articlesOverTime.forEach(function (entry, idx) {
        bar_data.push({
          x: entry.date,
          y: entry.count,
        });
      });
      return {
        datasets: [{
          type: "line",
          data: bar_data,
          borderColor: "#000000",
          borderJoinStyle: "round",
          pointRadius: 0.5,
          tension: 0.4,
          stepped: true,
          label: "Neue Artikel",
          yAxisID: "y"
        }]
      }
    },
    renderArticleDistributionChart() {
      let component = this;
      let data = this.prepareData();
      let ctx = document.getElementById('articlesOverTimeChart').getContext('2d');
      component.chart = new Chart(ctx, {
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          aspectRatio: 1.5,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              callbacks: {
                title(item) {
                  let currentX = item[0].raw.x;
                  //let nextX = item[0].raw.nextX;

                  return moment(currentX).format('Do MMMM YYYY'); //+ " bis " + moment(nextX).format('Do MMMM YYYY')
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              display: false,
              title: {
                text: "#Artikel",
                display: true
              },
              grid: {
                display: false
              }
            },
            x: {
              type: 'time',
              time: {
                unit: 'day'
              },
              min: new Date(2020, 0, 1),
              grid: {
                display: false,
                drawBorder: false
              }
            }
          }
        },
        plugins: [{
          beforeRender: function (chart) {
            let maxValue = 0;
            chart.data.datasets[0].data.forEach(function (val) {
              maxValue = Math.max(maxValue, val.y);
            })
            let gradientFill = chart.ctx.createLinearGradient(0, 0, 0, chart.scales.y.bottom - chart.scales.y.getPixelForValue(maxValue));
            gradientFill.addColorStop(0, "#d52727");
            gradientFill.addColorStop(0.7, "#ffd235");
            gradientFill.addColorStop(1, "#329832");
            chart.data.datasets[0].borderColor = gradientFill;
            chart.data.datasets[0].backdropColor = gradientFill;
            chart.data.datasets[0].pointBackgroundColor = gradientFill;
            chart.data.datasets[0].pointBorderColor = gradientFill;
            return true;
          }
        }]
      });

      component.chart.update();
    }

  }
}
</script>

<style scoped>
.position-relative {
  position: relative;
}
</style>