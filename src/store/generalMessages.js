export default {
  state() {
    return {
      messages: [
        {
          content: "dawdwa",
          date: new Date().toDateString(),
        },
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
