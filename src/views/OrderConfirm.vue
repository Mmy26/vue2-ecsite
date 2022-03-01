<template>
  <div class="order-confirm">
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { User } from "@/type/user";
import { OrderItem } from "@/type/orderItem";
import { Order } from "@/type/order";
import  axios  from "axios";

@Component
export default class OrderConfirm extends Vue {
  private currentOrder = new Order(0, 0, 0, 0, new Date(), "", "", "", "", "", new Date(), 0, new User(0, "", "", "", "", "", ""), new Array<OrderItem>());
  private destinationName = "";
  private destinationEmail = "";
  private destinationZipcode = "";
  private destinationAddress = "";
  private destinationTel = "";
  private deliveryTime = new Date();
  private paymentMethod = 0;
  private errorMessage = "";

  async order(): Promise<void> {
    const response = await axios.post(
      "http://153.127.48.168:8080/ecsite-api/order",
      {
        userId: this.currentOrder.user.id,
        status: this.currentOrder.status,
        totalPrice: this.currentOrder.totalPrice,
        destinationName: this.destinationName,
        destinationEmail: this.destinationEmail,
        destinationZipcode: this.destinationZipcode,
        destinationAddress: this.destinationAddress,
        destinationTel: this.destinationTel,
        deliveryTime: this.deliveryTime,
        paymentMethod: this.paymentMethod,
        orderItemList: this.currentOrder.makeOrderFormList
      }
    );
    console.dir("response:" + JSON.stringify(response));

    if (response.data.status === "success") {
      if( this.paymentMethod === 2 ){
        this.$store.commit("changeOrderStatus", {
        status: 2
      });
      } else {
        this.$store.commit("changeOrderStatus", {
        status: 1
      });
      }
      this.$store.commit("updateOrder", {
        destinationName: this.destinationName,
        destinationEmail: this.destinationEmail,
        destinationZipcode: this.destinationZipcode,
        destinationAddress: this.destinationAddress,
        destinationTel: this.destinationTel
      });
      this.$router.push("/orderFinished");
    } else {
      // 失敗ならエラーメッセージを表示する
      this.errorMessage = "注文できませんでした(" + response.data.message + ")";
    }
  }
}
</script>

<style scoped>

</style>
