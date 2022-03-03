<template>
  <div>
    <div class="firstError">
      <br />
      <br />
      <br />
      <h1>404エラー</h1>
      <h2>お探しのページは見つかりませんでした</h2>
    </div>
    <h4>お探しのページは</h4>
    <div class="secondError">
      <ul>
        <li>すでに削除されている・公開期間が終わっている</li>
        <li>アクセスしたアドレスが異なっている</li>
      </ul>
    </div>
    <h4>などの理由で見つかりませんでした。</h4>
    <div class="bg" />
    <div>
      <p>後者の場合</p>
      <ul>
        <li>本ページにある検索フォームにキーワードを入力して検索する</li>
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
.secondError {
  color: orange;
}
</style>
