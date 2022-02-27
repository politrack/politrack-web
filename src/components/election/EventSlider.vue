<template>
  <div class="flicking-container">
    <Flicking ref="flicking" :options="options" :plugins="plugins" @ready="ready=true">
      <v-card class="eventCard card carousel-card mx-1" v-for="event in eventsProxy"
              flat
              v-bind:key="event.id" :class="{ active: isActive(event) }"
              @click="toggleActive($event, event)" :data-event="event.id">
        <v-img class="card-img-top" :src="getImgUrl(event)" alt="">
          <div class="card-img-overlay white--text">
            <v-card-title>{{ event.name }}</v-card-title>

            <div v-if="attributions[event.id] !== undefined" class="small text-light text-end">
              <v-menu open-on-hover right offset-y nudge-bottom="5" close-delay="100">
                <template v-slot:activator="{ on, attrs }">
                  <div class="attribution-text" v-bind="attrs" v-on="on">
                    Foto von
                    {{ attributions[event.id].author.first_name }}
                    {{ attributions[event.id].author.last_name }}
                  </div>
                </template>

                <v-card dark class="tooltip-dark">
                  <v-card-text>
                    <a :href="attributions[event.id].author.url" target="_blank">
                      {{ attributions[event.id].author.first_name }} {{ attributions[event.id].author.last_name }}
                    </a>,
                    <a :href="attributions[event.id].license.url" target="_blank">
                      {{ attributions[event.id].license.name }}
                    </a>
                    aus {{ attributions[event.id].source.name }}
                  </v-card-text>
                </v-card>
              </v-menu>
            </div>
          </div>
        </v-img>
      </v-card>
    </Flicking>
    <span class="flicking-arrow-prev"></span>
    <span class="flicking-arrow-next"></span>
  </div>
</template>

<script>
import {Arrow} from "@egjs/flicking-plugins";

const $ = require('jquery')
window.$ = $
import event_images from "../../assets/btw/event_images.json"
import {Flicking} from "@egjs/vue-flicking";

export default {
  name: "EventSlider",
  props: {
    eventsProxy: Array,
    activeIndex: Number,
    updateActiveIndex: Function
  },
  components: {
    Flicking
  },
  data() {
    let tooltipsVisible = {};
    this.eventsProxy.forEach(function (e) {
      tooltipsVisible[e.id] = false;
    });

    return {
      ready: false,
      attributions: event_images,
      tooltipsVisible: tooltipsVisible,
      currentSlidesPerView: 7,
      currentMoveEvent: null,
      options: {
        horizontal: true,
        interruptable: true,
        useResizeObserver: true,
        align: "center",
        bound: true,
        moveType: ["snap", {stopAtEdge: true}]
      },
      plugins: [new Arrow({parentEl: document.body})]
    }
  },
  watch: {
    activeIndex: {
      handler: function (newVal) {
        //let idx = Math.max(0, newVal)
        if (this.ready && newVal >= 0) {
          this.$refs.flicking.moveTo(newVal, 200).catch(() => {
          });
        }
      }
    }
  },
  methods: {
    getImgUrl(event) {
      return "https://api.v2202110157813164869.happysrv.de/web/data/img/events/" + event.id + ".png";
    },
    isActive(event) {
      return event.idx === this.activeIndex;
    },
    toggleActive(e, event) {
      if (!$(e.target).hasClass("attribution-link")) {
        let eventProxy = this.eventsProxy[event.idx];
        if (this.activeIndex === eventProxy.idx) {
          this.updateActiveIndex(-1);
        } else {
          this.updateActiveIndex(eventProxy.idx);
        }
      }
    },
    onSlideBreakpoint(swiper, breakpointParams) {
      this.currentSlidesPerView = breakpointParams.slidesPerView;
    }
  }
}
</script>

<style scoped>
@import "../../../node_modules/@egjs/vue-flicking/dist/flicking.css";
@import "../../../node_modules/@egjs/flicking-plugins/dist/arrow.css";

.attribution-text {
  font-size: 11px !important;
  padding-right: 1em;
  padding-left: 1em;
  padding-bottom: 1em;
}

.flicking-container {
  padding: 0 80px 0 80px;
  position: relative;
  min-width: 100%;
}

@media (max-width: 960px) {
  .flicking-container {
    padding: 0;
  }
}

.flicking-arrow-prev.flicking-arrow-disabled::before, .flicking-arrow-prev.flicking-arrow-disabled::after, .flicking-arrow-next.flicking-arrow-disabled::before, .flicking-arrow-next.flicking-arrow-disabled::after {
  background-color: #949494 !important;
}

.flicking-arrow-prev:not(.flicking-arrow-disabled)::before, .flicking-arrow-prev:not(.flicking-arrow-disabled)::after, .flicking-arrow-next:not(.flicking-arrow-disabled)::before, .flicking-arrow-next:not(.flicking-arrow-disabled)::after {
  background-color: #b5179e !important;
}

.eventCard.active {
  margin-top: 0;
}

.eventCard {
  height: 180px;
  margin-top: 10px;
  transition: margin-top 0.3s ease-out;
  width: 180px;
  max-width: 100%;
}

.carousel-card {
  text-align: left;
}

.carousel-card .card-img-top {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.carousel-card .card-img-overlay {
  background: rgba(144, 144, 144, .7);
  transition: background-color .3s;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.carousel-card.active .card-img-overlay {
  z-index: 30;
  background: rgba(144, 144, 144, .3);
}

.tooltip-dark a {
  color: #93dbff;
  text-decoration: none;
}

</style>