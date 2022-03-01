<template>
  <div class="fixed-button">
     <div class="fixed-action-btn">
  <a class="waves-effect waves-light btn modal-trigger green darken-1" href="#modal1"><i class="large material-icons">chat</i></a>
  <ul>
  <div class="help-box">
  </div>
  </ul>
</div>
 <!-- Modal Trigger -->

  <!-- Modal Structure -->
  <div id="modal1" class="modal bottom-sheet">
    <div class="modal-content">
      <h4>何かお困りですか？</h4>
      <a class="waves-effect waves-light btn">よくある質問ページはこちら!</a>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
  </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class CompFixedButton extends Vue {

}
</script>

<style scoped>
.help-box{
  color: black;
  padding-right: 10px;
  text-align: left;
  height: 500px;
  width: 20px;
  z-index: 1;
}
</style>
