<template>
  <div class="flicking-container">

    <Flicking ref="flicking" :options="options" :plugins="plugins" @ready="ready=true">
      <v-card class="eventCard card carousel-card mx-2" v-for="event in eventsProxy"
              flat
              v-bind:key="event.id" :class="{ active: isActive(event) }"
              @click="toggleActive($event, event)" :data-event="event.id">
        <v-img class="card-img-top" :src="getImgUrl(event)" alt="">
          <div class="card-img-overlay white--text">
            <v-card-title>{{ event.name }}</v-card-title>
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
    return {
      ready: false,
      attributions: event_images,
      // Todo: make adjustable based on breakpoints
      currentSlidesPerView: 5,
      options: {
        horizontal: true,
        useResizeObserver: true,
        align: "center",
        bound: true,
        moveType: ["snap", {stopAtEdge: true}]
      },
      plugins: [new Arrow({parentEl: document.body})],
      swiperOptions: {
        navigation: true,
        watchSlidesVisibility: true,
        simulateTouch: false,
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 0
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 5
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 5
          },
          992: {
            slidesPerView: 5,
            spaceBetween: 5
          },
          1200: {
            slidesPerView: 7,
            spaceBetween: 5
          }
        }
      },
    }
  },
  watch: {
    activeIndex: {
      handler: function (oldVal, newVal) {
        //let idx = Math.max(0, newVal)
        if (this.ready && newVal >= 0) {
          this.$refs.flicking.moveTo(newVal, 200).catch((err) => {
            console.log("Flicking error", err)
          });
        }
      }
    }
  },
  mounted() {
    //this.slider = new Flicking("#eventsFlicking")
    //console.log('mounted')
  },
  methods: {
    getImgUrl(event) {
      let images = require.context('../../assets/btw/events/', false, /\.png$/)
      try {
        return images('./' + event.id + ".png")
      } catch (e) {
        return ""
      }
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

.attribution-text {
  font-size: 8px;
}

.eventCard {
  height: 180px;
  margin-top: 10px;
  transition: margin-top 0.3s ease-out;
  width: 180px;
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
}

.carousel-card.active .card-img-overlay {
  z-index: 30;
  background: rgba(144, 144, 144, .3);
}

</style>