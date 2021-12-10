<template>
  <div style="margin-top: 10px">
    <v-row>
      <v-col class="text-center" lg="5" sm="12" style="margin-top: -50px">
        <v-avatar class="avatar elevation-2" size="128">
          <PoliticianImage :id="politician._id"/>
        </v-avatar>
        <h2 class="mt-1">{{ politician.label }}</h2>
        <PartyChip :partyId="politician.party"/>
      </v-col>

      <v-col lg="7" sm="12">
        <v-chip
            v-for="chip in chips"
            :key="chip.text"
            class="ma-1"
            :color="chip.color ? chip.color : '#f0f0f0'"
            :text-color="chip.color ? '#ffffff' : '#333333'"
            label>
          <v-icon left small>
            {{ chip.icon }}
          </v-icon>
          {{ chip.text }}
        </v-chip>

        <div class="d-flex align-center">
          <span class="text-caption me-4">Oft erwähnt mit:</span>
          <PoliticianAvatarRow :persons="mentionedWith"/>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PartyChip from "./PartyChip";
import PoliticianImage from "../base/PoliticianImage";
import PoliticianAvatarRow from "../base/PoliticianAvatarRow";

export default {
  name: "ProfileCard",
  components: {
    PartyChip,
    PoliticianImage,
    PoliticianAvatarRow
  },
  props: {
    politician: Object,
    mentionedWith: Array,
    statistics: Object
  },
  data: function () {
    console.log(this.mentionedWith)
    return {
      chips: [
        {
          'icon': 'fas fa-tasks',
          'text': this.politician.occupation
        },
        {
          'icon': 'fas fa-school',
          'text': this.politician.education
        },
        {
          'icon': 'fas fa-birthday-cake',
          'text': this.politician.year_of_birth
        },
        {
          'icon': 'fas fa-newspaper',
          'text': this.statistics.basic.lastWeekArticles + ' Artikel letzte Woche'
        },
        {
          'icon': 'fas fa-external-link-alt',
          'text': 'Abgeordnetenwatch',
          'color': '#f46b3b'
        },
        {
          'icon': 'fab fa-twitter',
          'text': 'Twitter',
          'color': '#1DA1F2'
        }
      ]
    }
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