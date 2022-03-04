<template>
  <div>
    <header>
      <div class="container"></div>
    </header>
    <div class="top-wrapper">
      <div class="container">
        <h1 class="page-title">ショッピングカート</h1>
        <div class="error-message">{{ errorMessage }}</div>
        <!-- table -->
        <div class="cartlist" v-show="canShow">
          <div class="row">
            <table class="striped">
              <thead>
                <tr>
                  <th class="cart-table-th">商品名</th>
                  <th>サイズ、価格(税抜)、数量</th>
                  <th>トッピング、価格(税抜)</th>
                  <th>小計</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="orderItem of this.currentOrder.orderItemList"
                  v-bind:key="orderItem.id"
                >
                  <td class="cart-item-name">
                    <div class="cart-item-icon">
                      <img v-bind:src="orderItem.item.imagePath" />
                    </div>
                    <span>{{ orderItem.item.name }}</span>
                  </td>
                  <td>
                    <span class="price">&nbsp;{{ orderItem.size }}</span
                    ><span>&nbsp;&nbsp;{{ orderItem.orderItemPrice }}円</span
                    ><span> &nbsp;&nbsp;{{ orderItem.quantity }}個</span>
                  </td>
                  <td>
                    <ul>
                      <li
                        v-for="orderTopping of orderItem.orderToppingList"
                        v-bind:key="orderTopping.id"
                      >
                        {{ orderTopping.topping.name }}
                        <span v-if="orderItem.size === 'M'"
                          >{{ orderTopping.topping.priceM }}円</span
                        >
                        <span v-else>{{ orderTopping.topping.priceL }}円</span>
                      </li>
                    </ul>
                  </td>
                  <td>
                    <div class="text-center">
                      {{ orderItem.calcSubTotalPrice.toLocaleString() }}円
                    </div>
                  </td>
                  <td>
                    <button class="btn" type="button">
                      <span>削除</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="row cart-total-price">
            <!-- this.currentOrder.taxだとエラーが出る -->
            <div>消費税：{{ this.currentOrder.tax.toLocaleString() }}円</div>
            <div>
              ご注文金額合計：{{
                this.currentOrder.calcTotalPrice.toLocaleString()
              }}円 (税込)
            </div>
          </div>
          <div class="row order-confirm-btn">
            <button class="btn" type="button" v-on:click="onOrderClick">
              <span>注文に進む</span>
            </button>
          </div>
        </div>
      </div>
      <!-- end container -->
    </div>
    <!-- end top-wrapper -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Order } from "@/types/order";
import { User } from "@/types/user";
import { OrderItem } from "@/types/orderItem";
import { Item } from "@/types/item";
import { Topping } from "@/types/topping2";
@Component
export default class XXXComponent extends Vue {
  // 合計金額
  private totalPrice = 0;
  // 注文内容
  private currentOrder = new Order(
    0,
    0,
    0,
    0,
    new Date(),
    "",
    "",
    "",
    "",
    "",
    new Date(),
    0,
    new User(0, "", "", "", "", "", ""),
    new Array<OrderItem>()
  );
  // エラーメッセージ
  private errorMessage = "";
  // 注文商品
  private item = new OrderItem(
    0,
    0,
    0,
    0,
    "",
    new Item(0, "", "", "", 0, 0, "", true, []),
    []
  );
  // 表示・非表示
  private canShow = true;

  /**
   * ショッピングカート一覧を表示させる.
   */
  created(): void {
    this.currentOrder = this.$store.getters.getOrder;

    // カートに商品が1個もなければエラーメッセージを出す
    if (this.currentOrder.orderItemList.length === 0) {
      this.errorMessage = "カートに商品がありません";
      this.canShow = false;
    }
  }
  /**
   * 注文に進む.
   */
  onOrderClick(): void {
    if (this.$store.getters.getLoginStatus === true){
       if (this.$store.state.order.orderItemList.length > 0) {
        this.$router.push("/orderConfirm");
      }
    }
      this.$router.push("/login");
  }
  /**
   * 商品を削除する.
   */
  removeFromCart(index: number): void {
    console.log(this.currentOrder.orderItemList);

    this.$store.commit("removeItem", { itemIndex: index });
    console.log(this.$store.getters.getOrder);
  }
}
</script>

<style scoped>
.error-message{
  text-align: center;
  margin-top:20px;
}

</style>
