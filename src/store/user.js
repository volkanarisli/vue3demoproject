export const userModule = {
    namespaced: true,
    state: {
        user: null,
    },

    //mutations are functions that effects the state
    mutations: {
        SET_USER(state, user) {
            state.user = user;
        }

    },

    //Actions are the functions that you call trhought your application that call mutations
    actions: {
        setUser({ commit }, user) {
            commit('SET_USER', user);
        }
    },
}