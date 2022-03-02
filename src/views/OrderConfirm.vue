<template>
  <div class="order-confirm">
    <CompCreditCardPayment />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CompCreditCardPayment from "@/components/CompCreditCardPayment.vue";
import { User } from "@/type/user";
import { OrderItem } from "@/type/orderItem";
import { Order } from "@/type/order";
import  axios  from "axios";
import { getHours } from "date-fns"
import { getYear } from "date-fns";
import { getMonth } from "date-fns";
import { getDate } from "date-fns";

@Component({
  components: {
    CompCreditCardPayment
  }
})
export default class OrderConfirm extends Vue {
  //現在の注文
  private currentOrder = new Order(0, 0, 0, 0, new Date(), "", "", "", "", "", new Date(), 0, new User(0, "", "", "", "", "", ""), new Array<OrderItem>());
  //注文者の名前
  private destinationName = "";
  //注文者のメールアドレス
  private destinationEmail = "";
  //注文者の郵便番号
  private destinationZipcode = "";
  //注文者の住所
  private destinationAddress = "";
  //注文者の電話番号
  private destinationTel = "";
  //配達日時
  private deliveryTime = new Date();
  //支払い方法
  private paymentMethod = 0;
  //エラーFrag
  private hasError = false;
  //注文時のエラーメッセージ
  private errorMessage = "";
  //名前入力フォームのエラーメッセージ
  private nameErrorMessage = "";
  //メールアドレス入力フォームのエラーメッセージ
  private emailErrorMessage = "";
  //郵便番号入力フォームのエラーメッセージ
  private zipcodeErrorMessage = "";
  //住所入力フォームのエラーメッセージ
  private addressErrorMessage = "";
  //電話番号入力フォームのエラーメッセージ
  private telErrorMessage = "";
  //配達日時入力フォームのエラーメッセージ
  private delivelyErrorMessage = "";
  
  /**
   * 注文ボタンが押下されたときのメソッド.
   * @returns プロミスオブジェクト
   */
  async order(): Promise<void> {
    //入力値チェック
    if( this.destinationName === "" ){
      this.nameErrorMessage = "名前を入力して下さい";
      this.hasError = true;
    }
    const includeOrNot = (str: string):boolean => {
      return this.destinationEmail.includes(str);
    }
    if ( this.destinationEmail === ""){
      this.emailErrorMessage = "メールアドレスを入力してください。"
      this.hasError = true;
    }
    if (includeOrNot("@")) {
      this.emailErrorMessage = "メールアドレスの形式が不正です。"
      this.hasError = true;
    }
    const addressCheck = (): boolean => {
      let hasAddressError = false;
      let targetArray = new Array<string>();
      targetArray = this.destinationZipcode.split("-");
      if (targetArray[0].length != 3){
        hasAddressError = true;
      } else if ( targetArray[1].length != 4 ){
        hasAddressError = true;
      }
      return hasAddressError;
    }
    if( addressCheck() ){
      this.hasError = true;
      this.zipcodeErrorMessage = "郵便番号はXXX-XXXXの形式で入力してください"
    }
    if( this.destinationZipcode === "" ){
        this.zipcodeErrorMessage = "住所を入力してください。"
    }
    if( this.destinationAddress === "" ){
      this.hasError = true;
      this.addressErrorMessage = "住所を入力してください。"
    }
    const telCheck = (): boolean => {
      let hasTelError = false;
      let targetArray = new Array<string>();
      if(includeOrNot("-")){
        hasTelError = true;
      }
      targetArray = this.destinationTel.split("-");
      if (targetArray[0].length != 4){
        hasTelError = true;
      } else if ( targetArray[1].length != 4 ){
        hasTelError = true;
      } else if ( targetArray[2].length != 4 ){
        hasTelError = true;
      }
      return hasTelError;
    }
    if( telCheck() ){
      this.telErrorMessage = "電話番号はXXXX-XXXX-XXXXの形式で入力してください";
      this.hasError = true;
    }
    if( this.destinationTel === "電話番号を入力してください。" ){
      this.telErrorMessage = "電話番号を入力してください。";
      this.hasError = true;
    }
    const hoursCheck = (): boolean => {
      let currentDate = new Date();
      return (
        this.deliveryTime <= new Date( getYear(currentDate), getMonth(currentDate), getDate(currentDate), getHours(currentDate) + 3)
      )
    }
    if(hoursCheck()){
      this.delivelyErrorMessage = "今から3時間後の日時をご入力ください";
      this.hasError = true;
    }
    if( this.deliveryTime === new Date() ){
      this.delivelyErrorMessage = "配達日時を入力してください。"
    }
    if(this.hasError){
      return;
    }

    //注文をする機能のメインの処理
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
