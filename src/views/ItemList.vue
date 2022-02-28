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
        <div class="items">
          <div class="item">
            <div class="item-icon">
              <img src="" /> 
            </div>
          <div class="item" v-for="item of orderInexpensiveItemList" v-bind:key="item.id">
            <div class="item-icon">
              <img v-bind:src="item.imagePath" />
            </div>
            <router-link v-bind:to="'/itemDetail/' + item.id">{{ item.name }}</router-link><br />
            <span class="price">M</span>{{ item.priceM }}円(税抜)<br />
            <span class="price">L</span>{{ item.priceL }}円(税抜)<br />
          </div>
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
  private currentItemList = new Array<Item>();
  private serchText = "";
  private errorMesage = "";

  async created(): Promise<void>{
    await this.$store.dispatch("asyncGetItemList");

    this.currentItemList = this.$store.getters.getItemList
  }

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

</style>
