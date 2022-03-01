<template>
  <div>
    <footer>
      <div class="container">
        <img src="img_coffee/header_logo.png" />
        <p>優雅な時間ををあなたにお届け！</p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {}
</script>

<style scoped>
.container {
  max-width: 1170px;
  width: 100%;
  padding: 0 15px;
  margin: 0 auto;
}

footer {
  height: 65px;
  display: flex;
}

p {
  color: gray;
}
</style>
