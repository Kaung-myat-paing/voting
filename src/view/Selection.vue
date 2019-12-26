<template>
  <v-container>
    <v-row dense>
      <v-col v-for="(item, i) in this.selectionList" :key="i" cols="12">
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
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { selectionServices } from "../services/selection-service";
export default {
  data: () => ({
    selectionList: []
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