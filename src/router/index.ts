import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/pages/LoginPage.vue";
import TodosPage from "@/pages/TodosPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "login", component: LoginPage },
    {
      path: "/todos",
      name: "todos",
      component: TodosPage,
      meta: { requiresAuth: true },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFoundPage",
      component: NotFoundPage,
    },
  ],
});

router.beforeEach((to) => {
  const user = localStorage.getItem("user");

  if (to.meta.requiresAuth && !user) {
    return "/";
  }

  return true;
});

export default router;
