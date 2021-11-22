<template>

  <v-card light class="mt-5" rounded>
    <v-row>
      <v-col class="text-center" lg="4">
        <v-avatar class="avatar elevation-2" size="128">
          <img :alt="politician.label" :src="politician.image" class="avatar-image">
        </v-avatar>
        <h2 class="mt-1 grey--text text--darken-2">{{ politician.label }}</h2>
      </v-col>

      <v-col lg="8">
        <v-list two-line>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Partei</v-list-item-title>
              <v-list-item-subtitle>{{ politician.party.label }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Beruf</v-list-item-title>
              <v-list-item-subtitle>{{ politician.occupation }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Ausbildung</v-list-item-title>
              <v-list-item-subtitle>{{ politician.education }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import PartyChip from "./PartyChip";
export default {
  name: "ProfileCard",
  components: {
    PartyChip
  },
  props: {
    politician: Object
  }
}
</script>

<style scoped>
  .avatar {
    margin-top: -40px;
    /*border: 8px solid rgb(245, 245, 245);*/
    border: 2px solid #ffffff;
  }

  .avatar-image {
  }
</style>