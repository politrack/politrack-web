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
        <v-slide-group
            class="overflow-y-visible"
            multiple
            show-arrows>
          <v-slide-item
              v-for="article in politician.articles"
              justify="center"
              :key="article.id">
              <div class="pb-2 pt-2 d-flex align-center justify-center">
                <ArticleCard :article="article" class="blur-background opaque rounded-xl"/>
              </div>
          </v-slide-item>
        </v-slide-group>
      </div>

      <div class="content-container mt-3" v-if="politician && politician.quotes.length > 0">
        <h2 class="mb-2">Aktuelle Aussagen</h2>
        <v-row>
          <v-col lg="12">
            <v-slide-group
                multiple
                show-arrows>
              <v-slide-item
                  v-for="(quote, index) in politician.quotes"
                  :key="index">
                <div class="h-100 pt-2 pb-2">
                  <SingleQuote :quote="quote"/>
                </div>
              </v-slide-item>
            </v-slide-group>
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
import axios from "axios";


export default {
  name: "Politician",
  components: {
    SingleQuote,
    ArticleCard,
    ArticlesOverTime,
    SourceDistribution,
    TopicDistribution,
    ProfileCard
  },
  data() {
    return {
      id: null,
      politician: null,
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
.avatar-image {
  object-fit: cover
}

.overflow-y-visible div {
  overflow-y: visible !important;
}

div.h-100 {
  height: 100%;
}

.header-content {
  padding-bottom: 10px;
  padding-top: 60px;
}

.content-container, .bottom-container {
  padding: 0 70px 10px 70px
}

</style>