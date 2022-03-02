import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  // {
  //   path: "*",
  //   name: "Home",
  //   component: Home,
  // },
  {
    path: "/cartList",
    component: () => import("../views/CartList.vue"),
  },
  {
    path: "/itemList",
    component: () => import("../views/ItemList.vue"),
  },
  {
    path: "/itemDetail/:id",
    component: () => import("../views/ItemDetail2.vue"),
  },
  {
    path: "/registerUser",
    component: () => import("../views/registerUser.vue"),
  },
  {
    path: "/logout",

    component: () => import("../views/Logout.vue"),
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/orderConfirm",
    component: () => import("../views/OrderConfirm.vue"),
  },
  {
    path: "/faq",
    component: () => import("../views/Faq.vue"),
  },
  {
    path: "/orderFinished",
    component: () => import("../views/OrderFinished.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
