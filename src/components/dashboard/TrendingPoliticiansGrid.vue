<template>
  <div class="d-flex flex-wrap justify-center pa-5">
    <PoliticianAvatar :size="64" v-for="item in politicians" :key="item._id" :politician="item" class="ma-1"/>
  </div>
</template>

<script>
import PoliticianAvatar from "../base/PoliticianAvatar";

export default {
  name: "TrendingPoliticiansGrid",
  props: {
    politicians: Array
  },
  components: {
    PoliticianAvatar
  },
  data() {
    return {}
  }
}
</script>

<style scoped>

</style>