<template>
  <v-container>
    <v-row>
      <transition name="fadeOne">
        <div v-show="show" class="container">
          <p class="One">Fresher Welcome</p>
        </div>
      </transition>
      <transition name="fadeTwo">
        <div v-show="show" class="container">
          <p class="Two">2019-2020</p>
        </div>
      </transition>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-card>
          <v-card-title class="headline"></v-card-title>

          <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and offline.</v-card-subtitle>

          <v-card-actions>
            <v-btn text outlined to="/voting">Vote Now</v-btn>
            <v-btn outlined to="/selection">Explore Selections</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    show: false
  }),
  mounted() {
    this.show = true;
  },
  methods: {
    
  }
};
</script>

<style scoped>
.container {
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
}
p {
  text-align: center;
  font-size: 40px;
  overflow: hidden;
  color: #4dba87;
  margin: 1px;
}

.Two {
  font-size: 18px;
}

.fadeOne-enter-active,
.fadeOne-leave-active {
  transition: all 0.9s ease-out;
}
.fadeOne-enter,
.fadeOne-leave-to {
  clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%);
  transform: translate(0%, 100%);
}

.fadeTwo-enter-active,
.fadeTwo-leave-active {
  transition: all 0.9s ease-out;
}
.fadeTwo-enter,
.fadeTwo-leave-to {
  clip-path: polygon(0% 100%, 100% 100%, 0% 100%, 0% 100%);
  transform: translate(0%, -100%);
}
</style>