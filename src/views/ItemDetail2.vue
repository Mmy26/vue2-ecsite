<template>
  <div>
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
              {{ selectItem.discription }}
            </div>
          </div>

          <div class="row item-size">
            <div class="item-hedding">サイズ</div>
            <div>
              <label>
                <input
                  id="size-m"
                  name="sizeM"
                  type="radio"
                  value="M"
                  v-model="selectSize"
                  v-on:change="calcSubTotalPrice"
                />
                <span>
                  &nbsp;<span class="price">Ｍ</span
                  >{{ selectItem.priceM }}円(税抜)</span
                >
              </label>
              <label>
                <input
                  id="size-l"
                  name="sizeL"
                  value="L"
                  v-model="selectSize"
                  v-on:change="calcSubTotalPrice"
                  type="radio"
                />
                <span>
                  &nbsp;<span class="price">Ｌ</span
                  >{{ selectItem.priceL }}円(税抜)</span
                >
              </label>
            </div>
          </div>

          <label>
            <div class="row item-toppings">
              <div class="item-hedding">
                トッピング：&nbsp;1つにつき
                <span>&nbsp;Ｍ&nbsp;</span>&nbsp;&nbsp;200円(税抜)
                <span>&nbsp;Ｌ</span>&nbsp;&nbsp;300円(税抜)
              </div>
              <span
                v-for="topping of selectItem.toppingList"
                v-bind:key="topping.id"
              >
                <label class="item-topping">
                  <input
                    type="checkbox"
                    v-bind:value="topping.id"
                    v-model="selectTopping"
                    v-on:change="calcSubTotalPrice"
                  />
                  <span>{{ topping.name }}</span>
                </label>
              </span>
            </div>
          </label>

          <div class="row item-quantity">
            <div class="item-hedding item-hedding-quantity">数量</div>
            <div class="item-quantity-selectbox">
              <div class="input-field col s12">
                <select
                  class="browser-default"
                  v-on:change="calcSubTotalPrice"
                  v-model="selectItemQuantity"
                >
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
            <span>この商品金額： {{ subTotalPrice }}円(税抜)</span>
          </div>
          <div class="row item-cart-btn">
            <button class="btn" type="button" v-on:click="addToCart">
              <span>カートに入れる</span>
            </button>
          </div>
        </div>
      </div>

      <!-- end container -->
    </div>
  </div>
  <!-- end top-wrapper -->
  <!-- Compiled and minified JavaScript -->
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

  // 選択された商品
  // selectItem!: Item;
  private selectItem = new Item(
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
  // 選択された商品のサイズ
  private selectSize = "M";
  // 選択されたトッピング
  private selectTopping = [];
  // 選択された商品のオーダー数量
  private selectItemQuantity = 1;
  // 画像パス
  private selectItemImage = "";
  // トッピングリスト
  private currentToppingList = new Array<Topping>();

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
    // this.selectItem = this.$store.getters.getItemId(itemId);
    // 今取得した商品情報から画像パスを取り出し、selectItemImage属性に代入する

    const response = await axios.get(
      `http://153.127.48.168:8080/ecsite-api/item/${itemId}`
    );
    console.dir("response:" + JSON.stringify(response));
    let currentItem = response.data.item;
    this.selectItem = new Item(
      currentItem.id,
      currentItem.type,
      currentItem.name,
      currentItem.description,
      currentItem.priceM,
      currentItem.priceL,
      currentItem.imagePath,
      currentItem.deleted,
      currentItem.toppingList
    );
    console.dir("①response:" + JSON.stringify(this.selectItem));
    console.log(this.selectItem);

    const responseTopping = await axios.get(
      `http://153.127.48.168:8080/ecsite-api/item/toppings/coffee`
    );

    const displayToppingList = new Array<Topping>();

    for (const topping of responseTopping.data.toppings) {
      displayToppingList.push(
        new Topping(
          topping.id,
          topping.type,
          topping.name,
          topping.priceM,
          topping.priceL
        )
      );
      this.selectItem.toppingList = displayToppingList;
    }

    this.selectItemImage = `${this.selectItem.imagePath}`;
  }

  /**
   * 選択された商品の小計を求める
   * @returns -数量、サイズ、トッピングの合計金額
   */

  private subTotalPrice = 0;
  calcSubTotalPrice(): number {
    if (this.selectSize === "M") {
      let sizePrice = 0;
      sizePrice = this.selectItem.priceM;
      if (this.selectTopping.length === 0) {
        this.subTotalPrice = sizePrice * this.selectItemQuantity;
      } else if (this.selectTopping.length >= 1) {
        let toppingAmount = 0;
        toppingAmount = this.selectTopping.length * 200;
        this.subTotalPrice =
          (sizePrice + toppingAmount) * this.selectItemQuantity;
      }
    } else if (this.selectSize === "L") {
      let sizePrice = 0;
      sizePrice = this.selectItem.priceL;
      if (this.selectTopping.length === 0) {
        this.subTotalPrice = sizePrice * this.selectItemQuantity;
      } else if (this.selectTopping.length >= 1) {
        let toppingAmount = 0;
        toppingAmount = this.selectTopping.length * 300;
        this.subTotalPrice =
          (sizePrice + toppingAmount) * this.selectItemQuantity;
      }
    }
    return this.subTotalPrice;
  }

  /**
   * カートに入れる.
   */
  addToCart(): void {
    //注文確認画面に遷移する
    this.$router.push("/cartList");
  }
}
</script>

<style scoped>
.item-toppings {
  display: inline-block;
}
</style>
