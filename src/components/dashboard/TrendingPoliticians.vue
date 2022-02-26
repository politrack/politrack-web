<template>
  <div class="position-relative">
    <help :text="helpText" :title="helpTitle"/>
    <div class="pt-5">
      <canvas id="trendingPoliticiansChart" style="height: 250px"></canvas>
    </div>
  </div>
</template>

<script>
import Help from "../base/Help";
import {Chart, registerables} from "chart.js";
import ChartPluginLabels from '../../utils/chartjs-plugin-labels'

export default {
  name: "PartiesChart",
  props: ['data'],
  data() {
    return {
      helpTitle: "Politiker in den Medien Erklärung",
      helpText: "Diese Grafik zeigt an welche Politiker:innen in den letzten sieben Tagen am " +
          "häufigsten in Nachrichtenartikeln erwähnt wurden. Am unteren Ende des Dashboards findet sich " +
          "eine weitere Übersicht in der die meist erwähntesten Poltiker:innen und Newcomer nach ihren Parteien " +
          "getrennt angezeigt werden."
    }
  },
  components: {
    Help
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
      Object.entries(this.data.slice(0, 6)).forEach((entry) => {
        let item = entry[1]
        data.push(item.count);
        colors.push(item.party.color)
        labels.push(item.first_name + ' ' + item.last_name)
        images.push(
            {
              src: 'https://image.facethefacts-api.de/' + item._id + '.jpg',
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
              ticks: {
                color: "#ffffff"
              }
            },
            x: {
              display: false,
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
