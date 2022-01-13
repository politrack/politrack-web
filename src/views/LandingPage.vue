<template>
  <div>

    <div class="header-container">
      <div class="overlay">
        <v-container>
          <div class="text-h2 text-center">Endlich Politik versteh'n</div>
          <div class="text-h6 text-center caption grey--text text--lighten-2">
            Wir gruppieren Meinungen und Entscheidungen von Politikern basierend auf Nachrichtenartikeln.
            Die Informationen und Statistiken stehen jedem kostenlos zur Verfügung.
          </div>
          <div class="d-flex justify-center flex-md-row flex-column">
            <router-link :to="{'name': 'dashboard'}" class="me-md-5 mt-5 text-decoration-none">
              <v-btn
                  color="accent"
                  elevation="4"
                  rounded
                  x-large

              >
                Zum Dashboard
              </v-btn>
            </router-link>

            <v-btn
                color="white"
                class="ms-md-5 mt-5"
                outlined
                elevation="4"
                rounded
                x-large
                @click="scrollToElement('functionality-container', {behavior: 'smooth'})"
            >
              Mehr erfahren
            </v-btn>
          </div>
        </v-container>
      </div>
    </div>

    <div class="transition-container">
      <v-container>
        <v-row justify="center">
          <v-col lg="4">
            <v-card class="rounded-circle count-card news" elevation="1">
              <div class="count-text text-center text-h5">Artikel</div>
              <ICountUp
                  class="count-text"
                  :delay="100"
                  :endVal="510312"
              />
            </v-card>
          </v-col>

          <v-col lg="4">
            <v-card class="rounded-circle count-card politician" elevation="1">
              <div class="count-text text-center text-h5">Politiker:innen</div>
              <ICountUp
                  class="count-text"
                  :delay="100"
                  :endVal="21031"
              />
            </v-card>
          </v-col>

          <v-col lg="4">
            <v-card class="rounded-circle count-card microphone" elevation="1">
              <div class="count-text text-center text-h5">Zitate</div>
              <ICountUp
                  class="count-text"
                  :delay="100"
                  :endVal="21031"
              />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="functionality-container">
      <v-container class="py-5">
        <h1 class="text-center">So funktioniert's</h1>
        <v-row class="mt-5">
          <v-col lg="3" cols="12" sm="6" md="6" class="text-center" v-for="(step, key) in politrackSteps" :key="key">
            <v-card class="info-card pa-5 rounded-xl" :color="key===activeStepIndex? 'accent':'white'"
                    @click="changeActiveStep(key)">
              <div class="content">
                <v-img width="64" class="mx-auto" :src="step.icon"></v-img>
                <h4 class="mt-5">{{ step.title }}</h4>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <v-scale-transition :hide-on-leave="true">
          <div :key="activeStepIndex">
            <v-row justify="center"
                   align="center">
              <v-col lg="4" v-if="(activeStepIndex+1) % 2 !== 0" cols="9" sm="6" md="5" class="order-0">
                <v-img :src="activeStep.image"></v-img>
              </v-col>
              <v-col lg="8" cols="12" class="order-1">
                <div class="info-details pa-5 mt-5 rounded-xl">
                  <v-progress-circular
                      :rotate="270"
                      :value="this.currentTimingStep/this.updateProgressSteps * 100"
                      v-if="this.timer !== null"
                      class="float-end" color="accent"/>
                  <h2>{{ activeStep.title }}</h2>
                  <p>{{ activeStep.description }}}</p>
                </div>
              </v-col>
              <v-col lg="4" v-if="(activeStepIndex+1) % 2 === 0" cols="10" sm="7" md="6" class="order-0 order-lg-2">
                <v-img :src="activeStep.image"></v-img>
              </v-col>
            </v-row>
          </div>
        </v-scale-transition>
      </v-container>
    </div>

    <div class="about-us-container">
      <div class="overlay">
        <v-container class="py-5">
          <v-row>
            <v-col lg="6" cols="12">
              <div class="text-h3 text-lg-right">Über uns</div>
            </v-col>
            <v-col lg="6" cols="12">
              <p>
                PoliTrack ist ein durch das <a href="https://www.bmbf.de/">Bundesministerium für Bildung und
                Forschung</a>
                gefördertes Projekt, das ein größeres Ziel verfolgt. Hierzu zitieren wir aus unserer
                Vorhabensbeschreibung.
              </p>
              <p>
                Mithilfe von künstlicher Intelligenz haben wir Artikel über politisch relevante Ereignisse nach Themen
                gruppiert. Diese Gruppierung erlaubt es uns verschiedene Auswertungen über Meinungen und
                Aüßerungen von Politikern zu erstellen. Gleichzeitig können wir
                die Berichterstattung zu bestimmten Ereignissen
                transparenter und übersichtlicher machen.
              </p>
            </v-col>
          </v-row>

          <v-row align="center">
            <v-col lg="6" cols="12">
              <div class="text-h4 text-lg-right">Partner</div>
            </v-col>
            <v-col lg="2" cols="12" sm="4">
              <a href="https://www.bmbf.de/">
                <v-img src="../assets/img/bmbf_logo_white.png" contain height="100"/>
              </a>
            </v-col>
            <v-col lg="2" cols="12" sm="4">
              <a href="https://prototypefund.de/">
                <v-img src="../assets/img/prototypefund.png" contain height="100"/>
              </a>
            </v-col>
            <v-col lg="2" cols="12" sm="4">
              <a href="https://facethefacts.app/">
                <v-img src="../assets/img/face_the_facts_logo.png" contain height="100"/>
              </a>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </div>


</template>

<script>

import ICountUp from 'vue-countup-v2';

export default {
  name: "LandingPage",
  components: {
    ICountUp
  },
  mounted() {
    this.timer = setInterval(() => {
      this.currentTimingStep = (this.currentTimingStep + 1) % this.updateProgressSteps;
      if (this.currentTimingStep === 0) {
        this.activeStepIndex = (this.activeStepIndex + 1) % this.politrackSteps.length;
      }
    }, this.changeInterval / this.updateProgressSteps)
  },
  beforeDestroy() {
    if (this.timer !== null) {
      clearInterval(this.timer);
    }
  },
  data() {
    return {
      timer: null,
      currentTimingStep: 0,
      changeInterval: 5000,
      updateProgressSteps: 50,
      activeStepIndex: 0,
      politrackSteps: [
        {
          title: "Nachrichtenartikel extrahieren",
          icon: require("@/assets/img/landing_page/newspaper.png"),
          image: require("@/assets/img/landing_page/logos.png"),
          description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore\n" +
              "          et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.\n" +
              "          Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit\n" +
              "          amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna\n" +
              "          aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd\n" +
              "          gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
        },
        {
          title: "Analyse der Daten",
          icon: require("@/assets/img/landing_page/evaluation.png"),
          image: require("@/assets/img/landing_page/machine-learning.png"),
          description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore\n" +
              "          et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.\n" +
              "          Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit\n" +
              "          amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna\n" +
              "          aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd\n" +
              "          gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
        },
        {
          title: "Meinungen und Äußerungen von Politker:innen",
          icon: require("@/assets/img/landing_page/choice.png"),
          image: require("@/assets/img/website-mock.png"),
          description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore\n" +
              "          et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.\n" +
              "          Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit\n" +
              "          amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna\n" +
              "          aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd\n" +
              "          gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
        },
        {
          title: "Statistiken",
          icon: require("@/assets/img/landing_page/bar-chart.png"),
          image: require("@/assets/img/landing_page/website-mock-statistics.png"),
          description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore\n" +
              "          et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.\n" +
              "          Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit\n" +
              "          amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna\n" +
              "          aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd\n" +
              "          gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
        }
      ]
    }
  },
  computed: {
    activeStep() {
      return this.politrackSteps[this.activeStepIndex];
    }
  },
  methods: {
    changeActiveStep(step) {
      this.activeStepIndex = step;
      clearInterval(this.timer);
      this.timer = null;
    },
    scrollToElement(cls, options) {
      const el = this.$el.getElementsByClassName(cls)[0];

      if (el) {
        el.scrollIntoView(options);
      }
    }
  }
}
</script>

<style scoped>

.v-progress-circular >>> circle, .v-progress-circular--visible >>> circle {
  transition: all 100ms;
}

.info-details > h2 {
  color: #b5179e;
}

.info-card > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.info-card {
  height: 100%;
}

.info-card.accent {
  color: white;
}

.transition-container {
  margin-top: -112px;
}

.header-container {
  margin-top: -64px;
  background-image: url('../assets/img/landing_page/news-image.jpg');
  background-attachment: fixed;
  background-size: cover;
  color: white;
}

.header-container > div.overlay {
  padding-bottom: 180px;
  padding-top: 84px;
  background-color: rgba(60, 60, 60, .65)
}


.functionality-container {
  padding-bottom: 50px;
}

.about-us-container {
  background-image: url("../assets/img/landing_page/bundestag.jpg");
  background-color: white;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  margin-bottom: -80px;
}

.about-us-container > div.overlay {
  padding-top: 100px;
  padding-bottom: 100px;
  background-color: rgba(60, 60, 60, .9);
  color: white;
}

.about-us-container > div.overlay a {
  color: #4CC9F0;
  text-decoration: none;
}

.count-card::before, .count-text {
  transition: all 1s;
}

.count-card::before {
  content: "";
  position: absolute;
  border-radius: 50%;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: grayscale(100%) brightness(30%);
}

.count-card:hover::before {
  filter: grayscale(0%) brightness(50%);
}

.count-card {
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}

.count-card .v-image {
  max-width: 50px;
  max-height: 50px;
}

.count-card .count-text {
  font-size: 1.75rem;
  color: white;
  position: relative;
}

.count-card.news::before {
  background-image: url("../assets/img/landing_page/news-image.jpg");
}

.count-card.politician::before {
  background-image: url("../assets/img/landing_page/politician-image.jpeg");
}

.count-card.microphone::before {
  background-image: url("../assets/img/landing_page/microphone-image.jpg");
}

</style>