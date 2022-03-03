import Vue from "vue";
import Vuex from "vuex";
import { Item } from "@/type/item";
import { Order } from "@/type/order";
import { User } from "@/type/user";
import { OrderItem } from "@/type/orderItem";

import axios from "axios";
import { Topping } from "@/type/topping2";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // ログインしているかどうか
    isLogin: false,
    order: new Order(
      0,
      0,
      0,
      0,
      new Date(),
      "",
      "",
      "",
      "",
      "",
      new Date(),
      0,
      new User(0, "", "", "", "", "", ""),

      [
        new OrderItem(
          21,
          1,
          1,
          1,
          "M",
          new Item(
            21,
            "coffee",
            "Gorgeous4サンド",
            "",
            480,
            700,
            "/img_coffee/1.jpg",
            false,
            [
              new Topping(-1, "coffee", "ピクルス", 200, 300),
              new Topping(-1, "coffee", "チーズ", 200, 300),
            ]
          ),
          []
        ),
        new OrderItem(
          21,
          1,
          1,
          2,
          "L",
          new Item(
            21,
            "coffee",
            "コーヒー",
            "",
            480,
            700,
            "/img_coffee/1.jpg",
            false,
            [
              new Topping(-1, "coffee", "ピクルス", 200, 300),
              new Topping(-1, "coffee", "チーズ", 200, 300),
            ]
          ),
          []
        ),
      ]
    ),

    itemList: new Array<Item>(),
    toppings: new Array<Topping>(),
  },
  actions: {
    /**
     * 商品リストを非同期通信で取得するメソッド.
     * @param context - コンテクスト
     */
    async asyncGetItemList(context) {
      const response = await axios.get(
        "http://153.127.48.168:8080/ecsite-api/item/items/coffee"
      );
      const payload = response.data;
      context.commit("showItemList", payload);
    },
  },
  mutations: {
    /**
     * ログインする.
     * @param state - ステート
     */
    logined(state) {
      state.isLogin = true;
    },
    /**
     * ログアウトする.
     * @param state - ステート
     */
    logouted(state) {
      state.isLogin = false;
    },
    /**
     * 商品リストを作成し、stateにセットするメソッド.
     * @param state - ステイト
     * @param payload - 商品一覧情報のペイロード
     */
    showItemList(state, payload) {
      state.itemList = new Array<Item>();
      for (const item of payload.items) {
        state.itemList.push(
          new Item(
            item.id,
            item.type,
            item.name,
            item.description,
            item.priceM,
            item.priceL,
            item.imagePath,
            item.deleted,
            item.toppingList
          )
        );
      }
    },

    // changeOrderStatus(state, payload) {
    //   // const statusList = {
    //   //   targetKey: payload.key,
    //   //   targetValue: payload.value
    //   // }
    //   // state.order.statusList.targetKey = statusList.targetValue;
    //   state.order.status = payload.status;
    // },
    // updateOrder(state, payload) {
    //   state.order.destinationName = payload.destinationName;
    //   state.order.destinationEmail = payload.destinationEmail;
    //   state.order.destinationZipcode = payload.destinationZipcode;
    //   state.order.destinationAddress = payload.destinationAddress;
    //   state.order.destinationTel = payload.destinationTel;
    // },

    /**
     * 商品を削除する.
     *
     * @param state - ステート
     * @param payload - 削除する商品
     */

    removeItem(state, payload) {
      state.order.orderItemList.splice(payload.itemIndex, 1);
    },
  },

  modules: {},
  getters: {
    /**
     * ログイン状態を返す.
     *
     * @param state ステート
     * @returns ture:ログイン済/false:ログアウト済
     */
    getLoginStatus(state) {
      return state.isLogin;
    },
    /**
     * 商品一覧を表すgetter.
     * @param state - ステイト
     * @returns 商品一覧
     */
    getItemList(state) {
      return state.itemList;
    },

    getItemId(state) {
      return (itemId: number) => {
        const items = state.itemList.filter((Item) => Item.id == itemId);
        return items[0];
      };
    },

    /**
     * IDからトッピングを検索し返す.
     *
     * @param state ステート
     * @returns トッピング
     */
    getToppingById(state) {
      // 渡されたIDで絞り込んだToppingオブジェクトを1件返す
      return (toppingId: number) => {
        const toppings = state.itemList.filter(
          (Topping) => Topping.id == toppingId
        );
        return toppings[0];
      };
    },

    /**
     * 注文商品リストを取得する.
     * @param state - ステート
     * @returns Orderオブジェクト
     */
    getOrder(state) {
      return state.order.orderItemList;
    },
  },
});
