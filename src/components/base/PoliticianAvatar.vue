<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <router-link :to="{'name': 'politician', 'params': {'id': politician.id}}" v-bind="attrs">
          <v-avatar
              :size="size"
              class="avatar elevation-2"
              v-on="on">
            <PoliticianImage :id="politician.id === undefined? politician._id : politician.id"/>
          </v-avatar>
        </router-link>
      </template>
      <span>{{ politician.first_name }} {{ politician.last_name }}</span>
    </v-tooltip>
  </div>
</template>

<script>
import PoliticianImage from "./PoliticianImage";

export default {
  name: "PoliticianAvatar",
  props: {
    size: Number,
    politician: Object
  },
  components: {
    PoliticianImage
  }
}
</script>

<style scoped>

</style>