import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: () => import("./pages/home.vue"),
      meta: { title: "Посты" }
    },
    {
      path: "/edit",
      component: () => import("./pages/edit.vue"),
      meta: { title: "Редактировать" }
    },
    {
      path: "/login",
      component: () => import("./pages/login.vue"),
      meta: { title: "Логин" }
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
