import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import WelcomeView from "@/views/WelcomeView.vue";
import { getUserPreferences } from "@/utils/userPreferences";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/welcome",
      name: "welcome",
      component: WelcomeView,
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
  ],
});

router.beforeEach((to) => {
  const preferences = getUserPreferences();

  if (!preferences && to.path !== "/welcome") {
    return "/welcome";
  }

  if (preferences && to.path === "/welcome") {
    return "/";
  }
});

export default router;