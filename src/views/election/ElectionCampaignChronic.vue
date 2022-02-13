<template>
  <div style="background: white">
    <div class="jumbotron jumbotron-fluid mt-3">
      <div class="container header-container">
        <h1>Die Themen des Wahlkampfes</h1>
        <p class="">Mithilfe von künstlicher Intelligenz
          haben wir Artikel über politisch relevante Ereignisse nach Themen gruppiert
          und diese zeitlich mit den Umfragewerten zur Bundestagswahl verknüpft.
          Die Punkte repräsentieren die Ergebnisse einzelner Umfragen, während die Linien den
          Trend über die wichtigsten Umfragen im jeweiligen Zeitraum widerspiegeln.
          In der nächsten Zeit werden wir weitere Analysen über die politische Berichterstattung in Deutschland
          erstellen.
          Um immer auf dem neusten Stand zu bleiben, folgt uns gerne auf
          <a href="https://twitter.com/pltrck">Twitter</a>.
          Für Anregungen zu neuen Themen schreibt uns gerne eine
          <a href="mailto:politrack@gmx.de">Mail</a>.
          {{ activeIndex }}
        </p>
      </div>
    </div>

    <PollEventChart :eventsProxy="eventsProxy" :activeIndex="activeIndex" :setActiveIndex="setEventActive"
                    @onTimelineUpdate="onTimelineUpdate"/>

    <div class="container mt-4">
      <div>
        <EventSlider :eventsProxy="eventsProxy" :activeIndex="activeIndex" :updateActiveIndex="setEventActive"/>
      </div>
    </div>

    <div class="position-relative container mb-3" v-if="event !== null">
      <v-slide-y-transition hide-on-leave>
        <Event :ev="event" :key="event.idx"/>
      </v-slide-y-transition>
    </div>
  </div>
</template>

<script>
import events from "../../assets/btw/events.json"
import PollEventChart from '../../components/election/PollEventChart.vue'
import Event from '../../components/election/Event.vue'
import EventSlider from "../../components/election/EventSlider";
import IntervalTree from '@flatten-js/interval-tree'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const $ = require('jquery')
window.$ = $

export default {
  name: "ElectionCampaignChronic",
  components: {
    PollEventChart,
    Event,
    EventSlider
  },
  data() {
    return {
      eventsProxy: [],
      events: events,
      currentDate: null,
      activeIndex: 0,
    }
  },
  created() {
    let component = this;
    this.events.forEach(function (item) {
      item.start = new Date(item.start);
      item.start.setHours(0, 0, 0);
      item.end = new Date(item.end);
      item.end.setHours(0, 0, 0);

      item.articles.forEach(function (article) {
        article.published = new Date(article.published)
      })
      item.articles.sort(function (a, b) {
        return a.published - b.published
      })
    })

    this.events.sort(function (a, b) {
      return a.start - b.start
    })

    this.events.forEach(function (item, idx) {
      item.idx = idx;
    });

    this.eventsProxy = this.events.map(function (event) {
      return {
        idx: event.idx,
        id: event.id,
        name: event.name,
        start: event.start,
        party: event.party,
        end: event.end,
      }
    });

    this.eventIntervallTree = new IntervalTree();
    this.eventsProxy.forEach(function (eventProxy, idx) {
      component.eventIntervallTree.insert([eventProxy.start, eventProxy.end], idx)
    });
  },
  mounted() {
    let possibleActiveEvents = this.eventsProxy.filter(function (event) {
      return event.start.getFullYear() === 2021;
    });

    let activeIdx = Math.floor(Math.random() * possibleActiveEvents.length);
    this.setEventActive(possibleActiveEvents[activeIdx].idx);

  },
  computed: {
    event(){
      return this.activeIndex >= 0? this.events[this.activeIndex] : null;
    }
  },
  methods: {
    onTimelineUpdate(currentDate) {
      this.currentDate = currentDate;
      let intersectingIndices = this.eventIntervallTree.search([currentDate, currentDate]);
      let targetIdx = intersectingIndices.length ? intersectingIndices[intersectingIndices.length - 1] : -1;  // Indices always sorted
      this.setEventActive(targetIdx);
    },
    setEventActive(idx) {
      if(this.activeIndex !== idx) {
        this.activeIndex = idx;
      }
    }
  }
}

</script>

<style scoped>
.header-container {
  font-family: fell, Georgia, Cambria, "Times New Roman", Times, serif;
}

.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(50px);
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
}

.events {

}
</style>