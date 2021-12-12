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
         <news-card :article="article" :showPlaceholderImage="true" :elevation="0"/>
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
import PoliticianImage from "../base/PoliticianImage";
import NewsCard from "../base/NewsCard";
export default {
  name: "PoliticiansCard",
  props: {
    topic: Object
  },
  components: {
    NewsCard,
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

.avatar {
  border: 1px solid #ffffff;
}

</style>