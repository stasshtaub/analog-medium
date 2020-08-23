import Vue from "vue";
import VueRouter from "vue-router";
import Feed from "../views/Feed.vue";
import store from "../store";
import guest from "./middleware/guest";
import writer from "./middleware/writer";
// import post from "./middleware/post";

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
    component: () => import("../views/Edit.vue"),
    props: (route) => {
      return {
        id: +route.params.id,
        post: route.params.post,
      };
    },
    meta: {
      middleware: [writer],
    },
  },
  {
    path: "/create",
    name: "Create",
    component: () => import("../views/Create.vue"),
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
