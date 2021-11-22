<template>
  <v-chip
      class="ma-2"
      :color="color"
      text-color="#ffffff"
      label
  >
    <v-icon left small>
      fas fa-users
    </v-icon>
    {{ label }}
  </v-chip>
</template>

<script>
import party_config from "../../assets/parties.json"
export default {
  name: "PartyChip",
  props: {
    partyId: Number
  },
  computed: {
    party: function () {
      let component = this;
      return party_config.parties.find(function (item) {
        return item.id === component.partyId;
      })
    },
    color: function () {
      return this.party.color;
    },
    label: function () {
      return this.party.label;
    }
  }
}
</script>

<style scoped>

</style>