<template>
  <div class="orderHistory">
    <br />
    <br />
    <br />

    <section class="section" id="photos">
      <div class="row">
        <div class="col s12 l6 offset-l1">
          <h1 class="h1">* ❁ ｡ 注文履歴ﾟ ❀ ｡ *</h1>
          <h4 class="h4">ご注文ありがとうございました。</h4>
          <p class="sub">注文された商品の詳細は下よりご確認ください。</p>
        </div>
        <div class="col s12 l4">
          <img
            src="/img/bread-1284438_1920.jpg"
            alt=""
            class="responsive-img materialboxed"
          />
        </div>
        <div class="col s12">
          <table class="orderFinishHistory">
            <thead>
              <tr>
                <th>ご注文日</th>
                <th>配達日時</th>
                <th>お届け先後住所</th>
                <th>ご注文商品</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <th>
                  {{ currentOrderHistoryInfoList.orderDate }}
                </th>
                <th>{{ currentOrderHistoryInfoList.deliveryTime }}</th>
                <th>
                  {{ currentOrderHistoryInfoList.destinationAddress }}
                </th>
                <th>
                  {{ currentOrderHistoryInfoList.orderItemList }}
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { User } from "@/type/user";
import { OrderHistoryInfo } from "@/type/orderHistoryInfo";

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

<style scoped>
.orderFinishHistory {
  width: 850px;
  margin-left: auto;
  margin-right: auto;
  white-space: nowrap;
  word-wrap: break-word;
}

.h1 {
  text-align: center;
  color: #364e96; /*文字色*/
  padding: 0.5em 0; /*上下の余白*/
  border-top: solid 3px #364e96; /*上線*/
  border-bottom: solid 3px #364e96; /*下線*/
}
.h4 {
  text-align: center;
  color: #364e96;
}

.sub {
  text-align: center;
}
</style>
