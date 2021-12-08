<template>
  <v-card
      class="slider-card"
      rounded
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
    <div class="highlight-text ma-5" v-html="article.highlight">
    </div>
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

<style>
.highlight-text {
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.0071428571em;
}

.highlight-text em {
  color: #000000;
  font-style: normal;
  font-weight: bold;
}

</style>