<template>
  <v-app>
    <v-app-bar app color="white" light>
      <v-spacer></v-spacer>

      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo.png"
          transition="scale-transition"
          width="40"
        />

        <h1 class="grey--text">PoliTrack</h1>
      </div>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main :style="{background: $vuetify.theme.themes[theme].background}" class="mt-5">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {
  },

  data: () => ({
  }),
  computed:{
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  }
};
</script>

<style>

</style>
