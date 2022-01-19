<template>
  <div class="d-flex flex-wrap justify-center pa-5">
    <v-avatar size="64" v-for="item in politicians" :key="item._id" class="ma-1">
      <PoliticianImage :id="item._id"/>
    </v-avatar>
  </div>
</template>

<script>
import PoliticianImage from "../base/PoliticianImage";

export default {
  name: "TrendingPoliticiansGrid",
  props: {
    politicians: Object
  },
  components: {
    PoliticianImage
  },
  data() {
    return {}
  }
}
</script>

<style scoped>

</style>