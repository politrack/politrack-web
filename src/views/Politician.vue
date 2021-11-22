<template>
  <div>
    <v-container>
      <v-row>
        <v-col lg="8">
          <ProfileCard :politician="politician"/>

          <v-row class="mt-4">
            <v-col lg="12">
              <MentionedWith :mentions="politician.mentionedWith"/>
            </v-col>
          </v-row>

        </v-col>

        <v-col lg="4">
          <TopicDistribution :statistics="this.politician.statistics"/>
        </v-col>
      </v-row>
    </v-container>

    <div class="px-5">
      <h3 class="mb-2">Aktuelle Berichte</h3>
      <v-slide-group
          class="overflow-y-visible"
          multiple
          show-arrows
      >
        <v-slide-item
            v-for="article in politician.articles"
            :key="article.id"
        >
          <div class="h-100">
            <ArticleCard :article="article"/>
          </div>
        </v-slide-item>
      </v-slide-group>
    </div>

    <div class="px-5 mt-5">
      <h3 class="mb-2">Aktuelle Aussagen</h3>

      <v-row>
        <v-col lg="8">
          <v-slide-group
              class="overflow-y-visible"
              multiple
              show-arrows
          >
            <v-slide-item
                v-for="tweet in politician.tweets"
                :key="tweet.id"
            >
              <div class="h-100">
                <TweetCard :tweet="tweet" :user="politician.twitterUser"/>
              </div>
            </v-slide-item>
          </v-slide-group>
        </v-col>
        <v-col lg="4">
          <QuotesCard :politician="politician"/>
        </v-col>
      </v-row>
    </div>

    <v-row class="mt-5 px-5">
      <v-col lg="8">
        <ArticlesOverTime :articles="this.politician.articles"/>
      </v-col>

      <v-col lg="4">
        <SourceDistribution :statistics="this.politician.statistics"/>
      </v-col>

    </v-row>
  </div>
</template>

<script>
import mockup from "../assets/politicians/mockup.json";
import TweetCard from "../components/profiles/TweetCard";
import ArticleCard from "../components/profiles/ArticleCard";
import SourceDistribution from "../components/profiles/SourceDistribution";
import ArticlesOverTime from "../components/profiles/ArticlesOverTime";
import TopicDistribution from "../components/profiles/TopicDistribution";
import MentionedWith from "../components/profiles/MentionedWith";
import QuotesCard from "../components/profiles/QuotesCard";
import ProfileCard from "../components/profiles/ProfileCard";


export default {
  name: "Politician",
  components: {
    TweetCard,
    ArticleCard,
    ArticlesOverTime,
    SourceDistribution,
    TopicDistribution,
    QuotesCard,
    MentionedWith,
    ProfileCard
  },
  data: () => {
    return {
      id: null,
      politician: mockup,
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.initializeSortedEntries();
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

<style>
.avatar-image {
  object-fit: cover
}

.slider-card {
  width: 300px;
  height: 100%;
  margin-left: 1em;
  margin-right: 1em;
}

.overflow-y-visible div {
  overflow-y: visible !important;
}

div.h-100 {
  height: 100%;
}
</style>