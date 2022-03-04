<template>
  <div class="order-finished">
    <div class="top-wrapper">
      <div class="container">
        <h1 class="page-title">決済が完了しました！</h1>
        <div class="order-finished-thanks-message">
          <p>この度はご注文ありがとうございます。</p>
          <p>
            お支払い先は、お送りしたメールに記載してありますのでご確認ください。
          </p>
          <p>メールが届かない場合は「注文履歴」からご確認ください。</p>
        </div>
        <div class="row order-finished-btn">
          <button class="btn" type="button" v-on:click="toTopPage">
            <span>トップ画面を表示する</span>
          </button>
        </div>
        <div class="row order-history-btn">
          <button class="btn" type="button" v-on:click="toOrderHistory">
            <span>注文履歴</span>
          </button>
        </div>
      </div>
      <!-- end container -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class OrderFinished extends Vue {
  created(): void {
    // if (this.$store.getters.getLoginStatus === false) {
    //   this.$router.push("/login");
    // }
  }

  toTopPage(): void {
    this.$router.push("/itemList");
  }
  toOrderHistory(): void {
    this.$router.push("/orderHistory");
  }
}
</script>

<style scoped>
.order-finished {
  text-align: center;
}
</style>
