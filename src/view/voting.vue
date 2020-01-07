<template>
  <v-container>
    <v-stepper v-model="e1">
      <v-stepper-header class="elevation-0">
        <template v-for="n in steps">
          <v-stepper-step
            :key="`${n}-step`"
            :complete="e1> n"
            :step="n"
            color="primary"
          >{{ voteFeature[n-1] }}</v-stepper-step>
          <v-divider v-if="n !== steps" :key="n"></v-divider>
        </template>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content v-for="n in steps" :key="`${n}-content`" :step="n">
          <v-card class="mb-12" elevation="0">
            <v-card-title>{{ voteFeature[n-1] }}</v-card-title>
            <v-card-text>
              <v-list-item-group v-model="selectedVote">
                <v-list-item
                  v-for="selection in selectionList"
                  :key="selection.id"
                  :value="selection"
                >
                  <template v-slot:default="{ active, toggle }">
                    <v-list-item-action>
                      <v-checkbox v-model="active" color="primary" @click="toggle"></v-checkbox>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title>{{selection.name}}</v-list-item-title>
                      <v-list-item-subtitle>{{ selection.class }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-avatar>
                      <template v-for="(photo, idx) in selection.photos">
                        <template v-if="idx==0">
                          <v-img :src="photo.url" :key="photo.url"></v-img>
                        </template>
                      </template>
                    </v-list-item-avatar>
                  </template>
                </v-list-item>
              </v-list-item-group>
            </v-card-text>
          </v-card>

          <v-btn
            color="black"
            :disabled="!selectedVote"
            @click="nextStep(n)"
            outlined
          >{{n==4?'Finish':'Continue'}}</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Confim Votes</v-card-title>
        <v-card-text>
          King: {{votes.king.name}}
          <br />
          Queen: {{votes.queen.name}}
          <br />
          Popular: {{votes.popular.name}}
          <br />
          innocent: {{votes.innocent.name}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="reVote">Revote</v-btn>
          <v-btn color="green darken-1" text @click="saveVote()">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { selectionServices } from "../services/selection-service";
import { voteService } from "../services/vote-service";
import { qrCheckService } from "../services/qrCheck-service";

export default {
  data: () => ({
    voteFeature: ["KING", "QUEEN", "POPULAR", "INNOCENT"],
    e1: 1,
    steps: 4,
    selectionList: [],
    maleList: [],
    femaleList: [],
    selectedVote: "",
    votes: {
      king: "",
      queen: "",
      popular: "",
      innocent: ""
    },
    dialog: false,
    qrDetail: []
  }),

  beforeCreate() {
    if (typeof Storage !== "undefined") var qr = localStorage.getItem("qr");
    var isAuthenticated = false;
    if (qr) {
      var ip = {
        ip: qr
      };
      qrCheckService
        .qrCheck(ip)
        .then(res => {
          isAuthenticated = res.data;
          if (isAuthenticated === true) {
            this.qrDetail = qr;
          } else {
            this.$router.push("/");
            localStorage.clear();
          }
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err);
        });
    } else {
      this.$router.push("/");
    }
    // eslint-disable-next-line
    console.log("qr", qr);
  },
  mounted() {
    this.getSelectionList();
    // eslint-disable-next-line
    console.log(this.qrDetail);
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
        })
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
          this.selectionList = this.maleList;
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log(err);
        });
    },
    saveVote() {
      this.dialog = false;
      let _vote = {
        ip: this.qrDetail,
        vote_details: [
          { selection_id: this.votes.king.id, choices: "k" },
          { selection_id: this.votes.queen.id, choices: "q" },
          { selection_id: this.votes.popular.id, choices: "p" },
          { selection_id: this.votes.innocent.id, choices: "i" }
        ]
      };
      voteService.saveVote(_vote).then(res => {
        // eslint-disable-next-line
        console.log(res);
        this.$router.push("/");
        alert(res.data);
      });
    },
    reVote: function() {
      this.dialog = false;
      this.e1 = 1;
      this.selectionList = this.maleList;
    },
    nextStep(n) {
      switch (n) {
        case 1:
          this.votes.king = this.selectedVote;
          this.selectedVote = "";
          this.selectionList = this.femaleList;
          break;
        case 2:
          this.votes.queen = this.selectedVote;
          this.selectedVote = "";
          this.selectionList = this.maleList.filter(
            male => this.votes.king.id != male.id
          );
          break;
        case 3:
          this.votes.popular = this.selectedVote;
          this.selectedVote = "";
          this.selectionList = this.femaleList.filter(
            female => this.votes.queen.id != female.id
          );
          break;
        case 4:
          this.votes.innocent = this.selectedVote;
          this.selectedVote = "";
          this.dialog = true;
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