<template>
  <div class="container">
    <div class="top-wrapper">
      <router-link to="/itemList" class="breadcrumb">商品一覧</router-link>
    </div>
    <form>
      <button type="button" v-on:click="addToCart">カートに入れる</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Item } from "@/type/item";
import axios from "axios";

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
    new Topping(0, "", "", 0, 0)
  );

  selectItem!: Item;
  private currentItemImage = "";

  async created(): Promise<void> {
    // 送られてきたリクエストパラメータのidをnumberに変換して取得する
    const itemId = Number(this.$route.params.id);
    // VuexストアのGetter、getItemList()メソッドに先ほど取得したIDを渡し、１件の商品情報を取得し、戻り値をselectItemに代入する
    this.selectItem = this.$store.getters.getItemList(itemId);

    const response = await axios.get(
      "http://153.127.48.168:8080/ecsite-api/item/${itemId}"
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
    // 今取得した商品情報から画像パスを取り出し、imgディレクトリの名前を前に付与(文字列連結)してcurrentEmployeeImage属性に代入する
    this.currentItemImage = `http://153.127.48.168:8080/ecsite-api/item/${this.selectItem.image}`;
  }
}
</script>

<style scoped></style>
