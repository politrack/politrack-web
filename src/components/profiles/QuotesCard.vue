<template>
  <flicking
      :options="options"
      :plugins="plugins"
      id="quotesViewport"
  >
    <div class="align-self-start justify-center quote-card" v-for="quote in quotes"
         :key="quote.id" :style="{'width': width+'px'}">
      <v-card class="d-flex flex-row ma-2 pa-3 rounded-xl"
              rounded
      >
        <div class="text-left px-5 pt-1">
          <h3 class="quote mark">&ldquo;</h3>
          <h4 class="quote text">{{ getQuoteText(quote) }}</h4>

          <h5 class="d-block">
            {{ quote.author }} in {{ sources[quote.article.source].label }}
          </h5>
          <a :href="quote.article.url" target="_blank" class="d-block">
            <small class="grey--text text--darken-3 font-italic text-decoration-none d-inline-block">
              {{ quote.article.title }}
            </small>
          </a>
        </div>

        <div class="ml-auto">
           <PoliticianAvatar :politician="{'id': quote.politician_id, 'first_name': quote.author, 'last_name': ''}" :size="64"/>
        </div>
      </v-card>
    </div>
    <div slot="viewport" class="flicking-pagination"></div>
  </flicking>

</template>

<script>
import sources from "../../assets/sources_config.json";
import {Flicking} from "@egjs/vue-flicking";
import {Pagination} from "@egjs/flicking-plugins";
import PoliticianAvatar from "../base/PoliticianAvatar";

export default {
  name: "QuotesCard",
  props: {
    quotes: Array,
    articleImage: Boolean
  },
  components: {
    PoliticianAvatar,
    Flicking
  },
  mounted() {
    this.resizeObserver = new ResizeObserver(this.onResize)
    this.resizeObserver.observe(document.getElementById("quotesViewport"))
    this.onResize()
  },
  beforeUnmount() {
    this.resizeObserver.unobserve(document.getElementById("quotesViewport"))
  },
  data() {
    return {
      width: 0,
      resizeObserver: null,
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
    onResize() {
      let element = document.getElementById("quotesViewport");
      if(element) this.width = element.offsetWidth
    }
  }
}
</script>

<style scoped>
@import "../../../node_modules/@egjs/vue-flicking/dist/flicking.css";
@import "../../../node_modules/@egjs/flicking-plugins/dist/pagination.css";

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

.flicking-pagination >>> .flicking-pagination-bullet-active {
  background: #b5179e !important;
}

.flicking-pagination >>> .flicking-pagination-bullet:not(.flicking-pagination-bullet-active) {
  background: #b0b0b0 !important;
}

</style>