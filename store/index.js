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
    login: false,
    token: undefined,
    headState: false
})

// state changes here
export const mutations = {
    SET_LOGIN(state, user) {
        state.login = user
    },
    SET_TOKEN(state, token) {
        state.token = token
        this.$router.push('/')
    },
    SET_LOGOUT(state) {
        state.token = undefined
        state.login = false
        localStorage.removeItem('vuex')
        this.$router.push('/')
    },
    SET_HEAD(state) {
        state.headState = !state.headState
    }
}

export const getters = {
    isAuthenticated(state) {
        let store = process.browser ? localStorage.getItem('vuex') : null
        store = process.browser ? JSON.parse(store) : null
        return store !== null ? store : state.login
    },
    getToken(state) {
        let store = localStorage.getItem('vuex')
        store = JSON.parse(store)
        return store !== null ? store : state.token
    },
    getHead(state) {
        let store = process.browser ? localStorage.getItem('vuex') : null
        store = JSON.parse(store)
        return store !== null ? store : state.headState
    }
}

// Hit api here
export const actions = {
    async login({ commit }, { email, password }) {
        try {
            const res = await this.$axios.post('/auth/login', { email, password })
            commit('SET_LOGIN', true);
            commit('SET_TOKEN', res.data.tokens.access)
            commit('SET_HEAD');
            return false
        } catch (error) {
            console.log(res);
            return true
        }
    },
    headStateChange({commit}) {
        commit("SET_HEAD");
    },
    logout({commit}) {
        commit('SET_LOGOUT')
    }
}
