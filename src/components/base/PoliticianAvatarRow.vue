<template>
  <div>
    <a v-for="person in persons" :key="person.id" class="me-1" href="#">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar v-bind="attrs"
                    :size="size"
                    class="avatar elevation-2"
                    v-on="on">
            <PoliticianImage :id="person.id"/>
          </v-avatar>
        </template>
        <span>{{ person.first_name }} {{ person.last_name }}</span>
      </v-tooltip>
    </a>
  </div>
</template>

<script>
import PoliticianImage from "./PoliticianImage";
export default {
  name: "PoliticianAvatarRow",
  props: {
    persons: Array,
    size: Number,
  },
  components: {
    PoliticianImage
  }
}
</script>

<style scoped>
.avatar {
  border: 2px solid #ffffff;
}

.avatar-image {
  object-fit: cover
}
</style>