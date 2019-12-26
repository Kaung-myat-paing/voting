<template>
  <v-container>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <template v-for="n in steps">
          <v-stepper-step
            :key="`${n}-step`"
            :complete="e1> n"
            :step="n"
            editable
            color="black"
          >Step {{ n }}</v-stepper-step>

          <v-divider v-if="n !== steps" :key="n"></v-divider>
        </template>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content v-for="n in steps" :key="`${n}-content`" :step="n">
          <v-card class="mb-12" elevation="0">
            <v-card-title>{{ voteFeature[n-1] }}</v-card-title>
            <v-card-content>
              <v-list-item-group v-model="selectedVote" mandatory>
                <v-list-item
                  v-for="selection in selectionList"
                  :key="selection.id"
                  :value="selection.id"
                >
                  <template v-slot:default="{ active, toggle }">
                    <v-list-item-action>
                      <v-checkbox v-model="active" color="primary" @click="toggle"></v-checkbox>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title>{{selection.name}}</v-list-item-title>
                      <v-list-item-subtitle>{{ selection.gender }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-avatar>
                      <v-img src="@/assets/lisa.jpg"></v-img>
                    </v-list-item-avatar>
                  </template>
                </v-list-item>
              </v-list-item-group>
            </v-card-content>
          </v-card>

          <v-btn color="black" @click="nextStep(n)" dark outlined>Continue</v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>
<script>
import { selectionServices } from "../services/selection-service";
export default {
  data: () => ({
    voteFeature: ["KING", "QUEEN", "POPULAR", "INNOCENT"],
    e1: 1,
    steps: 4,
    selectionList: [
      {
        id: 11,
        name: "Kaung Htut",
        class: "5CS-23"
      },
      {
        id: 22,
        name: "Hein Htet",
        class: "5CS-22"
      },
      {
        id: 33,
        name: "Kaung Myat",
        class: "5CS-1"
      }
    ],
    selectedVote: "",
    votes: {
      king: "",
      queen: "",
      popular: "",
      innocent: ""
    }
  }),
  mounted() {
    this.getSelectionList();
  },
  watch: {
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val;
      }
    }
  },
  methods: {
    getSelectionList() {
      selectionServices
        .getSelections()
        .then(res => {
          this.selectionList = res.data;
          // eslint-disable-next-line
          console.log("youk lar", this.selectionList);
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err);
        });
    },
    nextStep(n) {
      switch (n) {
        case 1:
          this.votes.king = this.selectedVote;
          break;
        case 2:
          this.votes.queen = this.selectedVote;
          break;
        case 3:
          this.votes.popular = this.selectedVote;
          break;
        case 4:
          this.votes.innocent = this.selectedVote;
          break;

        default:
          break;
      }

      if (n === this.steps) {
        // this.e1 = 1;
      } else {
        this.e1 = n + 1;
      }
    }
  }
};
</script>