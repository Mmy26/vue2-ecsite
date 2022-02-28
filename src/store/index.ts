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
    async asyncGetItemList(context){
      const response = await axios.get("http://153.127.48.168:8080/ecsite-api/item/items/coffee");
      console.dir("response: " + JSON.stringify(response));
      const payload = response.data;
      context.commit("showItemList", payload);
    }
  },
  mutations: {
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
    }
  }
})
