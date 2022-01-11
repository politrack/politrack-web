<template>
  <div>
    <div class="header-content">

      <v-container class="white--text">
        <div class="text-h2 header-title">PoliTrack</div>
      </v-container>
    </div>

    <div>

      <v-container>
        <v-row align="center">
          <v-col lg="8">
            <h1>Was passiert in der Politik?</h1>
            <p class="grey--text text--darken-2">
              Mithilfe von künstlicher Intelligenz haben wir Artikel über politisch relevante Ereignisse nach Themen
              gruppiert. Diese Gruppierung erlaubt es uns verschiedene Auswertungen über Meinungen und
              Aüßerungen von Politikern zu erstellen.
            </p>
          </v-col>
          <v-col lg="4">
            <v-img src="../assets/img/website-mock.png" class="mockup-image"></v-img>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="white py-5">
      <v-container>
        <v-row align="center">
          <v-col lg="4">
            <v-img src="../assets/img/landing_page/logos.png"></v-img>
          </v-col>
          <v-col lg="8">
            <h1 class="text-center">Alle Informationen auf einen Blick</h1>
            <p class="grey--text text--darken-2">
              Mithilfe von künstlicher Intelligenz haben wir Artikel über politisch relevante Ereignisse nach Themen
              gruppiert. Diese Gruppierung erlaubt es uns verschiedene Auswertungen über Meinungen und
              Aüßerungen von Politikern zu erstellen. Gleichzeitig können wir
              die Berichterstattung zu bestimmten Ereignissen
              transparenter und übersichtlicher machen.
            </p>
            <v-btn
                color="accent"
                class="float-end"
                elevation="4"
                rounded
            >
              Zum Dashboard
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="py-5 transition-container">
      <v-container>
        <v-row align="center" justify="center">
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

    <div>

      <v-container class="py-5">
        <h1 class="text-center">So funktioniert's</h1>
        <v-row class="mt-5">
          <v-col lg="3" class="text-center" v-for="(step, key) in politrackSteps" :key="key">
            <v-card class="info-card pa-5 rounded-xl" :color="key===activeStepIndex? 'accent':'white'" @click="activeStepIndex=key">
              <div class="content">
                <v-img width="96" class="mx-auto" :src="step.image"></v-img>
                <h4 class="mt-5">{{ step.title }}</h4>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col lg="8">
            <v-fade-transition :hide-on-leave="true">
              <v-card class="info-details pa-5 mt-5 rounded-xl" :key="activeStepIndex">
                <h2 class="text-center">{{ activeStep.title }}</h2>
                <p>{{ activeStep.description }}}</p>
              </v-card>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="white">
      <v-container class="py-5">
        <h1>Über uns</h1>
        <p>
          PoliTrack ist ein durch das <a href="https://www.bmbf.de/">Bundesministerium für Bildung und Forschung</a>
          gefördertes Projekt, das ein größeres Ziel verfolgt. Hierzu zitieren wir aus unserer Vorhabensbeschreibung.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
          et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
          amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
          aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
          gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </p>


      </v-container>
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
  data() {
    return {
      activeStepIndex: 0,
      politrackSteps: [
        {
          title: "Nachrichtenartikel extrahieren",
          image: require("@/assets/img/landing_page/newspaper.png"),
          description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore\n" +
              "          et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.\n" +
              "          Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit\n" +
              "          amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna\n" +
              "          aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd\n" +
              "          gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
        },
        {
          title: "Analyse der Daten",
          image: require("@/assets/img/landing_page/evaluation.png"),
          description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore\n" +
              "          et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.\n" +
              "          Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit\n" +
              "          amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna\n" +
              "          aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd\n" +
              "          gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
        },
        {
          title: "Meinungen und Äußerungen von Politker:innen",
          image: require("@/assets/img/landing_page/choice.png"),
          description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore\n" +
              "          et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.\n" +
              "          Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit\n" +
              "          amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna\n" +
              "          aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd\n" +
              "          gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
        },
        {
          title: "Statistiken",
          image: require("@/assets/img/landing_page/bar-chart.png"),
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
  }
}
</script>

<style scoped>

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

.info-card p {
  display: none;
}

.transition-container {
  background: rgb(255, 255, 255);
  background: linear-gradient(0deg, #efefef 0%, #efefef 50%, #ffffff 50%, #ffffff 100%);
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

.count-card {
  color: #4895EF;
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 1.5rem;
  background: #fcfcfc;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}

.count-card .v-image {
  max-width: 32px;
}

.mockup-image {
  margin-top: -64px;
}

.header-content {
  height: 64px;
}

.header-title {
  margin-top: -64px;
  position: absolute;
  z-index: 3;
}
</style>