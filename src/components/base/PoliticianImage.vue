<template>
  <img
      :src="url"
      @error="onError"
      class="white"
  />
</template>

<script>
export default {
  name: "PoliticianImage",
  props: {
    id: [Number, String]
  },
  data() {
    return {
      failed: false
    }
  },
  watch: {
    id: function (oldValue, newValue)
    {
      this.failed = false;
    }
  },
  computed: {
    url: function () {
      return this.failed ? require("../../assets/img/user.png") : "https://image.facethefacts-api.de/" + this.id + ".jpg";
    }
  },
  methods: {
    onError: function () {
      this.failed = true;
    }
  }
}
</script>

<style scoped>
.v-image >>> .v-image__image--preload {
  filter: none !important;
}
</style>