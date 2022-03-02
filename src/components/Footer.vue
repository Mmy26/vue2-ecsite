<template>
  <div>
    <footer>
      <div class="container">
        <img src="img_coffee/header_logo.png" />
        <p>優雅な時間ををあなたにお届け！</p>
      </div>
      <div ref="map" id="map"></div>
    </footer>
  </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
@Component
export default class XXXComponent extends Vue {
  // map = "";

  //mounted(){
    // let timer = setInterval(() => {
    //   if(window.google){
    //     clearInterval(timer);
    //     this.map = new window.google.maps.Map(this.$refs.map,{
    //       center: {lat: -34.397, lng: 150.644},
    //       zoom: 8
    //     })
    //   }
    // }, 500)
    // console.log(this.map);
     /////////////////////////////////////////////
//     var map;
//     var marker;
//     var center = {
//       lat: 35.6898898, // 緯度
//       lng: 139.6985261 // 経度
//     };
//     function initMap() {
//       map = new window.google.maps.Map(document.getElementById('map'), { 
//         center: center, // 地図の中心を指定
//         zoom: 19 // 地図のズームを指定
//     });
//     initMap();
 
//     marker = new window.google.maps.Marker({ // マーカーの追加
//         position: center, // マーカーを立てる位置を指定
//         map: map // マーカーを立てる地図を指定
//     });
// }
  //}
}
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
