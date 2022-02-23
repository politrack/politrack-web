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
        <v-container>
          <h3 class="mb-4">Alle Artikel</h3>
          <form class="mb-3">
            <v-row>
              <v-col lg="4">
                <v-text-field v-model="search" placeholder="Suche">
                  <v-icon slot="prepend" small>
                    fas fa-search
                  </v-icon>
                </v-text-field>

              </v-col>
              <v-col lg="8">
                <v-checkbox class="shrink mt-0 p-0 d-inline-block me-2"
                            v-for="source in sources" :key="source.label"  :value="source.id"
                            v-model="checkedSources" :label="source.label + ' (' + source.count + ')'">
                </v-checkbox>
              </v-col>
            </v-row>
          </form>
          <v-row>
            <v-col lg="4" sm="6" cols="12" v-for="article in filteredArticles" :key="article._id">
              <NewsCard :article="article" :max-width="300" :showPlaceholderImage="true"/>
            </v-col>
          </v-row>
          <div v-if="!filteredArticles.length" class="text-muted py-3 text-center">Zu dieser Anfrage wurden keine
            Artikel gefunden
          </div>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import sources_config from "../../assets/btw/sources_config.json";
import EventArticlesOverTime from "../../components/election/events/EventArticlesOverTime.vue"
import Fuse from 'fuse.js'
import NewsCard from "../../components/base/NewsCard";

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

      let filtered_articles = this.event.articles.filter(function (a) {
        return component.checkedSources.includes(a.source);
      });

      return this.searchInArticles(filtered_articles);
    },
    sources() {
      Object.values(sources_config).forEach(function (s) {
        s.count = 0;
      });

      this.searchInArticles(this.event.articles).forEach(function (a) {
        sources_config[a.source].count++;
      });

      return Object.values(sources_config);
    }
  },
  components: {
    NewsCard,
    EventArticlesOverTime
  },
  methods: {
    searchInArticles(articles) {
      if (!this.search.trim().length) {
        return articles;
      }

      const options = {
        includeScore: true,
        keys: ['title']
      }

      const fuse = new Fuse(articles, options)

      return fuse.search(this.search.trim()).map(function (entry) {
        return entry.item;
      })
    },
    toTimeString(dateTime) {
      return moment(new Date(dateTime)).format('Do MMMM YYYY')
    },
    getImgUrl(event) {
      let images = require.context('../../assets/btw/events/', false, /\.png$/)
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

    this.event.articles.forEach(function (a) {
      sources_config[a.source].count++;
    });

    this.checkedSources = Object.values(sources_config).map(function (s) {
      return s.id;
    });
  }
}
</script>

<style scoped>

.shrink ::v-deep .v-input--selection-controls__input {
  transform: scale(0.6);
  margin-right: 0;
}

.shrink ::v-deep .v-messages {
  display: none !important;
}

.shrink ::v-deep .v-input__slot {
  margin-bottom: 0 !important;
}
::v-deep .v-input--checkbox .v-label {
  font-size: 13px;
}

::v-deep input[type=checkbox] {
  transform: scale(1.5);
}
</style>