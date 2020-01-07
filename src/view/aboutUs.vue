<template>
  <v-container fluid>
    <v-row justify="center">
      <div>
        <v-img src="@/assets/itclub-iconlogo.png" width="75"></v-img>
      </div>
    </v-row>
    <v-divider></v-divider>

    <v-row>
      <v-col cols="12" md="3" xs="12" lg="3" sm="12" v-for="member in members" :key="member.name">
        <v-hover v-slot:default="{ hover }">
          <v-row justify="center">
            <v-avatar size="150">
              <v-img :src="member.image" :alt="member.name" aspect-ratio="1.7">
                <v-col align-self="end" v-if="hover">
                  <v-btn text icon :href="member.fb">
                    <v-img src="@/assets/fb.png" max-width="24"></v-img>
                  </v-btn>
                  <!-- <span v-if="hover" class="white--text">{{member.name}}</span> -->
                </v-col>
              </v-img>
            </v-avatar>
          </v-row>
          <!-- <v-row justify="center" v-if="hover">
           
          </v-row>-->
        </v-hover>
        <v-row justify="center">{{member.name}}</v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    members: [
      {
        name: "Htet Aung Lin",
        image: require("../assets/hal.jpg"),
        fb: "https://web.facebook.com/mm.htetaunglin"
      },
      {
        name: "Phyo Kaung Khant",
        image: require("../assets/pkk.jpg"),
        fb: "https://web.facebook.com/Moekaungkin999.ff"
      },
      {
        name: "Hein Htet Aung",
        image: require("../assets/hha.jpg"),
        fb: "https://web.facebook.com/hnhtag.me"
      },
      {
        name: "Kaung Myat Paing",
        image: require("../assets/kmp.jpg"),
        fb: "https://web.facebook.com/kmpg.me"
      },
      {
        name: "Kaung Htut",
        image: require("../assets/kh.jpg"),
        fb: "https://web.facebook.com/kaung.htut.507"
      },
      {
        name: "Wai Lin Kyaw",
        image: require("../assets/wlk.jpg"),
        fb: "https://web.facebook.com/WaiLinKyaw.me"
      },
      {
        name: "Lu Min Aung",
        image: require("../assets/lma.jpg"),
        fb: "https://web.facebook.com/lumin.aung.946"
      }
    ]
  })
};
</script>