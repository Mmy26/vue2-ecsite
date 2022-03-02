<template>
  <div id="app">
    <Header />
    <div class="top-wrapper">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import M from "materialize-css/dist/js/materialize.min";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css"; // add
import "bootstrap-vue/dist/bootstrap-vue.css"; // add

@Component({
  components: {
    Header,
    Footer,
  },
})
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
