<template>
  <div>
    <span class="text-caption me-4">Oft erwähnt mit:</span>
    <a v-for="person in mentions" :key="person.id" class="me-3" href="#">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar v-bind="attrs"
                    v-on="on">
            <img
                :alt="person.first_name + ' ' + person.last_name"
                :src="person.image"
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
  name: "MentionedWith",
  props: {
    mentions: Array
  }
}
</script>

<style scoped>
.avatar-image {
  object-fit: cover
}
</style>