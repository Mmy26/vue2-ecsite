<template>
  <div>
    <footer>
      <div class="container">
        <img src="img_coffee/header_logo.png" />
        <p>優雅な時間ををあなたにお届け！</p>
      </div>
      <div class="container">
        <div class="row">
          <div class="col s12 l6">
            <h5>タイトル</h5>
            <p>ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。</p>
            <p>ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。</p>
          </div>
          <div class="col s12 l4 l4 offset-l2">
            <h5>タイトル</h5>
            <ul>
              <li class="grey-text text-lighten-3">ここにテキストが入ります。</li>
              <li class="grey-text text-lighten-3">ここにテキストが入ります。</li>
              <li class="grey-text text-lighten-3">ここにテキストが入ります。</li>
              <li class="grey-text text-lighten-3">ここにテキストが入ります。</li>
            </ul>
          </div>
        </div>
        <div class="footer-copyright grey darken-4">
          <div class="container center-align">&copy; 2021 ここにテキストが入ります。</div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {}
</script>

<style scoped>
.container {
  max-width: 1170px;
  width: 100%;
  padding: 0 15px;
  margin: 0 auto;
}

footer {
  height: 65px;
  display: flex;
}

p {
  color: gray;
}
</style>
