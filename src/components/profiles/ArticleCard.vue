<template>
  <v-card
      class="slider-card pb-4"
      rounded
      width="300">
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
    <div class="highlight-text ms-5 me-5">
      <span v-html="highlight" v-bind:key="index" v-for="(highlight, index) in article.highlight"/>
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

.article-title {
  font-size: 16px;
}
.highlight-text {
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.0071428571em;
}

.slider-card {
  width: 300px;
  margin-left: 1em;
  margin-right: 1em;
}


.highlight-text em {
  color: #000000;
  font-style: normal;
  font-weight: bold;
}

</style>