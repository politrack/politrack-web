<template>
  <v-card
      elevation="2"
      :width="width"
      max-width="100%">
    <Flicking :options="{ circular: true, inputType:['mouse'] }" :plugins="plugins">
      <div class="card-panel"
           v-for="(article, i) in topic.articles"
           :key="i">
        <news-card :max-width="width" :article="article" :showPlaceholderImage="true" :elevation="0"/>
      </div>

      <div slot="viewport" class="flicking-pagination"></div>

    </Flicking>

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
import {Flicking} from "@egjs/vue-flicking";
import {Pagination} from "@egjs/flicking-plugins";

export default {
  name: "PoliticiansCard",
  props: {
    topic: Object,
    width: Number,
  },
  data(){
    return {
      plugins: [new Pagination({ type: 'scroll' })]
    }
  },
  components: {
    PoliticianAvatar,
    NewsCard,
    Flicking
  }
}
</script>

<style scoped>
@import "../../../node_modules/@egjs/vue-flicking/dist/flicking.css";
@import "../../../node_modules/@egjs/flicking-plugins/dist/pagination.css";


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

.card-panel {
  height: 280px;
}

::v-deep .flicking-pagination-bullet-active {
background-color: #4361ee !important;
}

.avatar {
  border: 1px solid #ffffff;
}

</style>