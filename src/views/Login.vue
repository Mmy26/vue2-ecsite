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
            <router-link to="/login" class="login"
              ><i class="fas fa-sign-in-alt"></i>ログイン</router-link
            >
            <router-link to="/login" class="login"
              ><i class="fas fa-sign-in-alt"></i>ログアウト</router-link
            >
          </div>
        </div>
      </div>
    </header>
    <div class="top-wrapper">
      <div class="container">
        <div class="row login-page">
          <div class="col s12 z-depth-6 card-panel">
            <div class="error">{{ errorMessage }}</div>
            <form class="login-form">
              <div class="row"></div>
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">mail_outline</i>
                  <input
                    class="validate"
                    id="mailAddress"
                    type="email"
                    v-model="email"
                  />
                  <label
                    for="mailAddress"
                    data-error="wrong"
                    data-success="right"
                    >メールアドレス</label
                  >
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <i class="material-icons prefix">lock_outline</i>
                  <input id="password" type="password" v-model="password" />
                  <label for="password">パスワード</label>
                </div>
              </div>
              <div class="row login-btn">
                <button
                  class="btn"
                  type="button"
                  onclick="location.href='item_list.html'"
                  v-on:click="loginUser"
                >
                  <span>ログイン</span>
                </button>
              </div>
              <div class="row">
                <div class="input-field col s6 m6 l6">
                  <p class="margin medium-small">
                    <router-link to="/registerUser/"
                      >管理者登録はこちら</router-link
                    >
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- end top-wrapper -->
    <footer>
      <div class="container">
        <img src="img/header_logo.png" />
        <p>アロハな気分をあなたにお届け！</p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
@Component
export default class Login extends Vue {
  // エラーメッセージ
  private errorMessage = "";
  // メールアドレス
  private email = "";
  // パスワード
  private password = "";

  async loginUser(): Promise<void> {
    const response = await axios.post(
      "http://153.127.48.168:8080/ecsite-api/user/login",
      {
        email: this.email,
        password: this.password,
      }
    );
    console.dir("response:" + JSON.stringify(response));
    if (response.data.status === "success") {
      this.$router.push("/itemList");
    }

    if (response.data.status === "error") {
      this.errorMessage = "メールアドレスもしくはパスワードが間違っています";
    }
  }
}
</script>

<style scoped></style>
