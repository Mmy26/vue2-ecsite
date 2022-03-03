<template>
  <div>
    <header>
      <div class="container">
        <div class="header">
          <div class="header-left">
            <a href="/itemList">
              <img
                class="logo"
                src="img_coffee/header_logo.png"
                v-on:click="toTopPage"
              />
            </a>
          </div>

          <div class="header-right">
            <router-link to="/itemList">商品一覧</router-link>
            <router-link to="/registerUser">会員登録</router-link>
            <router-link to="/cartList"
              ><i class="fas fa-shopping-cart"></i>カート</router-link
            >
            <router-link to="/login" v-if="!isLogin">
              <i class="fas fa-sign-in-alt"></i>ログイン
            </router-link>
            <router-link to="/logout" v-if="isLogin">
              <i class="fas fa-sign-in-alt"></i>ログアウト
            </router-link>
            <router-link to="">注文履歴</router-link>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  // get isLogin(): boolean {
  //   console.log(this.$store.getters.getLoginStatus);
  // toTopPage(): void {
  //   this.$router.push("/itemList");
  // }
}
</script>

<style scoped>
header {
  height: 65px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 10000;
}

.header {
  display: flex;
  justify-content: flex-end;
}

.logo {
  width: 130px;
  margin-top: 15px;
}

.header-right {
  margin-left: auto;
  float: right;
  display: flex;
}

.header-right a {
  line-height: 65px;
  padding: 0 25px;
  color: gray;
  display: block;
  transition: all 0.5s;
}

.fas {
  margin-right: 5px;
}
</style>
