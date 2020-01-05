<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row justify="center">
          <div>
            <v-img src="@/assets/unilogo.png" width="75"></v-img>
          </div>
        </v-row>
        <v-row justify="center">
          <span class="_title">University of Computer Studies (Maubin)</span>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-row>
            <transition name="fadeOne">
              <div v-show="show" class="container">
                <p class="One">Fresher Welcome (2019-2020)</p>
                <p class="Two"></p>
              </div>
            </transition>
            <!-- <transition name="fadeTwo">
              <div v-show="show" class="container">
                <p class="Two">2019-2020</p>
              </div>
            </transition>-->
          </v-row>
          <v-img src="@/assets/gp.jpg"></v-img>
          <v-card-actions>
            <v-btn  outlined to="/voting">Vote Now</v-btn>
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
  methods: {}
};
</script>

<style scoped>
.container {
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
}
p {
  text-align: center;
  font-size: 20px;
  overflow: hidden;
  margin: 1px;
}

._title {
  text-align: center;
  font-size: 30px;
  color: #00718e;
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