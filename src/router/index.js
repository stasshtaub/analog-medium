import Vue from "vue";
import VueRouter from "vue-router";
import Feed from "../views/Feed.vue";
import store from "../store";
import guest from "./middleware/guest";
import writer from "./middleware/writer";
import post from "./middleware/post";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Feed",
    component: Feed,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      middleware: [guest],
    },
  },
  {
    path: "/edit/:id",
    name: "Edit",
    component: () => import("../views/PostManagement.vue"),
    props: (route) => {
      console.log("params:", route.params);

      return {
        id: +route.params.id,
        post: route.params.post,
      };
    },
    meta: {
      middleware: [post],
    },
  },
  {
    path: "/create",
    name: "Create",
    component: () => import("../views/PostManagement.vue"),
    meta: {
      middleware: [writer],
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }
  const middleware = to.meta.middleware;
  const context = {
    to,
    from,
    next,
    store,
  };
  return middleware[0]({
    ...context,
  });
});

export default router;
