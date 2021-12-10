<template>
  <flicking
      :options="options"
      :plugins="plugins"
  >
    <div class="align-self-start justify-center quote-card mx-5" v-for="quote in quotes"
         :key="quote.id">
      <v-card class="d-flex flex-row ma-2 pa-3"
              rounded
      >
        <div class="text-left px-5 pt-1">
          <h3 class="quote mark">&ldquo;</h3>
          <h3 class="quote text">{{ getQuoteText(quote) }}</h3>

          <h5 class="d-inline-block text-no-wrap">
            {{ quote.author }} in {{ sources[quote.article.source].label }}
          </h5>
          <a :href="quote.article.url" target="_blank">
            <small class="grey--text text--darken-3 font-italic text-decoration-none d-inline-block">
              {{ quote.article.title }}
            </small>
          </a>
        </div>

        <div>
          <v-avatar class="avatar elevation-2" size="128">
           <PoliticianImage :id="quote.politician_id"/>
          </v-avatar>
        </div>
      </v-card>
    </div>
    <div slot="viewport" class="flicking-pagination"></div>
  </flicking>

</template>

<script>
import PoliticianImage from "../base/PoliticianImage";
import sources from "../../assets/sources_config.json";
import {Flicking} from "@egjs/vue-flicking";
import {Pagination} from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/pagination.css";

export default {
  name: "QuotesCard",
  props: {
    quotes: Array,
    articleImage: Boolean
  },
  components: {
    Flicking,
    PoliticianImage
  },
  data() {
    return {
      sources: sources,
      plugins: [new Pagination()],
      options: {
        horizontal: true,
        circular: true,
        adaptive: true,
        align: 'center'
      }
    }
  },
  methods: {
    getQuoteText(quote) {
      return quote.quote.replace(/['"]+/g, '')
    },

  }
}
</script>

<style scoped>
@import url("../../../node_modules/@egjs/vue-flicking/dist/flicking.css");

.carousel-item {
  /*background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='900' preserveAspectRatio='none' viewBox='0 0 1440 900'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1010%26quot%3b)' fill='none'%3e%3crect width='1440' height='900' x='0' y='0' fill='rgba(58%2c 12%2c 163%2c 0.18823529411764706)'%3e%3c/rect%3e%3cpath d='M0%2c699.512C131.655%2c713.817%2c265.839%2c656.869%2c367.952%2c572.545C464.741%2c492.617%2c523.546%2c372.695%2c545.439%2c249.094C564.705%2c140.325%2c508.244%2c37.96%2c481.632%2c-69.248C458.023%2c-164.357%2c459.175%2c-268.314%2c398.001%2c-344.87C335.774%2c-422.743%2c241.599%2c-469.787%2c144.291%2c-491.41C50.705%2c-512.206%2c-40.286%2c-466.43%2c-136.112%2c-463.556C-274.613%2c-459.402%2c-452.608%2c-575.533%2c-543.319%2c-470.789C-634.041%2c-366.031%2c-476.562%2c-207.305%2c-478.039%2c-68.732C-479.23%2c43.053%2c-581.07%2c143.965%2c-551.018%2c251.641C-520.137%2c362.286%2c-409.062%2c425.351%2c-319.92%2c497.806C-220.071%2c578.964%2c-127.919%2c685.613%2c0%2c699.512' fill='rgba(51%2c 10%2c 142%2c 0.18823529411764706)'%3e%3c/path%3e%3cpath d='M1440 1453.231C1542.014 1443.9650000000001 1601.31 1335.71 1672.981 1262.525 1729.655 1204.653 1776.576 1142.613 1814.358 1070.963 1854.284 995.247 1898.9279999999999 919.612 1898.942 834.014 1898.9569999999999 741.4970000000001 1867.7649999999999 651.149 1814.436 575.549 1757.608 494.988 1679.542 432.013 1588.569 394.02 1490.515 353.06899999999996 1374.5720000000001 305.347 1279.084 351.97 1183.0729999999999 398.848 1176.9560000000001 532.336 1120.063 622.773 1073.871 696.1990000000001 994.481 748.512 976.264 833.325 957.518 920.6 984.279 1010.021 1019.246 1092.152 1054.91 1175.9189999999999 1109.042 1248.183 1178.132 1307.474 1255.51 1373.878 1338.453 1462.455 1440 1453.231' fill='rgba(66%2c 14%2c 184%2c 0.18823529411764706)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1010'%3e%3crect width='1440' height='900' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
  height: 100%;
  background-size: 100% 100%;*/
  margin-left: 5em;
}

.quote-card {
  max-width: 750px;
}


h3.quote.mark {
  font-family: Georgia, "Times New Roman", Times, serif;
  font-weight: bold;
  font-size: 30px;
  /*color: #66c2f5;*/
  margin-bottom: -20px;
}

h3.quote {
  font-size: 21px;
  text-align: left;
  font-family: Georgia, "Times New Roman", Times, serif;
  padding: 0;
  margin: 0;
  margin-block-start: 0;
  margin-block-end: 0;
}

.flicking-viewport {
  transition: height 500ms;
  padding-bottom: 30px;
}

.flicking-pagination {
  bottom: 0;
}

</style>