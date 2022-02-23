<template>
  <div>

    <h1 class="text-center mt-5">404 - Seite nicht gefunden</h1>
    <div class="text-muted mt-2 text-center">
      Die angeforderte Seite wurde leider nicht gefunden.<br>
      <router-link class="text-decoration-none" :to="{name: 'chronic'}">Zurück zur Hauptseite</router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: "NotFound"
}
</script>

<style scoped>

</style>