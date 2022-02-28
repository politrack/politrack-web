<template>
  <div>

    <div class="header-container" :style="{'margin-top': '-'+barHeight+'px'}">
      <div class="overlay" :style="{'padding-top': 20+barHeight+'px'}">
        <v-container>
          <div class="text-h2 text-center">Dein Politik-Briefing</div>
          <div class="text-h6 text-center caption grey--text text--lighten-2">
            Unsere KI liest alle politischen Nachrichtenartikel von den größten Medien aus Deutschland und generiert
            daraus spannende Statistiken und Einblicke.
          </div>

          <v-row justify="center" align="start" class="mt-5">
            <v-col cols="12" lg="6">
              <SearchBar/>
            </v-col>
            <v-col cols="12" lg="6">
              <div class="d-flex justify-center flex-md-row flex-column  mt-1">
                <router-link :to="{'name': 'dashboard'}" class="me-md-5 text-decoration-none d-block">
                  <v-btn
                      color="accent"
                      elevation="4"
                      rounded
                      large
                      class="w-100"
                  >
                    Zur Übersicht
                  </v-btn>
                </router-link>

                <v-btn
                    color="white"
                    class="ms-md-5 mt-5 mt-md-0"
                    outlined
                    elevation="4"
                    rounded
                    large
                    @click="scrollToElement('functionality-container', {behavior: 'smooth'})"
                >
                  Mehr erfahren
                </v-btn>
              </div>
            </v-col>
          </v-row>


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
                  :endVal="counts.articles"
              />
            </v-card>
          </v-col>

          <v-col lg="4">
            <v-card class="rounded-circle count-card politician" elevation="1">
              <div class="count-text text-center text-h5">Politiker:innen</div>
              <ICountUp
                  class="count-text"
                  :delay="100"
                  :endVal="counts.politicians"
              />
            </v-card>
          </v-col>

          <v-col lg="4">
            <v-card class="rounded-circle count-card microphone" elevation="1">
              <div class="count-text text-center text-h5">Zitate</div>
              <ICountUp
                  class="count-text"
                  :delay="100"
                  :endVal="counts.quotes"
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
                  <p>{{ activeStep.description }}</p>
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
                PoliTrack ist ein durch das <a href="https://www.bmbf.de/" target="_blank">Bundesministerium für Bildung
                und
                Forschung</a>
                gefördertes Projekt, das ein größeres Ziel verfolgt. Hierzu zitieren wir aus unserer
                Vorhabensbeschreibung.
              </p>
              <p>
                Wir sind zwei Informatiker aus Berlin und Braunschweig und haben im letzten Jahr mit einem größeren Team
                an einem anderen Data-Science-Projekt gearbeitet. Mit <a href="https://collabovid.org" target="_blank">Collabovid</a>
                haben wir mehr als 20.000
                Wissenschaftler:innen aus der ganzen Welt dabei geholfen, Publikationen über das Coronavirus SARS-CoV-2
                besser durchsuchbar zu machen. Uns war klar, dass man die Techniken zur Textanalyse, die wir im Zuge des
                Projektes gelernt haben, auch auf andere Bereiche übertragen kann. Da wir beide großes Interesse an der
                deutschen Politik haben, kam uns die Idee, diese Methoden auch in diesem Gebiet einzusetzen. Besonders
                vor der Bundestagswahl haben wir festgestellt, dass man sich viel zu wenig mit den wichtigen Themen und
                den einzelnen Kandidat:innen auseinandergesetzt hat.
                Wir hoffen, mit unserem Projekt den Bürger:innen viele unterschiedliche Perspektiven zu
                einem Thema geben zu können. Damit soll die Transparenz in unserer Demokratie verbessert und eine
                objektivere Meinungsbildung gefördert werden.
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
import axios from "axios";
import SearchBar from "../components/dashboard/SearchBar";

export default {
  name: "LandingPage",
  props: {
    barHeight: Number
  },
  components: {
    SearchBar,
    ICountUp
  },
  mounted() {
    axios.get(process.env.VUE_APP_URL + '/web/data/landing.json').then((data) => {
      this.counts = data.data['counts']
    });

    switch (this.$vuetify.breakpoint.name) {
      case "lg":
      case "xl":
      case "md":
        this.timer = setInterval(() => {
          this.currentTimingStep = (this.currentTimingStep + 1) % this.updateProgressSteps;
          if (this.currentTimingStep === 0) {
            this.activeStepIndex = (this.activeStepIndex + 1) % this.politrackSteps.length;
          }
        }, this.changeInterval / this.updateProgressSteps)
    }
  },
  beforeDestroy() {
    if (this.timer !== null) {
      clearInterval(this.timer);
    }
  },
  data() {
    return {
      timer: null,
      counts: {
        articles: 0,
        politicians: 0,
        quotes: 0
      },
      currentTimingStep: 0,
      changeInterval: 5000,
      updateProgressSteps: 50,
      activeStepIndex: 0,
      politrackSteps: [
        {
          title: "Nachrichtenartikel",
          icon: require("@/assets/img/landing_page/newspaper.png"),
          image: require("@/assets/img/landing_page/logos.png"),
          description: "Einer der Grundpfeiler der Demokratie sind unabhängige Medien, die kritisch über " +
              "die politische Lage im Land berichten. In Zeiten von Online-Journalismus und Livetickern zu " +
              "aktuellen Geschehnissen vergisst man leicht, dass sich die Entscheidung bei einer Wahl auch " +
              "an bereits vergangenen Entscheidungen und Meinungen orientieren sollte. Möchte man über eine:n " +
              "Bundestagsabgeordneten eines Landkreises mehr erfahren, kann man eine Onlinesuche machen, " +
              "sich Interviews ansehen und auf Wahlkampfveranstaltungen gehen. Um die Meinungsbildung zu erleichtern, " +
              "versuchen wir Nachrichtenartikel besser zu ordnen und zugänglich machen. Dazu indexieren wir regelmäßig alle " +
              "politische Nachrichtenartikel von den größten Medien aus Deutschland. Insgesamt haben wir bereits über " +
              "eine halbe Million Artikel gesammelt."
        },
        {
          title: "Analyse der Daten",
          icon: require("@/assets/img/landing_page/evaluation.png"),
          image: require("@/assets/img/landing_page/machine-learning.png"),
          description: "Durch den Einsatz von Machine-Learning-Techniken, den sogenannten Transformer Modellen, können " +
              "wir weitere Informationen über die Themen extrahieren, mit denen sich bestimmte Politiker:innen " +
              "beschäftigen. Transformer Modelle sind in der KI-Forschung das State-of-the-Art Werkzeug, um dem " +
              "Computer zu ermöglichen Sprache/Text zu verstehen. Dabei wird der zu analysierende Text zunächst " +
              "in eine Repräsentation der im Text vorkommenden Themen und Inhalte überführt. Auf Basis dieser " +
              "Repräsentation können im Anschluss Funktionen wie Themenextraktion oder eine Ähnlichkeitssuche " +
              "stattfinden. Durch diese grobe Kategorisierung der Artikel, können wir dann eine Übersicht geben, " +
              "mit welchen politischen Themen sich eine Person am meisten beschäftigt. Andere Machine Learning Modelle " +
              "nutzen wir außerdem, um Zitate der Politiker:innen automatisch aus den Artikeln zu extrahieren. " +
              "Leider gelingt die Extraktion der Zitate nicht immer fehlerfrei. Manchmal werden bestimmte " +
              "Zitate einer falschen Person zugeordnet. Darauf weisen wir die Nutzenden explizit hin. Neben den " +
              "Zitaten liefern wir außerdem eine Quelle, in der die Aussage im Zweifelsfall validiert werden kann. " +
              "Natürlich arbeiten wir weiter daran, die Extraktion der Zitate zu verbessern."
        },
        {
          title: "Profile von Politiker:innen",
          icon: require("@/assets/img/landing_page/choice.png"),
          image: require("@/assets/img/website-mock.png"),
          description: "Basierend auf unseren Informationen erstellen wir für jede:n Politiker:in ein Profil. Dieses" +
              " beinhaltet grundlegende Attribute, wie Parteizugehörigkeit, aktuelle Position " +
              "und weiterführende Links. Zudem berechnen wir, mit welchen Personen die oder der " +
              "jeweilige Politiker:in am meisten in einem Artikel vorkommt. Natürlich zeigen wir " +
              "ebenfalls aktuelle Artikel an, in denen der oder die Politiker:in erwähnt wird. " +
              "Politiker:innen werden oft an ihren Meinungen und Äußerungen zu bestimmten Themen " +
              "gemessen. Um die Informationen über Aussagen und Positionen schneller zugänglich zu " +
              "machen, extrahieren wir automatisch Zitate aus den einzelnen Artikeln und ordnen sie den jeweiligen " +
              "Politiker:innen zu. Damit ermöglichen wir einen direkten Überblick, über alle ihrer Aussagen in den " +
              "Medien."
        },
        {
          title: "Übersicht",
          icon: require("@/assets/img/landing_page/bar-chart.png"),
          image: require("@/assets/img/landing_page/website-mock-statistics.png"),
          description: "PoliTrack liefert nicht nur eine spezifische Übersicht über Politiker:innen, sondern auch " +
              "über das aktuelle Tagesgeschehen in den Politik-Nachrichten. Auf der Übersichtsseite zeigen wir " +
              "die “Schlagzeilen des Tages”. Dabei gruppieren wir einzelne Schlagzeilen thematisch und" +
              " verweisen auf die Artikel zu dem jeweiligen Thema. Dadurch kann man sich eine umfangreichere " +
              "Meinung über ein Thema bilden und die Berichte von verschiedenen Herausgebern auf einen Blick " +
              "vergleichen. Wir klassifizieren basierend auf den Schlagworten des Artikels, ob ein Artikel eine " +
              "bestimmte Partei behandelt. Damit lässt sich berechnen, welche Parteien besonders im Fokus der " +
              "Medien sind. Zudem zeigen wir auch, welche Politiker:innen einer Partei besonders viel in den Medien " +
              "vorkommen und identifizieren Newcomer, die im Vergleich zu früheren Monaten nun besonders oft in " +
              "Artikeln erscheinen."
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

.w-100 {
  min-width: 100%;
  width: 100%;
}

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
  background-image: url('../assets/img/landing_page/news-image.jpg');
  background-attachment: fixed;
  background-size: cover;
  color: white;
}

.header-container > div.overlay {
  padding-bottom: 180px;
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