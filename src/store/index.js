import { createStore } from "vuex";

import generalMessages from "./generalMessages.js";

const store = createStore({
  modules: [generalMessages],
});

export default store;
