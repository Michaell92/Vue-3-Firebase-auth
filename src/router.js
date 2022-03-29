import { createRouter, createWebHistory } from "vue-router";

import LandingPage from "./pages/LandingPage.vue";
import GeneralChat from "./components/layout/GeneralChat.vue";
import PrivateMessages from "./components/ui/PrivateMessages.vue";
import UserPreferences from "./components/ui/UserPreferences.vue";
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
      redirect: "/generalchat",
      component: LandingPage,
      children: [
        {
          path: "/generalchat",
          component: GeneralChat,
        },
        {
          path: "/messages",
          component: PrivateMessages,
        },
        {
          path: "/preferences",
          component: UserPreferences,
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
  console.log(auth.currentUser);
  if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (!auth.currentUser) {
      next();
    }
  } else {
    next();
  }
});

export default router;
