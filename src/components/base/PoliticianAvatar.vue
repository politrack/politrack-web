<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <router-link :to="{'name': 'politician', 'params': {'id': politicianId}}" v-bind="attrs">
          <v-avatar
              :size="size"
              class="avatar elevation-2"
              v-on="on">
            <PoliticianImage :id="politicianId"/>
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
  },
  computed: {
    politicianId() {
      return this.politician.id === undefined? this.politician._id : this.politician.id;
    }
  }
}
</script>

<style scoped>

</style>