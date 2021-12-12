<template>
  <v-card
      elevation="2"
      width="345">
    <v-carousel
        :continuous="false"
        :cycle="true"
        :show-arrows="false"
        hide-delimiter-background
        delimiter-icon="fas fa-circle"
        class="topic-carousel"
        height="250">
      <v-carousel-item
          v-for="(article, i) in topic.articles"
          :key="i">
        <a :href="article.url" class="text-decoration-none" target="_blank">
          <v-card
              elevation="0"
              max-width="450">
            <v-img
                v-if="article.images && article.images.length > 0"
                :src="article.images[0]"
                class="news-image">
            </v-img>
            <div class="news-image pa-3" v-if="!article.images || !article.images.length">
              <v-icon size="60" color="#999">fas fa-newspaper</v-icon>
            </div>


            <v-card-title class="article-title">
              {{ article.title }}
            </v-card-title>
            <v-card-subtitle>
              <span>{{ sources[article.source].label }}</span>
              <span class="float-right">{{ moment(article.published).fromNow() }}</span>
            </v-card-subtitle>
          </v-card>
        </a>
      </v-carousel-item>
    </v-carousel>
    <v-card-actions style="margin-top: -20px">
      <v-btn
          color="deep-blue lighten-2"
          text>
        Mehr zu dem Thema
      </v-btn>
      <v-spacer></v-spacer>
      <v-avatar v-for="(person, idx) in topic.politicians.slice(0, 4)"
                class="avatar elevation-2" v-bind:key="idx" size="32"
                @click="$router.push('politician/' + person._id)"
                style="margin-left: -16px">
        <PoliticianImage :id="person._id"/>
      </v-avatar>
    </v-card-actions>
  </v-card>
</template>

<script>
import sources from "../../assets/sources_config.json";
import PoliticianImage from "../base/PoliticianImage";
export default {
  name: "PoliticiansCard",
  props: {
    topic: Object
  },
  data() {
    return {
      sources: sources
    }
  },
  components: {
    PoliticianImage
  }
}
</script>

<style scoped>
.article-title.v-card__title {
  line-height: 1.2rem;
  font-size: 16px;
  word-break: keep-all;
}

.topic-carousel >>> .v-carousel__controls__item.v-btn.v-btn--icon {
  color: grey;
  margin: 0 !important;
  padding: 0 !important;
}

.topic-carousel >>> .v-carousel__controls__item.v-btn.v-btn--icon i {
  font-size: 9px !important;
}

.topic-carousel >>> .v-carousel__controls__item.v-btn.v-btn--active {
  color: #4361ee;
}

.topic-carousel >>> .v-carousel__controls__item.v-btn.v-btn--active:before {
  opacity: 0;
}

.topic-carousel >>> .v-carousel__controls__item.v-btn:hover {
  color: #4361ee;
}

.topic-carousel >>> .v-carousel__controls__item.v-btn:hover:before {
  opacity: 0;
}

.text-decoration-none {
  text-decoration: none !important;
}
.num-articles {
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.375rem;
  letter-spacing: 0.0071428571em;
}

.avatar {
  border: 2px solid #ffffff;
}

.news-image {
  background-color: #aaa;
  height: 120px;
}

</style>