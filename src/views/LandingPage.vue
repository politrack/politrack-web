<template>
  <div>
    <div class="header-content">

      <v-container class="white--text">
        <div class="text-h4 header-title">PoliTrack</div>
      </v-container>
    </div>

    <div style="background-color: #B5179E" class="white--text">

      <v-container>
        <v-row>
          <v-col lg="8">
            <p>
              Mithilfe von künstlicher Intelligenz haben wir Artikel über politisch relevante Ereignisse nach Themen
              gruppiert. Diese Gruppierung erlaubt es uns verschiedene Auswertungen über Meinungen und
              Aüßerungen von Politikern zu erstellen. Gleichzeitig können wir
              die Berichterstattung zu bestimmten Ereignissen
              transparenter und übersichtlicher machen.
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
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
              et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
              aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
              gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
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

        <v-row>

          <v-col lg="4">
            <v-card class="rounded-xl count-card" elevation="1">
              <v-img src="../assets/img/landing_page/attach-file.png"></v-img>
              <ICountUp
                  class="ms-4"
                  :delay="100"
                  :endVal="510312"
                  :options="{'suffix': ' Artikel'}"
              />
            </v-card>
          </v-col>

          <v-col lg="4">
            <v-card class="rounded-xl count-card" elevation="1">
              <v-img src="../assets/img/landing_page/person.png"></v-img>
              <ICountUp
                  class="ms-4"
                  :delay="100"
                  :endVal="21003"
                  :options="{'suffix': ' Politiker:innen'}"
              />
            </v-card>
          </v-col>


          <v-col lg="4">
            <v-card class="rounded-xl count-card" elevation="1">
              <v-img src="../assets/img/landing_page/left-quote.png"></v-img>
              <ICountUp
                  class="ms-4"
                  :delay="100"
                  :endVal="312031"
                  :options="{'suffix': ' Zitate'}"
              />
            </v-card>
          </v-col>


        </v-row>
      </v-container>

    </div>

    <div>

      <v-container class="py-5">
        <h1>So funktioniert's</h1>
        <v-row class="mt-5">
          <v-col lg="3" class="text-center">
            <v-img width="96" class="mx-auto" src="../assets/img/landing_page/newspaper.png"></v-img>
            <h4 class="mt-5">Nachrichtenartikel extrahieren</h4>
          </v-col>

          <v-col lg="3" class="text-center">
            <v-img width="96" class="mx-auto" src="../assets/img/landing_page/evaluation.png"></v-img>
            <h4 class="mt-5">Analyse der Daten</h4>
          </v-col>

          <v-col lg="3" class="text-center">
            <v-img width="96" class="mx-auto" src="../assets/img/landing_page/choice.png"></v-img>
            <h4 class="mt-5">Meinungen und Äußerungen von Politker:innen</h4>
          </v-col>

          <v-col lg="3" class="text-center">
            <v-img width="96" class="mx-auto" src="../assets/img/landing_page/bar-chart.png"></v-img>
            <h4 class="mt-5">Statistiken</h4>
          </v-col>
        </v-row>

        <v-row class="mt-0 grey--text text--darken-3 text-center">
          <v-col lg="3">
            Wir extrahieren Nachrichtenartikel von 10 verschiedenen Tageszeitungen.
            Der Datensatz wird mehrmals täglich aktualisiert.
          </v-col>
          <v-col lg="3">
            Mithilfe von Machine Learning werden Quellen und Inhalte geprüft.
          </v-col>
          <v-col lg="3">
            Aus der Analyse können Informationen zu Meinungen und Äußerungen von Politiker:innen extrahiert werden.
          </v-col>
          <v-col lg="3">
            Die Menge an Informationen ermöglicht eine Aggregation von relevanten Statstiken über die
            politische Berichterstattung in Deutschland.
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
  }
}
</script>

<style scoped>

.count-card {
  color: #4895EF;
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 1.5rem;
  background: #fcfcfc;
  margin-left: auto;
  margin-right: auto;
}

.count-card .v-image {
  max-width: 64px;
}

.mockup-image {
  margin-top: -96px;
}

.header-content {
  height: 84px;
}

.header-title {
  margin-top: -64px;
  z-index: 3;
  position: absolute;
}
</style>