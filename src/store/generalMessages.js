export default {
  state() {
    return {
      isAuth: null,
      userId: null,
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

    // Update auth info
    updateAuthAndId(state, data) {
      state.isAuth = data.isAuth;
      state.userId = data.id;
    },

    // Update user settings for each message
    updateUserSettings(state, data) {
      console.log(data);
      if (data.name.length) {
        state.username = data.name;
      }

      if (data.color.length) {
        state.color = data.color;
      }

      if (data.icon) {
        state.icon = data.icon;
      }
    },
    resetUser(state) {
      state.isAuth = null;
      state.userId = null;
      state.username = "";
      state.color = "";
      state.icon = null;
      console.log(state);
    },
  },
  actions: {
    updateMessages({ commit }, data) {
      commit("updateFinal", data);
    },
    changeUserSettings({ commit }, data) {
      commit("updateUserSettings", data);
    },
    changeUserAuthAndId({ commit }, data) {
      commit("updateAuthAndId", data);
    },
    resetUser({ commit }) {
      commit("resetUser");
    },
  },
  getters: {
    messages(state) {
      return state.messages;
    },
    userData(state) {
      return {
        name: state.username,
        color: state.color,
        icon: state.icon,
      };
    },
    isAuth(state) {
      return state.isAuth;
    },
    userId(state) {
      return state.userId;
    },
  },
};
