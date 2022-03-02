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
        <div>{{ errorMessage }}</div>
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
                      v-for="topping of orderItem.item.toppingList"
                      v-bind:key="topping.id"
                    >
                      {{ topping.name }}{{ topping.toppingPrice }}円
                    </li>
                  </ul>
                </td>
                <td>
                  <div class="text-center">
                    {{ orderItem.calcSubTotalPrice }}円
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
          <div>消費税：8000円</div>
          <div>ご注文金額合計：67000円 (税込)</div>
        </div>
        <div class="row order-confirm-btn">
          <button class="btn" type="button" v-on:click="onOrderClick">
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
import { User } from "@/type/user";
import { OrderItem } from "@/type/orderItem";
import { Item } from "@/type/item";
import { Topping } from "@/type/topping2";
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
  /**
   * ショッピングカート一覧を表示させる.
   */
  created(): void {
    this.currentOrder = new Order(
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
      [
        new OrderItem(
          21,
          1,
          1,
          1,
          "M",
          new Item(
            21,
            "coffee",
            "Gorgeous4サンド",
            "",
            480,
            700,
            "/img_coffee/1.jpg",
            false,
            [
              new Topping(-1, "coffee", "ピクルス", 200, 300),
              new Topping(-1, "coffee", "チーズ", 200, 300),
            ]
          ),
          []
        ),
        new OrderItem(
          21,
          1,
          1,
          2,
          "L",
          new Item(
            21,
            "coffee",
            "コーヒー",
            "",
            480,
            700,
            "/img_coffee/1.jpg",
            false,
            [
              new Topping(-1, "coffee", "ピクルス", 200, 300),
              new Topping(-1, "coffee", "チーズ", 200, 300),
            ]
          ),
          []
        ),
      ]
    );
  }
  /**
   * 注文に進む.
   */
  onOrderClick(): void {
    //注文確認画面に遷移する
    this.$router.push("/orderConfirm");
  }
}
</script>

<style scoped></style>
