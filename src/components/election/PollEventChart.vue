<template>
  <div>
    <div class="mx-auto chart-width poll-chart">
      <canvas id="pollsChart"></canvas>
    </div>
    <div class="mx-auto mt-1 row chart-width">
      <div class="col-6 col-lg-3">
        <span v-if="!prevYearDisabled" class="text-decoration-none cursor-pointer text-primary"
              @click="changeYear(true)">
          <font-awesome-icon :icon="['fas', 'chevron-left']"/> {{ prevYearText }}
        </span>
      </div>
      <div class="col-lg-6 small text-muted text-center d-none d-lg-block">
        Quelle: <a class="text-muted" href="https://dawum.de/">dawum.de</a>
        &middot;
        <router-link :to="{ name: 'about', hash: '#polls' }" class="text-muted">Methodik</router-link>
        &middot;
        <font-awesome-icon :icon="['fas','download']"/>
        <a class="text-muted ms-1 cursor-pointer" href="#download" @click="exportAsImage">Grafik herunterladen</a>
      </div>
      <div class="col-6 col-lg-3 text-end">
        <span v-if="!nextYearDisabled" class="text-decoration-none cursor-pointer text-primary"
              @click="changeYear(false)">{{ nextYearText }}
          <font-awesome-icon :icon="['fas', 'chevron-right']"/>
          </span>
      </div>
    </div>

    <div class="row chart-width d-lg-none mt-2">
      <div class="col-12 small text-muted text-center">
        Quelle: <a class="text-muted" href="https://dawum.de/">dawum.de</a>
        &middot;
        <router-link :to="{ name: 'about', hash: '#polls' }" class="text-muted">Methodik</router-link>
        &middot;
        <font-awesome-icon :icon="['fas','download']"/>
        <a class="text-muted ms-1 cursor-pointer" href="#download" @click="exportAsImage">Grafik herunterladen</a>
      </div>
    </div>

    <div class="container mt-4">
      <div>
        <EventSlider :eventsProxy="eventsProxy" v-bind:events="events"/>
      </div>
    </div>
  </div>
</template>

<script>
import EventSlider from "./EventSlider.vue";
import polls from '../../assets/btw/polls.json'
import {Chart, registerables} from 'chart.js';

import {drawHoverLabels} from '../../js/poll_event_chart_helpers.js'
import {GanttController, calculateXRangeForEvent} from '../../js/GanttController.js'

import {debounce} from "../../js/utils.js"

let moment = require("moment");
import 'chartjs-adapter-moment';

export default {
  name: "PollEventChart",
  props: {
    events: Array,
    eventsProxy: Array
  },
  emits: [
    "onTimelineUpdate"
  ],
  data() {
    return {
      chartXRangeSteps: [
        {
          start_date: new Date(2020, 0, 1),
          end_date: new Date(2020, 11, 31),
          label: "2020",
          unit: "month"
        },
        {
          start_date: new Date(2021, 0, 1),
          end_date: new Date(2021, 8, 26),
          label: "2021",
          unit: "month"
        },
        {
          start_date: new Date(2021, 5, 22),
          end_date: new Date(2021, 8, 26),
          label: "Letztes Wahlkampfquartal",
          unit: "day"
        }
      ],
      activeXRange: 1
    }
  },
  computed: {
    currentChartDate() {
      return this.chartXRangeSteps[this.activeXRange].start_date;
    },
    currentChartEndDate() {
      return this.chartXRangeSteps[this.activeXRange].end_date;
    },
    currentChartUnit() {
      return this.chartXRangeSteps[this.activeXRange].unit;
    },
    prevYearText() {
      if (this.prevYearDisabled) return "";
      return this.chartXRangeSteps[this.activeXRange - 1].label;
    },
    nextYearText() {
      if (this.nextYearDisabled) return "";
      return this.chartXRangeSteps[this.activeXRange + 1].label;
    },
    nextYearDisabled() {
      return this.activeXRange >= this.chartXRangeSteps.length - 1;
    },
    prevYearDisabled() {
      return this.activeXRange <= 0;
    }
  },
  components: {
    EventSlider
  },
  mounted() {
    this.onEventsChanged()
  },
  watch: {
    eventsProxy: {
      handler: function (oldVal, newVal) {
        if (this.chart) {
          this.onEventsChanged();
        }
      },
      deep: true
    }
  },
  methods: {
    exportAsImage() {
      let downloadLink = document.createElement('a');
      downloadLink.setAttribute('download', 'PoliTrack.png');
      let dataURL = this.canvas.toDataURL('image/png');
      let url = dataURL.replace(/^data:image\/png/, 'data:application/octet-stream');
      downloadLink.setAttribute('href', url);
      downloadLink.click();
    },
    isGanttVisible() {
      return window.innerWidth >= 768;
    },
    isEventActive(id) {
      return this.eventsProxy.find(function (e) {
        return e.id === id;
      }).isActive
    },
    changeYear(prev) {
      if ((prev && this.prevYearDisabled) || (!prev && this.nextYearDisabled)) return;
      this.activeXRange += prev ? -1 : 1;
      this.updateChartDates()
    },
    updateChartDates() {
      const component = this;
      component.chart.options.scales.x.time = {
        unit: this.currentChartUnit
      }
      component.chart.options.scales.x.min = component.currentChartDate;
      component.chart.options.scales.x.max = component.currentChartEndDate;
      this.chart.update();
    },
    prepareDateset() {
      polls.trend_line.forEach(function (item) {
        item.x = new Date(item.x);
      });

      let electionDate = new Date(polls.election_results.date);
      electionDate.setHours(0, 0, 0);

      let datasets = polls.config.parties.map(function (party, idx) {
        return {
          type: 'scatter',
          backgroundColor: polls.config.colors[party],
          datasetIndex: idx,
          label: polls.labels[party],
          data: polls.data,
          party: party,
          pointHitRadius: -1,
          pointRadius: 1,
          order: 1,
          parsing: {
            yAxisKey: "results." + party
          }
        }
      });
      datasets = datasets.concat(datasets.map(function (item) {
        return {
          type: 'line',
          fill: false,
          label: null,
          datasetIndex: item.datasetIndex + polls.config.parties.length,
          backgroundColor: 'transparent',
          pointBackgroundColor: "transparent",
          pointBorderColor: "transparent",
          labelHoverPointColor: polls.config.colors[item.party],
          labelHoverPointSize: 8,
          labelHover: polls.labels[item.party],
          pointHitRadius: 0,
          pointRadius: 0,
          borderColor: polls.config.colors[item.party],
          borderWidth: 3,
          order: 0,
          data: polls.trend_line,
          electionResult: polls.election_results.results[item.party],
          parsing: {
            yAxisKey: "results." + item.party
          },
        }
      }));

      let electionResultIndices = [];
      datasets = datasets.concat(polls.config.parties.map(function (party, idx) {
        let index = idx + 2 * polls.config.parties.length;
        electionResultIndices.push(index);
        return {
          type: 'scatter',
          backgroundColor: polls.config.colors[party],
          datasetIndex: index,
          label: null,
          data: [{x: electionDate, y: polls.election_results.results[party],}],
          party: party,
          pointRadius: 5,
          order: 1,
          clip: {
            top: false,
            bottom: false,
            left: false,
            right: false
          },
        }
      }));
      return {datasets: datasets, electionResultIndices: electionResultIndices, electionDate: electionDate};
    },
    renderPollsChart() {
      let component = this;
      let datasetInformation = this.prepareDateset();
      let datasets = datasetInformation.datasets;
      let ganttVisible = this.isGanttVisible();

      component.canvas = document.getElementById('pollsChart');
      let ctx = component.canvas.getContext('2d');
      component.chart = new Chart(ctx, {
        data: {
          datasets: datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          events: ["mousemove", "mouseout", "click", "mouseup", "touchmove", "touchstart", "touchend"],
          interaction: {
            mode: null,
          },
          layout: {
            padding: {
              right: 30
            }
          },
          animation: {
            duration: 0,
          },
          plugins: {
            tooltip: {
              enabled: false,
            },
            legend: {
              display: false,
              position: "bottom",
              labels: {
                filter: function (item, chart) {
                  return item.text !== null;
                }
              },
              onClick: function (e, legendItem) { // When a label is clicked, hide the scatter and the line plot
                let index = legendItem.datasetIndex;
                let ci = this.chart;
                let meta_scatter = ci.getDatasetMeta(index);
                let meta_line = ci.getDatasetMeta(index + polls.config.parties.length);
                meta_scatter.hidden = !meta_scatter.hidden;
                meta_line.hidden = !meta_line.hidden;
                ci.update();
              },
            }
          },
          scales: {
            y: {
              stack: 'yStack',
              stackWeight: 1,
              beginAtZero: true,
              title: {
                text: "Umfrageergebnis (%)",
                display: true
              }
            },
            x: {
              type: 'time',
              time: {
                unit: 'month'
              },
              min: this.currentChartDate,
              max: this.currentChartEndDate,
              grid: {
                display: false
              }
            }
          },
          onHover(event, activeElements) {

          }
        },
        plugins: [
          {
            id: "eventCatcher",
            beforeEvent(chart, args, pluginOptions) {
              if (chart._currently_animating) return;
              const event = args.event;

              if (event.type === "mousemove") {
                if (chart._currently_handling_mouse_event) return;
                chart._currently_handling_mouse_event = true;
                component.handleMousemoveEvent(chart, event);
                chart._currently_handling_mouse_event = false;
              } else if (event.type === "mouseout" || event.type === "mouseup") {
                chart._mousemove_active = false;
                component.redrawHoverLabels(chart, false);
              } else if (event.type === "click") {
                if (chart._currently_animating) return;
                const event = args.event;
                let date = new Date(chart.scales.x.getValueForPixel(event.x));

                if (date < chart.options.scales.x.min || date > chart.options.scales.x.max ||
                    event.y < chart.scales.y2.top || event.y > chart.scales.y2.bottom) {
                  return;
                }

                let eventY = chart.scales.y2.getValueForPixel(event.y);

                chart.data.datasets.forEach(function (d) {
                  let dataset = d;
                  if (dataset.type !== "gantt") return;

                  let x1 = dataset.data[0].x;
                  let x2 = dataset.data[1].x;
                  let y = dataset.data[1].y;

                  if (Math.abs(y - eventY) >= 0.5) return; // Outside of y range
                  if (date < x1 || date > x2) return; // Outside of x range

                  component.eventsProxy.forEach(function (e) {
                    e.isActive = e.id === dataset.eventId;
                  });

                  chart._mousemove_date = null;
                  chart._mousemove_x = null;
                  chart._mousemove_active = false;
                  chart.update("none");
                });
              }
            }
          },
          {
            id: 'canvas_background',
            beforeDraw(chart) {
              const ctx = chart.canvas.getContext('2d');
              ctx.save();
              ctx.globalCompositeOperation = 'destination-over';
              ctx.fillStyle = "#ffffff";
              ctx.fillRect(0, 0, chart.width, chart.height);
              ctx.restore();

              if (chart._currently_animating && !chart._currently_animating_initial) return;
              if (chart.options.scales.x.min < datasetInformation.electionDate &&
                  chart.options.scales.x.max >= datasetInformation.electionDate) {
                let x = chart.scales.x.getPixelForValue(datasetInformation.electionDate);
                let topY = chart.scales.y.top;
                let bottomY = chart.scales.y.bottom;
                let text = "Bundestagswahl";
                let textHeight = 15;
                let offsetY = 15;
                let textOffsetX = 2;
                let textOffsetY = offsetY - 2;
                let color = "#383838";
                ctx.beginPath();
                ctx.moveTo(x, topY + textHeight + offsetY);
                ctx.lineTo(x, bottomY);
                ctx.lineWidth = 1;
                ctx.strokeStyle = color;
                ctx.setLineDash([5, 5]);
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.textAlign = "right";
                ctx.textBaseline = "bottom";
                ctx.fillStyle = color;
                ctx.font = 'bold 14px "Helvetica Neue", Helvetica, Arial, sans-serif'
                ctx.fillText(text, x + textOffsetX, topY + textOffsetY + textHeight);
                ctx.restore();
                ctx.font = '12px "Helvetica Neue", Helvetica, Arial, sans-serif'
              }

            }

          }
        ]
      });

      component.chart._electionDate = datasetInformation.electionDate;
      component.chart._currently_handling_mouse_event = false;

      let event_data = this.generateEventsDatasets();
      component.chart.data.datasets.push(...event_data.datasets);

      this.chart.options.scales.y2 = {
        type: 'linear',
        stack: 'yStack',
        stackWeight: 1,
        min: event_data.yRanges.min,
        max: event_data.yRanges.max,
        offset: true,
        grid: {
          display: false
        },
        ticks: {
          display: false
        },

      };

      component.setGanttStackWeight(ganttVisible);
      component.chart.options.animation = {
        duration: 1000,
        onProgress: function (context, args) {
          component.chart._currently_animating_initial = context.initial;
          component.chart._currently_animating = true;
        },
        onComplete: function (context) {
          component.chart._currently_animating = false;
          component.chart._currently_animating_initial = false;
          component.redrawHoverLabels(component.chart, true, true)
        }
      }
      component.chart.update();
      component.chart._gantt_visible = ganttVisible;
    },
    handleMousemoveEvent(chart, event) {
      let date = new Date(chart.scales.x.getValueForPixel(event.x));
      if (event.type === "mousemove") {
        if (date < chart.options.scales.x.min || date > chart.options.scales.x.max ||
            event.y < chart.scales.y.top || event.y > chart.scales.y.bottom) {
          return;
        }
        chart._mousemove_date = date;
        chart._mousemove_x = Math.round(chart.scales.x.getPixelForValue(chart._mousemove_date));
        chart._mousemove_active = true;
        this.$emit("onTimelineUpdate", chart._mousemove_date)
        this.redrawHoverLabels(chart, true);
      }
    },
    redrawHoverLabels(chart, redrawChart, force = false) {
      if (!force && chart._last_hover_label_x === chart._mousemove_x) return;
      chart._last_hover_label_x = chart._mousemove_x;
      if (redrawChart) chart.draw();
      drawHoverLabels(chart);
    },
    eventLength(event) {
      return event.end - event.start;
    },
    generateEventsDatasets() {
      let component = this;
      let visible_events = this.eventsProxy.slice().sort(function (a, b) {
        if (component.eventLength(a) < component.eventLength(b)) return 1
        if (component.eventLength(a) > component.eventLength(b)) return -1
        return 0
      });

      let layers = this.eventsProxy.map(function (e, i) {
        return {index: i, ranges: []}
      });

      // Determine layer
      let eventXRanges = visible_events.map(function (event) {
        return calculateXRangeForEvent(component.chart, event, component.chartXRangeSteps)
      });

      let minimumEventsX = Math.min(...eventXRanges.map(function (range) {
        return range.min;
      }));

      if (minimumEventsX < 0) {
        eventXRanges.forEach(function (range) {
          range.min += Math.abs(minimumEventsX);
          range.max += Math.abs(minimumEventsX);
        })
      }

      return {
        datasets: visible_events.map(function (event, i) {
          let eventXRange = eventXRanges[i];
          let layer = layers.find(function (layer) {
            let fitsInLayer = true;
            layer.ranges.forEach(function (range) {
              if (range.min < eventXRange.max && range.max >= eventXRange.max) { // ( ... x2 ... )
                fitsInLayer = false;
              }

              if (range.min < eventXRange.min && range.max >= eventXRange.min) { // ( ... x1 ...)
                fitsInLayer = false;
              }

              if (eventXRange.min <= range.min && eventXRange.max >= range.max) { // x1 (...) x2
                fitsInLayer = false;
              }

            });

            return fitsInLayer;
          });

          layer.ranges.push(eventXRange);

          return {
            data: [
              {x: event.start, y: layer.index},
              {x: event.end, y: layer.index}
            ],
            label: null,
            layer: layer.index + 1,
            type: "gantt",
            yAxisID: 'y2',
            isActiveFunction: component.isEventActive,
            isVisible: true,
            eventId: event.id,
            eventName: event.name,
            eventTextAlignment: eventXRange.id,
            eventParty: event.party,
            eventColor: event.party === null ? "#c48010" : polls.config.colors[event.party],
            order: 2,
            pointRadius: 0,
            clip: {
              top: false,
              bottom: false,
              left: false,
              right: false
            },
            borderColor: "#cccccc"
          }
        }),
        labels: visible_events.map(function (event) {
          return event.name
        }),
        yRanges: {
          min: 0, max: layers.find(function (layer) {
            return layer.index > 0 && layer.ranges.length === 0;
          }).index - 1
        }
      }
    },
    onEventsChanged() {
      const component = this;
      if (this.chart === undefined) {
        Chart.register(...registerables);
        Chart.register(GanttController);
        this.renderPollsChart();
      }

      let activeEvent = this.eventsProxy.find(function (e) {
        return e.isActive;
      });

      if (activeEvent !== undefined && (activeEvent.start < this.currentChartDate || activeEvent.start >= this.currentChartEndDate)) {

        this.chartXRangeSteps.forEach(function (xRange, i) {
          if (activeEvent.start >= xRange.start_date && activeEvent.start <= xRange.end_date)
            component.activeXRange = i;
        })

        this.updateChartDates();
      } else if (!this.chart._mousemove_active) {
        this.chart.update("none");
      }
    },
    setGanttStackWeight(isGanttVisible) {
      const ganttStacks = Math.max(...this.chart.data.datasets.filter(function (dataset) {
        return dataset.type === "gantt";
      }).map(function (dataset) {
        return dataset.layer;
      }));
      const heightPerGantt = 25;
      const height = this.chart.chartArea.bottom - this.chart.chartArea.top;
      const heightGanttPlot = ganttStacks * heightPerGantt;
      const heightPollPlot = height - heightGanttPlot;
      this.chart.options.scales.y2.stackWeight = isGanttVisible ? heightGanttPlot / heightPollPlot : heightGanttPlot / heightPollPlot;
    },
    onWindowResize: debounce(function () {
      let ganttVisible = this.isGanttVisible()

      let event_data = this.generateEventsDatasets();
      this.chart.data.datasets = this.chart.data.datasets.filter(function (dataset) {
        return dataset.type !== "gantt";
      })
      this.chart.data.datasets.push(...event_data.datasets);
      this.chart.options.scales.y2.min = event_data.yRanges.min;
      this.chart.options.scales.y2.max = event_data.yRanges.max;

      this.setGanttStackWeight(ganttVisible);

      this.chart.update("none")
    }, 200, false)
  },
  beforeCreate() {
    polls.config.date_end = new Date(polls.config.date_end);
  },
  created() {
    this.eventsProxy.forEach(function (event) {
      event.isActive = false;
    })
    window.addEventListener("resize", this.onWindowResize);
  },
  unmounted() {
    window.removeEventListener("resize", this.onWindowResize);
  }

}
</script>

<style scoped>
.chart-width {
  width: 98vw;
}

.poll-chart {
  position: relative;
  touch-action: pan-y;
  height: 100vh;
}


@media (min-width: 576px) {
  .poll-chart {
    height: 90vh;
  }
}

@media (min-width: 768px) {
  .poll-chart {
    height: 70vh;
  }
}

@media (min-width: 992px) {
  .poll-chart {
    height: 50vh;
  }
}

@media (min-width: 1200px) {
}

@media (min-width: 1400px) {
}


</style>