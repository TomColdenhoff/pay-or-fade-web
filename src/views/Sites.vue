<template>
  <h1>Sites</h1>
</template>

<script>
import axios from "axios";

export default {
  name: "Sites",
  data() {
    return {
      sites: []
    };
  },
  methods: {
    loadSites() {
      new Promise((resolve, reject) => {
        axios({
          url: "https://localhost:5001/api/siteinfo/index",
          method: "GET"
        })
          .then(resp => {
            this.sites = resp.data;
            console.log(this.sites);
            resolve(resp);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },
  mounted() {
    this.loadSites();
  }
};
</script>

<style scoped></style>
