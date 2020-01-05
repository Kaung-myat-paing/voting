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
        <v-row justify="center">
          <v-avatar size="150">
            <v-img :src="member.image" :alt="member.name" aspect-ratio="1.7"></v-img>
          </v-avatar>
        </v-row>
        <v-row justify="center">
          <span>{{member.name}}</span>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    members: [
      { name: "Htet Aung Lin", image: require("../assets/hal.jpg") },
      { name: "Phyo Kaung Khant", image: require("../assets/pkk.jpg") },
      { name: "Hein Htet Aung", image: require("../assets/hha.jpg") },
      { name: "Kaung Myat Paing", image: require("../assets/kmp.jpg") },
      { name: "Kaung Htut", image: require("../assets/kh.jpg") },
      { name: "Wai Lin Kyaw", image: require("../assets/wlk.jpg") },
      { name: "Lu Min Aung", image: require("../assets/lma.jpg") }
    ]
  })
};
</script>