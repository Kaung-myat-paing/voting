<template>
  <v-container>
    <v-row>
      <v-col>
        <v-tabs
          v-model="tabs"
          centered
          slider-color="primary"
          background-color="transparent"
          fixed-tabs
        >
          <v-tab v-for="i in 2" :key="i">{{ gender[i-1] }}</v-tab>
        </v-tabs>

        <v-tabs-items v-model="tabs">
          <v-tab-item>
            <v-row dense>
              <v-col v-for="(item, i) in this.maleList" :key="i">
                <v-card @click="SelectionDetail(item)">
                  <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                      <v-card-title class="title" v-text="item.name"></v-card-title>
                      <v-card-subtitle v-text="item.class"></v-card-subtitle>
                    </div>

                    <v-avatar class="ma-3" size="125" tile>
                      <!-- <v-img :src="boys[i].image"></v-img> -->
                    </v-avatar>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row dense>
              <v-col v-for="(item, i) in this.femaleList" :key="i">
                <v-card @click="SelectionDetail(item)">
                  <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                      <v-card-title class="title" v-text="item.name"></v-card-title>
                      <v-card-subtitle v-text="item.class"></v-card-subtitle>
                    </div>
                    <v-avatar class="ma-3" size="125" tile>
                      <!-- <v-img :src="girls[i].image"></v-img> -->
                    </v-avatar>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
      <!-- <v-col v-for="(item, i) in this.selectionList" :key="i" cols="12">
        <v-card @click="SelectionDetail(item)">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="title" v-text="item.name"></v-card-title>
              <v-card-subtitle v-text="item.class"></v-card-subtitle>
            </div>

            <v-avatar class="ma-3" size="125" tile>
              <v-img src="@/assets/lisa.jpg"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>-->
    </v-row>
  </v-container>
</template>
<script>
import { selectionServices } from "../services/selection-service";
// import { imageServices } from "../services/image-services";
export default {
  data: () => ({
    tabs: null,
    selectionList: [],
    maleList: [],
    femaleList: [],
    gender: ["Boys", "Girls"],
    boys: [],
    girls: []
  }),
  mounted() {
    this.getSelectionList();
  },
  methods: {
    getSelectionList() {
      selectionServices
        .getSelections()
        .then(res => {
          this.selectionList = res.data;
        })
        // .then(() => {
        //   imageServices
        //     .getImageBySelId(sele.id)
        //     .then(res => {
        //       sele.images = res.data;
        //     })
        //     .catch(err => {});
        //   this.selectionList.map(sele => {});
        // })
        .then(() => {
          this.maleList = this.selectionList.filter(
            selection => selection.sex === "male"
          );
          this.maleList.sort(function(a, b) {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });

          this.femaleList = this.selectionList.filter(
            selection => selection.sex === "female"
          );
          this.femaleList.sort(function(a, b) {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
          // eslint-disable-next-line
          console.log("boy", this.maleList);
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err);
        });
    },
    SelectionDetail: function(item) {
      if (typeof Storage !== "undefined")
        localStorage.setItem("sel_id_" + item.id, JSON.stringify(item));
      this.$router.push("/selection/" + item.id);
    }
  }
};
</script>