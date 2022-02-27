<template>
  <div class="events">
    <h3 class="mt-3 mb-3">
      <router-link class="text-decoration-none black--text" :to="{name: 'event', params: {id: ev.id}}">{{
          ev.name
        }}
      </router-link>
    </h3>
    <v-row>
      <v-col lg="4" sm="6" cols="12" v-for="article in articles" :key="article._id">
        <NewsCard :article="article" :max-width="300" :showPlaceholderImage="true" class="mx-auto" />
      </v-col>
    </v-row>
    <div class="text-end py-3">
      <router-link :to="{name: 'event', params: {id: ev.id}}" class="text-decoration-none">
        Zum Event
        <i class="fas fa-chevron-right"></i>
        <font-awesome-icon :icon="['fas', 'chevron-right']"/>
      </router-link>
    </div>
  </div>
</template>

<script>
import NewsCard from "../base/NewsCard";

export default {
  name: "Event",
  components: {NewsCard},
  props: {
    ev: Object,
    currentDate: Date
  },
  data() {
      return {
        articles: []
      }
  },
  mounted() {
    let articlesBySource = {};

    this.ev.articles.forEach(function (article){
      if(!(article.source in articlesBySource)) articlesBySource[article.source] = [];
      if(!article.is_paid) articlesBySource[article.source].push(article);
    });

    let sources = Object.keys(articlesBySource);
    let currentSource = 0;
    while(this.articles.length < Math.min(this.ev.articles.length, 12)) {
      let currentArticles = articlesBySource[sources[currentSource]];
      if(currentArticles.length) {
        let idx = Math.floor(Math.random()*currentArticles.length);
        this.articles.push(currentArticles[idx]);
        currentArticles.splice(idx, 1);
      }

      currentSource = (currentSource+1) % sources.length;
    }

    this.articles.sort(function (a, b) {
      let dateA = new Date(a.published);
      let dateB = new Date(b.published);
      if(dateA < dateB) return -1;
      if(dateB < dateA) return 1;
      return 0;
    })
  }
}
</script>

<style scoped>

h3 {
  font-size: 1.75rem;
}

</style>