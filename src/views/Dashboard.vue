<template>
  <div>
    <h1>Derzeit beliebt</h1>
    <v-row class="px-5">
      <v-col
          v-for="politician in politicians"
          :key="politician.id"
          cols="12"
          lg="4"
          sm="12"
      >
        <PoliticiansCard :politician="politician"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import trends from "../assets/trends.json";
import PoliticiansCard from "../components/dashboard/PoliticiansCard";

export default {
  name: "Dashboard",
  data: () => {
    return {
      politicians: trends.politicians
    }
  },
  components: {
    PoliticiansCard
  }
}
</script>

<style scoped>

</style>