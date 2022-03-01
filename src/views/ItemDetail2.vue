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
            <a href="cart_list.html">
              <i class="fas fa-shopping-cart"> </i>カート
            </a>
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
        <h1 class="page-title">
          {{ selectItem.name }}
        </h1>
        <div class="row">
          <div class="row item-detail">
            <div class="item-icon">
              <img v-bind:src="selectItemImage" />
            </div>
            <div class="item-intro">
              {{ selectItem.description }}
            </div>
          </div>
          <div class="row item-size">
            <div class="item-hedding">サイズ</div>
            <div>
              <label>
                <input id="size-m" name="size" type="radio" checked="checked" />
                <span>
                  &nbsp;<span class="price">Ｍ</span
                  >{{ selectItem.priceM }}円(税抜)</span
                >
              </label>
              <label>
                <input id="size-l" name="size" type="radio" />
                <span>
                  &nbsp;<span class="price">Ｌ</span
                  >{{ selectItem.priceL }}円(税抜)</span
                >
              </label>
            </div>
          </div>
          <div class="row item-toppings">
            <div class="item-hedding">
              トッピング：&nbsp;1つにつき
              <span>&nbsp;Ｍ&nbsp;</span>&nbsp;&nbsp;200円(税抜)
              <span>&nbsp;Ｌ</span>&nbsp;&nbsp;300円(税抜)
            </div>

            <div>
              <label class="item-topping">
                <input type="checkbox" />
                <span>ハワイアンソルト</span>
              </label>
              <label class="item-topping">
                <input type="checkbox" />
                <span>ハワイアンマヨネーズ</span>
              </label>
              <label class="item-topping">
                <input type="checkbox" />
                <span>ハワイアントマト</span>
              </label>
              <label class="item-topping">
                <input type="checkbox" />
                <span>ブルーチーズ</span>
              </label>
              <label class="item-topping">
                <input type="checkbox" />
                <span>ハワイアンチョコレート</span>
              </label>
            </div>

            <!-- <label class="item-topping">
              <div v-for="topping of toppings" v-bind:key="topping.id"></div>
              <input type="checkbox" />
              <span>{{ topping.name }}</span>
            </label> -->
          </div>
          <div class="row item-quantity">
            <div class="item-hedding item-hedding-quantity">数量</div>
            <div class="item-quantity-selectbox">
              <div class="input-field col s12">
                <select class="browser-default" v-model="selectItemAmount">
                  <option value="" disabled>選択して下さい</option>
                  <option value="1" selected>1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row item-total-price">
            <span>この商品金額： {{ TotalSubPrice }}円(税抜)</span>
          </div>
          <div class="row item-cart-btn">
            <button
              class="btn"
              type="button"
              onclick="location.href='cart_list.html'"
            >
              <span>カートに入れる</span>
            </button>
          </div>
        </div>
      </div>
      <!-- end container -->
    </div>
    <!-- end top-wrapper -->

    <!-- Compiled and minified JavaScript -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Item } from "@/type/item";
import axios from "axios";
import { Topping } from "@/type/topping2";

@Component
export default class ItemDetail extends Vue {
  // 商品情報を初期化
  private currentItem = new Item(
    0,
    "",
    "",
    "",
    0,
    0,
    "",
    false,
    new Array<Topping>()
  );

  selectItem!: Item;
  selectSize = 0;
  selectItemImage = "";
  finalPrice: any;

  /**
   * webAPIからIDを用いて１件の商品情報を取得する.
   *
   * @remarks -promise
   * ライフサイクルフックのcreatedイベント利用
   */
  async created(): Promise<void> {
    // 送られてきたリクエストパラメータのidをnumberに変換して取得する
    const itemId = this.$route.params.id;
    // getItemList()メソッドに先ほど取得したIDを渡し、１件の商品情報を取得し、戻り値をselectItemに代入する
    this.selectItem = this.$store.getters.getItemId(itemId);
    // 今取得した商品情報から画像パスを取り出し、selectItemImage属性に代入する
    this.selectItemImage = `${this.selectItem.imagePath}`;

    const response = await axios.get(
      `http://153.127.48.168:8080/ecsite-api/item/${itemId}`
    );
    console.dir("response:" + JSON.stringify(response));
    let currentItem = response.data.item;
    this.selectItem = new Item(
      currentItem.id,
      currentItem.type,
      currentItem.name,
      currentItem.discription,
      currentItem.priceM,
      currentItem.priceL,
      currentItem.imagePath,
      currentItem.deleted,
      currentItem.toppingList
    );

    {
      /**
       * トッピングを表示する.
       *
       * @returns Promiseオブジェクト
       */
      const response = await axios.get(
        `http://153.127.48.168:8080/ecsite-api/item/toppings/coffee`
      );
      console.dir("①response:" + JSON.stringify(response));
      this.currentToppingList = response.data.toppingList;
    }
  }

  /**
   * 選択された商品の小計を求める
   * @returns -数量、サイズ、トッピングの合計金額
   */

  private currentToppingList = new Array<Topping>();

  get TotalSubPrice(): number {
    // 選択されたサイズを求める
    let finalPrice = 0;
    let toppingAmount = 0;
    let toppingSubprice = 0;
    let selectItemAmount = 0;
    if (this.selectSize === this.currentItem.priceM) {
      let finalSize = this.selectItem.priceM;

      this.currentItem.toppingList.push(
        this.$store.getters.getToppingById(Topping)
      );
      this.currentItem.toppingList.length = toppingAmount;
      toppingSubprice = toppingAmount * 200;

      finalPrice = finalSize + toppingSubprice * selectItemAmount;
    } else {
      if (this.selectSize === this.currentItem.priceL) {
        let finalSize = this.selectItem.priceL;
        let toppingAmount = 0;
        let toppingSubprice = 0;
        let selectItemAmount = 0;

        this.currentItem.toppingList.push(
          this.$store.getters.getToppingById(Topping)
        );
        this.currentItem.toppingList.length = toppingAmount;
        toppingSubprice = toppingAmount * 300;
        finalPrice = finalSize + toppingSubprice * selectItemAmount;
      }
    }
    return finalPrice;
  }

  /**
   * 非同期で取得したVuexストア内のトッピングを取得し返す.
   *
   * @returns トッピング情報
   */
  get toppings(): Array<Topping> {
    return this.$store.getters.getToppings;
  }
}
</script>

<style scoped></style>
