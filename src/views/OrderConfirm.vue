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
            <div>消費税：{{ this.currentOrder.tax.toLocaleString() }} 円</div>
            <div>
              ご注文金額合計：{{
                this.currentOrder.calcTotalPrice.toLocaleString()
              }}
              円 (税込)
            </div>
          </div>

          <h2 class="page-title">お届け先情報</h2>
          <div class="order-confirm-delivery-info">
            <div class="row">
              <div class="input-field">
                <input id="name" type="text" v-model="destinationName" />
                <label for="name">お名前</label>
              </div>
              <div class="error-message">{{ nameErrorMessage }}</div>
            </div>
            <div class="row">
              <div class="input-field">
                <input id="email" type="email" v-model="destinationEmail" />
                <label for="email">メールアドレス</label>
              </div>
              <div class="error-message">{{ emailErrorMessage }}</div>
            </div>
            <div class="row">
              <div class="input-field">
                <input
                  id="zipcode"
                  type="text"
                  maxlength="8"
                  v-model="destinationZipcode"
                />
                <label for="zipcode">郵便番号</label>
                <button class="btn" type="button" v-on:click="getAddress">
                  <span>住所検索</span>
                </button>
              </div>
              <div class="error-message">{{ zipcodeErrorMessage }}</div>
            </div>
            <div class="row">
              <div class="input-field">
                <input id="address" type="text" v-model="destinationAddress" />
                <label for="address">住所</label>
              </div>
              <div class="error-message">{{ addressErrorMessage }}</div>
            </div>
            <div class="row">
              <div class="input-field">
                <input id="tel" type="tel" v-model="destinationTel" />
                <label for="tel">電話番号</label>
              </div>
              <div class="error-message">{{ telErrorMessage }}</div>
            </div>
            <div class="row order-confirm-delivery-datetime">
              <div class="input-field">
                <input id="deliveryDate" type="date" v-model="deliveryDate"/>
                <label for="address">配達日時</label>
              </div>
              <label class="order-confirm-delivery-time">
                <input
                  name="deliveryDate"
                  type="radio"
                  value="10"
                  v-model.number="deliveryTime"
                />
                <span>10時</span>
              </label>
              <label class="order-confirm-delivery-time">
                <input
                  name="deliveryTime"
                  type="radio"
                  value="11"
                  v-model.number="deliveryTime"
                />
                <span>11時</span>
              </label>
              <label class="order-confirm-delivery-time">
                <input
                  name="deliveryTime"
                  type="radio"
                  value="12"
                  v-model.number="deliveryTime"
                />
                <span>12時</span>
              </label>
              <label class="order-confirm-delivery-time">
                <input
                  name="deliveryTime"
                  type="radio"
                  value="13"
                  v-model.number="deliveryTime"
                />
                <span>13時</span>
              </label>
              <label class="order-confirm-delivery-time">
                <input
                  name="deliveryTime"
                  type="radio"
                  value="14"
                  v-model.number="deliveryTime"
                />
                <span>14時</span>
              </label>
              <label class="order-confirm-delivery-time">
                <input
                  name="deliveryTime"
                  type="radio"
                  value="15"
                  v-model.number="deliveryTime"
                />
                <span>15時</span>
              </label>
              <label class="order-confirm-delivery-time">
                <input
                  name="deliveryTime"
                  type="radio"
                  value="16"
                  v-model.number="deliveryTime"
                />
                <span>16時</span>
              </label>
              <label class="order-confirm-delivery-time">
                <input
                  name="deliveryTime"
                  type="radio"
                  value="17"
                  v-model.number="deliveryTime"
                />
                <span>17時</span>
              </label>
              <label class="order-confirm-delivery-time">
                <input
                  name="deliveryTime"
                  type="radio"
                  value="18"
                  v-model.number="deliveryTime"
                />
                <span>18時</span>
              </label>
            </div>
            <div class="error-message">{{ delivelyErrorMessage }}</div>
          </div>

          <h2 class="page-title">お支払い方法</h2>
          <div class="row order-confirm-payment-method">
            <span>
              <label class="order-confirm-payment-method-radio">
                <input
                  name="paymentMethod"
                  type="radio"
                  v-bind:value="1"
                  v-model.number="paymentMethod"
                  v-on:change="changeFrag"
                />
                <span>代金引換</span>
              </label>
              <label class="order-confirm-payment-method-radio">
                <input
                  name="paymentMethod"
                  type="radio"
                  v-bind:value="2"
                  v-model.number="paymentMethod"
                  v-on:change="changeFrag"
                />
                <span>クレジットカード</span>
              </label>
            </span>
          </div>
          <div class="credit-card-field" v-show="canShow">
            <CompCreditCardPayment />
          </div>
          <div class="row order-confirm-btn">
            <button class="btn" type="button" v-on:click="order">
              <span>この内容で注文する</span>
            </button>
            <dir class="error-message">{{ errorMessage }}</dir>
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
import CompCreditCardPayment from "@/components/CompCreditCardPayment.vue";
import { User } from "@/types/user";
import { OrderItem } from "@/types/orderItem";
import { Order } from "@/types/order";
import axios from "axios";
import { getHours } from "date-fns";
import { getYear } from "date-fns";
import { getMonth } from "date-fns";
import { getDate } from "date-fns";
import { format } from "date-fns";
import { Item } from "@/types/item";

@Component({
  components: {
    CompCreditCardPayment,
  },
})
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
  //ログインしているユーザー情報
  private currentUser = new User(0, "", "", "", "", "", "");
  //注文者の名前
  private destinationName = this.currentUser.name;
  //注文者のメールアドレス
  private destinationEmail = this.currentUser.email;
  //注文者の郵便番号
  private destinationZipcode = this.currentUser.zipcode;
  //注文者の住所
  private destinationAddress = this.currentUser.address;
  //注文者の電話番号
  private destinationTel = this.currentUser.telephone;
  //配達日時
  private deliveryDate = ""
  //配達時間
  private deliveryTime = 10;
  //支払い方法
  private paymentMethod = 1;
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
  //クレジットカード入力フォームのFrag
  private canShow = false;

  /**
   * ショッピングカート一覧を表示させる.
   */
  created(): void {
    this.currentOrder = this.$store.getters.getOrder;
    this.currentUser = this.$store.getters.getCurrentUser;
  }
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
    if (!includeOrNot("@")) {
      this.emailErrorMessage = "メールアドレスの形式が不正です。";
      this.hasError = true;
    }
    // const addressCheck = (): boolean => {
    //   let hasAddressError = false;
    //   let targetArray = new Array<string>();
    //   targetArray = this.destinationZipcode.split("-");
    //   console.log(targetArray);
    //   if (targetArray[0].length != 3) {
    //     hasAddressError = true;
    //   } else if (targetArray[1].length != 4) {
    //     hasAddressError = true;
    //   }
    //   return hasAddressError;
    // };
    // if (addressCheck()) {
    //   this.hasError = true;
    //   this.zipcodeErrorMessage = "郵便番号はXXX-XXXXの形式で入力してください";
    // }
    if (this.destinationZipcode === "") {
      this.zipcodeErrorMessage = "郵便番号を入力してください。";
    }
    if (this.destinationAddress === "") {
      this.hasError = true;
      this.addressErrorMessage = "住所を入力してください。";
    }
    // const telCheck = (): boolean => {
    //   let hasTelError = false;
    //   let targetArray = new Array<string>();
    //   if (includeOrNot("-")) {
    //     hasTelError = true;
    //   }
    //   targetArray = this.destinationTel.split("-");
    //   if (targetArray[0].length != 4) {
    //     hasTelError = true;
    //   } else if (targetArray[1].length != 4) {
    //     hasTelError = true;
    //   } else if (targetArray[2].length != 4) {
    //     hasTelError = true;
    //   }
    //   return hasTelError;
    // };
    // if (telCheck()) {
    //   this.telErrorMessage = "電話番号はXXXX-XXXX-XXXXの形式で入力してください";
    //   this.hasError = true;
    // }
    if (this.destinationTel === "") {
      this.telErrorMessage = "電話番号を入力してください。";
      this.hasError = true;
    }
    // const hoursCheck = (): boolean => {
    //   let currentDate = new Date();
    //   console.log(this.deliveryDate);
    //   console.log(new Date(
    //       getYear(currentDate),
    //       getMonth(currentDate),
    //       getDate(currentDate),
    //       getHours(currentDate) + 3
    //     ));
    //   return (
    //     this.deliveryDate <=
    //     new Date(
    //       getYear(currentDate),
    //       getMonth(currentDate),
    //       getDate(currentDate),
    //       getHours(currentDate) + 3
    //     )
    //   );
    // };
    // if (hoursCheck()) {
    //   this.delivelyErrorMessage = "今から3時間後の日時をご入力ください";
    //   this.hasError = true;
    // }
    if (this.deliveryDate === "" ) {
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
        destinationZipcode: this.destinationZipcode.replace("-", ""),
        destinationAddress: this.destinationAddress,
        destinationTel: this.destinationTel,
        deliveryTime:  this.deliveryDate.replaceAll("-", "/") + " " + this.deliveryTime +format(new Date(), ":mm:ss"),
        paymentMethod: this.paymentMethod,
        orderItemFormList: this.currentOrder.makeOrderFormList,
      }
    );
    console.log(this.deliveryDate.replace("-", "/") + this.deliveryTime +format(new Date(), ":mm:ss"))
    if (response.data.status === "success") {
      this.$store.commit("updateCurrentUser", {
        name: this.destinationName,
        email: this.destinationEmail,
        zipcode: this.destinationZipcode,
        address: this.destinationAddress,
        telephone: this.destinationTel,
      });
      this.$store.commit("initializeOrder");
      this.$router.push("/orderFinished");
    } else {
      // 失敗ならエラーメッセージを表示する
      this.errorMessage = "注文できませんでした(" + response.data.message + ")";
    }
  }

  // gettersで合計金額を取得
  get getCalcTotalPrice(): number {
    return this.$store.getters.calcTotalPrice;
  }

  // gettersで消費税を取得
  get getTax(): number {
    return this.$store.getters.tax;
  }

  /**
   * 住所情報をAPIから取得する.
   *
   * @returns Promiseオブジェクト
   */
  async getAddress(): Promise<void> {
    require("axios");

    const response = await axios.get("https://zipcoda.net/api", {
      adapter: require("axios-jsonp"),
      params: {
        zipcode: this.destinationZipcode.replace("-", ""),
      },
    });
    this.destinationAddress = response.data.items[0].address;
  }

  /**
   * canShowフラグを切り替える.
   */
  changeFrag(): void {
    this.canShow = !this.canShow;
  }
}
</script>

<style scoped>
.error-message {
  color: red;
}
.credit-card-field {
  text-align: center;
  justify-content: center;
  display: flex;
  margin: 30px auto;
}
</style>
