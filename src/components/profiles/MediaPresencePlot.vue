<template>
  <v-sheet color="#282c34" elevation="12" class="p-5" rounded>
    <v-sparkline
        :value="value"
        color="#ffffff"
        :gradient="['#f72047', '#ffd200', '#1feaea']"
        gradient-direction="top"
        height="160"
        line-width="1"
        label-size="8"
        stroke-linecap="round"
        smooth
    >
      <template v-slot:label="item">
        {{ moment(dates[item.index]).calendar() }}
      </template>
    </v-sparkline>
  </v-sheet>
</template>

<script>
export default {
  name: "MediaPresencePlot.vue",
  props: {
    articles: Array
  },
  data: () => ({
    value: [
      0,
      446,
      20,
      200,
      800,
      30,
      760,
    ],
    dates: [
        new Date(2021, 3, 1),
        new Date(2021, 4, 1),
        new Date(2021, 5, 1),
        new Date(2021, 6, 1),
        new Date(2021, 7, 1),
        new Date(2021, 8, 1),
        new Date(2021, 9, 1),
        new Date(2021, 10, 1),
    ]
  })
}
</script>

<style scoped>

</style>