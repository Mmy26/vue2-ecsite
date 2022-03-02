<template>
  <div class="itemList">
    <div class="search-wrapper">
      <div class="container">
        <form method="post" class="search-form">
          <label>
            <input
              type="radio"
              name="order"
              value="drink"
              v-model="drinkList"
              v-on:change="switchList"
            />
            <span>Drink</span> </label
          >&nbsp;&nbsp;&nbsp;
          <label>
            <input
              type="radio"
              name="order"
              value="food"
              v-model="foodList"
              v-on:change="switchList"
            />
            <span>Food</span>&nbsp;&nbsp;&nbsp;
          </label>
          <label>
            <input
              type="radio"
              name="order"
              v-on:change="orderInexpensiveItemList()"
            />
            <span>安い順</span>&nbsp;&nbsp;&nbsp;
          </label>
          <label>
            <input
              type="radio"
              name="order"
              v-on:change="orderExpensiveItemList()"
            />
            <span>高い順</span>&nbsp;&nbsp;&nbsp;
          </label>
          <input
            type="text"
            name="name"
            class="search-name-input"
            v-on:change="makeSuggestArray()"
            v-model="serchText"
          />
          <button
            class="btn search-btn"
            type="button"
            v-on:click="serchResultList"
          >
            <span>検 索</span>
          </button>
          <div>
            <ul class="collection">
              <li
                class="collection-item"
                v-for="(name, index) of makeSuggestArray"
                v-bind:key="index"
              >
                {{ name }}
              </li>
            </ul>
          </div>
          <div class="error-message">{{ errorMesage }}</div>
        </form>
      </div>
    </div>

    <!-- item list -->
    <div class="item-wrapper">
      <div class="container">
        <div class="items">
          <div
            class="item"
            v-for="item of currentItemList"
            v-bind:key="item.id"
          >
            <input type="radio" id="" />
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
    <ul class="pagination ">
      <span v-if="currentPageNum === 1">
        <li class="disabled">
          <router-link to="/itemList">
            <i class="material-icons">chevron_left</i>
          </router-link>
        </li>
      </span>
      <span v-if="currentPageNum !== 1">
        <li>
          <router-link
            to="/itemList"
            v-on:click.native="pagingLinkClick(currentPageNum - 1)"
          >
            <i class="material-icons">chevron_left</i>
          </router-link>
        </li>
      </span>
      <span v-for="pageNum of pageNums" v-bind:key="pageNum">
        <li v-if="pageNum === currentPageNum" class="active blue darken-3">
          <router-link
            to="/itemList"
            v-on:click.native="pagingLinkClick(pageNum)"
          >
            {{ pageNum }}
          </router-link>
        </li>
        <li v-if="pageNum !== currentPageNum" class="waves-effect">
          <router-link
            to="/itemList"
            v-on:click.native="pagingLinkClick(pageNum)"
          >
            {{ pageNum }}
          </router-link>
        </li>
      </span>
      <span v-if="currentPageNum === maxPageNum">
        <li class="disabled">
          <router-link to="/itemList">
            <i class="material-icons">chevron_right</i>
          </router-link>
        </li>
      </span>
      <span v-if="currentPageNum !== maxPageNum">
        <li>
          <router-link
            to="/itemList"
            v-on:click.native="pagingLinkClick(currentPageNum + 1)"
          >
            <i class="material-icons">chevron_right</i>
          </router-link>
        </li>
      </span>
    </ul>
    <CompFixedButton />
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
  private drinkList = "";
  //食べ物商品一覧
  private foodList = "";
  //1ページに表示される最大人数
  private readonly MAX_ITEM_COUNT = 6;
  // 画面下に表示されるページ番号
  private pageNums: Array<number> = [];
  // 現在表示されているページ数
  private currentPageNum = 1;
  // 最大のページ数
  private maxPageNum = 0;

  /**
   * ページ遷移時、現在の商品一覧を取得するメソッド.
   * @returns プロミスオブジェクト
   */
  async created(): Promise<void> {
    await this.$store.dispatch("asyncGetItemList");

    this.currentItemList = this.$store.getters.getItemList;

    this.createLinkNumberForPaging();
    this.initialDisplay();
  }
  /**
   * サジェストキーワードの配列を作成する.
   */
  get makeSuggestArray(): Array<string> {
    if (this.serchText === "") {
      return new Array<string>();
    }
    let suggestKeywordArray = new Array<string>();
    let initText = this.serchText;
    let initArray = this.currentItemList;
    for (let item of initArray) {
      if (item.name.includes(initText)) {
        suggestKeywordArray.push(item.name);
      }
    }
    return suggestKeywordArray;
  }

  /**
   * 商品を安い順に並べるメソッド.
   * @returns 商品を並べ替えた後の配列
   */
  orderInexpensiveItemList(): void {
    this.currentItemList = this.$store.getters.getItemList;
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
    this.currentItemList = copiedArray;
  }
  /**
   * 商品を高い順に並べるメソッド.
   * @returns 商品を並べ替えた後の配列
   */
  orderExpensiveItemList(): void {
    this.currentItemList = this.$store.getters.getItemList;
    let copiedArray = this.currentItemList.slice();
    copiedArray.sort(function (a: Item, b: Item) {
      if (a.priceM < b.priceM) {
        return 1;
      } else if (a.priceM > b.priceM) {
        return -1;
      } else {
        return 0;
      }
    });
    // for文でidがはiっているか確認
    this.currentItemList = copiedArray;
  }
  /**
   * 検索結果を表示するメソッド.
   */
  serchResultList(): void {
    if (this.serchText === "") {
      this.errorMesage = "検索キーワードを入力してください。";
      return;
    }
    this.errorMesage = "";
    this.currentItemList = this.$store.getters.getItemList;
    let initArray = this.currentItemList;
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
  /**
   * カテゴリー表示をするメソッド.
   */
  switchList(): void {
    this.errorMesage = "";
    this.currentItemList = this.$store.getters.getItemList;
    let initArray = this.currentItemList;
    this.currentItemList = new Array<Item>();
    const foodOrNot = (item: Item): boolean => {
      return (
        item.name.includes("ドーナッツ") ||
        item.name.includes("クッキー") ||
        item.name.includes("サンド")
      );
    };
    for (let item of initArray) {
      if (this.foodList === "food") {
        if (foodOrNot(item)) {
          this.currentItemList.push(item);
        }
      } else if (this.drinkList === "drink") {
        if (!foodOrNot(item)) {
          this.currentItemList.push(item);
        }
      } else {
        this.currentItemList.push(item);
      }
    }
  }

  /**
   * ページネーション.
   *
   * @param pageNum クリックされたページ番号
   */
  pagingLinkClick(pageNum: number): void {
    this.serchText = "";
    // 現在のページ数をクリックされたページ数に変更
    this.currentPageNum = pageNum;
    if (this.serchText === "") {
      // 検索入力欄に何も書かれていなかった場合、全従業員一覧情報をVuexストアから取得
      this.currentItemList = this.$store.getters.getItemList;
    }
    // 対象ページに出力する従業員一覧を作成する
    this.createItemListForOnePage(pageNum, this.currentItemList);
  }

  /**
   * 下のページング用のリンク数値を作成する.
   *
   */
  private createLinkNumberForPaging(): void {
    this.pageNums = [];
    this.maxPageNum = Math.ceil(
      this.currentItemList.length / this.MAX_ITEM_COUNT
    );
    for (let i = 1; i <= this.maxPageNum; i++) {
      this.pageNums.push(i);
    }
  }
  /*
   * 対象ページに出力する商品一覧を作成する.
   *
   * @param targetPageNum 表示させる対象ページ番号
   * @param targetList 切り出す元の商品一覧
   */
  private createItemListForOnePage(
    targetPageNum: number,
    targetList: Array<Item>
  ): void {
    // 開始位置を計算(1の場合は0、2の場合は10、3の場合は20・・・)
    let starNum = (targetPageNum - 1) * this.MAX_ITEM_COUNT;
    // 終了位置を計算(開始位置からMAX_EMPLOYEE_COUNT個取得)
    let endNum = starNum + this.MAX_ITEM_COUNT;
    console.log("startNum:" + starNum + "/endNum" + endNum);
    // 開始から終了までを切り出して表示用リストに格納
    this.currentItemList = targetList.slice(starNum, endNum);
  }

  /*
   * 初期表示用共通メソッド.
   *
   * @remarks
   * ・初期表示は0からMAX_ITEM_COUNT個表示
   * ・ページ番号を１に初期化
   */
  private initialDisplay(): void {
    this.currentItemList = this.currentItemList.slice(0, this.MAX_ITEM_COUNT);
    this.currentPageNum = 1;
  }
}
</script>

<style scoped>
@import url("/css/item_list.css");
.error-message {
  color: red;
}
.pagination{
  text-align: center;
}
</style>
