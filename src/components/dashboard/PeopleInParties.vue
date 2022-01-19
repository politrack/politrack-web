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
              @click="selectedPartyId = selectedPartyId===party.id? null : party.id"
              :style="{'background-color': party.backgroundColor}">
            <v-img contain :src="getPartyImage(party)"/>
          </v-avatar>
        </v-progress-circular>
      </div>

      <v-scroll-x-transition hide-on-leave>

        <div class="ms-5 flex-fill" :key="selectedPartyId"
             v-if="selectedPartyId !== null && peopleInParties[selectedPartyId] !== undefined">
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
                <div>
                  <v-avatar
                      class="avatar elevation-2 ms-2"
                      :size="calculateSize(item.count)" v-for="item in peopleInParties[selectedPartyId]" :key="item.id">
                    <PoliticianImage :id="item.id"/>
                  </v-avatar>
                </div>
              </v-tab-item>
              <v-tab-item value="newcomers-tab">
                <div class="d-flex justify-space-between">
                  <div v-for="item in peopleInParties[selectedPartyId].slice(0,5)" :key="item.id"
                       class="d-flex flex-column align-center">
                    <v-avatar
                        class="avatar elevation-2"
                        size="60">
                      <PoliticianImage :id="item.id"/>
                    </v-avatar>
                    <span class="green--text">{{ randomInt(20, 100) }}  <v-icon x-small class="green--text">fas fa-arrow-up</v-icon></span>
                  </div>
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
import PoliticianImage from "../base/PoliticianImage";
import parties_config from "../../assets/parties.json"

export default {
  name: "PeopleInParties",
  props: {
    partiesData: Object
  },
  components: {
    PoliticianImage
  },
  data() {
    return {
      tab: null,
      selectedPartyId: parties_config.parties[0].id,
      parties: parties_config.parties,
      peopleInParties: {
        1: this.generateRandomPersons(),
        2: this.generateRandomPersons(),
        3: this.generateRandomPersons(),
        4: this.generateRandomPersons(),
        5: this.generateRandomPersons(),
        8: this.generateRandomPersons(),
        9: this.generateRandomPersons()
      }
    }
  },
  computed: {
    selectedParty() {
      let component = this;
      return this.parties.find(function (a) {
        return a.id === component.selectedPartyId;
      })
    }
  },
  methods: {
    calculateSize(count) {
      let maxInput = Math.max.apply(Math, this.peopleInParties[this.selectedPartyId].map(function (o) {
        return o.count;
      }));

      let minInput = Math.min.apply(Math, this.peopleInParties[this.selectedPartyId].map(function (o) {
        return o.count;
      }));
      let maxOutput = 100;
      let minOutput = 30;

      return ((count - minInput) / (maxInput - minInput)) * (maxOutput - minOutput) + minOutput;
    },
    getPartyImageUrl(party) {
      return '@/assets/img/parties/' + party.id + '.svg'
    },
    getPartyImage(party) {
      return require('@/assets/img/parties/' + party.id + '.svg');
    },
    getCurrentPartyMentionPercentage(party) {
      let count = 0;
      let total = 0;
      for (const [key, value] of Object.entries(this.partiesData.parties)) {
        total += value[value.length - 1];
        if (Number(key) === party.id) {
          count = value[value.length - 1];
        }
      }

      return count / total * 100;
    },
    randomInt(min, max) {
      return Math.floor((Math.random()) * (max - min + 1)) + min;
    },
    generateRandomPersons() {
      let component = this;
      let ids = [79475, 79474, 79477, 79479, 79215, 79213, 79219, 79210, 79221, 79230, 79232, 79234, 79235,
        79241, 79242, 79245, 79249, 79250, 79253, 79254, 79255]
      let return_value = ids.map(function (id) {
        return {
          id: id,
          count: component.randomInt(20, 100)
        }
      });

      let array = Array.from(return_value).sort((a, b) => b.count - a.count);

      return array;

      /*array = Array
          .from(array, (_, i) => i)
          .sort((a, b) => b % 2 - a % 2 || (a % 2 ? a - b : b - a))
          .map(i => array[i]);*/

    }
  },
}
</script>

<style scoped>
.w-100 {
  width: 100%;
  max-height: 100%;
  min-height: 100%;
}

.border-none {
  border: none;
}

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