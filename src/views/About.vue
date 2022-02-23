<template>
  <v-container>
    <div class="py-5">
      <div class="text-h4 mb-3">Über Uns</div>
      <p class="text-justify">
        PoliTrack ist ein durch das <a href="https://www.bmbf.de/">Bundesministerium für Bildung und Forschung</a>
        gefördertes Projekt, das ein größeres Ziel verfolgt. Hierzu zitieren wir aus unserer Vorhabensbeschreibung.
      </p>
      <p class="text-justify">
        Die Entscheidung, in einer Wahl dem einen oder der anderen
        Politiker*in die Stimme zu
        geben, kann sehr komplex sein. Am besten orientieren sich Wähler*innen dabei nicht nur am aktuellen
        Wahlkampf,
        sondern auch an vergangenen Entscheidungen und Meinungen. Wer mehr über eine*n Bundestagsabgeordnete*n
        eines
        Landkreises erfahren möchte, kann beispielsweise eine Online-Suche starten, sich Interviews ansehen und
        auf
        Wahlkampfveranstaltungen gehen. All diese Möglichkeiten haben jedoch einen großen Makel: Es fehlt die
        zeitliche
        Dimension.
      </p>

      <p class="text-justify">
        Eventuell gibt es einen Wikipedia-Artikel, in dem einige der wichtigsten Schwerpunkte zusammengefasst
        sind.
        Wir
        sind überzeugt davon, dass es eine bessere Möglichkeit geben sollte sich über eine*n Politiker*in zu
        informieren: PoliTrack soll Nachrichtenartikel von verschiedenen Anbietern aus den letzten Jahren
        analysieren
        und thematisch gruppieren. Nutzer*innen haben dann die Möglichkeit, sich die Nachrichtenartikel über die
        für
        sie
        relevanten Themen durchzulesen und sich ihre eigene Meinung zu bilden.
      </p>

      <v-row align="center">
        <v-col lg="6" cols="12">
          <div class="text-h4 text-center">Partner</div>
        </v-col>
        <v-col lg="4" cols="12" sm="6">
          <a href="https://www.bmbf.de/">
            <v-img src="../assets/img/bmbf_logo.png" contain height="100"/>
          </a>
        </v-col>
        <v-col lg="2" cols="12" sm="6">
          <a href="https://prototypefund.de/">
            <v-img src="../assets/img/prototypefund.png" contain height="100"/>
          </a>
        </v-col>

      </v-row>


      <v-row>
        <v-col class="offset-lg-2 col-lg-4 col-md-6 col-12">
          <div class="py-5 px-4 text-center mt-2">
            <img alt="" class="img-fluid rounded-circle mb-3 img-thumbnail elevation-2"
                 src="../assets/img/jonas.jpg" width="200">
            <h3 class="mb-0">Jonas Dippel</h3>
            <span class="small text-muted">Student TU Berlin</span>
            <div class="mt-3">
              <a class="social-link text-decoration-none" href="mailto:j.dippel@campus.tu-berlin.de">
                <v-icon>fas fa-envelope</v-icon>
              </a>
              <a class="text-decoration-none ms-4" href="https://linkedin.com/in/jdippel/">
                <v-icon>fab fa-linkedin</v-icon>
              </a>
            </div>
          </div>
        </v-col>
        <div class="col-lg-4 col-md-6 col-12">
          <div class="py-5 px-4 text-center mt-2">
            <img alt="" class="img-fluid rounded-circle mb-3 elevation-2 img-thumbnail"
                 src="../assets/img/michael.jpg"
                 width="200">
            <h3 class="mb-0">Michael Perk</h3><span
              class="small text-muted">Student TU Braunschweig</span>
            <div class="mt-3">
              <a class="social-link text-decoration-none" href="mailto:m.perk@tu-bs.de">
                <v-icon>fas fa-envelope</v-icon>
              </a>
              <a class="text-decoration-none ms-4" href="https://www.linkedin.com/in/michael-perk">
                <v-icon>fab fa-linkedin</v-icon>
              </a>
            </div>
          </div>
        </div>
      </v-row>
    </div>
  </v-container>
</template>

<script>

export default {
  name: "BlogArticle",
  components: {},
  mounted() {
    window.scrollTo(0, 0);
  }
}
</script>

<style scoped>

.rounded-circle {
  border: 5px solid #ffffff;
}


</style>