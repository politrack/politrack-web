<template>
  <v-app>
    <v-app-bar app flat color="transparent">
      <v-container>
        <v-row>
          <div class="d-flex align-center">
            <router-link to="/" class="text-decoration-none">
              <v-img
                  alt="PoliTrack Logo"
                  class="shrink mr-2"
                  contain
                  src="./assets/logo.png"
                  transition="scale-transition"
                  width="30"/>
            </router-link>
            <router-link to="/" class="text-decoration-none">
              <h3 class="grey--text text--darken-3 d-inline">PoliTrack</h3>
            </router-link>
          </div>
          <v-spacer></v-spacer>
          <a class="text-decoration-none"
             href="https://github.com/politrack"
             target="_blank"
             rel="nofollow">
            <v-icon class="">
              fab fa-github
            </v-icon>
            <a class="text-decoration-none"
               href="https://twitter.com/pltrck"
               target="_blank"
               rel="nofollow">
              <v-icon class="ms-3">
                fab fa-twitter
              </v-icon>
            </a>
          </a>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main :style="{background: $vuetify.theme.themes[theme].background}" class="mt-5">
      <router-view></router-view>
    </v-main>
    <v-footer
        color="darken-1"
        padless>
      <v-row
          justify="center"
          no-gutters>
        <v-btn
            v-for="link in footerLinks"
            :key="link.name"
            text
            rounded
            class="my-2">
          <router-link :to="{name: link.route}" class="text-decoration-none">{{ link.name }}
          </router-link>
        </v-btn>
        <v-col
            class=" py-4 text-center"
            cols="12">
          {{ new Date().getFullYear() }} — <strong>PoliTrack</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>


export default {
  name: 'App',
  components: {},
  data: () => ({
    'footerLinks': [
      {
        'name': 'Impressum',
        'route': 'imprint'
      },
      {
        'name': 'Datenschutzerklärung',
        'route': 'privacy'
      },
      {
        'name': 'Über uns',
        'route': 'about'
      }
    ]
  }),
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

.text-decoration-none {
  text-decoration: none;
}

</style>
