<template>
  <div>
    <div class="d-flex flex-wrap">
      <PoliticianAvatar class="ms-2 my-1" :politician="person" :size="40"
                        v-for="person in persons" :key="person.id"/>
    </div>
  </div>
</template>

<script>
import PoliticianAvatar from "./PoliticianAvatar";

export default {
  name: "PoliticianAvatarRow",
  props: {
    persons: Array,
    size: Number,
  },
  components: {
    PoliticianAvatar
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