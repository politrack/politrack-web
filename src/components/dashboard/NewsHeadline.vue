<template>
  <v-card
      elevation="2"
      max-width="345"
      class="">
    <v-carousel
        :continuous="false"
        :cycle="true"
        :show-arrows="false"
        hide-delimiter-background
        delimiter-icon="fas fa-minus"
        class="custom"
        height="250">
      <v-carousel-item
          v-for="(article, i) in topic.articles"
          :key="i">
        <a :href="article.url" class="text-decoration-none" target="_blank">
          <v-card
              flat
              max-width="450">
            <v-img
                :src="article.images && article.images.length > 0 ? article.images[0] : ''"
                height="120px">
            </v-img>
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
      <v-avatar v-for="(person, idx) in topic.politicians" class="avatar elevation-2" v-bind:key="idx" size="32"
                style="margin-left: -16px">
        <img :src="'https://image.facethefacts-api.de/' + person.id + '.jpg'"
             class="avatar-image">
      </v-avatar>
    </v-card-actions>
  </v-card>
</template>

<script>
import sources from "../../assets/sources_config.json";

export default {
  name: "PoliticiansCard",
  props: {
    topic: Object
  },
  data() {
    return {
      sources: sources
    }
  }
}
</script>

<style>
.avatar-image {
  object-fit: cover
}

.article-title.v-card__title {
  line-height: 1.2rem;
  font-size: 16px;
  word-break: keep-all;
}

.custom .v-carousel__controls__item.v-btn.v-btn--icon {
  color: grey;
  margin: 10px;
}

.custom .v-carousel__controls__item.v-btn.v-btn--icon i {
  font-size: 20px !important;
  margin: 15px;
}

.custom .v-carousel__controls__item.v-btn.v-btn--active {
  color: black;
}

.custom .v-carousel__controls__item.v-btn.v-btn--active:before {
  opacity: 0;
}

.custom .v-carousel__controls__item.v-btn:hover {
  color: black;
}

.custom .v-carousel__controls__item.v-btn:hover:before {
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
</style>