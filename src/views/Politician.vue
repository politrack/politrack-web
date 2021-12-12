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
            <v-card class="pa-3 rounded-xl blur-background opaque" obsolet="accent-background">
              <TopicDistribution :light="false" :statistics="this.politician.statistics" style="height: 180px"/>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="content-container pt-5">
      <div class="content" v-if="politician">
        <div>
          <h2 class="mb-2">Aktuelle Berichte</h2>
          <div class="overflow-x-hidden flicking-container">
            <Flicking
                :plugins="pluginsArticles"
                :options="options">
              <div v-for="article in politician.articles"
                   :key="article.id" class="align-self-center">
                <div class="pb-2 pt-2 mx-3 d-flex align-center justify-center">
                  <news-card :article="article" :showPlaceholderImage="false" class="rounded-xl blur-background opaque"/>
                </div>
              </div>
            </Flicking>
            <span class="flicking-arrow-prev flicking-arrow-prev-articles"></span>
            <span class="flicking-arrow-next flicking-arrow-next-articles"></span>
          </div>
        </div>

        <div class="content mt-3" v-if="politician && politician.quotes.length > 0">
          <h2 class="mb-2">Aktuelle Aussagen</h2>
          <v-row>
            <v-col lg="12">
              <div class="overflow-x-hidden flicking-container">
                <Flicking
                    :plugins="pluginsQuotes"
                    :options="options">
                  <div v-for="(quote, index) in politician.quotes"
                       :key="index" class="align-self-center">
                    <div class="pb-2 pt-2 d-flex align-center justify-center mx-5">
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

      <div class="content-end"></div>
    </div>

    <div class="bottom-container" v-if="politician">
      <h2 class="mb-2 text-center mt-5">Präsenz in den Medien</h2>
      <v-row class="px-5 pb-3">
        <v-col lg="8">
          <ArticlesOverTime :statistics="politician.statistics"/>
        </v-col>
        <v-col lg="4">
          <SourceDistribution :statistics="politician.statistics" style="height: 250px"/>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import SourceDistribution from "../components/profiles/SourceDistribution";
import ArticlesOverTime from "../components/profiles/ArticlesOverTime";
import TopicDistribution from "../components/profiles/TopicDistribution";
import ProfileCard from "../components/profiles/ProfileCard";
import SingleQuote from "../components/profiles/SingleQuote";
import {Flicking} from "@egjs/vue-flicking";
import {Arrow} from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/arrow.css";

import axios from "axios";
import NewsCard from "../components/base/NewsCard";


export default {
  name: "Politician",
  components: {
    NewsCard,
    SingleQuote,
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

.content-container > .content {
  padding: 0 70px 0 70px
}
.bottom-container {
  padding: 0 70px 10px 70px
}

.flicking-container {
  padding: 0 80px 0 80px;
  position: relative;
}

.flicking-arrow-prev:not(.flicking-arrow-disabled)::before, .flicking-arrow-prev:not(.flicking-arrow-disabled)::after, .flicking-arrow-next:not(.flicking-arrow-disabled)::before, .flicking-arrow-next:not(.flicking-arrow-disabled)::after {
  background-color: #b5179e !important;
}

.content-container {

}
.content-end {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' transform='scale(-1 1)' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='300' preserveAspectRatio='none' viewBox='0 0 1440 300'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1055%26quot%3b)' fill='none'%3e%3cpath d='M 0%2c182 C 96%2c167.6 288%2c105 480%2c110 C 672%2c115 768%2c207.6 960%2c207 C 1152%2c206.4 1344%2c127 1440%2c107L1440 300L0 300z' fill='rgba(76%2c 201%2c 240%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c81 C 96%2c110.2 288%2c225.8 480%2c227 C 672%2c228.2 768%2c98.2 960%2c87 C 1152%2c75.8 1344%2c154.2 1440%2c171L1440 300L0 300z' fill='rgba(72%2c 149%2c 239%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c93 C 96%2c118.8 288%2c214.8 480%2c222 C 672%2c229.2 768%2c118.6 960%2c129 C 1152%2c139.4 1344%2c245 1440%2c274L1440 300L0 300z' fill='rgba(247%2c 37%2c 133%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c113 C 96%2c145.2 288%2c269.2 480%2c274 C 672%2c278.8 768%2c159 960%2c137 C 1152%2c115 1344%2c158.6 1440%2c164L1440 300L0 300z' fill='rgba(239%2c 239%2c 239%2c 1)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1055'%3e%3crect width='1440' height='300' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
  background-size: 100% 100%;
  height: 4em;
}
</style>