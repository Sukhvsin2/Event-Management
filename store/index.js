import VuexPersistence from "vuex-persist"


let vuexLocal = null;
if (process.browser) {
    vuexLocal = new VuexPersistence({
      key: 'vuex', // The key to store the state on in the storage provider.
      storage: window.localStorage, // or window.sessionStorage or localForage
    })
}

export const plugins = process.browser ? [vuexLocal.plugin] : []

export const state = () => ({
    login: false
})

// state changes here
export const mutations = {
    SET_LOGIN(state, user) {
        state.login = user
        this.$router.push('/')
    }
}

export const getters = {
    isAuthenticated(state) {
        let store = localStorage.getItem('vuex')
        store = JSON.parse(store)
        return store !== null ? store : state.login
    },
}

// Hit api here
export const actions = {
    async login({ commit }, { email, password }) {
        try {
            const res = await this.$axios.post('/auth/login', { email, password })
            console.log(res.data);
            commit('SET_LOGIN', true);
        } catch (error) {
            console.log(res);
        }
    }
}
