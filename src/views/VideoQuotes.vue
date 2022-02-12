<template>
  <div>
    <v-container>
      <div class="py-5">
        <v-row>
          <v-col cols="12" lg="4"  style="background: black">
            <v-card elevation="0" class="d-flex flex-row ma-2 pa-3 rounded-xl" rounded v-for="quote in leftQuotes"
                    v-bind:key="quote.quote">
              <div class="text-left px-5 pt-1">
                <h3 class="quote mark">&ldquo;</h3>
                <h4 class="quote text">{{ getQuoteText(quote) }}</h4>
                <h5 class="d-block">
                  {{ quote.author }} in {{ sources[quote.source].label }}
                </h5>
                <small class="grey--text text--darken-3 font-italic text-decoration-none d-inline-block">
                  {{ quote.title }}
                </small>
              </div>
              <div class="ml-auto">
                <PoliticianAvatar :politician="{'id': quote.politician_id, 'first_name': quote.author, 'last_name': ''}"
                                  :size="64"/>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" lg="4" style="background: black">
            <v-card elevation="0" class="d-flex flex-row ma-2 pa-3 rounded-xl mt-5" rounded v-for="quote in rightQuotes"
                    v-bind:key="quote.quote">
              <div class="text-left px-5 pt-1">
                <h3 class="quote mark">&ldquo;</h3>
                <h4 class="quote text">{{ getQuoteText(quote) }}</h4>
                <h5 class="d-block">
                  {{ quote.author }} in {{ sources[quote.source].label }}
                </h5>
                <small class="grey--text text--darken-3 font-italic text-decoration-none d-inline-block">
                  {{ quote.title }}
                </small>
              </div>
              <div class="ml-auto">
                <PoliticianAvatar :politician="{'id': quote.politician_id, 'first_name': quote.author, 'last_name': ''}"
                                  :size="64"/>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import sources from "../assets/sources_config.json";
import PoliticianAvatar from "../components/base/PoliticianAvatar";

export default {
  name: "VideoQuotes",
  components: {
    PoliticianAvatar
  },
  data() {
    return {
      sources: sources,
      leftQuotes: [{
        'author': 'Annalena Baerbock',
        'quote': 'Wir erleben eine Zeit, in der markige Sprüche gut klingen, aber Steilvorlagen für heftigste Konsequenzen sein könnten',
        'source': 'taz',
        'title': 'Bundestagsdebatte zur Ukraine-Krise: Eiszeit ohne Olaf',
        'politician_id': 79475,
      },
        {
          'author': 'Kevin Kühnert',
          'quote': 'Wir müssen den grundsätzlichen politischen Konflikt darüber einmal hinter uns lassen',
          'source': 'spon',
          'title': 'Kühnert fordert Ende des Streits über Nord Stream 2\n',
          'politician_id': 175456,
        }
      ],
      rightQuotes: [{
        'author': 'Olaf Scholz',
        'quote': 'Die Ampel steht.',
        'source': 'zeit-online',
        'title': 'Olaf Scholz verkündet: "Die Ampel steht"',
        'politician_id': 66924
      },
        {
          'author': 'Peter Altmaier',
          'quote': 'Ergebnis konnte ich mir nicht in den schlimmsten Albträumen vorstellen.',
          'source': 'welt',
          'title': 'CDU arbeitet Wahl-Niederlage auf',
          'politician_id': 78815
        }]
    }
  },
  mounted() {

  },
  methods: {
    getQuoteText(quote) {
      return quote.quote.replace(/['"]+/g, '')
    },
  }
}
</script>

<style scoped>
</style>