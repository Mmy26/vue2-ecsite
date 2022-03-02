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
      new Array<OrderItem>()
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
      console.dir("response: " + JSON.stringify(response));
      const payload = response.data;
      context.commit("showItemList", payload);
    },
  },
  mutations: {
    /**
     * 商品リストを作成し、stateにセットするメソッド.
     * @param state - ステイト
     * @param payload - 商品一覧情報のペイロード
     */
    showItemList(state, payload) {
      state.itemList = new Array<Item>();
      console.log(payload.items);
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

    changeOrderStatus(state, payload) {
      // const statusList = {
      //   targetKey: payload.key,
      //   targetValue: payload.value
      // }
      // state.order.statusList.targetKey = statusList.targetValue;
      state.order.status = payload.status;
    },
    updateOrder(state, payload) {
      state.order.destinationName = payload.destinationName;
      state.order.destinationEmail = payload.destinationEmail;
      state.order.destinationZipcode = payload.destinationZipcode;
      state.order.destinationAddress = payload.destinationAddress;
      state.order.destinationTel = payload.destinationTel;
    },
  },

  modules: {},
  getters: {
    /**
     * 商品一覧を表すgetter.
     * @param state - ステイト
     * @returns 商品一覧
     */
    getItemList(state) {
      return state.itemList;
    },
<<<<<<< HEAD

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
  },
});
=======
    /**
     * 注文商品リストを取得する.
     * @param state - ステート
     * @returns Orderオブジェクト
     */
    getOrder(state){
      return state.order.orderItemList;
    },
  }
})
>>>>>>> develop
