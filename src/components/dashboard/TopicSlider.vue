<template>
  <div id="topicSliderContainer" class="overflow-x-hidden flicking-container">
    <flicking :plugins="plugins" :options="options">
      <div v-for="(topic, idx) in topics" v-bind:key="idx">
        <div class="pa-2 h-100">
          <news-headline :topic="topic"></news-headline>
        </div>
      </div>

    </flicking>
    <span class="flicking-arrow-prev"></span>
    <span class="flicking-arrow-next"></span>
  </div>
</template>

<script>
import {Flicking} from "@egjs/vue-flicking";
import { Arrow } from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/arrow.css";
import NewsHeadline from "./NewsHeadline";

export default {
  name: "TopicSlider",
  props: {
    topics: Array
  },
  data() {
    return {
      options: {
        align: "prev",
        bound:true,
        moveType: "snap"
      },
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
@import url("../../../node_modules/@egjs/vue-flicking/dist/flicking.css");

.flicking-container {
  padding: 0 80px 0 80px;
  position: relative;
}

.flicking-arrow-prev:not(.flicking-arrow-disabled)::before, .flicking-arrow-prev:not(.flicking-arrow-disabled)::after, .flicking-arrow-next:not(.flicking-arrow-disabled)::before, .flicking-arrow-next:not(.flicking-arrow-disabled)::after {
  background-color: #b5179e !important;
}
</style>