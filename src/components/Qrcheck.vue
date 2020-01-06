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
          <v-tab v-for="i in 2" :key="i">{{ i }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabs">
          <v-tab-item>
            <p class="decode-result">
              Last result:
              <b>{{ result }}</b>
            </p>
            <qrcode-capture @decode="onDecode" />
          </v-tab-item>
          <v-tab-item>
            <div>
              <p class="decode-result">
                Last result:
                <b>{{ result }}</b>
              </p>
              <qrcode-stream :camera="camera" @decode="onDecode" />
            </div>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { QrcodeStream, QrcodeCapture } from "vue-qrcode-reader";
export default {
  components: { QrcodeStream, QrcodeCapture },
  data() {
    return {
      tabs: null,
      result: "",
      camera: "auto",
      noStreamApiSupport: false
    };
  },

  methods: {
    async onDecode(content) {
      this.result = content;
      this.turnCameraOff();

      // pretend it's taking really long
      await this.timeout(3000);
      this.isValid = content.startsWith("http");

      // some more delay, so users have time to read the message
      await this.timeout(2000);

      this.turnCameraOn();
    },

    turnCameraOn() {
      this.camera = "auto";
    },

    turnCameraOff() {
      this.camera = "off";
    },

    timeout(ms) {
      return new Promise(resolve => {
        window.setTimeout(resolve, ms);
      });
    }
  }
};
</script>
