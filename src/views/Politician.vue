<template>
  <div>
    <v-container>
      <v-row>
        <v-col class="text-center" lg="6">
          <v-avatar class="mx-5 mt-3" size="128">
            <img :alt="politician.label" :src="politician.image" class="avatar-image">
          </v-avatar>
          <h2 class="mt-1 grey--text text--darken-2">{{ politician.label }}</h2>
        </v-col>

        <v-col lg="6">
          <v-list two-line>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Partei</v-list-item-title>
                <v-list-item-subtitle>{{ politician.party.label }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Beruf</v-list-item-title>
                <v-list-item-subtitle>{{ politician.occupation }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Ausbildung</v-list-item-title>
                <v-list-item-subtitle>{{ politician.education }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>

    <div class="px-5">
      <h3 class="mb-2">Aktuelle Berichte</h3>
      <v-slide-group
          multiple
          show-arrows
          class="overflow-y-visible"
      >
        <v-slide-item
            v-for="tweet in politician.tweets"
            :key="tweet.id"
        >
          <TweetCard :tweet="tweet" :user="politician.twitterUser"/>
        </v-slide-item>
        <v-slide-item
            v-for="article in politician.articles"
            :key="article.id"
        >
          <ArticleCard :article="article"/>
        </v-slide-item>
      </v-slide-group>
    </div>
  </div>
</template>

<script>
import mockup from "../assets/politicians/mockup.json"
import TweetCard from "../components/profiles/TweetCard";
import ArticleCard from "../components/profiles/ArticleCard";
export default {
  name: "Politician",
  components: {
    TweetCard,
    ArticleCard
  },
  data: () => {
    return {
      id: null,
      politician: mockup
    }
  },
  mounted() {
    this.id = this.$route.params.id;
  }
}
</script>

<style>
.avatar-image {
  object-fit: cover
}

.slider-card {
  width: 300px;
  margin-left: 1em;
  margin-right: 1em;
}

.overflow-y-visible div {
  overflow-y: visible !important;
}
</style>