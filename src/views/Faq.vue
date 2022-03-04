<template>
  <div class="faq-page">
    <h2 class="page-title">よくある質問</h2>
    <div class="container">
      <ul class="collapsible">
    <li>
      <div class="collapsible-header"><i class="material-icons">help_outline</i>割引チケットは利用できますか？</div>
      <div class="collapsible-body"><span>はい。お支払い時にご提示をお願いします。</span></div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">help_outline</i>クレジットカードは利用できますか？</div>
      <div class="collapsible-body"><span>はい。可能です。QRコード決済も可能です。</span></div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">help_outline</i>返品はどのように行えばよろしいですか？</div>
      <div class="collapsible-body"><span>詳細につきましては、<a href="#">こちらのページ</a>をご覧ください</span></div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">help_outline</i>割引チケットは利用できますか？</div>
      <div class="collapsible-body"><span>はい。お支払い時にご提示をお願いします。</span></div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">help_outline</i>クレジットカードは利用できますか？</div>
      <div class="collapsible-body"><span>はい。可能です。QRコード決済も可能です。</span></div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">help_outline</i>返品はどのように行えばよろしいですか？</div>
      <div class="collapsible-body"><span>詳細につきましては、<a href="#">こちらのページ</a>をご覧ください</span></div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">help_outline</i>割引チケットは利用できますか？</div>
      <div class="collapsible-body"><span>はい。お支払い時にご提示をお願いします。</span></div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">help_outline</i>クレジットカードは利用できますか？</div>
      <div class="collapsible-body"><span>はい。可能です。QRコード決済も可能です。</span></div>
    </li>
    <li>
      <div class="collapsible-header"><i class="material-icons">help_outline</i>返品はどのように行えばよろしいですか？</div>
      <div class="collapsible-body"><span>詳細につきましては、<a href="#">こちらのページ</a>をご覧ください</span></div>
    </li>
  </ul>
    </div>
  </div>
</template>

<script lang="js">
import { Component, Vue } from "vue-property-decorator";
import M from "materialize-css/dist/js/materialize.min";

@Component
export default class Faq extends Vue {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  created() {
    //cdnのインストールが必要。mountedだとタイミングが合わないので、時間をずらした。
    setTimeout(() => {
      M.AutoInit();
    }, 100);
  }
}
</script>

<style scoped>
.page-title{
  padding-top: 80px;
  text-align: center;
}
</style>
