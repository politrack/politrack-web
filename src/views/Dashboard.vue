<template>
  <div>
    <h1>Dashboard</h1>
    <router-link :to="{name: 'politician', params: {id: '1234'}}">Go to politician</router-link>
  </div>
</template>

<script>
export default {
  name: "Dashboard"
}
</script>

<style scoped>

</style>