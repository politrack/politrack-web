<template>
  <v-container>
    <div class="py-5">
      <div class="text-h2 mb-3">Über Uns</div>

      <div class="d-flex float-sm-end ps-5">
        <div class="py-5 px-4 text-center mt-2">
          <img alt="" class="img-fluid rounded-circle mb-3 img-thumbnail elevation-2"
               src="../assets/img/jonas.jpg" width="100">
          <h3 class="mb-0">Jonas Dippel</h3>
          <span class="small text-muted">Doktorand TU Berlin</span>
          <div class="mt-3">
            <a class="social-link text-decoration-none" href="mailto:j.dippel@campus.tu-berlin.de">
              <v-icon>fas fa-envelope</v-icon>
            </a>
            <a class="text-decoration-none ms-4" href="https://linkedin.com/in/jdippel/">
              <v-icon>fab fa-linkedin</v-icon>
            </a>
          </div>
        </div>

        <div class="py-5 px-4 text-center mt-2">
          <img alt="" class="img-fluid rounded-circle mb-3 elevation-2 img-thumbnail"
               src="../assets/img/michael.jpg"
               width="100">
          <h3 class="mb-0">Michael Perk</h3><span
            class="small text-muted">Doktorand TU Braunschweig</span>
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

      <p class="text-justify">
        Einer der Grundpfeiler der Demokratie sind unabhängige Medien, die kritisch über die politische Lage im Land
        berichten. In Zeiten von Online-Journalismus und Livetickern zu aktuellen Geschehnissen vergisst man leicht,
        dass sich die Entscheidung bei einer Wahl auch an bereits vergangenen Entscheidungen und Meinungen orientieren
        sollte. Möchte man über eine*n Bundestagsabgeordneten eines Landkreises mehr erfahren, kann man eine
        Onlinesuche
        machen, sich Interviews ansehen und auf Wahlkampfveranstaltungen gehen. All diese Möglichkeiten haben einen
        großen Makel: Es fehlt die zeitliche Dimension. Mehr noch ist es als Bürger*in unglaublich schwer, bei
        aktuellen
        Berichten auf dem Laufenden zu bleiben. Sobald einzelne Themen durch die Nachrichten in den Vordergrund
        geraten
        sind, bekommen sie für einige Tage oder Wochen volle Aufmerksamkeit. Im Anschluss geraten sie dann wieder
        schnell in Vergessenheit.
        Für politische Partizipation und eine gute Wahlentscheidung ist es jedoch wichtig, möglichst gut informiert
        über
        die Positionen einzelner Politiker*innen zu sein.
        Bei der Internetrecherche zu Politiker*innen erscheinen nur aktuelle Themen. Um auch historische Daten
        einzubeziehen, muss ein enormer Aufwand betrieben werden, den nur die wenigsten in Kauf nehmen möchten. Gerade
        über Politiker*innen, die selten in Medien erwähnt werden, ist es sehr schwierig, fundierte Informationen zu
        bekommen.
        Um die Meinungsbildung zu erleichtern, wollen wir Nachrichtenartikel besser ordnen und zugänglich machen. Dazu
        indexieren wir regelmäßig alle politische Nachrichtenartikel von den größten Medien aus Deutschland. Insgesamt
        haben wir bereits über eine halbe Million Artikel gesammelt.
      </p>

      <h2 id="politiker-innen-profile">Politiker*innen-Profile</h2>
      <p class="text-justify">Diese Menge an Artikeln erlaubt es uns einige interessante Auswertungen zu machen. Wir speichern zu jedem
        Nachrichtenartikel, welche Politiker*innen in dem jeweiligen Artikel vorkommen. Basierend auf diesen Information
        erstellen wir für jede*n Politiker*in ein Profil.</p>
      <p class="text-justify">Dieses beinhaltet grundlegende Attribute, wie Parteizugehörigkeit, aktuelle Position und weiterführende Links.
        Zudem berechnen wir, mit welchen Personen die oder der jeweilige Politiker*in am meisten in einem Artikel
        vorkommt. Natürlich zeigen wir ebenfalls aktuelle Artikel an, in denen der oder die Politiker*in erwähnt wird.
        Politiker*innen werden oft an ihren Meinungen und Äußerungen zu bestimmten Themen gemessen. Um die Informationen
        über Aussagen und Positionen schneller zugänglich zu machen, extrahieren wir automatisch Zitate aus den
        einzelnen Artikeln und ordnen sie den jeweiligen Politiker*innen zu. Damit ermöglichen wir einen direkten
        Überblick, über alle ihrer Aussagen in den Medien. Leider gelingt die Extraktion der Zitate nicht immer
        fehlerfrei. Manchmal werden bestimmte Zitate einer falschen Person zugeordnet. Darauf weisen wir die Nutzenden
        explizit hin. Neben den Zitaten liefern wir außerdem eine Quelle, in der die Aussage im Zweifelsfall validiert
        werden kann. Natürlich arbeiten wir weiter daran, die Extraktion der Zitate zu verbessern.</p>
      <p class="text-justify">Durch den Einsatz von Machine-Learning-Techniken, den sogenannten Transformer Modellen, können wir weitere
        Informationen über die Themen extrahieren, mit denen sich bestimmte Politiker*innen beschäftigen.
        Transformer Modelle sind in der KI-Forschung das State-of-the-Art Werkzeug, um dem Computer zu ermöglichen
        Sprache/Text zu verstehen. Dabei wird der zu analysierende Text zunächst in eine Repräsentation der im Text
        vorkommenden Themen und Inhalte überführt.
        Auf Basis dieser Repräsentation können im Anschluss Funktionen wie Themenextraktion oder eine Ähnlichkeitssuche
        stattfinden.
        Durch diese grobe Kategorisierung der Artikel, können wir dann eine Übersicht geben, mit welchen politischen
        Themen sich eine Person am meisten beschäftigt. Zu diesen Kategorien gehören zum Beispiel “Soziales”,
        “Außenpolitik”, “Gesundheit” oder “Klimaschutz”. So bekommen Nutzende einen schnellen Überblick über den
        Themenfokus eines Politikers.</p>
      <p class="text-justify">Zur Zeit zeigen wir nur aktuelle Artikel und Aussagen von Politiker*innen an. Jedoch wollen wir in Zukunft auch
        historische Aussagen und Zitate themenbasiert geordnet anzeigen. Dazu arbeiten wir aktuell noch an einem
        intuitiven Interface, dass es den Benutzer*innen ermöglicht historische Daten übersichtlich durchsuchen zu
        können. Derzeit gibt es schon unten auf der Seite eine Übersicht, wann die Präsenz einzelner Politiker*innen in
        den Medien besonders hoch war und aus welchen Medien die Artikel stammen. Ein hohes Aufkommen einer Person in
        den Medien korreliert meist mit einem besonderen politischen Ereignis, wie zum Beispiel einer Wahl.</p>
      <h2 id="dashboard">Dashboard</h2>
      <p class="text-justify">Wir geben aber nicht nur eine spezifische Übersicht über Politiker*innen, sondern auch über das aktuelle
        Tagesgeschehen in den Politik-Nachrichten. Auf der Dashboard-Seite (www.politrack.org/#/dashboard) zeigen wir
        die “Schlagzeilen des Tages”. Dabei gruppieren wir einzelne Schlagzeilen thematisch und verweisen auf die
        Artikel zu dem jeweiligen Thema. Dadurch kann man sich eine umfangreichere Meinung über ein Thema bilden und die
        Berichte von verschiedenen Herausgebern auf einen Blick vergleichen.</p>
      <p class="text-justify">Wir klassifizieren basierend auf den Schlagworten des Artikels, ob ein Artikel eine bestimmte Partei behandelt.
        Damit lässt sich berechnen, welche Parteien besonders im Fokus der Medien sind. Zudem zeigen wir auch, welche
        Politiker*innen einer Partei besonders viel in den Medien vorkommen und identifizieren Newcomer, die im
        Vergleich zu früheren Monaten nun besonders oft in Artikeln erscheinen.</p>
      <h2 id="bundestagswahl-2021">Bundestagswahl 2021</h2>
      <p class="text-justify">Wie hat die SPD es geschafft die Bundestagswahl für sich zu entscheiden? Wie kam es zum Absturz der CDU/CSU?
        Diese Fragen haben wir uns gestellt und können sie teilweise mit unseren Daten beantworten. Im Zuge der
        Bundestagswahl haben wir eine Themenübersicht geschaffen, die Berichte über politische Ereignisse mit den
        Umfragewerten der jeweiligen Parteien verknüpft. Dazu haben wir alle politischen Nachrichtenartikel von
        2019-2021 thematisch verknüpft und dann prominente Ereignisse identifiziert. Zu diesen Ereignissen haben wir
        dann die Zeitspanne gewählt, an denen das Thema am meisten in den Medien behandelt wurde. Daraus entstand eine
        interaktive Übersicht, in der diese Ereignisse mit den Umfragewerten zeitlich verknüpft sind. Diese Übersicht
        findet ihr auf politrack.org/#/btw. Mit etwas zusätzlicher Arbeit können ähnliche Auswertungen auch für
        zukünftige Wahlen durchgeführt werden.</p>
      <h2>Warum PoliTrack?</h2>
      <p class="text-justify">Wir sind zwei Informatiker aus Berlin und Braunschweig und haben im letzten Jahr mit einem größeren Team an
        einem anderen Data-Science-Projekt gearbeitet. Mit “Collabovid” haben wir mehr als 20.000 Wissenschaftler*innen
        aus der ganzen Welt dabei geholfen, Publikationen über das Coronavirus SARS-CoV-2 besser durchsuchbar zu machen.
        Uns war klar, dass man die Techniken zur Textanalyse, die wir im Zuge des Projektes gelernt haben, auch auf
        andere Bereiche übertragen kann. Da wir beide großes Interesse an der deutschen Politik haben, kam uns die Idee,
        diese Methoden auch in diesem Gebiet einzusetzen. Besonders vor der Bundestagswahl haben wir festgestellt, dass
        man sich viel zu wenig mit den wichtigen Themen und den einzelnen Kandidat*innen auseinandergesetzt hat.
        Wir beobachten, dass es manchen deutschen Medien mehr um Schlagzeilen geht als um unabhängige Berichterstattung.
        Diesen Trend halten wir für problematisch. Wir hoffen, mit unserem Projekt den Bürger*innen viele
        unterschiedliche Perspektiven zu einem Thema geben zu können. Damit soll die Transparenz in unserer Demokratie
        verbessert und eine objektivere Meinungsbildung gefördert werden.</p>
      <h2 id="kooperationen">Kooperationen</h2>
      <p class="text-justify">Andere Projekte wie <a href="https://facethefacts.app/">Face the Facts</a> und <a
          href="https://www.abgeordnetenwatch.de/">abgeordnetenwatch.de</a> haben auch das Ziel für mehr Transparenz in
        der Politik zu sorgen. Derzeit kooperieren wir bereits mit “Face the Facts” und stellen ihnen unsere
        aggregierten Daten mittels einer Schnittstelle zur Verfügung.</p>
      <h2 id="4x-danke-und-eine-bitte">4x Danke und eine Bitte</h2>
      <p class="text-justify">Abschließend danken wir dem BMBF und dem DLR für die Möglichkeit dieses Projekt umsetzen zu können, sowie dem
        Prototype Fund für die tolle Organisation und Unterstützung. Vielen Dank auch an David von Zero360 für deine
        Anregungen und Hilfe.</p>
      <p class="text-justify">Wir planen unsere API weiter auszubauen, sodass auch Journalist*en unsere Daten für ihre Recherchen nutzen
        können. Ebenso können wir für Journalisten eine thematische Suche anbieten, um Hintergrundrecherchen in Zukunft
        zu vereinfachen. Mittels der Artikeldaten wollen wir außerdem noch weitere spannende Auswertungen machen und die
        Seite damit ergänzen. Falls ihr Ideen habt, welche Metriken zur politischen Berichterstattung noch besonders
        interessant wären oder als Journalist*in an unseren Daten interessiert seid, schreibt uns bitte eine Nachricht!
        :)</p>

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