<template>
  <v-card class="mx-auto" elevation="4">
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          Thema xy
        </div>
        <v-list-item-title class="text-h5 mb-1">
          <router-link :to="{name: 'politician',
              params: {id: politician.id}}" class="black--text text-decoration-none">{{ politician.firstName }} {{ politician.lastName }}
          </router-link>
        </v-list-item-title>
        <v-list-item-subtitle>

        </v-list-item-subtitle>
      </v-list-item-content>

      <v-avatar class="mx-5 mt-3" size="128">
        <img :alt="politician.firstName" :src="politician.image" class="avatar-image">
      </v-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
          outlined
          rounded
          text
          x-small
      >
        Mehr zu diesem Thema
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "PoliticiansCard",
  props: {
    politician: Object
  }
}
</script>

<style scoped>
.avatar-image {
  object-fit: cover
}
</style>