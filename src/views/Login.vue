<template>
  <div id="login">
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
                <button class="btn" type="button" v-on:click="loginUser">
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

  /**
   * ログイン情報をWebAPIに送信する.
   * @returns JSON形式のresponse
   */
  async loginUser(): Promise<void> {
    const response = await axios.post(
      "http://153.127.48.168:8080/ecsite-api/user/login",
      {
        email: this.email,
        password: this.password,
      }
    );
    console.dir("response:" + JSON.stringify(response));
    // ログインが成功したら商品一覧ページに遷移する
    if (response.data.status === "success") {
      this.$router.push("/itemList");
    }
    // ログインに失敗したらエラーメッセージを出す
    if (response.data.status === "error") {
      this.errorMessage = "メールアドレスもしくはパスワードが間違っています";
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
.login-page {
  width: 600px;
}

.login-btn {
  text-align: center;
}
</style>
