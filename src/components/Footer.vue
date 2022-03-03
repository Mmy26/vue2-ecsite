<template>
  <div>
    <footer>
      <div class="container">
        <img
          src="img_coffee/header_logo.png"
          class="footer-logo responsive-img"
        />
        <p>優雅な時間ををあなたにお届け</p>
        <div class="row">
          <div class="col s12 l6">
            <p>電話番号: 000-0000-0000</p>
            <p>住所: 東京都新宿区</p>
            <ul>
              <li class="grey-text">Twitter: @rakuraku-coffee</li>
              <li class="grey-text">Instagram: @rakuraku-coffee</li>
            </ul>
          </div>
          <div class="col s12 l4 offset-l1">
            <h5>Googleマップ</h5>
            <div class="googleMap">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.4999497490426!2d139.7020887508128!3d35.68931288009525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188d9c8bc1bfbb%3A0xcb44f68a614c714a!2z5qCq5byP5Lya56S-44Op44Kv44K544OR44O844OI44OK44O844K6!5e0!3m2!1sja!2sjp!4v1637912752420!5m2!1sja!2sjp"
                class="responsive-img"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
        <div class="footer-copyright grey darken-5">
          <div class="container center-align">&copy; 2022 1月入社Aチーム</div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {}
</script>

<style scoped>
@import url("/css/footer.css");
</style>
