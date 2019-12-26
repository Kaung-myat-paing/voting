<template>
  <v-container>
    <!-- <v-card class="mx-auto" max-width="434" tile>
      <v-img height="100%" src="@/assets/gu gu.jpg">
        <div class="fill-height bottom-gradient">
          <v-row align="end" class="fill-height">
            <v-col class="py-0">
              <v-list-item color="rgba(0, 0, 0, .4)" dark>
                <v-list-item-content>
                  <v-list-item-title class="title">{{selection.name}}</v-list-item-title>
                  <v-list-item-subtitle>{{selection.ambition}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </div>
      </v-img>
    </v-card>-->
    <v-card class="mx-auto">
      <v-img height="100%" src="@/assets/gu gu.jpg">
        <div class="fill-height bottom-gradient">
          <v-row align="end" class="fill-height">
            <v-col class="py-0">
              <v-list-item color="rgba(0, 0, 0, .4)" dark>
                <v-list-item-content>
                  <v-list-item-title class="title">{{selection.name}}</v-list-item-title>
                  <v-list-item-subtitle>{{selection.age}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </div>
      </v-img>

      <!-- <v-card-title>Cafe Badilico</v-card-title> -->

      <v-card-text>
        <!-- <v-row align="center" class="mx-0">
          <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>

          <div class="grey--text ml-4">4.5 (413)</div>
        </v-row>-->

        <div class="my-4 subtitle-1 black--text">{{selection.hobby}} • {{selection.ambition}}</div>

        <div>{{selection.description}}</div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Emojiiis</v-card-title>
      <v-card-text>
        <vue-feedback-reaction emojiWidth="32px" emojiHeight="32px" v-model="feedback" />
      </v-card-text>

      <v-card-actions>
        <v-btn color="deep-purple accent-4" text @click="reserve">Reserve</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mx-auto">
      <v-system-bar lights-out></v-system-bar>
      <v-carousel
        :continuous="false"
        :cycle="true"
        :show-arrows="false"
        hide-delimiter-background
        delimiter-icon="mdi-minus"
        height="300"
      >
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <v-sheet :color="colors[i]" height="100%" tile>
            <v-row class="fill-height" align="center" justify="center">
              <div class="display-3">{{ slide }} Slide</div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
      <v-list two-line>
        <!-- <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ selection.name }}</v-list-item-title>
            <v-list-item-subtitle>{{selection.age}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>-->
      </v-list>
    </v-card>
  </v-container>
</template>
<script>
import { VueFeedbackReaction } from "vue-feedback-reaction";
import { selectionServices } from "../services/selection-service";
export default {
  components: {
    VueFeedbackReaction
  },
  data: () => ({
    selection: new Object(),
    colors: [
      "green",
      "secondary",
      "yellow darken-4",
      "red lighten-2",
      "orange darken-1"
    ],
    slides: ["First", "Second", "Third", "Fourth", "Fifth"]
  }),
  mounted() {
    if (typeof Storage !== "undefined") {
      this.selection = JSON.parse(
        localStorage.getItem("sel_id_" + this.$route.params.id)
      );
      if (!this.selection) this.getSelectionDetail(this.$route.params.id);
    } else this.getSelectionDetail(this.$route.params.id);
  },
  methods: {
    getSelectionDetail: function(id) {
      selectionServices
        .getSelectionDetail(id)
        .then(res => {
          this.selection = res.data;
        })
        .catch(err => {
          //eslint-disable-next-line
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
.bottom-gradient {
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.4) 0%,
    transparent 72px
  );
}
</style>