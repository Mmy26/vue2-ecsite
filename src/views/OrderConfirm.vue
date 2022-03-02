<template>
  <div class="order-confirm">
    <body>
      <div class="top-wrapper">
        <div class="container">
          <h1 class="page-title">注文内容確認</h1>
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
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="row cart-total-price">
            <div>消費税：{{ this.currentOrder.tax }} 円</div>
            <div>
              ご注文金額合計：{{ this.currentOrder.calcTotalPrice }} 円 (税込)
            </div>
          </div>

          <h2 class="page-title">お届け先情報</h2>
          <div class="order-confirm-delivery-info">
            <div class="row">
              <div class="input-field">
                <input id="name" type="text" />
                <label for="name">お名前</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field">
                <input id="email" type="email" />
                <label for="email">メールアドレス</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field">
                <input id="zipcode" type="text" maxlength="7" />
                <label for="zipcode">郵便番号(ハイフンなし)</label>
                <button class="btn" type="button">
                  <span>住所検索</span>
                </button>
              </div>
            </div>
            <div class="row">
              <div class="input-field">
                <input id="address" type="text" />
                <label for="address">住所</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field">
                <input id="tel" type="tel" />
                <label for="tel">電話番号</label>
              </div>
            </div>
            <div class="row order-confirm-delivery-datetime">
              <div class="input-field">
                <input id="deliveryDate" type="date" />
                <label for="address">配達日時</label>
              </div>
              <label class="order-confirm-delivery-time">
                <input
                  name="deliveryTime"
                  type="radio"
                  value="10時"
                  checked="checked"
                />
                <span>10時</span>
              </label>
              <label class="order-confirm-delivery-time">
                <input name="deliveryTime" type="radio" value="11時" />
                <span>11時</span>
              </label>
              <label class="order-confirm-delivery-time">
                <input name="deliveryTime" type="radio" value="12時" />
                <span>12時</span>
              </label>
              <label class="order-confirm-delivery-time">
                <input name="deliveryTime" type="radio" value="13時" />
                <span>13時</span>
              </label>
              <label class="order-confirm-delivery-time">
                <input name="deliveryTime" type="radio" value="14時" />
                <span>14時</span>
              </label>
              <label class="order-confirm-delivery-time">
                <input name="deliveryTime" type="radio" value="15時" />
                <span>15時</span>
              </label>
              <label class="order-confirm-delivery-time">
                <input name="deliveryTime" type="radio" value="16時" />
                <span>16時</span>
              </label>
              <label class="order-confirm-delivery-time">
                <input name="deliveryTime" type="radio" value="17時" />
                <span>17時</span>
              </label>
              <label class="order-confirm-delivery-time">
                <input name="deliveryTime" type="radio" value="18時" />
                <span>18時</span>
              </label>
            </div>
          </div>

          <h2 class="page-title">お支払い方法</h2>
          <div class="row order-confirm-payment-method">
            <span>
              <label class="order-confirm-payment-method-radio">
                <input
                  name="paymentMethod"
                  type="radio"
                  value="1"
                  checked="checked"
                />
                <span>代金引換</span>
              </label>
              <label class="order-confirm-payment-method-radio">
                <input name="paymentMethod" type="radio" value="2" />
                <span>クレジットカード</span>
              </label>
            </span>
          </div>
          <div class="row order-confirm-btn">
            <button
              class="btn"
              type="button"
              onclick="location.href='order_finished.html'"
            >
              <span>この内容で注文する</span>
            </button>
          </div>
        </div>
        <!-- end container -->
      </div>
      <!-- end top-wrapper -->
      <!-- Compiled and minified JavaScript -->
    </body>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { User } from "@/type/user";
import { OrderItem } from "@/type/orderItem";
import { Order } from "@/type/order";
import axios from "axios";
import { getHours } from "date-fns";
import { getYear } from "date-fns";
import { getMonth } from "date-fns";
import { getDate } from "date-fns";
import { Item } from "@/type/item";
import { Topping } from "@/type/topping2";

@Component
export default class OrderConfirm extends Vue {
  //現在の注文
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

  private item = new OrderItem(
    0,
    0,
    0,
    0,
    "",
    new Item(0, "", "", "", 0, 0, "", true, []),
    []
  );

  //注文者の名前
  private destinationName = "";
  //注文者のメールアドレス
  private destinationEmail = "";
  //注文者の郵便番号
  private destinationZipcode = "";
  //注文者の住所
  private destinationAddress = "";
  //注文者の電話番号
  private destinationTel = "";
  //配達日時
  private deliveryTime = new Date();
  //支払い方法
  private paymentMethod = 0;
  //エラーFrag
  private hasError = false;
  //注文時のエラーメッセージ
  private errorMessage = "";
  //名前入力フォームのエラーメッセージ
  private nameErrorMessage = "";
  //メールアドレス入力フォームのエラーメッセージ
  private emailErrorMessage = "";
  //郵便番号入力フォームのエラーメッセージ
  private zipcodeErrorMessage = "";
  //住所入力フォームのエラーメッセージ
  private addressErrorMessage = "";
  //電話番号入力フォームのエラーメッセージ
  private telErrorMessage = "";
  //配達日時入力フォームのエラーメッセージ
  private delivelyErrorMessage = "";

  /**
   * 注文ボタンが押下されたときのメソッド.
   * @returns プロミスオブジェクト
   */
  async order(): Promise<void> {
    //入力値チェック
    if (this.destinationName === "") {
      this.nameErrorMessage = "名前を入力して下さい";
      this.hasError = true;
    }
    const includeOrNot = (str: string): boolean => {
      return this.destinationEmail.includes(str);
    };
    if (this.destinationEmail === "") {
      this.emailErrorMessage = "メールアドレスを入力してください。";
      this.hasError = true;
    }
    if (includeOrNot("@")) {
      this.emailErrorMessage = "メールアドレスの形式が不正です。";
      this.hasError = true;
    }
    const addressCheck = (): boolean => {
      let hasAddressError = false;
      let targetArray = new Array<string>();
      targetArray = this.destinationZipcode.split("-");
      if (targetArray[0].length != 3) {
        hasAddressError = true;
      } else if (targetArray[1].length != 4) {
        hasAddressError = true;
      }
      return hasAddressError;
    };
    if (addressCheck()) {
      this.hasError = true;
      this.zipcodeErrorMessage = "郵便番号はXXX-XXXXの形式で入力してください";
    }
    if (this.destinationZipcode === "") {
      this.zipcodeErrorMessage = "住所を入力してください。";
    }
    if (this.destinationAddress === "") {
      this.hasError = true;
      this.addressErrorMessage = "住所を入力してください。";
    }
    const telCheck = (): boolean => {
      let hasTelError = false;
      let targetArray = new Array<string>();
      if (includeOrNot("-")) {
        hasTelError = true;
      }
      targetArray = this.destinationTel.split("-");
      if (targetArray[0].length != 4) {
        hasTelError = true;
      } else if (targetArray[1].length != 4) {
        hasTelError = true;
      } else if (targetArray[2].length != 4) {
        hasTelError = true;
      }
      return hasTelError;
    };
    if (telCheck()) {
      this.telErrorMessage = "電話番号はXXXX-XXXX-XXXXの形式で入力してください";
      this.hasError = true;
    }
    if (this.destinationTel === "電話番号を入力してください。") {
      this.telErrorMessage = "電話番号を入力してください。";
      this.hasError = true;
    }
    const hoursCheck = (): boolean => {
      let currentDate = new Date();
      return (
        this.deliveryTime <=
        new Date(
          getYear(currentDate),
          getMonth(currentDate),
          getDate(currentDate),
          getHours(currentDate) + 3
        )
      );
    };
    if (hoursCheck()) {
      this.delivelyErrorMessage = "今から3時間後の日時をご入力ください";
      this.hasError = true;
    }
    if (this.deliveryTime === new Date()) {
      this.delivelyErrorMessage = "配達日時を入力してください。";
    }
    if (this.hasError) {
      return;
    }

    //注文をする機能のメインの処理
    const response = await axios.post(
      "http://153.127.48.168:8080/ecsite-api/order",
      {
        userId: this.currentOrder.user.id,
        status: this.currentOrder.status,
        totalPrice: this.currentOrder.totalPrice,
        destinationName: this.destinationName,
        destinationEmail: this.destinationEmail,
        destinationZipcode: this.destinationZipcode,
        destinationAddress: this.destinationAddress,
        destinationTel: this.destinationTel,
        deliveryTime: this.deliveryTime,
        paymentMethod: this.paymentMethod,
        orderItemList: this.currentOrder.makeOrderFormList,
      }
    );
    console.dir("response:" + JSON.stringify(response));

    if (response.data.status === "success") {
      if (this.paymentMethod === 2) {
        this.$store.commit("changeOrderStatus", {
          status: 2,
        });
      } else {
        this.$store.commit("changeOrderStatus", {
          status: 1,
        });
      }
      this.$store.commit("updateOrder", {
        destinationName: this.destinationName,
        destinationEmail: this.destinationEmail,
        destinationZipcode: this.destinationZipcode,
        destinationAddress: this.destinationAddress,
        destinationTel: this.destinationTel,
      });
      this.$router.push("/orderFinished");
    } else {
      // 失敗ならエラーメッセージを表示する
      this.errorMessage = "注文できませんでした(" + response.data.message + ")";
    }
  }
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

  // gettersで合計金額を取得
  get getCalcTotalPrice(): number {
    return this.$store.getters.calcTotalPrice;
  }

  // gettersで消費税を取得
  get getTax(): number {
    return this.$store.getters.tax;
  }
}
</script>

<style scoped></style>
