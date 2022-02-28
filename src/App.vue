<template>
  <div id="app">
    <div class="top-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import M from "materialize-css/dist/js/materialize.min";

@Component
export default class App extends Vue {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  mounted() {
    //cdnのインストールが必要。mountedだとタイミングが合わないので、時間をずらした。
    setTimeout(() => {
      M.AutoInit();
    }, 20);
  }
}
</script>

<style></style>
