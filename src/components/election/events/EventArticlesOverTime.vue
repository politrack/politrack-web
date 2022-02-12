<template>
  <div class="position-relative">
    <canvas id="eventArticlesOverTimeChart"></canvas>
  </div>
</template>

<script>
import {Chart, registerables} from "chart.js";

let moment = require("moment");
import 'chartjs-adapter-moment';

moment.locale('de-DE');

export default {
  name: "EventArticlesOverTime",
  props: {
    event: Object
  },
  watch: {
    data: function () {
      this.renderArticleDistributionChart();
    }
  },
  mounted() {
    Chart.register(...registerables);
    this.renderArticleDistributionChart();
  },
  methods: {
    createDateTimeHistogram(data, timeAggregation, key) {
      let dateTimeHistogram = [];

      let minData = +Infinity;
      let maxData = -Infinity;

      let dateTimes = [];

      for (let i = 0; i < data.length; i++) {
        if (data[i][key]) {
          let value = new Date(data[i][key]).getTime();
          dateTimes.push(value);

          minData = Math.min(minData, value);
          maxData = Math.max(maxData, value);
        }
      }

      let interval = timeAggregation * 60 * 1000; //Conversion m -> ms
      let numberOfBeans = (maxData !== minData) ? (1 + ((maxData - minData) / interval)) : 100;

      let numberOfBeansMax = 1000;

      numberOfBeans = Math.min(numberOfBeansMax, numberOfBeans);

      interval = (maxData - minData) / (numberOfBeans - 1);

      for (let j = 0; j < numberOfBeans; j++) {
        dateTimeHistogram[j] = {
          dateTime: new Date(minData + (j + 0.5) * interval),
          count: 0
        };
      }

      for (let i = 0; i < data.length; i++) {
        let beanNumber = Math.floor((dateTimes[i] - minData) / interval);
        dateTimeHistogram[beanNumber].count += 1;
      }

      return dateTimeHistogram;
    },
    prepareData() {

      let histogram = this.createDateTimeHistogram(this.event.articles, 60 * 24 * 7, "published");
      let bar_data = [];

      histogram.forEach(function (entry, idx) {
        bar_data.push({
          x: entry.dateTime,
          y: entry.count,
          nextX: idx+1 < histogram.length? histogram[idx+1].dateTime : null
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
          label: "Neue Artikel",
          yAxisID: "y"
        }]
      }
    },
    renderArticleDistributionChart() {
      let component = this;
      let data = this.prepareData();
      console.log(data);
      let ctx = document.getElementById('eventArticlesOverTimeChart').getContext('2d');
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
                title(item, objs) {
                  let currentX = item[0].raw.x;
                  let nextX = item[0].raw.nextX;

                  return moment(currentX).format('Do MMMM YYYY') + " bis " + moment(nextX).format('Do MMMM YYYY')
                }
              }
            }
          },
          scales: {
            y: {
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
              grid: {
                display: false,
                drawBorder: false
              }
            }
          }
        },
        plugins: [{
          beforeRender: function(chart, options) {
            let maxValue = 0;
            chart.data.datasets[0].data.forEach(function (val) {
              maxValue = Math.max(maxValue, val.y);
            })
            let gradientFill = chart.ctx.createLinearGradient(0, 0, 0, chart.scales.y.bottom-chart.scales.y.getPixelForValue(maxValue));
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

</style>