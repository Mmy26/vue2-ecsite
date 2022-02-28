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
import { Order } from "@/type/order";
import axios from "axios";
import { OrderItem } from "@/type/orderItem";
import { orderTopping } from "@/type/OrderTopping";
import { Item } from "@/type/item";
import { Topping } from "@/type/topping";
@Component
export default class ItemDetail extends Vue {
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
  private currentItemImage = "";
}
</script>

<style scoped></style>
