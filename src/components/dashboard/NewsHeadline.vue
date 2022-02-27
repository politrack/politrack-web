<template>
  <v-card
      elevation="2"
      :width="width"
      max-width="100%">
    <v-carousel
        :continuous="false"
        :cycle="true"
        :show-arrows="false"
        hide-delimiter-background
        delimiter-icon="fas fa-circle"
        class="topic-carousel"
        height="280">
      <v-carousel-item
          v-for="(article, i) in topic.articles.slice(0, 6)"
          :key="i">
         <news-card :max-width="width" :article="article" :showPlaceholderImage="true" :elevation="0"/>
      </v-carousel-item>
    </v-carousel>
    <v-card-actions style="margin-top: -20px">
      <v-spacer></v-spacer>
      <PoliticianAvatar v-for="(person, idx) in topic.politicians.slice(0, 4)" :key="idx"
                        :size="32" :politician="person" style="margin-left: -16px"/>
    </v-card-actions>
  </v-card>
</template>

<script>
import NewsCard from "../base/NewsCard";
import PoliticianAvatar from "../base/PoliticianAvatar";
export default {
  name: "PoliticiansCard",
  props: {
    topic: Object,
    width: Number,
  },
  components: {
    PoliticianAvatar,
    NewsCard
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