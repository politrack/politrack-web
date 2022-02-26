<template>
  <div class="position-relative">
    <help :text="helpText" :title="helpTitle" right-padding/>
    <div class="position-relative">
      <canvas id="topicDistributionChart"></canvas>
    </div>
  </div>

</template>

<script>
import {Chart, registerables} from "chart.js";
import Help from "../base/Help";

export default {
  name: "TopicDistribution",
  components: {Help},
  props: {
    statistics: Object,
    light: Boolean,
    showHelpPolitician: Boolean
  },
  data() {
    return {
      helpTitle: "Themenfokus Erklärung",
      helpText: (this.showHelpPolitician ? "Mit dieser Grafik möchten wir eine Übersicht geben, " +
          "mit welchen politischen Themen sich diese Person am meisten beschäftigt. Dafür anaylsierten wir alle Artikel aus unserem Datensatz, in denen diese Person vorkommt. " :
          "Mit dieser Grafik möchten wir eine Übersicht geben, " +
          "mit welchen politischen Themen sich die Medien am meisten beschäftigen. Die anaylsierten Artikel stammen aus den letzten sieben Tagen Berichterstattung. ") +

          "Mithilfe einer künstlichen Intelligenz können wir Artikel einem der aufgeführten Themen zuordnen. Zu diesen Kategorien gehören " +
          "zum Beispiel “Soziales”, “Außenpolitik”, “Gesundheit” oder “Klimaschutz”. Die Eckpunkte der angezeigten " +
          "Fläche sind näher an einem der Themen am Rand, wenn das Thema häufiger vorkommt." +
          " So bekommen Sie einen schnellen Überblick über den derzetigen Themenfokus."
    }
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
      let gridColor = component.light ? "#ffffff" : "#8a7474";
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
                circular: true,
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