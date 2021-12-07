<template>
  <v-card
      class="slider-card d-flex flex-column justify-space-between rounded-xl pa-1 opaque blur-background"
      rounded>
    <v-card-title>
      <v-icon left size="16">
        fas fa-quote-right
      </v-icon>
      <span class="ml-auto font-weight-light text-caption">{{ moment(quote.article.published).fromNow() }}</span>
    </v-card-title>

    <v-card-text class="" style="font-size: 20px">
      {{ quote.quote }}
    </v-card-text>

    <v-card-actions>
      <a :href="quote.article.url" class="ms-2" style="text-decoration: none; line-height: normal"><span class="ml-auto font-weight-light text-caption">{{ quote.article.title }}</span></a>
      <v-spacer></v-spacer>
      <span class="me-2 ml-auto font-weight-light text-caption">{{ sources[quote.article.source].label }}</span>
    </v-card-actions>
  </v-card>
</template>

<script>
import sources from "../../assets/sources_config.json";


export default {
  name: "ArticleCard",
  props: {
    quote: Object
  },
  data() {
    return {
      sources: sources
    }
  }
}
</script>

<style scoped>
</style>