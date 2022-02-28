<template>
  <div>
    <header>
      <div class="container">
        <div class="header">
          <div class="header-left">
            <a href="top.html">
              <img class="logo" src="img/header_logo.png" />
            </a>
          </div>

          <div class="header-right">
            <a href="item_list.html">商品一覧</a>
            <a href="register_admin.html">会員登録</a>
            <a href="login.html" class="login">
              <i class="fas fa-sign-in-alt"></i>ログイン
            </a>
          </div>
        </div>
      </div>
    </header>
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

@Component
export default class XXXComponent extends Vue {
  private lastName = "";
  private firstName = "";
  private mailAddress = "";
  private zipCode = "";
  private address = "";
  private telephone = "";
  private password = "";
  private passwordConfirmation = "";
  private errorMessage = "";
  private errorLastName = "";
  private errorFirstName = "";
  private errorMailAddress = "";
  private errorZipCode = "";
  private errorAddress = "";
  private errorTelephone = "";
  private errorPassword = "";
  private errorPasswordConfirmation = "";
  private errorChecker = true;

  async registerUser(): Promise<void> {
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
    if (/^[0-9]{3}-[0-9]{4}$/.test(this.zipCode) === false) {
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
    if (/\d{2,4}-\d{2,4}-\d{4}/.test(this.telephone) === false) {
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

  reset(): void {
    this.lastName = "";
    this.firstName = "";
    this.mailAddress = "";
    this.zipCode = "";
    this.address = "";
    this.telephone = "";
    this.password = "";
    this.passwordConfirmation = "";
  }
}
</script>

<style scoped></style>
