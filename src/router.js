import {
  createRouter,
  createWebHistory,
} from "vue-router";

import LandingPage from "./pages/LandingPage.vue";
import GeneralChat from "./components/layout/GeneralChat.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/generalchat",
      component: LandingPage,
      children: [
        {
          path: "/generalchat",
          component: GeneralChat,
        },
      ],
    },
  ],
});

export default router;
