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
      <router-link to="/faq" class="waves-effect waves-light btn green darken-1">よくある質問ページはこちら!</router-link>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">閉じる</a>
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
.modal-content{
  text-align: center;
}
</style>
