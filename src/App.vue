<template>
  <v-app style="background-color: white">
    <v-app-bar elevation="0" dark :color="$route.meta.headerTransparent? 'transparent':'#4895EF'" height="auto">
      <v-container ref="bar">
        <v-row>
          <v-col cols="12" xs="4" sm="4">
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
              <router-link :to="{'name': 'landing'}" class="text-decoration-none">
                <h3 class="white--text text--darken-3 d-inline">PoliTrack</h3>
              </router-link>
            </div>
          </v-col>
          <v-spacer class="d-none d-md-block"></v-spacer>
          <v-col cols="12" xs="12" sm="8" class="d-flex justify-center justify-sm-end flex-wrap flex-gap">
            <router-link :to="{'name': 'dashboard'}" class="text-decoration-none">
              <v-btn small rounded color="accent">
                Übersicht
              </v-btn>
            </router-link>
            <router-link :to="{'name': 'chronic'}" class="text-decoration-none d-none d-md-inline">
              <v-btn small rounded outlined>
                Bundestagswahl 21
              </v-btn>
            </router-link>
            <router-link :to="{'name': 'chronic'}" class="text-decoration-none d-md-none">
              <v-btn small rounded outlined>
                BTW 21
              </v-btn>
            </router-link>
            <div>
              <a class="text-decoration-none"
                 href="https://github.com/politrack"
                 target="_blank"
                 rel="nofollow">
                <v-icon>
                  fab fa-github
                </v-icon>
                <a class="text-decoration-none ms-2"
                   href="https://twitter.com/pltrck"
                   target="_blank"
                   rel="nofollow">
                  <v-icon>
                    fab fa-twitter
                  </v-icon>
                </a>
                <a class="text-decoration-none ms-2"
                   href="mailto:politrack@gmx.de">
                  <v-icon>
                    fa fa-envelope
                  </v-icon>
                </a>
              </a>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main :style="{'background-color': 'transparent'}">
      <router-view :bar-height="height"></router-view>
    </v-main>

    <div class="footer"></div>

    <v-footer
        color="#B5179E"
        dark
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
          <router-link :to="{name: link.route}" class="text-decoration-none white--text">{{ link.name }}
          </router-link>
        </v-btn>
        <v-col
            class=" py-4 text-center"
            cols="12">
          <span>{{ new Date().getFullYear() }} — <strong>PoliTrack</strong></span><br>
          <small class="me-3 float-end text-end">
            <a href="http://www.freepik.com" class="white--text text-decoration-none" target="_blank">Vektorgrafiken
              designed von
              pikisuperstar / Freepik</a><br>
            <a target="_blank" class="white--text text-decoration-none" href="https://bgjar.com">SVG Hintergründe von
              BGJar</a>
          </small>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>


export default {
  name: 'App',
  components: {},
  data() {
    return {
      height: -1,
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
    }
  },
  created() {
    window.addEventListener("resize", this.resizeHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeHandler);
  },
  computed: {
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  },
  mounted() {
    this.resizeHandler();
  },
  methods: {
    resizeHandler() {
      this.height = this.$refs.bar ? this.$refs.bar.clientHeight + 10 : 0
    }
  }
};
</script>

<style>
.footer {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1070%26quot%3b)' fill='none'%3e%3cpath d='M 0%2c317 C 57.6%2c259.8 172.8%2c19.4 288%2c31 C 403.2%2c42.6 460.8%2c356.8 576%2c375 C 691.2%2c393.2 748.8%2c118.8 864%2c122 C 979.2%2c125.2 1036.8%2c377 1152%2c391 C 1267.2%2c405 1382.4%2c231.8 1440%2c192L1440 560L0 560z' fill='rgba(72%2c 12%2c 168%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c398 C 72%2c333.2 216%2c81.4 360%2c74 C 504%2c66.6 576%2c356.8 720%2c361 C 864%2c365.2 936%2c106.4 1080%2c95 C 1224%2c83.6 1368%2c262.2 1440%2c304L1440 560L0 560z' fill='rgba(114%2c 9%2c 183%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c131 C 72%2c174.8 216%2c356 360%2c350 C 504%2c344 576%2c64.8 720%2c101 C 864%2c137.2 936%2c527 1080%2c531 C 1224%2c535 1368%2c203 1440%2c121L1440 560L0 560z' fill='rgba(247%2c 37%2c 133%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c7 C 72%2c92.8 216%2c387 360%2c436 C 504%2c485 576%2c243.6 720%2c252 C 864%2c260.4 936%2c478.4 1080%2c478 C 1224%2c477.6 1368%2c295.6 1440%2c250L1440 560L0 560z' fill='rgba(181%2c 23%2c 158%2c 1)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1070'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
  background-size: 100% 100%;
  background-color: transparent !important;
  height: 80px;
  width: 100%;
  position: relative;
}

.v-toolbar__content {
  background: transparent;
}

.text-decoration-none {
  text-decoration: none;
}

.blur-background {
  background-color: rgba(255, 255, 255, .1) !important;
  backdrop-filter: blur(10px);
}

.blur-background.opaque {
  background-color: rgba(255, 255, 255, .6) !important;
}

.blur-background.dark {
  background-color: rgba(60, 60, 60, .5) !important;
  backdrop-filter: blur(10px);
  color: #efefef !important;
}

.blur-background.accent-background {
  background-color: rgba(181, 23, 158, 0.3) !important;
}

.v-application--wrap {
  background-repeat: no-repeat;
  background-color: #efefef;
}

.v-app-bar {
  z-index: 5;
  top: 0;
}

.flex-gap {
  gap: 10px
}

</style>
