<template>
  <div class="itemList">
    <div class="item-wrapper">
      <div class="container">
        <div class="items">
          <div class="item">
            <div class="item-icon">
              <img src="" />
            </div>
          <div class="item" v-for="item of orderInexpensiveItemList" v-bind:key="item.id">
            <div class="item-icon">
              <img v-bind:src="item.imagePath" />
            </div>
            <router-link v-bind:to="'http://153.127.48.168:8080/ecsite-api/item/items/coffee' + item.id">{{ item.name }}</router-link><br />
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

  async created(): Promise<void>{
    await this.$store.dispatch("asyncGetItemList");

    this.currentItemList = this.$store.getters.getItemList
  }

  get orderInexpensiveItemList(): Array<Item>{
    let copiedArray = this.$store.getters.getItemList.slice();
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
}
</script>

<style scoped>

</style>
