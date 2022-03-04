<template>
  <div>
    <div class="top-wrapper">
      <div class="container">
        <div class="top-container">
          <div class="catchCopy">
            <h1>DELIVERING THE FEELINGS OF COFFEE TO YOU</h1>
            <p>こだわりのコーヒーとスイーツをおうちで</p>
            <p>
              らくらくcoffeeはあなたのささやかな幸せに寄り添う "最高の一杯"
              をお届けします。
            </p>
            <div class="btn-wrapper">
              <a href="/registerUser" class="btn signup">会員登録</a>
              <p>or</p>
              <a
                target="_blank"
                href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2F192.168.11.12%3A8080%2FitemDetail&amp;src=sdkpreparse"
                class="btn facebook"
                >Facebookで登録</a
              >
              <a
                target="_blank"
                href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                class="btn twitter"
                >Twitterで登録</a
              >
            </div>
          </div>
          <div class="top-img">
            <img src="../../public/img_coffee/top-page.jpg" />
          </div>
        </div>
      </div>
    </div>

    <div class="top-item-wrapper">
      <div class="container">
        <div class="heading">
          <h2>らくらくcoffee、４つの特徴！</h2>
        </div>
        <div class="top-items">
          <div class="top-item">
            <div class="top-item-icon">
              <img src="../../public/img_coffee/point1.jpg" />
            </div>
            <p class="text-contents">
              この場所で生まれる小さな出会いやささやかな会話の一つひとつが、永くつづく時の流れの中に溶け込んでいく。そんな豊かな体験を提供するために、一杯に、一皿に、想いを乗せていきます。
            </p>
          </div>
          <div class="top-item">
            <div class="top-item-icon">
              <img src="../../public/img_coffee/point2.jpg" />
            </div>
            <p class="text-contents">
              エチオピアモカの華やかなアロマとワイニーな口あたりが特徴のコーヒー豆を使用しています。深いボディを感じながら、くつろぎながらゆっくりと、その味わいをお楽しみください。
            </p>
          </div>
          <div class="top-item">
            <div class="top-item-icon">
              <div class="point3">
                <img src="../../public/img_coffee/point3.jpg" />
              </div>
            </div>
            <p class="text-contents">
              コーヒーだけでなく、スイーツも豊富に取り揃えています。お店の人気メニューのドーナツだけでなく、期間限定で登場するふわふわパンケーキや、季節のフルーツを使ったタルトケーキを味わえます。
            </p>
          </div>
          <div class="top-item">
            <div class="top-item-icon">
              <img src="../../public/img_coffee/point4.jpg" />
            </div>
            <p class="text-contents">
              ネットでの注文だけでなくイートインスペースもあります。お店の雰囲気やコーヒーの香りを楽しみながらゆっくりと過ごすのはいかがですか。
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="message-wrapper">
      <div class="container">
        <div class="heading">
          <h2 class="topic">癒しのひと時をあなたに</h2>
          <h3 class="topic">Let's enjoy tea time!</h3>
        </div>
        <a href="/itemList"
          ><span class="btn message">ようこそ、コーヒーの世界へ</span></a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {}
</script>

<style scoped>
@import url("/css/top.css");
</style>
