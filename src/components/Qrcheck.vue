<template>
  <v-container>
    <v-row>
      <v-col>
        <div>
          <p class="decode-result">Scan QR Code To Vote</p>
          <qrcode-stream :camera="camera" @decode="onDecode" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { QrcodeStream } from "vue-qrcode-reader";
import { qrCheckService } from "../services/qrCheck-service";
export default {
  components: { QrcodeStream },
  data() {
    return {
      tabs: null,
      result: "",
      camera: "auto",
      isAuthenticated: false
    };
  },

  methods: {
    async onDecode(content) {
      this.result = content;
      // this.$router.push("/selection/" + item.id);

      this.result = content;
      this.turnCameraOff(content);
      // pretend it's taking really long
      await this.timeout(3000);
      // some more delay, so users have time to read the message
      await this.timeout(2000);

      this.turnCameraOn();
    },

    turnCameraOn() {
      this.camera = "auto";
    },

    turnCameraOff(content) {
      this.camera = "off";

      var qr = {
        ip: content
      };
      // eslint-disable-next-line
      console.log("win lar", qr);

      qrCheckService
        .qrCheck(qr)
        .then(res => {
          // eslint-disable-next-line
          console.log("done", res.data);
          this.isAuthenticated = res.data;
          if (this.isAuthenticated === true) {
            if (typeof Storage !== "undefined")
              localStorage.setItem("qr", content);
            this.$router.push("/voting");
          } else {
            this.$router.push("/");
            alert(res.data);
          }
        })
        .catch(err => {
          // eslint-disable-next-line
          console.log("err", err);
        });
    },

    timeout(ms) {
      return new Promise(resolve => {
        window.setTimeout(resolve, ms);
      });
    }
  }
};
</script>
