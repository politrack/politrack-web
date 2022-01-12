<template>
  <div>

    <div class="background-news">
      <div style="background-color: rgba(60,60,60, .65)">
        <v-container>
          <div class="text-h2 text-center">Endlich Politik versteh'n</div>
          <div class="text-h6 text-center caption grey--text text--lighten-2">
            Wir gruppieren Meinungen und Entscheidungen von Politikern basierend auf Nachrichtenartikeln.
            Die Informationen und Statistiken stehen jedem kostenlos zur Verfügung.
          </div>
          <div class="d-flex mt-5 justify-center">
            <v-btn
                color="accent"
                elevation="4"
                rounded
                x-large
                class="me-5"
            >
              Zum Dashboard
            </v-btn>

            <v-btn
                color="white"
                class="ms-5"
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
            <v-card class="rounded-circle round-count-card news" elevation="1">
              <div class="count-text text-center text-h5">Artikel</div>
              <ICountUp
                  class="count-text"
                  :delay="100"
                  :endVal="510312"
              />
            </v-card>
          </v-col>

          <v-col lg="4">
            <v-card class="rounded-circle round-count-card politician" elevation="1">
              <div class="count-text text-center text-h5">Politiker:innen</div>
              <ICountUp
                  class="count-text"
                  :delay="100"
                  :endVal="21031"
              />
            </v-card>
          </v-col>

          <v-col lg="4">
            <v-card class="rounded-circle round-count-card microphone" elevation="1">
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
          <v-col lg="3" class="text-center" v-for="(step, key) in politrackSteps" :key="key">
            <v-card class="info-card pa-5 rounded-xl" :color="key===activeStepIndex? 'accent':'white'"
                    @click="changeActiveStep(key)">
              <div class="content">
                <v-img width="96" class="mx-auto" :src="step.icon"></v-img>
                <h4 class="mt-5">{{ step.title }}</h4>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <v-scale-transition :hide-on-leave="true">
          <div :key="activeStepIndex">
            <v-row justify="center" align="center">

              <v-col lg="4" v-if="(activeStepIndex+1) % 2 !== 0">
                <v-img :src="activeStep.image"></v-img>
              </v-col>
              <v-col lg="8">
                <v-card class="info-details pa-5 mt-5 rounded-xl">
                  <v-progress-circular
                      :rotate="270"
                      :value="this.currentTimingStep/this.updateProgressSteps * 100"
                      v-if="this.timer !== null"
                      class="float-end" color="accent"/>
                  <h2>{{ activeStep.title }}</h2>
                  <p>{{ activeStep.description }}}</p>
                </v-card>
              </v-col>
              <v-col lg="4" v-if="(activeStepIndex+1) % 2 === 0">
                <v-img :src="activeStep.image"></v-img>
              </v-col>
            </v-row>
          </div>
        </v-scale-transition>
      </v-container>
    </div>

    <div class="half-blue">
      <div>
        <v-container class="py-5">
          <v-row>
            <v-col lg="6">
              <div class="text-h3 text-right">Über uns</div>
            </v-col>
            <v-col lg="6">
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
        </v-container>
      </div>
    </div>

    <div>
      <v-container class="py-5">
        <h2 class="mb-0 text-center">Gefördert durch</h2>
        <v-row>
          <v-col cols="12" sm="6">
            <v-img src="../assets/img/bmbf_logo.png" contain height="200"/>
          </v-col>
          <v-col cols="12" sm="6" class="pa-5">
            <v-img src="../assets/img/prototypefund.png" contain height="200"/>
          </v-col>
        </v-row>
      </v-container>
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
  /*background: rgb(255, 255, 255);
  background: linear-gradient(0deg, #efefef 0%, #efefef 50%, #ffffff 50%, #ffffff 100%);*/
}

.background-news {
  margin-top: -64px;
  background-image: url('../assets/img/landing_page/news-image.jpg');
  background-size: cover;
  color: white;
}

.background-news > div {
  padding-bottom: 180px;
  padding-top: 84px;
}

.background-news > div div.cover-text-container {
  background-image: url("../assets/img/landing_page/cover-image.png");
  background-position: center right;
  background-size: contain;
}

.functionality-container {
  padding-bottom: 50px;
}

.half-blue {
  background-image: url("../assets/img/landing_page/bundestag.jpg");
  background-color: white;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.half-blue > div {
  padding-top: 100px;
  padding-bottom: 100px;
  background-color: rgba(60,60,60, .85);
  color: white;
}

.count-text {
  font-size: 1.75rem;
  /*color: #4895EF;*/
  color: white;
  position: relative;

}


.round-count-card::before, .count-text {
  transition: all 1s;
}

.round-count-card::before {
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

.round-count-card.news::before {
  background-image: url("../assets/img/landing_page/news-image.jpg");
}

.round-count-card.politician::before {
  background-image: url("../assets/img/landing_page/politician-image.jpeg");
}

.round-count-card.microphone::before {
  background-image: url("../assets/img/landing_page/microphone-image.jpg");
}

.round-count-card:hover::before {
  filter: grayscale(0%) brightness(50%);
}

.round-count-card {
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}

.round-count-card .v-image {
  max-width: 50px;
  max-height: 50px;
}

.mockup-image {
  margin-top: -64px;
}

.header-content {
  height: 32px;
}

</style>