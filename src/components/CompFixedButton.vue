<template>
  <div class="fixed-button">
    <div class="fixed-action-btn">
      <router-link
        to="/faq"
        class="waves-effect waves-light btn modal-trigger blue darken-3"
        ><i class="large material-icons">chat</i></router-link
      >
      <ul>
        <div class="help-box"></div>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class CompFixedButton extends Vue {}
</script>

<style scoped>
.modal-content {
  text-align: center;
}
</style>
