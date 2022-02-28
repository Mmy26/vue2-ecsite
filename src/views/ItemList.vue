<template>
  <div class="itemList">
    <h1>ItemList</h1>
    <span>{{ orderInexpensiveItemList[0] }}</span><br>
    <span>{{ orderInexpensiveItemList[1] }}</span><br>
    <span>{{ orderInexpensiveItemList[2] }}</span><br>
    <span>{{ orderInexpensiveItemList[3] }}</span>
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
    })
    return copiedArray;
  }
}
</script>

<style scoped>

</style>
