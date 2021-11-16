<template>
  <v-card
      class="slider-card article-card d-flex flex-column justify-space-between"
      dark
      rounded
      :style="image!==null? { 'background-image': 'url(' + image + ')' }:{}"
  >
    <v-card-title>
      <span class="font-weight-light text-caption ml-auto">{{ article.published }}</span>
    </v-card-title>


    <v-card-text class="font-weight-bold">
      {{ article.title }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ArticleCard",
  props: {
    article: Object
  },
  data() {
    return {
      test: "test",
      image: this.article.images.length > 0? this.article.images[0].url : null
    }
  }
}
</script>

<style scoped>
  .article-card {
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover; /* Resize the background image to cover the entire container */
    background-color: #5e5e5e;
    background-blend-mode: multiply;
  }
</style>