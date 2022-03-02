<template>
  <div>
    <div class="firstError">
      <h1>お探しのページは見つかりませんでした</h1>
    </div>
    <p>お探しのページは</p>
    <div class="secondError">
      <ul>
        <li>すでに削除されている・公開期間が終わっている</li>
        <li>アクセスしたアドレスが異なっている</li>
      </ul>
    </div>
    <p>などの理由で見つかりませんでした。</p>

    <div>
      <p>後者の場合</p>
      <ul>
        <li>本ページにある検索フォームにキーワードを入力して検索する</li>
        <li>
          <a href="http://example.com/">トップページ</a>から改めてリンクをたどる
        </li>
        <li><a href="http://example.com/foo">サイトマップ</a>を参照する</li>
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
.firstError {
  font-size: 50px;
  color: red;
}
.secondError {
  font-size: 50px;
  color: orange;
}
</style>
