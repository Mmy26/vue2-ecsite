 <template>
   <div class="orderHistory">
     <h1>注文履歴</h1>
     <section class="section" id="photos">
      <div class="row">
        <div class="col s12 l6 offset-l1">
          <h4 class="indigo-text text-darken-4">subTitle</h4>
          <p>ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。</p>
        </div>
        <div class="col s12 l4">
          <img src="/img/bread-1284438_1920.jpg" alt="" class="responsive-img materialboxed">
        </div>
      </div> 
    </section>
   </div>
 </template>
 
 <script lang="ts">
 import { Component, Vue } from "vue-property-decorator";
 import axios from "axios";
import { User } from "@/type/user";

 @Component
 export default class OrderHistory extends Vue {
  private currentUser = new User(0, "", "", "", "", "", "");

  //ダミーID 129, 134, 139, 148, 150
  async created(): Promise<void>{
      const response = await axios.get("http://153.127.48.168:8080/ecsite-api/order/orders/coffee/" + 129);
      console.log(response.data);
      for(let order of response.data.orders){
        for(let orderItem of order.orderItemList){
        console.log(orderItem.item)
        }
      }
  }
 }
 </script>
 
 <style scoped>
 
 </style>
