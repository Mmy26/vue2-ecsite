<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
@Component
export default class XXXComponent extends Vue {
  async logoutUser(): Promise<void> {
    const response = await axios.post(
      "https://153.127.48.168:8080/ecsite-api/user/logout"
    );
    console.dir("response:" + JSON.stringify(response));
    this.$router.push("/itemList");
  }
}
</script>

<style scoped></style>
