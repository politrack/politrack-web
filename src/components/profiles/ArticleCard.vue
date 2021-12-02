<template>
  <v-card
      class="slider-card"
      max-width="450">
    <v-img
        :src="image"
        v-if="image"
        height="100px">
    </v-img>
    <v-card-title class="article-title">
      {{ article.title }}
    </v-card-title>
    <v-card-subtitle>
      <span>{{ sources[article.source].label }}</span>
      <span class="float-right">{{ moment(article.published).fromNow() }}</span>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import sources from "../../assets/sources_config.json";


export default {
  name: "ArticleCard",
  props: {
    article: Object
  },
  data() {
    return {
      image: this.article.images.length > 0 ? this.article.images[0].url : null,
      sources: sources
    }
  }
}
</script>

<style scoped>
</style>