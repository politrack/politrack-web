<template>
  <v-card dark class="mt-5 profile-card" rounded elevation="0">
    <v-row>
      <v-col class="text-center" lg="4">
        <v-avatar class="avatar elevation-2" size="128">
          <img :alt="politician.label" :src="politician.image" class="avatar-image">
        </v-avatar>
        <h2 class="mt-1">{{ politician.label }}</h2>
      </v-col>

      <v-col lg="8">
        <PartyChip :partyId="politician.party.id"/>

        <v-chip
            class="ma-2"
            color="#f0f0f0"
            text-color="#333333"
            label
        >
          <v-icon left small>
            fas fa-tasks
          </v-icon>
          {{ politician.occupation }}
        </v-chip>

        <v-chip
            class="ma-2"
            color="#f0f0f0"
            text-color="#333333"
            label
        >
          <v-icon left small>
            fas fa-school
          </v-icon>
          {{ politician.education }}
        </v-chip>
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
    /*border: 8px solid rgb(245, 245, 245);*/
    border: 2px solid #ffffff;
  }

  .avatar-image {
  }

  .profile-card {
    background: transparent;

  }
</style>