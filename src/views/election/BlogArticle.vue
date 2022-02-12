<template>
  <div class="bg-white py-3">

    <div class="container">
      <h1>Woher kommen die Themen des Wahlkampfes?</h1>
      <h4 class="subtitle">
        Informationsextraktion mithilfe von künstlicher Intelligenz
      </h4>
      <p>
        Am 26. September 2021 wählt Deutschland einen neuen Bundestag. Damit endet
        die 16-jährige Kanzlerschaft von Angela Merkel. Schon lange nicht mehr war der Wahlausgang so offen wie in
        diesem
        Jahr. Als Reaktion auf die
        <a href="https://www.bundeswahlleiter.de/bundestagswahlen/2021.html">Bundestagswahl 2021</a>
        haben wir eine Übersicht über die politische Stimmung in Deutschland erstellt.
        Der Wahltrend wurde durch die Übersicht von
        <a href="https://www.zeit.de/politik/deutschland/2021-08/sonntagsfrage-bundestagswahl-2021-bundeskanzler-koalition-umfragen">ZEIT
          Online</a> inspiriert.
        Wir aggregieren Umfrageergebnisse von <a href="https://dawum.de/">DAFUM</a> und kombinieren diese mit
        politischen Ereignissen aus den letzten beiden Jahren.
      </p>
    </div>
  </div>
  <div class="py-3 bg-light">
    <div class="container">
      <h3>Datenquellen</h3>

      <div class="row">
        <div class="col-lg-8">
          <p>
            Für unsere Darstellung wurden 220.227 Online Nachrichtenartikel aus den Jahren 2020 und 2021
            ausgewertet.
            Die Artikel stammen aus eine der folgenden Quellen:
            <a href="https://www.bild.de/">BILD</a>,
            <a href="https://www.faz.net/">Frankfurter Allgemeine</a>,
            <a href="https://www.spiegel.de/">Spiegel Online</a>,
            <a href="https://www.sueddeutsche.de/">Süddeutsche</a>,
            <a href="https://taz.de/">taz</a>,
            <a href="https://www.welt.de/">Welt</a> und
            <a href="https://www.zeit.de/">ZEIT Online</a>.
            Eine Übersicht über die Anzahl der Artikel von verschiedenen Anbietern und über den gesamten Zeitraum
            können Sie den Grafiken entnehmen. Keine Informationen aus den Artikeln abseits vom Titel,
            Datum
            und der URL zur Quelle werden von uns veröffentlicht, um die Datenschutzbestimmungen der Zeitungen zu
            wahren.
          </p>

          <ArticlesOverTime/>
        </div>
        <div class="col-lg-4">
          <ArticleDistribution/>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white py-3">
    <div id="polls" class="container">
      <h3>Wie werden die Umfragewerte aggregiert?</h3>
      <p>
        Wahlumfragen spiegeln immer nur einen Moment der politischen Stimmung wieder. Weil nicht alle Wahlberechtigten
        auf befragt werden, unterliegt jede Umfrage statistischen Schwankungen. Um die verfügbaren Informationen
        zusammenzufassen, werden die Umfragewerte zur Bundestagswahl kombiniert. Die Trendlinie wird für jeden Tag
        des Jahres neu berechnet, wobei alle Umfragen einfließen, die bis zu dem jeweiligen Tag erschienen sind.
        Die einzelnen Umfragen zählen nicht alle gleich viel, sondern werden nach ihrem Alter und deren historischer
        Zuverlässigkeit gewichtet. An dieser Stelle haben wir uns an den mathematischen Methoden des
        <a href="https://www.zeit.de/politik/deutschland/2021-08/sonntagsfrage-bundestagswahl-2021-bundeskanzler-koalition-umfragen">
          ZEIT-Online Wahltrends
        </a>
        orientiert. So werden die Gewichte von vergangene Umfragen von einem Institut um die Hälfte reduziert sobald
        eine neue erscheint und die historische Zuverlässigkeit durch die Ergebnisse aller Wahlen seit 1990
        repräsentiert.
        </p>
      <p>
        Die Institute fließen mit folgenden Gewichten in die Auswertung ein:
        Forschungsgruppe Wahlen (1), Infratest dimap
        (0,96), Allensbach (0,92), Kantar (0,89), GMS (0,87), Forsa (0,79), INSA (0,77), YouGov (0,7).

        Zusätzlich möchten wir folgenden redaktionellen Hinweis des
        <a href="https://www.zeit.de/politik/deutschland/2021-08/sonntagsfrage-bundestagswahl-2021-bundeskanzler-koalition-umfragen">ZEIT-ONLINE Teams</a> mit Ihnen teilen:
      </p>

      <blockquote>
        Für die Wahlumfragen befragen Meinungsforschungsinstitute regelmäßig eine vierstellige Anzahl Wahlberechtigter.
        Die meisten Institute rufen sowohl Festnetz- als auch Mobilfunknummern an, bei manchen kommen außerdem
        Onlinebefragungen zum Einsatz. Da sich nicht alle Bevölkerungsgruppen gleich gut für die Umfragen erreichen
        lassen, werden die Werte anschließend nach soziodemografischen Merkmalen wie Alter und Geschlecht gewichtet. So
        entstehen sogenannte repräsentative Stichproben, die in ihrer Zusammensetzung die Gesellschaft möglichst gut
        abbilden sollen. Die genaue Methodik der Institute ist dabei in der Regel für die Öffentlichkeit nicht
        transparent. - ZEIT Online
      </blockquote>

    </div>
  </div>

  <div class="bg-light py-3">
    <div class="container">
      <h3>Wie wurden die Daten ausgewertet?</h3>
      <p>
        Für die Extraktion von wichtigen Quellen zu bestimmten Ereignissen, wurden die Inhalte der Nachrichtenartikel
        durch eine künstliche Intelligenz analysiert. Das von uns trainierte
        <a href="https://de.wikipedia.org/wiki/Transformer_(Maschinelles_Lernen)">Transformer Modell</a>
        transformiert die Informationen aus den Artikeln und codiert diese in einem Vektor, den ein zweiter Algorithmus
        interpretieren kann.
        Sobald wir ein Ereignis - zum Beispiel <q>Laschet/Söder Kanzlerkanditatur</q> -
        anlegen, genügt es dem Thema beschreibende Texte wie
        <q>Armin Laschet und Markus Söder liefern sich einen Machtkampf um die Kanzlerkandidatur</q> zu geben.
        Das Transformer Modell kann auf Basis dieser Beschreibungen Vektoren anlegen, die das gesuchte Ereignis codieren
        und Nachrichtenartikel extrahieren, die sich mit diesem Thema beschäftigen. So können aus über 200.000 Artikeln
        in kürzester Zeit die relevantesten Artikel gefunden werden.
      </p>
    </div>
  </div>

  <div class="bg-white py-3">
    <div class="container">
      <h3>Wer wir sind und wie es weiter geht</h3>
      <p>
        PoliTrack ist ein durch das <a href="https://www.bmbf.de/">Bundesministerium für Bildung und Forschung</a>
        gefördertes Projekt, das ein größeres Ziel verfolgt. Hierzu zitieren wir aus unserer Vorhabensbeschreibung.
      </p>
      <blockquote>
        <p class="default">
          Die Entscheidung, in einer Wahl dem einen oder der anderen
          Politiker*in die Stimme zu
          geben, kann sehr komplex sein. Am besten orientieren sich Wähler*innen dabei nicht nur am aktuellen Wahlkampf,
          sondern auch an vergangenen Entscheidungen und Meinungen. Wer mehr über eine*n Bundestagsabgeordnete*n eines
          Landkreises erfahren möchte, kann beispielsweise eine Online-Suche starten, sich Interviews ansehen und auf
          Wahlkampfveranstaltungen gehen. All diese Möglichkeiten haben jedoch einen großen Makel: Es fehlt die
          zeitliche
          Dimension.
        </p>

        <p class="default">
          Eventuell gibt es einen Wikipedia-Artikel, in dem einige der wichtigsten Schwerpunkte zusammengefasst sind.
          Wir
          sind überzeugt davon, dass es eine bessere Möglichkeit geben sollte sich über eine*n Politiker*in zu
          informieren: PoliTrack soll Nachrichtenartikel von verschiedenen Anbietern aus den letzten Jahren analysieren
          und thematisch gruppieren. Nutzer*innen haben dann die Möglichkeit, sich die Nachrichtenartikel über die für
          sie
          relevanten Themen durchzulesen und sich ihre eigene Meinung zu bilden.
        </p>
      </blockquote>

      <div class="row">
        <div class="offset-lg-2 col-lg-4 col-md-6 col-12">
          <div class="py-5 px-4 text-center mt-2">
            <img alt="" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                 src="../assets/img/jonas.jpg" width="200">
            <h5 class="mb-0">Jonas Dippel</h5>
            <span class="small text-muted">Student TU Berlin</span>
            <ul class="social mb-0 list-inline mt-3">
              <li class="list-inline-item">
                <a class="social-link" href="mailto:j.dippel@campus.tu-berlin.de">
                  <font-awesome-icon :icon="['fas', 'envelope']"/>
                </a>
              </li>
              <li class="list-inline-item">
                <a class="social-link" href="https://linkedin.com/in/jdippel/">
                  <font-awesome-icon :icon="['fab', 'linkedin']"/>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 col-12">
          <div class="py-5 px-4 text-center mt-2">
            <img alt="" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" src="../assets/img/michael.jpg"
                 width="200">
            <h5 class="mb-0">Michael Perk</h5><span
              class="small text-muted">Student TU Braunschweig</span>
            <ul class="social mb-0 list-inline mt-3">
              <li class="list-inline-item">
                <a class="social-link" href="mailto:m.perk@tu-bs.de">
                  <font-awesome-icon :icon="['fas', 'envelope']"/>
                </a>
              </li>
              <li class="list-inline-item">
                <a class="social-link" href="https://www.linkedin.com/in/michael-perk">
                  <font-awesome-icon :icon="['fab', 'linkedin']"/>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>


      <div class="px-4 text-center mb-5">
        <h2 class="mb-0">Gefördert durch</h2>

        <div class="d-lg-flex justify-content-around text-center">
          <img alt="" class="img-fluid img-thumbnail mb-3 border-0 bg-transparent" src="../assets/img/bmbf_logo.png">
          <img alt="" class="img-fluid img-thumbnail mb-3 border-0 bg-transparent"
               src="../assets/img/prototypefund.png">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleDistribution from "../../components/election/blog/ArticleDistribution.vue"
import ArticlesOverTime from "../../components/election/blog/ArticlesOverTime.vue"

export default {
  name: "BlogArticle",
  components: {
    ArticleDistribution,
    ArticlesOverTime
  },
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

.first-letter {
  overflow-wrap: break-word;
  font-family: "Playfair Display", serif;
  font-size: 3rem;
  line-height: 3rem;
  display: block;
  position: relative;
  float: left;
  margin: 0px 7px 0 -5px;
}

.subtitle {
  font-family: "Lato", sans-serif;
  color: rgba(0, 0, 0, 0.54);
  margin: 0 0 24px 0;
}
</style>