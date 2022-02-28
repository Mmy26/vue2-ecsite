<template>
  <div class="itemList">
    <h1>ItemList</h1>
    <router-link :to="'/itemDetail/' + item.id">{{ item.name }}</router-link>
  </div>
</template>

<script lang="ts">
import { Item } from "@/type/item";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class ItemList extends Vue {
  private currentItemList = new Array<Item>();

  async created(): Promise<void> {
    await this.$store.dispatch("asyncGetItemList");

    this.currentItemList = this.$store.getters.getItemList;
    console.log(this.currentItemList);
  }
}
</script>

<style scoped></style>
