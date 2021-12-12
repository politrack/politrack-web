<template>
  <v-card
      :elevation="elevation"
      max-width="450">
    <v-img
        v-if="article.images && article.images.length > 0"
        :src="article.images[0]"
        class="news-image">
    </v-img>
    <div class="news-image pa-3" v-if="showPlaceholderImage && (!article.images || !article.images.length)">
      <v-icon size="60" color="#999">fas fa-newspaper</v-icon>
    </div>
    <v-card-title class="article-title d-block">
      <a :href="article.url" class="text-decoration-none black--text" target="_blank">
        {{ article.title }}
      </a> <sup><v-icon size="10">fas fa-external-link-alt</v-icon></sup>
    </v-card-title>
    <v-card-subtitle>
      <a :href="sources[article.source].url" target="_blank" class="text-decoration-none">{{ sources[article.source].label }}</a>
      <span class="float-right">{{ moment(article.published).fromNow() }}</span>
    </v-card-subtitle>
    <div class="highlight-text ms-5 me-5" v-if="article.highlight && article.highlight.length">
      <span v-html="highlight" v-bind:key="index" v-for="(highlight, index) in article.highlight"/>
    </div>
  </v-card>
</template>

<script>
import sources from "../../assets/sources_config.json";

export default {
  name: "NewsCard",
  props: {
    article: Object,
    showPlaceholderImage: Boolean,
    elevation: Number
  },
  data(){
    return {
      sources: sources,
    }
  }
}
</script>

<style scoped>
.news-image {
  background-color: #aaa;
  height: 120px;
}
.article-title {
  font-size: 16px;
}
</style>