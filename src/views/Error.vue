<template>
  <div class="pageFmt">
    <div class="firstError">
      <br />
      <br />
      <br />
      <h1 class="h1">404エラー</h1>
      <h4>お探しのページは見つかりませんでした</h4>
    </div>
    <h5>
      お探しのページは
      <ul>
        <li>すでに削除されている・公開期間が終わっている</li>
        <li>アクセスしたアドレスが異なっている</li>
      </ul>
      などの理由で見つかりませんでした。
    </h5>

    <div>
      <p>後者の場合</p>
      <ul>
        <li><a href="/itemList">商品一覧</a>から商品を探す</li>
        <li><a href="/registerUser">会員登録</a>から改めてリンクをたどる</li>
      </ul>
      <p>
        といった方法で、ご希望のページが見つかる場合もありますので、どうぞご利用ください。
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {}
</script>

<style scoped>
.bg {
  background-image: url("/img/error404.jpg");
  background-size: cover;
  background-position: center center;
  width: 60%;
}

.firstError {
  color: red;
}

.pageFmt {
  text-align: center;
}

.h1 {
  position: relative;
  padding: 1rem 2rem calc(1rem + 10px);
  background: #fff100;
}

.h1:before {
  position: absolute;
  top: -7px;
  left: -7px;
  width: 100%;
  height: 100%;
  content: "";
  border: 4px solid #000;
}
</style>
