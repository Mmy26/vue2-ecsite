<template>
  <div class="itemList">
    <h1>ItemList</h1>
    <div class="item-wrapper">
      <div class="container">
        <div class="search-wrapper">
          <div class="container">
            <form method="post" class="search-form">
              <label>
                <input type="checkbox" />
                <span>Drink</span> </label
              >&nbsp;&nbsp;&nbsp;
              <label>
                <input type="checkbox" />
                <span>Food</span>
              </label>
              <input
                type="text"
                name="name"
                class="search-name-input tooltipped"
                data-position="right"
                data-tooltip="お腹空いた？？"
                v-model="serchText"
              />
              <button
                class="btn search-btn"
                type="button"
                v-on:click="serchResultList"
              >
                <span>検索</span>
              </button>
              <div class="error-message red-text">{{ errorMesage }}</div>
            </form>
          </div>
          <CompFixedButton />
        </div>
        <div class="items">
          <div
            class="item"
            v-for="item of orderInexpensiveItemList"
            v-bind:key="item.id"
          >
            <div class="item-icon">
              <router-link v-bind:to="'/itemDetail/' + item.id">
                <img v-bind:src="item.imagePath" />
              </router-link>
            </div>
            <div class="item-name">
              <router-link v-bind:to="'/itemDetail/' + item.id">{{
                item.name
              }}</router-link
              ><br />
            </div>
          </div>
          <span class="price">M</span>{{ item.priceM }}円(税抜)<br />
          <span class="price">L</span>{{ item.priceL }}円(税抜)<br />
          <div class="container">
            <form method="post" class="search-form">
              <label>
                <input
                  type="checkbox"
                  v-model="drinkList"
                  v-on:change="switchList"
                />
                <span>Drink</span> </label
              >&nbsp;&nbsp;&nbsp;
              <label>
                <input
                  type="checkbox"
                  v-model="foodList"
                  v-on:change="switchList"
                />
                <span>Food</span>
              </label>
              <input
                type="text"
                name="name"
                class="search-name-input tooltipped"
                data-position="right"
                data-tooltip="お腹空いた？？"
                v-model="serchText"
              />
              <button
                class="btn search-btn"
                type="button"
                v-on:click="serchResultList"
              >
                <span>検索</span>
              </button>
              <div class="error-message red-text">{{ errorMesage }}</div>
            </form>
          </div>
          <CompFixedButton />
        </div>
        <div class="items">
          <div
            class="item"
            v-for="item of orderInexpensiveItemList"
            v-bind:key="item.id"
          >
            <div class="item-icon">
              <img v-bind:src="item.imagePath" />
            </div>
            <router-link v-bind:to="'/itemDetail/' + item.id">{{
              item.name
            }}</router-link
            ><br />
            <span class="price">M</span>{{ item.priceM }}円(税抜)<br />
            <span class="price">L</span>{{ item.priceL }}円(税抜)<br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Item } from "@/type/item";
import { Component, Vue } from "vue-property-decorator";
import CompFixedButton from "@/components/CompFixedButton.vue";
@Component({
  components: {
    CompFixedButton,
  },
})
export default class ItemList extends Vue {
  //検索キーワード
  private serchText = "";
  //エラーメッセージ
  private errorMesage = "";
  //現在の商品リスト
  private currentItemList = new Array<Item>();
  //飲み物商品一覧
  private drinkList = false;
  //食べ物商品一覧
  private foodList = false;

  /**
   * ページ遷移時、現在の商品一覧を取得するメソッド.
   * @returns プロミスオブジェクト
   */
  async created(): Promise<void> {
    await this.$store.dispatch("asyncGetItemList");

    this.currentItemList = this.$store.getters.getItemList;
  }

  /**
   * 商品を安い順に並べるメソッド.
   * @returns 商品を並べ替えた後の配列
   */
  get orderInexpensiveItemList(): Array<Item> {
    let copiedArray = this.currentItemList.slice();
    copiedArray.sort(function (a: Item, b: Item) {
      if (a.priceM < b.priceM) {
        return -1;
      } else if (a.priceM > b.priceM) {
        return 1;
      } else {
        return 0;
      }
    });
    // for文でidがはiっているか確認
    return copiedArray;
  }
  /**
   * 検索結果を表示するメソッド.
   */
  serchResultList(): void {
    console.log(this.drinkList);
    this.errorMesage = "";
    this.currentItemList = this.$store.getters.getItemList;
    let initArray = this.orderInexpensiveItemList;
    this.currentItemList = new Array<Item>();
    for (let item of initArray) {
      if (item.name.includes(this.serchText)) {
        this.currentItemList.push(item);
      }
    }
    if (this.currentItemList.length === 0) {
      this.errorMesage = "1件もありませんでしたので全件表示します";
      this.currentItemList = this.$store.getters.getItemList;
    }
    this.serchText = "";
  }
  switchList(): void {
    this.errorMesage = "";
    this.currentItemList = this.$store.getters.getItemList;
    let initArray = this.orderInexpensiveItemList;
    this.currentItemList = new Array<Item>();
    const foodOrNot = (item: Item): boolean => {
      return (
        item.name.includes("ドーナッツ") ||
        item.name.includes("クッキー") ||
        item.name.includes("サンド")
      );
    };
    for (let item of initArray) {
      if (this.foodList) {
        if (foodOrNot(item)) {
          this.currentItemList.push(item);
        }
      } else if (this.drinkList) {
        if (!foodOrNot(item)) {
          this.currentItemList.push(item);
        }
      } else {
        this.currentItemList.push(item);
      }
    }
    // if (this.currentItemList.length === 0) {
    //   this.errorMesage = "1件もありませんでしたので全件表示します";
    //   this.currentItemList = this.$store.getters.getItemList;
    // }
    // this.serchText = "";
  }
}
</script>

<style scoped>
@import url("/css/item_list.css");
.item-icon img:hover {
  opacity: 0.5;
  transition: 0.3s;
}

.item-name:hover {
  opacity: 0.7;
  transition: 0.3s;
}
</style>
