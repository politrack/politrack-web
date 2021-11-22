<template>
  <v-app style="background-color: white">
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
          <v-btn small class="me-4" rounded flat outlined>
            Kontakt
          </v-btn>
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

    <v-main :style="{'background-color': 'white'}">
      <router-view></router-view>
    </v-main>
    <v-footer
        class="footer"
        padless dark>
      <v-row
          justify="center"
          no-gutters>
        <v-btn
            v-for="link in footerLinks"
            :key="link.name"
            text
            rounded
            class="my-2">
          <router-link :to="{name: link.route}" class="text-decoration-none white--text">{{ link.name }}
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

.footer {
  background: #1D3557 !important;
}
.v-toolbar__content {
  background: transparent;
}

.text-decoration-none {
  text-decoration: none;
}

</style>
