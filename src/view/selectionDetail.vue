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
    <v-card class="mx-auto" max-width="434" tile>
      <template v-for="(photo, idx) in selection.photos">
        <template v-if="idx==0">
          <v-img :src="photo.url" aspect-ratio="0.9" :key="photo.url">
            <div class="fill-height bottom-gradient">
              <v-row align="end" class="fill-height">
                <v-col class="py-0">
                  <v-list-item color="rgba(0, 0, 0, .4)" dark>
                    <v-list-item-content>
                      <v-list-item-title class="title">{{selection.name}}</v-list-item-title>
                      <v-list-item-subtitle>Age -{{selection.age}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
            </div>
          </v-img>
        </template>
      </template>

      <!-- <v-card-title>Cafe Badilico</v-card-title> -->

      <v-card-text>
        <!-- <v-row align="center" class="mx-0">
          <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>

          <div class="grey--text ml-4">4.5 (413)</div>
        </v-row>-->

        <div class="my-4 subtitle-1 black--text">Hobby • {{selection.hobby}}</div>
        <div class="my-4 subtitle-1 black--text">Ambition • {{selection.ambition}}</div>
         <div class="my-4 subtitle-1 black--text">Height • {{selection.height}}</div>

        <div class="my-4 subtitle-1 black--text">
          Social 
          <v-btn text icon :href="selection.social">
            <v-img src="@/assets/fb.png" max-width="24"></v-img>
          </v-btn>
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <!-- <v-card-actions>
        <v-btn color="deep-purple accent-4" text @click="reserve">Reserve</v-btn>
      </v-card-actions>-->
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
        <v-carousel-item v-for="(slide, i) in selection.photos" :key="i">
          <v-sheet :color="colors[i]" height="100%" tile>
            <v-row class="fill-height" align="center" justify="center">
              <v-img :src="slide.url" contain height="100%"></v-img>
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
import { selectionServices } from "../services/selection-service";
export default {
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