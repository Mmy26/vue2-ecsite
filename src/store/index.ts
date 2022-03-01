import Vue from 'vue'
import Vuex from 'vuex'
import { Item } from '@/type/item'
import { Order } from "@/type/order";
import { User } from '@/type/user';
import { OrderItem } from '@/type/orderItem';
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    order: new Order(0, 0, 0, 0, new Date(), "", "", "", "", "", new Date(), 0, new User(0, "", "", "", "", "", ""), new Array<OrderItem>()),
    itemList: new Array<Item>(),
  },
  actions: {
    /**
     * 商品リストを非同期通信で取得するメソッド.
     * @param context - コンテクスト
     */
    async asyncGetItemList(context){
      const response = await axios.get("http://153.127.48.168:8080/ecsite-api/item/items/coffee");
      console.dir("response: " + JSON.stringify(response));
      const payload = response.data;
      context.commit("showItemList", payload);
    }
  },
  mutations: {
    /**
     * 商品リストをpayloadから
     * @param state 
     * @param payload 
     */
    showItemList(state, payload){
      state.itemList = new Array<Item>();
      console.log(payload.items);
      for(const item of payload.items){
        state.itemList.push(
          new Item(
            item.jd,
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
        console.log(item);
      }
    }
  },
  modules: {
  },
  getters: {
    getItemList(state) {
      return state.itemList;
    },
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
