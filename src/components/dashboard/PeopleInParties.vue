<template>
  <div>
    <div class="d-flex">
      <div class="d-flex flex-column me-5">
        <v-progress-circular
            :rotate="-90"
            :size="60"
            :width="5"
            :value="getCurrentPartyMentionPercentage(party)"
            :color="party.backgroundColor"
            v-for="party in parties"
            :key="party.id"
            class="mt-2"
        >
          <v-avatar
              class="avatar party-avatar" size="52"
              :class="{'disabled': selectedPartyId !== party.id}"
              @click="selectedPartyId = party.id"
              :style="{'background-color': party.backgroundColor}">
            <v-img contain :src="getPartyImage(party)"/>
          </v-avatar>
        </v-progress-circular>
      </div>

      <v-scroll-x-transition hide-on-leave>

        <div class="ms-5 flex-fill" :key="selectedPartyId"
             v-if="selectedPartyId !== null && stars[selectedPartyId] !== undefined">
          <div
              class="rounded-xl overflow-hidden justify-center d-flex"
              style="height: 50px; max-width: 100%;"
              :style="{'background-color': selectedParty.backgroundColor}">
            <v-img style="max-height: 50px; max-width: 100px;" contain :src="getPartyImage(selectedParty)"/>
          </div>

          <v-card class="blur-background rounded-xl pa-3 mt-5">
            <v-tabs
                v-model="tab"
                background-color="transparent"
                right
                dark
                icons-and-text
                :color="selectedParty.backgroundColor"
            >
              <v-tabs-slider></v-tabs-slider>

              <v-tab href="#most-mentions-tab">
                Am meisten erwähnt
                <v-icon small>fas fa-poll</v-icon>
              </v-tab>

              <v-tab href="#newcomers-tab">
                Newcomer
                <v-icon small>fas fa-chart-line</v-icon>
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab" class="py-3 transparent">
              <v-tab-item value="most-mentions-tab">
                <div class="d-flex flex-wrap">
                  <PoliticianAvatar class="ms-2" :politician="item" :size="calculateSize(item.count)"
                                    v-for="item in stars[selectedPartyId]" :key="item._id"/>
                </div>
              </v-tab-item>
              <v-tab-item value="newcomers-tab">
                <div>
                  <v-row>
                    <v-col cols="12" xs="6" sm="4" v-for="item in newcomers[selectedPartyId].slice(0,6)" :key="item.id"
                         class="d-flex flex-column align-center">
                      <PoliticianAvatar :politician="item" :size="60"/>
                      <span class="green--text">{{ calculateTrend(item) }}</span>
                      <span class="white--text text-center">{{ item.first_name }} {{ item.last_name }}</span>
                    </v-col>
                  </v-row>
                </div>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </div>
      </v-scroll-x-transition>
    </div>
  </div>
</template>

<script>
import parties_config from "../../assets/parties.json"
import PoliticianAvatar from "../base/PoliticianAvatar";

export default {
  name: "PeopleInParties",
  props: {
    stars: Object,
    newcomers: Object,
    partiesOverTime: Object
  },
  components: {
    PoliticianAvatar
  },
  data() {
    return {
      tab: null,
      selectedPartyId: parties_config.parties[0].id,
      parties: parties_config.parties
    }
  },
  mounted() {
    let component = this;

    parties_config.parties.forEach(function (p) {
      component.stars[p.id].sort(function (a, b) {
        return b.count - a.count;
      });
    });
  },
  computed: {
    selectedParty() {
      let component = this;
      return this.parties.find(function (a) {
        return a.id === component.selectedPartyId;
      })
    },
    minStarsCount() {
      return Math.min.apply(Math, this.stars[this.selectedPartyId].map(function (o) {
        return o.count;
      }));
    },
    maxStarsCount() {
      return Math.max.apply(Math, this.stars[this.selectedPartyId].map(function (o) {
        return o.count;
      }));
    }
  },
  methods: {
    calculateSize(count) {
      let maxOutput = 100;
      let minOutput = 30;
      return ((count - this.minStarsCount) / (this.maxStarsCount - this.minStarsCount)) * (maxOutput - minOutput) + minOutput;
    },
    calculateTrend(item) {
      let denominator = (item.articles_last_year - item.articles_last_month) / 11
      return denominator > 0 ? "+" + Math.round((item.articles_last_month / denominator) * 100) + "%" : "neu";
    },
    getPartyImage(party) {
      return require('@/assets/img/parties/' + party.id + '.svg');
    },
    getCurrentPartyMentionPercentage(party) {
      let count = 0;
      let total = 0;
      for (const [key, value] of Object.entries(this.partiesOverTime)) {
        total += value[value.length - 1];
        if (Number(key) === party.id) {
          count = value[value.length - 1];
        }
      }

      return count / total * 100;
    }
  }
}
</script>

<style scoped>

.party-avatar {
  transition: 0.2s all ease-in-out;
  cursor: pointer;
}

.transparent {
  background-color: transparent !important;
  border-color: transparent !important;
}

.party-avatar.disabled {
  filter: grayscale(100%);
}
</style>