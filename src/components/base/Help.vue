<template>
  <div class="help-hover" :style="rightPadding?{'right': '10px'}:{}">
    <v-dialog
        v-model="dialog"
        width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-icon v-bind="attrs" color="grey" size="20"
                v-on="on">fas fa-question-circle
        </v-icon>
      </template>
      <v-card class="rounded-xl">
        <v-card-title>
          <span class="text-h5">{{ title }}</span>
        </v-card-title>
        <v-card-text>
          {{ text }}
        </v-card-text>
        <v-card-actions class="pb-4">
          <v-spacer></v-spacer>
          <v-btn
              color="accent"
              rounded
              @click="dialog = false"
          >
            Hab's verstanden
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Help",
  props: {
    title: String,
    text: String,
    rightPadding: Boolean
  },
  data() {
    return {
      dialog: false
    }
  }
}
</script>

<style scoped>

.help-hover {
  position: absolute;
  right: 0
}

</style>