<template>
  <div class="events">
    <h3 class="mt-3">
      <router-link class="text-decoration-none text-dark" :to="{name: 'event', params: {id: ev.id}}">{{
          ev.name
        }}
      </router-link>
    </h3>
    <div class="row">
      <div class="col-md-3 mt-1 article-container" v-for="article in articles" :key="article.id">
        <Article v-bind:article="article" v-bind:currentDate="currentDate"/>
      </div>
    </div>
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
import Article from "./Article.vue"

export default {
  name: "Event",
  components: {Article},
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
      if(!(article.info.source in articlesBySource)) articlesBySource[article.info.source] = [];
      if(!article.info.is_paid) articlesBySource[article.info.source].push(article);
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


</style>