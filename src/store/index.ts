import Vue from "vue";
import Vuex from "vuex";
import { Item } from "@/types/item";
import { Order } from "@/types/order";
import { User } from "@/types/user";
import { OrderItem } from "@/types/orderItem";

import axios from "axios";
import { Topping } from "@/types/topping2";

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
    orderHistoryInfoList: new Array<Order>(),
    currentUser: new User(0, "", "", "", "", "", ""),
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
    /**
     * 注文履歴の情報を非同期通信で取得するメソッド.
     * @param context - コンテクスト
     */
    async asyncGetOrderHistoryInfo(context) {
      //一旦ダミーのIDが入っています。
      //ダミーID 129, 134, 139, 148, 150
      // 下のid部分をthis.state.currentUser.idにする
      const response = await axios.get(
        "http://153.127.48.168:8080/ecsite-api/order/orders/coffee/129"
      );
      const payload = response.data;
      context.commit("setOrderHistoryInfo", payload);
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
    /**
     * 注文履歴情報をstateにセットするメソッド.
     * @param state - ステイト
     * @param payload - 注文情報のペイロード
     */
    setOrderHistoryInfo(state, payload) {
      for (const order of payload.orders) {
        state.orderHistoryInfoList.push(
          new Order(
            order.id,
            order.userId,
            order.status,
            order.totalPrice,
            order.orderDate,
            order.destinationName,
            order.destinationEmail,
            order.destinationZipcode,
            order.destinationAddress,
            order.destinationTel,
            order.deliveryTime,
            order.paymentMethod,
            order.user,
            order.orderItemList
          )
        );
      }
    },
    /**
     * 商品を削除する.
     *
     * @param state - ステート
     * @param payload - 削除する商品
     */

    removeItem(state, payload) {
      state.order.orderItemList.splice(payload.itemIndex, 1);
    },

    /**
     *商品を追加する.

     * @param state - ステート
     * @param payload - 追加する商品の情報
     */
    addItem(state, payload) {
      state.order.orderItemList.push(payload);
    },
    /**
     * ユーザー情報をセットする.
     * @param state - ステイト
     * @param payload APIから返ってきたユーザー情報
     */
    setCurrentUser(state, payload) {
      state.currentUser = new User(
        payload.id,
        payload.name,
        payload.email,
        payload.password,
        payload.zipcode,
        payload.address,
        payload.telephone
      );
      console.log(state.currentUser);
    },
    /**
     * 注文テーブルを削除する.
     *
     * @param state - ステート
     * @param payload - 更新する情報
     */
    initializeOrder(state) {
      state.order = new Order(
        0,
        state.currentUser.id,
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
        state.currentUser,
        []
      );
    },
     /**
     * ユーザー情報を更新する.
     * @param state - ステイト
     * @param payload 更新するユーザー情報
     */
      updateCurrentUser(state, payload) {
        state.currentUser.name = payload.name;
        state.currentUser.email = payload.email;
        state.currentUser.zipcode = payload.zipcode;
        state.currentUser.address = payload.address;
        state.currentUser.telephone = payload.telephone;
        console.log(state.currentUser);
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
      return state.order;
    },
    /**
     * 注文商品リストを取得する.
     * @param state - ステート
     * @returns Orderオブジェクト
     */
    getOrderHistoryInfoList(state) {
      return state.orderHistoryInfoList;
    },
    /**
     * ログインしているユーザーの情報を取得する.
     * @param state - ステート
     * @returns Userオブジェクト
     */
    getCurrentUser(state) {
      return state.currentUser;
    },
  },
});
