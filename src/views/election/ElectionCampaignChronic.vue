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
        </p>
      </div>
    </div>

    <PollEventChart :eventsProxy="eventsProxy" v-bind:events="events" @onTimelineUpdate="onTimelineUpdate"/>

    <div class="position-relative container mb-3">
      <transition v-for="ev in events" :key="ev.id" name="slide-fade">
        <Event v-show="ev.id === event.id" :ev="ev"/>
      </transition>
    </div>
  </div>
</template>

<script>
import events from "../../assets/btw/events.json"
import PollEventChart from '../../components/election/PollEventChart.vue'
import Event from '../../components/election/Event.vue'
import IntervalTree from '@flatten-js/interval-tree'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const $ = require('jquery')
window.$ = $

export default {
  name: "ElectionCampaignChronic",
  components: {
    PollEventChart,
    Event
  },
  data() {
    return {
      eventsProxy: [],
      events: events,
      currentDate: null,
      event: events[0]
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

    this.eventsProxy = this.events.map(function (event) {
      return {
        id: event.id,
        name: event.name,
        start: event.start,
        party: event.party,
        end: event.end,
        isActive: false
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

    possibleActiveEvents[Math.floor(Math.random() * possibleActiveEvents.length)].isActive = true;
  },
  watch: {
    eventsProxy: {
      handler: function (oldVal, newVal) {
        for (let idx = 0; idx < newVal.length; idx++) {
          if (newVal[idx].isActive) {
            this.event = newVal[idx];
            break
          }
        }
      },
      deep: true
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
      if (idx >= 0 && this.eventsProxy[idx].isActive === true) {
        return
      }
      if (idx >= 0) {
        this.eventsProxy[idx].isActive = true
        this.event = this.events[idx]
      }
      for (let k = 0; k < this.eventsProxy.length; k++) {
        if (k !== idx) {
          this.eventsProxy[k].isActive = false
        }
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