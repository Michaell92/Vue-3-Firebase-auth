export default {
  state() {
    return {
      messages: [
        "dwdwadwa",
        "dwadwa",
        1,
        2,
        3,
      ],
    };
  },
  mutations: {
    updateFinal(state, data) {
      state.messages.push(data);
    },
  },
  actions: {
    updateMessages({ commit }, data) {
      commit("updateFinal", data);
    },
  },
  getters: {
    messages(state) {
      return state.messages;
    },
  },
};
