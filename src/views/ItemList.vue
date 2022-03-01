<template>
  <div class="itemList">
    <div class="item-wrapper">
      <div class="container">
        <div class="search-wrapper">
      <div class="container">
        <form method="post" class="search-form">
          <input type="text" name="name" class="search-name-input" v-model="serchText"/>
          <button class="btn search-btn" type="button" v-on:click="serchResultList">
            <span>検索</span>
          </button>
            <div class="error-message  red-text">{{ errorMesage }}</div>
        </form>
      </div>
    </div>
        <div class="items row">
          <div class="item col s12 m6 l4" v-for="item of orderInexpensiveItemList" v-bind:key="item.id">
            <div class="item-icon">
              <img v-bind:src="item.imagePath" class="responsive-img"/>
            </div>
            <router-link v-bind:to="'/itemDetail/' + item.id">{{ item.name }}</router-link><br />
            <span class="price">M</span>{{ item.priceM }}円(税抜)<br />
            <span class="price">L</span>{{ item.priceL }}円(税抜)<br />
          </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script lang="ts">
import { Item } from "@/type/item";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class ItemList extends Vue {
  //現在の商品リスト
  private currentItemList = new Array<Item>();
  //検索キーワード
  private serchText = "";
  //エラーメッセージ
  private errorMesage = "";
  /**
   * ページ遷移時、現在の商品一覧を取得するメソッド.
   * @returns プロミスオブジェクト
   */
  async created(): Promise<void>{
    await this.$store.dispatch("asyncGetItemList");

    this.currentItemList = this.$store.getters.getItemList
  }
  /**
   * 商品を安い順に並べるメソッド.
   * @returns 商品を並べ替えた後の配列
   */
  get orderInexpensiveItemList(): Array<Item>{
    let copiedArray = this.currentItemList.slice();
    copiedArray.sort(function(a: Item, b: Item){
      if(a.priceM < b.priceM){
        return -1
      } else if(a.priceM > b.priceM) {
        return 1
      } else {
        return 0
      }
    });
    return copiedArray;
  }
  /**
   * 検索結果を表示するメソッド.
   */
  serchResultList(): void{
    this.errorMesage = ""
    this.currentItemList = this.$store.getters.getItemList
    let initArray = this.orderInexpensiveItemList;
    this.currentItemList = new Array<Item>();
      for(let item of initArray){
        if(item.name.includes(this.serchText)){
          this.currentItemList.push(item);
        }
      }
      if(this.currentItemList.length === 0){
        this.errorMesage = "1件もありませんでしたので全件表示します"
        this.currentItemList = this.$store.getters.getItemList
      }
      this.serchText = "";
  }
}
</script>

<style scoped>
@import url("/css/item_list.css");
</style>
