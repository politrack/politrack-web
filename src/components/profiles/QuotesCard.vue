<template>
  <v-card class="quotes-card">
    <v-carousel
        :cycle="false"
        :show-arrows="false"
        :show-arrows-on-hover="true"
        :vertical="true" class="quotes-carousel" height="100%">
      <v-carousel-item
          v-for="quote in quotes"
          :key="quote.id"
          class="text-center">
        <div
            :style="{'background-image': 'url(' + getImageFromQuote(quote) + ')' }"
            class="image-background d-flex flex-column justify-center pa-5">
          <div class="text-left fill-width px-4 pt-1 d-flex">
            <h5 class="white--text d-inline-block text-no-wrap">
              {{ quote.author }}:
            </h5>
            <a :href="quote.article.url" target="_blank">
              <small class="white--text font-italic d-inline-block text-truncate ms-2">{{ quote.article.title }}</small>
            </a>
          </div>

          <div class="fill-height fill-width d-flex justify-center align-center">
            <blockquote>
              <h3>{{ quote.quote }}</h3>
            </blockquote>
          </div>

          <div class="align-self-end fill-width mb-5">
              <h5 class="white--text mb-5">Zitiert von {{ sources[quote.article.source].label }}</h5>
          </div>
        </div>

      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>

<script>
import sources from "../../assets/sources_config.json";

export default {
  name: "QuotesCard",
  props: {
    quotes: Array,
    articleImage: Boolean
  },
  data: () => {
    return {
      sources: sources
    }
  },
  methods: {
    getImageFromQuote(quote) {
      console.log(quote)
      let article = quote.article
      if (this.articleImage) {
        return article.images && article.images.length > 0 ? article.images[0].url : this.politician.image
      } else {
        return 'https://image.facethefacts-api.de/' + quote.politician_id + '.jpg'
      }
    }
  }
}
</script>

<style scoped>
.quotes-carousel, .quotes-card {
  height: 100%;
}

.image-background {
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  background-color: #5e5e5e;
  background-blend-mode: multiply;
  height: 100%;
}

blockquote {
  border: none;
  font-family: Georgia, "Times New Roman", Times, serif;
  quotes: "\201C" "\201D" "\2018" "\2019";
  text-align: center;
}

blockquote h3 {
  font-size: 21px;
  color: #fefefe;
}

blockquote h3:before {
  content: open-quote;
  font-weight: bold;
  font-size: 30px;
  color: #66c2f5;
}

blockquote h3:after {
  content: close-quote;
  font-weight: bold;
  font-size: 30px;
  color: #66C2F5FF;
}

</style>