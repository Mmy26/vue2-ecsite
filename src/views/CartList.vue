<template>
  <div>
    <header>
      <div class="container">
        <div class="header">
          <div class="header-left">
            <a href="top.html">
              <img class="logo" src="img/header_logo.png" />
            </a>
          </div>

          <div class="header-right">
            <a href="item_list.html">商品一覧</a>
            <a href="register_admin.html">会員登録</a>
            <a href="#"><i class="fas fa-shopping-cart"></i>カート</a>
            <a href="login.html" class="login">
              <i class="fas fa-sign-in-alt"></i>ログイン
            </a>

            <a href="order_history.html">注文履歴</a>
          </div>
        </div>
      </div>
    </header>
    <div class="top-wrapper">
      <div class="container">
        <h1 class="page-title">ショッピングカート</h1>
        <!-- table -->
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
              <tr v-for="orderItem of orderItems" v-bind:key="orderItem.id">
                <td class="cart-item-name">
                  <div class="cart-item-icon">
                    <img v-bind:src="orderItem.item.imagePath" />
                  </div>
                  <span>{{ orderItem.item.name }}</span>
                </td>
                <td>
                  <span class="price">&nbsp;{{ orderItem.size }}</span
                  >&nbsp;&nbsp;{{ getItemPrice() }}円 &nbsp;&nbsp;{{
                    orderItem.quantity
                  }}個
                </td>
                <td>
                  <ul>
                    <li
                      v-for="orderTopping of orderToppings"
                      v-bind:key="orderTopping.id"
                    >
                      {{ orderTopping.topping.name
                      }}{{ orderTopping.topping.price }}円
                    </li>
                  </ul>
                </td>
                <td>
                  <div class="text-center">
                    {{ orderItem.getCalcSubTotalPrice() }}円
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
          <div>消費税：8,000円</div>
          <div>ご注文金額合計：38,000円 (税込)</div>
        </div>
        <div class="row order-confirm-btn">
          <button class="btn" type="button">
            <span>注文に進む</span>
          </button>
        </div>
      </div>
      <!-- end container -->
    </div>
    <!-- end top-wrapper -->
    <footer>
      <div class="container">
        <img src="img/header_logo.png" />
        <p>アロハな気分をあなたにお届け！</p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Order } from "@/type/order";
@Component
export default class XXXComponent extends Vue {
  // 合計金額
  private totalPrice = 0;
  // 注文内容
  private currentOrder = new Array<Order>();

  /**
   * ショッピングカート一覧を表示させる.
   */
  created(): void {
    this.currentOrder = this.$store.getters.getOrder;
  }
}
</script>

<style scoped></style>
