<template>
  <v-card
      :elevation="elevation"
      :max-width="maxWidth">
    <v-img
        v-if="article.images && article.images.length > 0"
        :src="article.images[0].url"
        class="news-image">
    </v-img>
    <div class="news-image pa-3" v-if="showPlaceholderImage && (!article.images || !article.images.length)">
      <v-icon size="60" color="#999">fas fa-newspaper</v-icon>
    </div>
    <v-card-title class="article-title d-block">
      <a :href="article.url" class="text-decoration-none black--text" target="_blank">
        {{ article.title }}
      </a> <sup>
      <v-icon size="10">fas fa-external-link-alt</v-icon>
    </sup>
    </v-card-title>
    <v-card-subtitle>
      <a :href="sources[article.source].url" target="_blank"
         class="text-decoration-none">{{ sources[article.source].label }}</a>
      <span class="float-right">{{ moment(article.published).fromNow() }}</span>
    </v-card-subtitle>

    <div v-if="highlights.length">
      <div class="highlight-text ms-5 me-5 mb-3">
        <v-divider class="mb-2"></v-divider>
        <v-fade-transition group>
          <span v-html="highlight+' [...] '" v-bind:key="index" v-for="(highlight, index) in highlights"/>
        </v-fade-transition>

        <div class="primary--text text-center caption highlight-show mt-1"
             v-if="!highlightsVisible"
             @click="highlightsVisible = !highlightsVisible">
          alle Textstellen anzeigen
        </div>
      </div>
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
    elevation: Number,
    maxWidth: Number
  },
  data() {
    return {
      sources: sources,
      highlightsVisible: false
    }
  },
  computed: {
    highlights() {
      let highlightsVisible = this.highlightsVisible;
      if (this.article.highlight && this.article.highlight.length) return this.article.highlight.filter(function (highlight, index) {
        return highlightsVisible || index === 0;
      });
      else return [];
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
  line-height: 20px;
}

.highlight-text, .highlight-show {
  font-size: 0.75rem;
}

.highlight-show {
  cursor: pointer;
}

.highlight-text {
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  letter-spacing: 0.0071428571em;
}

.highlight-text >>> em {
  color: #000000;
  font-style: normal;
  font-weight: bold;
}
</style>