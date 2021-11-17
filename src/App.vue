<template>
  <v-app>
    <v-app-bar app flat color="transparent">
      <v-container>
        <v-row>
          <div class="d-flex align-center">
            <v-img
                alt="PoliTrack Logo"
                class="shrink mr-2"
                contain
                src="./assets/logo.png"
                transition="scale-transition"
                width="30"
            />
            <h3 class="grey--text text--darken-3">PoliTrack</h3>
          </div>
          <v-spacer></v-spacer>
          <a
              class="icon-link"
              href="https://github.com/themeselection/materio-vuetify-vuejs-admin-template-free"
              target="_blank"
              rel="nofollow"
          >
            <v-icon class="">
              fab fa-github
            </v-icon>
            <v-icon class="ms-3">
            fab fa-twitter
            </v-icon>
          </a>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main :style="{background: $vuetify.theme.themes[theme].background}" class="mt-5">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  components: {},

  data: () => ({}),
  computed: {
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  }
};
</script>

<style>

.v-toolbar__content {
  background: rgb(245, 245, 245)
}

.icon-link {
  text-decoration: none;
}

</style>
