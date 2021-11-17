<template>
  <v-container>
    <div class="py-5">
      <h3>Über Uns</h3>
      <p>
        PoliTrack ist ein durch das <a href="https://www.bmbf.de/">Bundesministerium für Bildung und Forschung</a>
        gefördertes Projekt, das ein größeres Ziel verfolgt. Hierzu zitieren wir aus unserer Vorhabensbeschreibung.
      </p>
      <blockquote>
        <p class="default">
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

        <p class="default">
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
      </blockquote>

      <v-row>
        <v-col class="offset-lg-2 col-lg-4 col-md-6 col-12">
          <div class="py-5 px-4 text-center mt-2">
            <img alt="" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
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
            <img alt="" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
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

      <div class="px-4 text-center mb-5">
        <h2 class="mb-0">Gefördert durch</h2>
        <v-row>
          <v-col cols="12" sm="6">
            <v-img src="../assets/img/bmbf_logo.png" contain height="200"/>
          </v-col>
          <v-col cols="12" sm="6" class="pa-5">
            <v-img src="../assets/img/prototypefund.png" contain height="200"/>
          </v-col>
        </v-row>
      </div>
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
@import url('https://fonts.googleapis.com/css?family=Lato:400,700|Lora|Playfair+Display:700i,900');

html,
body {
  margin: 0;
  width: 100%;
}

h1, h2, p, i, a {
  color: rgba(0, 0, 0, 0.84);
  text-rendering: optimizeLegibility;
}

h1 {
  font-family: "Playfair Display", serif;
  text-align: left;
  margin-bottom: 8px;
}

h2 {
  font-family: "Lato", sans-serif;
  font-weight: 700;
  padding: 0;
  margin: 56px 0 -13px -1.883px;
  text-align: left;
  line-height: 34.5px;
  letter-spacing: -0.45px;
}

p:not(.default), i:not(.fas):not(.fab), a {
  margin-top: 21px;
  font-family: "Lora";
  letter-spacing: -0.03px;
  line-height: 1.58;
}

a {
  text-decoration: underline;
}

blockquote {
  font-family: "Playfair Display", serif;
  font-style: italic;
  letter-spacing: -0.36px;
  line-height: 2rem;
  overflow-wrap: break-word;
  margin: 20px 0 33px 0;
  /* text-align: center; */
  color: rgba(0, 0, 0, 0.68);
  padding: 0 0 0 50px;
}

.text-decoration-none {
  text-decoration: none;
}

</style>