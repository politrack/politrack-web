<template>
  <div>
    <h1>Politician {{ id }}</h1>
  </div>
</template>

<script>
export default {
  name: "Politician",
  data: () => {
    return {
      id: null
    }
  },
  mounted() {
    this.id = this.$route.params.id;
  }
}
</script>

<style scoped>

</style>