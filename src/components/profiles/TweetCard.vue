<template>
  <v-card
      class="slider-card d-flex flex-column justify-space-between"
      color="#1cb8c2"
      dark
      rounded
  >
    <v-card-title>
      <v-icon
          left
      >
        fab fa-twitter
      </v-icon>
      <span class="ml-auto font-weight-light text-caption">@{{ user.username }}</span>
    </v-card-title>

    <v-card-text class="font-weight-bold">
      {{ tweet.text }}
    </v-card-text>

    <v-card-actions>
      <v-list-item>
        <v-list-item-avatar>
          <v-img
              :src="user.image"
              class="elevation-6"
          ></v-img>
        </v-list-item-avatar>
        <v-row
            class="text-caption"
            align="center"
            justify="end"
        >
          <v-icon class="mr-1" small>
            fas fa-comment
          </v-icon>
          <span class="subheading">{{ tweet.reply_count }}</span>
          <v-icon class="ml-2 mr-1" small>
            fas fa-retweet
          </v-icon>
          <span class="subheading">{{ tweet.retweet_count }}</span>
          <v-icon class="ml-2 mr-1" small>
            fas fa-heart
          </v-icon>
          <span class="subheading mr-2">{{ tweet.like_count }}</span>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "TweetCard",
  props: {
    tweet: Object,
    user: Object
  }
}
</script>

<style scoped>
</style>