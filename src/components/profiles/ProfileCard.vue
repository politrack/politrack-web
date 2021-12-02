<template>
  <div style="margin-top: 10px">
    <v-row>
      <v-col class="text-center" lg="5" sm="12" style="margin-top: -50px">
        <v-avatar class="avatar elevation-2" size="128">
          <img :alt="politician.label" :src="'https://image.facethefacts-api.de/' + politician.id + '.jpg'"
               class="avatar-image">
        </v-avatar>
        <h2 class="mt-1">{{ politician.label }}</h2>
        <PartyChip :partyId="politician.party.id"/>
      </v-col>

      <v-col lg="7" sm="12">
        <v-chip
            class="ma-1"
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
        <MentionedWith :mentions="politician.mentionedWith" class="mt-4"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PartyChip from "./PartyChip";
import MentionedWith from "./MentionedWith";

export default {
  name: "ProfileCard",
  components: {
    PartyChip,
    MentionedWith
  },
  props: {
    politician: Object
  }
}
</script>

<style scoped>
.avatar {
  /*border: 8px solid rgb(245, 245, 245);*/
  border: 4px solid #ffffff;
}

.avatar-image {
}

</style>