<template>
  <v-app style="background-color: white">
    <v-app-bar elevation="0" app dark color="#4895EF" absolute>
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
              <h3 class="white--text text--darken-3 d-inline">PoliTrack</h3>
            </router-link>
          </div>
          <v-spacer></v-spacer>
          <v-btn small class="me-4" rounded text outlined>
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

    <v-main :style="{'background-color': 'transparent'}">
      <router-view></router-view>
    </v-main>

    <div class="footer"></div>

    <v-footer
        color="#B5179E"
        dark
        padless >
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
  data() {
    return {
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
  computed: {
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  }
};
</script>

<style>
.footer {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1070%26quot%3b)' fill='none'%3e%3cpath d='M 0%2c317 C 57.6%2c259.8 172.8%2c19.4 288%2c31 C 403.2%2c42.6 460.8%2c356.8 576%2c375 C 691.2%2c393.2 748.8%2c118.8 864%2c122 C 979.2%2c125.2 1036.8%2c377 1152%2c391 C 1267.2%2c405 1382.4%2c231.8 1440%2c192L1440 560L0 560z' fill='rgba(72%2c 12%2c 168%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c398 C 72%2c333.2 216%2c81.4 360%2c74 C 504%2c66.6 576%2c356.8 720%2c361 C 864%2c365.2 936%2c106.4 1080%2c95 C 1224%2c83.6 1368%2c262.2 1440%2c304L1440 560L0 560z' fill='rgba(114%2c 9%2c 183%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c131 C 72%2c174.8 216%2c356 360%2c350 C 504%2c344 576%2c64.8 720%2c101 C 864%2c137.2 936%2c527 1080%2c531 C 1224%2c535 1368%2c203 1440%2c121L1440 560L0 560z' fill='rgba(247%2c 37%2c 133%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c7 C 72%2c92.8 216%2c387 360%2c436 C 504%2c485 576%2c243.6 720%2c252 C 864%2c260.4 936%2c478.4 1080%2c478 C 1224%2c477.6 1368%2c295.6 1440%2c250L1440 560L0 560z' fill='rgba(181%2c 23%2c 158%2c 1)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1070'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
  background-size: 100% 100%;
  background-color: transparent!important;
  height: 80px;
  width: 100%;
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
  /*
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='900' preserveAspectRatio='none' viewBox='0 0 1440 900'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1017%26quot%3b)' fill='none'%3e%3crect width='1440' height='900' x='0' y='0' fill='rgba(67%2c 97%2c 238%2c 0.03137254901960784)'%3e%3c/rect%3e%3cpath d='M0%2c699.512C131.655%2c713.817%2c265.839%2c656.869%2c367.952%2c572.545C464.741%2c492.617%2c523.546%2c372.695%2c545.439%2c249.094C564.705%2c140.325%2c508.244%2c37.96%2c481.632%2c-69.248C458.023%2c-164.357%2c459.175%2c-268.314%2c398.001%2c-344.87C335.774%2c-422.743%2c241.599%2c-469.787%2c144.291%2c-491.41C50.705%2c-512.206%2c-40.286%2c-466.43%2c-136.112%2c-463.556C-274.613%2c-459.402%2c-452.608%2c-575.533%2c-543.319%2c-470.789C-634.041%2c-366.031%2c-476.562%2c-207.305%2c-478.039%2c-68.732C-479.23%2c43.053%2c-581.07%2c143.965%2c-551.018%2c251.641C-520.137%2c362.286%2c-409.062%2c425.351%2c-319.92%2c497.806C-220.071%2c578.964%2c-127.919%2c685.613%2c0%2c699.512' fill='rgba(31%2c 66%2c 235%2c 0.03137254901960784)'%3e%3c/path%3e%3cpath d='M1440 1453.231C1542.014 1443.9650000000001 1601.31 1335.71 1672.981 1262.525 1729.655 1204.653 1776.576 1142.613 1814.358 1070.963 1854.284 995.247 1898.9279999999999 919.612 1898.942 834.014 1898.9569999999999 741.4970000000001 1867.7649999999999 651.149 1814.436 575.549 1757.608 494.988 1679.542 432.013 1588.569 394.02 1490.515 353.06899999999996 1374.5720000000001 305.347 1279.084 351.97 1183.0729999999999 398.848 1176.9560000000001 532.336 1120.063 622.773 1073.871 696.1990000000001 994.481 748.512 976.264 833.325 957.518 920.6 984.279 1010.021 1019.246 1092.152 1054.91 1175.9189999999999 1109.042 1248.183 1178.132 1307.474 1255.51 1373.878 1338.453 1462.455 1440 1453.231' fill='rgba(103%2c 128%2c 241%2c 0.03137254901960784)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1017'%3e%3crect width='1440' height='900' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
  */
  background-size: 100% 100%;
  /*
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='2000' preserveAspectRatio='none' viewBox='0 0 1440 2000'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1017%26quot%3b)' fill='none'%3e%3cpath d='M1440 0L870.07 0L1440 366.13z' fill='rgba(255%2c 255%2c 255%2c .1)'%3e%3c/path%3e%3cpath d='M870.07 0L1440 366.13L1440 400.03L688.0600000000001 0z' fill='rgba(255%2c 255%2c 255%2c .075)'%3e%3c/path%3e%3cpath d='M688.0600000000001 0L1440 400.03L1440 1363.69L648.86 0z' fill='rgba(255%2c 255%2c 255%2c .05)'%3e%3c/path%3e%3cpath d='M648.86 0L1440 1363.69L1440 1716.8600000000001L548.1700000000001 0z' fill='rgba(255%2c 255%2c 255%2c .025)'%3e%3c/path%3e%3cpath d='M0 2000L514.99 2000L0 1021.81z' fill='rgba(0%2c 0%2c 0%2c .1)'%3e%3c/path%3e%3cpath d='M0 1021.81L514.99 2000L703.04 2000L0 474.51z' fill='rgba(0%2c 0%2c 0%2c .075)'%3e%3c/path%3e%3cpath d='M0 474.51L703.04 2000L1124.37 2000L0 422.44z' fill='rgba(0%2c 0%2c 0%2c .05)'%3e%3c/path%3e%3cpath d='M0 422.44000000000005L1124.37 2000L1307.28 2000L0 236.99000000000007z' fill='rgba(0%2c 0%2c 0%2c .025)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1017'%3e%3crect width='1440' height='2000' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
   */
  /*
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='800' preserveAspectRatio='none' viewBox='0 0 1440 800'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1011%26quot%3b)' fill='none'%3e%3crect width='1440' height='800' x='0' y='0' fill='url(%23SvgjsLinearGradient1012)'%3e%3c/rect%3e%3cpath d='M 0%2c93 C 72%2c104.2 216%2c166.2 360%2c149 C 504%2c131.8 576%2c5 720%2c7 C 864%2c9 936%2c147.4 1080%2c159 C 1224%2c170.6 1368%2c83.8 1440%2c65L1440 800L0 800z' fill='rgba(181%2c 23%2c 158%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c295 C 96%2c318.8 288%2c406.4 480%2c414 C 672%2c421.6 768%2c319.6 960%2c333 C 1152%2c346.4 1344%2c451.4 1440%2c481L1440 800L0 800z' fill='rgba(114%2c 9%2c 183%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c750 C 96%2c727.2 288%2c640.8 480%2c636 C 672%2c631.2 768%2c739.4 960%2c726 C 1152%2c712.6 1344%2c600.4 1440%2c569L1440 800L0 800z' fill='rgba(86%2c 11%2c 173%2c 1)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1011'%3e%3crect width='1440' height='800' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='50%25' y1='100%25' x2='50%25' y2='0%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1012'%3e%3cstop stop-color='rgba(54%2c 110%2c 167%2c 1)' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(247%2c 37%2c 133%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");
   */
  /*
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='1000' preserveAspectRatio='none' viewBox='0 0 1440 1000'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1046%26quot%3b)' fill='none'%3e%3cpath d='M1692.26 887.14C1518.67 861 1493.89 501.24 1145.04 447.14 796.19 393.04 773.08 22.86 597.82-5.12' stroke='rgba(181%2c 23%2c 158%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M1685.29 828.53C1545.91 821.67 1524.44 651.88 1186.2 578.53 847.96 505.18 886.25-45 687.11-130.73' stroke='rgba(181%2c 23%2c 158%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M1524.58 841.37C1364.3 837.96 1231.18 691.43 922.21 621.37 613.25 551.31 764.01 67.56 621.03-47.15' stroke='rgba(181%2c 23%2c 158%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M1578.15 387.57C1378.38 400.46 1251.67 785.84 878.82 777.57 505.97 769.3 448.1-31.03 179.49-131.19' stroke='rgba(181%2c 23%2c 158%2c 1)' stroke-width='2'%3e%3c/path%3e%3cpath d='M1498.25 247.27C1292.8 265.13 1070 689.18 800.48 687.27 530.95 685.36 611.29 100.93 451.59-11.35' stroke='rgba(181%2c 23%2c 158%2c 1)' stroke-width='2'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1046'%3e%3crect width='1440' height='1000' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
   */
}

.header-content {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' transform='scale(1 1)' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='300' preserveAspectRatio='none' viewBox='0 0 1440 300'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1185%26quot%3b)' fill='none'%3e%3cpath d='M 0%2c81 C 96%2c113 288%2c256.6 480%2c241 C 672%2c225.4 768%2c11.2 960%2c3 C 1152%2c-5.2 1344%2c160.6 1440%2c200L1440 300L0 300z' fill='rgba(67%2c 97%2c 238%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c283 C 96%2c236.4 288%2c68.2 480%2c50 C 672%2c31.8 768%2c174.4 960%2c192 C 1152%2c209.6 1344%2c148.8 1440%2c138L1440 300L0 300z' fill='rgba(63%2c 55%2c 201%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c299 C 96%2c256.6 288%2c108.2 480%2c87 C 672%2c65.8 768%2c188 960%2c193 C 1152%2c198 1344%2c128.2 1440%2c112L1440 300L0 300z' fill='rgba(58%2c 12%2c 163%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c34 C 96%2c80.2 288%2c245.8 480%2c265 C 672%2c284.2 768%2c146.2 960%2c130 C 1152%2c113.8 1344%2c173.2 1440%2c184L1440 300L0 300z' fill='rgba(72%2c 12%2c 168%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c186 C 96%2c158.4 288%2c52.4 480%2c48 C 672%2c43.6 768%2c146.6 960%2c164 C 1152%2c181.4 1344%2c140.8 1440%2c135L1440 300L0 300z' fill='rgba(114%2c 9%2c 183%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c267 C 96%2c237.2 288%2c140.6 480%2c118 C 672%2c95.4 768%2c175.2 960%2c154 C 1152%2c132.8 1344%2c40.4 1440%2c12L1440 300L0 300z' fill='rgba(247%2c 37%2c 133%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c260 C 96%2c230.2 288%2c106.4 480%2c111 C 672%2c115.6 768%2c283.2 960%2c283 C 1152%2c282.8 1344%2c144.6 1440%2c110L1440 300L0 300z' fill='rgba(181%2c 23%2c 158%2c 1)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1185'%3e%3crect width='1440' height='300' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
  /*
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='300' preserveAspectRatio='none' viewBox='0 0 1440 300'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1016%26quot%3b)' fill='none'%3e%3cpath d='M 0%2c217 C 96%2c182 288%2c41.4 480%2c42 C 672%2c42.6 768%2c226 960%2c220 C 1152%2c214 1344%2c53.6 1440%2c12L1440 300L0 300z' fill='rgba(67%2c 97%2c 238%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c132 C 96%2c149.2 288%2c232.6 480%2c218 C 672%2c203.4 768%2c57.6 960%2c59 C 1152%2c60.4 1344%2c191.8 1440%2c225L1440 300L0 300z' fill='rgba(63%2c 55%2c 201%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c46 C 96%2c95.4 288%2c278.2 480%2c293 C 672%2c307.8 768%2c139.8 960%2c120 C 1152%2c100.2 1344%2c179.2 1440%2c194L1440 300L0 300z' fill='rgba(58%2c 12%2c 163%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c246 C 96%2c203.4 288%2c28.8 480%2c33 C 672%2c37.2 768%2c267.2 960%2c267 C 1152%2c266.8 1344%2c79 1440%2c32L1440 300L0 300z' fill='rgba(72%2c 12%2c 168%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c137 C 96%2c167.8 288%2c314 480%2c291 C 672%2c268 768%2c21.6 960%2c22 C 1152%2c22.4 1344%2c238.8 1440%2c293L1440 300L0 300z' fill='rgba(114%2c 9%2c 183%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c0 C 96%2c59.6 288%2c292.2 480%2c298 C 672%2c303.8 768%2c39.6 960%2c29 C 1152%2c18.4 1344%2c201.8 1440%2c245L1440 300L0 300z' fill='rgba(247%2c 37%2c 133%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c66 C 96%2c104.2 288%2c242 480%2c257 C 672%2c272 768%2c156.2 960%2c141 C 1152%2c125.8 1344%2c173 1440%2c181L1440 300L0 300z' fill='rgba(239%2c 239%2c 239%2c 1)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1016'%3e%3crect width='1440' height='300' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
   */
  background-color: #4895EF;
  background-size: 100% 100%;
}

</style>
