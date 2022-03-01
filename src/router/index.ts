import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "*",
    name: "Home",
    component: Home,
  },
  {
    path: "/itemList",
    name: "ItemList",
    component: () => import("../views/ItemList.vue"),
  },
  {
    path: "/registerUser",
    component: () => import("../views/registerUser.vue"),
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
