<template>
  <div id="login">
    <header>
      <div class="header">
        <div class="header-left">
          <router-link :to="/top/"
            ><img class="headerlogo" src="img/header_logo.png"
          /></router-link>
        </div>
        <div class="header-right">
          <div>
            <router-link to="/itemList/"
              ><span class="category">商品一覧</span></router-link
            >
          </div>
          <div>
            <router-link to="/registerUser/"
              ><span class="category">会員登録</span></router-link
            >
          </div>
          <div>
            <router-link to="/login/" class="login"
              ><span class="category"
                ><i class="fas fa-sign-in-alt"></i>ログイン</span
              ></router-link
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
    <!-- end top-wrapper -->
    <footer>
      <img class="footerlogo" src="img/header_logo.png" />
      <p class="text">アロハな気分をあなたにお届け！</p>
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
#login{
  margin-left: 10px;
  margin-right: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
}

.top-wrapper {
  margin: 50px;
}
.headerlogo {
  height: 30px;
  margin: 10px;
}
.footerlogo {
  height: 20px;
  margin: 10px;
}
.category {
  color: gray;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 0px 35px;
}
.error {
  color: red;
}
.login-page {
  width: 600px;
}

.login-btn {
  text-align: center;
}
.text {
  font-size: 11px;
  color: gainsboro;
}
</style>
