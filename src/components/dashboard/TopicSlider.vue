<template>
  <div>
    <v-slide-y-transition :hide-on-leave="true">
      <div :key="1" id="topicSliderContainer" class="overflow-x-hidden flicking-container" v-if="!allTopicsVisible">
        <flicking :plugins="plugins" :options="options">
          <div v-for="(topic, idx) in topics" v-bind:key="idx">
            <div class="pa-2 h-100">
              <news-headline :width="345" :topic="topic"></news-headline>
            </div>
          </div>
        </flicking>
        <span class="flicking-arrow-prev"></span>
        <span class="flicking-arrow-next"></span>
      </div>

      <v-row :key="2" v-else>
        <v-col v-for="(topic, idx) in topics" v-bind:key="idx" lg="4" sm="6" cols="12">
          <div class="pa-2 h-100">
            <news-headline :topic="topic"></news-headline>
          </div>
        </v-col>
      </v-row>
    </v-slide-y-transition>

    <div class="d-flex justify-center">
      <v-btn rounded
             color="accent"
             class="mt-3"
             @click="allTopicsVisible=!allTopicsVisible">
        <span v-if="allTopicsVisible" class="d-flex flex-column">
          <v-icon>fas fa-chevron-up</v-icon>
        </span>
        <span v-else>Entdecke alle Schlagzeilen</span>
      </v-btn>
    </div>
  </div>
</template>

<script>
import NewsHeadline from "./NewsHeadline";

import {Flicking} from "@egjs/vue-flicking";
import {Arrow} from "@egjs/flicking-plugins";


export default {
  name: "TopicSlider",
  props: {
    topics: Array
  },
  data() {
    return {
      options: {
        align: "prev",
        bound: true,
        moveType: "snap"
      },
      allTopicsVisible: false,
      plugins: [new Arrow({parentEl: document.body})]
    }
  },
  components: {
    NewsHeadline,
    Flicking
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

.flicking-arrow-prev.flicking-arrow-disabled::before, .flicking-arrow-prev.flicking-arrow-disabled::after, .flicking-arrow-next.flicking-arrow-disabled::before, .flicking-arrow-next.flicking-arrow-disabled::after {
  background-color: #949494 !important;
}

.flicking-arrow-prev:not(.flicking-arrow-disabled)::before, .flicking-arrow-prev:not(.flicking-arrow-disabled)::after, .flicking-arrow-next:not(.flicking-arrow-disabled)::before, .flicking-arrow-next:not(.flicking-arrow-disabled)::after {
  background-color: #ffffff !important;
}
</style>