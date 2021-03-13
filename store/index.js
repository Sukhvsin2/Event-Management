export const state = () => ({
    login: false
})

// state changes here
export const mutations = {
    SET_LOGIN(state, user) {
        state.login = user
    }
}

// Hit api here
export const actions = {
    async login({ commit }, { email, password }) {
        try {
            const res = await this.$axios.post('/auth/login', { email, password })
            console.log(res);
            commit('SET_LOGIN', true);
        } catch (error) {
            console.log(res);
        }
    }
}