import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import Home from "../views/Home.vue";
import Examples from "../views/Examples";
import SignIn from "../views/SignIn";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignIn
  },
  {
    path: "/examples",
    name: "Examples",
    component: Examples,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    console.log(to);
    next({ name: "SignIn", query: { redirect: to.path } });
  } else {
    next();
  }
});

export default router;
