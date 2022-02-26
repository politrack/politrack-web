<template>
  <div>
    <v-dialog
        v-model="dialog"
        width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-icon :color="red?'red':'warning'" small v-bind="attrs"
                v-on="on">fas fa-exclamation-triangle
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
              color="warning"
              rounded
              @click="dialog = false"
          >
            Okay
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "Warning",
  props: {
    title: String,
    text: String,
    red: Boolean
  },
  data() {
    return {
      dialog: false
    }
  }
}
</script>

<style scoped>
</style>