export default {
  state() {
    return {
      messages: [{ content: "Hello" }],
    };
  },
  mutations: {
    updateFinal(state, data) {
      // Loop messages and add each to final list
      for (const message in data) {
        state.messages.push(data[message]);
      }
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
