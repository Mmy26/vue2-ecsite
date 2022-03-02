<template>
  <div>
    <form>
      <div class="top-wrapper">
        <div class="container">
          <div class="row register-page">
            <div class="error">{{ errorMessage }}</div>
            <div class="row">
              <div class="error">{{ errorLastName }}</div>
              <div class="error">{{ errorFirstName }}</div>
              <div class="input-field col s6">
                <input
                  id="last_name"
                  type="text"
                  class="validate"
                  v-model="lastName"
                  required
                />
                <label for="last_name">姓</label>
              </div>
              <div class="input-field col s6">
                <input
                  id="first_name"
                  type="text"
                  class="validate"
                  v-model="firstName"
                  required
                />
                <label for="first_name">名</label>
              </div>
            </div>
            <div class="row">
              <div class="error">{{ errorMailAddress }}</div>
              <div class="input-field col s12">
                <input
                  id="email"
                  type="email"
                  class="validate"
                  v-model="mailAddress"
                  required
                />
                <label for="email">メールアドレス</label>
              </div>
            </div>
            <div class="error">{{ errorZipCode }}</div>
            <div class="row">
              <div class="input-field col s12">
                <input
                  id="zipcode"
                  type="text"
                  maxlength="8"
                  v-model="zipCode"
                />
                <label for="zipcode">郵便番号</label>
                <button class="btn" type="button" v-on:click="getAddress">
                  <span>住所検索</span>
                </button>
              </div>
            </div>
            <div class="row">
              <div class="error">{{ errorAddress }}</div>
              <div class="input-field col s12">
                <input id="address" type="text" v-model="address" />
                <label for="address">住所</label>
              </div>
            </div>
            <div class="row">
              <div class="error">{{ errorTelephone }}</div>
              <div class="input-field col s12">
                <input id="tel" type="tel" maxlength="14" v-model="telephone" />
                <label for="tel">電話番号</label>
              </div>
            </div>
            <div class="row">
              <div class="error">{{ errorPassword }}</div>
              <div class="input-field col s12">
                <input
                  id="password"
                  type="password"
                  class="validate"
                  minlength="8"
                  v-model="password"
                  required
                />
                <label for="password">パスワード</label>
              </div>
            </div>
            <div class="row">
              <div class="error">{{ errorPasswordConfirmation }}</div>
              <div class="input-field col s12">
                <input
                  id="confirmation_password"
                  type="password"
                  class="validate"
                  minlength="8"
                  v-model="passwordConfirmation"
                  required
                />
                <label for="confirmation_password">確認用パスワード</label>
              </div>
            </div>
            <div class="row register-admin-btn">
              <button class="btn" type="button" v-on:click="registerUser">
                <span>登録<i class="material-icons right">done</i></span>
              </button>
            </div>
            <div><button type="button" v-on:click="reset">クリア</button></div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

/**
 * ユーザー登録をする画面.
 */
@Component
export default class XXXComponent extends Vue {
  // 姓
  private lastName = "";
  // 名
  private firstName = "";
  // メールアドレス
  private mailAddress = "";
  // 郵便番号
  private zipCode = "";
  // 住所
  private address = "";
  // 電話番号
  private telephone = "";
  // パスワード
  private password = "";
  // 確認用パスワード
  private passwordConfirmation = "";
  // エラーメッセージ
  private errorMessage = "";
  // 姓のエラーメッセージ
  private errorLastName = "";
  // 名のエラーメッセージ
  private errorFirstName = "";
  // メールアドレスのエラーメッセージ
  private errorMailAddress = "";
  // 郵便番号のエラーメッセージ
  private errorZipCode = "";
  // 住所のエラーメッセージ
  private errorAddress = "";
  // 電話番号のエラーメッセージ
  private errorTelephone = "";
  // パスワードのエラーメッセージ
  private errorPassword = "";
  // 確認用パスワードのエラーメッセージ
  private errorPasswordConfirmation = "";
  // フォームチェッカー
  private errorChecker = true;

  /**
   * ユーザー情報を登録する.
   *
   * @returns Promiseオブジェクト
   */
  async registerUser(): Promise<void> {
    // 管理者登録処理
    const response = await axios.post(
      `http://153.127.48.168:8080/ecsite-api/user`,
      {
        name: this.lastName + " " + this.firstName,
        email: this.mailAddress,
        password: this.password,
        zipcode: this.zipCode,
        address: this.address,
        telephone: this.telephone,
      }
    );
    console.dir("response" + JSON.stringify(response));

    this.errorMessage = "";
    this.errorLastName = "";
    this.errorFirstName = "";
    this.errorMailAddress = "";
    this.errorZipCode = "";
    this.errorAddress = "";
    this.errorTelephone = "";
    this.errorPassword = "";
    this.errorPasswordConfirmation = "";

    if (this.lastName === "") {
      this.errorLastName = "姓が入力されていません";
      this.errorChecker = false;
    }
    if (this.firstName === "") {
      this.errorFirstName = "名が入力されていません";
      this.errorChecker = false;
    }
    if (this.mailAddress === "") {
      this.errorMailAddress = "メールアドレスが入力されていません";
      this.errorChecker = false;
    }
    if (!this.mailAddress.indexOf("@")) {
      this.errorMailAddress = "メールアドレスの形式が不正です";
      this.errorChecker = false;
    }
    if (this.zipCode === "") {
      this.errorZipCode = "郵便番号が入力されていません";
      this.errorChecker = false;
    }
    if (
      this.zipCode != "" &&
      /^[0-9]{3}-[0-9]{4}$/.test(this.zipCode) === false
    ) {
      this.errorZipCode = "郵便番号はXXX-XXXXの形式で入力してください";
      this.errorChecker = false;
    }
    if (this.address === "") {
      this.errorAddress = "住所が入力されていません";
      this.errorChecker = false;
    }
    if (this.telephone === "") {
      this.errorTelephone = "電話番号が入力されていません";
      this.errorChecker = false;
    }
    if (
      this.telephone != "" &&
      /\d{2,4}-\d{2,4}-\d{4}/.test(this.telephone) === false
    ) {
      this.errorTelephone = "電話番号はXXXX-XXXX-XXXXの形式で入力してください";
      this.errorChecker = false;
    }
    if (this.password === "") {
      this.errorPassword = "パスワードが入力されていません";
      this.errorChecker = false;
    }
    if (this.password.length < 8 || 16 < this.password.length) {
      this.errorPassword =
        "パスワードは８文字以上１６文字以内で設定してください";
      this.errorChecker = false;
    }
    if (this.passwordConfirmation === "") {
      this.errorPasswordConfirmation = "確認用パスワードが入力されていません";
      this.errorChecker = false;
    }
    if (this.password != this.passwordConfirmation) {
      this.errorPassword = "パスワードと確認用パスワードが不一致です";
    }

    if (this.errorChecker === false) {
      return;
    }

    if (response.data.status === "success") {
      this.$router.push("login");
    } else if (
      response.data.message.includes(
        "そのメールアドレスはすでに使われています。"
      )
    ) {
      this.errorMailAddress = "そのメールアドレスはすでに使われています";
    } else {
      this.errorMessage = "登録できませんでした";
    }
  }

  /**
   * 住所情報をAPIから取得する.
   *
   * @returns Promiseオブジェクト
   */
  async getAddress(): Promise<void> {
    require("axios");

    const response = await axios.get("https://zipcoda.net/api", {
      adapter: require("axios-jsonp"),
      params: {
        zipcode: this.zipCode.replace("-", ""),
      },
    });

    this.address = response.data.items[0].address;
  }

  /**
   * フォームに入力された内容をリセットする.
   */
  reset(): void {
    this.lastName = "";
    this.firstName = "";
    this.mailAddress = "";
    this.zipCode = "";
    this.address = "";
    this.telephone = "";
    this.password = "";
    this.passwordConfirmation = "";
    this.errorMessage = "";
    this.errorLastName = "";
    this.errorFirstName = "";
    this.errorMailAddress = "";
    this.errorZipCode = "";
    this.errorAddress = "";
    this.errorTelephone = "";
    this.errorPassword = "";
    this.errorPasswordConfirmation = "";
  }
}
</script>

<style scoped></style>
