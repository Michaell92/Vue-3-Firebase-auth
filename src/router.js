import { createRouter, createWebHistory } from "vue-router";

import LandingPage from "./pages/LandingPage.vue";
import GeneralChat from "./components/layout/GeneralChat.vue";
import PrivateMessages from "./components/ui/PrivateMessages.vue";
import UserSettings from "./components/layout/UserSettings.vue";
import LogIn from "./components/layout/LogIn.vue";
import SignUp from "./components/layout/SignUp.vue";
import firebase from "./firebase";
import { getAuth } from "firebase/auth";
const auth = getAuth();

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/chat",
      component: LandingPage,
      children: [
        {
          path: "/chat",
          component: GeneralChat,
        },
        {
          path: "/messages",
          component: PrivateMessages,
        },
        {
          path: "/settings",
          component: UserSettings,
        },
      ],
    },
    {
      path: "/login",
      component: LogIn,
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/signup",
      component: SignUp,
      meta: {
        requiresGuest: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (!auth.currentUser) {
      next();
    }
  } else {
    next();
  }
});

export default router;
