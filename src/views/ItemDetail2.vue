<template>
  <div class="container">
    <div class="top-wrapper">
      <h1>商品詳細</h1>
    </div>
    <form id="addSub">
      <div class="itemTitle">
        <span>選択した商品:{{ selectItem.name }} </span>
      </div>
      <div class="row">
        <div class="container">
          <div class="row itemdetail">
            <div class="item-icon"><img v-bind:src="selectItemImage" /></div>
            <div class="item-description">
              <span>
                {{ selectItem.description }}
              </span>
            </div>

            <div class="row item-size" id="findSize">
              商品のサイズ:
              <label class="selectSize">
                <input
                  type="radio"
                  id="priceM"
                  value="priceM"
                  v-model="selectSize"
                  name="selectSize"
                  checked
                />
                <label for="priceL"> M </label>
                {{ selectItem.priceM }}円
              </label>
              <label class="selectSize">
                <input
                  type="radio"
                  id="priceL"
                  value="priceL"
                  v-model="selectSize"
                  name="selectSize"
                />
                <label for="priceL"> L </label>
                {{ selectItem.priceL }}円
              </label>
            </div>
            <form name="toppingAmount">
              <div class="row topping-list">トッピング:M200円L300円</div>
              <div class="row topping-name">
                <div
                  v-for="topping of currentToppingList"
                  v-bind:key="topping.id"
                >
                  <input type="checkbox" id="toppingId" value="toppingId" />
                  <label class="checkbox topping">
                    {{ topping.name }}
                  </label>
                </div>
              </div>
            </form>
            <div class="row item-amount">
              数量:
              <select class="amount" v-model="selectItemAmount">
                <option value="not select">選択してください</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>

          <div class="row subTotalPrice">
            <span>この商品の合計き合計金額: {{ totalSubPrice }}円 </span>
          </div>
        </div>
      </div>

      <button class="btn" type="button" v-on:click="addToCart">
        カートに入れる
      </button>
    </form>
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
  private selectItemImage = "";
  toppingPrice: any;

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
    this.selectItem = this.$store.getters.getItemList(itemId);

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
  }
  /**
   * トッピングを表示する.
   *
   * @returns Promiseオブジェクト
   */
  private currentToppingList = new Array<Topping>();

  async selectTopping(): Promise<void> {
    const response = await axios.get(
      `http://153.127.48.168:8080/ecsite-api/item/toppings/coffee`
    );
    console.dir("response:" + JSON.stringify(response));
    this.currentToppingList = response.data.toppingList;
  }
  /**
   * 選択された商品の小計を求める
   */
  public TotalSubPrice(): number {
    // 選択されたサイズを求める
    if (this.selectSize === this.currentItem.priceM) {
      let finalSize = this.selectItem.priceM;
      let toppingAmount = 0;
      let toppingSubprice = 0;
      let selectItemAmount = 0;
      // サイズMの場合のtopping単価
      this.currentItem.toppingList.push(
        this.$store.getters.getToppingById(Topping)
      );
      this.currentItem.toppingList.length = toppingAmount;
      toppingSubprice = toppingAmount * 200;
      return finalSize + toppingSubprice * selectItemAmount;
    } else {
      this.selectSize === 300;
    }
  }

  // カートリストに遷移
  public addToCart(): void {
    this.currentItem;
  }
}
</script>

<style scoped></style>

function selectSize() { throw new Error("Function not implemented."); } function
selectSize() { throw new Error("Function not implemented."); }
