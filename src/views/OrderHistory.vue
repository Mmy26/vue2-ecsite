<template>
  <div class="orderHistory">
    <h1>注文履歴</h1>
    <section class="section" id="photos">
      <div class="row">
        <div class="col s12 l6 offset-l1">
          <h4 class="indigo-text text-darken-4">subTitle</h4>
          <p>
            ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。
          </p>
        </div>
        <div class="col s12 l4">
          <img
            src="/img/bread-1284438_1920.jpg"
            alt=""
            class="responsive-img materialboxed"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { User } from "@/types/user";
import { OrderHistoryInfo } from "@/types/orderHistoryInfo";

@Component
export default class OrderHistory extends Vue {
  private currentUser = new User(0, "", "", "", "", "", "");
  private currentOrderHistoryInfoList = new OrderHistoryInfo(
    -1,
    new Date(),
    "",
    new Date(),
    []
  );

  created(): void {
    this.$store.dispatch("asyncGetOrderHistoryInfo");
    this.currentOrderHistoryInfoList =
      this.$store.getters.getOrderHistoryInfoList;
    console.log(this.currentOrderHistoryInfoList);
  }
}
</script>

<style scoped></style>
