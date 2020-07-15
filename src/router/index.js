import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import Home from "../views/Home.vue";
import Examples from "../views/Examples";
import SignIn from "../views/SignIn";
import Sites from "../views/Sites";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "PayOrFade",
      metaTags: [
        {
          name: "description",
          content:
            "Pay or Fade is the easy to use service that can help you with non-paying clients. Pay or Fade provides an easy to use system with a script provided through a cdn to get you started in no time! Visit the examples page to discover how Pay or Fade can help you with non-paying clients. Or create an account to get started."
        }
      ]
    }
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignIn,
    meta: {
      title: "Sign In",
      metaTags: [
        {
          name: "description",
          content:
            "Create an account or sign in to your existing PayOrFade account."
        }
      ]
    }
  },
  {
    path: "/examples",
    name: "Examples",
    component: Examples,
    meta: {
      requiresAuth: true,
      title: "Examples",
      metaTags: [
        {
          name: "description",
          content:
            "See examples on how you should use PayOrFade for your websites."
        }
      ]
    }
  },
  {
    path: "/sites",
    name: "My Sites",
    component: Sites,
    meta: {
      requiresAuth: true,
      title: "Sites",
      metaTags: [
        {
          name: "description",
          content: "All the sites linked to your account."
        }
      ]
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
      updateMetaTags(to, from);
      next();
      return;
    }
    console.log(to);
    next({ name: "SignIn", query: { redirect: to.path } });
  } else {
    updateMetaTags(to, from);
    next();
  }
});

function updateMetaTags(to, from) {
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else {
    // ← here ↓
    document.title = previousNearestWithMeta.meta.title;
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(
    document.querySelectorAll("[data-vue-router-controlled]")
  ).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return;

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map(tagDef => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create, so we don't interfere with other ones.
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag));
}

export default router;
