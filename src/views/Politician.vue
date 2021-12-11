<template>
  <div>
    <div class="header-content" v-if="politician">
      <v-container>
        <v-row>
          <v-col lg="8">
            <v-card rounded class="pa-3 h-100 rounded-xl blur-background opaque">
              <ProfileCard :politician="politician.politician" :mentionedWith="politician.mentionedWith"
                           :statistics="politician.statistics"/>
            </v-card>
          </v-col>
          <v-col lg="4">
            <v-card class="pa-3 rounded-xl blur-background opaque">
              <TopicDistribution :light="false" :statistics="this.politician.statistics" style="height: 180px"/>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="mt-5" v-if="politician">
      <div class="content-container">
        <h2 class="mb-2">Aktuelle Berichte</h2>
        <div class="overflow-x-hidden position-relative">
          <Flicking
              :plugins="pluginsArticles"
              :options="options">
            <div v-for="article in politician.articles"
                :key="article.id" class="align-self-center">
              <div class="pb-2 pt-2 d-flex align-center justify-center">
                <ArticleCard :article="article" class="blur-background opaque rounded-xl"/>
              </div>
            </div>
          </Flicking>
          <span class="flicking-arrow-prev flicking-arrow-prev-articles"></span>
          <span class="flicking-arrow-next flicking-arrow-next-articles"></span>
        </div>
      </div>

      <div class="content-container mt-3" v-if="politician && politician.quotes.length > 0">
        <h2 class="mb-2">Aktuelle Aussagen</h2>
        <v-row>
          <v-col lg="12">
            <div class="overflow-x-hidden position-relative">
              <Flicking
                  :plugins="pluginsQuotes"
                  :options="options">
                <div v-for="(quote, index) in politician.quotes"
                     :key="index" class="align-self-center">
                  <div class="pb-2 pt-2 d-flex align-center justify-center">
                    <SingleQuote :quote="quote"/>
                  </div>
                </div>
              </Flicking>
              <span class="flicking-arrow-prev flicking-arrow-prev-quotes"></span>
              <span class="flicking-arrow-next flicking-arrow-next-quotes"></span>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>

    <div class="bottom-container" v-if="politician">
      <v-card class="pa-5 rounded-xl blur-background opaque" style="margin-bottom: 50px">
        <v-card-title class="mt-5 pt-2 ps-2" style="font-size: 25px">Präsenz in den Medien</v-card-title>
        <v-row class="px-5 pb-3">
          <v-col lg="8">
            <ArticlesOverTime :statistics="politician.statistics"/>
          </v-col>
          <v-col lg="4">
            <SourceDistribution :statistics="politician.statistics" style="height: 250px"/>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
import ArticleCard from "../components/profiles/ArticleCard";
import SourceDistribution from "../components/profiles/SourceDistribution";
import ArticlesOverTime from "../components/profiles/ArticlesOverTime";
import TopicDistribution from "../components/profiles/TopicDistribution";
import ProfileCard from "../components/profiles/ProfileCard";
import SingleQuote from "../components/profiles/SingleQuote";
import {Flicking} from "@egjs/vue-flicking";
import {Arrow} from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/arrow.css";

import axios from "axios";


export default {
  name: "Politician",
  components: {
    SingleQuote,
    ArticleCard,
    ArticlesOverTime,
    SourceDistribution,
    TopicDistribution,
    ProfileCard,
    Flicking
  },
  data() {
    return {
      id: null,
      politician: null,
      options: {
        align: "prev",
        bound: true,
        moveType: "snap"
      },
      pluginsArticles: [new Arrow(
          {
            parentEl: document.body,
            prevElSelector: ".flicking-arrow-prev-articles",
            nextElSelector: ".flicking-arrow-next-articles"
          }
      )],
      pluginsQuotes: [new Arrow(
          {
            parentEl: document.body,
            prevElSelector: ".flicking-arrow-prev-quotes",
            nextElSelector: ".flicking-arrow-next-quotes"
          }
      )]
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    axios.get(process.env.VUE_APP_URL + '/web/data/politicians/' + this.id + '.json').then((resp) => {
      let result = resp.data
      console.log(result)
      this.politician = {
        'id': this.id,
        'articles': result['articles'],
        'politician': result['politician'],
        'tweets': [],
        'quotes': result['quotes'],
        'statistics': result['statistics'],
        'mentionedWith': result['mentionedWith']
      }
      this.initializeSortedEntries();
    })
  },
  methods: {
    initializeSortedEntries() {
      this.politician.tweets.forEach(function (item) {
        item["entryType"] = "tweet";
        item["created_at"] = new Date(item["created_at"]);
      });

      this.politician.articles.forEach(function (item) {
        item["entryType"] = "article";
        item["published"] = new Date(item["published"]);
      });

      this.politician.articles = this.politician.articles.sort(function (a, b) {
        return b.published - a.published;
      });

      this.politician.tweets = this.politician.tweets.sort(function (a, b) {
        return b.created_at - a.created_at;
      });
    }
  }
}
</script>

<style scoped>
@import url("../../node_modules/@egjs/vue-flicking/dist/flicking.css");

.overflow-y-visible div {
  overflow-y: visible !important;
}

.header-content {
  padding-bottom: 10px;
  padding-top: 60px;
}

.content-container, .bottom-container {
  padding: 0 70px 10px 70px
}

.position-relative {
  position: relative;
}

.flicking-arrow-prev:not(.flicking-arrow-disabled)::before, .flicking-arrow-prev:not(.flicking-arrow-disabled)::after, .flicking-arrow-next:not(.flicking-arrow-disabled)::before, .flicking-arrow-next:not(.flicking-arrow-disabled)::after {
  background-color: #b5179e !important;
}
</style>