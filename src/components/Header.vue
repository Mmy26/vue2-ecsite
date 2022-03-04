<template>
  <div>
    <header>
      <div class="container">
        <div class="header">
          <div class="header-left">
            <a href="/">
              <img class="logo" src="img_coffee/header_logo.png" />
            </a>
          </div>

          <div class="header-right">
            <router-link to="/itemList">商品一覧</router-link>
            <router-link to="/registerUser">会員登録</router-link>
            <router-link to="/cartList"
              ><i class="material-icons prefix icon fix">shopping_cart</i
              >カート</router-link
            >
            <router-link to="/login" v-if="!isLogin">
              <i class="material-icons icon">exit_to_app</i>ログイン
            </router-link>
            <router-link to="/logout" v-if="isLogin">
              <i class="material-icons icon">keyboard_return</i>ログアウト
            </router-link>
            <router-link to="/orderHistory">注文履歴</router-link>
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
  get isLogin(): boolean {
    return this.$store.getters.getLoginStatus;
  }
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
  color: #555555;
  display: block;
  transition: all 0.5s;
  position: relative;
  display: inline-block;
  text-decoration: none;
}

.header-right a::after {
  position: absolute;
  bottom: 13px;
  left: 0;
  content: "";
  width: 100%;
  height: 1px;
  background: #555555;
  transform: scale(0, 1);
  transform-origin: left top;
  transition: transform 0.3s;
}
.header-right a:hover::after {
  transform: scale(1, 1);
}

.fas {
  margin-right: 5px;
}

.icon {
  margin-top: 1px;
  margin-right: 4px;
}

.fix{
  margin-top:5px;
}
</style>
