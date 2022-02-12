<template>
  <div>

    <div class="container-fluid">

      <div class="container">
        <!--<img :src="getImgUrl(event)" class="position-absolute">-->
        <div class="row mt-3">
          <div class="col-12">
            <h1>{{ event.name }}</h1>

            <p class="text-muted">
              Dieses Ereignis fand hauptsächlich zwischen dem {{ toTimeString(event.start) }} und dem
              {{ toTimeString(event.end) }} statt. Unten finden Sie eine chronologische Auflistung von
              {{ event.articles.length }}
              Nachrichtenartikeln. Darüber hinaus gibt es Statistiken über die Verteilung der Artikel auf die
              Zeitungen und über das Interesse über die Zeit. Mehr informationen wie diese Artikel
              automatisch extrahiert wurden finden Sie
              <router-link :to="{name: 'about'}" class="text-decoration-none">hier</router-link>
              .
            </p>
          </div>
        </div>
        <div class="row align-items-center">
          <div class="col-lg-12">
            <EventArticlesOverTime :event="event"/>
          </div>
        </div>
      </div>

      <div class="bg-light py-5">
        <div class="container">
          <h3 class="mb-4">Alle Artikel</h3>
          <form class="mb-3">
            <div class="row">
              <div class="col-lg-4">
                <div class="input-group rounded">
                  <label class="input-group-text border-0 bg-transparent" id="search-addon" for="searchInput">
                    <i class="fas fa-search"></i>
                  </label>
                  <input id="searchInput" type="search" class="form-control rounded" placeholder="Suche"
                         v-model="search"
                         aria-describedby="search-addon"/>
                </div>
              </div>
              <div class="col-lg-8">
                <label v-for="source in sources" :key="source" class="me-3">
                  <input type="checkbox" :value="source.id" v-model="checkedSources">
                  {{ source.label }} ({{ source.count }})
                </label>
              </div>
            </div>
          </form>
          <div class="row">
          <div v-for="article in filteredArticles" :key="article" class="mb-1 col-md-6 col-lg-4">
            <Article :article="article"/>
          </div>
          </div>
          <div v-if="!filteredArticles.length" class="text-muted py-3 text-center">Zu dieser Anfrage wurden keine Artikel gefunden</div>

        </div>
      </div>


    </div>

  </div>
</template>

<script>
import sources_config from "../assets/sources_config.json";
import Article from "../../components/election/Article.vue";
import EventSourceDistribution from "../../components/election/events/EventSourceDistribution.vue"
import EventArticlesOverTime from "../../components/election/events/EventArticlesOverTime.vue"
import Fuse from 'fuse.js'

let moment = require("moment");

export default {
  name: "EventOverview.vue",
  props: {
    event: Object
  },
  data() {
    return {
      search: "",
      checkedSources: []
    }
  },
  computed: {
    filteredArticles() {
      let component = this;

      let filtered_articles = this.event.articles.filter(function (a){
        return component.checkedSources.includes(a.info.source);
      });

      return this.searchInArticles(filtered_articles);
    },
    sources() {
      Object.values(sources_config).forEach(function (s) {
        s.count = 0;
      });

      this.searchInArticles(this.event.articles).forEach(function (a){
        sources_config[a.info.source].count++;
      });

      return Object.values(sources_config);
    }
  },
  components: {
    Article, EventArticlesOverTime
  },
  methods: {
    searchInArticles(articles) {
      if(!this.search.trim().length) {
        return articles;
      }

      const options = {
        includeScore: true,
        keys: ['title']
      }

      const fuse = new Fuse(articles, options)

      return fuse.search(this.search.trim()).map(function (entry){
        return entry.item;
      })
    },
    toTimeString(dateTime) {
      return moment(new Date(dateTime)).format('Do MMMM YYYY')
    },
    getImgUrl(event) {
      let images = require.context('../assets/events/', false, /\.png$/)
      try {
        return images('./' + event.id + ".png")
      } catch (e) {
        return ""
      }
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    Object.values(sources_config).forEach(function (s) {
      s.count = 0;
    });

    this.event.articles.forEach(function (a){
      sources_config[a.info.source].count++;
    });

    this.checkedSources = Object.values(sources_config).map(function (s) {
      return s.id;
    });
  }
}
</script>

<style scoped>

</style>