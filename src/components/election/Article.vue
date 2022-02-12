<template>
  <v-card>
    <div class="pa-3">
      <div class="card-title">
        <a :href="article.url" class="text-dark text-decoration-none fw-bold">
          <div v-html="article.title"></div>
        </a>
      </div>
      <div>
        <small class="text-muted">{{ displayDatetime(article.published) }}</small>
        <small class="text-muted float-end">{{ article.publisher }}</small>
      </div>
    </div>
  </v-card>
</template>

<script>
let moment = require("moment");

export default {
  name: "Article",
  props: {
    article: Object
  },
  methods: {
    getImgUrl(source) {
      let images = require.context('../../assets/btw/sources/', false, /\.png$/)
      return images('./' + source + ".png")
    },
    displayDatetime(datetime) {
      return moment(datetime).format('DD.MM.YYYY');
    }

  }
}
</script>

<style scoped>

.text-decoration-none {
  text-decoration: none ! important;
  color: black;
}

.card-title {
  font-size: 15px;
  font-weight: 700 !important;
}

.small, small {
  font-size: .875em;
}


.text-muted {
  --bs-text-opacity: 1;
  color: #6c757d !important;
}

</style>