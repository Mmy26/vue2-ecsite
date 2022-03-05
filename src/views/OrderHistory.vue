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
                <th>配達日</th>
                <th>お届け先後住所</th>
                <th>ご注文商品</th>
              </tr>
            </thead>

            <tbody
              v-for="order of currentOrderHistoryInfoList"
              v-bind:key="order.id"
            >
              <tr>
                <th>
                  {{ order.orderDate }}
                </th>
                <th>
                  {{ formatDeliveryTime(order.deliveryTime) }}
                </th>
                <th>
                  {{ order.destinationAddress }}
                </th>
                <th>
                  <p
                    v-for="orderItem of order.orderItemList"
                    v-bind:key="orderItem.id"
                  >
                    {{ orderItem.item.name }} / {{ orderItem.quantity }}個
                  </p>
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
import { User } from "@/types/user";
import { Order } from "@/types/order";
import axios from "axios";

@Component
export default class OrderHistory extends Vue {
  private currentUser = new User(0, "", "", "", "", "", "");
  private currentOrderHistoryInfoList = new Array<Order>();

  async created(): Promise<void> {
    if (this.$store.getters.getLoginStatus === false) {
      this.$router.push("/login");
    }
    this.currentUser = this.$store.getters.getCurrentUser;
    const response = await axios.get(
      "http://153.127.48.168:8080/ecsite-api/order/orders/coffee/" +
        this.currentUser.id
    );
    for (const order of response.data.orders) {
      this.currentOrderHistoryInfoList.push(
        new Order(
          order.id,
          order.userId,
          order.status,
          order.totalPrice,
          order.orderDate,
          order.destinationName,
          order.destinationEmail,
          order.destinationZipcode,
          order.destinationAddress,
          order.destinationTel,
          order.deliveryTime,
          order.paymentMethod,
          order.user,
          order.orderItemList
        )
      );
    }
    this.currentUser = this.$store.getters.getCurrentUser;
  }
  /**
   *
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  formatDeliveryTime(date: unknown): string {
    let targetStr = `${date}`;
    let newArray = targetStr.split("T");
    return newArray[0]
  }
}
</script>

<style scoped>
.tableFormat {
  width: 850px;
  margin-left: auto;
  margin-right: auto;
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
