<template>
  <div>
    <a v-for="person in persons" :key="person.id" class="me-1" href="#">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar v-bind="attrs"
                    :size="size"
                    class="avatar elevation-2"
                    v-on="on">
            <img
                :alt="person.first_name + ' ' + person.last_name"
                :src="'https://image.facethefacts-api.de/' + person.id + '.jpg'"
                class="avatar-image"
            >
          </v-avatar>
        </template>
        <span>{{ person.first_name }} {{ person.last_name }}</span>
      </v-tooltip>
    </a>
  </div>
</template>

<script>
export default {
  name: "PoliticianAvatarRow",
  props: {
    persons: Array,
    size: Number,
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