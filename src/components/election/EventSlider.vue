<template>
  <div class="container">
    <swiper
        :navigation="true"
        ref="mySwiper"
        :options="swiperOptions"
        @swiper="onSwiper">
      <swiper-slide v-for="event in events"
                    v-bind:key="event.id"
                    ref="swiper">
        <div class="eventCard card carousel-card" :class="{ active: isActive(event) }"
             @click="toggleActive($event, event)" :data-event="event.id">
          <img class="card-img-top" :src="getImgUrl(event)" alt="">
          <div class="card-img-overlay text-white d-flex flex-column justify-content-between">
            <div><h4 class="card-title">{{ event.name }}</h4></div>

            <div v-if="attributions[event.id] !== undefined" class="small text-light text-end">
              <small>
              <span class="text-decoration-none text-light attribution-link cursor-pointer attribution-text"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    data-bs-trigger="focus"
                    tabindex="0"
                    data-bs-html="true">
                Foto von {{ attributions[event.id].author.first_name }}
                {{ attributions[event.id].author.last_name }}
                <div style="display: none;">
                  <a :href="attributions[event.id].author.url">
                    {{ attributions[event.id].author.first_name }}
                    {{ attributions[event.id].author.last_name }}</a>,
                  <a :href="attributions[event.id].license.url">
                    {{ attributions[event.id].license.name }}</a>
                  aus {{ attributions[event.id].source.name }}
                </div>
              </span>
              </small>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
const $ = require('jquery')
window.$ = $
import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
import event_images from "../../assets/btw/event_images.json"
import 'swiper/swiper-bundle.css'
import SwiperCore, {
  Navigation
} from 'swiper';

SwiperCore.use([Navigation]);

export default {
  name: "EventSlider",
  props: {
    events: Array,
    eventsProxy: Array
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  data() {
    return {
      attributions: event_images,
      currentSlidesPerView: 7,
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
  watch:
      {
        eventsProxy: {
          handler: function (oldVal, newVal) {
            let activeIdx = -1;
            for (let idx = 0; idx < newVal.length; idx++) {
              if (newVal[idx].isActive) {
                activeIdx = idx
              }
            }
            if (activeIdx !== -1) {
              let idx = Math.max(0, activeIdx - Math.floor(this.currentSlidesPerView / 2))
              this.swiper.slideTo(idx);
            }
          }, deep: true
        }
      },

  mounted() {
    console.log('mounted')
    console.log(this.swiper)
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
    getEventProxy(event) {
      return this.eventsProxy.find(function (e) {
        return e.id === event.id;
      });
    },
    isActive(event) {
      return this.getEventProxy(event).isActive;
    },
    toggleActive(e, event) {
      if (!$(e.target).hasClass("attribution-link")) {

        let eventProxy = this.getEventProxy(event);
        eventProxy.isActive = !eventProxy.isActive;
        this.eventsProxy.forEach(function (e) {
          if (e !== eventProxy) {
            e.isActive = false;
          }
        });
      }

    },
    onSwiper(swiper) {
      console.log('onSwiper')
      this.swiper = swiper
      /*$(".attribution-link").each(function (idx) {
        new Tooltip($(this), {
          "title": $(this).find("div").html()
        })
      })*/
    },
    onSlideBreakpoint(swiper, breakpointParams) {
      this.currentSlidesPerView = breakpointParams.slidesPerView;
    }
  }
}
</script>

<style scoped>

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
}

.carousel-card {
  text-align: left;
}

.carousel-card img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.carousel-card .card-img-overlay {
  background: rgba(144, 144, 144, .7);
  transition: background-color .3s;
}

.carousel-card.active .card-img-overlay {
  background: rgba(144, 144, 144, .3);
}

</style>