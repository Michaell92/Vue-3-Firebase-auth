export default {
  state() {
    return {
      messages: [],
      username: "",
      color: "",
      icon: null,
    };
  },
  mutations: {
    updateFinal(state, data) {
      // Loop messages and add each to final list
      for (const message in data) {
        state.messages.push(data[message]);
      }
    },

    // Update user settings for each message
    updateUserSettings(state, data) {
      if (!state.username.length) {
        state.username = data.name;
      }

      if (data.color.length) {
        state.color = data.color;
      }

      if (data.icon) {
        state.icon = data.icon;
      }
    },
  },
  actions: {
    updateMessages({ commit }, data) {
      commit("updateFinal", data);
    },
    changeUserSettings({ commit }, data) {
      commit("updateUserSettings", data);
    },
  },
  getters: {
    messages(state) {
      return state.messages;
    },
    username(state) {
      return state.username;
    },
    color(state) {
      return state.color;
    },
    icon(state) {
      return state.icon;
    },
  },
};
